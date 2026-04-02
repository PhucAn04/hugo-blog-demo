# README

## About

This is the official Wails React template.

You can configure the project by editing `wails.json`. More information about the project settings can be found
here: https://wails.io/docs/reference/project-config

## Live Development

To run in live development mode, run `wails dev` in the project directory. This will run a Vite development
server that will provide very fast hot reload of your frontend changes. If you want to develop in a browser
and have access to your Go methods, there is also a dev server that runs on http://localhost:34115. Connect
to this in your browser, and you can call your Go code from devtools.

## Building

To build a redistributable, production mode package, use `wails build`.

## Cấu trúc thư mục (Directory Structure)

Dự án Wails CMS này đóng vai trò là phần mềm quản trị nội dung chạy trên Desktop, liên kết với frontend UI và backend Go:

- **`main.go`**: Điểm neo chính khởi tạo ứng dụng Wails, thiết lập cấu hình cửa sổ, tiêu đề hiển thị và liên kết (bind) các hàm Go để frontend có thể gọi.
- **`app.go`**: Chứa logic backend xử lý, thao tác đọc/ghi vào các file hệ thống (cụ thể là thư mục `hugo-site/content`), phân tích cấu trúc YAML Front Matter của Markdown.
- **`frontend/`**: Thư mục chứa toàn bộ mã nguồn giao diện người dùng (UI) lấy nền tảng là ReactJS/Vite. Khi build, mã nguồn này được đóng gói cùng binary Go.
- **`build/`**: Chứa biểu tượng ứng dụng và thư mục `bin/` để chứa file thực thi (`.exe`, `.app`) sau khi chạy lệnh `wails build`.
- **`wails.json`**: Tập tin khai báo cấu hình chính cho project Wails.
- **`go.mod`** & **`go.sum`**: Các tập tin quản lý thư viện và dependencies của hệ sinh thái Go.
