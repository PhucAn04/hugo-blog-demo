---
title: "Go Modules"
description: "Quản lý Dependency trong Go"
weight: 310
draft: false
---



Từ Go 1.11, **Go Modules** trở thành giải pháp chính thức để quản lý các gói thư viện bên thứ ba (dependencies) trong dự án Go.

## Khởi tạo Project

Để bắt đầu một dự án mới, bạn mở terminal tại thư mục dự án và chạy:

```bash
go mod init github.com/username/myproject
```

Lệnh này sẽ tạo ra file `go.mod`. Đây là file cốt lõi chứa tên module và phiên bản Go.

## Cài đặt thư viện

Để cài đặt một package mới (ví dụ: cỗ máy web Gin):

```bash
go get -u github.com/gin-gonic/gin
```

File `go.mod` sẽ tự động cập nhật dependency này, đồng thời file `go.sum` sẽ lưu mã băm (checksum) để đảm bảo tính toàn vẹn của thư viện.

## Dọn dẹp thư viện

```bash
go mod tidy
```
Lệnh này sẽ tự động xóa các thư viện không còn sử dụng trong code và tải bổ sung những thư viện còn thiếu.
