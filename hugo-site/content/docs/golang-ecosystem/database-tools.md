---
title: "Database Tools"
description: "Công cụ thao tác với cơ sở dữ liệu"
weight: 330
draft: false
---

# Database Tools trong Go

Có hai trường phái chính khi làm việc với CSDL trong Go: Dùng **ORM (Object-Relational Mapping)** hoặc viết **SQL thuần**.

## 1. GORM (ORM)
- Viết bằng Go và cực kỳ phổ biến.
- Hỗ trợ tốt các thao tác CRUD, Associations (Has One, Has Many), Hooks, và Migrations.
- *Nhược điểm*: Có thể chậm hơn một chút và đôi khi xuất ra SQL khó lường với các truy vấn phức tạp.

## 2. sqlx (SQL Builder)
- Bản mở rộng của thư viện chuẩn `database/sql`.
- Cho phép bạn viết SQL thuần nhưng dễ dàng map kết quả vào các \`struct\` của Go.
- Nhanh, an toàn và rõ ràng.

## 3. Ent (Entity Component)
- Framework ORM mạnh mẽ được Facebook phát triển và mã nguồn mở.
- Graph-based, type-safe (an toàn kiểu dữ liệu).

## Database Drivers

Bất kể dùng ORM hay SQL thuần, bạn cần một Driver tương ứng cho CSDL của mình:
- PostgreSQL: `github.com/lib/pq` hoặc `pgx`
- MySQL/MariaDB: `github.com/go-sql-driver/mysql`
- SQLite: `github.com/mattn/go-sqlite3`
