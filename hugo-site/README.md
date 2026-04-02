# Website Tài liệu Tĩnh (Hugo Site)

Thư mục này là cốt lõi chứa mã nguồn và nội dung của trang web tĩnh (Static Site) sử dụng framework Hugo.

## Phân tích các nhiệm vụ của từng thư mục

Dưới đây là mô tả chi tiết nhiệm vụ và vai trò của từng file/thư mục bên trong `hugo-site`:

- **`content/`**: Đây là nơi chứa hầu hết mã nguồn nội dung trang web dưới dạng các tập tin Markdown (`.md`). Các bài học được đặt trong `content/docs/`.
- **`public/`**: Thư mục cực kỳ quan trọng được Hugo tự động sinh ra sau khi chạy lệnh biên dịch (build). Thư mục này chứa toàn bộ CSS, HTML, JS, Web Fonts, hình ảnh đã được render sẵn từ thư mục `content` và `themes`. Thư mục này sẵn sàng dùng để đưa lên các dịch vụ public site (Vercel, GitHub Pages, v.v.).
- **`static/`**: Chứa những tài nguyên tĩnh nguyên bản (hình ảnh, favicon, các file như `custom-inline-overrides.css` dùng để tách CSS khỏi HTML). Tất cả tài nguyên trong này sẽ được Hugo sao chép nguyên trạng 1:1 sang `public/`.
- **`themes/`**: Chứa mã nguồn của giao diện (theme) sử dụng cho website. Điển hình như `lotusdocs`.
- **`layouts/`**: Chứa các file giao diện gốc tùy chỉnh. Hiện tại thư mục này đã được override và phân nhỏ thành các partials (`head`, `header`, `footer`, `sidebar`) để quản lý template tốt hơn và loại bỏ các inline CSS cứng của theme mặc định.
- **`assets/`**: Nơi lưu trữ và xử lý các tệp tin cục bộ cần qua bộ tiền xử lý Hugo Pipes (VD: override các SVG logo, biên dịch SASS/SCSS sang CSS).
- **`data/`**: Chứa các tập tin dữ liệu bổ trợ dưới định dạng JSON, YAML hoặc TOML. Khi trang web build, Hugo có thể gọi ra để lấy thông tin kết xuất hàng loạt.
- **`archetypes/`**: Chứa các format khuôn mẫu mặc định. Khi dùng lệnh chạy để tạo bài viết mới bằng Hugo, nó sẽ sử dụng format trong `archetypes` để rải mẫu tiêu đề, ngày, thẻ, trạng thái cơ bản.
- **`resources/`**: Thư mục lưu trữ bộ nhớ đệm (cache) được sinh ra để tiết kiệm thời gian cho Hugo trong các lần build sau, ví dụ như lưu lại hình ảnh đã qua xử lý kích thước hoặc CSS đã chuyển đổi.
- **`i18n/`**: Thư mục phục vụ định nghĩa đa ngôn ngữ (Internationalization) giúp web hỗ trợ nhiều ngôn ngữ cùng lúc.
- **`hugo.yaml`**: Tập tin cấu hình tối quan trọng, định nghĩa cấu trúc website (tiêu đề, phân trang, thông số menu, URL,...).
- **`go.mod`** & **`go.sum`**: Hệ thống theo dõi phiên bản, định nghĩa các module phụ thuộc của Hugo (thường dùng để hỗ trợ cài đặt theme dưới dạng Hugo Modules).
