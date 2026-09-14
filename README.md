# CẨM NANG HƯỚNG DẪN TỰ CHỈNH SỬA THÔNG TIN TRÊN WEBSITE

Tài liệu này hướng dẫn chi tiết cách tự chỉnh sửa toàn bộ các thông tin hiển thị trên website (thông tin sinh viên, điểm số, học phí, lịch thi, tin tức, văn bằng, thời khóa biểu, hình ảnh, thông tin trường...).

---

## 📁 1. BẢN ĐỒ CÁC FILE CHỨA NỘI DUNG

Website được thiết kế tĩnh (Static Web), toàn bộ dữ liệu mẫu và nội dung hiển thị được phân loại rõ ràng trong các file sau:

| File cần sửa | Chức năng chính |
| :--- | :--- |
| **`assets/js/data.js`** | **Nơi quan trọng nhất:** Chứa toàn bộ dữ liệu sinh viên (hồ sơ, điểm số, học phí, hóa đơn, lịch thi...), tin tức thông báo, dữ liệu tra cứu văn bằng, thời khóa biểu, tuyển sinh. |
| **`index.html`** | Chứa khung giao diện trang chủ, banner, thanh menu điều hướng, thông tin liên hệ ở chân trang (địa chỉ, số điện thoại, email trường). |
| **`login.html`** | Giao diện trang đăng nhập, form đăng nhập, captcha. |
| **`assets/logo/`** | Thư mục chứa hình ảnh logo trường (`logo.png`) và banner đầu trang (`banner.jpg`). |
| **`assets/css/style.css`** | Chứa màu sắc, phông chữ, kích thước, hiệu ứng hiển thị của website. |
| **`assets/js/app.js`** | Logic xử lý điều hướng, tính toán hiển thị, đóng mở popup. |

---

## 👤 2. HƯỚNG DẪN SỬA THÔNG TIN SINH VIÊN & TÀI KHOẢN ĐĂNG NHẬP

Mở file: **`assets/js/data.js`** và tìm đến đoạn `students: {` (khoảng dòng 733 trở đi).

Mỗi tài khoản sinh viên được lưu dưới dạng một khối thông tin theo Mã định danh / Tên đăng nhập (ví dụ: `"008307000568"`).

### 2.1. Đổi tài khoản & mật khẩu đăng nhập
```javascript
"008307000568": {
    username: "008307000568", // Tên đăng nhập
    password: "123",          // Mật khẩu đăng nhập
    hoTen: "NGUYỄN VĂN A",    // Tên hiển thị sau khi đăng nhập
```

### 2.2. Sửa thông tin cá nhân & lý lịch sinh viên
Bạn chỉ cần thay đổi các giá trị trong dấu ngoặc kép:
```javascript
    hoTen: "NGUYỄN VĂN A",                  // Họ và tên
    maSV: "21A4010123",                     // Mã số sinh viên
    gioiTinh: "Nam",                        // Nam hoặc Nữ
    ngaySinh: "15/08/2003",                 // Ngày sinh
    noiSinh: "Hà Nội",                      // Nơi sinh
    cmnd: "001203004567",                   // Số CCCD / CMND
    tinhTrang: "Còn học",                   // Tình trạng học tập
    email: "anv21a4010@hvnh.edu.vn",        // Email sinh viên cấp
    lop: "K24-TCNH01",                      // Lớp sinh viên
    nienKhoa: "2021 - 2025",                // Niên khóa
    khoaHoc: "K24 (2021 - 2025)",           // Khóa học
    loaiHinhDaoTao: "Đại học chính quy",    // Hệ đào tạo
    chucVu: "Sinh viên",                    // Chức vụ trong lớp
    coVanHocTap: "TS. Nguyễn Văn B",        // Tên cố vấn học tập
```

