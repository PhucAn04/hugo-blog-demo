package main

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"

	"gopkg.in/yaml.v3"
)

// App struct
type App struct {
	ctx        context.Context
	contentDir string
}

type FrontMatter struct {
	Title       string   `json:"title" yaml:"title"`
	Description string   `json:"description,omitempty" yaml:"description,omitempty"`
	Weight      int      `json:"weight,omitempty" yaml:"weight,omitempty"`
	Draft       bool     `json:"draft" yaml:"draft"`
	Icon        string   `json:"icon,omitempty" yaml:"icon,omitempty"`
	Tags        []string `json:"tags,omitempty" yaml:"tags,omitempty"`
	Date        string   `json:"date,omitempty" yaml:"date,omitempty"`
}

type Article struct {
	Path        string      `json:"path"`
	Filename    string      `json:"filename"`
	Section     string      `json:"section"`
	FrontMatter FrontMatter `json:"frontMatter"`
	Content     string      `json:"content"`
}

type Section struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	// The CMS is run from the cms directory, the hugo site is at ../hugo-site
	contentDir, err := filepath.Abs("../hugo-site/content/docs")
	if err != nil {
		fmt.Println("Error resolving content directory:", err)
	}
	return &App{
		contentDir: contentDir,
	}
}

// startup is called when the app starts. The context is saved
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
	// Ensure docs directory exists
	os.MkdirAll(a.contentDir, 0755)
}

// GetSections returns a list of all subdirectories in the docs folder
func (a *App) GetSections() ([]Section, error) {
	var sections []Section
	
	// Add root section
	sections = append(sections, Section{Name: "Root", Path: ""})

	entries, err := os.ReadDir(a.contentDir)
	if err != nil {
		if os.IsNotExist(err) {
			return sections, nil
		}
		return nil, err
	}

	for _, entry := range entries {
		if entry.IsDir() {
			sections = append(sections, Section{
				Name: entry.Name(),
				Path: entry.Name(),
			})
		}
	}

	return sections, nil
}

// CreateSection creates a new subdirectory and an _index.md file
func (a *App) CreateSection(name string) error {
	path := filepath.Join(a.contentDir, name)
	err := os.MkdirAll(path, 0755)
	if err != nil {
		return err
	}

	indexFile := filepath.Join(path, "_index.md")
	if _, err := os.Stat(indexFile); os.IsNotExist(err) {
		fm := FrontMatter{
			Title: name,
			Date:  time.Now().Format(time.RFC3339),
			Weight: 100,
		}
		
		fmBytes, err := yaml.Marshal(fm)
		if err != nil {
			return err
		}
		
		content := fmt.Sprintf("---\n%s---\n\n", string(fmBytes))
		return os.WriteFile(indexFile, []byte(content), 0644)
	}
	
	return nil
}

// ListArticles reads all markdown files in the docs directory and subdirectories
func (a *App) ListArticles() ([]Article, error) {
	var articles []Article

	err := filepath.Walk(a.contentDir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		if !info.IsDir() && strings.HasSuffix(info.Name(), ".md") {
			relPath, err := filepath.Rel(a.contentDir, path)
			if err != nil {
				return err
			}

			// We use Unix path separators for frontend logic consistency
			relPath = filepath.ToSlash(relPath)
			
			section := filepath.Dir(relPath)
			if section == "." {
				section = ""
			}

			article, err := a.GetArticle(relPath)
			if err == nil {
				// Don't send full content in the list view to save memory
				article.Content = ""
				articles = append(articles, article)
			}
		}
		return nil
	})

	return articles, err
}

// GetArticle reads a specific article and parses its front matter
func (a *App) GetArticle(relPath string) (Article, error) {
	// Normalize path using filepath tools
	relPath = filepath.FromSlash(relPath)
	fullPath := filepath.Join(a.contentDir, relPath)
	data, err := os.ReadFile(fullPath)
	if err != nil {
		return Article{}, err
	}

	content := string(data)
	var fm FrontMatter
	var markdownContent string

	// Parse YAML front matter
	if strings.HasPrefix(content, "---\n") || strings.HasPrefix(content, "---\r\n") {
		parts := strings.SplitN(content, "---", 3)
		if len(parts) >= 3 {
			err = yaml.Unmarshal([]byte(parts[1]), &fm)
			if err != nil {
				fmt.Println("Error parsing front matter:", err)
			}
			markdownContent = strings.TrimPrefix(parts[2], "\n")
			markdownContent = strings.TrimPrefix(markdownContent, "\r\n")
		} else {
			markdownContent = content
		}
	} else if strings.HasPrefix(content, "+++\n") || strings.HasPrefix(content, "+++\r\n") {
		parts := strings.SplitN(content, "+++", 3)
		if len(parts) >= 3 {
			// Basic TOML title/description parsing could be added here if needed, 
			// but we'll overwrite with YAML later.
			markdownContent = strings.TrimPrefix(parts[2], "\n")
			markdownContent = strings.TrimPrefix(markdownContent, "\r\n")
		} else {
			markdownContent = content
		}
	} else {
		markdownContent = content
	}

	section := filepath.Dir(relPath)
	if section == "." {
		section = ""
	}

	// Always return slash paths for frontend
	return Article{
		Path:        filepath.ToSlash(relPath),
		Filename:    filepath.Base(relPath),
		Section:     filepath.ToSlash(section),
		FrontMatter: fm,
		Content:     markdownContent,
	}, nil
}

// SaveArticle creates or updates an article
func (a *App) SaveArticle(article Article) error {
	if article.Path == "" || article.Filename == "" {
		if article.FrontMatter.Title == "" {
			return fmt.Errorf("title cannot be empty")
		}
		slug := strings.ToLower(article.FrontMatter.Title)
		slug = strings.ReplaceAll(slug, " ", "-")
		article.Filename = slug + ".md"
		if article.Section != "" && article.Section != "Root" {
			article.Path = filepath.ToSlash(filepath.Join(article.Section, article.Filename))
		} else {
			article.Path = article.Filename
		}
	}

	// Unnormalize for OS
	sysPath := filepath.FromSlash(article.Path)
	fullPath := filepath.Join(a.contentDir, sysPath)
	
	os.MkdirAll(filepath.Dir(fullPath), 0755)

	if article.FrontMatter.Date == "" {
		article.FrontMatter.Date = time.Now().Format(time.RFC3339)
	}

	fmBytes, err := yaml.Marshal(article.FrontMatter)
	if err != nil {
		return err
	}

	fileContent := fmt.Sprintf("---\n%s---\n\n%s", string(fmBytes), article.Content)

	return os.WriteFile(fullPath, []byte(fileContent), 0644)
}

// DeleteArticle deletes an article
func (a *App) DeleteArticle(path string) error {
	sysPath := filepath.FromSlash(path)
	fullPath := filepath.Join(a.contentDir, sysPath)
	return os.Remove(fullPath)
}
