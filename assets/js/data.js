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
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = HVNH_DATA;
}
