---
title: "REST API với Gin"
description: "Hướng dẫn tạo một Web API cơ bản"
weight: 410
draft: false
---



Trong bài này, chúng ta sẽ tạo một API quản lý Sách (Books).

## 1. Cài đặt Gin

```bash
go mod init my-api
go get -u github.com/gin-gonic/gin
```

## 2. Code `main.go`

```go
package main

import (
    "net/http"
    "github.com/gin-gonic/gin"
)

type Book struct {
    ID     string `json:"id"`
    Title  string `json:"title"`
    Author string `json:"author"`
}

var books = []Book{
    {ID: "1", Title: "Go in Action", Author: "William Kennedy"},
    {ID: "2", Title: "Clean Code", Author: "Robert C. Martin"},
}

func getBooks(c *gin.Context) {
    c.JSON(http.StatusOK, books)
}

func main() {
    router := gin.Default()
    router.GET("/books", getBooks)
    router.Run("localhost:8080")
}
```

## 3. Chạy Server

```bash
go run main.go
```
Mở trình duyệt: `http://localhost:8080/books` để xem kết quả trả về dạng JSON.
