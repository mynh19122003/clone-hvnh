# Clone Cổng Thông Tin Đào Tạo Học Viện Ngân Hàng (online.hvnh.edu.vn)

Website clone giao diện và đầy đủ các chức năng của Cổng thông tin đào tạo Học viện Ngân hàng (Banking Academy of Vietnam - https://online.hvnh.edu.vn/).

---

## 🚀 Các tính năng chính (Full Features)

1. **Trang chủ & Tin tức / Thông báo:**
   - Banner chuẩn độ phân giải cao của Học viện Ngân hàng.
   - Menu điều hướng chính: *Trang chủ, Tra cứu văn bằng, Tra cứu thời khóa biểu, Tra cứu tuyển sinh, Viện Đào tạo Quốc tế, Đăng nhập*.
   - Thanh Menu Accordion bên trái với đầy đủ các danh mục gốc:
     - Thông báo chung
     - Quy định, quy chế đào tạo
     - Quy trình đào tạo
     - Tốt nghiệp
     - Thông báo học phí
     - Thời khóa biểu, đăng ký học
     - Lịch thi
     - Học bổng, khen thưởng
     - Chương trình đào tạo
     - Cảnh báo học tập, ngừng học, thôi học
     - Kết quả học tập (Menu con: Công nhận KQHT, Cộng điểm, Phúc khảo, Khóa luận, Quốc phòng, Khác...)
     - Các biểu mẫu
     - Chuẩn đầu ra ngoại ngữ, tin học
     - Viện Đào tạo Quốc tế (Menu con đầy đủ)
   - Thanh tìm kiếm nhanh tin tức / thông báo.
   - Danh sách tin tức ghim, ngày đăng, lượt xem, phân trang [1] 2 3 4...
   - Xem chi tiết từng thông báo, tải văn bản đính kèm mẫu, in thông báo.

2. **Tra cứu văn bằng:**
   - Form tìm kiếm theo: Họ tên, Ngày sinh, Số hiệu bằng, Mã số sinh viên, Năm tốt nghiệp.
   - Bảng kết quả trả về: Mã SV, Họ tên, Số vào sổ, Số hiệu bằng, Hệ đào tạo, Ngày sinh, Xếp loại, Năm TN.
   - Xem chi tiết Bằng Cử nhân chính quy với hoa văn phôi bằng, quốc huy, dấu mộc và chữ ký Giám đốc Học viện.
   - Xem mẫu phôi văn bằng chứng chỉ chuẩn Bộ Giáo dục & Đào tạo.

3. **Tra cứu thời khóa biểu:**
   - 4 chế độ tra cứu trực quan:
     - **TKB Lớp**
     - **TKB Giảng viên**
     - **TKB Phòng học**
     - **TKB Môn học**
   - Bộ lọc Năm học (2026-2027...), Học kỳ (HK1, HK2, HK3), Tuần học (Tuần 1, 2, 3...), Lớp sinh viên/Giảng viên/Phòng.
   - Ma trận thời khóa biểu từ Thứ 2 đến Chủ nhật phân theo các ca: Sáng (Tiết 1-6), Chiều (Tiết 7-12), Tối (Tiết 13-15).
   - Chi tiết từng học phần: Tên môn, Mã lớp HP, Phòng học, Giảng viên, Tiết học.
   - Nút In thời khóa biểu.

4. **Tra cứu tuyển sinh:**
   - Tra cứu danh sách thí sinh xét tuyển sớm bằng số CCCD / CMTND hoặc Mã hồ sơ.
   - Hiển thị kết quả xét tuyển: Ngành xét tuyển, Điểm từng môn, Điểm ưu tiên, Điểm chuẩn, Trạng thái đủ điều kiện trúng tuyển.
   - Mục lưu ý và hướng dẫn thủ tục nhập học của Bộ GD&ĐT.

5. **Cổng thông tin sinh viên & Đăng nhập:**
   - Giao diện đăng nhập chuẩn Cổng thông tin đào tạo Học viện Ngân hàng.
   - Trình tạo mã bảo vệ (Captcha) ngẫu nhiên bằng Canvas với nút "Đổi mã".
   - Tài khoản mẫu demo sẵn:
     - **Mã sinh viên:** `21A4010123`
     - **Mật khẩu:** `123`
   - Đăng nhập thành công vào **Dashboard Sinh viên**:
     - *Hồ sơ sinh viên:* Xem thông tin cá nhân, lớp, ngành học, số tín chỉ tích lũy, điểm GPA, điểm rèn luyện.
     - *Kết quả học tập:* Bảng điểm các môn chi tiết (Chuyên cần, Giữa kỳ, Cuối kỳ, Thang 10, Điểm chữ, Thang 4).
     - *Đăng ký học phần:* Chọn môn học bổ sung, lưu đăng ký học phần.
     - *Tra cứu học phí:* Chi tiết công nợ, số tiền đã đóng, biên lai điện tử.

---

## 📂 Cấu trúc thư mục

```
Clone-Web/
├── index.html              # Trang chủ SPA tích hợp toàn bộ các chức năng
├── login.html              # Trang đăng nhập chuyên biệt
├── assets/
│   ├── css/
│   │   └── style.css       # Toàn bộ stylesheet chuẩn thiết kế Học viện Ngân hàng
│   ├── js/
│   │   ├── data.js         # Dữ liệu mô phỏng tin tức, văn bằng, TKB, tuyển sinh, tài khoản
│   │   └── app.js          # Logic điều hướng, tìm kiếm, tính toán, xác thực
│   └── logo/
│       ├── banner.jpg      # Banner chính thức của Học viện Ngân hàng
│       └── logo.png        # Logo chính thức của Học viện Ngân hàng
└── README.md
```

## 💻 Hướng dẫn mở và sử dụng

1. **Mở trực tiếp:**
   - Nhấp đúp vào file `index.html` trong trình duyệt web bất kỳ (Chrome, Edge, Firefox).
2. **Chạy qua Local Server (tùy chọn):**
   - Chạy lệnh:
     ```bash
     npx serve .
     # hoặc
     python -m http.server 8080
     ```
   - Truy cập `http://localhost:8080`
