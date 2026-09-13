/**
 * Banking Academy of Vietnam (Học viện Ngân hàng) - Mock Data Store
 * Source & reference: https://online.hvnh.edu.vn/
 */

const HVNH_DATA = {
    // Categories on the left sidebar
    categories: [
        { id: "all", name: "Tất cả tin tức", count: 35 },
        { id: "thong-bao-chung", name: "Thông báo chung", count: 18 },
        { id: "quy-che", name: "Quy định, quy chế đào tạo", count: 6 },
        { id: "quy-trinh", name: "Quy trình đào tạo", count: 8 },
        { id: "tot-nghiep", name: "Tốt nghiệp", count: 12 },
        { id: "hoc-phi", name: "Thông báo học phí", count: 5 },
        { id: "dang-ky-hoc", name: "Thời khóa biểu, đăng ký học", count: 15 },
        { id: "lich-thi", name: "Lịch thi", count: 7 },
        { id: "hoc-bong", name: "Học bổng, khen thưởng", count: 9 },
        { id: "chuong-trinh", name: "Chương trình đào tạo", count: 11 },
        { id: "canh-bao", name: "Cảnh báo học tập, ngừng học, thôi học", count: 4 },
        { id: "ket-qua-hoc-tap", name: "Kết quả học tập", count: 14, children: [
            { id: "kqht-chuyen-doi", name: "Công nhận KQHT, chuyển đổi tín chỉ" },
            { id: "kqht-khuyen-khich", name: "Cộng điểm khuyến khích" },
            { id: "kqht-phuc-khao", name: "Phúc tra, phúc khảo" },
            { id: "kqht-khoa-luan", name: "Khóa luận, chuyên đề tốt nghiệp" },
            { id: "kqht-qp-an-ninh", name: "Quốc phòng an ninh" },
            { id: "kqht-khac", name: "Khác" }
        ]},
        { id: "bieu-mau", name: "Các biểu mẫu", count: 16 },
        { id: "chuan-dau-ra", name: "Chuẩn đầu ra ngoại ngữ, tin học", count: 8 },
        { id: "vien-quoc-te", name: "Thông tin dành cho sinh viên Viện Đào tạo Quốc tế", count: 20, children: [
            { id: "vqt-tan-sv", name: "Thông tin dành cho tân sinh viên" },
            { id: "vqt-quy-che", name: "Quy định, quy chế đào tạo" },
            { id: "vqt-dich-vu", name: "Hướng dẫn sử dụng các dịch vụ trực tuyến" },
            { id: "vqt-hoc-phi", name: "Học phí" },
            { id: "vqt-ren-luyen", name: "Rèn luyện, Học bổng, Khen thưởng" },
            { id: "vqt-canh-bao", name: "Cảnh báo học tập, ngừng học, buộc thôi học" },
            { id: "vqt-tot-nghiep", name: "Tốt nghiệp" },
            { id: "vqt-bieu-mau", name: "Các biểu mẫu" },
            { id: "vqt-kenh-tt", name: "Kênh thông tin Viện Đào tạo Quốc tế" }
        ]}
    ],

    // News & Announcements
    news: [
        {
            id: 16240,
            category: "thong-bao-chung",
            categoryName: "Thông báo chung",
            title: "Thông báo về việc điều chỉnh kế hoạch giảng dạy và học tập từ ngày 11/9 đến hết ngày 13/9/2026",
            date: "07/09/2026",
            isPinned: true,
            views: 4820,
            content: `
                <p>Căn cứ tình hình diễn biến thời tiết và chỉ đạo của Ban Giám đốc Học viện Ngân hàng;</p>
                <p>Nhằm đảm bảo an toàn tuyệt đối cho giảng viên, viên chức và người học, Phòng Quản lý Đào tạo thông báo điều chỉnh kế hoạch giảng dạy và học tập như sau:</p>
                <ul>
                    <li><strong>1. Hình thức học tập:</strong> Toàn bộ các lớp học phần lý thuyết tại Trụ sở chính (12 Chùa Bộc) và các Phân viện chuyển sang hình thức giảng dạy trực tuyến (MS Teams) từ sáng ngày 11/9/2026 đến hết ngày 13/9/2026.</li>
                    <li><strong>2. Thời khóa biểu:</strong> Thực hiện theo đúng khung giờ và thời khóa biểu đã ban hành trên Cổng thông tin đào tạo.</li>
                    <li><strong>3. Trách nhiệm của Giảng viên & Sinh viên:</strong> Giảng viên chủ động tạo đường link lớp học trên MS Teams và gửi mã/link vào nhóm lớp học phần trước giờ lên lớp tối thiểu 30 phút. Sinh viên tham gia lớp đầy đủ và thực hiện điểm danh nghiêm túc.</li>
                    <li><strong>4. Hỗ trợ kỹ thuật:</strong> Trung tâm Công nghệ thông tin hỗ trợ trực tuyến 24/7 qua hotline: (024) 3852 6419.</li>
                </ul>
                <p>Đề nghị các Khoa, Bộ môn và sinh viên các khóa nghiêm túc triển khai thực hiện.</p>
                <div class="well" style="margin-top:20px; background:#f9fbfd; border-left: 4px solid #056382;">
                    <strong>Tệp đính kèm:</strong><br/>
                    <a href="javascript:void(0)" class="btn btn-sm btn-primary" style="margin-top:5px;" onclick="HVNH.downloadDummy('TB_16240_DieuChinhKeHoachGiangDay.pdf')"><i class="glyphicon glyphicon-download-alt"></i> Tải thông báo số 16240/TB-HVNH (PDF, 250KB)</a>
                </div>
            `
        },
        {
            id: 16239,
            category: "dang-ky-hoc",
            categoryName: "Thời khóa biểu, đăng ký học",
            title: "THÔNG BÁO V/V ĐĂNG KÝ NGUYỆN VỌNG MỞ LỚP HỌC KỲ 1 NĂM HỌC 2026 - 2027",
            date: "07/09/2026",
            isPinned: true,
            views: 3512,
            content: `
                <p>Phòng Đào tạo thông báo tới toàn thể sinh viên hệ đại học chính quy về việc tiếp nhận đăng ký nguyện vọng mở thêm lớp học phần trong Học kỳ 1 năm học 2026 - 2027:</p>
                <ul>
                    <li><strong>Đối tượng:</strong> Sinh viên có nhu cầu học trả nợ, học vượt, học cải thiện điểm nhưng các lớp học phần hiện tại đã hết chỗ.</li>
                    <li><strong>Thời gian tiếp nhận nguyện vọng:</strong> Từ 08h00 ngày 08/09/2026 đến 17h00 ngày 12/09/2026.</li>
                    <li><strong>Hình thức đăng ký:</strong> Trực tuyến qua Cổng thông tin sinh viên tại mục <em>"Đăng ký học &gt; Nguyện vọng mở lớp"</em>.</li>
                    <li><strong>Điều kiện mở lớp bổ sung:</strong> Sĩ số đăng ký nguyện vọng đạt từ 30 sinh viên trở lên đối với học phần đại cương và từ 20 sinh viên đối với học phần chuyên ngành.</li>
                </ul>
                <div class="alert alert-info">Kết quả xét duyệt danh sách mở lớp sẽ được thông báo chính thức vào ngày 15/09/2026.</div>
            `
        },
        {
            id: 16238,
            category: "dang-ky-hoc",
            categoryName: "Thời khóa biểu, đăng ký học",
            title: "Kế hoạch đăng ký bổ sung: sinh viên các khóa trước đăng ký vào học phần của khóa 29, học kỳ 1, năm học 2026 - 2027",
            date: "07/09/2026",
            isPinned: false,
            views: 2980,
            content: `
                <p>Thực hiện kế hoạch năm học 2026-2027, Phòng Quản lý đào tạo thông báo kế hoạch đăng ký bổ sung vào các lớp học phần Khóa 29 (Tân sinh viên) cho sinh viên các khóa trước (K26, K27, K28):</p>
                <p>1. Cổng đăng ký sẽ mở theo khung giờ phân luồng từ ngày 10/09/2026.</p>
                <p>2. Lưu ý kiểm tra kỹ điều kiện tiên quyết và lịch học tránh trùng lịch thi.</p>
            `
        },
        {
            id: 16237,
            category: "dang-ky-hoc",
            categoryName: "Thời khóa biểu, đăng ký học",
            title: "Thông báo về việc cập nhật thời khóa biểu Học kỳ 1 năm học 2026-2027",
            date: "04/09/2026",
            isPinned: true,
            views: 5410,
            content: `
                <p>Phòng Đào tạo đã tiến hành rà soát và cập nhật thời khóa biểu Học kỳ 1 năm học 2026-2027 trên hệ thống tra cứu trực tuyến.</p>
                <p>Đề nghị các sinh viên truy cập chức năng <strong>Tra cứu thời khóa biểu</strong> để xem chi tiết lịch học, phòng học và giảng viên phụ trách theo từng tuần học.</p>
            `
        },
        {
            id: 16236,
            category: "tot-nghiep",
            categoryName: "Tốt nghiệp",
            title: "Kết quả xét tốt nghiệp học kỳ 3 năm học 2025-2026 dự kiến (Cập nhật ngày 10/9/2026)",
            date: "04/09/2026",
            isPinned: true,
            views: 4120,
            content: `
                <p>Hội đồng xét công nhận tốt nghiệp Học viện Ngân hàng công bố danh sách sinh viên dự kiến đủ điều kiện tốt nghiệp Học kỳ 3 năm học 2025-2026.</p>
                <p>Sinh viên kiểm tra kỹ các thông tin: Họ tên, Ngày sinh, Nơi sinh, Ngành đào tạo, Xếp loại tốt nghiệp. Nếu có sai sót cần gửi phản hồi về Phòng Đào tạo trước 17h00 ngày 15/09/2026.</p>
            `
        },
        {
            id: 16235,
            category: "dang-ky-hoc",
            categoryName: "Thời khóa biểu, đăng ký học",
            title: "Thông báo v/v tiếp nhận yêu cầu hủy đăng ký học phần tiếng Anh - Khóa 29",
            date: "29/08/2026",
            isPinned: false,
            views: 2450,
            content: `
                <p>Sinh viên Khóa 29 đã có chứng chỉ tiếng Anh quốc tế (IELTS từ 5.5 trở lên hoặc tương đương) nộp đơn xin miễn học và hủy học phần tiếng Anh cơ bản theo quy định.</p>
            `
        },
        {
            id: 16232,
            category: "dang-ky-hoc",
            categoryName: "Thời khóa biểu, đăng ký học",
            title: "Danh sách sinh viên vi phạm tiên quyết - HK1 năm học 26-27",
            date: "24/08/2026",
            isPinned: false,
            views: 3100,
            content: `
                <p>Căn cứ kết quả điểm học kỳ 2 và kỳ phụ hè năm học 2025-2026, Phòng Đào tạo thông báo danh sách sinh viên bị hủy học phần do không đạt học phần tiên quyết.</p>
            `
        },
        {
            id: 16231,
            category: "thong-bao-chung",
            categoryName: "Thông báo chung",
            title: "Thông báo Về kế hoạch nghỉ lễ Quốc khánh 02/09 và tổ chức đào tạo trực tuyến các ngày sau kỳ nghỉ lễ",
            date: "20/08/2026",
            isPinned: false,
            views: 1980,
            content: `
                <p>Học viện Ngân hàng thông báo lịch nghỉ Lễ Quốc khánh 02/09 và lịch dạy học trực tuyến bù cho các lớp có lịch trùng ngày nghỉ lễ.</p>
            `
        },
        {
            id: 16230,
            category: "dang-ky-hoc",
            categoryName: "Thời khóa biểu, đăng ký học",
            title: "KHẢO SÁT ĐĂNG KÝ HỌC PHẦN TIẾNG ANH VÀ HỌC PHẦN TỰ CHỌN ĐỐI VỚI SINH VIÊN K29 CHƯƠNG TRÌNH CHUẨN VÀ CHẤT LƯỢNG CAO TẠI TRỤ SỞ",
            date: "20/08/2026",
            isPinned: false,
            views: 2890,
            content: `
                <p>Nhằm chuẩn bị tốt cho việc tổ chức đào tạo khóa 29, Viện Đào tạo Quốc tế và Phòng Đào tạo tổ chức đợt khảo sát nguyện vọng tự chọn.</p>
            `
        },
        {
            id: 16228,
            category: "thong-bao-chung",
            categoryName: "Thông báo chung",
            title: "Thông báo điều chỉnh một số giảng đường Học kỳ I năm học 2026-2027 (D2.508 và D2.509)",
            date: "14/08/2026",
            isPinned: false,
            views: 1720,
            content: `
                <p>Do tiến hành nâng cấp hệ thống âm thanh và điều hòa tại nhà D2, các lớp tại giảng đường D2.508 và D2.509 tạm thời chuyển sang khu giảng đường D1.</p>
            `
        },
        {
            id: 16221,
            category: "tot-nghiep",
            categoryName: "Tốt nghiệp",
            title: "Thông báo Về việc nhận bằng tốt nghiệp Đợt 02 - Học kỳ 02 - Năm học 2025-2026",
            date: "11/08/2026",
            isPinned: false,
            views: 3890,
            content: `
                <p>Phòng Đào tạo tổ chức cấp phát văn bằng tốt nghiệp đợt 2 cho sinh viên đã hoàn thành thủ tục thanh toán ra trường. Thời gian nhận bằng từ ngày 18/08/2026.</p>
            `
        },
        {
            id: 16220,
            category: "dang-ky-hoc",
            categoryName: "Thời khóa biểu, đăng ký học",
            title: "Danh sách các lớp học phần hủy học kỳ 1 năm học 2026-2027",
            date: "10/08/2026",
            isPinned: false,
            views: 2600,
            content: `
                <p>Danh sách các lớp học phần không đủ điều kiện mở lớp do số lượng sinh viên đăng ký dưới mức tối thiểu quy định.</p>
            `
        },
        {
            id: 16215,
            category: "chuan-dau-ra",
            categoryName: "Chuẩn đầu ra ngoại ngữ, tin học",
            title: "Thông báo lịch tiếp nhận minh chứng xét chuẩn đầu ra NCKH đối với sinh viên hệ Chất lượng cao (Đợt T08/2026)",
            date: "03/08/2026",
            isPinned: false,
            views: 1450,
            content: `
                <p>Viện Nghiên cứu khoa học và Đào tạo sau đại học tiếp nhận hồ sơ bài báo, đề tài NCKH xét chuẩn đầu ra sinh viên CLC đợt tháng 8/2026.</p>
            `
        },
        {
            id: 16213,
            category: "tot-nghiep",
            categoryName: "Tốt nghiệp",
            title: "Kế hoạch thực tập, chuyên đề khóa luận tốt nghiệp Học kỳ 1 năm học 2026-2027",
            date: "28/07/2026",
            isPinned: false,
            views: 3240,
            content: `
                <p>Kế hoạch chi tiết phân công giảng viên hướng dẫn thực tập tốt nghiệp và chuyên đề/khóa luận dành cho sinh viên năm cuối khóa 26.</p>
            `
        },
        {
            id: 14207,
            category: "quy-trinh",
            categoryName: "Quy trình đào tạo",
            title: "Kế hoạch học tập toàn khóa năm học 2026-2027",
            date: "08/07/2026",
            isPinned: false,
            views: 4900,
            content: `
                <p>Lịch trình chi tiết các học kỳ, thời gian đăng ký học tín chỉ, tuần nghỉ lễ tết và lịch thi chung cho tất cả các hệ đào tạo trong năm học 2026-2027.</p>
            `
        }
    ],

    // Degree Verification Database (Tra cứu văn bằng)
    degrees: [
        {
            maSV: "21A4010123",
            hoTen: "Nguyễn Hoàng Nam",
            ngaySinh: "15/08/2003",
            gioiTinh: "Nam",
            nganh: "Tài chính - Ngân hàng",
            chuyenNganh: "Ngân hàng thương mại",
            khoaHoc: "Khóa 24 (2021 - 2025)",
            bacDaoTao: "Đại học",
            loaiHinh: "Chính quy",
            soHieuVanBang: "B2025-HVNH-04123",
            soVaoSo: "1254/QĐ-HVNH",
            namTotNghiep: "2025",
            xepLoai: "Giỏi",
            diemTichLuy: "3.58",
            quyetDinh: "Số 1589/QĐ-HVNH ngày 25/06/2025 của Giám đốc Học viện Ngân hàng",
            ngayCap: "30/06/2025"
        },
        {
            maSV: "21A4020054",
            hoTen: "Trần Mai Phương",
            ngaySinh: "22/11/2003",
            gioiTinh: "Nữ",
            nganh: "Kế toán",
            chuyenNganh: "Kế toán kiểm toán",
            khoaHoc: "Khóa 24 (2021 - 2025)",
            bacDaoTao: "Đại học",
            loaiHinh: "Chính quy (Chất lượng cao)",
            soHieuVanBang: "B2025-HVNH-04899",
            soVaoSo: "1255/QĐ-HVNH",
            namTotNghiep: "2025",
            xepLoai: "Xuất sắc",
            diemTichLuy: "3.84",
            quyetDinh: "Số 1589/QĐ-HVNH ngày 25/06/2025 của Giám đốc Học viện Ngân hàng",
            ngayCap: "30/06/2025"
        },
        {
            maSV: "20A4030112",
            hoTen: "Lê Quốc Bảo",
            ngaySinh: "08/04/2002",
            gioiTinh: "Nam",
            nganh: "Công nghệ thông tin",
            chuyenNganh: "Hệ thống thông tin quản lý",
            khoaHoc: "Khóa 23 (2020 - 2024)",
            bacDaoTao: "Đại học",
            loaiHinh: "Chính quy",
            soHieuVanBang: "B2024-HVNH-03182",
            soVaoSo: "0982/QĐ-HVNH",
            namTotNghiep: "2024",
            xepLoai: "Giỏi",
            diemTichLuy: "3.45",
            quyetDinh: "Số 1204/QĐ-HVNH ngày 28/06/2024 của Giám đốc Học viện Ngân hàng",
            ngayCap: "05/07/2024"
        },
        {
            maSV: "20A4040201",
            hoTen: "Phạm Thu Hà",
            ngaySinh: "03/09/2002",
            gioiTinh: "Nữ",
            nganh: "Quản trị kinh doanh",
            chuyenNganh: "Marketing số",
            khoaHoc: "Khóa 23 (2020 - 2024)",
            bacDaoTao: "Đại học",
            loaiHinh: "Chính quy",
            soHieuVanBang: "B2024-HVNH-03512",
            soVaoSo: "0983/QĐ-HVNH",
            namTotNghiep: "2024",
            xepLoai: "Khá",
            diemTichLuy: "3.15",
            quyetDinh: "Số 1204/QĐ-HVNH ngày 28/06/2024 của Giám đốc Học viện Ngân hàng",
            ngayCap: "05/07/2024"
        },
        {
            maSV: "19A4010889",
            hoTen: "Đỗ Anh Tuấn",
            ngaySinh: "19/01/2001",
            gioiTinh: "Nam",
            nganh: "Tài chính - Ngân hàng",
            chuyenNganh: "Tài chính quốc tế",
            khoaHoc: "Khóa 22 (2019 - 2023)",
            bacDaoTao: "Đại học",
            loaiHinh: "Chính quy",
            soHieuVanBang: "B2023-HVNH-02741",
            soVaoSo: "0751/QĐ-HVNH",
            namTotNghiep: "2023",
            xepLoai: "Giỏi",
            diemTichLuy: "3.52",
            quyetDinh: "Số 890/QĐ-HVNH ngày 20/06/2023 của Giám đốc Học viện Ngân hàng",
            ngayCap: "28/06/2023"
        }
    ],

    // Classes for Timetable Lookup
    classes: [
        { id: "K27NHA", name: "K27NHA - Ngân hàng A Khóa 27" },
        { id: "K27NHB", name: "K27NHB - Ngân hàng B Khóa 27" },
        { id: "K27TCA", name: "K27TCA - Tài chính A Khóa 27" },
        { id: "K28CLC-NHA", name: "K28CLC-NHA - Ngân hàng CLC A Khóa 28" },
        { id: "K28CLC-KTA", name: "K28CLC-KTA - Kế toán CLC A Khóa 28" },
        { id: "K28ATCA", name: "K28ATCA - An ninh thông tin A Khóa 28" },
        { id: "K28CNTTA", name: "K28CNTTA - CNTT A Khóa 28" },
        { id: "K29CLC-KTA", name: "K29CLC-KTA - Kế toán CLC A Khóa 29" },
        { id: "K29ATCA", name: "K29ATCA - An ninh thông tin Khóa 29" }
    ],

    // Professors for Timetable Lookup
    professors: [
        { id: "GV001", name: "PGS.TS. Lê Đình Hoàng" },
        { id: "GV002", name: "TS. Nguyễn Văn Hùng" },
        { id: "GV003", name: "ThS. Trần Thị Mai Phương" },
        { id: "GV004", name: "TS. Vũ Hoàng Long" },
        { id: "GV005", name: "ThS. Phạm Thanh Hương" },
        { id: "GV006", name: "TS. Đỗ Đức Minh" }
    ],

    // Rooms for Timetable Lookup
    rooms: [
        { id: "D1.201", name: "D1.201 - Giảng đường D1 tầng 2" },
        { id: "D2.304", name: "D2.304 - Giảng đường D2 tầng 3" },
        { id: "D2.508", name: "D2.508 - Giảng đường D2 tầng 5" },
        { id: "D3.101", name: "D3.101 - Phòng máy tính D3" },
        { id: "HT.HOI_TRUONG_LON", name: "Hội trường lớn HVNH" }
    ],

    // Subjects
    subjects: [
        { id: "FIN101", name: "Kế toán tài chính 1 (3 TC)" },
        { id: "BNK201", name: "Nghiệp vụ Ngân hàng thương mại (3 TC)" },
        { id: "MGT102", name: "Quản trị học căn bản (2 TC)" },
        { id: "ECO202", name: "Kinh tế vĩ mô (3 TC)" },
        { id: "IT105", name: "Hệ quản trị cơ sở dữ liệu (3 TC)" },
        { id: "LAW101", name: "Luật kinh tế và Ngân hàng (2 TC)" }
    ],

    // Schedule Matrix Data
    schedules: {
        "K27NHA": {
            2: { // Thứ 2
                sang: { subject: "Nghiệp vụ Ngân hàng thương mại", code: "BNK201.01", room: "D2.304", tiet: "1 - 3 (07:00 - 09:25)", gv: "TS. Nguyễn Văn Hùng", type: "Lý thuyết" },
                chieu: null,
                toi: null
            },
            3: { // Thứ 3
                sang: null,
                chieu: { subject: "Kế toán tài chính 1", code: "FIN101.03", room: "D1.201", tiet: "7 - 9 (12:45 - 15:10)", gv: "ThS. Trần Thị Mai Phương", type: "Lý thuyết" },
                toi: null
            },
            4: { // Thứ 4
                sang: { subject: "Kinh tế vĩ mô", code: "ECO202.02", room: "D2.508", tiet: "4 - 6 (09:35 - 12:00)", gv: "TS. Vũ Hoàng Long", type: "Thảo luận" },
                chieu: null,
                toi: null
            },
            5: { // Thứ 5
                sang: null,
                chieu: { subject: "Luật kinh tế và Ngân hàng", code: "LAW101.01", room: "D2.304", tiet: "7 - 9 (12:45 - 15:10)", gv: "TS. Đỗ Đức Minh", type: "Lý thuyết" },
                toi: null
            },
            6: { // Thứ 6
                sang: { subject: "Thực hành Ngân hàng mô phỏng", code: "BNK205.LAB", room: "D3.101", tiet: "1 - 4 (07:00 - 10:25)", gv: "ThS. Phạm Thanh Hương", type: "Thực hành" },
                chieu: null,
                toi: null
            },
            7: { // Thứ 7
                sang: null,
                chieu: null,
                toi: null
            },
            8: { // Chủ nhật
                sang: null,
                chieu: null,
                toi: null
            }
        },
        "K28CLC-NHA": {
            2: {
                sang: null,
                chieu: { subject: "Financial Markets & Institutions (CLC)", code: "FIN301.EN", room: "D1.201", tiet: "7 - 9 (12:45 - 15:10)", gv: "PGS.TS. Lê Đình Hoàng", type: "English" },
                toi: null
            },
            3: {
                sang: { subject: "Corporate Finance", code: "CF102.EN", room: "D2.304", tiet: "1 - 3 (07:00 - 09:25)", gv: "TS. Vũ Hoàng Long", type: "English" },
                chieu: null,
                toi: null
            },
            4: {
                sang: null,
                chieu: null,
                toi: null
            },
            5: {
                sang: { subject: "Advanced Commercial Banking", code: "BNK302.EN", room: "D2.508", tiet: "4 - 6 (09:35 - 12:00)", gv: "TS. Nguyễn Văn Hùng", type: "English" },
                chieu: null,
                toi: null
            },
            6: {
                sang: null,
                chieu: { subject: "Fintech & Digital Banking", code: "FT401.EN", room: "D3.101", tiet: "7 - 10 (12:45 - 16:05)", gv: "ThS. Phạm Thanh Hương", type: "English Lab" },
                toi: null
            },
            7: { sang: null, chieu: null, toi: null },
            8: { sang: null, chieu: null, toi: null }
        },
        "K28ATCA": {
            2: {
                sang: { subject: "Mạng máy tính & An ninh mạng", code: "SEC201.01", room: "D3.101", tiet: "1 - 4 (07:00 - 10:25)", gv: "TS. Đỗ Đức Minh", type: "Thực hành" },
                chieu: null,
                toi: null
            },
            3: { sang: null, chieu: null, toi: null },
            4: {
                sang: null,
                chieu: { subject: "Mã hóa và An toàn thông tin", code: "CRYPTO.01", room: "D2.304", tiet: "7 - 9 (12:45 - 15:10)", gv: "TS. Vũ Hoàng Long", type: "Lý thuyết" },
                toi: null
            },
            5: { sang: null, chieu: null, toi: null },
            6: {
                sang: { subject: "Hệ quản trị cơ sở dữ liệu", code: "IT105.02", room: "D1.201", tiet: "1 - 3 (07:00 - 09:25)", gv: "ThS. Trần Thị Mai Phương", type: "Lý thuyết" },
                chieu: null,
                toi: null
            },
            7: { sang: null, chieu: null, toi: null },
            8: { sang: null, chieu: null, toi: null }
        }
    },

    // Admissions Verification Data (Tra cứu tuyển sinh)
    admissions: [
        {
            cccd: "001203014589",
            maHoSo: "TS2026-08129",
            hoTen: "Lê Hoàng Phúc",
            ngaySinh: "12/03/2008",
            gioiTinh: "Nam",
            truongTHPT: "THPT Chuyên Hà Nội - Amsterdam",
            nganhXetTuyen: "Tài chính - Ngân hàng (Chất lượng cao)",
            maNganh: "7340201CLC",
            toHop: "D01 (Toán, Văn, Anh)",
            diemMon1: 9.2,
            diemMon2: 8.5,
            diemMon3: 9.4,
            diemUuTien: 0.5,
            tongDiem: 27.6,
            diemChuan: 26.2,
            trangThai: "Đủ điều kiện trúng tuyển",
            isApproved: true,
            ghiChu: "Thí sinh xác nhận nhập học trực tuyến trên Cổng thông tin của Bộ GD&ĐT theo quy định."
        },
        {
            cccd: "034305019874",
            maHoSo: "TS2026-09543",
            hoTen: "Vũ Phương Linh",
            ngaySinh: "25/07/2008",
            gioiTinh: "Nữ",
            truongTHPT: "THPT Kim Liên, Hà Nội",
            nganhXetTuyen: "Kế toán và Kiểm toán",
            maNganh: "7340301",
            toHop: "A00 (Toán, Lý, Hóa)",
            diemMon1: 8.8,
            diemMon2: 8.6,
            diemMon3: 8.9,
            diemUuTien: 0.0,
            tongDiem: 26.3,
            diemChuan: 25.8,
            trangThai: "Đủ điều kiện trúng tuyển",
            isApproved: true,
            ghiChu: "Hồ sơ hợp lệ."
        },
        {
            cccd: "026204008123",
            maHoSo: "TS2026-11042",
            hoTen: "Đặng Quang Huy",
            ngaySinh: "18/10/2008",
            gioiTinh: "Nam",
            truongTHPT: "THPT Nguyễn Huệ, Nam Định",
            nganhXetTuyen: "Công nghệ thông tin trong Ngân hàng (Fintech)",
            maNganh: "7480201",
            toHop: "A01 (Toán, Lý, Anh)",
            diemMon1: 9.0,
            diemMon2: 8.2,
            diemMon3: 8.8,
            diemUuTien: 0.75,
            tongDiem: 26.75,
            diemChuan: 26.0,
            trangThai: "Đủ điều kiện trúng tuyển",
            isApproved: true,
            ghiChu: "Đã nộp chứng chỉ IELTS 6.5."
        }
    ],

    // Demo Student Profiles for Login
    students: {
        "008307000568": {
            username: "008307000568",
            password: "12351235",
            hoTen: "HUỲNH THỊ THU HÀ",
            maSV: "008307000568",
            gioiTinh: "Nữ",
            ngaySinh: "12/04/2007",
            noiSinh: "Hà Nội",
            cmnd: "001307000568",
            tinhTrang: "Còn học",
            email: "hahtt008307@hvnh.edu.vn",
            emailCaNhan: "huynhthuthuha@gmail.com",
            diaChi: "Số 36 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội",
            nienKhoa: "2025 - 2029",
            khoaHoc: "K28 (2025 - 2029)",
            chucVu: "Sinh viên",
            doiTuong: "Đại học chính quy",
            lop12: "THPT Chuyên Chu Văn An",
            doan: "Đã vào đoàn",
            ngayVaoDoan: "26/03/2023",
            dang: "Chưa",
            ngayVaoDang: "",
            loaiHinhDaoTao: "Đại học chính quy CLC",
            coVanHocTap: "TS. Phạm Thị Minh Nguyệt",
            lienHeCVHT: "nguyetptm@hvnh.edu.vn",
            lop: "CLC - Hoạch định và Tư vấn tài chính 01",
            chuongTrinhDaoTao: "CLC-Hoạch định và Tư vấn tài chính",
            danToc: "Kinh",
            tonGiao: "Không",
            quocGia: "Việt Nam",
            tinhThanh: "TP. Hà Nội",
            quanHuyen: "Quận Cầu Giấy",
            diDong: "0968 554 219",
            dtBan: "",
            thongTinGiaDinh: {
                hoTenCha: "Huỳnh Quốc Thái",
                sdtCha: "0912 345 678",
                hoTenMe: "Nguyễn Thị Thu Hương",
                sdtMe: "0983 654 321",
                khiCanBaoTin: "Huỳnh Quốc Thái (Bố)",
                sdtBaoTin: "0912 345 678",
                diaChiBaoTin: "Số 36 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội"
            },
            thongTinTHPT: {
                soHieuBang: "B2025-081293",
                soVaoSo: "1284/THPT",
                noiCap: "Sở GD&ĐT Hà Nội"
            },
            avatar: "assets/logo/logo.png",
            tinChiTichLuy: 57,
            gpa: 2.82,
            gpa10: 7.18,
            xepLoai: "Khá",
            drl: 76,
            xepLoaiDRL: "Khá",
            thongBao: [
                { id: 1, tieuDe: "Hóa đơn điện tử ngày : 2026-03-20 20:30:05", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "20/03/2026" },
                { id: 2, tieuDe: "Hóa đơn điện tử ngày : 2026-02-09 16:00:03", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "09/02/2026" },
                { id: 3, tieuDe: "Hóa đơn điện tử ngày : 2026-01-06 00:15:32", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "06/01/2026" },
                { id: 4, tieuDe: "Hóa đơn điện tử ngày : 2025-10-02 12:04:45", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "02/10/2025" }
            ],
            studyPrograms: [
                {
                    semester: "Chưa phân học kỳ",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 1, maHP: "ENG07H", tenHP: "Phát âm", soTC: 3, soTiet: 45, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa NN - BM Tiếng Anh đại cương", pass: true },
                        { tt: 2, maHP: "ENG08H", tenHP: "Kỹ năng viết", soTC: 3, soTiet: 45, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa NN - BM Tiếng Anh đại cương", pass: true },
                        { tt: 3, maHP: "ENG09H", tenHP: "Kỹ năng nói", soTC: 3, soTiet: 45, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa NN - BM Tiếng Anh đại cương", pass: true },
                        { tt: 4, maHP: "ENG10H", tenHP: "Kỹ năng đọc", soTC: 3, soTiet: 45, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa NN - BM Tiếng Anh đại cương", pass: true },
                        { tt: 5, maHP: "ENG11H", tenHP: "Kỹ năng nghe", soTC: 3, soTiet: 45, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa NN - BM Tiếng Anh đại cương", pass: true },
                        { tt: 6, maHP: "EXT01H", tenHP: "Chương trình ngoại khóa", soTC: 2, soTiet: 30, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Trường Đào tạo, bồi dưỡng cán bộ", pass: true },
                        { tt: 7, maHP: "SPT01H", tenHP: "Giáo dục thể chất I (Đại cương) (*)", soTC: 1, soTiet: 15, tienQuyet: "", hocTruoc: "", tuongDuong: "SPT02A", khoa: "Bộ môn Giáo dục thể chất", pass: true },
                        { tt: 8, maHP: "SPT07A_01", tenHP: "Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam (*)", soTC: 2, soTiet: 45, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa Giáo dục Quốc phòng và An ninh", pass: true },
                        { tt: 9, maHP: "SPT07A_02", tenHP: "Công tác quốc phòng và an ninh (*)", soTC: 1, soTiet: 30, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa Giáo dục Quốc phòng và An ninh", pass: true },
                        { tt: 10, maHP: "SPT07A_03", tenHP: "Quân sự chung (*)", soTC: 1, soTiet: 30, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa Giáo dục Quốc phòng và An ninh", pass: true },
                        { tt: 11, maHP: "SPT07A_04", tenHP: "Kỹ thuật chiến đấu bộ binh và chiến thuật (*)", soTC: 3, soTiet: 60, tienQuyet: "", hocTruoc: "", tuongDuong: "", khoa: "Khoa Giáo dục Quốc phòng và An ninh", pass: true }
                    ],
                    electives: [
                        {
                            groupName: "Tự chọn 0105 (STC = 2)",
                            courses: [
                                { tt: 12, maHP: "SPT02H", tenHP: "Giáo dục thể chất II (Bóng rổ) (*)", soTC: 1, soTiet: 15, khoa: "Bộ môn Giáo dục thể chất", pass: false },
                                { tt: 13, maHP: "SPT03H", tenHP: "Giáo dục thể chất III (Bóng chuyền) (*)", soTC: 1, soTiet: 15, khoa: "Bộ môn Giáo dục thể chất", pass: false },
                                { tt: 14, maHP: "SPT04H", tenHP: "Giáo dục thể chất IV (Cầu lông) (*)", soTC: 1, soTiet: 15, tuongDuong: "SPT05A", khoa: "Bộ môn Giáo dục thể chất", pass: false },
                                { tt: 15, maHP: "SPT05H", tenHP: "Giáo dục thể chất V (Khiêu vũ) (*)", soTC: 1, soTiet: 15, khoa: "Bộ môn Giáo dục thể chất", pass: false },
                                { tt: 16, maHP: "SPT16H", tenHP: "Giáo dục thể chất VI (Golf) (*)", soTC: 1, soTiet: 15, khoa: "Bộ môn Giáo dục thể chất", pass: false }
                            ]
                        }
                    ]
                },
                {
                    semester: "Học kỳ 1 (2025-2026/HK01)",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 24, maHP: "ECO02H", tenHP: "Kinh tế vĩ mô", soTC: 3, soTiet: 45, khoa: "Khoa Kinh tế - BM Kinh tế học", pass: true },
                        { tt: 25, maHP: "IS03H", tenHP: "Năng lực số ứng dụng", soTC: 3, soTiet: 45, khoa: "Khoa CNTT và KTS - BM Kinh tế số", pass: true },
                        { tt: 26, maHP: "MAT03H", tenHP: "Xác suất và thống kê", soTC: 3, soTiet: 45, khoa: "Bộ môn Toán", pass: true },
                        { tt: 27, maHP: "MAT04H", tenHP: "Toán dành cho kinh tế", soTC: 3, soTiet: 45, khoa: "Bộ môn Toán", pass: true },
                        { tt: 28, maHP: "PLT01H", tenHP: "Triết học Mác - Lênin", soTC: 3, soTiet: 45, khoa: "Khoa LLCT - BM Những NLCB của CNMLN", pass: true }
                    ],
                    electives: [
                        {
                            groupName: "Tự chọn 0102 (STC = 3)",
                            courses: [
                                { tt: 29, maHP: "BUS02H", tenHP: "Giao tiếp trong kinh doanh", soTC: 2, soTiet: 30, khoa: "Khoa QTKD - BM Khởi sự kinh doanh", pass: true },
                                { tt: 30, maHP: "MGT36H", tenHP: "Đổi mới sáng tạo", soTC: 2, soTiet: 30, khoa: "Viện NCKH", pass: false }
                            ]
                        }
                    ]
                },
                {
                    semester: "Học kỳ 2 (2025-2026/HK02)",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 33, maHP: "ACT01H", tenHP: "Nguyên lý kế toán", soTC: 3, soTiet: 45, khoa: "Khoa KT-KT - BM Lý thuyết kế toán", pass: true },
                        { tt: 34, maHP: "ECO01H", tenHP: "Kinh tế vi mô", soTC: 3, soTiet: 45, khoa: "Khoa Kinh tế - BM Kinh tế học", pass: true },
                        { tt: 35, maHP: "LAW01H", tenHP: "Pháp luật đại cương", soTC: 3, soTiet: 45, khoa: "Khoa Luật - BM Luật học", pass: true },
                        { tt: 36, maHP: "MGT41H", tenHP: "Nghệ thuật lãnh đạo", soTC: 3, soTiet: 45, khoa: "Khoa Quản trị kinh doanh", pass: true },
                        { tt: 37, maHP: "PLT02H", tenHP: "Kinh tế chính trị Mác - Lênin", soTC: 2, soTiet: 30, tienQuyet: "PLT01H", khoa: "Khoa LLCT - BM Những NLCB của CNMLN", pass: true },
                        { tt: 38, maHP: "PLT03H", tenHP: "Lịch sử Đảng Cộng sản Việt Nam", soTC: 2, soTiet: 30, khoa: "Khoa LLCT - BM TTHCM và ĐLCMĐCSVN", pass: true }
                    ]
                },
                {
                    semester: "Học kỳ 3 (2026-2027/HK01)",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 39, maHP: "FIN01H", tenHP: "Tài chính doanh nghiệp I", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Tài chính doanh nghiệp", pass: false },
                        { tt: 40, maHP: "FIN03H", tenHP: "Thuế", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Thuế và Tài chính công", pass: false },
                        { tt: 41, maHP: "FIN22H", tenHP: "Tài chính - Tiền tệ", soTC: 3, soTiet: 45, khoa: "Khoa NH - BM Tiền tệ", pass: false },
                        { tt: 42, maHP: "LAW02H", tenHP: "Luật kinh tế", soTC: 3, soTiet: 45, hocTruoc: "LAW01H", khoa: "Khoa Luật - BM Luật kinh tế", pass: false },
                        { tt: 43, maHP: "MAT16H", tenHP: "Phân tích định lượng trong kinh tế", soTC: 3, soTiet: 45, khoa: "Viện NCKH", pass: false },
                        { tt: 44, maHP: "PLT05H", tenHP: "Chủ nghĩa xã hội khoa học", soTC: 2, soTiet: 30, tienQuyet: "PLT01H", khoa: "Khoa LLCT - BM Những NLCB của CNMLN", pass: false }
                    ]
                },
                {
                    semester: "Học kỳ 4 (2026-2027/HK02)",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 45, maHP: "ACT02H", tenHP: "Kế toán tài chính I", soTC: 3, soTiet: 45, khoa: "Khoa KT-KT - BM Kế toán tài chính", pass: false },
                        { tt: 46, maHP: "FIN04H", tenHP: "Bảo hiểm", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Kinh doanh chứng khoán", pass: false },
                        { tt: 47, maHP: "FIN119H", tenHP: "Quản trị dịch vụ tài chính", soTC: 3, soTiet: 45, khoa: "Khoa TC - Bộ môn công nghệ tài chính", pass: false },
                        { tt: 48, maHP: "FIN120H", tenHP: "Tư duy thiết kế", soTC: 3, soTiet: 45, khoa: "Khoa TC - Bộ môn công nghệ tài chính", pass: false },
                        { tt: 49, maHP: "FIN55H", tenHP: "Phân tích tài chính doanh nghiệp I", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Tài chính doanh nghiệp", pass: false },
                        { tt: 50, maHP: "PLT04H", tenHP: "Tư tưởng Hồ Chí Minh", soTC: 2, soTiet: 30, tienQuyet: "PLT01H", khoa: "Khoa LLCT - BM TTHCM và ĐLCMĐCSVN", pass: false }
                    ]
                },
                {
                    semester: "Học kỳ 5 (2027-2028/HK01)",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 55, maHP: "FIN114H", tenHP: "Công nghệ tài chính", soTC: 3, soTiet: 45, khoa: "Khoa TC - Bộ môn công nghệ tài chính", pass: false },
                        { tt: 56, maHP: "FIN121H", tenHP: "Tài chính hành vi", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Kinh doanh chứng khoán", pass: false },
                        { tt: 57, maHP: "FIN122H", tenHP: "Định giá tài sản", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Định giá tài sản và M.A", pass: false },
                        { tt: 58, maHP: "FIN124H", tenHP: "Nguyên lý hoạch định tài chính cá nhân", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Định giá tài sản và M.A", pass: false },
                        { tt: 59, maHP: "FIN130H", tenHP: "Thị trường và Đầu tư tài chính", soTC: 3, soTiet: 45, tienQuyet: "FIN22H", khoa: "Khoa TC - BM Kinh doanh chứng khoán", pass: false },
                        { tt: 60, maHP: "GRA30H", tenHP: "Thực tế nghề nghiệp I - Giao tiếp trong phục vụ khách hàng và đạo đức nghề nghiệp", soTC: 2, soTiet: 30, khoa: "Khoa TC - BM Định giá tài sản và M.A", pass: false }
                    ]
                },
                {
                    semester: "Học kỳ 6 (2027-2028/HK02)",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 67, maHP: "FIN125H", tenHP: "Hoạch định đầu tư và quản lý gia sản", soTC: 3, soTiet: 45, tienQuyet: "FIN22H", khoa: "Khoa TC - BM Kinh doanh chứng khoán", pass: false },
                        { tt: 68, maHP: "FIN126H", tenHP: "Quản trị rủi ro và hoạch định bảo hiểm, hưu trí", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Kinh doanh chứng khoán", pass: false },
                        { tt: 69, maHP: "FIN127H", tenHP: "Hoạch định thuế, di sản và thừa kế", soTC: 3, soTiet: 45, khoa: "Khoa TC - BM Thuế và Tài chính công", pass: false },
                        { tt: 70, maHP: "FIN128H", tenHP: "Hoạch định đầu tư bất động sản", soTC: 3, soTiet: 45, tienQuyet: "FIN124H", khoa: "Khoa TC - BM Định giá tài sản và M.A", pass: false },
                        { tt: 71, maHP: "FIN129H", tenHP: "Tâm lý học trong Hoạch định tài chính", soTC: 3, soTiet: 45, tienQuyet: "FIN124H", khoa: "Khoa TC - BM Định giá tài sản và M.A", pass: false },
                        { tt: 72, maHP: "GRA31H", tenHP: "Thực tế nghề nghiệp II - Xây dựng kế hoạch tài chính cá nhân toàn diện", soTC: 3, soTiet: 45, tienQuyet: "FIN124H", khoa: "Khoa TC - BM Định giá tài sản và M.A", pass: false }
                    ]
                },
                {
                    semester: "Học kỳ 7 (2028-2029/HK01)",
                    type: "Bắt buộc",
                    courses: [
                        { tt: 79, maHP: "GRA20H", tenHP: "Khóa luận tốt nghiệp", soTC: 8, soTiet: 120, khoa: "Khoa Tài chính", pass: false }
                    ]
                }
            ],
            renLuyen: [
                { stt: 1, hocKy: "HK01", tongDiem: 67, xepLoai: "Khá" },
                { stt: 2, hocKy: "HK02", tongDiem: 76, xepLoai: "Khá" }
            ],
            marksSemesters: [
                {
                    title: "Năm học : 2025-2026 - Học kỳ : HK01",
                    courses: [
                        { stt: 1, maHP: "BUS02H", tenHP: "Giao tiếp trong kinh doanh", tc: 2, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 7.50, kt1: 6.80, kt2: 9.00, thiL1: 8.90, tk10: 8.50, tkChu: "A", xepLoai: "A" },
                        { stt: 2, maHP: "ECO02H", tenHP: "Kinh tế vĩ mô", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 8.00, kt1: 8.00, kt2: 9.00, thiL1: 2.60, tk10: 4.90, tkChu: "D", xepLoai: "D" },
                        { stt: 3, maHP: "IS03H", tenHP: "Năng lực số ứng dụng", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 8.00, kt1: 10.00, kt2: 9.20, thiL1: 8.30, tk10: 8.70, tkChu: "A", xepLoai: "A" },
                        { stt: 4, maHP: "MAT03H", tenHP: "Xác suất và thống kê", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 10.00, kt1: 6.50, kt2: 4.00, thiL1: 5.00, tk10: 5.60, tkChu: "C", xepLoai: "C" },
                        { stt: 5, maHP: "MAT04H", tenHP: "Toán dành cho kinh tế", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 10.00, kt1: 8.30, kt2: 8.30, thiL1: 2.80, tk10: 5.20, tkChu: "D+", xepLoai: "D+" },
                        { stt: 6, maHP: "PLT01H", tenHP: "Triết học Mác - Lênin", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 9.00, kt1: 7.50, kt2: 8.30, thiL1: 4.80, tk10: 6.20, tkChu: "C", xepLoai: "C" },
                        { stt: 7, maHP: "SPT01H", tenHP: "Giáo dục thể chất I (Đại cương) *", tc: 1, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 9.00, kt1: 5.00, kt2: "", thiL1: 5.00, tk10: 5.40, tkChu: "P", xepLoai: "P" }
                    ],
                    summary: {
                        dtb10: "6.40",
                        dtb4: "2.32",
                        dtbTL10: "6.40",
                        dtbTL4: "2.32",
                        stcDat: 18,
                        stcTL: 18,
                        xepLoaiDTB: "Trung bình",
                        dtbRL: 67,
                        xepLoaiDRL: "Khá"
                    }
                },
                {
                    title: "Năm học : 2025-2026 - Học kỳ : HK02",
                    courses: [
                        { stt: 8, maHP: "ACT01H", tenHP: "Nguyên lý kế toán", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 9.00, kt1: 5.00, kt2: 9.10, thiL1: 5.50, tk10: 6.30, tkChu: "C", xepLoai: "C" },
                        { stt: 9, maHP: "ECO01H", tenHP: "Kinh tế vi mô", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 8.00, kt1: 8.40, kt2: 9.30, thiL1: 8.10, tk10: 8.30, tkChu: "B+", xepLoai: "B+" },
                        { stt: 10, maHP: "ENG07H", tenHP: "Phát âm", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 8.00, tkChu: "B+", xepLoai: "B+" },
                        { stt: 11, maHP: "ENG08H", tenHP: "Kỹ năng viết", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 9.00, tkChu: "A", xepLoai: "A" },
                        { stt: 12, maHP: "ENG09H", tenHP: "Kỹ năng nói", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 7.50, tkChu: "B", xepLoai: "B" },
                        { stt: 13, maHP: "ENG10H", tenHP: "Kỹ năng đọc", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 7.50, tkChu: "B", xepLoai: "B" },
                        { stt: 14, maHP: "ENG11H", tenHP: "Kỹ năng nghe", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 8.00, tkChu: "B+", xepLoai: "B+" },
                        { stt: 15, maHP: "LAW01H", tenHP: "Pháp luật đại cương", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 10.00, kt1: 10.00, kt2: 8.00, thiL1: 5.10, tk10: 6.80, tkChu: "C+", xepLoai: "C+" },
                        { stt: 16, maHP: "MGT41H", tenHP: "Nghệ thuật lãnh đạo", tc: 3, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 10.00, kt1: 9.00, kt2: 8.20, thiL1: 5.80, tk10: 7.10, tkChu: "B", xepLoai: "B" },
                        { stt: 17, maHP: "PLT02H", tenHP: "Kinh tế chính trị Mác - Lênin", tc: 2, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 9.00, kt1: 8.80, kt2: 9.20, thiL1: 6.80, tk10: 7.70, tkChu: "B", xepLoai: "B" },
                        { stt: 18, maHP: "PLT03H", tenHP: "Lịch sử Đảng Cộng sản Việt Nam", tc: 2, ptKT: 30, ptCC: 10, ptThi: 60, diemCC: 5.00, kt1: 7.50, kt2: 9.00, thiL1: 7.50, tk10: 7.50, tkChu: "B", xepLoai: "B" },
                        { stt: 19, maHP: "SPT07A_01", tenHP: "Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam *", tc: 2, ptKT: 0, ptCC: 0, ptThi: 100, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 7.00, tkChu: "P", xepLoai: "P" },
                        { stt: 20, maHP: "SPT07A_02", tenHP: "Công tác quốc phòng và an ninh *", tc: 2, ptKT: 0, ptCC: 0, ptThi: 100, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 7.00, tkChu: "P", xepLoai: "P" },
                        { stt: 21, maHP: "SPT07A_03", tenHP: "Quân sự chung *", tc: 2, ptKT: 0, ptCC: 0, ptThi: 100, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 5.00, tkChu: "P", xepLoai: "P" },
                        { stt: 22, maHP: "SPT07A_04", tenHP: "Kỹ thuật chiến đấu bộ binh và chiến thuật *", tc: 3, ptKT: 0, ptCC: 0, ptThi: 100, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: 7.00, tkChu: "P", xepLoai: "P" }
                    ],
                    summary: {
                        dtb10: "7.61",
                        dtb4: "3.10",
                        dtbTL10: "7.18",
                        dtbTL4: "2.82",
                        stcDat: 39,
                        stcTL: 57,
                        xepLoaiDTB: "Khá",
                        dtbRL: 76,
                        xepLoaiDRL: "Khá"
                    }
                },
                {
                    title: "Năm học : 2026-2027 - Học kỳ : HK01",
                    courses: [
                        { stt: 23, maHP: "FIN01H", tenHP: "Tài chính doanh nghiệp I", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: "", tkChu: "", xepLoai: "" },
                        { stt: 24, maHP: "FIN03H", tenHP: "Thuế", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: "", tkChu: "", xepLoai: "" },
                        { stt: 25, maHP: "FIN22H", tenHP: "Tài chính - Tiền tệ", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: "", tkChu: "", xepLoai: "" },
                        { stt: 26, maHP: "LAW02H", tenHP: "Luật kinh tế", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: "", tkChu: "", xepLoai: "" },
                        { stt: 27, maHP: "MAT16H", tenHP: "Phân tích định lượng trong kinh tế", tc: 3, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: "", tkChu: "", xepLoai: "" },
                        { stt: 28, maHP: "PLT05H", tenHP: "Chủ nghĩa xã hội khoa học", tc: 2, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: "", tkChu: "", xepLoai: "" },
                        { stt: 29, maHP: "SPT04H", tenHP: "Giáo dục thể chất IV (Cầu lông) *", tc: 1, ptKT: 0, ptCC: 0, ptThi: 0, diemCC: "", kt1: "", kt2: "", thiL1: "", tk10: "", tkChu: "", xepLoai: "" }
                    ]
                }
            ],
            taiChinh: {
                tongNo: "22,109,000",
                namHocHienTai: [
                    { maPhi: "261FIN01H04", tenPhi: "Tài chính doanh nghiệp I [3.0 tc]", phaiDong: "3,756,000", daDong: "0", conNo: "3,756,000", ngayDong: "", ngayGhiNo: "" },
                    { maPhi: "261FIN03H01", tenPhi: "Thuế [3.0 tc]", phaiDong: "3,756,000", daDong: "0", conNo: "3,756,000", ngayDong: "", ngayGhiNo: "" },
                    { maPhi: "261FIN22H04", tenPhi: "Tài chính - Tiền tệ [3.0 tc]", phaiDong: "3,756,000", daDong: "0", conNo: "3,756,000", ngayDong: "", ngayGhiNo: "" },
                    { maPhi: "261LAW02H03", tenPhi: "Luật kinh tế [3.0 tc]", phaiDong: "3,756,000", daDong: "0", conNo: "3,756,000", ngayDong: "", ngayGhiNo: "" },
                    { maPhi: "261MAT16H01", tenPhi: "Phân tích định lượng trong kinh tế [3.0 tc]", phaiDong: "3,756,000", daDong: "0", conNo: "3,756,000", ngayDong: "", ngayGhiNo: "" },
                    { maPhi: "261PLT05H40", tenPhi: "Chủ nghĩa xã hội khoa học [2.0 tc]", phaiDong: "2,504,000", daDong: "0", conNo: "2,504,000", ngayDong: "", ngayGhiNo: "" },
                    { maPhi: "261SPT04H03", tenPhi: "Phí học lại Giáo dục thể chất IV (Cầu lông) [1.0 tc]", phaiDong: "825,000", daDong: "0", conNo: "825,000", ngayDong: "", ngayGhiNo: "" }
                ],
                namHocTruoc: [
                    { maPhi: "252ACT01H01", tenPhi: "Nguyên lý kế toán [3.0 tc]", phaiDong: "3,339,000", daDong: "3,339,000", conNo: "0", ngayDong: "13/09/2025" },
                    { maPhi: "252ECO01H01", tenPhi: "Kinh tế vi mô [3.0 tc]", phaiDong: "3,339,000", daDong: "3,339,000", conNo: "0", ngayDong: "05/01/2026" },
                    { maPhi: "252LAW01H02", tenPhi: "Pháp luật đại cương [3.0 tc]", phaiDong: "3,339,000", daDong: "3,339,000", conNo: "0", ngayDong: "05/01/2026" },
                    { maPhi: "252MGT41H01", tenPhi: "Nghệ thuật lãnh đạo [3.0 tc]", phaiDong: "3,339,000", daDong: "3,339,000", conNo: "0", ngayDong: "05/01/2026" },
                    { maPhi: "252PLT02H01", tenPhi: "Kinh tế chính trị Mác - Lênin [2.0 tc]", phaiDong: "2,226,000", daDong: "2,226,000", conNo: "0", ngayDong: "05/01/2026" },
                    { maPhi: "252PLT03H03", tenPhi: "Lịch sử Đảng Cộng sản Việt Nam [2.0 tc]", phaiDong: "2,226,000", daDong: "2,226,000", conNo: "0", ngayDong: "05/01/2026" },
                    { maPhi: "252SPT07A_0102", tenPhi: "Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam [2.0 tc]", phaiDong: "1,570,000", daDong: "1,570,000", conNo: "0", ngayDong: "09/02/2026" },
                    { maPhi: "252SPT07A_0202", tenPhi: "Công tác quốc phòng và an ninh [1.5 tc]", phaiDong: "1,177,500", daDong: "1,177,500", conNo: "0", ngayDong: "09/02/2026" },
                    { maPhi: "252SPT07A_0302", tenPhi: "Quân sự chung [1.5 tc]", phaiDong: "1,177,500", daDong: "1,177,500", conNo: "0", ngayDong: "09/02/2026" },
                    { maPhi: "252SPT07A_0402", tenPhi: "Kỹ thuật chiến đấu bộ binh và chiến thuật [3.0 tc]", phaiDong: "2,355,000", daDong: "2,355,000", conNo: "0", ngayDong: "09/02/2026" },
                    { maPhi: "Lệ phí ăn, ở, trang phục GDQPAN", tenPhi: "Lệ phí ăn, ở, trang phục GDQPAN", phaiDong: "2,512,000", daDong: "2,512,000", conNo: "0", ngayDong: "20/03/2026" },
                    { maPhi: "Phí điểm chuyển miễn", tenPhi: "Phí điểm chuyển miễn: Phát âm", phaiDong: "1,001,700", daDong: "1,001,700", conNo: "0", ngayDong: "09/02/2026" },
                    { maPhi: "Phí điểm chuyển miễn", tenPhi: "Phí điểm chuyển miễn: Kỹ năng viết", phaiDong: "1,001,700", daDong: "1,001,700", conNo: "0", ngayDong: "09/02/2026" }
                ]
            },
            hoaDon: [
                { soSeries: "0429914043", soHoaDon: "1", hinhThuc: "Ngân hàng", ngayDong: "13/09/2025", ngayCapNhat: "13/09/2025", thanhTien: "20,034,000" },
                { soSeries: "0429914043_BHYT", soHoaDon: "1", hinhThuc: "Ngân hàng", ngayDong: "13/09/2025", ngayCapNhat: "13/09/2025", thanhTien: "789,750" },
                { soSeries: "0429914043_LP", soHoaDon: "1", hinhThuc: "Ngân hàng", ngayDong: "13/09/2025", ngayCapNhat: "13/09/2025", thanhTien: "250,000" },
                { soSeries: "0429914043_TH", soHoaDon: "1", hinhThuc: "Ngân hàng", ngayDong: "13/09/2025", ngayCapNhat: "13/09/2025", thanhTien: "400,000" },
                { soSeries: "7816398192", soHoaDon: "1", hinhThuc: "Ngân hàng", ngayDong: "05/01/2026", ngayCapNhat: "05/01/2026", thanhTien: "16,695,000" },
                { soSeries: "9059431231_1", soHoaDon: "1", hinhThuc: "Ngân hàng", ngayDong: "09/02/2026", ngayCapNhat: "09/02/2026", thanhTien: "12,073,500" },
                { soSeries: "0512097768_3", soHoaDon: "1", hinhThuc: "Ngân hàng", ngayDong: "20/03/2026", ngayCapNhat: "20/03/2026", thanhTien: "2,512,000" }
            ],
            ketQuaDangKy: [
                { stt: 1, maLHP: "261FIN22H04", tenHP: "Tài chính - Tiền tệ", stc: "3.0", ngayDK: "21/07/2026 20:24:00" },
                { stt: 2, maLHP: "261LAW02H03", tenHP: "Luật kinh tế", stc: "3.0", ngayDK: "21/07/2026 20:25:00" },
                { stt: 3, maLHP: "261MAT16H01", tenHP: "Phân tích định lượng trong kinh tế", stc: "3.0", ngayDK: "21/07/2026 20:25:00" },
                { stt: 4, maLHP: "261FIN01H04", tenHP: "Tài chính doanh nghiệp I", stc: "3.0", ngayDK: "21/07/2026 20:27:00" },
                { stt: 5, maLHP: "261FIN03H01", tenHP: "Thuế", stc: "3.0", ngayDK: "21/07/2026 20:24:00" },
                { stt: 6, maLHP: "261PLT05H40", tenHP: "Chủ nghĩa xã hội khoa học", stc: "2.0", ngayDK: "21/07/2026 20:25:00" },
                { stt: 7, maLHP: "261SPT04H03", tenHP: "Giáo dục thể chất IV (Cầu lông)", stc: "1.0", ngayDK: "29/07/2026 23:42:00" }
            ],
            chungChi: [
                { stt: 1, tenChungChi: "Chứng chỉ ngoại ngữ", daNop: true },
                { stt: 2, tenChungChi: "Chứng chỉ tin học", daNop: false },
                { stt: 3, tenChungChi: "Chuẩn đầu ra NCKH chương trình CLC", daNop: false }
            ],
            nopChungChi: [
                { stt: 1, loaiChungChi: "Chứng chỉ IELTS từ 5.5 trở lên - Quy đổi bậc 4/6", diem: "5.5", nghe: "5.5", noi: "5.0", doc: "5.0", viet: "6.0", ngayThi: "25/01/2025", idChungChi: "IELTS-250125-88", tinhTrang: "Đã kiểm tra, Chứng chỉ hợp lệ", ghiChu: "", dangKyChuyenDiem: true }
            ],
            dangKyVangThi: [
                { stt: 1, lopHP: "261FIN03H01", maHP: "FIN03H", tenHP: "Thuế", stc: 3 },
                { stt: 2, lopHP: "261SPT04H03", maHP: "SPT04H", tenHP: "Giáo dục thể chất IV (Cầu lông)", stc: 1 },
                { stt: 3, lopHP: "261FIN22H04", maHP: "FIN22H", tenHP: "Tài chính - Tiền tệ", stc: 3 },
                { stt: 4, lopHP: "261MAT16H01", maHP: "MAT16H", tenHP: "Phân tích định lượng trong kinh tế", stc: 3 },
                { stt: 5, lopHP: "261LAW02H03", maHP: "LAW02H", tenHP: "Luật kinh tế", stc: 3 },
                { stt: 6, lopHP: "261PLT05H40", maHP: "PLT05H", tenHP: "Chủ nghĩa xã hội khoa học", stc: 2 },
                { stt: 7, lopHP: "261FIN01H04", maHP: "FIN01H", tenHP: "Tài chính doanh nghiệp I", stc: 3 }
            ]
        },
        "21A4010123": {
            username: "21A4010123",
            password: "123",
            hoTen: "Nguyễn Hoàng Nam",
            lop: "K24NHA",
            khoa: "Ngân hàng",
            nganh: "Tài chính - Ngân hàng",
            chuyenNganh: "Ngân hàng thương mại",
            khoaHoc: "2021 - 2025",
            email: "nam.nh21@hvnh.edu.vn",
            avatar: "assets/logo/logo.png",
            tinhTrang: "Còn học",
            tinChiTichLuy: 128,
            gpa: 3.58,
            gpa10: 8.42,
            xepLoai: "Giỏi",
            grades: [
                { maHP: "FIN101", tenHP: "Kế toán tài chính 1", soTC: 3, diemCC: 9.0, diemGK: 8.5, diemCK: 8.5, diem10: 8.6, diemChu: "A", diem4: 4.0 },
                { maHP: "BNK201", tenHP: "Nghiệp vụ NHTM", soTC: 3, diemCC: 10.0, diemGK: 8.0, diemCK: 8.5, diem10: 8.6, diemChu: "A", diem4: 4.0 },
                { maHP: "ECO202", tenHP: "Kinh tế vĩ mô", soTC: 3, diemCC: 8.5, diemGK: 7.5, diemCK: 8.0, diem10: 8.0, diemChu: "B+", diem4: 3.5 },
                { maHP: "MGT102", tenHP: "Quản trị học", soTC: 2, diemCC: 9.0, diemGK: 9.0, diemCK: 8.5, diem10: 8.7, diemChu: "A", diem4: 4.0 },
                { maHP: "LAW101", tenHP: "Luật Ngân hàng", soTC: 2, diemCC: 8.5, diemGK: 8.0, diemCK: 8.0, diem10: 8.1, diemChu: "B+", diem4: 3.5 }
            ],
            tuition: {
                hocKy: "Học kỳ 1 - Năm học 2026-2027",
                tongHocPhi: "9,800,000 VNĐ",
                daDong: "9,800,000 VNĐ",
                conNo: "0 VNĐ",
                trangThai: "Đã hoàn thành nghĩa vụ học phí",
                ngayNop: "28/08/2026",
                soHoaDon: "HD-HVNH-2026-8841"
            }
        },
        "admin": {
            username: "admin",
            password: "123",
            hoTen: "Quản trị viên Học viện",
            lop: "Phòng Quản lý Đào tạo",
            khoa: "Ban Đào tạo HVNH",
            nganh: "Quản trị hệ thống",
            email: "phongdaotao@hvnh.edu.vn",
            avatar: "assets/logo/logo.png",
            tinhTrang: "Cán bộ quản lý",
            tinChiTichLuy: 0,
            gpa: 4.0,
            gpa10: 10.0,
            xepLoai: "Cán bộ"
        }
    },

    // Dịch vụ công trực tuyến Học viện Ngân hàng (dichvucong.hvnh.edu.vn) - Replicating Photo 2
    publicServices: {
        categories: [
            { id: "cong-tac-sv", name: "Công tác sinh viên" },
            { id: "ho-tro-dao-tao", name: "Hỗ trợ đào tạo" },
            { id: "quan-ly-dao-tao", name: "Quản lý đào tạo" },
            { id: "dao-tao-quoc-te", name: "Đào tạo quốc tế" },
            { id: "dao-tao-tu-xa", name: "Quản lý đào tạo từ xa" },
            { id: "boi-duong-ngan-han", name: "Quản lý đào tạo, bồi dưỡng ngắn hạn" },
            { id: "nghien-cuu-kh", name: "Quản lý nghiên cứu khoa học" },
            { id: "sau-dai-hoc", name: "Quản lý đào tạo sau đại học" },
            { id: "dang-doan-the", name: "Đảng, Công đoàn, Đoàn Thanh niên" },
            { id: "tai-chinh-ke-toan", name: "Tài chính - Kế toán" },
            { id: "to-chuc-can-bo", name: "Tổ chức cán bộ" },
            { id: "tuyen-sinh-tt", name: "Tư vấn tuyển sinh và phát triển thương hiệu" },
            { id: "thu-vien", name: "Thư viện" },
            { id: "cntt", name: "Công nghệ thông tin" },
            { id: "tong-hop", name: "Tổng hợp" }
        ],
        procedures: [
            {
                stt: 1,
                id: "PROC-CTSV-01",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình nộp đơn xin nghỉ học có lý do (Dành cho SV Hệ chuẩn và Hệ CLC)",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Tiếp nhận và giải quyết đơn xin nghỉ học tạm thời có lý do (ốm đau, việc gia đình, lý do cá nhân) theo quy chế đào tạo.",
                thoiGianGiaiQuyet: "3 - 5 ngày làm việc"
            },
            {
                stt: 2,
                id: "PROC-CTSV-02",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình nộp đơn xin thôi học theo nguyện vọng (Dành cho SV Hệ chuẩn và Hệ CLC)",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Giải quyết thủ tục thôi học tự nguyện, thanh toán nghĩa vụ học phí và rút hồ sơ gốc.",
                thoiGianGiaiQuyet: "5 - 7 ngày làm việc"
            },
            {
                stt: 3,
                id: "PROC-CTSV-03",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình cấp giấy giới thiệu cho sinh viên (Dành cho SV Hệ chuẩn và Hệ CLC)",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Cấp giấy giới thiệu sinh viên liên hệ thực tập, nghiên cứu thực tế tại các tổ chức, doanh nghiệp, ngân hàng.",
                thoiGianGiaiQuyet: "1 - 2 ngày làm việc"
            },
            {
                stt: 4,
                id: "PROC-CTSV-04",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình cấp giấy chứng nhận cho sinh viên (Dành cho SV Hệ chuẩn và Hệ CLC)",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Chứng nhận sinh viên đang theo học tại Học viện Ngân hàng để phục vụ xin việc, làm thủ tục hành chính.",
                thoiGianGiaiQuyet: "1 - 2 ngày làm việc"
            },
            {
                stt: 5,
                id: "PROC-CTSV-05",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình cấp giấy xác nhận vay vốn/ xác nhận ƯĐGD (Dành cho SV Hệ chuẩn và Hệ CLC)",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Cấp mẫu giấy xác nhận phục vụ vay vốn tín dụng sinh viên tại Ngân hàng Chính sách Xã hội hoặc chế độ ưu đãi giáo dục.",
                thoiGianGiaiQuyet: "1 - 2 ngày làm việc"
            },
            {
                stt: 6,
                id: "PROC-CTSV-06",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình xét cấp học bổng xã hội cho sinh viên",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Tiếp nhận hồ sơ xét duyệt học bổng trợ cấp xã hội, học bổng chính sách, học bổng doanh nghiệp tài trợ.",
                thoiGianGiaiQuyet: "Theo kế hoạch từng đợt"
            },
            {
                stt: 7,
                id: "PROC-CTSV-07",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình cấp lại thẻ sinh viên (Dành cho SV Hệ chuẩn và Hệ CLC)",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Cấp lại thẻ sinh viên tích hợp thẻ ghi nợ ngân hàng do mất, hỏng hoặc rách mờ.",
                thoiGianGiaiQuyet: "7 - 10 ngày làm việc"
            },
            {
                stt: 8,
                id: "PROC-CTSV-08",
                categoryId: "cong-tac-sv",
                tenThuTuc: "Quy trình đăng ký cấp lại bảng điểm / giấy xác nhận sinh viên",
                linhVuc: "Công tác sinh viên",
                hinhThuc: "Trực tuyến",
                moTa: "Cấp bảng điểm quá trình học tập (tiếng Việt / song ngữ Anh-Việt) có xác nhận của Học viện.",
                thoiGianGiaiQuyet: "2 - 3 ngày làm việc"
            }
        ]
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HVNH_DATA;
}
