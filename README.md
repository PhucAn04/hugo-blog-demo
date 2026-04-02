# 4GO - Học nền tảng Golang & Hệ thống CMS nội bộ

Dự án này là sự kết hợp giữa một trang web tài liệu tĩnh (Static Site) xây dựng bằng **Hugo** (chứa nội dung khóa học 4GO) và một ứng dụng desktop **Wails CMS** dùng để quản trị (viết mới, chỉnh sửa, xóa) nội dung bài viết một cách trực quan, tiếp cận dễ dàng cho những người không chuyên môn về kỹ thuật.

---

## 🏗 Cấu trúc Dự án

Dự án bao gồm 3 phần cốt lõi, được chia thành các thư mục riêng biệt:

1. **`hugo-site/` (Frontend Documentation Site)**:
   - Được xây dựng dựa trên framework tĩnh nhanh nhất thế giới **Hugo**.
   - Sử dụng theme **Lotus Docs** với thiết kế hiện đại, tối giản.
   - Chứa 13 bài viết tham khảo chất lượng hướng dẫn từ cơ bản đến nâng cao về Golang, đặt tại thư mục `content/docs/`.
   
2. **`cms/` (Wails Desktop CMS)**:
   - Nhằm thay thế việc chỉnh sửa các file Markdown bằng tay, hệ thống cung cấp một CMS độc lập bằng **Wails v2**.
   - **Backend (Go)**: Cung cấp API trực tiếp tương tác với hệ thống file nội bộ, sử dụng thư viện `yaml.v3` để phân tích và thao tác với Front Matter.
   - **Frontend (React SPA)**: Giao diện 3-panel chia màn hình (Sidebar quản lý thư mục, Thanh công cụ Editor WYSIWYG và Cài đặt, Cùng khung Preview thời gian thực render Markdown thành HTML qua `marked`).
   
3. **`docker/` (Môi trường Container hóa)**:
   - Các config `Dockerfile` và `docker-compose.yml` định nghĩa môi trường biệt lập giúp khởi chạy nhanh chóng hệ sinh thái.

---

## 🛠 Quá trình Phát triển & Triết lý Thiết kế

Dự án được lên ý tưởng nhằm xóa nhòa ranh giới giữa việc "viết web tĩnh an toàn" và "sự tiện lợi của các nền tảng quản trị nội dung dạng động" như WordPress.

- **Bài toán**: Hugo cực ổn định và siêu tốc, nhưng việc yêu cầu người soạn nội dung (Content Writers) tự tạo cấu trúc thư mục, ghi nhớ cấu trúc Front Matter, tự viết các thẻ Markdown là rào cản quá lớn.
- **Giải pháp**: Xây dựng một công cụ thu nhỏ - **4GO CMS**. Ứng dụng tự động quản lý Front Matter (weight, draft, tags), cung cấp thanh toolbar định dạng tiện lợi (B, I, Link, Image) thay vì bắt buộc người viết nhớ syntax, tự động lưu file thẳng vào thư mục lõi của Hugo trong thời gian thực.

**Tech Stack**:
- **Hugo (v0.126.1+)**: Trình khởi tạo nội dung web tĩnh.
- **Go (v1.23+)**: Ngôn ngữ xử lý của Backend CMS.
- **Wails v2**: Framework phát triển Native App trên nền tảng Web-Technology.
- **React 18 + Vite**: SPA Frontend cho CMS.
- **Docker Compose**: Đóng gói và tự động hóa hệ thống.

---

## 🚀 Hướng dẫn Cài đặt & Khởi chạy

Để trải nghiệm toàn bộ dự án, bạn cần khởi chạy hệ thống theo chiều song song: Web hiển thị (Hugo) và Hệ thống quản trị (CMS).

### Bước 1: Khởi chạy trang Hugo (Live Website)

**Cách 1: Sử dụng Docker (Khuyến nghị vì không cần cài môi trường)**
Yêu cầu máy tính bạn đã cài đặt Docker Desktop.
1. Mở terminal, chuyển hướng vào thư mục gốc của dự án: `hugo-blog-demo/`.
2. Khởi chạy bằng lệnh: 
   ```bash
   docker compose -f docker/docker-compose.yml up -d
   ```
3. Sau 3-5 giây, truy cập địa chỉ: `http://localhost:1313`.

**Cách 2: Chạy trực tiếp qua Hugo CLI**
Nếu máy bạn có cài đặt `hugo` extended:
1. Chuyển vào thư mục: `cd hugo-site`
2. Khởi động server: `hugo server -D`

---

### Bước 2: Khởi chạy Wails CMS App

Giao diện quản trị là ứng dụng cài đặt trên máy tính của bạn. Bạn cần có môi trường **Golang** và **Node.js** trên máy.

