# CẨM NANG HƯỚNG DẪN TỰ CHỈNH SỬA WEBSITE

Tài liệu này hướng dẫn cách chỉnh sửa nội dung của website tĩnh, cập nhật source lên GitHub và để Vercel tự động triển khai phiên bản mới.

---

## 1. CÁC FILE QUAN TRỌNG

| File / thư mục | Chức năng |
| --- | --- |
| `assets/js/data.js` | Dữ liệu hiển thị của website như hồ sơ mẫu, điểm số, học phí, lịch thi, tin tức và dữ liệu tra cứu. |
| `index.html` | Nội dung và bố cục trang chính. |
| `login.html` | Giao diện trang đăng nhập. |
| `assets/logo/` | Logo, banner và một số hình ảnh giao diện. |
| `assets/css/style.css` | Màu sắc, kích thước, font chữ và giao diện. |
| `assets/js/app.js` | Logic JavaScript và các chức năng tương tác. |

Nếu chỉ cần thay đổi dữ liệu hiển thị, ưu tiên chỉnh sửa `assets/js/data.js`.

---

## 2. SỬA DỮ LIỆU HIỂN THỊ

Mở `assets/js/data.js`, tìm đúng nhóm dữ liệu cần chỉnh và chỉ thay đổi phần giá trị.

Ví dụ:

```javascript
{
    hoTen: "NGUYEN VAN A",
    maSV: "MASV_MAU",
    lop: "TEN_LOP",
    gpa: 3.45,
    tinhTrang: "Con hoc"
}
```

Khi sửa dữ liệu JavaScript, cần giữ nguyên cấu trúc dấu ngoặc `{ }`, `[ ]`, dấu phẩy `,` và dấu nháy nếu không chắc chắn về cú pháp.

---

## 3. SỬA TIN TỨC / THÔNG BÁO

Trong `assets/js/data.js`, tìm phần dữ liệu tin tức và chỉnh nội dung cần thiết.

Ví dụ:

```javascript
{
    id: 1001,
    category: "thong-bao-chung",
    categoryName: "Thong bao chung",
    title: "Tieu de thong bao",
    date: "14/09/2026",
    isPinned: false,
    views: 0,
    content: `
        <p>Noi dung thong bao.</p>
    `,
    author: "Ban quan tri"
}
```

Mỗi `id` nên là duy nhất.

---

## 4. THAY LOGO, BANNER VÀ HÌNH ẢNH

Các hình ảnh thường nằm trong `assets/`, `assets/logo/` hoặc `image/`.

Cách đơn giản nhất để thay ảnh mà không cần sửa code:

1. Chuẩn bị ảnh mới.
2. Giữ đúng tên file và phần mở rộng giống file cũ.
3. Thay file cũ bằng file mới.
4. Commit thay đổi lên GitHub.

Ví dụ:

```text
assets/logo/logo.png
assets/logo/banner.jpg
```

Nếu giữ nguyên tên file thì thường không cần sửa lại đường dẫn trong HTML/CSS.

---

## 5. HƯỚNG DẪN NHANH CHO KHÁCH HÀNG — SỬA FILE TRỰC TIẾP TRÊN GITHUB

Đây là cách dễ nhất nếu chỉ cần chỉnh một vài nội dung nhỏ và không muốn cài phần mềm lập trình.

1. Đăng nhập GitHub bằng tài khoản đã được cấp quyền truy cập repository.
2. Mở repository của website.
3. Chọn file cần sửa, ví dụ `assets/js/data.js`, `index.html` hoặc `login.html`.
4. Nhấn biểu tượng **bút chì — Edit this file**.
5. Tìm đúng nội dung cần thay đổi.
6. Chỉ sửa phần cần thiết, hạn chế thay đổi cấu trúc code nếu không hiểu rõ.
7. Nhấn **Commit changes...**.
8. Nhập mô tả, ví dụ `Cap nhat noi dung website`.
9. Commit thay đổi vào nhánh `main` nếu tài khoản được phép.
10. Nếu repository đã liên kết với Vercel, Vercel sẽ tự động triển khai phiên bản mới.

### Lưu ý quan trọng

Trước khi sửa một đoạn lớn, nên sao chép đoạn cũ ra Notepad để có thể khôi phục nếu cần.

Không xóa các ký tự như:

```text
{ } [ ] , " ' `
```

nếu không chắc chắn chúng dùng để làm gì.

---

## 6. SỬA WEBSITE BẰNG VS CODE

### Bước 1 — Tải source về máy

Mở Terminal / PowerShell:

```powershell
git clone https://github.com/mynh19122003/clone-hvnh.git
cd clone-hvnh
```

### Bước 2 — Mở bằng VS Code

```powershell
code .
```

Sau đó chọn file cần sửa ở thanh bên trái.

### Bước 3 — Chạy thử website trên máy

Nếu máy có Python:

```powershell
python -m http.server 8080
```

Mở trình duyệt:

```text
http://localhost:8080
```

Hoặc sử dụng extension **Live Server** trong VS Code.

### Bước 4 — Đưa thay đổi lên GitHub

```powershell
git add .
git commit -m "Cap nhat noi dung website"
git push origin main
```

---

## 7. VERCEL TỰ ĐỘNG CẬP NHẬT WEBSITE

Nếu project Vercel đã liên kết với repository GitHub này thì thông thường **không cần upload source thủ công lên Vercel**.

Quy trình hoạt động:

```text
Sua code
   ↓
Commit / Push GitHub
   ↓
Vercel phat hien commit moi
   ↓
Tu dong deploy
   ↓
Website duoc cap nhat
```

Sau khi push code, mở Vercel và kiểm tra deployment mới đã ở trạng thái `Ready` hay chưa.

---

## 8. WEBSITE CHƯA HIỂN THỊ THAY ĐỔI THÌ LÀM GÌ?

Kiểm tra theo thứ tự:

1. Thay đổi đã được commit lên GitHub chưa.
2. Vercel đã nhận commit mới chưa.
3. Deployment trên Vercel có trạng thái `Ready` không.
4. Nhấn `Ctrl + F5` hoặc `Ctrl + Shift + R` trên trình duyệt.
5. Thử mở website bằng cửa sổ ẩn danh.
6. Nếu deployment báo lỗi, kiểm tra lại file vừa chỉnh gần nhất.

---

## 9. FILE NÀO KHÁCH HÀNG NÊN VÀ KHÔNG NÊN TỰ SỬA?

Khách hàng có thể tự sửa các nội dung đơn giản trong:

```text
assets/js/data.js
index.html
login.html
```

Nếu chỉ cần cập nhật nội dung hoặc dữ liệu, không nên chỉnh sâu vào:

```text
assets/js/app.js
assets/css/style.css
```

Các thay đổi lớn về giao diện, JavaScript, logic đăng nhập hoặc cấu trúc website nên được người phát triển kiểm tra trước khi đưa lên bản chính thức.

---

## 10. QUY TRÌNH AN TOÀN KHUYẾN NGHỊ

```text
1. Sao lưu noi dung cu
2. Chi sua mot noi dung moi lan
3. Luu / Commit
4. Cho Vercel deploy
5. Kiem tra website
6. Neu dung thi moi tiep tuc sua muc tiep theo
```

Làm theo quy trình này giúp dễ xác định nguyên nhân nếu một thay đổi làm website hiển thị sai.