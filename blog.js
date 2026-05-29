/* ==========================================================================
   Javascript Blog CRUD & Interaction System for L-Roomey Travel
   ========================================================================== */

// 1. DEFAULT PRE-SEEDED ARTICLES
const DEFAULT_ARTICLES = [
    {
        id: "default-1",
        title: "5 Tips Perjalanan Nyaman & Aman Bersama Travel Eksekutif",
        excerpt: "Perjalanan jarak jauh terkadang melelahkan. Temukan tips cerdas menjaga tubuh tetap bugar dan nyaman selama perjalanan Kediri - Surabaya PP.",
        category: "Tips Wisata",
        author: "Admin L-Roomey",
        date: "29 Mei 2026",
        content: "Perjalanan darat yang menempuh jarak jauh, seperti rute Kediri ke Surabaya atau sebaliknya, memerlukan persiapan agar tetap terasa nyaman. Bagi Anda yang sering bepergian menggunakan jasa travel eksekutif, ada beberapa tips sederhana namun penting untuk diperhatikan.\n\nPertama, pilihlah jadwal keberangkatan yang sesuai dengan ritme tubuh Anda. Jika ingin beristirahat selama perjalanan, jadwal malam atau dini hari adalah waktu yang tepat. Kedua, bawalah barang bawaan secukupnya. Armada premium seperti Toyota Hiace atau Innova Reborn dari L-Roomey Travel memang memiliki bagasi luas, namun menyusun barang bawaan dengan efisien akan sangat membantu proses bongkar muat.\n\nKetiga, jangan lupa membawa botol air minum pribadi dan beberapa camilan ringan. Meskipun L-Roomey Travel menyediakan air mineral gratis, membawa hidrasi tambahan selalu menjadi langkah bijak. Terakhir, pakailah pakaian yang longgar dan nyaman agar sirkulasi udara tubuh Anda tetap terjaga dengan baik. Nikmati perjalanan Anda bersama driver profesional kami yang ramah dan siap mengantar sampai tujuan.",
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80",
        isDefault: true
    },
    {
        id: "default-2",
        title: "Destinasi Wisata Alam Populer di Malang Raya yang Wajib Dikunjungi",
        excerpt: "Malang selalu punya daya tarik wisata alam yang magis. Simak rujukan tempat wisata alam terpopuler yang wajib masuk list liburan Anda.",
        category: "Destinasi",
        author: "Lintang Kirana",
        date: "25 Mei 2026",
        content: "Kota Malang dan Batu di Jawa Timur telah lama menjadi magnet bagi para pecinta traveling. Dengan udara pegunungan yang sejuk serta panorama alam yang menakjubkan, tidak mengherankan jika Malang Raya selalu ramai dikunjungi saat akhir pekan.\n\nSalah satu destinasi wisata alam yang paling legendaris tentu saja Gunung Bromo. Anda bisa menikmati keindahan matahari terbit di penanjakan, melintasi pasir berbisik, dan menaiki kawah Bromo yang megah. Jika Anda menyukai keindahan air terjun, Coban Rondo dan Coban Sewu menawarkan pemandangan tebing hijau eksotis dengan aliran air yang sangat menyegarkan.\n\nBagi keluarga yang ingin berlibur dengan santai, area perkebunan apel di Kota Batu menawarkan pengalaman memetik buah segar langsung dari pohonnya. L-Roomey Travel siap mengantarkan Anda sekeluarga dari Kediri menuju Malang Kota maupun Batu dengan armada prima, aman, dan tanpa lelah menyetir sendiri.",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80",
        isDefault: true
    },
    {
        id: "default-3",
        title: "Kuliner Khas Kediri Terpopuler yang Menggugah Selera",
        excerpt: "Berkunjung ke Kediri kurang lengkap tanpa mencoba kuliner legendarisnya. Berikut rekomendasi kuliner Kediri yang wajib Anda coba.",
        category: "Kuliner",
        author: "Rian Hidayat",
        date: "22 Mei 2026",
        content: "Kediri tidak hanya dikenal sebagai kota sejarah dan industri, tetapi juga sebagai surga kuliner tradisional Jawa Timur. Jika Anda berkunjung ke kota ini, bersiaplah untuk memanjakan lidah Anda dengan cita rasa autentik yang sulit dilupakan.\n\nKuliner pertama yang wajib dicoba adalah Nasi Pecel Tumpang. Berbeda dengan pecel pada umumnya, pecel tumpang Kediri disajikan dengan siraman kuah sambal tumpang yang terbuat dari tempe semangit (tempe yang difermentasi). Cita rasa gurih, pedas, dan aroma khasnya berpadu sempurna dengan sayuran segar dan rempeyek renyah.\n\nSelain itu, Kediri juga sangat terkenal dengan Tahu Takwa dan Tahu Pong. Tahu kuning khas ini memiliki tekstur padat namun sangat lembut di dalam. Sangat cocok dinikmati hangat-hangat bersama cabai rawit hijau atau dijadikan oleh-oleh keluarga di rumah. L-Roomey Travel selalu siap melayani penjemputan dari Surabaya atau Malang bagi Anda yang rindu mencicipi kuliner khas kota Kediri ini.",
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
        isDefault: true
    }
];

