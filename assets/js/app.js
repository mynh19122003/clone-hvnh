/**
 * Banking Academy of Vietnam (Học viện Ngân hàng) - Core Application Logic
 * Replicating https://online.hvnh.edu.vn/
 */

const HVNH = {
    state: {
        currentPage: "home",
        newsPage: 1,
        newsPerPage: 15,
        selectedCategory: "thong-bao-chung",
        searchKeyword: "",
        currentCaptcha: "",
        tkbMode: "lop", // 'lop', 'giangvien', 'phong', 'monhoc'
        currentUser: null,
        dvcCategory: "cong-tac-sv",
        dvcFilter: "all",
        dvcSearch: ""
    },

    init: function () {
        // Save initial public layout HTML from DOM before routing
        const bodyEl = document.getElementById("body");
        if (bodyEl) {
            this.publicLayoutHtml = bodyEl.innerHTML;
        }

        // Load user from URL query param or localStorage if exists
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams.get("user");
        if (userParam && HVNH_DATA && HVNH_DATA.students && HVNH_DATA.students[userParam]) {
            this.state.currentUser = HVNH_DATA.students[userParam];
            try {
                localStorage.setItem("hvnh_user", JSON.stringify(this.state.currentUser));
            } catch (err) {}
        } else {
            try {
                const savedUser = localStorage.getItem("hvnh_user");
                if (savedUser) {
                    this.state.currentUser = JSON.parse(savedUser);
                }
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

    ensurePublicLayout: function () {
        const bodyEl = document.getElementById("body");
        if (bodyEl && !document.getElementById("mainContent") && this.publicLayoutHtml) {
            bodyEl.innerHTML = this.publicLayoutHtml;
        }
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

        if (route !== "dich-vu-cong") {
            const h = document.getElementById("header");
            if (h) h.style.display = "block";
        }

        if (route !== "portal" && route !== "dich-vu-cong") {
            this.ensurePublicLayout();
        }

        this.setActiveNav(route);

        switch (route) {
            case "tra-cuu-van-bang":
            case "tra-cuu-tkb":
            case "tra-cuu-tuyen-sinh":
                window.location.hash = "#/";
                this.renderHome();
                break;
            case "login":
                this.renderLoginPage();
                break;
            case "dich-vu-cong":
                this.renderDichVuCong();
                break;
            case "portal":
                this.renderStudentPortal(param);
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

        // Close user dropdown when clicking outside
        document.addEventListener("click", (e) => {
            const li = document.getElementById("userDropdownLi");
            const toggleLink = document.getElementById("userMenuToggle");
            if (li && !li.contains(e.target)) {
                li.classList.remove("open");
                if (toggleLink) toggleLink.classList.remove("is-open");
            }
        });
    },

    /* ==========================================================================
       1. HOME PAGE & NEWS
       ========================================================================== */
    renderHome: function () {
        const catInfo = HVNH_DATA.categories.find(c => c.id === this.state.selectedCategory) || { name: "Thông báo chung" };
        
        const html = `
            <div class="divmain">
                <div class="bgtitle">${catInfo.name}</div>
                <div id="newsListContainer"></div>
                <div id="newsPaginationContainer"></div>
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
                <div style="padding: 30px; text-align: center; color: #888;">
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

        let itemsHtml = "<div>";
        pageItems.forEach(item => {
            const pinIcon = item.isPinned ? `<span class="glyphicon glyphicon-pushpin" style="color: #005580; margin-right: 5px; font-size: 13px;"></span>` : "";
            itemsHtml += `
                <div class="news-item-row">
                    <a href="#/tin-tuc/${item.id}" class="news-item-link">
                        ${pinIcon}${item.title}
                    </a>
                    <span class="news-item-date">ngày đăng ${item.date}</span>
                </div>
            `;
        });
        itemsHtml += "</div>";

        container.innerHTML = itemsHtml;

        // Render Pagination UI matching online.hvnh.edu.vn exactly
        let pagHtml = `<div style="font-weight: bold; padding: 10px; font-size: 13px; color: #333;">Trang `;
        for (let i = 1; i <= Math.min(10, totalPages); i++) {
            if (i === this.state.newsPage) {
                pagHtml += ` [${i}] `;
            } else {
                pagHtml += ` <a href="javascript:void(0)" onclick="HVNH.changeNewsPage(${i})" style="color: #337ab7; text-decoration: none; padding: 0 2px;">${i}</a> `;
            }
        }
        if (this.state.newsPage < totalPages) {
            pagHtml += ` <a href="javascript:void(0)" onclick="HVNH.changeNewsPage(${this.state.newsPage + 1})" style="color: #337ab7; text-decoration: none; margin-left: 5px;">Trang sau</a> `;
            pagHtml += ` <a href="javascript:void(0)" onclick="HVNH.changeNewsPage(${totalPages})" style="color: #337ab7; text-decoration: none; margin-left: 5px;">Trang cuối</a>`;
        }
        pagHtml += `</div>`;

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
            <div class="divmain" style="display: flex; justify-content: center; align-items: center; padding: 40px 15px; background: #f2f4f7; min-height: 520px;">
                <div class="login-card" id="inAppLoginCard" style="max-width: 380px; width: 100%; background: #ffffff; padding: 36px 32px 30px; border-radius: 6px; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.05); text-align: center; position: relative; overflow: hidden;">
                    <!-- Top Animated Progress Bar -->
                    <div class="card-loader" id="inAppCardLoader">
                        <div class="card-loader-bar" id="inAppCardLoaderBar"></div>
                    </div>

                    <!-- Shield Logo replicating regist.hvnh.edu.vn/Login -->
                    <div class="logo-box" style="display: flex; justify-content: center; margin-bottom: 14px;">
                        <svg width="74" height="88" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 4 L93 20 C93 78 50 114 50 116 C50 114 7 78 7 20 Z" fill="#002d4f" stroke="#002d4f" stroke-width="1.5"/>
                            <path d="M50 8 L89 23 C89 74 50 108 50 111 C50 108 11 74 11 23 Z" fill="none" stroke="#ffffff" stroke-width="1.8"/>
                            <text x="50" y="44" font-family="'Arial Black', Arial, sans-serif" font-size="21" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="1.2">BAV</text>
                            <g transform="translate(26, 49)">
                                <path d="M24 16 C16 13 4 14 0 17 L0 31 C6 28 16 27 24 30 Z" fill="#ffffff"/>
                                <path d="M24 16 C32 13 44 14 48 17 L48 31 C42 28 32 27 24 30 Z" fill="#ffffff"/>
                                <line x1="24" y1="16" x2="24" y2="30" stroke="#002d4f" stroke-width="2"/>
                                <path d="M24 4 L26 10 L32 12 L26 14 L24 20 L22 14 L16 12 L22 10 Z" fill="#ffc107"/>
                                <rect x="36" y="19" width="7" height="2" fill="#ffc107" rx="1"/>
                                <rect x="36" y="23" width="5" height="2" fill="#ffc107" rx="1"/>
                            </g>
                            <text x="50" y="100" font-family="'Arial', sans-serif" font-size="12" font-weight="bold" fill="#ffc107" text-anchor="middle" letter-spacing="1.5">1961</text>
                        </svg>
                    </div>

                    <div style="font-size: 15px; font-weight: 500; color: #2b3648; margin-bottom: 12px; letter-spacing: 0.2px;">Đăng ký học phần</div>
                    <div style="position: relative; margin: 0 0 20px 0; border-top: 1px solid #e5e7eb;">
                        <span style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #ffffff; padding: 0 6px; color: #9ca3af; font-size: 13px;">*</span>
                    </div>

                    <div id="loginAlertBox" style="display: none; margin-bottom: 14px; padding: 9px 12px; border-radius: 4px; font-size: 13px; text-align: left;"></div>

                    <form onsubmit="HVNH.submitLogin(event)">
                        <div style="margin-bottom: 14px; text-align: left;">
                            <input type="text" class="form-control" id="txtUsername" placeholder="Tên đăng nhập" required autocomplete="username" style="height: 38px; font-size: 13.5px; border-radius: 4px;">
                        </div>
                        <div style="margin-bottom: 18px; text-align: left;">
                            <input type="password" class="form-control" id="txtPassword" placeholder="Mật khẩu" required autocomplete="current-password" style="height: 38px; font-size: 13.5px; border-radius: 4px;">
                        </div>
                        <button type="submit" class="btn-login" id="inAppBtnLogin">
                            <span id="inAppBtnContent">Đăng nhập</span>
                        </button>
                    </form>

                    <div style="margin-top: 22px; padding-top: 14px; border-top: 1px dashed #e5e7eb; font-size: 12px; color: #6b7280;">
                        <div>Tài khoản test: <strong>008307000568</strong> | Mật khẩu: <strong>12351235</strong></div>
                        <button type="button" class="btn btn-xs btn-default" onclick="HVNH.fillTestAccount()" style="margin-top: 6px; color: #0284c7; font-weight: 600; border-radius: 3px;">
                            ⚡ Điền tài khoản test
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.getElementById("mainContent").innerHTML = html;

        // Attach ripple listener
        const btn = document.getElementById("inAppBtnLogin");
        if (btn) {
            btn.addEventListener("click", function (e) {
                if (btn.disabled) return;
                const rect = btn.getBoundingClientRect();
                const ripple = document.createElement("span");
                ripple.className = "ripple-circle";
                const size = Math.max(rect.width, rect.height);
                ripple.style.width = ripple.style.height = size + "px";
                ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
                ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
                btn.appendChild(ripple);
                setTimeout(() => ripple.remove(), 550);
            });
        }
    },

    fillTestAccount: function () {
        const u = document.getElementById("txtUsername");
        const p = document.getElementById("txtPassword");
        if (u) u.value = "008307000568";
        if (p) p.value = "12351235";
        const alertBox = document.getElementById("loginAlertBox");
        if (alertBox) alertBox.style.display = "none";
    },

    submitLogin: function (e) {
        if (e) e.preventDefault();
        const uInput = document.getElementById("txtUsername");
        const pInput = document.getElementById("txtPassword");
        const username = (uInput.value || "").trim();
        const password = (pInput.value || "").trim();
        const alertBox = document.getElementById("loginAlertBox");
        const btn = document.getElementById("inAppBtnLogin");
        const card = document.getElementById("inAppLoginCard");
        const loader = document.getElementById("inAppCardLoader");
        const loaderBar = document.getElementById("inAppCardLoaderBar");

        if (alertBox) alertBox.style.display = "none";
        if (card) card.classList.remove("shake");

        if (!username || !password) {
            if (card) card.classList.add("shake");
            if (alertBox) {
                alertBox.style.display = "block";
                alertBox.className = "alert alert-danger";
                alertBox.innerHTML = "Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu!";
            }
            setTimeout(() => { if (card) card.classList.remove("shake"); }, 500);
            return;
        }

        // Button loading state with spinner
        if (btn) {
            btn.disabled = true;
            btn.classList.add("is-loading");
            btn.innerHTML = `<span class="btn-spinner"></span> <span>Đang đăng nhập...</span>`;
        }

        // Card loader active
        if (loader) loader.classList.add("active", "indeterminate");

        // Realistic verification delay
        setTimeout(() => {
            const student = HVNH_DATA.students[username];
            if (!student || student.password !== password) {
                if (loader) loader.classList.remove("indeterminate", "active");
                if (loaderBar) loaderBar.style.width = "0%";

                if (btn) {
                    btn.classList.remove("is-loading");
                    btn.classList.add("is-error");
                    btn.innerHTML = `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
                        <span>Sai thông tin!</span>
                    `;
                }

                if (card) card.classList.add("shake");
                if (alertBox) {
                    alertBox.style.display = "block";
                    alertBox.className = "alert alert-danger";
                    alertBox.innerHTML = "Tên đăng nhập hoặc mật khẩu không chính xác!";
                }

                setTimeout(() => {
                    if (btn) {
                        btn.classList.remove("is-error");
                        btn.disabled = false;
                        btn.innerHTML = `<span>Đăng nhập</span>`;
                    }
                    if (card) card.classList.remove("shake");
                    if (pInput) pInput.focus();
                }, 900);
                return;
            }

            // Success state!
            if (loader) loader.classList.remove("indeterminate");
            if (loaderBar) loaderBar.style.width = "100%";

            if (btn) {
                btn.classList.remove("is-loading");
                btn.classList.add("is-success");
                btn.innerHTML = `
                    <svg class="btn-checkmark" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
                    <span>Đăng nhập thành công!</span>
                `;
            }

            // Login success
            this.state.currentUser = student;
            try {
                localStorage.setItem("hvnh_user", JSON.stringify(student));
            } catch (err) {}
            this.updateAuthUI();

            setTimeout(() => {
                if (card) card.classList.add("card-exit");
                setTimeout(() => {
                    window.location.hash = "#/";
                }, 350);
            }, 500);
        }, 700);
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
            const u = this.state.currentUser;
            container.innerHTML = `
                <li class="dropdown stylecolor user-nav-item" id="userDropdownLi">
                    <a href="javascript:void(0)" class="dropdown-toggle user-nav-link" id="userMenuToggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" onclick="HVNH.toggleUserDropdown(event)">
                        <span class="user-display-name">${u.username} | ${u.hoTen}</span>
                    </a>
                    <ul class="dropdown-menu stylecolor user-nav-dropdown" id="userNavDropdownMenu">
                        <li><a href="javascript:void(0)" onclick="HVNH.goToPortal('info')">Thông tin</a></li>
                        <li><a href="javascript:void(0)" onclick="HVNH.showChangePasswordModal()">Đổi mật khẩu</a></li>
                        <li role="separator" class="divider user-nav-divider"></li>
                        <li><a href="javascript:void(0)" onclick="HVNH.logout()">Thoát</a></li>
                    </ul>
                </li>
            `;
        } else {
            container.innerHTML = `
                <li class="dropdown stylecolor" style="padding: 10px 10px 0px 0px">
                    <span><a href="login.html">Đăng nhập</a></span>
                    <ul class="dropdown-menu stylecolor">
                        <div class="divider"></div>
                    </ul>
                </li>
            `;
        }
    },

    toggleUserDropdown: function (e) {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        const li = document.getElementById("userDropdownLi");
        const toggleLink = document.getElementById("userMenuToggle");
        if (!li) return;

        const isOpen = li.classList.contains("open");
        if (isOpen) {
            li.classList.remove("open");
            if (toggleLink) toggleLink.classList.remove("is-open");
        } else {
            li.classList.add("open");
            if (toggleLink) toggleLink.classList.add("is-open");
        }
    },

    goToPortal: function (tab = "info") {
        const li = document.getElementById("userDropdownLi");
        const toggleLink = document.getElementById("userMenuToggle");
        if (li) li.classList.remove("open");
        if (toggleLink) toggleLink.classList.remove("is-open");

        if (window.location.hash.startsWith("#/portal")) {
            this.switchPortalSection(tab);
        } else {
            window.location.hash = "#/portal";
            setTimeout(() => {
                this.switchPortalSection(tab);
            }, 100);
        }
    },

    showChangePasswordModal: function () {
        const li = document.getElementById("userDropdownLi");
        const toggleLink = document.getElementById("userMenuToggle");
        if (li) li.classList.remove("open");
        if (toggleLink) toggleLink.classList.remove("is-open");

        const modalEl = document.getElementById("myAlert");
        const titleEl = document.getElementById("h4Alert");
        const contentEl = document.getElementById("divContentAlert");
        if (!modalEl || !titleEl || !contentEl) return;

        titleEl.innerText = "Đổi mật khẩu";
        contentEl.innerHTML = `
            <div style="padding: 10px 15px;">
                <div class="form-group">
                    <label style="font-weight: bold; font-size: 13px;">Mật khẩu hiện tại:</label>
                    <input type="password" id="txtOldPassword" class="form-control" placeholder="Nhập mật khẩu hiện tại" style="height: 34px;">
                </div>
                <div class="form-group">
                    <label style="font-weight: bold; font-size: 13px;">Mật khẩu mới:</label>
                    <input type="password" id="txtNewPassword" class="form-control" placeholder="Nhập mật khẩu mới" style="height: 34px;">
                </div>
                <div class="form-group">
                    <label style="font-weight: bold; font-size: 13px;">Xác nhận mật khẩu mới:</label>
                    <input type="password" id="txtConfirmPassword" class="form-control" placeholder="Nhập lại mật khẩu mới" style="height: 34px;">
                </div>
                <div id="pwdChangeMsg" style="margin-top: 10px;"></div>
                <div style="text-align: right; margin-top: 15px;">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
                    <button type="button" class="btn btn-primary" style="background-color: #056382; border-color: #044b62;" onclick="HVNH.doChangePassword()">Đổi mật khẩu</button>
                </div>
            </div>
        `;
        $(modalEl).modal("show");
    },

    doChangePassword: function () {
        const oldP = (document.getElementById("txtOldPassword")?.value || "").trim();
        const newP = (document.getElementById("txtNewPassword")?.value || "").trim();
        const confP = (document.getElementById("txtConfirmPassword")?.value || "").trim();
        const msgEl = document.getElementById("pwdChangeMsg");

        if (!oldP || !newP || !confP) {
            if (msgEl) msgEl.innerHTML = '<span style="color: red; font-size: 13px;">Vui lòng nhập đầy đủ các trường thông tin!</span>';
            return;
        }

        if (this.state.currentUser && this.state.currentUser.password && oldP !== this.state.currentUser.password) {
            if (msgEl) msgEl.innerHTML = '<span style="color: red; font-size: 13px;">Mật khẩu hiện tại không chính xác!</span>';
            return;
        }

        if (newP !== confP) {
            if (msgEl) msgEl.innerHTML = '<span style="color: red; font-size: 13px;">Mật khẩu xác nhận không khớp!</span>';
            return;
        }

        if (newP.length < 6) {
            if (msgEl) msgEl.innerHTML = '<span style="color: red; font-size: 13px;">Mật khẩu mới phải có ít nhất 6 ký tự!</span>';
            return;
        }

        if (this.state.currentUser) {
            this.state.currentUser.password = newP;
            try {
                localStorage.setItem("hvnh_user", JSON.stringify(this.state.currentUser));
            } catch (err) {}
        }

        if (msgEl) {
            msgEl.innerHTML = '<span style="color: green; font-weight: bold; font-size: 13px;">Đổi mật khẩu thành công!</span>';
        }

        setTimeout(() => {
            $("#myAlert").modal("hide");
            this.showToast("Mật khẩu đã được cập nhật thành công.", "success");
        }, 1000);
    },

    /* ==========================================================================
       6. AUTHENTIC STUDENT PORTAL DASHBOARD (online.hvnh.edu.vn)
       ========================================================================== */
    renderStudentPortal: function (subTab = "info") {
        if (!this.state.currentUser) {
            window.location.hash = "#/login";
            return;
        }

        const bodyEl = document.getElementById("body");
        if (!bodyEl) return;

        // Render authentic 2-column portal shell
        bodyEl.innerHTML = `
            <div class="portal-wrapper">
                <!-- Left Sidebar: Chức năng -->
                <div class="portal-sidebar">
                    <div class="portal-sidebar-title">
                        <i class="glyphicon glyphicon-th"></i> Chức năng
                    </div>

                    <!-- 1. Trang cá nhân -->
                    <div class="portal-sidebar-group">
                        <div class="portal-sidebar-group-header">
                            <span class="tree-chevron"><i class="glyphicon glyphicon-chevron-right"></i></span> Trang cá nhân
                        </div>
                        <ul class="portal-sidebar-nav">
                            <li><a href="javascript:void(0)" id="pnav-info" onclick="HVNH.switchPortalSection('info')">Thông tin cá nhân</a></li>
                            <li><a href="javascript:void(0)" id="pnav-thong-bao" onclick="HVNH.switchPortalSection('thong-bao')">Thông báo</a></li>
                            <li><a href="javascript:void(0)" id="pnav-huong-dan" onclick="HVNH.switchPortalSection('huong-dan')">Hướng dẫn sử dụng</a></li>
                        </ul>
                    </div>

                    <!-- 2. Tra cứu thông tin -->
                    <div class="portal-sidebar-group">
                        <div class="portal-sidebar-group-header">
                            <span class="tree-chevron"><i class="glyphicon glyphicon-chevron-right"></i></span> Tra cứu thông tin
                        </div>
                        <ul class="portal-sidebar-nav">
                            <li><a href="javascript:void(0)" id="pnav-study-programs" onclick="HVNH.switchPortalSection('study-programs')">Chương trình đào tạo</a></li>
                            <li><a href="javascript:void(0)" id="pnav-lich-hoc" onclick="HVNH.switchPortalSection('lich-hoc')">Lịch học</a></li>
                            <li><a href="javascript:void(0)" id="pnav-lich-thi" onclick="HVNH.switchPortalSection('lich-thi')">Lịch thi</a></li>
                            <li><a href="javascript:void(0)" id="pnav-quyet-dinh" onclick="HVNH.switchPortalSection('quyet-dinh')">Quyết định sinh viên</a></li>
                            <li><a href="javascript:void(0)" id="pnav-diem-danh" onclick="HVNH.switchPortalSection('diem-danh')">Chuyên cần</a></li>
                            <li><a href="javascript:void(0)" id="pnav-ren-luyen" onclick="HVNH.switchPortalSection('ren-luyen')">Kết quả rèn luyện</a></li>
                            <li><a href="javascript:void(0)" id="pnav-marks" onclick="HVNH.switchPortalSection('marks')">Kết quả học tập</a></li>
                            <li><a href="javascript:void(0)" id="pnav-tai-chinh" onclick="HVNH.switchPortalSection('tai-chinh')">Tài chính sinh viên</a></li>
                            <li><a href="javascript:void(0)" id="pnav-hoa-don" onclick="HVNH.switchPortalSection('hoa-don')">Chi tiết hóa đơn</a></li>
                            <li><a href="javascript:void(0)" id="pnav-ket-qua-dang-ky" onclick="HVNH.switchPortalSection('ket-qua-dang-ky')">Xem kết quả đăng ký học phần</a></li>
                            <li><a href="javascript:void(0)" id="pnav-chung-chi" onclick="HVNH.switchPortalSection('chung-chi')">Chứng chỉ</a></li>
                        </ul>
                    </div>

                    <!-- 3. Chức năng trực tuyến -->
                    <div class="portal-sidebar-group">
                        <div class="portal-sidebar-group-header">
                            <span class="tree-chevron"><i class="glyphicon glyphicon-chevron-right"></i></span> Chức năng trực tuyến
                        </div>
                        <ul class="portal-sidebar-nav">
                            <li><a href="javascript:void(0)" id="pnav-dang-ky-hoc-phan" onclick="HVNH.switchPortalSection('dang-ky-hoc-phan')">Đăng ký học phần</a></li>
                            <li><a href="javascript:void(0)" id="pnav-lien-he" onclick="HVNH.switchPortalSection('lien-he')">Liên hệ - góp ý</a></li>
                            <li><a href="javascript:void(0)" id="pnav-xet-tot-nghiep" onclick="HVNH.switchPortalSection('xet-tot-nghiep')">Xét tốt nghiệp</a></li>
                            <li><a href="javascript:void(0)" id="pnav-nop-chung-chi" onclick="HVNH.switchPortalSection('nop-chung-chi')">Nộp chứng chỉ</a></li>
                            <li><a href="javascript:void(0)" id="pnav-dang-ky-phuc-khao" onclick="HVNH.switchPortalSection('dang-ky-phuc-khao')">Đăng ký phúc khảo</a></li>
                            <li><a href="javascript:void(0)" id="pnav-dang-ky-vang-thi" onclick="HVNH.switchPortalSection('dang-ky-vang-thi')">Đăng ký vắng thi</a></li>
                            <li><a href="javascript:void(0)" id="pnav-dang-ky-le-phi" onclick="HVNH.switchPortalSection('dang-ky-le-phi')">Đăng ký lệ phí, BHYT</a></li>
                        </ul>
                    </div>
                </div>

                <!-- Right Main Panel -->
                <div class="portal-main-panel" id="portalMainPanel">
                    <div class="portal-header-bar" id="portalHeaderTitle">Thông tin sinh viên</div>
                    <div class="portal-body-inner" id="portalBodyContent"></div>
                </div>
            </div>
        `;

        this.switchPortalSection(subTab || "info");
    },

    switchPortalSection: function (tabId) {
        document.querySelectorAll(".portal-sidebar-nav a").forEach(a => a.classList.remove("active"));
        const link = document.getElementById(`pnav-${tabId}`);
        if (link) link.classList.add("active");

        const u = this.state.currentUser;
        if (!u) return;

        const headerTitle = document.getElementById("portalHeaderTitle");
        const bodyContent = document.getElementById("portalBodyContent");
        if (!headerTitle || !bodyContent) return;

        switch (tabId) {
            case "info":
                headerTitle.innerText = "Thông tin sinh viên";
                bodyContent.innerHTML = this.renderPortalInfo(u);
                break;
            case "thong-bao":
                headerTitle.innerText = "Thông báo";
                bodyContent.innerHTML = this.renderPortalThongBao(u);
                break;
            case "study-programs":
                headerTitle.innerText = "Chương trình đào tạo";
                bodyContent.innerHTML = this.renderPortalStudyPrograms(u);
                break;
            case "diem-danh":
                headerTitle.innerText = "Chuyên cần";
                bodyContent.innerHTML = this.renderPortalDiemDanh(u);
                break;
            case "ren-luyen":
                headerTitle.innerText = "Kết quả rèn luyện";
                bodyContent.innerHTML = this.renderPortalRenLuyen(u);
                break;
            case "marks":
                headerTitle.innerText = "Kết quả học tập";
                bodyContent.innerHTML = this.renderPortalMarks(u);
                break;
            case "tai-chinh":
                headerTitle.innerText = "Tài chính sinh viên";
                bodyContent.innerHTML = this.renderPortalTaiChinh(u);
                break;
            case "hoa-don":
                headerTitle.innerText = "Chi tiết hóa đơn";
                bodyContent.innerHTML = this.renderPortalHoaDon(u);
                break;
            case "ket-qua-dang-ky":
                headerTitle.innerText = "Xem kết quả đăng ký học phần";
                bodyContent.innerHTML = this.renderPortalKetQuaDangKy(u);
                break;
            case "chung-chi":
                headerTitle.innerText = "Chứng chỉ";
                bodyContent.innerHTML = this.renderPortalChungChi(u);
                break;
            case "nop-chung-chi":
                headerTitle.innerText = "Nộp chứng chỉ";
                bodyContent.innerHTML = this.renderPortalNopChungChi(u);
                break;
            case "xet-tot-nghiep":
                headerTitle.innerText = "Xét tốt nghiệp";
                bodyContent.innerHTML = this.renderPortalXetTotNghiep(u);
                break;
            case "dang-ky-phuc-khao":
                headerTitle.innerText = "Đăng ký phúc khảo";
                bodyContent.innerHTML = this.renderPortalPhucKhao(u);
                break;
            case "dang-ky-vang-thi":
                headerTitle.innerText = "Đăng ký vắng thi";
                bodyContent.innerHTML = this.renderPortalVangThi(u);
                break;
            case "lich-hoc":
                headerTitle.innerText = "Lịch học";
                bodyContent.innerHTML = this.renderPortalLichHoc(u);
                break;
            case "lich-thi":
                headerTitle.innerText = "Lịch thi";
                bodyContent.innerHTML = this.renderPortalLichThi(u);
                break;
            case "quyet-dinh":
                headerTitle.innerText = "Quyết định sinh viên";
                bodyContent.innerHTML = this.renderPortalQuyetDinh(u);
                break;
            case "dang-ky-hoc-phan":
                headerTitle.innerText = "Đăng ký học phần";
                bodyContent.innerHTML = this.renderPortalDangKyHocPhan(u);
                break;
            case "lien-he":
                headerTitle.innerText = "Liên hệ - góp ý";
                bodyContent.innerHTML = this.renderPortalLienHe(u);
                break;
            case "bao-hiem-y-te":
                this.switchPortalSection("dang-ky-le-phi");
                return;
            case "dang-ky-le-phi":
                headerTitle.innerText = "Đăng ký lệ phí, BHYT";
                bodyContent.innerHTML = this.renderPortalLePhi(u);
                break;
            case "huong-dan":
                headerTitle.innerText = "Hướng dẫn sử dụng";
                bodyContent.innerHTML = this.renderPortalHuongDan(u);
                break;
            default:
                headerTitle.innerText = "Thông tin sinh viên";
                bodyContent.innerHTML = this.renderPortalInfo(u);
                break;
        }

        window.scrollTo({ top: 180, behavior: 'smooth' });
    },

    /* ==========================================================================
       PORTAL SUB-VIEW RENDERERS
       ========================================================================== */
    // 1. Thông tin cá nhân (Photo 1)
    renderPortalInfo: function (u) {
        const gd = u.thongTinGiaDinh || {};
        const thpt = u.thongTinTHPT || {};

        return `
            <div class="student-info-grid">
                <!-- Col 1: Avatar & Personal Info -->
                <div class="student-col" style="display: flex; gap: 15px;">
                    <div class="student-col-avatar">
                        <img src="${u.avatar || 'assets/logo/logo.png'}" class="student-avatar-img" alt="Avatar">
                    </div>
                    <div style="flex: 1;">
                        <table class="student-info-table">
                            <tr><td class="label-td">Mã SV:</td><td class="val-td">${u.username}</td></tr>
                            <tr><td class="label-td">Họ tên:</td><td class="val-td">${u.hoTen}</td></tr>
                            <tr><td class="label-td">Giới tính:</td><td class="val-td">${u.gioiTinh || "Nữ"}</td></tr>
                            <tr><td class="label-td">Ngày sinh:</td><td class="val-td">${u.ngaySinh || "12/04/2007"}</td></tr>
                            <tr><td class="label-td">Nơi sinh:</td><td class="val-td">${u.noiSinh || "Hà Nội"}</td></tr>
                            <tr><td class="label-td">CMND/CCCD:</td><td class="val-td">${u.cmnd || u.username}</td></tr>
                            <tr><td class="label-td">Tình trạng học:</td><td class="val-td" style="color: #2e7d32;">${u.tinhTrang || "Còn học"}</td></tr>
                            <tr><td class="label-td">Email cá nhân:</td><td class="val-td">${u.emailCaNhan || u.email}</td></tr>
                            <tr><td class="label-td">Địa chỉ liên lạc SV:</td><td class="val-td">${u.diaChi || "Hà Nội"}</td></tr>
                        </table>
                    </div>
                </div>

                <!-- Col 2: Academic Info -->
                <div class="student-col">
                    <div class="section-sub-title">Thông tin khóa học</div>
                    <table class="student-info-table">
                        <tr><td class="label-td">Niên khóa:</td><td class="val-td">${u.nienKhoa || "2025 - 2029"}</td></tr>
                        <tr><td class="label-td">Khóa học:</td><td class="val-td">${u.khoaHoc || "K28 (2025 - 2029)"}</td></tr>
                        <tr><td class="label-td">Chức vụ:</td><td class="val-td">${u.chucVu || "Sinh viên"}</td></tr>
                        <tr><td class="label-td">Đối tượng:</td><td class="val-td">${u.doiTuong || "Đại học chính quy"}</td></tr>
                        <tr><td class="label-td">THPT lớp 12:</td><td class="val-td">${u.lop12 || "THPT Chuyên Chu Văn An"}</td></tr>
                        <tr><td class="label-td">Đoàn:</td><td class="val-td">${u.doan || "Đã vào đoàn"}</td></tr>
                        <tr><td class="label-td">Ngày vào đoàn:</td><td class="val-td">${u.ngayVaoDoan || "26/03/2023"}</td></tr>
                        <tr><td class="label-td">Đảng:</td><td class="val-td">${u.dang || "Chưa"}</td></tr>
                        <tr><td class="label-td">Ngày vào đảng:</td><td class="val-td">${u.ngayVaoDang || ""}</td></tr>
                        <tr><td class="label-td">Loại hình đào tạo:</td><td class="val-td">${u.loaiHinhDaoTao || "Đại học chính quy CLC"}</td></tr>
                        <tr><td class="label-td">Cố vấn học tập:</td><td class="val-td">${u.coVanHocTap || "TS. Phạm Thị Minh Nguyệt"}</td></tr>
                        <tr><td class="label-td">Liên hệ CVHT:</td><td class="val-td">${u.lienHeCVHT || "nguyetptm@hvnh.edu.vn"}</td></tr>
                        <tr><td class="label-td">Lớp sinh viên:</td><td class="val-td" style="color: #004b63;">${u.lop || "CLC - Hoạch định và Tư vấn tài chính 01"}</td></tr>
                    </table>
                </div>

                <!-- Col 3: Contact Info -->
                <div class="student-col">
                    <div class="section-sub-title">Thông tin liên lạc</div>
                    <table class="student-info-table">
                        <tr><td class="label-td">Dân tộc:</td><td class="val-td">${u.danToc || "Kinh"}</td></tr>
                        <tr><td class="label-td">Tôn giáo:</td><td class="val-td">${u.tonGiao || "Không"}</td></tr>
                        <tr><td class="label-td">Quốc gia:</td><td class="val-td">${u.quocGia || "Việt Nam"}</td></tr>
                        <tr><td class="label-td">Tỉnh thành:</td><td class="val-td">${u.tinhThanh || "TP. Hà Nội"}</td></tr>
                        <tr><td class="label-td">Quận huyện:</td><td class="val-td">${u.quanHuyen || "Quận Cầu Giấy"}</td></tr>
                        <tr><td class="label-td">Di động:</td><td class="val-td">${u.diDong || "0968 554 219"}</td></tr>
                        <tr><td class="label-td">ĐT bàn:</td><td class="val-td">${u.dtBan || ""}</td></tr>
                    </table>
                    <div class="portal-action-btn-group">
                        <a href="javascript:void(0)" class="portal-action-btn" onclick="HVNH.capNhatThongTin()">[Cập nhật thông tin cá nhân]</a>
                        <a href="javascript:void(0)" class="portal-action-btn" onclick="HVNH.capNhatNganHang()">[Cập nhật thông tin ngân hàng]</a>
                    </div>
                </div>
            </div>

            <!-- Family Information Section -->
            <div class="section-sub-title">Thông tin gia đình</div>
            <div class="row" style="font-size: 13px; line-height: 2; margin-bottom: 20px;">
                <div class="col-md-6">
                    <div>Họ tên Cha: <strong>${gd.hoTenCha || "Huỳnh Quốc Thái"}</strong></div>
                    <div>Họ tên Mẹ: <strong>${gd.hoTenMe || "Nguyễn Thị Thu Hương"}</strong></div>
                    <div>Khi cần báo tin cho: <strong>${gd.khiCanBaoTin || "Huỳnh Quốc Thái (Bố)"}</strong></div>
                    <div>Địa chỉ báo tin: <strong>${gd.diaChiBaoTin || "Số 36 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội"}</strong></div>
                </div>
                <div class="col-md-6">
                    <div>Điện thoại Cha: <strong>${gd.sdtCha || "0912 345 678"}</strong></div>
                    <div>Điện thoại Mẹ: <strong>${gd.sdtMe || "0983 654 321"}</strong></div>
                    <div>Điện thoại báo tin: <strong>${gd.sdtBaoTin || "0912 345 678"}</strong></div>
                </div>
            </div>

            <!-- High School Graduation Info -->
            <div class="section-sub-title">Thông tin bằng tốt nghiệp THPT</div>
            <div class="row" style="font-size: 13px; line-height: 2;">
                <div class="col-md-4">
                    <div>Số hiệu bằng: <strong>${thpt.soHieuBang || "B2025-081293"}</strong></div>
                </div>
                <div class="col-md-4">
                    <div>Số vào sổ cấp bằng: <strong>${thpt.soVaoSo || "1284/THPT"}</strong></div>
                </div>
                <div class="col-md-4">
                    <div>Nơi cấp: <strong>${thpt.noiCap || "Sở GD&ĐT Hà Nội"}</strong></div>
                </div>
            </div>
        `;
    },

    // 2. Thông báo (Photo 2)
    renderPortalThongBao: function (u) {
        const list = u.thongBao || [
            { id: 1, tieuDe: "Hóa đơn điện tử ngày : 2026-03-20 20:30:05", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "20/03/2026" },
            { id: 2, tieuDe: "Hóa đơn điện tử ngày : 2026-02-09 16:00:03", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "09/02/2026" },
            { id: 3, tieuDe: "Hóa đơn điện tử ngày : 2026-01-06 00:15:32", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "06/01/2026" },
            { id: 4, tieuDe: "Hóa đơn điện tử ngày : 2025-10-02 12:04:45", nguoiGui: "Phòng Tài chính - Kế toán", thoiGian: "02/10/2025" }
        ];

        let rows = "";
        list.forEach((item, idx) => {
            rows += `
                <tr>
                    <td style="text-align: center; width: 45px;">${idx + 1}</td>
                    <td>
                        <a href="javascript:void(0)" onclick="HVNH.xemChiTietHoaDon('${idx}')" style="color: #004b63; font-weight: 500;">
                            <i class="glyphicon glyphicon-file" style="margin-right: 5px; color: #e09d37;"></i> ${item.tieuDe}
                        </a>
                    </td>
                    <td style="width: 220px;">${item.nguoiGui}</td>
                    <td style="width: 130px; text-align: center;">${item.thoiGian}</td>
                </tr>
            `;
        });

        return `
            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px;">STT</th>
                            <th>Tiêu đề</th>
                            <th style="width: 220px;">Người gửi</th>
                            <th style="width: 130px;">Thời gian gửi</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    // 3. Chương trình đào tạo (Photos 3-8)
    renderPortalStudyPrograms: function (u) {
        const programs = u.studyPrograms || [];
        if (programs.length === 0) {
            return `<div class="alert alert-info">Chưa có dữ liệu chương trình đào tạo.</div>`;
        }

        let html = `
            <div style="background: #f4f8fa; padding: 10px 14px; border-left: 4px solid #004b63; margin-bottom: 15px; font-size: 13px;">
                <strong>Ngành:</strong> Tài chính - Ngân hàng | <strong>Khóa học:</strong> ${u.khoaHoc || "K28 (2025 - 2029)"} | <strong>Chuyên ngành:</strong> ${u.chuongTrinhDaoTao || "CLC-Hoạch định và Tư vấn tài chính"}
            </div>
        `;

        programs.forEach(block => {
            let courseRows = "";
            (block.courses || []).forEach(c => {
                const statusBadge = c.pass 
                    ? `<span style="color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</span>`
                    : `<span style="color: #888;">Chưa học</span>`;
                courseRows += `
                    <tr>
                        <td style="text-align: center;">${c.tt}</td>
                        <td style="text-align: center; font-weight: bold; color: #004b63;">${c.maHP}</td>
                        <td>${c.tenHP}</td>
                        <td style="text-align: center;">${c.soTC}</td>
                        <td style="text-align: center;">${c.soTiet || ""}</td>
                        <td style="text-align: center;">${c.tienQuyet || ""}</td>
                        <td style="text-align: center;">${c.hocTruoc || ""}</td>
                        <td style="text-align: center;">${c.tuongDuong || ""}</td>
                        <td>${c.khoa || ""}</td>
                        <td style="text-align: center;">${statusBadge}</td>
                    </tr>
                `;
            });

            html += `
                <div style="font-weight: bold; font-size: 13.5px; color: #004b63; margin: 15px 0 6px 0; display: flex; align-items: center; gap: 6px;">
                    <i class="glyphicon glyphicon-folder-open"></i> ${block.semester}
                </div>
                <div class="table-responsive">
                    <table class="portal-table-hvnh">
                        <thead>
                            <tr>
                                <th style="width: 40px;">TT</th>
                                <th style="width: 80px;">Mã HP</th>
                                <th>Tên học phần</th>
                                <th style="width: 45px;">STC</th>
                                <th style="width: 55px;">Số tiết</th>
                                <th style="width: 70px;">Tiên quyết</th>
                                <th style="width: 70px;">Học trước</th>
                                <th style="width: 75px;">Tương đương</th>
                                <th style="width: 200px;">Khoa/Bộ môn</th>
                                <th style="width: 75px;">Tình trạng</th>
                            </tr>
                        </thead>
                        <tbody>${courseRows}</tbody>
                    </table>
                </div>
            `;
        });

        return html;
    },

    // 4. Chuyên cần (Photos 9-10)
    renderPortalDiemDanh: function (u) {
        return `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                <div style="font-weight: bold; color: #004b63; font-size: 13.5px;">
                    <i class="glyphicon glyphicon-calendar"></i> BẢNG THEO DÕI CHUYÊN CẦN - HỌC KỲ 1 NĂM HỌC 2026 - 2027
                </div>
                <div>
                    <span class="label label-success" style="font-size: 12px; padding: 4px 8px;">Tỷ lệ chuyên cần toàn khóa: 100%</span>
                </div>
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px;">STT</th>
                            <th style="width: 110px;">Mã LHP</th>
                            <th>Tên học phần</th>
                            <th style="width: 50px;">Số TC</th>
                            <th style="width: 80px;">Vắng có phép</th>
                            <th style="width: 85px;">Vắng K.phép</th>
                            <th style="width: 75px;">Tổng vắng</th>
                            <th style="width: 85px;">Chuyên cần</th>
                            <th style="width: 100px;">Đủ ĐK thi</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td style="text-align: center;">1</td><td style="text-align: center; font-weight: bold;">261FIN22H04</td><td>Tài chính - Tiền tệ</td><td style="text-align: center;">3.0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #2e7d32;">100%</td><td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</td></tr>
                        <tr><td style="text-align: center;">2</td><td style="text-align: center; font-weight: bold;">261LAW02H03</td><td>Luật kinh tế</td><td style="text-align: center;">3.0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #2e7d32;">100%</td><td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</td></tr>
                        <tr><td style="text-align: center;">3</td><td style="text-align: center; font-weight: bold;">261MAT16H01</td><td>Phân tích định lượng trong kinh tế</td><td style="text-align: center;">3.0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #2e7d32;">100%</td><td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</td></tr>
                        <tr><td style="text-align: center;">4</td><td style="text-align: center; font-weight: bold;">261FIN01H04</td><td>Tài chính doanh nghiệp I</td><td style="text-align: center;">3.0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #2e7d32;">100%</td><td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</td></tr>
                        <tr><td style="text-align: center;">5</td><td style="text-align: center; font-weight: bold;">261FIN03H01</td><td>Thuế</td><td style="text-align: center;">3.0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #2e7d32;">100%</td><td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</td></tr>
                        <tr><td style="text-align: center;">6</td><td style="text-align: center; font-weight: bold;">261PLT05H40</td><td>Chủ nghĩa xã hội khoa học</td><td style="text-align: center;">2.0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #2e7d32;">100%</td><td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</td></tr>
                        <tr><td style="text-align: center;">7</td><td style="text-align: center; font-weight: bold;">261SPT04H03</td><td>Giáo dục thể chất IV (Cầu lông)</td><td style="text-align: center;">1.0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center;">0</td><td style="text-align: center; font-weight: bold; color: #2e7d32;">100%</td><td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đạt</td></tr>
                    </tbody>
                </table>
            </div>
            <div style="font-size: 12.5px; color: #666; font-style: italic; margin-top: 5px;">
                * Quy chế: Sinh viên nghỉ học quá 20% tổng số tiết của học phần sẽ bị cấm thi kết thúc học phần và nhận điểm 0.
            </div>
        `;
    },

    // 5. Kết quả rèn luyện (Photo 11)
    renderPortalRenLuyen: function (u) {
        const list = u.renLuyen || [
            { stt: 1, hocKy: "HK01", tongDiem: 67, xepLoai: "Khá" },
            { stt: 2, hocKy: "HK02", tongDiem: 76, xepLoai: "Khá" }
        ];

        let rows = "";
        list.forEach(r => {
            rows += `
                <tr>
                    <td style="text-align: center; width: 50px;">${r.stt}</td>
                    <td style="text-align: center; font-weight: bold;">${r.hocKy}</td>
                    <td style="text-align: center;">2025-2026</td>
                    <td style="text-align: center; font-weight: bold; font-size: 14px; color: #004b63;">${r.tongDiem}</td>
                    <td style="text-align: center; font-weight: bold; color: #2e7d32;">${r.xepLoai}</td>
                    <td>Đã được Hội đồng đánh giá ĐRL phê duyệt chính thức</td>
                </tr>
            `;
        });

        return `
            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th style="width: 100px;">Học kỳ</th>
                            <th style="width: 130px;">Năm học</th>
                            <th style="width: 110px;">Tổng điểm</th>
                            <th style="width: 110px;">Xếp loại</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    // 6. Kết quả học tập (Photos 12-13)
    renderPortalMarks: function (u) {
        const semesters = u.marksSemesters || [];
        if (semesters.length === 0) {
            return `<div class="alert alert-info">Chưa có dữ liệu bảng điểm.</div>`;
        }

        let html = `
            <div style="margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: bold; color: #004b63; font-size: 13.5px;">
                    <i class="glyphicon glyphicon-education"></i> BẢNG ĐIỂM TỔNG HỢP TOÀN KHÓA
                </div>
                <button type="button" class="btn btn-sm btn-default" onclick="window.print()">
                    <i class="glyphicon glyphicon-print"></i> In bảng điểm
                </button>
            </div>
        `;

        semesters.forEach(s => {
            let courseRows = "";
            (s.courses || []).forEach(c => {
                courseRows += `
                    <tr>
                        <td style="text-align: center;">${c.stt}</td>
                        <td style="text-align: center; font-weight: bold; color: #004b63;">${c.maHP}</td>
                        <td>${c.tenHP}</td>
                        <td style="text-align: center;">${c.tc}</td>
                        <td style="text-align: center;">${c.ptKT || ""}</td>
                        <td style="text-align: center;">${c.ptCC || ""}</td>
                        <td style="text-align: center;">${c.ptThi || ""}</td>
                        <td style="text-align: center;">${c.diemCC !== "" && c.diemCC !== undefined ? Number(c.diemCC).toFixed(2) : ""}</td>
                        <td style="text-align: center;">${c.kt1 !== "" && c.kt1 !== undefined ? Number(c.kt1).toFixed(2) : ""}</td>
                        <td style="text-align: center;">${c.kt2 !== "" && c.kt2 !== undefined ? Number(c.kt2).toFixed(2) : ""}</td>
                        <td style="text-align: center;">${c.thiL1 !== "" && c.thiL1 !== undefined ? Number(c.thiL1).toFixed(2) : ""}</td>
                        <td style="text-align: center; font-weight: bold;">${c.tk10 !== "" && c.tk10 !== undefined ? Number(c.tk10).toFixed(2) : ""}</td>
                        <td style="text-align: center; font-weight: bold; color: #004b63;">${c.tkChu || ""}</td>
                        <td style="text-align: center; font-weight: bold; color: #2e7d32;">${c.xepLoai || ""}</td>
                    </tr>
                `;
            });

            const sm = s.summary;
            let summaryBox = "";
            if (sm) {
                summaryBox = `
                    <div style="background: #fdfaf3; border: 1px solid #faebcc; padding: 12px 16px; margin: -5px 0 20px 0; display: flex; font-size: 13px; line-height: 1.8;">
                        <div style="flex: 1;">
                            <div>- Điểm trung bình học kỳ hệ 10/100: <strong>${sm.dtb10}</strong></div>
                            <div>- Điểm trung bình học kỳ hệ 4: <strong>${sm.dtb4}</strong></div>
                            <div>- Điểm trung bình tích lũy: <strong>${sm.dtbTL10}</strong></div>
                            <div>- Điểm trung bình tích lũy (hệ 4): <strong>${sm.dtbTL4}</strong></div>
                        </div>
                        <div style="flex: 1;">
                            <div>- Số tín chỉ đạt: <strong>${sm.stcDat}</strong></div>
                            <div>- Số tín chỉ tích lũy: <strong>${sm.stcTL}</strong></div>
                            <div>- Phân loại ĐTB HK: <strong>${sm.xepLoaiDTB}</strong></div>
                            <div>- Điểm trung bình rèn luyện HK: <strong>${sm.dtbRL}</strong></div>
                            <div>- Phân loại ĐTBRL HK: <strong>${sm.xepLoaiDRL}</strong></div>
                        </div>
                    </div>
                `;
            }

            html += `
                <div style="font-weight: bold; font-size: 13.5px; color: #004b63; margin: 15px 0 6px 0;">
                    ${s.title}
                </div>
                <div class="table-responsive">
                    <table class="portal-table-hvnh">
                        <thead>
                            <tr>
                                <th style="width: 35px;">STT</th>
                                <th style="width: 75px;">Mã HP</th>
                                <th>Tên môn học</th>
                                <th style="width: 35px;">TC</th>
                                <th style="width: 40px;">%KT</th>
                                <th style="width: 40px;">%CC</th>
                                <th style="width: 40px;">%Thi</th>
                                <th style="width: 55px;">Điểm CC</th>
                                <th style="width: 50px;">KT 1</th>
                                <th style="width: 50px;">KT 2</th>
                                <th style="width: 55px;">Thi L1</th>
                                <th style="width: 55px;">TK(10)</th>
                                <th style="width: 50px;">TK(CH)</th>
                                <th style="width: 55px;">Xếp loại</th>
                            </tr>
                        </thead>
                        <tbody>${courseRows}</tbody>
                    </table>
                </div>
                ${summaryBox}
            `;
        });

        return html;
    },

    // 7. Tài chính sinh viên (Khớp ảnh 1, 2, 3)
    renderPortalTaiChinh: function (u) {
        return `
            <div style="display: flex; gap: 15px; margin-bottom: 12px; align-items: center; flex-wrap: wrap;">
                <div style="display: flex; align-items: center; gap: 6px; font-size: 13px; color: #333;">
                    <label style="margin-bottom: 0; font-weight: normal; cursor: pointer;">Phí học kỳ:</label>
                    <input type="radio" checked name="rdoPhiHocKy" style="margin: 0; cursor: pointer;">
                </div>
                <button type="button" class="btn btn-sm" style="background-color: #27ae60; color: #ffffff; font-weight: 600; padding: 4px 14px; border-radius: 3px; border: none;" onclick="HVNH.thanhToanTrucTuyen()">
                    Thanh toán trực tuyến
                </button>
                <button type="button" class="btn btn-sm" style="background-color: #2980b9; color: #ffffff; font-weight: 600; padding: 4px 14px; border-radius: 3px; border: none;" onclick="HVNH.phuongThucDongHocPhi()">
                    Chọn phương thức đóng học phí
                </button>
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 140px; text-align: left;">Mã phí</th>
                            <th style="text-align: left; min-width: 250px;">Tên phí</th>
                            <th style="width: 110px; text-align: right;">Phải đóng</th>
                            <th style="width: 110px; text-align: right;">Đã đóng</th>
                            <th style="width: 105px; text-align: center;">Ngày đóng</th>
                            <th style="width: 110px; text-align: right;">Còn nợ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- Group 1: 2026-2027 HK01 -->
                        <tr style="background-color: #fcdfd7; font-weight: bold; color: #000;">
                            <td colspan="6" style="padding: 6px 10px;">Năm học : 2026-2027, Học kỳ: HK01</td>
                        </tr>
                        <tr>
                            <td>261FIN01H04</td>
                            <td>Tài chính doanh nghiệp I [3.0 tc]</td>
                            <td style="text-align: right;">3,756,000</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">3,756,000</td>
                        </tr>
                        <tr>
                            <td>261FIN03H01</td>
                            <td>Thuế [3.0 tc]</td>
                            <td style="text-align: right;">3,756,000</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">3,756,000</td>
                        </tr>
                        <tr>
                            <td>261FIN22H04</td>
                            <td>Tài chính - Tiền tệ [3.0 tc]</td>
                            <td style="text-align: right;">3,756,000</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">3,756,000</td>
                        </tr>
                        <tr>
                            <td>261LAW02H03</td>
                            <td>Luật kinh tế [3.0 tc]</td>
                            <td style="text-align: right;">3,756,000</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">3,756,000</td>
                        </tr>
                        <tr>
                            <td>261MAT16H01</td>
                            <td>Phân tích định lượng trong kinh tế [3.0 tc]</td>
                            <td style="text-align: right;">3,756,000</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">3,756,000</td>
                        </tr>
                        <tr>
                            <td>261PLT05H40</td>
                            <td>Chủ nghĩa xã hội khoa học [2.0 tc]</td>
                            <td style="text-align: right;">2,504,000</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">2,504,000</td>
                        </tr>
                        <tr>
                            <td>261SPT04H03</td>
                            <td>Phí học lại Giáo dục thể chất IV (Cầu lông) [1.0 tc]</td>
                            <td style="text-align: right;">825,000</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">825,000</td>
                        </tr>

                        <!-- Group 2: 2025-2026 HK02 -->
                        <tr style="background-color: #fcdfd7; font-weight: bold; color: #000;">
                            <td colspan="6" style="padding: 6px 10px;">Năm học : 2025-2026, Học kỳ: HK02</td>
                        </tr>
                        <tr>
                            <td>252ACT01H01</td>
                            <td>Nguyên lý kế toán [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252ECO01H01</td>
                            <td>Kinh tế vi mô [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">05/01/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252LAW01H02</td>
                            <td>Pháp luật đại cương [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">05/01/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252MGT41H01</td>
                            <td>Nghệ thuật lãnh đạo [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">05/01/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252PLT02H01</td>
                            <td>Kinh tế chính trị Mác - Lênin [2.0 tc]</td>
                            <td style="text-align: right;">2,226,000</td>
                            <td style="text-align: right;">2,226,000</td>
                            <td style="text-align: center;">05/01/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252PLT03H03</td>
                            <td>Lịch sử Đảng Cộng sản Việt Nam [2.0 tc]</td>
                            <td style="text-align: right;">2,226,000</td>
                            <td style="text-align: right;">2,226,000</td>
                            <td style="text-align: center;">05/01/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252SPT07A_0102</td>
                            <td>Đường lối quốc phòng và an ninh của Đảng Cộng sản Việt Nam [2.0 tc]</td>
                            <td style="text-align: right;">1,570,000</td>
                            <td style="text-align: right;">1,570,000</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252SPT07A_0202</td>
                            <td>Công tác quốc phòng và an ninh [1.5 tc]</td>
                            <td style="text-align: right;">1,177,500</td>
                            <td style="text-align: right;">1,177,500</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252SPT07A_0302</td>
                            <td>Quân sự chung [1.5 tc]</td>
                            <td style="text-align: right;">1,177,500</td>
                            <td style="text-align: right;">1,177,500</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>252SPT07A_0402</td>
                            <td>Kỹ thuật chiến đấu bộ binh và chiến thuật [3.0 tc]</td>
                            <td style="text-align: right;">2,355,000</td>
                            <td style="text-align: right;">2,355,000</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Lệ phí ăn,ở, trang phục GDQPAN</td>
                            <td>Lệ phí ăn,ở, trang phục GDQPAN</td>
                            <td style="text-align: right;">2,512,000</td>
                            <td style="text-align: right;">2,512,000</td>
                            <td style="text-align: center;">20/03/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Phí điểm chuyển miễn</td>
                            <td>Phí điểm chuyển miễn: Phát âm</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Phí điểm chuyển miễn</td>
                            <td>Phí điểm chuyển miễn: Kỹ năng viết</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Phí điểm chuyển miễn</td>
                            <td>Phí điểm chuyển miễn: Kỹ năng nói</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Phí điểm chuyển miễn</td>
                            <td>Phí điểm chuyển miễn: Kỹ năng đọc</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Phí điểm chuyển miễn</td>
                            <td>Phí điểm chuyển miễn: Kỹ năng nghe</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: right;">1,001,700</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>

                        <!-- Group 3: 2025-2026 HK01 -->
                        <tr style="background-color: #fcdfd7; font-weight: bold; color: #000;">
                            <td colspan="6" style="padding: 6px 10px;">Năm học : 2025-2026, Học kỳ: HK01</td>
                        </tr>
                        <tr>
                            <td>251BUS02H01</td>
                            <td>Phí học lại Giao tiếp trong kinh doanh [2.0 tc]</td>
                            <td style="text-align: right;">2,226,000</td>
                            <td style="text-align: right;">2,226,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>251ECO02H02</td>
                            <td>Kinh tế vĩ mô [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>251IS03H01</td>
                            <td>Năng lực số ứng dụng [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>251MAT03H22</td>
                            <td>Xác suất và thống kê [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>251MAT04H11</td>
                            <td>Toán dành cho kinh tế [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>251PLT01H19</td>
                            <td>Triết học Mác - Lênin [3.0 tc]</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: right;">3,339,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>251SPT01H12</td>
                            <td>Giáo dục thể chất I (Đại cương) [1.0 tc]</td>
                            <td style="text-align: right;">785,000</td>
                            <td style="text-align: right;">785,000</td>
                            <td style="text-align: center;">09/02/2026</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Bảo hiểm y tế (bắt buộc, có giá trị 15 tháng)</td>
                            <td>Bảo hiểm y tế (bắt buộc, có giá trị 15 tháng)</td>
                            <td style="text-align: right;">789,750</td>
                            <td style="text-align: right;">789,750</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Dịch vụ nhập học</td>
                            <td>Dịch vụ nhập học</td>
                            <td style="text-align: right;">250,000</td>
                            <td style="text-align: right;">250,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Học phí</td>
                            <td>Học phí HK01 2025-2026</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: right;">0</td>
                            <td style="text-align: center;"></td>
                            <td style="text-align: right;">0</td>
                        </tr>
                        <tr>
                            <td>Phí bảo hiểm thân thể (tự nguyện, có giá trị 4 năm)</td>
                            <td>Phí bảo hiểm thân thể (tự nguyện, có giá trị 4 năm)</td>
                            <td style="text-align: right;">400,000</td>
                            <td style="text-align: right;">400,000</td>
                            <td style="text-align: center;">13/09/2025</td>
                            <td style="text-align: right;">0</td>
                        </tr>

                        <!-- Summary Row -->
                        <tr style="background-color: #f5be7e; font-weight: bold; color: #000;">
                            <td colspan="5" style="padding: 7px 10px; font-weight: bold;">Tổng học phí còn nợ :</td>
                            <td style="text-align: right; font-weight: bold; padding: 7px 10px;">22,105,000</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },

    renderPortalLoadingSpinner: function () {
        return `
            <div class="portal-loader-wrapper">
                <svg class="portal-dot-spinner-svg" width="46" height="46" viewBox="0 0 46 46">
                    <circle class="p-dot p-dot-1" cx="23" cy="7" r="2.8" fill="#1b6ca8" opacity="0.12"/>
                    <circle class="p-dot p-dot-2" cx="34.3" cy="11.7" r="2.8" fill="#1b6ca8" opacity="0.22"/>
                    <circle class="p-dot p-dot-3" cx="39" cy="23" r="2.8" fill="#1b6ca8" opacity="0.38"/>
                    <circle class="p-dot p-dot-4" cx="34.3" cy="34.3" r="2.8" fill="#1b6ca8" opacity="0.55"/>
                    <circle class="p-dot p-dot-5" cx="23" cy="39" r="2.8" fill="#1b6ca8" opacity="0.75"/>
                    <circle class="p-dot p-dot-6" cx="11.7" cy="34.3" r="3.2" fill="#1b6ca8" opacity="1.0"/>
                    <circle class="p-dot p-dot-7" cx="7" cy="23" r="3.0" fill="#1b6ca8" opacity="0.88"/>
                    <circle class="p-dot p-dot-8" cx="11.7" cy="11.7" r="2.8" fill="#1b6ca8" opacity="0.15"/>
                </svg>
            </div>
        `;
    },

    // 8. Chi tiết hóa đơn (Hiển thị bảng hóa đơn)
    renderPortalHoaDon: function (u) {
        return this.renderPortalHoaDonTable(u);
    },

    renderPortalHoaDonTable: function (u) {
        const invoices = u.hoaDon || [];
        let rows = "";
        invoices.forEach((hd, idx) => {
            rows += `
                <tr>
                    <td style="text-align: center; width: 45px;">${idx + 1}</td>
                    <td style="font-weight: bold; color: #004b63;">${hd.soSeries}</td>
                    <td style="text-align: center;">${hd.soHoaDon}</td>
                    <td style="text-align: center;">${hd.hinhThuc}</td>
                    <td style="text-align: center;">${hd.ngayDong}</td>
                    <td style="text-align: center;">${hd.ngayCapNhat}</td>
                    <td style="text-align: right; font-weight: bold; color: #2e7d32;">${hd.thanhTien} đ</td>
                    <td style="text-align: center;">
                        <button type="button" class="btn btn-xs btn-default" onclick="HVNH.xemChiTietHoaDon('${hd.soSeries}')" style="color: #004b63; font-weight: 500;">
                            <i class="glyphicon glyphicon-eye-open"></i> Xem chi tiết
                        </button>
                    </td>
                </tr>
            `;
        });

        return `
            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px;">STT</th>
                            <th>Số Series</th>
                            <th style="width: 90px;">Số HĐ</th>
                            <th style="width: 100px;">Hình thức</th>
                            <th style="width: 100px;">Ngày đóng</th>
                            <th style="width: 110px;">Ngày cập nhật</th>
                            <th style="width: 110px;">Thành tiền</th>
                            <th style="width: 110px;">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    // 9. Xem kết quả đăng ký học phần (Photo 17)
    renderPortalKetQuaDangKy: function (u) {
        const list = u.ketQuaDangKy || [];
        let rows = "";
        let totalCredits = 0;
        list.forEach(item => {
            totalCredits += parseFloat(item.stc) || 0;
            rows += `
                <tr>
                    <td style="text-align: center; width: 45px;">${item.stt}</td>
                    <td style="text-align: center; font-weight: bold; color: #004b63;">${item.maLHP}</td>
                    <td>${item.tenHP}</td>
                    <td style="text-align: center; font-weight: bold;">${item.stc}</td>
                    <td style="text-align: center;">${item.ngayDK}</td>
                    <td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đăng ký thành công</td>
                </tr>
            `;
        });

        return `
            <div style="background: #f4f8fa; padding: 10px 14px; border-left: 4px solid #004b63; margin-bottom: 12px; font-size: 13px;">
                <strong>Học kỳ:</strong> Học kỳ 1 - Năm học 2026 - 2027 | <strong>Tổng số tín chỉ đã đăng ký:</strong> <strong style="color: #c62828;">${totalCredits.toFixed(1)}</strong> tín chỉ
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px;">STT</th>
                            <th style="width: 130px;">Mã LHP</th>
                            <th>Tên học phần</th>
                            <th style="width: 70px;">STC</th>
                            <th style="width: 160px;">Ngày ĐK</th>
                            <th style="width: 160px;">Trạng thái</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    // 10. Chứng chỉ (Photo 18)
    renderPortalChungChi: function (u) {
        const certs = u.chungChi || [
            { stt: 1, tenChungChi: "Chứng chỉ ngoại ngữ", daNop: true },
            { stt: 2, tenChungChi: "Chứng chỉ tin học", daNop: false },
            { stt: 3, tenChungChi: "Chuẩn đầu ra NCKH chương trình CLC", daNop: false }
        ];

        let rows = "";
        certs.forEach(c => {
            const badge = c.daNop 
                ? `<span class="label label-success" style="font-size: 12px;"><i class="glyphicon glyphicon-ok"></i> Đã hoàn thành (IELTS 5.5)</span>`
                : `<span class="label label-warning" style="font-size: 12px;"><i class="glyphicon glyphicon-time"></i> Chưa hoàn thành</span>`;
            rows += `
                <tr>
                    <td style="text-align: center; width: 50px;">${c.stt}</td>
                    <td style="font-weight: bold; color: #004b63;">${c.tenChungChi}</td>
                    <td style="text-align: center; width: 220px;">${badge}</td>
                    <td>${c.daNop ? "Đã được Phòng Đào tạo thẩm định và công nhận chuẩn đầu ra" : "Sinh viên hoàn thiện trước kỳ xét tốt nghiệp chính thức"}</td>
                </tr>
            `;
        });

        return `
            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 50px;">STT</th>
                            <th>Tên chứng chỉ / Chuẩn đầu ra</th>
                            <th style="width: 220px;">Tình trạng thẩm định</th>
                            <th>Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>
        `;
    },

    // 11. Nộp chứng chỉ (Photo 21)
    renderPortalNopChungChi: function (u) {
        const submitted = u.nopChungChi || [
            { stt: 1, loaiChungChi: "Chứng chỉ IELTS từ 5.5 trở lên - Quy đổi bậc 4/6", diem: "5.5", nghe: "5.5", noi: "5.0", doc: "5.0", viet: "6.0", ngayThi: "25/01/2025", idChungChi: "IELTS-250125-88", tinhTrang: "Đã kiểm tra, Chứng chỉ hợp lệ", ghiChu: "", dangKyChuyenDiem: true }
        ];

        let rows = "";
        submitted.forEach(s => {
            rows += `
                <tr>
                    <td style="text-align: center; width: 45px;">${s.stt}</td>
                    <td style="font-weight: bold; color: #004b63;">${s.loaiChungChi}</td>
                    <td style="text-align: center; font-weight: bold; color: #2e7d32;">${s.diem}</td>
                    <td style="text-align: center;">${s.nghe}</td>
                    <td style="text-align: center;">${s.noi}</td>
                    <td style="text-align: center;">${s.doc}</td>
                    <td style="text-align: center;">${s.viet}</td>
                    <td style="text-align: center;">${s.ngayThi}</td>
                    <td style="text-align: center;"><strong>${s.idChungChi}</strong></td>
                    <td style="text-align: center;"><span class="label label-success">${s.tinhTrang}</span></td>
                    <td style="text-align: center; color: #2e7d32; font-weight: bold;"><i class="glyphicon glyphicon-ok"></i> Đã miễn 15 TC</td>
                </tr>
            `;
        });

        return `
            <div style="margin-bottom: 12px; font-weight: bold; color: #004b63; font-size: 13.5px;">
                <i class="glyphicon glyphicon-list-alt"></i> DANH SÁCH CHỨNG CHỈ QUỐC TẾ ĐÃ NỘP
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 35px;">STT</th>
                            <th>Loại chứng chỉ</th>
                            <th style="width: 50px;">Điểm</th>
                            <th style="width: 50px;">Nghe</th>
                            <th style="width: 50px;">Nói</th>
                            <th style="width: 50px;">Đọc</th>
                            <th style="width: 50px;">Viết</th>
                            <th style="width: 85px;">Ngày thi</th>
                            <th style="width: 120px;">Mã tra cứu / ID</th>
                            <th style="width: 160px;">Tình trạng</th>
                            <th style="width: 110px;">Chuyển điểm</th>
                        </tr>
                    </thead>
                    <tbody>${rows}</tbody>
                </table>
            </div>

            <div style="margin-top: 20px; border: 1px solid #c4d7e0; border-radius: 4px; padding: 15px; background: #fafcfe;">
                <div style="font-weight: bold; color: #004b63; margin-bottom: 10px;">
                    <i class="glyphicon glyphicon-cloud-upload"></i> NỘP CHỨNG CHỈ MỚI (TIN HỌC / NGOẠI NGỮ KHÁC)
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size: 12.5px;">Loại chứng chỉ:</label>
                            <select class="form-control input-sm" id="selCertType">
                                <option>Chứng chỉ Chuẩn kỹ năng CNTT cơ bản</option>
                                <option>Chứng chỉ MOS (Word, Excel, PowerPoint)</option>
                                <option>Chứng chỉ Ngoại ngữ 2 (Tiếng Trung, Tiếng Nhật)</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label style="font-size: 12.5px;">Tải tệp đính kèm (Ảnh scan / PDF):</label>
                            <input type="file" class="form-control input-sm" id="fileCertUpload">
                        </div>
                    </div>
                </div>
                <button type="button" class="btn btn-sm btn-primary" style="background-color: #004b63;" onclick="HVNH.showToast('Đã tiếp nhận yêu cầu nộp chứng chỉ mới!', 'success')">
                    <i class="glyphicon glyphicon-send"></i> Gửi hồ sơ chứng chỉ
                </button>
            </div>
        `;
    },

    // 12. Xét tốt nghiệp (Khớp ảnh 3)
    renderPortalXetTotNghiep: function (u) {
        return `
            <div class="portal-filter-row" style="margin-bottom: 12px;">
                <div class="portal-filter-item">
                    <label>Chương trình đào tạo:</label>
                    <select class="portal-filter-select" style="min-width: 270px;">
                        <option selected>CLC-Hoạch định và Tư v...</option>
                        <option>CLC-Hoạch định và Tư vấn tài chính</option>
                    </select>
                </div>
            </div>

            <div class="portal-step-block">
                <div class="portal-step-title">Sinh viên thực hiện các bước sau:</div>
                
                <div class="portal-step-item" style="display: flex; align-items: center; gap: 8px;">
                    <span>1.</span>
                    <button type="button" class="btn btn-sm" style="background-color: #004b63; color: #ffffff; border: none; padding: 4px 14px; border-radius: 3px; font-size: 13px; font-weight: 500;" onclick="window.print()">
                        In bảng điểm tích lũy
                    </button>
                </div>

                <div class="portal-step-item">
                    <div>2. Kiểm tra kết quả học tập trên bảng điểm</div>
                    <div style="margin-left: 18px; margin-top: 3px; color: #333;">- Nếu có thắc mắc, sinh viên liên hệ P.QLĐT</div>
                </div>

                <div class="portal-step-item">
                    <div>3. Chọn đợt xét rồi nhấn &lt;Đăng ký xét tốt nghiệp&gt;</div>
                    <div style="margin-left: 18px; margin-top: 3px; color: #333;">- Nếu muốn hủy đăng ký, chọn đợt xét rồi nhấn &lt;Hủy đăng ký xét tốt nghiệp&gt;</div>
                </div>
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 50px; text-align: center;">STT</th>
                            <th style="text-align: left; min-width: 180px;">Tên đợt</th>
                            <th style="width: 260px; text-align: center;">Ngày bắt đầu</th>
                            <th style="width: 260px; text-align: center;">Ngày kết thúc</th>
                            <th style="width: 90px; text-align: center;">Chọn</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="5" style="text-align: center; padding: 10px 8px; color: #333; font-size: 13px;">
                                Chưa có đợt xét tốt nghiệp
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },

    // 13. Đăng ký phúc khảo (Khớp ảnh 2)
    renderPortalPhucKhao: function (u) {
        return `
            <div class="portal-filter-row" style="margin-bottom: 14px;">
                <div class="portal-filter-item">
                    <label>Năm học :</label>
                    <select class="portal-filter-select" style="min-width: 160px;">
                        <option selected>2026-2027</option>
                        <option>2025-2026</option>
                        <option>2024-2025</option>
                    </select>
                </div>
                <div class="portal-filter-item">
                    <label>Học kỳ :</label>
                    <select class="portal-filter-select" style="min-width: 140px;">
                        <option selected>Học kỳ 1</option>
                        <option>Học kỳ 2</option>
                        <option>Học kỳ hè</option>
                    </select>
                </div>
                <div class="portal-filter-item">
                    <label>Lần thi :</label>
                    <select class="portal-filter-select" style="min-width: 100px;">
                        <option selected>1</option>
                        <option>2</option>
                    </select>
                </div>
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px; text-align: center;">STT</th>
                            <th style="width: 100px; text-align: center;">Mã học phần</th>
                            <th style="text-align: left; min-width: 140px;">Tên học phần</th>
                            <th style="width: 90px; text-align: center;">Ngày thi</th>
                            <th style="width: 75px; text-align: center;">Giờ thi</th>
                            <th style="width: 80px; text-align: center;">Điểm thi</th>
                            <th style="width: 120px; text-align: center;">Điểm trung bình</th>
                            <th style="width: 145px; text-align: center;">Ngày bắt đầu đăng ký</th>
                            <th style="width: 155px; text-align: center;">Ngày kết thúc đăng ký</th>
                            <th style="width: 90px; text-align: center;">Trạng thái</th>
                            <th style="width: 80px; text-align: center;">Thao tác</th>
                            <th style="width: 95px; text-align: center;">Thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="12" style="text-align: center; padding: 10px 8px; color: #333; font-size: 13px;">
                                Không có dữ liệu!
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },

    // 14. Đăng ký vắng thi (Khớp chuẩn hệ thống)
    renderPortalVangThi: function (u) {
        return `
            <div class="portal-filter-row" style="margin-bottom: 14px;">
                <div class="portal-filter-item">
                    <label>Năm học :</label>
                    <select class="portal-filter-select" style="min-width: 160px;">
                        <option selected>2026-2027</option>
                        <option>2025-2026</option>
                    </select>
                </div>
                <div class="portal-filter-item">
                    <label>Học kỳ :</label>
                    <select class="portal-filter-select" style="min-width: 140px;">
                        <option selected>Học kỳ 1</option>
                        <option>Học kỳ 2</option>
                        <option>Học kỳ hè</option>
                    </select>
                </div>
                <div class="portal-filter-item">
                    <label>Lần thi :</label>
                    <select class="portal-filter-select" style="min-width: 100px;">
                        <option selected>1</option>
                        <option>2</option>
                    </select>
                </div>
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px; text-align: center;">STT</th>
                            <th style="width: 100px; text-align: center;">Mã học phần</th>
                            <th style="text-align: left; min-width: 140px;">Tên học phần</th>
                            <th style="width: 90px; text-align: center;">Ngày thi</th>
                            <th style="width: 75px; text-align: center;">Giờ thi</th>
                            <th style="min-width: 150px; text-align: left;">Lý do vắng thi</th>
                            <th style="width: 120px; text-align: center;">Tệp minh chứng</th>
                            <th style="width: 90px; text-align: center;">Trạng thái</th>
                            <th style="width: 80px; text-align: center;">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="9" style="text-align: center; padding: 10px 8px; color: #333; font-size: 13px;">
                                Không có dữ liệu!
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },

    // 15. Lịch học (Hiển thị loading spinner)
    renderPortalLichHoc: function (u) {
        return this.renderPortalLoadingSpinner();
    },

    // 16. Lịch thi (Khớp ảnh 4)
    renderPortalLichThi: function (u) {
        return `
            <div class="portal-filter-row" style="margin-bottom: 14px;">
                <div class="portal-filter-item">
                    <label>Năm học :</label>
                    <select class="portal-filter-select" style="min-width: 160px;">
                        <option selected>2026-2027</option>
                        <option>2025-2026</option>
                    </select>
                </div>
                <div class="portal-filter-item" style="margin-left: 20px;">
                    <label>Học kỳ :</label>
                    <select class="portal-filter-select" style="min-width: 140px;">
                        <option selected>Học kỳ 1</option>
                        <option>Học kỳ 2</option>
                        <option>Học kỳ hè</option>
                    </select>
                </div>
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 100px; text-align: left;">Mã học phần</th>
                            <th style="text-align: left; min-width: 150px;">Tên học phần</th>
                            <th style="width: 95px; text-align: center;">Số báo danh</th>
                            <th style="width: 60px; text-align: center;">STC</th>
                            <th style="width: 90px; text-align: center;">Ngày thi</th>
                            <th style="width: 75px; text-align: center;">Giờ thi</th>
                            <th style="width: 130px; text-align: center;">Thời lượng (phút)</th>
                            <th style="width: 85px; text-align: center;">Phòng thi</th>
                            <th style="width: 85px; text-align: center;">Địa điểm</th>
                            <th style="width: 85px; text-align: center;">Ghi chú</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="10" style="padding: 10px 12px; color: #333; font-size: 13px;">
                                Chưa có lịch thi
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },

    // 17. Quyết định sinh viên
    renderPortalQuyetDinh: function (u) {
        return `
            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px;">STT</th>
                            <th style="width: 140px;">Số quyết định</th>
                            <th style="width: 110px;">Ngày ký</th>
                            <th>Nội dung quyết định</th>
                            <th style="width: 120px;">Cơ quan ban hành</th>
                            <th style="width: 90px;">Tệp</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align:center;">1</td>
                            <td style="text-align:center; font-weight:bold;">1240/QĐ-HVNH</td>
                            <td style="text-align:center;">25/08/2025</td>
                            <td>Quyết định về việc công nhận trúng tuyển và nhập học hệ Đại học chính quy Chất lượng cao Khóa 28 năm học 2025 - 2029</td>
                            <td style="text-align:center;">Giám đốc HVNH</td>
                            <td style="text-align:center;"><a href="javascript:void(0)" class="btn btn-xs btn-default" onclick="HVNH.downloadDummy('QD_1240_CongNhanTrungTuyen_K28.pdf')"><i class="glyphicon glyphicon-download-alt"></i> Tải</a></td>
                        </tr>
                        <tr>
                            <td style="text-align:center;">2</td>
                            <td style="text-align:center; font-weight:bold;">342/QĐ-HVNH</td>
                            <td style="text-align:center;">15/02/2026</td>
                            <td>Quyết định về việc công nhận kết quả miễn học và chuyển đổi 15 tín chỉ các học phần Ngoại ngữ cho sinh viên nộp chứng chỉ quốc tế IELTS</td>
                            <td style="text-align:center;">Giám đốc HVNH</td>
                            <td style="text-align:center;"><a href="javascript:void(0)" class="btn btn-xs btn-default" onclick="HVNH.downloadDummy('QD_342_MienHocPhanTiengAnh.pdf')"><i class="glyphicon glyphicon-download-alt"></i> Tải</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },

    // 18. Đăng ký học phần
    renderPortalDangKyHocPhan: function (u) {
        return `
            <div class="alert alert-info">
                <strong>Thông báo:</strong> Cổng đăng ký học phần bổ sung Học kỳ 1 năm học 2026 - 2027 đang mở cho sinh viên Khóa 28.
            </div>
            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 40px;">Chọn</th>
                            <th>Mã LHP</th>
                            <th>Tên môn học</th>
                            <th>STC</th>
                            <th>Giảng viên</th>
                            <th>Thời gian</th>
                            <th>Phòng</th>
                            <th>Sĩ số</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="text-align:center;"><input type="checkbox" checked disabled></td>
                            <td style="text-align:center; font-weight:bold;">261FIN22H04</td>
                            <td>Tài chính - Tiền tệ</td>
                            <td style="text-align:center;">3.0</td>
                            <td>TS. Đỗ Đức Minh</td>
                            <td>Thứ 2 (Tiết 1 - 3)</td>
                            <td>D2.304</td>
                            <td style="text-align:center;">65/70</td>
                        </tr>
                        <tr>
                            <td style="text-align:center;"><input type="checkbox" checked disabled></td>
                            <td style="text-align:center; font-weight:bold;">261LAW02H03</td>
                            <td>Luật kinh tế</td>
                            <td style="text-align:center;">3.0</td>
                            <td>ThS. Hoàng Mai Chi</td>
                            <td>Thứ 3 (Tiết 7 - 9)</td>
                            <td>D1.201</td>
                            <td style="text-align:center;">60/70</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <button type="button" class="btn btn-sm btn-primary" style="background-color: #004b63;" onclick="HVNH.showToast('Lưu nguyện vọng đăng ký học phần thành công!', 'success')">
                <i class="glyphicon glyphicon-floppy-disk"></i> Lưu kết quả đăng ký
            </button>
        `;
    },

    // 19. DỊCH VỤ CÔNG TRỰC TUYẾN (dichvucong.hvnh.edu.vn - Replicating Photo 2)
    renderDichVuCong: function () {
        const u = this.state.currentUser || {
            username: "008307000568",
            hoTen: "HUỲNH THỊ THU HÀ",
            lop: "K24CLC-NHA",
            khoa: "Ngân hàng",
            emailCaNhan: "huynhthuthuha@gmail.com"
        };

        // Hide public header to replicate standalone dichvucong.hvnh.edu.vn site
        const h = document.getElementById("header");
        if (h) h.style.display = "none";

        const dvcData = HVNH_DATA.publicServices || { categories: [], procedures: [] };
        const activeCatId = this.state.dvcCategory || "cong-tac-sv";
        const activeFilter = this.state.dvcFilter || "all";
        const searchKey = (this.state.dvcSearch || "").trim().toLowerCase();

        // Filter procedures
        let procedures = (dvcData.procedures || []).filter(p => {
            let match = true;
            if (activeCatId && p.categoryId !== activeCatId) match = false;
            if (activeFilter === "tructuyen" && p.hinhThuc !== "Trực tuyến") match = false;
            if (activeFilter === "tructiep" && p.hinhThuc !== "Trực tiếp") match = false;
            if (searchKey && !p.tenThuTuc.toLowerCase().includes(searchKey)) match = false;
            return match;
        });

        const bodyEl = document.getElementById("body");
        if (!bodyEl) return;

        bodyEl.innerHTML = `
            <div class="dvc-page-wrapper">
                <!-- Simulated Browser Address Ribbon replicating Photo 2 URL -->
                <div class="dvc-browser-bar">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <button type="button" class="btn btn-xs btn-default" onclick="window.history.back()" title="Quay lại"><i class="glyphicon glyphicon-arrow-left"></i></button>
                        <button type="button" class="btn btn-xs btn-default" onclick="HVNH.renderDichVuCong()" title="Tải lại"><i class="glyphicon glyphicon-refresh"></i></button>
                    </div>
                    <div class="dvc-browser-url">
                        <i class="glyphicon glyphicon-lock" style="color: #16a34a; font-size: 11px;"></i>
                        <span>https://dichvucong.hvnh.edu.vn/procedure-list?fields=F202510090421565506582&sort=Feedback%253A0%252CFieldCodes%253A0&ext=%257B%2522processingMethod...</span>
                    </div>
                    <div>
                        <a href="#/portal" class="dvc-back-btn">
                            <i class="glyphicon glyphicon-share-alt" style="transform: scaleX(-1);"></i>
                            Quay lại Cổng SV (online.hvnh.edu.vn)
                        </a>
                    </div>
                </div>

                <!-- Top Navigation Header -->
                <header class="dvc-header">
                    <div class="dvc-logo-box">
                        <svg width="34" height="42" viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 4 L93 20 C93 78 50 114 50 116 C50 114 7 78 7 20 Z" fill="#ffffff" stroke="#ffffff" stroke-width="1"/>
                            <path d="M50 8 L89 23 C89 74 50 108 50 111 C50 108 11 74 11 23 Z" fill="#163b65"/>
                            <text x="50" y="44" font-family="'Arial Black', Arial, sans-serif" font-size="20" font-weight="900" fill="#ffffff" text-anchor="middle">BAV</text>
                            <g transform="translate(26, 49)">
                                <path d="M24 16 C16 13 4 14 0 17 L0 31 C6 28 16 27 24 30 Z" fill="#ffffff"/>
                                <path d="M24 16 C32 13 44 14 48 17 L48 31 C42 28 32 27 24 30 Z" fill="#ffffff"/>
                                <path d="M24 4 L26 10 L32 12 L26 14 L24 20 L22 14 L16 12 L22 10 Z" fill="#ffd54f"/>
                            </g>
                            <text x="50" y="100" font-family="'Arial', sans-serif" font-size="11" font-weight="bold" fill="#ffd54f" text-anchor="middle">1961</text>
                        </svg>
                        <div>
                            <div class="title-top">DỊCH VỤ CÔNG TRỰC TUYẾN</div>
                            <div class="title-sub">HỌC VIỆN NGÂN HÀNG</div>
                        </div>
                    </div>

                    <ul class="dvc-nav-menu">
                        <li><span class="dvc-nav-item" style="font-size: 16px; cursor: pointer;">☰</span></li>
                        <li><a href="javascript:void(0)" class="dvc-nav-item"><i class="glyphicon glyphicon-info-sign"></i> Giới thiệu & Hướng dẫn</a></li>
                        <li><a href="javascript:void(0)" class="dvc-nav-item" style="color: #1d4ed8; font-weight: 600;"><i class="glyphicon glyphicon-education"></i> TTHC Sinh viên</a></li>
                        <li><a href="javascript:void(0)" class="dvc-nav-item"><i class="glyphicon glyphicon-briefcase"></i> TTHC Cán bộ/Nhân viên</a></li>
                        <li><a href="javascript:void(0)" class="dvc-nav-item"><i class="glyphicon glyphicon-user"></i> TTHC Vãng lai</a></li>
                        <li><a href="javascript:void(0)" class="dvc-nav-item"><i class="glyphicon glyphicon-search"></i> Tra cứu hồ sơ</a></li>
                    </ul>

                    <div class="dvc-top-right">
                        <div class="dvc-lang-flag" title="Tiếng Việt">
                            <svg width="24" height="18" viewBox="0 0 30 20">
                                <rect width="30" height="20" fill="#da251d"/>
                                <polygon points="15,4 16.5,8.8 21.5,8.8 17.5,11.8 19,16.5 15,13.5 11,16.5 12.5,11.8 8.5,8.8 13.5,8.8" fill="#ffff00"/>
                            </svg>
                        </div>
                        <div class="dvc-btn-login" onclick="HVNH.openStudentProfileQuickView()">
                            <i class="glyphicon glyphicon-user"></i>
                            <span>${u.username}</span>
                        </div>
                    </div>
                </header>

                <!-- Blue Ribbon: TRANG CHỦ -->
                <div class="dvc-breadcrumb-bar">
                    TRANG CHỦ
                </div>

                <!-- Content Grid: 2 Columns -->
                <div class="dvc-content-grid">
                    <!-- Left Sidebar: LĨNH VỰC -->
                    <aside class="dvc-sidebar">
                        <div class="dvc-sidebar-title">
                            <span style="font-size: 14px; letter-spacing: -2px;">:::</span> LĨNH VỰC
                        </div>
                        <input type="text" class="dvc-search-input" id="dvcCatSearch" placeholder="🔍 Nhập để tìm kiếm..." oninput="HVNH.filterDvcCategories(this.value)">
                        <ul class="dvc-category-list" id="dvcCategoryList">
                            ${(dvcData.categories || []).map(cat => `
                                <li>
                                    <a href="javascript:void(0)" class="dvc-cat-item ${cat.id === activeCatId ? 'active' : ''}" onclick="HVNH.setDvcCategory('${cat.id}')">
                                        ${cat.name}
                                    </a>
                                </li>
                            `).join("")}
                        </ul>
                    </aside>

                    <!-- Right Main Panel -->
                    <main class="dvc-main-panel">
                        <!-- Filter Row -->
                        <div class="dvc-filter-row">
                            <div class="dvc-filter-group">
                                <span>Hình thức</span>
                                <div class="dvc-pill-container">
                                    <button type="button" class="dvc-pill-btn ${activeFilter === 'all' ? 'active' : ''}" onclick="HVNH.setDvcFilter('all')">Tất cả</button>
                                    <button type="button" class="dvc-pill-btn ${activeFilter === 'tructiep' ? 'active' : ''}" onclick="HVNH.setDvcFilter('tructiep')">Trực tiếp</button>
                                    <button type="button" class="dvc-pill-btn ${activeFilter === 'tructuyen' ? 'active' : ''}" onclick="HVNH.setDvcFilter('tructuyen')">Trực tuyến</button>
                                </div>
                            </div>

                            <div class="dvc-search-box">
                                <span style="font-size: 13px; font-weight: 500; color: #475569;">Tìm kiếm</span>
                                <input type="text" class="dvc-procedure-input" id="txtDvcSearch" placeholder="🔍 Tìm kiếm bằng tên thủ tục ..." value="${this.state.dvcSearch || ''}" onkeydown="if(event.key==='Enter') HVNH.searchDvcProcedures()">
                                <button type="button" class="dvc-btn-search" onclick="HVNH.searchDvcProcedures()">
                                    <i class="glyphicon glyphicon-search"></i> Tìm kiếm
                                </button>
                            </div>
                        </div>

                        <!-- Procedures Table replicating Photo 2 -->
                        <div class="table-responsive">
                            <table class="dvc-table">
                                <thead>
                                    <tr>
                                        <th style="width: 55px; text-align: center;">STT</th>
                                        <th>Tên thủ tục</th>
                                        <th style="width: 220px;">Lĩnh vực</th>
                                        <th style="width: 130px; text-align: center;">Hình thức</th>
                                        <th style="width: 150px; text-align: center;"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${procedures.length > 0 ? procedures.map((proc, index) => `
                                        <tr>
                                            <td style="text-align: center; font-weight: 600; color: #64748b;">${index + 1}</td>
                                            <td>
                                                <div style="font-weight: 500; color: #0f172a; line-height: 1.45;">${proc.tenThuTuc}</div>
                                                <div style="font-size: 12px; color: #64748b; margin-top: 3px;">Thời gian xử lý: ${proc.thoiGianGiaiQuyet}</div>
                                            </td>
                                            <td style="color: #475569;">${proc.linhVuc}</td>
                                            <td style="text-align: center;">
                                                <span class="badge-online">${proc.hinhThuc}</span>
                                            </td>
                                            <td style="text-align: center;">
                                                <button type="button" class="btn-nop-hoso" onclick="HVNH.openNopHoSoModal('${proc.id}')">
                                                    <i class="glyphicon glyphicon-send" style="color: #0284c7;"></i> NỘP HỒ SƠ
                                                </button>
                                            </td>
                                        </tr>
                                    `).join("") : `
                                        <tr>
                                            <td colspan="5" style="text-align: center; padding: 30px; color: #64748b;">
                                                <i class="glyphicon glyphicon-info-sign" style="font-size: 20px;"></i>
                                                <p style="margin-top: 8px;">Không tìm thấy thủ tục hành chính phù hợp với tiêu chí tra cứu.</p>
                                            </td>
                                        </tr>
                                    `}
                                </tbody>
                            </table>
                        </div>

                        <!-- Table Footer & Pagination -->
                        <div class="dvc-pagination-bar">
                            <div>
                                Hiển thị: <strong>1 đến ${procedures.length}</strong> / ${procedures.length} dữ liệu.
                            </div>
                            <div class="dvc-page-controls">
                                <button type="button" class="dvc-page-btn" disabled>|◄</button>
                                <button type="button" class="dvc-page-btn" disabled>◄</button>
                                <button type="button" class="dvc-page-btn active">1</button>
                                <button type="button" class="dvc-page-btn" disabled>►</button>
                                <button type="button" class="dvc-page-btn" disabled>►|</button>
                                <select style="height: 26px; border: 1px solid #cbd5e1; border-radius: 3px; font-size: 12px; margin-left: 6px; padding: 0 4px;">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>50</option>
                                </select>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        `;

        window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    setDvcCategory: function (catId) {
        this.state.dvcCategory = catId;
        this.renderDichVuCong();
    },

    setDvcFilter: function (filter) {
        this.state.dvcFilter = filter;
        this.renderDichVuCong();
    },

    filterDvcCategories: function (val) {
        const keyword = (val || "").trim().toLowerCase();
        const items = document.querySelectorAll("#dvcCategoryList li");
        items.forEach(li => {
            const text = li.innerText.toLowerCase();
            li.style.display = text.includes(keyword) ? "block" : "none";
        });
    },

    searchDvcProcedures: function () {
        const input = document.getElementById("txtDvcSearch");
        this.state.dvcSearch = input ? input.value.trim() : "";
        this.renderDichVuCong();
    },

    openNopHoSoModal: function (procId) {
        const dvcData = HVNH_DATA.publicServices || { procedures: [] };
        const proc = dvcData.procedures.find(p => p.id === procId) || {
            tenThuTuc: "Quy trình cấp giấy xác nhận sinh viên",
            linhVuc: "Công tác sinh viên"
        };
        const u = this.state.currentUser || {
            username: "008307000568",
            hoTen: "HUỲNH THỊ THU HÀ",
            lop: "K24CLC-NHA",
            khoa: "Ngân hàng",
            emailCaNhan: "huynhthuthuha@gmail.com",
            diDong: "0968 554 219"
        };

        const body = `
            <div style="font-size: 13px; line-height: 1.6;">
                <div style="background: #f0f7fa; border: 1px solid #c8e1ec; border-radius: 4px; padding: 12px 16px; margin-bottom: 16px;">
                    <div style="font-weight: 700; color: #163b65; font-size: 14px; margin-bottom: 4px;">
                        ${proc.tenThuTuc}
                    </div>
                    <div style="color: #64748b; font-size: 12.5px;">
                        Lĩnh vực: <strong>${proc.linhVuc}</strong> | Thời gian xử lý dự kiến: <strong>${proc.thoiGianGiaiQuyet || '1-2 ngày'}</strong>
                    </div>
                </div>

                <div class="row" style="margin-bottom: 12px; background: #fafbfc; border-radius: 4px; padding: 10px 0; border: 1px dashed #e2e8f0;">
                    <div class="col-md-6">
                        <div>Họ và tên: <strong style="color: #163b65;">${u.hoTen}</strong></div>
                        <div>Mã sinh viên: <strong>${u.username}</strong></div>
                    </div>
                    <div class="col-md-6">
                        <div>Lớp học: <strong>${u.lop || 'K24CLC-NHA'}</strong></div>
                        <div>Khoa: <strong>${u.khoa || 'Ngân hàng'}</strong></div>
                    </div>
                </div>

                <form id="frmNopHoSoDvc" onsubmit="HVNH.submitHoSoDvc('${proc.id}', event)">
                    <div class="form-group">
                        <label style="font-size: 12.5px; font-weight: 600;">Lý do / Mục đích xin cấp giấy <span style="color: red;">*</span>:</label>
                        <textarea class="form-control input-sm" id="txtDvcReason" rows="3" placeholder="Nhập chi tiết mục đích (VD: Bổ sung hồ sơ vay vốn Ngân hàng Chính sách xã hội địa phương, hoãn NVQS...)" required></textarea>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label style="font-size: 12.5px; font-weight: 600;">Số lượng bản in:</label>
                                <select class="form-control input-sm" id="selDvcQty">
                                    <option value="1">01 bản</option>
                                    <option value="2">02 bản</option>
                                    <option value="3">03 bản</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label style="font-size: 12.5px; font-weight: 600;">Hình thức nhận kết quả:</label>
                                <select class="form-control input-sm" id="selDvcDelivery">
                                    <option value="email">Bản điện tử ký số gửi về Email (${u.emailCaNhan || 'huynhthuthuha@gmail.com'})</option>
                                    <option value="office">Bản giấy dấu đỏ nhận tại Phòng Công tác Sinh viên (P.104-A1)</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label style="font-size: 12.5px; font-weight: 600;">Đính kèm tệp minh chứng (nếu có):</label>
                        <input type="file" class="form-control input-sm" accept=".pdf,.jpg,.jpeg,.png">
                        <small style="color: #64748b;">Chấp nhận file PDF, JPG, PNG (tối đa 5MB)</small>
                    </div>

                    <div class="form-group">
                        <label style="font-size: 12.5px; font-weight: 600;">Ghi chú thêm:</label>
                        <input type="text" class="form-control input-sm" placeholder="Ghi chú thêm cho cán bộ tiếp nhận hồ sơ...">
                    </div>
                </form>
            </div>
        `;

        const footer = `
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary btn-sm" style="background-color: #163b65; border-color: #163b65;" onclick="document.getElementById('frmNopHoSoDvc').requestSubmit()">
                <i class="glyphicon glyphicon-send"></i> Gửi hồ sơ trực tuyến
            </button>
        `;

        this.showModal("Nộp hồ sơ trực tuyến", body, footer);
    },

    submitHoSoDvc: function (procId, e) {
        if (e) e.preventDefault();
        const reason = (document.getElementById("txtDvcReason").value || "").trim();
        if (!reason) {
            alert("Vui lòng nhập lý do nộp hồ sơ!");
            return;
        }

        const randomCode = "HS-2026-008307000568-" + Math.floor(10 + Math.random() * 90);
        $("#myAlert").modal("hide");

        const successBody = `
            <div style="text-align: center; padding: 20px 10px;">
                <div style="width: 56px; height: 56px; border-radius: 50%; background: #dcfce7; color: #16a34a; font-size: 28px; line-height: 56px; margin: 0 auto 15px;">
                    ✓
                </div>
                <h4 style="font-weight: 700; color: #163b65; margin-bottom: 10px;">NỘP HỒ SƠ THÀNH CÔNG!</h4>
                <p style="font-size: 13.5px; color: #475569; margin-bottom: 15px;">
                    Yêu cầu giải quyết thủ tục hành chính của bạn đã được chuyển tới <strong>Phòng Công tác sinh viên</strong>.
                </p>
                <div style="background: #f1f5f9; border: 1px dashed #cbd5e1; border-radius: 6px; padding: 12px; font-size: 13px; display: inline-block; margin-bottom: 15px;">
                    Mã hồ sơ tiếp nhận: <strong style="color: #2563eb; font-size: 15px;">${randomCode}</strong><br>
                    Ngày nộp: <strong>${new Date().toLocaleDateString('vi-VN')}</strong> | Trạng thái: <span class="label label-info">Đang thụ lý</span>
                </div>
                <p style="font-size: 12.5px; color: #64748b;">
                    Bạn có thể theo dõi tiến độ xử lý hồ sơ tại mục <strong>"Tra cứu hồ sơ"</strong> trên Cổng Dịch vụ công hoặc qua email đã đăng ký.
                </p>
            </div>
        `;

        this.showModal("Xác nhận tiếp nhận hồ sơ", successBody, `
            <button type="button" class="btn btn-primary btn-sm" style="background-color: #163b65;" data-dismiss="modal">Đồng ý</button>
        `);
    },

    openStudentProfileQuickView: function () {
        const u = this.state.currentUser || { username: "008307000568", hoTen: "HUỲNH THỊ THU HÀ" };
        this.showModal("Tài khoản sinh viên", `
            <div style="font-size: 13px; line-height: 1.8;">
                <div>Họ và tên: <strong style="color: #163b65;">${u.hoTen}</strong></div>
                <div>Mã số sinh viên: <strong>${u.username}</strong></div>
                <div>Lớp: <strong>${u.lop || 'K24CLC-NHA'}</strong></div>
                <div>Trạng thái: <span class="label label-success">Đã xác thực</span></div>
            </div>
        `, `
            <a href="#/portal" class="btn btn-primary btn-sm" style="background-color: #163b65;" data-dismiss="modal">Đến trang Cổng SV</a>
            <button type="button" class="btn btn-default btn-sm" data-dismiss="modal">Đóng</button>
        `);
    },

    renderPortalXinGiayXacNhan: function (u) {
        // Direct forwarding to Dịch Vụ Công view
        this.renderDichVuCong();
        return "";
    },

    // 20. Liên hệ - góp ý
    renderPortalLienHe: function (u) {
        return `
            <div style="border: 1px solid #c4d7e0; border-radius: 4px; padding: 15px; background: #fafcfe;">
                <div style="font-weight: bold; color: #004b63; margin-bottom: 12px; font-size: 13.5px;">
                    <i class="glyphicon glyphicon-envelope"></i> HÒM THƯ GÓP Ý & HỖ TRỢ SINH VIÊN
                </div>
                <form onsubmit="HVNH.guiGopY(event)">
                    <div class="form-group">
                        <label style="font-size: 12.5px;">Chủ đề tiếp nhận:</label>
                        <select class="form-control input-sm">
                            <option>Phòng Quản lý Đào tạo (Kế hoạch học tập, thời khóa biểu)</option>
                            <option>Phòng Tài chính - Kế toán (Học phí, hóa đơn điện tử)</option>
                            <option>Phòng Công tác sinh viên (Rèn luyện, học bổng, ký túc xá)</option>
                            <option>Trung tâm CNTT (Tài khoản, phần mềm, cổng đăng ký)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label style="font-size: 12.5px;">Nội dung phản ánh / góp ý:</label>
                        <textarea class="form-control" rows="4" placeholder="Nhập chi tiết ý kiến đóng góp hoặc thắc mắc của bạn..." required></textarea>
                    </div>
                    <button type="submit" class="btn btn-sm btn-primary" style="background-color: #004b63;">
                        <i class="glyphicon glyphicon-send"></i> Gửi ý kiến
                    </button>
                </form>
            </div>
        `;
    },

    // 21. Đăng ký lệ phí, BHYT (Khớp ảnh 1)
    renderPortalLePhi: function (u) {
        return `
            <div class="portal-filter-row" style="margin-bottom: 14px;">
                <button type="button" class="portal-btn-action-light" onclick="HVNH.showToast('Chức năng đăng ký trực tuyến hiện chưa mở đợt mới!', 'info')">
                    Đăng ký
                </button>
                <div class="portal-filter-item" style="margin-left: 10px;">
                    <label>Năm học :</label>
                    <select class="portal-filter-select" style="min-width: 170px;">
                        <option selected>2029-2030</option>
                        <option>2028-2029</option>
                        <option>2027-2028</option>
                        <option>2026-2027</option>
                        <option>2025-2026</option>
                    </select>
                </div>
                <div class="portal-filter-item" style="margin-left: 15px;">
                    <label>Học kỳ :</label>
                    <select class="portal-filter-select" style="min-width: 140px;">
                        <option selected>Học kỳ 1</option>
                        <option>Học kỳ 2</option>
                        <option>Học kỳ hè</option>
                    </select>
                </div>
            </div>

            <div class="table-responsive">
                <table class="portal-table-hvnh">
                    <thead>
                        <tr>
                            <th style="width: 45px; text-align: center;">STT</th>
                            <th style="text-align: left; min-width: 130px;">Tên loại phí</th>
                            <th style="text-align: left; min-width: 150px;">Thông tin thêm</th>
                            <th style="width: 85px; text-align: center;">Số lượng</th>
                            <th style="width: 100px; text-align: center;">Đơn giá</th>
                            <th style="width: 110px; text-align: center;">Thành tiền</th>
                            <th style="width: 120px; text-align: center;">Ngày đăng ký</th>
                            <th style="width: 85px; text-align: center;">Đã đóng</th>
                            <th style="width: 60px; text-align: center;">Hủy</th>
                            <th style="width: 130px; text-align: center;">Link Thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colspan="10" style="text-align: center; padding: 10px 8px; color: #333; font-size: 13px;">
                                Chưa có thông tin lệ phí
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;
    },

    // 23. Hướng dẫn sử dụng (Hiển thị loading spinner theo yêu cầu)
    renderPortalHuongDan: function (u) {
        return this.renderPortalLoadingSpinner();
    },

    /* ==========================================================================
       MODAL POPUPS & ACTIONS
       ========================================================================== */
    capNhatThongTin: function () {
        const u = this.state.currentUser;
        const body = `
            <div style="font-size: 13px;">
                <p>Cập nhật số điện thoại cá nhân và địa chỉ liên lạc:</p>
                <div class="form-group">
                    <label>Số điện thoại di động:</label>
                    <input type="text" class="form-control input-sm" id="editPhone" value="${u.diDong || '0968 554 219'}">
                </div>
                <div class="form-group">
                    <label>Email cá nhân:</label>
                    <input type="email" class="form-control input-sm" id="editEmail" value="${u.emailCaNhan || 'huynhthuthuha@gmail.com'}">
                </div>
                <div class="form-group">
                    <label>Địa chỉ liên lạc hiện tại:</label>
                    <input type="text" class="form-control input-sm" id="editAddress" value="${u.diaChi || 'Số 36 Cầu Giấy, Quan Hoa, Cầu Giấy, Hà Nội'}">
                </div>
            </div>
        `;
        this.showModal("Cập nhật thông tin cá nhân", body, `
            <button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-primary" style="background-color: #004b63;" onclick="HVNH.saveUpdatedInfo()">Lưu thay đổi</button>
        `);
    },

    saveUpdatedInfo: function () {
        const p = document.getElementById("editPhone").value.trim();
        const em = document.getElementById("editEmail").value.trim();
        const addr = document.getElementById("editAddress").value.trim();
        if (this.state.currentUser) {
            this.state.currentUser.diDong = p;
            this.state.currentUser.emailCaNhan = em;
            this.state.currentUser.diaChi = addr;
            localStorage.setItem("hvnh_user", JSON.stringify(this.state.currentUser));
        }
        $("#myAlert").modal("hide");
        this.showToast("Cập nhật thông tin cá nhân thành công!", "success");
        this.switchPortalSection("info");
    },

    capNhatNganHang: function () {
        const body = `
            <div style="font-size: 13px;">
                <p>Thông tin tài khoản Ngân hàng liên kết chi trả học bổng / hoàn phí:</p>
                <div class="form-group">
                    <label>Ngân hàng:</label>
                    <input type="text" class="form-control input-sm" value="Ngân hàng TMCP Công thương Việt Nam (VietinBank)" readonly>
                </div>
                <div class="form-group">
                    <label>Số tài khoản:</label>
                    <input type="text" class="form-control input-sm" id="txtBankNumber" value="103874928120">
                </div>
                <div class="form-group">
                    <label>Chủ tài khoản:</label>
                    <input type="text" class="form-control input-sm" value="${this.state.currentUser.hoTen}" readonly>
                </div>
            </div>
        `;
        this.showModal("Cập nhật thông tin tài khoản ngân hàng", body, `
            <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-primary" style="background-color: #004b63;" onclick="$('#myAlert').modal('hide'); HVNH.showToast('Lưu thông tin ngân hàng thành công!', 'success');">Lưu tài khoản</button>
        `);
    },

    thanhToanTrucTuyen: function () {
        const u = this.state.currentUser;
        const body = `
            <div style="text-align: center; padding: 15px; font-size: 13.5px;">
                <h4 style="color: #004b63; font-weight: bold; margin-top: 0;">THANH TOÁN HỌC PHÍ TRỰC TUYẾN QUA VIETQR</h4>
                <p>Học kỳ: <strong>Học kỳ 1 năm học 2026 - 2027</strong> | Số tiền: <strong style="color: #c62828; font-size: 18px;">22,109,000 VNĐ</strong></p>
                
                <div style="border: 2px solid #004b63; display: inline-block; padding: 15px; border-radius: 8px; background: #ffffff; margin: 10px 0;">
                    <!-- Realistic VietQR code simulator -->
                    <div style="width: 180px; height: 180px; background: #f0f4f8; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid #ccd; border-radius: 4px; margin: 0 auto;">
                        <i class="glyphicon glyphicon-qrcode" style="font-size: 90px; color: #002d4f;"></i>
                        <span style="font-size: 11px; color: #444; font-weight: bold; margin-top: 5px;">VIETQR - NAPAS 247</span>
                    </div>
                    <div style="margin-top: 10px; font-size: 12.5px; text-align: left; line-height: 1.6;">
                        <div>Tài khoản nhận: <strong>110000008307</strong></div>
                        <div>Ngân hàng: <strong>VietinBank - CN Đống Đa</strong></div>
                        <div>Đơn vị: <strong>Học viện Ngân hàng</strong></div>
                        <div>Nội dung: <strong style="color: #004b63;">${u.username} ${u.hoTen.replace(/ /g, "")} HP HK1 26-27</strong></div>
                    </div>
                </div>
                <div class="alert alert-warning" style="font-size: 12px; margin-top: 10px; text-align: left;">
                    Hệ thống sẽ tự động gạch nợ trong vòng 15 phút sau khi giao dịch thành công. Vui lòng giữ lại biên lai chuyển khoản.
                </div>
            </div>
        `;
        this.showModal("Cổng thanh toán học phí trực tuyến", body, `
            <button type="button" class="btn btn-default" data-dismiss="modal">Đóng</button>
            <button type="button" class="btn btn-success" onclick="$('#myAlert').modal('hide'); HVNH.showToast('Giao dịch đã được ghi nhận vào hệ thống xác thực!', 'success');"><i class="glyphicon glyphicon-ok"></i> Đã hoàn tất chuyển khoản</button>
        `);
    },

    phuongThucDongHocPhi: function () {
        const body = `
            <div style="font-size: 13px; line-height: 1.8;">
                <h4 style="color: #004b63; font-weight: bold; margin-top: 0;">CÁC PHƯƠNG THỨC NỘP HỌC PHÍ TẠI HỌC VIỆN NGÂN HÀNG</h4>
                <ol style="padding-left: 20px;">
                    <li><strong>Phương thức 1 - Cổng thanh toán VietQR / Napas:</strong> Quét mã QR tự động trên Cổng thông tin sinh viên bằng ứng dụng SmartBanking của bất kỳ ngân hàng nào.</li>
                    <li><strong>Phương thức 2 - Chuyển khoản trực tiếp:</strong> Chuyển tiền vào tài khoản chuyên thu học phí của Học viện Ngân hàng tại VietinBank theo đúng cú pháp [Mã SV] [Họ tên] [Học kỳ].</li>
                    <li><strong>Phương thức 3 - Nộp tại quầy giao dịch:</strong> Nộp trực tiếp tại Phòng Tài chính - Kế toán (Tầng 1 Nhà A1, Học viện Ngân hàng, 12 Chùa Bộc, Đống Đa, Hà Nội).</li>
                </ol>
            </div>
        `;
        this.showModal("Hướng dẫn phương thức nộp học phí", body);
    },

    xemChiTietHoaDon: function (soSeries) {
        const bodyContent = document.getElementById("portalBodyContent");
        if (bodyContent) {
            bodyContent.innerHTML = this.renderPortalLoadingSpinner();
        }
    },

    submitPhucKhao: function (e) {
        if (e) e.preventDefault();
        const s = document.getElementById("selSubjectPhucKhao").value;
        const r = document.getElementById("txtReasonPhucKhao").value.trim();
        this.showToast(`Đã tiếp nhận yêu cầu phúc khảo môn ${s}!`, "success");
        if (document.getElementById("txtReasonPhucKhao")) document.getElementById("txtReasonPhucKhao").value = "";
    },

    submitVangThi: function (subject) {
        const body = `
            <div style="font-size: 13px;">
                <p>Đăng ký vắng thi kết thúc học phần: <strong>${subject}</strong></p>
                <div class="form-group">
                    <label>Lý do xin vắng thi:</label>
                    <textarea class="form-control" rows="3" placeholder="Ghi rõ lý do (Ví dụ: Ốm đau, tai nạn, lý do bất khả kháng...)" required id="txtVangThiReason"></textarea>
                </div>
                <div class="form-group">
                    <label>Tệp minh chứng đính kèm (Giấy nhập viện / Giấy xác nhận y tế):</label>
                    <input type="file" class="form-control input-sm">
                </div>
            </div>
        `;
        this.showModal("Đăng ký vắng thi học phần", body, `
            <button type="button" class="btn btn-default" data-dismiss="modal">Hủy</button>
            <button type="button" class="btn btn-danger" onclick="$('#myAlert').modal('hide'); HVNH.showToast('Gửi đơn xin vắng thi thành công!', 'success');">Gửi đăng ký</button>
        `);
    },

    nopDonXacNhan: function (e) {
        if (e) e.preventDefault();
        this.showToast("Đã gửi đơn xin giấy xác nhận sinh viên thành công!", "success");
    },

    guiGopY: function (e) {
        if (e) e.preventDefault();
        this.showToast("Cảm ơn bạn! Ý kiến đóng góp đã được gửi tới Ban Giám đốc.", "success");
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
