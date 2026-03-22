import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import { 
  GetSections, 
  CreateSection, 
  ListArticles, 
  GetArticle, 
  SaveArticle, 
  DeleteArticle 
} from '../wailsjs/go/main/App';
import './App.css';

function App() {
  const [sections, setSections] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [theme, setTheme] = useState('dark');
  const textareaRef = useRef(null);

  // States for new section modal
  const [showSectionModal, setShowSectionModal] = useState(false);
  const [newSectionName, setNewSectionName] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const loadData = async () => {
    try {
      const secs = await GetSections();
      const arts = await ListArticles();
      setSections(secs || []);
      setArticles(arts || []);
    } catch (e) {
      console.error("Failed to load data:", e);
    }
  };

  const handleSelectArticle = async (path) => {
    try {
      const article = await GetArticle(path);
      setCurrentArticle(article);
      setIsEditing(true);
    } catch (e) {
      alert("Lỗi khi tải bài viết: " + e);
    }
  };

  const handleNewArticle = () => {
    setCurrentArticle({
      path: "",
      filename: "",
      section: "",
      frontMatter: {
        title: "Bài viết mới",
        description: "",
        weight: 100,
        draft: true,
        icon: "",
        tags: [],
        date: ""
      },
      content: "## Nội dung\n\nViết nội dung bài viết tại đây..."
    });
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!currentArticle) return;
    try {
      await SaveArticle(currentArticle);
      await loadData();
      // Reload current to get generated paths if new
      if (currentArticle.path === "") {
        setIsEditing(false);
        setCurrentArticle(null);
      }
      alert("Đã lưu bài viết thành công!");
    } catch (e) {
      alert("Lỗi khi lưu: " + e);
    }
  };

  const handleDelete = async () => {
    if (!currentArticle || !currentArticle.path) return;
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
      try {
        await DeleteArticle(currentArticle.path);
        await loadData();
        setCurrentArticle(null);
        setIsEditing(false);
      } catch (e) {
        alert("Lỗi khi xóa: " + e);
      }
    }
  };

  const handleCreateSection = async () => {
    if (!newSectionName) return;
    try {
      await CreateSection(newSectionName);
      await loadData();
      setShowSectionModal(false);
      setNewSectionName("");
    } catch (e) {
      alert("Lỗi khi tạo thư mục: " + e);
    }
  };

  // formatting helpers
  const insertFormat = (prefix, suffix = "") => {
    const t = textareaRef.current;
    if (!t) return;
    const start = t.selectionStart;
    const end = t.selectionEnd;
    const text = currentArticle.content;
    const selectedText = text.substring(start, end);
    const newContent = text.substring(0, start) + prefix + selectedText + suffix + text.substring(end);
    
    setCurrentArticle({...currentArticle, content: newContent});
    
    // Attempt cursor positioning after render (timeout)
    setTimeout(() => {
      t.focus();
      t.setSelectionRange(start + prefix.length, end + prefix.length);
    }, 0);
  };

  // UI Handlers for Front Matter
  const updateFM = (key, value) => {
    setCurrentArticle({
      ...currentArticle,
      frontMatter: { ...currentArticle.frontMatter, [key]: value }
    });
  };

  // Render Sidebar
  const renderSidebar = () => {
    return (
      <div className="sidebar">
        <div className="sidebar-header">
          4GO CMS
        </div>
        <div className="sidebar-actions" style={{padding: '1rem', borderBottom: '1px solid #334155', display: 'flex', gap: '0.5rem'}}>
          <button className="btn btn-primary" onClick={handleNewArticle} style={{flex: 1, fontSize: '0.9rem', justifyContent: 'center'}}>➕ Bài viết mới</button>
          <button className="btn btn-secondary" onClick={() => setShowSectionModal(true)} title="Thêm mục mới">📁</button>
        </div>
        <div className="sidebar-content">
          {sections.map(sec => {
            const secArticles = articles.filter(a => a.section === sec.path);
            return (
              <div key={sec.path || "root"} className="section-item">
                <div className="section-header">
                  {sec.path === "" ? "📂 Thư mục gốc" : `📁 ${sec.name}`}
                </div>
                {secArticles.map(art => (
                  <div 
                    key={art.path} 
                    className={`article-item ${(currentArticle && currentArticle.path === art.path) ? 'active' : ''}`}
                    onClick={() => handleSelectArticle(art.path)}
                  >
                    📄 {art.frontMatter.title || art.filename}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Editor
  const renderEditor = () => {
    if (!currentArticle) {
      return (
        <div className="workspace">
          <div className="empty-state">
            <h2>Chào mừng đến với 4GO CMS</h2>
            <p>Chọn một bài viết ở menu bên trái hoặc tạo bài viết mới.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="workspace">
        <div className="topbar">
          <input 
            type="text" 
            className="editor-title-input" 
            value={currentArticle.frontMatter.title || ""} 
            onChange={e => updateFM('title', e.target.value)}
            placeholder="Nhập tiêu đề bài viết..."
          />
          <div className="topbar-actions">
            <button 
              className="btn btn-secondary" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              title="Chuyển đổi giao diện Sáng/Tối"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            {currentArticle.path && (
              <button className="btn btn-danger" onClick={handleDelete}>🗑️ Xóa</button>
            )}
            <button className="btn btn-primary" onClick={handleSave}>💾 Lưu</button>
          </div>
        </div>
        
        <div className="editor-layout">
          <div className="editor-panel">
            {/* Settings Panel */}
            <div className="settings-panel">
              <div className="settings-grid">
                <div className="form-group">
                  <label>Mô tả (Description)</label>
                  <input type="text" className="form-control" value={currentArticle.frontMatter.description || ''} onChange={e => updateFM('description', e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Thư mục (Section)</label>
                  <select className="form-control" value={currentArticle.section || ''} onChange={e => setCurrentArticle({...currentArticle, section: e.target.value})}>
                    {sections.map(s => <option key={s.path} value={s.path}>{s.name || "Root"}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Thẻ (Tags) - cách nhau bằng dấu phẩy</label>
                  <input type="text" className="form-control" value={(currentArticle.frontMatter.tags || []).join(', ')} onChange={e => updateFM('tags', e.target.value.split(',').map(t => t.trim()).filter(t => t))} />
                </div>
                <div style={{display: 'flex', gap: '1rem', alignItems: 'flex-end'}}>
                  <div className="form-group" style={{flex: 1}}>
                    <label>Thứ tự (Weight)</label>
                    <input type="number" className="form-control" value={currentArticle.frontMatter.weight || 100} onChange={e => updateFM('weight', parseInt(e.target.value) || 100)} />
                  </div>
                  <label className="toggle-switch" style={{paddingBottom: '0.5rem'}}>
                    <input type="checkbox" checked={currentArticle.frontMatter.draft || false} onChange={e => updateFM('draft', e.target.checked)} />
                    <span className="slider"></span>
                    <span style={{fontSize: '0.85rem', color: '#94a3b8'}}>Bản nháp</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Toolbar */}
            <div className="format-toolbar">
              <button className="format-btn" onClick={() => insertFormat('**', '**')} title="In đậm">B</button>
              <button className="format-btn" onClick={() => insertFormat('*', '*')} title="In nghiêng" style={{fontStyle: 'italic'}}>I</button>
              <button className="format-btn" onClick={() => insertFormat('~~', '~~')} title="Gạch ngang" style={{textDecoration: 'line-through'}}>S</button>
              <div className="toolbar-divider"></div>
              <button className="format-btn" onClick={() => insertFormat('# ')} title="Tiêu đề 1">H1</button>
              <button className="format-btn" onClick={() => insertFormat('## ')} title="Tiêu đề 2">H2</button>
              <button className="format-btn" onClick={() => insertFormat('### ')} title="Tiêu đề 3">H3</button>
              <div className="toolbar-divider"></div>
              <button className="format-btn" onClick={() => insertFormat('[', '](url)')} title="Chèn Link">🔗</button>
              <button className="format-btn" onClick={() => insertFormat('![alt](', ')')} title="Chèn Ảnh">🖼️</button>
              <button className="format-btn" onClick={() => insertFormat('- ')} title="Danh sách">📋</button>
              <button className="format-btn" onClick={() => insertFormat('```\n', '\n```')} title="Code Block">{'</>'}</button>
            </div>

            {/* Textarea */}
            <textarea 
              ref={textareaRef}
              className="writing-area" 
              value={currentArticle.content || ""}
              onChange={e => setCurrentArticle({...currentArticle, content: e.target.value})}
              placeholder="Viết nội dung Markdown tại đây..."
            />
          </div>

          {/* Preview Panel */}
          <div className="preview-panel">
            <div 
              className="prose" 
              dangerouslySetInnerHTML={{__html: marked.parse(currentArticle.content || "")}} 
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container">
      {renderSidebar()}
      {renderEditor()}

      {showSectionModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3 className="modal-title">Tạo Chuyên mục mới</h3>
            <div className="form-group">
              <label>Tên chuyên mục (đường dẫn)</label>
              <input 
                type="text" 
                className="form-control" 
                value={newSectionName} 
                onChange={e => setNewSectionName(e.target.value)} 
                placeholder="VD: golang-basics"
                autoFocus
              />
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowSectionModal(false)}>Hủy</button>
              <button className="btn btn-primary" onClick={handleCreateSection}>Tạo mới</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
