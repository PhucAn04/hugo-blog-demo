---
title: "Web Frameworks"
description: "Các framework làm Web phổ biến trong Go"
weight: 320
draft: false
---

# Go Web Frameworks

Mặc dù thư viện chuẩn `net/http` của Go đủ mạnh để tạo ra một web server thực thụ, việc sử dụng các Framework giúp giảm thiểu mã lặp (boilerplate) và cung cấp các tính năng tiện ích (Routing, Middleware).

## 1. Gin Gonic
**Phổ biến nhất**
- Rất nhanh, cú pháp giống Martini nhưng hiệu suất tốt hơn gấp 40 lần.
- Cột mốc chuẩn mực của Go Web Frameworks hiện tại.

## 2. Echo
- Nhanh, nhẹ và cấu trúc rất rõ ràng.
- Rất mạnh về Data Binding, Validation.

## 3. Fiber
- Lấy cảm hứng từ Express.js (Node.js).
- Được xây dựng trên `Fasthttp` cho hiệu năng cực khủng, nhanh hơn cả Gin và Echo trong một số bài test.

## 4. Chi
- Dành cho những ai thích phong cách "Standard Library" (Idiomatic Go).
- 100% tương thích với `net/http`. Dễ dàng kết hợp với các công cụ chuẩn của Go.
