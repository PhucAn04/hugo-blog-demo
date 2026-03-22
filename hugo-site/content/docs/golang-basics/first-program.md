---
title: "Chương trình đầu tiên"
description: "Hello World trong Go"
weight: 230
draft: false
---

# Chương trình Go đầu tiên

Hãy cùng nhau viết chương trình kinh điển "Hello World" trong Go.

Tạo một file có tên `main.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, 4GO!")
}
```

## Giải thích

1. `package main`: Báo cho compiler biết file này sẽ được biên dịch thành một chương trình chạy được (executable).
2. `import "fmt"`: Import thư viện chuẩn `fmt` (format) để dùng hàm in ra màn hình.
3. `func main()`: Hàm chính, điểm bắt đầu của mọi chương trình Go.

## Cách chạy

Mở terminal và gõ:

```bash
go run main.go
```
Kết quả: `Hello, 4GO!`