// App State
let articles = [];
let activeCategory = "semua";
let searchQuery = "";
let uploadedImageBase64 = "";

// Wait until DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    initNavbar();
    initBlogDatabase();
    initBlogUI();
    initArticleCreation();
});

// --- NAVBAR INITIALIZATION (Matches main script.js) ---
function initNavbar() {
    const navbar = document.getElementById("navbar");
    const hamburgerBtn = document.getElementById("hamburgerBtn");
    const navMenu = document.getElementById("navMenu");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            // Keep scrolled color on blog page for better readability since header is short
            navbar.classList.add("scrolled");
        }
    });

    // Mobile Hamburger Toggle
    hamburgerBtn.addEventListener("click", () => {
        hamburgerBtn.classList.toggle("open");
        navMenu.classList.toggle("open");
    });

    // Close mobile menu if clicked outside
    document.addEventListener("click", (e) => {
        if (!hamburgerBtn.contains(e.target) && !navMenu.contains(e.target)) {
            hamburgerBtn.classList.remove("open");
            navMenu.classList.remove("open");
        }
    });
}

// --- DATABASE LOCAL STORAGE INITIALIZATION ---
function initBlogDatabase() {
    const savedArticles = localStorage.getItem("lroomey_blog_articles");
    if (savedArticles) {
        try {
            articles = JSON.parse(savedArticles);
        } catch (e) {
            console.error("Gagal membaca local storage, memuat ulang artikel bawaan.");
            articles = [...DEFAULT_ARTICLES];
            saveArticlesToStorage();
        }
    } else {
        // Pre-seed database
        articles = [...DEFAULT_ARTICLES];
        saveArticlesToStorage();
    }
}

function saveArticlesToStorage() {
    localStorage.setItem("lroomey_blog_articles", JSON.stringify(articles));
}

// --- BLOG GRID RENDERER & FILTERS ---
function initBlogUI() {
    const blogGrid = document.getElementById("blogGrid");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const searchInput = document.getElementById("blogSearch");

    // Initial render
    renderArticles();

    // 1. Category Filtering
    categoryButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            categoryButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            activeCategory = btn.getAttribute("data-category");
            renderArticles();
        });
    });

    // 2. Search Text Filtering
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderArticles();
    });

    // 3. Close Modals on Outer Click
    const modals = document.querySelectorAll(".blog-modal");
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                closeAllModals();
            }
        });
    });

    // Modal Close Button Handlers
    document.getElementById("closeWriteModal").addEventListener("click", closeAllModals);
    document.getElementById("closeReadModal").addEventListener("click", closeAllModals);
}

