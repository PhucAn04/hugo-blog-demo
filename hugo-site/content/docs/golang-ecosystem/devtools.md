---
title: "Dev Tools"
description: "Các công cụ đắc lực dành cho Go Developers"
weight: 340
draft: false
---



Mọi lập trình viên Go đều nên trang bị một vài công cụ sau trong "kho vũ khí" của mình:

## 1. Air (Live Reload)
Go là một ngôn ngữ biên dịch. Mỗi lần bạn đổi code, bạn phải `go build` lại.
`Air` là công cụ theo dõi tự động, giúp khởi động lại server Go ngay khi bạn ấn Ctrl+S.
- **Tải về**: `go install github.com/cosmtrek/air@latest`

## 2. GolangCI-Lint
Một linter framework tổng hợp hàng chục linter khác, giúp cảnh báo lỗi code smell, tối ưu hóa code và giữ cho chuẩn mực code thống nhất trong nhóm.
- Rất nhanh, chạy song song.

## 3. Delve (Debugger)
Trình debug mặc định cho Go. VS Code sử dụng Delve ở dưới nền để giúp bạn gắn breakpoints và xem giá trị biến trong thời gian thực.
- **Khởi động**: `dlv debug`

## 4. Swag
Tự động tạo tài liệu API Swagger từ chú thích (comments) trong mã nguồn Go của bạn. Vô cùng hiệu quả cho dự án làm REST API.
