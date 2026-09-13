/**
 * Banking Academy of Vietnam (Học viện Ngân hàng) - Core Application Logic
 * Replicating https://online.hvnh.edu.vn/
 */

const HVNH = {
    state: {
        currentPage: "home",
        newsPage: 1,
        newsPerPage: 8,
        selectedCategory: "thong-bao-chung",
        searchKeyword: "",
        currentCaptcha: "",
        tkbMode: "lop", // 'lop', 'giangvien', 'phong', 'monhoc'
        currentUser: null
    },

    init: function () {
        // Load user from localStorage if exists
        const savedUser = localStorage.getItem("hvnh_user");
        if (savedUser) {
            try {
                this.state.currentUser = JSON.parse(savedUser);
            } catch (e) {
                this.state.currentUser = null;
            }
        }

        // Setup Hash Change Listener for Navigation
        window.addEventListener("hashchange", () => this.handleRouting());
        
        // Initial route or default
        this.handleRouting();

        // Update auth state in header
        this.updateAuthUI();

        // Bind global events
        this.bindEvents();
    },

    // Handle Client-Side Routing
    handleRouting: function () {
        const hash = window.location.hash || "#/";
        const parts = hash.replace(/^#\/?/, "").split("/");
        const route = parts[0] || "home";
        const param = parts[1] || null;

        // Reset search if changing main pages
        if (route !== "home") {
            this.state.searchKeyword = "";
        }

        this.setActiveNav(route);

        switch (route) {
            case "tra-cuu-van-bang":
                this.renderDegreeLookup();
                break;
            case "tra-cuu-tkb":
                this.renderTimetableLookup();
                break;
            case "tra-cuu-tuyen-sinh":
                this.renderAdmissionsLookup();
                break;
            case "login":
                this.renderLoginPage();
                break;
            case "portal":
                this.renderStudentPortal();
                break;
            case "tin-tuc":
                if (param) {
                    this.renderNewsDetail(param);
                } else {
                    this.renderHome();
                }
                break;
            case "home":
            default:
                if (param) {
                    this.state.selectedCategory = param;
                }
                this.renderHome();
                break;
        }

        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    setActiveNav: function (route) {
        document.querySelectorAll(".navbar-nav li").forEach(li => li.classList.remove("active"));
        const navMap = {
            "home": "nav-home",
            "tra-cuu-van-bang": "nav-vanbang",
            "tra-cuu-tkb": "nav-tkb",
            "tra-cuu-tuyen-sinh": "nav-tuyensinh",
            "login": "nav-login",
            "portal": "nav-portal"
        };
        const el = document.getElementById(navMap[route]);
        if (el) el.classList.add("active");
    },

    bindEvents: function () {
        // Quick search news
        document.addEventListener("input", (e) => {
            if (e.target && e.target.id === "txtSearchNews") {
                this.state.searchKeyword = e.target.value.trim().toLowerCase();
                this.state.newsPage = 1;
                this.renderNewsList();
            }
        });
    },

    /* ==========================================================================
       1. HOME PAGE & NEWS
       ========================================================================== */
    renderHome: function () {
        const catInfo = HVNH_DATA.categories.find(c => c.id === this.state.selectedCategory) || { name: "Thông báo chung" };
        
        const html = `
            <div class="divmain">
                <div class="bgtitle">
                    <span>${catInfo.name}</span>
                    <span style="font-size: 12px; font-weight: normal; text-transform: none; opacity: 0.9;">
                        Cổng thông tin đào tạo Học viện Ngân hàng
                    </span>
                </div>

                <div class="news-search-bar">
                    <div class="input-group">
                        <input type="text" id="txtSearchNews" class="form-control" 
                               value="${this.state.searchKeyword}" 
                               placeholder="Tìm kiếm thông báo, quy chế, thời khóa biểu...">
                        <span class="input-group-btn">
                            <button class="btn btn-default" type="button" onclick="HVNH.clearNewsSearch()">
                                <i class="glyphicon glyphicon-remove"></i>
                            </button>
                        </span>
                    </div>
                </div>

                <div id="newsListContainer"></div>
                <div id="newsPaginationContainer" class="pagination-container"></div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;
        this.renderNewsList();
    },

    renderNewsList: function () {
        const container = document.getElementById("newsListContainer");
        const pagContainer = document.getElementById("newsPaginationContainer");
        if (!container) return;

        let filtered = HVNH_DATA.news;

        // Category filter
        if (this.state.selectedCategory && this.state.selectedCategory !== "all") {
            filtered = filtered.filter(n => n.category === this.state.selectedCategory || n.category.startsWith(this.state.selectedCategory));
            // If empty, allow fallback to general news for rich display
            if (filtered.length === 0) {
                filtered = HVNH_DATA.news;
            }
        }

        // Keyword filter
        if (this.state.searchKeyword) {
            filtered = filtered.filter(n => 
                n.title.toLowerCase().includes(this.state.searchKeyword) ||
                n.content.toLowerCase().includes(this.state.searchKeyword)
            );
        }

        if (filtered.length === 0) {
            container.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #888;">
                    <i class="glyphicon glyphicon-search" style="font-size: 32px; margin-bottom: 10px; color: #ccc;"></i>
                    <p>Không tìm thấy tin tức hoặc thông báo nào phù hợp.</p>
                </div>
            `;
            if (pagContainer) pagContainer.innerHTML = "";
            return;
        }

        // Pagination calculations
        const totalItems = filtered.length;
        const totalPages = Math.ceil(totalItems / this.state.newsPerPage) || 1;
        if (this.state.newsPage > totalPages) this.state.newsPage = totalPages;

        const startIndex = (this.state.newsPage - 1) * this.state.newsPerPage;
        const pageItems = filtered.slice(startIndex, startIndex + this.state.newsPerPage);

        let itemsHtml = "";
        pageItems.forEach(item => {
            const pinIcon = item.isPinned ? `<span class="glyphicon glyphicon-pushpin news-pin" title="Tin ghim quan trọng"></span>` : "";
            itemsHtml += `
                <div class="news-item">
                    <a href="#/tin-tuc/${item.id}">
                        <div class="news-title">
                            ${pinIcon}
                            <span>${item.title}</span>
                            ${item.isPinned ? `<span class="news-badge">Mới</span>` : ""}
                        </div>
                        <div class="news-meta">
                            <span style="float: left; color: #666; font-size: 11.5px;">
                                <i class="glyphicon glyphicon-folder-open"></i> ${item.categoryName}
                            </span>
                            <i>ngày đăng ${item.date}</i>
                        </div>
                    </a>
                </div>
            `;
        });

        container.innerHTML = itemsHtml;

        // Render Pagination UI
        let pagHtml = `<span>Trang </span>`;
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.state.newsPage) {
                pagHtml += `<span class="active">[${i}]</span>`;
            } else {
                pagHtml += `<a onclick="HVNH.changeNewsPage(${i})">${i}</a>`;
            }
        }
        if (this.state.newsPage < totalPages) {
            pagHtml += `<a onclick="HVNH.changeNewsPage(${this.state.newsPage + 1})">Trang sau</a>`;
            pagHtml += `<a onclick="HVNH.changeNewsPage(${totalPages})">Trang cuối</a>`;
        }

        if (pagContainer) pagContainer.innerHTML = pagHtml;
    },

    changeNewsPage: function (page) {
        this.state.newsPage = page;
        this.renderNewsList();
        document.getElementById("mainContent").scrollIntoView({ behavior: 'smooth' });
    },

    clearNewsSearch: function () {
        this.state.searchKeyword = "";
        const input = document.getElementById("txtSearchNews");
        if (input) input.value = "";
        this.state.newsPage = 1;
        this.renderNewsList();
    },

    filterCategory: function (catId) {
        this.state.selectedCategory = catId;
        this.state.newsPage = 1;
        window.location.hash = `#/home/${catId}`;
    },

    renderNewsDetail: function (newsId) {
        const item = HVNH_DATA.news.find(n => n.id == newsId);
        if (!item) {
            this.renderHome();
            return;
        }

        const html = `
            <div class="divmain">
                <div class="bgtitle">
                    <span>${item.categoryName}</span>
                    <a href="#/" class="btn btn-xs btn-default" style="color: #056382; font-weight: bold;">
                        <i class="glyphicon glyphicon-arrow-left"></i> Quay lại
                    </a>
                </div>

                <div style="padding: 20px 25px;">
                    <h3 style="color: #056382; font-weight: bold; margin-top: 0; line-height: 1.4;">
                        ${item.title}
                    </h3>
                    <div style="color: #888; font-size: 13px; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 20px;">
                        <span><i class="glyphicon glyphicon-calendar"></i> Ngày đăng: <strong>${item.date}</strong></span>
                        <span style="margin: 0 10px;">|</span>
                        <span><i class="glyphicon glyphicon-eye-open"></i> Lượt xem: <strong>${item.views}</strong></span>
                        <span style="margin: 0 10px;">|</span>
                        <span><i class="glyphicon glyphicon-user"></i> Người đăng: <strong>Phòng Quản lý Đào tạo</strong></span>
                    </div>

                    <div style="font-size: 14.5px; line-height: 1.8; color: #222;" class="news-body-content">
                        ${item.content}
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px dashed #ccc; display: flex; justify-content: space-between; align-items: center;">
                        <button class="btn btn-sm btn-default" onclick="window.print()">
                            <i class="glyphicon glyphicon-print"></i> In thông báo
                        </button>
                        <a href="#/" class="btn btn-sm btn-primary" style="background-color: #056382;">
                            <i class="glyphicon glyphicon-list"></i> Xem các thông báo khác
                        </a>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;
    },

    /* ==========================================================================
       2. TRA CỨU VĂN BẰNG (Degree Verification)
       ========================================================================== */
    renderDegreeLookup: function () {
        const html = `
            <div class="divmain">
                <div class="bgtitle">TRA CỨU VĂN BẰNG</div>
                <div class="vanbang-container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="form-group">
                                <label>Họ tên:</label>
                                <input type="text" class="form-control" id="txtHoTen" placeholder="Nhập họ tên để tìm...">
                            </div>
                            <div class="form-group">
                                <label>Ngày sinh (dd/MM/yyyy):</label>
                                <input type="text" class="form-control" id="txtNgaySinh" placeholder="VD: 15/08/2003">
                            </div>
                            <div class="form-group">
                                <label>Số hiệu bằng:</label>
                                <input type="text" class="form-control" id="txtSoHieuVanBang" placeholder="VD: B2025-HVNH-04123">
                            </div>
                        </div>

                        <div class="col-md-5">
                            <div class="form-group">
                                <label>Mã số sinh viên:</label>
                                <input type="text" class="form-control" id="txtMaSoSinhVien" placeholder="VD: 21A4010123">
                            </div>
                            <div class="form-group">
                                <label>Năm tốt nghiệp:</label>
                                <input type="text" class="form-control" id="txtNamTotNghiep" placeholder="VD: 2025">
                            </div>

                            <div style="margin-top: 25px;">
                                <button type="button" class="btn btn-danger" id="btnTraCuuVB" onclick="HVNH.searchDegree()" style="padding: 6px 18px;">
                                    <i class="glyphicon glyphicon-search"></i> Tra cứu
                                </button>
                                <button type="button" class="btn btn-success" onclick="HVNH.showDegreeTemplate()" style="margin-left: 5px;">
                                    <i class="glyphicon glyphicon-file"></i> Mẫu phôi văn bằng chứng chỉ
                                </button>
                                <button type="button" class="btn btn-default" onclick="HVNH.fillDegreeSample()" style="margin-left: 5px;">
                                    Điền mẫu thử
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Search Results -->
                    <div id="divTraCuuVanBang" style="margin-top: 20px;"></div>
                </div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;
    },

    fillDegreeSample: function () {
        document.getElementById("txtHoTen").value = "Nguyễn Hoàng Nam";
        document.getElementById("txtMaSoSinhVien").value = "21A4010123";
        document.getElementById("txtNamTotNghiep").value = "2025";
        this.searchDegree();
    },

    searchDegree: function () {
        const hoTen = (document.getElementById("txtHoTen").value || "").trim().toLowerCase();
        const ngaySinh = (document.getElementById("txtNgaySinh").value || "").trim();
        const mssv = (document.getElementById("txtMaSoSinhVien").value || "").trim().toLowerCase();
        const soHieu = (document.getElementById("txtSoHieuVanBang").value || "").trim().toLowerCase();
        const namTN = (document.getElementById("txtNamTotNghiep").value || "").trim();

        const resultDiv = document.getElementById("divTraCuuVanBang");
        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #056382;">
                <i class="glyphicon glyphicon-refresh" style="animation: spin 1s infinite linear; font-size: 24px;"></i>
                <p style="margin-top: 8px;">Đang tra cứu cơ sở dữ liệu văn bằng Học viện Ngân hàng...</p>
            </div>
        `;

        setTimeout(() => {
            let results = HVNH_DATA.degrees.filter(d => {
                let match = true;
                if (hoTen && !d.hoTen.toLowerCase().includes(hoTen)) match = false;
                if (mssv && !d.maSV.toLowerCase().includes(mssv)) match = false;
                if (soHieu && !d.soHieuVanBang.toLowerCase().includes(soHieu)) match = false;
                if (namTN && d.namTotNghiep !== namTN) match = false;
                if (ngaySinh && d.ngaySinh !== ngaySinh) match = false;
                return match;
            });

            // If user searched with completely empty form, show all records for demonstration
            if (!hoTen && !mssv && !soHieu && !namTN && !ngaySinh) {
                results = HVNH_DATA.degrees;
            }

            if (results.length === 0) {
                resultDiv.innerHTML = `
                    <div class="alert alert-warning" style="margin-top: 15px;">
                        <i class="glyphicon glyphicon-info-sign"></i> 
                        Không tìm thấy thông tin văn bằng phù hợp với tiêu chí tra cứu. Vui lòng kiểm tra lại Họ tên, Mã sinh viên hoặc Số hiệu văn bằng.
                    </div>
                `;
                return;
            }

            let rows = "";
            results.forEach((item, index) => {
                rows += `
                    <tr>
                        <td style="text-align: center; font-weight: bold;">${item.maSV}</td>
                        <td style="font-weight: 500;">${item.hoTen}</td>
                        <td style="text-align: center;">${item.soVaoSo}</td>
                        <td style="text-align: center; color: #b71c1c; font-weight: bold;">${item.soHieuVanBang}</td>
                        <td>${item.loaiHinh}</td>
                        <td style="text-align: center;">${item.ngaySinh}</td>
                        <td style="text-align: center;"><span class="label label-success">${item.xepLoai}</span></td>
                        <td style="text-align: center;">${item.namTotNghiep}</td>
                        <td style="text-align: center;">
                            <button type="button" class="btn btn-xs btn-info" onclick="HVNH.viewDegreeDetail('${item.maSV}')" style="background-color: #056382; border-color: #056382;">
                                <i class="glyphicon glyphicon-eye-open"></i> Chi tiết
                            </button>
                        </td>
                    </tr>
                `;
            });

            resultDiv.innerHTML = `
                <div class="table-responsive">
                    <table class="vanbang-result-table">
                        <thead>
                            <tr>
                                <th>Mã SV</th>
                                <th>Tên sinh viên</th>
                                <th>Số vào sổ</th>
                                <th>Số hiệu bằng</th>
                                <th>Loại VBCC</th>
                                <th>Ngày sinh</th>
                                <th>Xếp loại</th>
                                <th>Năm TN</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>${rows}</tbody>
                    </table>
                </div>
            `;
        }, 350);
    },

    viewDegreeDetail: function (maSV) {
        const item = HVNH_DATA.degrees.find(d => d.maSV === maSV);
        if (!item) return;

        const content = `
            <div class="degree-card">
                <div class="degree-header">
                    <h3>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</h3>
                    <p style="margin: 0; font-size: 13px; font-weight: 500;">Độc lập - Tự do - Hạnh phúc</p>
                    <div style="width: 160px; height: 1px; background: #c59b27; margin: 6px auto 15px auto;"></div>
                    <h2>HỌC VIỆN NGÂN HÀNG</h2>
                    <p style="font-size: 14px; font-weight: bold; color: #8b0000; letter-spacing: 1px; margin-top: 5px;">BẰNG CỬ NHÂN</p>
                </div>

                <div class="degree-body">
                    <div class="degree-field">
                        <div class="degree-label">Công nhận:</div>
                        <div class="degree-value" style="font-size: 17px; color: #8b0000;">${item.hoTen.toUpperCase()}</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Ngày sinh:</div>
                        <div class="degree-value">${item.ngaySinh} &nbsp;&nbsp;|&nbsp;&nbsp; Giới tính: ${item.gioiTinh}</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Mã số sinh viên:</div>
                        <div class="degree-value">${item.maSV}</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Ngành đào tạo:</div>
                        <div class="degree-value">${item.nganh}</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Chuyên ngành:</div>
                        <div class="degree-value">${item.chuyenNganh}</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Khóa đào tạo:</div>
                        <div class="degree-value">${item.khoaHoc}</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Hình thức đào tạo:</div>
                        <div class="degree-value">${item.loaiHinh}</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Xếp loại tốt nghiệp:</div>
                        <div class="degree-value" style="color: #2e7d32; font-size: 15px;">${item.xepLoai} (Điểm tích lũy: ${item.diemTichLuy}/4.0)</div>
                    </div>
                    <div class="degree-field">
                        <div class="degree-label">Quyết định tốt nghiệp:</div>
                        <div class="degree-value">${item.quyetDinh}</div>
                    </div>
                    
                    <div style="margin-top: 25px; padding-top: 15px; border-top: 1px dashed #c59b27; display: flex; justify-content: space-between; font-size: 13px;">
                        <div>
                            Số hiệu văn bằng: <strong style="color: #b71c1c;">${item.soHieuVanBang}</strong><br/>
                            Số vào sổ cấp bằng: <strong>${item.soVaoSo}</strong>
                        </div>
                        <div style="text-align: right;">
                            Hà Nội, ngày cấp: <strong>${item.ngayCap}</strong><br/>
                            <strong>GIÁM ĐỐC HỌC VIỆN NGÂN HÀNG</strong>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.showModal("Chi tiết văn bằng chứng chỉ", content, `
            <button type="button" class="btn btn-default" onclick="window.print()"><i class="glyphicon glyphicon-print"></i> In chứng chỉ</button>
            <button type="button" class="btn btn-primary" style="background-color: #056382;" data-dismiss="modal">Đóng</button>
        `);
    },

    showDegreeTemplate: function () {
        const content = `
            <div style="text-align: center; padding: 15px;">
                <h4 style="color: #056382; font-weight: bold;">MẪU PHÔI VĂN BẰNG & CHỨNG CHỈ TỐT NGHIỆP</h4>
                <p style="color: #666;">Học viện Ngân hàng ban hành mẫu phôi văn bằng cử nhân đại học chính quy chuẩn quốc gia theo Thông tư số 21/2019/TT-BGDĐT.</p>
                <div style="border: 2px dashed #056382; padding: 25px; margin: 15px 0; background: #fdfefe; border-radius: 4px;">
                    <img src="assets/logo/banner.jpg" style="max-width: 100%; height: auto; border: 1px solid #ddd; margin-bottom: 10px; border-radius: 4px;">
                    <p style="font-size: 12.5px; color: #555;">Mặt trong và mặt ngoài phôi bằng cử nhân Học viện Ngân hàng có tích hợp mã QR xác thực điện tử và tem chống giả hoa văn bảo an chìm của Bộ Giáo dục & Đào tạo.</p>
                </div>
            </div>
        `;
        this.showModal("Mẫu phôi văn bằng chứng chỉ", content);
    },

    /* ==========================================================================
       3. TRA CỨU THỜI KHÓA BIỂU (Timetable Lookup)
       ========================================================================== */
    renderTimetableLookup: function () {
        const html = `
            <div class="divmain">
                <div class="bgtitle">TRA CỨU THỜI KHÓA BIỂU</div>
                
                <!-- 4 Action Buttons -->
                <div class="tkb-btn-bar">
                    <button type="button" class="btn btn-success" id="btnTkbLop" onclick="HVNH.setTkbMode('lop')">
                        <i class="glyphicon glyphicon-th"></i> TKB Lớp
                    </button>
                    <button type="button" class="btn btn-warning" id="btnTkbGv" onclick="HVNH.setTkbMode('giangvien')">
                        <i class="glyphicon glyphicon-user"></i> TKB Giảng viên
                    </button>
                    <button type="button" class="btn btn-danger" id="btnTkbPhong" onclick="HVNH.setTkbMode('phong')">
                        <i class="glyphicon glyphicon-home"></i> TKB Phòng
                    </button>
                    <button type="button" class="btn btn-default hlbtn" id="btnTkbMon" onclick="HVNH.setTkbMode('monhoc')">
                        <i class="glyphicon glyphicon-book"></i> TKB Môn học
                    </button>
                </div>

                <!-- Filters Bar -->
                <div class="tkb-filter-bar" id="tkbFilterControls">
                    <div class="tkb-filter-group">
                        <span>Năm học:</span>
                        <select id="selYearStudy" onchange="HVNH.onTkbFilterChange()">
                            <option value="2026-2027" selected>2026-2027</option>
                            <option value="2025-2026">2025-2026</option>
                            <option value="2024-2025">2024-2025</option>
                        </select>
                    </div>

                    <div class="tkb-filter-group">
                        <span>Học kỳ:</span>
                        <select id="selTermID" onchange="HVNH.onTkbFilterChange()">
                            <option value="HK01" selected>Học kỳ 1</option>
                            <option value="HK02">Học kỳ 2</option>
                            <option value="HK03">Học kỳ 3 (Hè)</option>
                        </select>
                    </div>

                    <div class="tkb-filter-group">
                        <span>Tuần:</span>
                        <select id="selWeek" onchange="HVNH.onTkbFilterChange()">
                            <option value="1">Tuần 01: 01/09/2026 - 07/09/2026</option>
                            <option value="2" selected>Tuần 02: 08/09/2026 - 14/09/2026</option>
                            <option value="3">Tuần 03: 15/09/2026 - 21/09/2026</option>
                            <option value="4">Tuần 04: 22/09/2026 - 28/09/2026</option>
                            <option value="5">Tuần 05: 29/09/2026 - 05/10/2026</option>
                        </select>
                    </div>

                    <div class="tkb-filter-group" id="groupTargetSelect">
                        <!-- Populated dynamically based on mode -->
                    </div>

                    <div style="margin-left: auto;">
                        <button type="button" class="btn btn-sm btn-info" onclick="HVNH.drawTimetable()" style="background-color: #056382; border-color: #056382;">
                            <i class="glyphicon glyphicon-refresh"></i> Xem lịch
                        </button>
                        <button type="button" class="btn btn-sm btn-default" onclick="window.print()" style="margin-left: 5px;">
                            <i class="glyphicon glyphicon-print"></i> In TKB
                        </button>
                    </div>
                </div>

                <!-- Timetable Grid Container -->
                <div style="padding: 15px;" id="divThoiKhoiBieu"></div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;
        this.setTkbMode("lop");
    },

    setTkbMode: function (mode) {
        this.state.tkbMode = mode;
        const targetContainer = document.getElementById("groupTargetSelect");
        if (!targetContainer) return;

        if (mode === "lop") {
            let options = HVNH_DATA.classes.map(c => `<option value="${c.id}">${c.name}</option>`).join("");
            targetContainer.innerHTML = `<span>Lớp:</span> <select id="selTarget" onchange="HVNH.drawTimetable()">${options}</select>`;
        } else if (mode === "giangvien") {
            let options = HVNH_DATA.professors.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
            targetContainer.innerHTML = `<span>Giảng viên:</span> <select id="selTarget" onchange="HVNH.drawTimetable()">${options}</select>`;
        } else if (mode === "phong") {
            let options = HVNH_DATA.rooms.map(r => `<option value="${r.id}">${r.name}</option>`).join("");
            targetContainer.innerHTML = `<span>Phòng:</span> <select id="selTarget" onchange="HVNH.drawTimetable()">${options}</select>`;
        } else if (mode === "monhoc") {
            let options = HVNH_DATA.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join("");
            targetContainer.innerHTML = `<span>Môn học:</span> <select id="selTarget" onchange="HVNH.drawTimetable()">${options}</select>`;
        }

        this.drawTimetable();
    },

    onTkbFilterChange: function () {
        this.drawTimetable();
    },

    drawTimetable: function () {
        const container = document.getElementById("divThoiKhoiBieu");
        if (!container) return;

        const selTarget = document.getElementById("selTarget");
        const targetId = selTarget ? selTarget.value : "K27NHA";
        const targetText = selTarget ? selTarget.options[selTarget.selectedIndex].text : "K27NHA";
        
        const selWeek = document.getElementById("selWeek");
        const weekText = selWeek ? selWeek.options[selWeek.selectedIndex].text : "Tuần 02";

        // Get or synthesize schedule for target
        const schedule = HVNH_DATA.schedules[targetId] || HVNH_DATA.schedules["K27NHA"];

        const days = [
            { dayNum: 2, label: "Thứ 2" },
            { dayNum: 3, label: "Thứ 3" },
            { dayNum: 4, label: "Thứ 4" },
            { dayNum: 5, label: "Thứ 5" },
            { dayNum: 6, label: "Thứ 6" },
            { dayNum: 7, label: "Thứ 7" },
            { dayNum: 8, label: "Chủ nhật" }
        ];

        let rowsHtml = "";
        days.forEach(d => {
            const daySched = schedule[d.dayNum] || { sang: null, chieu: null, toi: null };

            const renderSlot = (slot) => {
                if (!slot) return `<div class="slot-empty">—</div>`;
                return `
                    <div class="divcontent">
                        <b style="color: #056382; font-size: 13px;">${slot.subject}</b> (${slot.code})<br/>
                        Phòng: <b>${slot.room}</b> | Tiết: <b>${slot.tiet}</b><br/>
                        Giảng viên: <b>${slot.gv}</b><br/>
                        Hình thức: <span class="label label-default" style="background:#056382;">${slot.type}</span>
                    </div>
                `;
            };

            rowsHtml += `
                <tr>
                    <td class="thu">${d.label}</td>
                    <td>${renderSlot(daySched.sang)}</td>
                    <td>${renderSlot(daySched.chieu)}</td>
                    <td>${renderSlot(daySched.toi)}</td>
                </tr>
            `;
        });

        container.innerHTML = `
            <div style="font-weight: bold; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                <span style="color: #056382; font-size: 14.5px;">
                    <i class="glyphicon glyphicon-calendar"></i> ${weekText}
                </span>
                <span style="color: #333; font-size: 14.5px;">
                    Lịch đào tạo: <strong>${targetText}</strong>
                </span>
            </div>

            <div class="table-responsive">
                <table class="maindivtb">
                    <thead>
                        <tr>
                            <th style="width: 80px;">Thứ</th>
                            <th style="width: 32%;">Sáng (Tiết 1 - 6)</th>
                            <th style="width: 32%;">Chiều (Tiết 7 - 12)</th>
                            <th style="width: 32%;">Tối (Tiết 13 - 15)</th>
                        </tr>
                    </thead>
                    <tbody>${rowsHtml}</tbody>
                </table>
            </div>

            <div style="margin-top: 15px; font-size: 12.5px; color: #666; background: #fdfdfd; padding: 10px; border: 1px solid #eee;">
                <strong>Ghi chú:</strong> Ca sáng: Tiết 1 bắt đầu từ 07:00. Ca chiều: Tiết 7 bắt đầu từ 12:45. Ca tối: Tiết 13 bắt đầu từ 18:00. Sinh viên có mặt tại giảng đường trước giờ vào lớp 05 phút.
            </div>
        `;
    },

    /* ==========================================================================
       4. TRA CỨU TUYỂN SINH (Admissions Lookup)
       ========================================================================== */
    renderAdmissionsLookup: function () {
        const html = `
            <div class="divmain">
                <div class="bgtitle">Tra cứu danh sách thí sinh đăng ký xét tuyển sớm vào Học viện Ngân hàng năm 2026</div>
                <div class="tuyensinh-container">
                    <div class="tuyensinh-search-box">
                        <input type="text" class="form-control" id="txtAdmissionsKey" 
                               placeholder="Nhập số CCCD / CMTND hoặc Mã hồ sơ để tra cứu..."
                               onkeypress="if(event.keyCode===13) HVNH.searchAdmissions()">
                        <button type="button" class="btn btn-default" onclick="HVNH.searchAdmissions()" style="background-color: #056382; color: #fff;">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </div>

                    <div style="margin-bottom: 15px;">
                        <button type="button" class="btn btn-xs btn-default" onclick="HVNH.fillAdmissionsSample('001203014589')">
                            Mẫu 1: Lê Hoàng Phúc (001203014589)
                        </button>
                        <button type="button" class="btn btn-xs btn-default" onclick="HVNH.fillAdmissionsSample('034305019874')" style="margin-left: 5px;">
                            Mẫu 2: Vũ Phương Linh (034305019874)
                        </button>
                    </div>

                    <div id="divAdmissionsResult"></div>

                    <div class="tuyensinh-note">
                        <strong style="color: #056382; text-decoration: underline;">
                            <i class="glyphicon glyphicon-chevron-right"></i> Lưu ý quan trọng dành cho thí sinh:
                        </strong>
                        <ul style="margin-top: 8px; padding-left: 20px; line-height: 1.7;">
                            <li><strong>1. Đối với thí sinh đã có tên trong Danh sách xét tuyển:</strong> Cần rà soát kỹ đối tượng ưu tiên, khu vực tuyển sinh và điểm học bạ/chứng chỉ quốc tế.</li>
                            <li><strong>2. Xác nhận nguyện vọng trên Cổng của Bộ GD&ĐT:</strong> Thí sinh đủ điều kiện trúng tuyển sớm BẮT BUỘC phải đăng ký nguyện vọng 1 trên Cổng hỗ trợ tuyển sinh của Bộ Giáo dục & Đào tạo theo đúng thời gian quy định để được công nhận trúng tuyển chính thức.</li>
                            <li><strong>3. Kênh hỗ trợ tuyển sinh HVNH:</strong> Hotline: 0243 852 6419 | Fanpage: Tư vấn tuyển sinh Học viện Ngân hàng.</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;
    },

    fillAdmissionsSample: function (cccd) {
        document.getElementById("txtAdmissionsKey").value = cccd;
        this.searchAdmissions();
    },

    searchAdmissions: function () {
        const key = (document.getElementById("txtAdmissionsKey").value || "").trim().toLowerCase();
        const resultDiv = document.getElementById("divAdmissionsResult");
        if (!resultDiv) return;

        if (!key) {
            resultDiv.innerHTML = `
                <div class="alert alert-info">Vui lòng nhập số CCCD hoặc Mã hồ sơ để tiến hành tra cứu.</div>
            `;
            return;
        }

        resultDiv.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #056382;">
                <i class="glyphicon glyphicon-refresh" style="animation: spin 1s infinite linear; font-size: 24px;"></i>
                <p style="margin-top: 8px;">Đang tìm kiếm hồ sơ tuyển sinh...</p>
            </div>
        `;

        setTimeout(() => {
            const results = HVNH_DATA.admissions.filter(a => 
                a.cccd.toLowerCase().includes(key) || 
                a.maHoSo.toLowerCase().includes(key) || 
                a.hoTen.toLowerCase().includes(key)
            );

            if (results.length === 0) {
                resultDiv.innerHTML = `
                    <div class="alert alert-warning">
                        <i class="glyphicon glyphicon-info-sign"></i> Không tìm thấy dữ liệu xét tuyển tương ứng với từ khóa <strong>"${key}"</strong>. Vui lòng kiểm tra lại số CCCD/CMTND.
                    </div>
                `;
                return;
            }

            let cardsHtml = "";
            results.forEach(candidate => {
                cardsHtml += `
                    <div style="border: 1px solid #c2e1ec; background: #fafcfe; border-radius: 4px; padding: 20px; margin-top: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #e1eef4; padding-bottom: 12px; margin-bottom: 15px;">
                            <div>
                                <h4 style="margin: 0 0 5px 0; color: #056382; font-weight: bold;">${candidate.hoTen.toUpperCase()}</h4>
                                <span style="font-size: 13px; color: #666;">Số CCCD: <strong>${candidate.cccd}</strong> | Mã hồ sơ: <strong>${candidate.maHoSo}</strong></span>
                            </div>
                            <div>
                                <span class="label label-success" style="font-size: 13px; padding: 6px 12px;">${candidate.trangThai}</span>
                            </div>
                        </div>

                        <div class="row" style="font-size: 13.5px; line-height: 1.8;">
                            <div class="col-md-6">
                                <div>Ngành xét tuyển: <strong style="color: #056382;">${candidate.nganhXetTuyen}</strong> (Mã ngành: ${candidate.maNganh})</div>
                                <div>Tổ hợp xét tuyển: <strong>${candidate.toHop}</strong></div>
                                <div>Trường THPT: <strong>${candidate.truongTHPT}</strong></div>
                            </div>
                            <div class="col-md-6">
                                <div>Chi tiết điểm: Môn 1: <strong>${candidate.diemMon1}</strong> | Môn 2: <strong>${candidate.diemMon2}</strong> | Môn 3: <strong>${candidate.diemMon3}</strong></div>
                                <div>Điểm ưu tiên: <strong>${candidate.diemUuTien}</strong></div>
                                <div>Tổng điểm xét tuyển: <strong style="color: #c62828; font-size: 16px;">${candidate.tongDiem}</strong> (Điểm chuẩn đợt 1: ${candidate.diemChuan})</div>
                            </div>
                        </div>

                        <div style="margin-top: 15px; padding-top: 10px; border-top: 1px dashed #d5e6ee; font-size: 13px; color: #555;">
                            <em>Ghi chú: ${candidate.ghiChu}</em>
                        </div>
                    </div>
                `;
            });

            resultDiv.innerHTML = cardsHtml;
        }, 300);
    },

    /* ==========================================================================
       5. ĐĂNG NHẬP (Authentication Portal)
       ========================================================================== */
    renderLoginPage: function () {
        const html = `
            <div class="divmain">
                <div class="bgtitle">CỔNG THÔNG TIN ĐÀO TẠO - ĐĂNG NHẬP</div>

                <div class="login-container">
                    <div class="loginbox">
                        <div class="loginbox-social">
                            <div class="logo">
                                <img src="assets/logo/logo.png" alt="Học viện Ngân hàng">
                            </div>
                            <div class="uni-name">HỌC VIỆN NGÂN HÀNG</div>
                            <div class="social-title">Cổng thông tin đào tạo</div>
                        </div>

                        <div class="loginbox-or">
                            <div class="or-line"></div>
                            <div class="or">-*-</div>
                        </div>

                        <div id="loginAlertBox"></div>

                        <form onsubmit="HVNH.submitLogin(event)">
                            <div class="loginbox-textbox">
                                <input type="text" class="form-control" id="txtUsername" placeholder="Tên đăng nhập (Mã sinh viên)" required autocomplete="username">
                            </div>

                            <div class="loginbox-textbox">
                                <input type="password" class="form-control" id="txtPassword" placeholder="Mật khẩu" required autocomplete="current-password">
                            </div>

                            <div class="loginbox-forgot">
                                <div style="font-size: 13px; margin-bottom: 4px; font-weight: 500;">Nhập mã bảo vệ:</div>
                                <div class="captcha-box">
                                    <canvas id="captchaCanvas" width="130" height="38"></canvas>
                                    <button type="button" class="btn-refresh-captcha" onclick="HVNH.generateCaptcha()" title="Đổi mã bảo vệ khác">
                                        <i class="glyphicon glyphicon-refresh"></i> Đổi mã
                                    </button>
                                </div>
                                <input type="text" class="form-control" id="txtCaptcha" placeholder="Nhập chữ/số bảo vệ..." style="max-width: 220px;" required>
                            </div>

                            <div style="margin-top: 20px;">
                                <button type="submit" class="btn btn-info btn-block" style="background-color: #056382 !important; border-color: #056382; font-weight: bold; padding: 10px;">
                                    Đăng nhập
                                </button>
                            </div>

                            <div style="margin-top: 15px; text-align: center; font-size: 12.5px;">
                                <a href="javascript:void(0)" onclick="HVNH.fillDemoLogin()" style="color: #056382; font-weight: bold;">
                                    <i class="glyphicon glyphicon-log-in"></i> Đăng nhập nhanh bằng tài khoản mẫu
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;
        this.generateCaptcha();
    },

    generateCaptcha: function () {
        const canvas = document.getElementById("captchaCanvas");
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        
        // Random 5 characters
        const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        let code = "";
        for (let i = 0; i < 5; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        this.state.currentCaptcha = code;

        // Draw background
        ctx.fillStyle = "#f0f4f8";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add noise lines
        for (let i = 0; i < 4; i++) {
            ctx.strokeStyle = `rgba(5, 99, 130, ${Math.random() * 0.4 + 0.2})`;
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.stroke();
        }

        // Add text with slight distortion
        ctx.font = "bold 22px Courier, monospace";
        ctx.fillStyle = "#056382";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(code, canvas.width / 2, canvas.height / 2);
    },

    fillDemoLogin: function () {
        const u = document.getElementById("txtUsername");
        const p = document.getElementById("txtPassword");
        const c = document.getElementById("txtCaptcha");
        if (u) u.value = "21A4010123";
        if (p) p.value = "123";
        if (c) c.value = this.state.currentCaptcha;
    },

    submitLogin: function (e) {
        if (e) e.preventDefault();
        const username = (document.getElementById("txtUsername").value || "").trim();
        const password = (document.getElementById("txtPassword").value || "").trim();
        const captcha = (document.getElementById("txtCaptcha").value || "").trim().toUpperCase();
        const alertBox = document.getElementById("loginAlertBox");

        if (captcha !== this.state.currentCaptcha) {
            alertBox.innerHTML = `
                <div class="alert alert-danger" style="padding: 8px; font-size: 13px;">
                    Mã bảo vệ không chính xác. Vui lòng nhập lại!
                </div>
            `;
            this.generateCaptcha();
            return;
        }

        const student = HVNH_DATA.students[username];
        if (!student || student.password !== password) {
            alertBox.innerHTML = `
                <div class="alert alert-danger" style="padding: 8px; font-size: 13px;">
                    Tên đăng nhập hoặc mật khẩu không chính xác!
                </div>
            `;
            this.generateCaptcha();
            return;
        }

        // Login success
        this.state.currentUser = student;
        localStorage.setItem("hvnh_user", JSON.stringify(student));
        this.updateAuthUI();
        this.showToast("Đăng nhập thành công!", "success");
        window.location.hash = "#/portal";
    },

    logout: function () {
        this.state.currentUser = null;
        localStorage.removeItem("hvnh_user");
        this.updateAuthUI();
        this.showToast("Đã đăng xuất tài khoản thành công.", "info");
        window.location.hash = "#/";
    },

    updateAuthUI: function () {
        const container = document.getElementById("authNavContainer");
        if (!container) return;

        if (this.state.currentUser) {
            container.innerHTML = `
                <li class="dropdown">
                    <a href="javascript:void(0)" class="dropdown-toggle user-dropdown-btn" data-toggle="dropdown">
                        <img src="${this.state.currentUser.avatar}" class="user-avatar-mini" alt="User">
                        <span>${this.state.currentUser.hoTen}</span>
                        <b class="caret"></b>
                    </a>
                    <ul class="dropdown-menu" style="right: 0; left: auto; padding: 5px 0;">
                        <li><a href="#/portal"><i class="glyphicon glyphicon-user"></i> Cổng thông tin SV</a></li>
                        <li><a href="#/portal/diem"><i class="glyphicon glyphicon-list-alt"></i> Kết quả học tập</a></li>
                        <li><a href="#/portal/dangky"><i class="glyphicon glyphicon-edit"></i> Đăng ký môn học</a></li>
                        <li class="divider"></li>
                        <li><a href="javascript:void(0)" onclick="HVNH.logout()"><i class="glyphicon glyphicon-log-out"></i> Đăng xuất</a></li>
                    </ul>
                </li>
            `;
        } else {
            container.innerHTML = `
                <li id="nav-login">
                    <a href="#/login"><i class="glyphicon glyphicon-lock"></i> Đăng nhập</a>
                </li>
            `;
        }
    },

    /* ==========================================================================
       6. STUDENT PORTAL DASHBOARD
       ========================================================================== */
    renderStudentPortal: function () {
        if (!this.state.currentUser) {
            window.location.hash = "#/login";
            return;
        }

        const u = this.state.currentUser;

        let gradesRows = "";
        if (u.grades) {
            u.grades.forEach((g, idx) => {
                gradesRows += `
                    <tr>
                        <td style="text-align: center;">${idx + 1}</td>
                        <td style="text-align: center; font-weight: bold;">${g.maHP}</td>
                        <td>${g.tenHP}</td>
                        <td style="text-align: center;">${g.soTC}</td>
                        <td style="text-align: center;">${g.diemCC}</td>
                        <td style="text-align: center;">${g.diemGK}</td>
                        <td style="text-align: center;">${g.diemCK}</td>
                        <td style="text-align: center; font-weight: bold;">${g.diem10}</td>
                        <td style="text-align: center; font-weight: bold; color: #2e7d32;">${g.diemChu}</td>
                        <td style="text-align: center;">${g.diem4}</td>
                    </tr>
                `;
            });
        }

        const html = `
            <div class="divmain">
                <div class="bgtitle">
                    <span>CỔNG THÔNG TIN SINH VIÊN - HỌC VIỆN NGÂN HÀNG</span>
                    <button class="btn btn-xs btn-danger" onclick="HVNH.logout()">
                        <i class="glyphicon glyphicon-log-out"></i> Đăng xuất
                    </button>
                </div>

                <div style="padding: 20px;">
                    <!-- Student Header Profile Card -->
                    <div class="portal-profile-header">
                        <img src="${u.avatar}" class="portal-avatar" alt="Avatar">
                        <div style="flex: 1;">
                            <h3 style="margin: 0 0 5px 0; color: #056382; font-weight: bold;">
                                ${u.hoTen} <span style="font-size: 14px; font-weight: normal; color: #666;">(${u.username})</span>
                            </h3>
                            <div style="font-size: 13.5px; color: #444; line-height: 1.6;">
                                <span>Lớp: <strong>${u.lop}</strong></span> | 
                                <span>Khoa: <strong>${u.khoa}</strong></span> | 
                                <span>Chuyên ngành: <strong>${u.chuyenNganh || u.nganh}</strong></span>
                            </div>
                        </div>
                        <div style="text-align: right; background: #eef6fa; padding: 10px 15px; border-radius: 4px; border: 1px solid #c9e1ef;">
                            <div style="font-size: 12px; color: #666;">Điểm trung bình (GPA):</div>
                            <div style="font-size: 22px; font-weight: bold; color: #056382;">${u.gpa}/4.0</div>
                            <div style="font-size: 11px; color: #2e7d32; font-weight: 500;">Xếp loại: ${u.xepLoai}</div>
                        </div>
                    </div>

                    <!-- Navigation Tabs -->
                    <div class="portal-nav-tabs">
                        <button class="portal-tab-btn active" onclick="HVNH.switchPortalTab('tabInfo', this)">
                            <i class="glyphicon glyphicon-user"></i> Hồ sơ sinh viên
                        </button>
                        <button class="portal-tab-btn" onclick="HVNH.switchPortalTab('tabDiem', this)">
                            <i class="glyphicon glyphicon-list-alt"></i> Bảng điểm tích lũy
                        </button>
                        <button class="portal-tab-btn" onclick="HVNH.switchPortalTab('tabDangKy', this)">
                            <i class="glyphicon glyphicon-edit"></i> Đăng ký học phần
                        </button>
                        <button class="portal-tab-btn" onclick="HVNH.switchPortalTab('tabHocPhi', this)">
                            <i class="glyphicon glyphicon-credit-card"></i> Tra cứu học phí
                        </button>
                    </div>

                    <!-- Tab 1: Hồ sơ sinh viên -->
                    <div id="tabInfo" class="portal-tab-content">
                        <div class="row">
                            <div class="col-md-6">
                                <table class="table table-bordered">
                                    <tr><td style="width: 160px; font-weight: 600;">Mã số sinh viên:</td><td>${u.username}</td></tr>
                                    <tr><td style="font-weight: 600;">Họ và tên:</td><td>${u.hoTen}</td></tr>
                                    <tr><td style="font-weight: 600;">Lớp sinh hoạt:</td><td>${u.lop}</td></tr>
                                    <tr><td style="font-weight: 600;">Khoa quản lý:</td><td>${u.khoa}</td></tr>
                                    <tr><td style="font-weight: 600;">Chương trình đào tạo:</td><td>Đại học chính quy tín chỉ</td></tr>
                                </table>
                            </div>
                            <div class="col-md-6">
                                <table class="table table-bordered">
                                    <tr><td style="width: 160px; font-weight: 600;">Khóa học:</td><td>${u.khoaHoc || "2021 - 2025"}</td></tr>
                                    <tr><td style="font-weight: 600;">Trạng thái học tập:</td><td><span class="label label-success">${u.tinhTrang}</span></td></tr>
                                    <tr><td style="font-weight: 600;">Email học viện:</td><td>${u.email}</td></tr>
                                    <tr><td style="font-weight: 600;">Số tín chỉ tích lũy:</td><td><strong>${u.tinChiTichLuy}</strong> tín chỉ</td></tr>
                                    <tr><td style="font-weight: 600;">Điểm rèn luyện toàn khóa:</td><td><strong>92/100 (Xuất sắc)</strong></td></tr>
                                </table>
                            </div>
                        </div>
                    </div>

                    <!-- Tab 2: Bảng điểm tích lũy -->
                    <div id="tabDiem" class="portal-tab-content" style="display: none;">
                        <div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
                            <h4 style="margin: 0; color: #056382; font-weight: bold;">KẾT QUẢ HỌC TẬP HỌC KỲ GẦN NHẤT</h4>
                            <button class="btn btn-sm btn-default" onclick="window.print()">
                                <i class="glyphicon glyphicon-print"></i> In bảng điểm
                            </button>
                        </div>
                        <div class="table-responsive">
                            <table class="portal-table">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Mã HP</th>
                                        <th>Tên học phần</th>
                                        <th>Số TC</th>
                                        <th>Chuyên cần</th>
                                        <th>Giữa kỳ</th>
                                        <th>Cuối kỳ</th>
                                        <th>Thang 10</th>
                                        <th>Điểm chữ</th>
                                        <th>Thang 4</th>
                                    </tr>
                                </thead>
                                <tbody>${gradesRows}</tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Tab 3: Đăng ký học phần -->
                    <div id="tabDangKy" class="portal-tab-content" style="display: none;">
                        <div class="alert alert-info">
                            <strong>Đợt đăng ký:</strong> Học kỳ 1 năm học 2026-2027. Hệ thống đang mở cho sinh viên đăng ký môn học bổ sung.
                        </div>
                        <div class="table-responsive">
                            <table class="table table-bordered table-hover">
                                <thead style="background: #056382; color: #fff;">
                                    <tr>
                                        <th style="text-align: center; width: 40px;">Chọn</th>
                                        <th>Mã HP</th>
                                        <th>Tên học phần</th>
                                        <th style="text-align: center;">Số TC</th>
                                        <th>Giảng viên</th>
                                        <th>Lịch học</th>
                                        <th>Phòng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="text-align: center;"><input type="checkbox" checked></td>
                                        <td>BNK402</td>
                                        <td>Quản trị rủi ro Ngân hàng</td>
                                        <td style="text-align: center;">3</td>
                                        <td>PGS.TS. Lê Đình Hoàng</td>
                                        <td>Thứ 3 (Tiết 1 - 3)</td>
                                        <td>D2.304</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;"><input type="checkbox" checked></td>
                                        <td>FIN305</td>
                                        <td>Thẩm định dự án đầu tư</td>
                                        <td style="text-align: center;">3</td>
                                        <td>TS. Nguyễn Văn Hùng</td>
                                        <td>Thứ 5 (Tiết 7 - 9)</td>
                                        <td>D1.201</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center;"><input type="checkbox"></td>
                                        <td>MKT201</td>
                                        <td>Marketing Ngân hàng hiện đại</td>
                                        <td style="text-align: center;">2</td>
                                        <td>ThS. Trần Thị Mai Phương</td>
                                        <td>Thứ 6 (Tiết 4 - 5)</td>
                                        <td>D2.508</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <button type="button" class="btn btn-primary" style="background-color: #056382;" onclick="HVNH.saveRegistration()">
                            <i class="glyphicon glyphicon-floppy-disk"></i> Lưu đăng ký học phần
                        </button>
                    </div>

                    <!-- Tab 4: Học phí -->
                    <div id="tabHocPhi" class="portal-tab-content" style="display: none;">
                        <div class="well" style="background: #fff; border: 1px solid #ddd;">
                            <h4 style="color: #056382; font-weight: bold; margin-top: 0;">THÔNG TIN CÔNG NỢ & HỌC PHÍ</h4>
                            <div class="row" style="font-size: 14px; line-height: 2;">
                                <div class="col-md-6">
                                    Học kỳ: <strong>${u.tuition ? u.tuition.hocKy : "Học kỳ 1 năm học 2026-2027"}</strong><br/>
                                    Tổng học phí phải nộp: <strong>${u.tuition ? u.tuition.tongHocPhi : "9,800,000 VNĐ"}</strong><br/>
                                    Số tiền đã thanh toán: <strong style="color: #2e7d32;">${u.tuition ? u.tuition.daDong : "9,800,000 VNĐ"}</strong>
                                </div>
                                <div class="col-md-6">
                                    Công nợ còn lại: <strong style="color: #c62828;">${u.tuition ? u.tuition.conNo : "0 VNĐ"}</strong><br/>
                                    Trạng thái: <span class="label label-success">${u.tuition ? u.tuition.trangThai : "Đã hoàn thành"}</span><br/>
                                    Mã số hóa đơn: <strong>${u.tuition ? u.tuition.soHoaDon : "HD-HVNH-8841"}</strong>
                                </div>
                            </div>
                            <div style="margin-top: 15px;">
                                <button type="button" class="btn btn-success" onclick="HVNH.showTuitionReceipt()">
                                    <i class="glyphicon glyphicon-print"></i> Xem biên lai điện tử
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;
    },

    switchPortalTab: function (tabId, btn) {
        document.querySelectorAll(".portal-tab-content").forEach(el => el.style.display = "none");
        document.querySelectorAll(".portal-tab-btn").forEach(el => el.classList.remove("active"));
        const target = document.getElementById(tabId);
        if (target) target.style.display = "block";
        if (btn) btn.classList.add("active");
    },

    saveRegistration: function () {
        this.showToast("Lưu kết quả đăng ký học phần thành công!", "success");
    },

    showTuitionReceipt: function () {
        const u = this.state.currentUser;
        const content = `
            <div style="border: 1px solid #ddd; padding: 25px; background: #fafafa;">
                <div style="text-align: center; border-bottom: 2px solid #056382; padding-bottom: 10px; margin-bottom: 15px;">
                    <h4 style="margin: 0; color: #056382; font-weight: bold;">HỌC VIỆN NGÂN HÀNG - PHÒNG TÀI CHÍNH KẾ TOÁN</h4>
                    <p style="margin: 3px 0 0 0; font-size: 13px;">BIÊN LAI THU HỌC PHÍ ĐIỆN TỬ</p>
                </div>
                <p>Sinh viên: <strong>${u.hoTen}</strong> (Mã SV: ${u.username})</p>
                <p>Lớp: <strong>${u.lop}</strong> | Học kỳ: <strong>Học kỳ 1 năm học 2026-2027</strong></p>
                <p>Số tiền đã nộp: <strong style="color: #2e7d32; font-size: 16px;">9,800,000 VNĐ</strong> (Chín triệu tám trăm nghìn đồng)</p>
                <p>Hình thức thanh toán: <strong>Chuyển khoản trực tuyến qua Ngân hàng số</strong></p>
                <p>Thời gian giao dịch: <strong>28/08/2026 09:42:15</strong></p>
                <p>Mã hóa đơn tra cứu: <strong>HD-HVNH-2026-8841</strong></p>
            </div>
        `;
        this.showModal("Biên lai thu học phí điện tử", content, `
            <button class="btn btn-default" onclick="window.print()"><i class="glyphicon glyphicon-print"></i> In biên lai</button>
            <button class="btn btn-primary" data-dismiss="modal">Đóng</button>
        `);
    },

    /* ==========================================================================
       7. GLOBAL MODAL & TOAST NOTIFICATIONS
       ========================================================================== */
    showModal: function (title, bodyHtml, footerButtons) {
        document.getElementById("h4Alert").innerHTML = title;
        document.getElementById("divContentAlert").innerHTML = bodyHtml;
        const footer = document.querySelector("#myAlert .modal-footer");
        if (footer && footerButtons) {
            footer.innerHTML = footerButtons;
        } else if (footer) {
            footer.innerHTML = `<button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>`;
        }
        $("#myAlert").modal("show");
    },

    showToast: function (msg, type = "info") {
        const colors = {
            success: "#2e7d32",
            danger: "#c62828",
            info: "#056382",
            warning: "#f57f17"
        };
        const toast = document.createElement("div");
        toast.className = "hvnh-alert";
        toast.style.backgroundColor = colors[type] || colors.info;
        toast.style.color = "#fff";
        toast.style.padding = "12px 18px";
        toast.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px;">
                <span>${msg}</span>
                <span style="cursor: pointer; font-size: 18px;" onclick="this.parentElement.parentElement.remove()">&times;</span>
            </div>
        `;
        document.body.appendChild(toast);
        setTimeout(() => {
            if (toast.parentElement) toast.remove();
        }, 3500);
    },

    downloadDummy: function (filename) {
        this.showToast(`Đang tải tệp: ${filename}`, "info");
    }
};

// Start application when DOM is ready
$(document).ready(function () {
    HVNH.init();
});