function renderArticles() {
    const blogGrid = document.getElementById("blogGrid");
    if (!blogGrid) return;

    blogGrid.innerHTML = "";

    // Filter logic
    const filtered = articles.filter(article => {
        const matchesCategory = activeCategory === "semua" || article.category === activeCategory;
        const matchesSearch = article.title.toLowerCase().includes(searchQuery) ||
                             article.excerpt.toLowerCase().includes(searchQuery) ||
                             article.content.toLowerCase().includes(searchQuery) ||
                             article.author.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        blogGrid.innerHTML = `
            <div class="blog-empty-state">
                <div class="blog-empty-icon"><i class="fas fa-newspaper"></i></div>
                <h4 class="blog-empty-title">Artikel Tidak Ditemukan</h4>
                <p class="blog-empty-desc">Coba gunakan kata kunci pencarian lain atau pilih kategori yang berbeda.</p>
            </div>
        `;
        return;
    }

    // Render cards
    filtered.forEach(article => {
        const card = document.createElement("div");
        card.className = "blog-card reveal-item revealed";
        
        // Show delete button only if it is NOT a pre-seeded article
        const deleteButtonHTML = !article.isDefault ? `
            <button class="blog-delete-btn" onclick="deleteArticle('${article.id}', event)" title="Hapus Artikel">
                <i class="fas fa-trash-alt"></i>
            </button>
        ` : "";

        card.innerHTML = `
            <div class="blog-card-img-wrapper">
                <span class="blog-card-category">${article.category}</span>
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            </div>
            <div class="blog-card-info">
                <div class="blog-card-meta">
                    <span><i class="fas fa-user"></i> ${article.author}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${article.date}</span>
                </div>
                <h3 class="blog-card-title">${article.title}</h3>
                <p class="blog-card-excerpt">${article.excerpt}</p>
                <div class="blog-card-footer">
                    <a href="javascript:void(0)" onclick="readArticle('${article.id}')" class="blog-read-btn">
                        Baca Selengkapnya <i class="fas fa-arrow-right"></i>
                    </a>
                    ${deleteButtonHTML}
                </div>
            </div>
        `;
        blogGrid.appendChild(card);
    });
}

// --- READ ARTICLE DETAIL (VIEW) ---
window.readArticle = function(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;

    const modal = document.getElementById("readModal");
    
    // Set content
    document.getElementById("readModalCategory").textContent = article.category.toUpperCase();
    document.getElementById("readModalImg").src = article.image;
    document.getElementById("readModalAuthor").textContent = article.author;
    document.getElementById("readModalDate").textContent = article.date;
    document.getElementById("readModalTitle").textContent = article.title;
    
    // Convert newlines in content to HTML paragraphs
    const paragraphsHTML = article.content.split("\n\n")
        .map(para => `<p>${para.replace(/\n/g, "<br>")}</p>`)
        .join("");
    document.getElementById("readModalContent").innerHTML = paragraphsHTML;

    // Open modal
    modal.classList.add("open");
    document.body.style.overflow = "hidden"; // disable background scroll
};

// --- ARTICLE CREATION (CREATE) ---
function initArticleCreation() {
    const floatingAddBtn = document.getElementById("floatingAddBtn");
    const writeModal = document.getElementById("writeModal");
    const form = document.getElementById("writeArticleForm");
    const fileInput = document.getElementById("postImageFile");
    const previewBox = document.getElementById("imagePreviewBox");
    const previewImg = document.getElementById("imagePreview");

    // Open Form Modal
    floatingAddBtn.addEventListener("click", () => {
        writeModal.classList.add("open");
        document.body.style.overflow = "hidden";
    });

    // Image Upload Base64 conversion
    fileInput.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            // Validate file size (limit base64 storage in localStorage, limit to ~1.5MB to be safe)
            if (file.size > 1500000) {
                alert("Ukuran gambar terlalu besar! Harap pilih gambar di bawah 1.5MB demi kenyamanan performa website.");
                fileInput.value = "";
                previewBox.style.display = "none";
                uploadedImageBase64 = "";
                return;
            }

            const reader = new FileReader();
            reader.onload = function(event) {
                uploadedImageBase64 = event.target.result;
                previewImg.src = uploadedImageBase64;
                previewBox.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Form Submit Handler
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const title = document.getElementById("postTitle").value.trim();
        const author = document.getElementById("postAuthor").value.trim();
        const category = document.getElementById("postCategory").value;
        const excerpt = document.getElementById("postExcerpt").value.trim();
        const content = document.getElementById("postContent").value.trim();

        if (!uploadedImageBase64) {
            alert("Harap unggah gambar untuk artikel Anda.");
            return;
        }

        // Generate date format: e.g. "29 Mei 2026"
        const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
        const today = new Date();
        const formattedDate = `${today.getDate()} ${months[today.getMonth()]} ${today.getFullYear()}`;

        // Create new article object
        const newArticle = {
            id: "user-" + Date.now(),
            title: title,
            excerpt: excerpt,
            category: category,
            author: author,
            date: formattedDate,
            content: content,
            image: uploadedImageBase64,
            isDefault: false
        };

        // Add to the beginning of the articles list
        articles.unshift(newArticle);
        saveArticlesToStorage();

        // UI Reset & Close Modal
        form.reset();
        previewBox.style.display = "none";
        previewImg.src = "";
        uploadedImageBase64 = "";
        closeAllModals();

        // Render articles list again
        renderArticles();

        // Alert Success
        alert("Artikel Anda berhasil dipublikasikan!");
    });
}

// --- DELETE ARTICLE (DELETE) ---
window.deleteArticle = function(id, event) {
    // Prevent event bubbling to article reading
    if (event) {
        event.stopPropagation();
    }

    const confirmDelete = confirm("Apakah Anda yakin ingin menghapus artikel ini?");
    if (!confirmDelete) return;

    // Filter out the article
    articles = articles.filter(a => a.id !== id);
    saveArticlesToStorage();

    // Rerender list
    renderArticles();
};

// --- MODAL UTILITIES ---
function closeAllModals() {
    const modals = document.querySelectorAll(".blog-modal");
    modals.forEach(modal => modal.classList.remove("open"));
    document.body.style.overflow = ""; // restore scroll
}