### 2.3. Sửa điểm tổng kết GPA và Điểm rèn luyện
Tìm đến các trường sau trong object của sinh viên:
```javascript
    tinChiTichLuy: 110,   // Số tín chỉ tích lũy
    gpa: 3.45,           // Điểm GPA thang 4
    gpa10: 8.25,         // Điểm GPA thang 10
    xepLoai: "Giỏi",     // Xếp loại học lực (Xuất sắc / Giỏi / Khá / Trung bình)
    drl: 88,             // Điểm rèn luyện
    xepLoaiDRL: "Tốt",   // Xếp loại rèn luyện (Xuất sắc / Tốt / Khá)
```

### 2.4. Sửa bảng điểm chi tiết các môn học (Kết quả học tập)
Tìm đến mảng `marks: [` của sinh viên:
```javascript
    marks: [
        { 
            maHP: "FIN01A", 
            tenHP: "Tài chính tiền tệ", 
            soTC: 3, 
            diemChuyenCan: "9.0", 
            diemGiuaKy: "8.5", 
            diemThi: "8.0", 
            diemTongKet: "8.3", 
            diemChu: "B+", 
            thang4: "3.5", 
            ketQua: "Đạt" 
        },
        // Thêm hoặc sửa các môn học khác tương tự...
    ]
```

### 2.5. Sửa thông tin Tài chính sinh viên & Hóa đơn
- **Khoản nợ / Học phí**: Tìm đến `taiChinh: {`
  ```javascript
  taiChinh: {
      hocKy: "Học kỳ 1 năm học 2026-2027",
      tongPhaiNop: "9.500.000",
      daNop: "9.500.000",
      conNo: "0",
      trangThai: "Đã hoàn thành"
  }
  ```
- **Lịch sử hóa đơn**: Tìm đến `hoaDon: [`:
  ```javascript
  hoaDon: [
      { 
          id: 1, 
          soHD: "HD2026-00129", 
          ngayPhatHanh: "20/03/2026", 
          soTien: "9.500.000 đ", 
          noiDung: "Thu học phí Học kỳ 1 năm học 2026-2027", 
          trangThai: "Đã thanh toán" 
      }
  ]
  ```

### 2.6. Sửa Lịch thi sinh viên
Tìm đến `lichThi: [`:
```javascript
    lichThi: [
        {
            maHP: "FIN01A",
            tenHP: "Tài chính doanh nghiệp",
            ngayThi: "25/12/2026",
            caThi: "Ca 2 (09h30 - 11h00)",
            phongThi: "D1-302",
            soBaoDanh: "24",
            hinhThuc: "Tự luận"
        }
    ]
```

---

## 📰 3. HƯỚNG DẪN THÊM / SỬA TIN TỨC & THÔNG BÁO

Mở file: **`assets/js/data.js`** và tìm đến mảng `news: [` (khoảng dòng 44 trở đi).

Để thêm một bài viết / thông báo mới, hãy sao chép mẫu sau và thêm vào đầu danh sách:
```javascript
{
    id: 17099,                                // Mã bài viết (không trùng nhau)
    category: "thong-bao-chung",              // Mã danh mục (xem bên dưới)
    categoryName: "Thông báo chung",          // Tên danh mục hiển thị
    title: "Tiêu đề thông báo của bạn ở đây", // Tiêu đề bài viết
    date: "14/09/2026",                       // Ngày đăng
    isPinned: true,                           // true = ghim lên đầu; false = bình thường
    views: 1250,                              // Số lượt xem ban đầu
    content: `
        <p>Đoạn văn mở đầu thông báo...</p>
        <p>Nội dung chi tiết của bài viết.</p>
        <ul>
            <li>Mục 1</li>
            <li>Mục 2</li>
        </ul>
    `,
    author: "Phòng Quản lý Đào tạo"
},
```

> **Danh mục bài viết (`category`):**
> - `"thong-bao-chung"`: Thông báo chung
> - `"quy-che"`: Quy định, quy chế đào tạo
> - `"quy-trinh"`: Quy trình đào tạo
> - `"tot-nghiep"`: Tốt nghiệp
> - `"hoc-phi"`: Thông báo học phí
> - `"dang-ky-hoc"`: Thời khóa biểu, đăng ký học
> - `"lich-thi"`: Lịch thi
> - `"hoc-bong"`: Học bổng, khen thưởng
> - `"chuan-dau-ra"`: Chuẩn đầu ra ngoại ngữ, tin học
> - `"vien-quoc-te"`: Viện Đào tạo Quốc tế

