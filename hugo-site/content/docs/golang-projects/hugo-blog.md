---
title: "Blog với Hugo"
description: "Giới thiệu cách thức trang 4GO này được xây dựng"
weight: 420
draft: false
---



Trang web tài liệu 4GO mà bạn đang xem chính là một sản phẩm được tạo nên từ **Hugo** - Static Site Generator nhanh nhất thế giới, được viết hoàn toàn bằng Go!

## Cách hoạt động của Hugo

1. **Nội dung (Content)**: Bạn viết các file văn bản ở định dạng Markdown (`.md`).
2. **Giao diện (Theme)**: Định nghĩa cách hiển thị nội dung (trang này dùng theme Lotus Docs).
3. **Hugo Engine**: Đọc Markdown và Theme, **biên dịch** (render) ra HTML/CSS tĩnh chỉ trong vài mili-giây.

## Lợi ích của site tĩnh

- Tốc độ tải trang nhanh tuyệt đối.
- Cực kỳ bảo mật (không có database hay backend logic để hack).
- Dễ dàng host miễn phí trên GitHub Pages, Vercel, Netlify.

## Tự tạo trang của bạn

1. Cài đặt Hugo (`choco install hugo` / `brew install hugo`).
2. `hugo new site my-blog`
3. Tải theme và tạo bài viết với `hugo new posts/hello.md`.
4. Chạy `hugo server -D` để xem kết quả.