**Cài đặt Wails CLI**:
```bash
go install github.com/wailsapp/wails/v2/cmd/wails@latest
```

**Chạy ở chế độ Live-reload (Development Mode)**:
1. Chuyển vào thư mục nội bộ CMS: 
   ```bash
   cd cms
   ```
2. Khởi chạy:
   ```bash
   wails dev
   ```
3. Màn hình máy tính của bạn sẽ hiện ra một App GUI thực thụ. Chọn một bài viết ở Sidebar hoặc tạo mới bài viết. Sau khi bấm **Lưu**, quay lại `http://localhost:1313` đang mở trên trình duyệt web, bạn sẽ thấy nội dung được update tự động (Live Reloading).

**Cách Build thành ứng dụng (.exe / .app)**
Nếu muốn phân phối cho Content Editor (người không rành công nghệ, chỉ viết nội dung), dùng lệnh để đóng gói thành App hoàn chỉnh:
```bash
wails build
```
Ứng dụng cài đặt sẽ được sinh ra ở `cms/build/bin/`.

---

## 🎯 Luồng làm việc minh họa (WorkFlow)

1. Bấm khởi chạy Web tĩnh và bật ứng dụng 4GO CMS.
2. Quản lý hệ thống bài đăng bằng cách tạo chuyên mục `(Chuyên mục - Section)` từ màn hình giao diện bên trái.
3. Kích chuột vào "Bài viết mới", nhập các biến số cần thiết (như tags, thứ tự) bằng các ô nhập giao diện thay vì mở khóa `---` YAML phức tạp. Bấm các nút công cụ để viết văn bản. Khung Preview bên tay phải thay đổi lập tức thể hiện kết quả.
4. Bấm **Lưu**, backend của Wails App ghi văn bản vào đúng logic cấu trúc. Framework Hugo "nghe" thấy sự thay đổi và sinh (render) lại cấu trúc cây của trang chủ trong vòng dưới 20ms.

---

## 📂 Chi tiết Cấu trúc Thư mục

### 1. `hugo-site/` (Mã nguồn Web Tĩnh Hugo)
Đây là thư mục chứa cấu hình và dữ liệu gốc gốc để xây dựng trang web.
- **`content/`**: Nơi lưu trữ toàn bộ nội dung dưới dạng Markdown (các bài học nằm ở `content/docs/`).
- **`static/`**: Chứa các tệp tĩnh nguyên bản (hình ảnh, favicon, các override CSS nội bộ). Các tệp này sẽ được chép trực tiếp mà không qua biên dịch.
- **`themes/`** & **`layouts/`**: Quy định giao diện hiển thị cho website. Trong đó `layouts` đã được override bằng các đoạn partial (`head`, `header`, `footer`, `sidebar`) giúp tối ưu hiệu suất và dọn dẹp các Inline CSS cứng ra khỏi module gốc `lotusdocs`.
- **`hugo.yaml`**: Tập tin khai báo cấu hình chính của toàn bộ trang web.
- **`public/` (Thư mục tĩnh đã render)**: Thư mục cốt lõi được Hugo tự động sinh ra sau khi biên dịch. Chứa toàn bộ website dưới dạng HTML/CSS/JS tĩnh đã sẵn sàng để đẩy lên hosting/server.
  - Phân tích `public/`: Chứa các trang đã biên dịch như `index.html` (trang chủ), `404.html` (trang lỗi), `sitemap.xml` (SEO), các thư mục phân cấp tuyến tính (như `docs/`, `categories/`, `tags/` chứa các tệp `.html` tương ứng của từng thẻ/chuyên mục) cùng tập hợp các tệp icon, js và images hiển thị.

### 2. `cms/` (Ứng dụng Wails Desktop - 4GO CMS)
Sử dụng kiến trúc của Wails v2 để giao tiếp giữa Web Frontend và Native Go Backend:
- **`main.go`**: Điểm khởi động ứng dụng Desktop, định nghĩa cửa sổ (kích thước, tiêu đề) và gắn kết (bind) các hàm Go.
- **`app.go`**: Chứa logic Backend cốt lõi viết bằng Go (thao tác file hệ thống, parse YAML Front Matter, lưu nội dung Markdown, giao tiếp trực tiếp với thư mục `hugo-site/content`).
- **`frontend/`**: Chứa mã nguồn dự án SPA React/Vite đóng vai trò là giao diện người dùng (UI) quản trị CMS.
- **`wails.json`**: Cấu hình cấu trúc dự án của Wails.
- **`build/`**: Nơi chứa các tệp như icon hệ thống và thư mục `bin/` chứa file thực thi (.exe, .app) sinh ra sau khi chạy `wails build`.