---

## 🔍 4. HƯỚNG DẪN SỬA DỮ LIỆU CÁC TRANG TRA CỨU

Trong file **`assets/js/data.js`**:

### 4.1. Tra cứu văn bằng (`HVNH_DATA.degrees`)
Tìm đến `degrees: [`:
```javascript
{
    id: 1,
    soHieu: "B2025-HVNH-04123",       // Số hiệu văn bằng
    soVaoSo: "1234/QĐ-HVNH",          // Số vào sổ cấp bằng
    hoTen: "NGUYỄN VĂN A",            // Họ tên người được cấp
    ngaySinh: "15/08/2003",           // Ngày sinh
    nganhHoc: "Tài chính - Ngân hàng",// Ngành đào tạo
    namTotNghiep: "2025",             // Năm tốt nghiệp
    xepLoai: "Giỏi",                  // Xếp loại tốt nghiệp
    hinhThuc: "Chính quy"             // Hình thức đào tạo
}
```

### 4.2. Tra cứu tuyển sinh (`HVNH_DATA.admissions`)
Tìm đến `admissions: [`:
```javascript
{
    cccd: "001203004567",             // Số CCCD để tra cứu
    maHoSo: "XT2026-0812",            // Mã hồ sơ
    hoTen: "NGUYỄN VĂN A",            // Họ tên thí sinh
    ngaySinh: "15/08/2007",           // Ngày sinh
    nganhXetTuyen: "Ngân hàng số",    // Ngành xét tuyển
    toHop: "A00",                     // Tổ hợp môn
    tongDiem: "27.50",                // Tổng điểm
    diemChuan: "26.00",               // Điểm chuẩn ngành
    ketQua: "Trúng tuyển"             // Trạng thái trúng tuyển
}
```

---

## 🏫 5. HƯỚNG DẪN THAY ĐỔI HÌNH ẢNH & THÔNG TIN TRƯỜNG

### 5.1. Thay đổi Logo và Banner
- **Logo trường**: Thay thế file tại đường dẫn: `assets/logo/logo.png`.
- **Banner lớn đầu trang**: Thay thế file tại đường dẫn: `assets/logo/banner.jpg`.
*(Lưu ý: Giữ nguyên tên file để website tự nhận diện mà không cần sửa code).*

### 5.2. Sửa thông tin liên hệ, hotline, địa chỉ
Mở file **`index.html`**, cuộn xuống phần chân trang (thẻ `<footer>` khoảng dòng 260):
- Địa chỉ: `Số 12, đường Chùa Bộc, Quận Đống Đa, Hà Nội`
- Website: `www.hvnh.edu.vn`
- Email: `phongdaotao@hvnh.edu.vn`
- Điện thoại: `+84 243 852 1305`

---

## ⚡ 6. CÁCH LƯU & CẬP NHẬT LÊN GITHUB & VERCEL

Sau khi chỉnh sửa xong các file trên máy tính của bạn:

### Bước 1: Lưu thay đổi và đẩy lên GitHub
Mở cửa sổ dòng lệnh (Terminal / PowerShell) tại thư mục `f:\Code\Clone-Web` và chạy:
```powershell
git add .
git commit -m "Cap nhat thong tin moi"
git push origin main
```

### Bước 2: Triển khai tự động lên Vercel
Chạy tiếp lệnh sau để xuất bản trực tiếp lên link website:
```powershell
npx vercel --prod --yes
```

### Bước 3: Kiểm tra và xem kết quả
- Truy cập vào link website: **https://clone-web-gray.vercel.app/**
- **Mẹo tránh bị lưu bộ nhớ đệm (Cache):** Nếu trên điện thoại hoặc máy tính chưa thấy đổi ngay, hãy nhấn tổ hợp phím **`Ctrl + Shift + R`** (hoặc `Ctrl + F5`) trên trình duyệt, hoặc mở ở tab ẩn danh để tải lại dữ liệu mới nhất.
