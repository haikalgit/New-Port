/**
 * portfolio-data.js
 * ---------------------------------------------------------
 * SATU-SATUNYA file yang perlu diedit untuk mengubah isi CV.
 * Mendukung penuh multibahasa (ID & EN).
 * ---------------------------------------------------------
 */

const PortfolioData = {
  site: {
    brandInitials: "MH",
    brandName: "M. Haikal",
    footerNote: {
      id: "Dibuat dengan HTML, CSS & JavaScript murni.",
      en: "Built with pure HTML, CSS & JavaScript."
    },
  },

  profile: {
    name: "Muhammad Haikal",
    role: "Data Analyst | Business Intelligence",
    location: "Depok, Jawa Barat, Indonesia",
    phone: "089653481723",
    email: "mhhmuhammadhaikal@gmail.com",
    linkedin: "linkedin.com/in/muhammad-haikal13",
    linkedinUrl: "https://linkedin.com/in/muhammad-haikal13",
    portfolioUrl: "https://muhammadhaikal13.vercel.app",
    greeting: {
      id: "Halo, saya",
      en: "Hello, I'm"
    },
    summary: {
      id: "Fresh graduate Sistem Informasi yang berfokus pada analitik data, business intelligence, dan machine learning. Terbiasa mengolah data mentah menjadi dashboard dan model prediktif menggunakan Python, SQL, dan Tableau — dengan satu tujuan: insight yang benar-benar bisa ditindaklanjuti.",
      en: "Information Systems fresh graduate focused on data analytics, business intelligence, and machine learning. Experienced in transforming raw data into interactive dashboards and predictive models using Python, SQL, and Tableau — with one goal: truly actionable insights."
    },
    heroPhoto: "assets/images/profile/FOTO SQUARE.jpg",
  },

  kpis: [
    { tag: { id: "IPK", en: "GPA" }, value: "3.88", label: { id: "IPK / Cumlaude", en: "GPA / Cumlaude" }, spark: [4, 8, 6, 10, 9, 12] },
    { tag: { id: "PROYEK", en: "PROJECT" }, value: "4+", label: { id: "Proyek Data & Dashboard", en: "Data & Dashboard Projects" }, spark: [2, 4, 3, 6, 8, 9] },
    { tag: { id: "SERTIFIKASI", en: "CERTIFICATIONS" }, value: "3", label: { id: "Sertifikasi Profesional", en: "Professional Certifications" }, spark: [1, 2, 2, 3, 3, 4] },
    { tag: { id: "PENGALAMAN", en: "EXPERIENCE" }, value: "2+", label: { id: "Pengalaman Profesional", en: "Professional Experience" }, spark: [1, 1, 2, 2, 3, 3] },
  ],

  skills: {
    title: {
      id: "Keterampilan Teknis & Non - Teknis",
      en: "Technical & Soft Skills"
    },
    subtitle: {
      id: "Tools dan kemampuan yang saya gunakan untuk mengubah data mentah menjadi keputusan bisnis.",
      en: "Tools and abilities I use to turn raw data into business decisions."
    },
    technicalTitle: {
      id: "Keterampilan Teknis & Alat",
      en: "Technical Skills & Tools"
    },
    softTitle: {
      id: "Keterampilan Non-Teknis",
      en: "Soft Skills"
    },
    technical: {
      id: [
        "Python", "SQL / MySQL", "Tableau", "Looker Studio",
        "Excel", "Analisis Data", "Pembersihan Data", "Machine Learning (XGBoost, Random Forest)"
      ],
      en: [
        "Python", "SQL / MySQL", "Tableau", "Looker Studio",
        "Excel", "Data Analysis", "Data Cleaning", "Machine Learning (XGBoost, Random Forest)"
      ]
    },
    soft: {
      id: [
        "Berpikir Analitis", "Pemecahan Masalah", "Ketelitian",
        "Komunikasi Teknis", "Kolaborasi Tim"
      ],
      en: [
        "Analytical Thinking", "Problem Solving", "Attention to Detail",
        "Technical Communication", "Team Collaboration"
      ]
    },
  },
  experience: [
    {
      title: { id: "Staff Administrasi", en: "Administrative Staff" },
      org: "PT Suryatata Internusa",
      period: { id: "22 Juni – Sekarang", en: "June 22 – Present" },
      location: {
        id: "Jakarta Pusat, Indonesia",
        en: "Central Jakarta, Indonesia"
      },
      logo: "assets/images/experience/sti/logo-sti.jpg",
      points: {
        id: [
          "Berkolaborasi dengan tim pengembang menggunakan aplikasi internal PROMAN untuk manajemen backlog, pelacakan tugas, dan koordinasi pengembangan.",
          "Mengembangkan dan menyempurnakan fitur untuk sistem manajemen aset dan ruang rapat menggunakan framework Laravel.",
          "Meningkatkan aksesibilitas data dengan mengimplementasikan fitur pencarian untuk mengoptimalkan penarikan informasi.",
          "Mengelola pembaruan fitur dan integrasi kode menggunakan GitLab untuk version control dan kolaborasi tim.",
        ],
        en: [
          "Collaborated with the development team using the internal PROMAN application for backlog management, task tracking, and development coordination.",
          "Developed and refined features for asset and meeting room management systems using the Laravel framework.",
          "Improved data accessibility by implementing search features to optimize information retrieval.",
          "Managed feature updates and code integration using GitLab for version control and team collaboration.",
        ]
      },
      gallery: [
        { src: "assets/images/experience/sti/foto-gedung-gbi.jpg", caption: "Dokumentasi kerja 1" },
        { src: "assets/images/experience/sti/foto-kerja-sti.jpg", caption: "Dokumentasi kerja 2" },
        { src: "assets/images/experience/sti/foto-gambar-sti.jpg", caption: "Dokumentasi kerja 3" },
        { src: "assets/images/experience/sti/gbi-malam.jpeg", caption: "Dokumentasi kerja 4" },
      ],
    },
    {
      title: { id: "Pengembang Web", en: "Web Developer" },
      org: "Dinas Cipta Karya, Tata Ruang dan Pertanahan DKI Jakarta",
      period: { id: "April – Juni 2025", en: "April – June 2025" },
      location: {
        id: "Jakarta Pusat, Indonesia",
        en: "Central Jakarta, Indonesia"
      },
      logo: "assets/images/experience/dcktrp/dcktrp.png",
      points: {
        id: [
          "Berkolaborasi dengan tim pengembang menggunakan aplikasi internal PROMAN untuk manajemen backlog, pelacakan tugas, dan koordinasi pengembangan.",
          "Mengembangkan dan menyempurnakan fitur untuk sistem manajemen aset dan ruang rapat menggunakan framework Laravel.",
          "Meningkatkan aksesibilitas data dengan mengimplementasikan fitur pencarian untuk mengoptimalkan penarikan informasi.",
          "Mengelola pembaruan fitur dan integrasi kode menggunakan GitLab untuk version control dan kolaborasi tim.",
        ],
        en: [
          "Collaborated with the development team using the internal PROMAN application for backlog management, task tracking, and development coordination.",
          "Developed and refined features for asset and meeting room management systems using the Laravel framework.",
          "Improved data accessibility by implementing search features to optimize information retrieval.",
          "Managed feature updates and code integration using GitLab for version control and team collaboration.",
        ]
      },
      gallery: [
        { src: "assets/images/experience/dcktrp/foto-serti-mentor.jpg", caption: "Dokumentasi kerja 1" },
        { src: "assets/images/experience/dcktrp/serti-intern.jpg", caption: "Dokumentasi kerja 2" },
        { src: "assets/images/experience/dcktrp/foto-mentor-intern.jpeg", caption: "Dokumentasi kerja 3" },
        { src: "assets/images/experience/dcktrp/foto-kerja-intern.jpg", caption: "Dokumentasi kerja 4" },
        { src: "assets/images/experience/dcktrp/lobby-jakarta-satu.jpeg", caption: "Dokumentasi kerja 5" },
      ],
    },
    {
      title: { id: "Pemilik Bisnis", en: "Business Owner" },
      org: "Select Fragz",
      period: { id: "Januari 2025 – Mei 2026", en: "January 2025 – May 2026" },
      location: {
        id: "Depok, Indonesia",
        en: "Depok, Indonesia"
      },
      logo: "assets/images/experience/select-fragz/sf-new-logo-tr.png",
      points: {
        id: [
          "Berkolaborasi dengan tim pengembang menggunakan aplikasi internal PROMAN untuk manajemen backlog, pelacakan tugas, dan koordinasi pengembangan.",
          "Mengembangkan dan menyempurnakan fitur untuk sistem manajemen aset dan ruang rapat menggunakan framework Laravel.",
          "Meningkatkan aksesibilitas data dengan mengimplementasikan fitur pencarian untuk mengoptimalkan penarikan informasi.",
          "Mengelola pembaruan fitur dan integrasi kode menggunakan GitLab untuk version control dan kolaborasi tim.",
        ],
        en: [
          "Collaborated with the development team using the internal PROMAN application for backlog management, task tracking, and development coordination.",
          "Developed and refined features for asset and meeting room management systems using the Laravel framework.",
          "Improved data accessibility by implementing search features to optimize information retrieval.",
          "Managed feature updates and code integration using GitLab for version control and team collaboration.",
        ]
      },
      gallery: [
        { src: "assets/images/experience/select-fragz/paket-jnt.jpeg", caption: "Dokumentasi kerja 1" },
        { src: "assets/images/experience/select-fragz/paket-hitam.jpeg", caption: "Dokumentasi kerja 2" },
        { src: "assets/images/experience/select-fragz/selfie-paket.jpeg", caption: "Dokumentasi kerja 3" },
        { src: "assets/images/experience/select-fragz/akun-tiktok.jpeg", caption: "Dokumentasi kerja 4" },
        { src: "assets/images/experience/select-fragz/menara-paket.jpeg", caption: "Dokumentasi kerja 5" },
        { src: "assets/images/experience/select-fragz/botol-kosong.jpeg", caption: "Dokumentasi kerja 6" },
        { src: "assets/images/experience/select-fragz/cut-paper-test.jpeg", caption: "Dokumentasi kerja 7" },
        { src: "assets/images/experience/select-fragz/lingkaran-paper-test.jpeg", caption: "Dokumentasi kerja 8" },
        { src: "assets/images/experience/select-fragz/live.jpeg", caption: "Dokumentasi kerja 9" },
        { src: "assets/images/experience/select-fragz/packing.jpeg", caption: "Dokumentasi kerja 10" },
        { src: "assets/images/experience/select-fragz/paket-laptop.jpeg", caption: "Dokumentasi kerja 11" },
        { src: "assets/images/experience/select-fragz/riwayat-transaksi.png", caption: "Dokumentasi kerja 12" },
        { src: "assets/images/experience/select-fragz/paket-putih.jpeg", caption: "Dokumentasi kerja 13" },
        { src: "assets/images/experience/select-fragz/vial-bottle.jpeg", caption: "Dokumentasi kerja 14" },
      ],
    },
  ],

  education: [
    {
      degree: {
        id: "Sarjana Sistem Informasi",
        en: "Bachelor of Information Systems"
      },
      institution: "Universitas Nasional, Jakarta Selatan",
      period: {
        id: "September 2022 – Mei 2026",
        en: "September 2022 – May 2026"
      },
      status: {
        id: ["Lulus", "Cumlaude"],
        en: ["Graduated", "Cumlaude"]
      },
      gpa: {
        id: "IPK: 3.88 / 4.00",
        en: "GPA: 3.88 / 4.00"
      },
      logo: "assets/images/education/logo-unas.png",
      thesis: {
        id: "\"Analisis Faktor yang Mempengaruhi Prestasi Akademik Mahasiswa Perguruan Tinggi Menggunakan Random Forest dan XGBoost\"",
        en: "\"Analysis of Factors Affecting Higher Education Student Academic Performance Using Random Forest and XGBoost\""
      },
      achievements: {
        id: [
          "Penghargaan Mahasiswa Terbaik Kedua, Program Studi Sistem Informasi Angkatan 2022 pada tahun 2022.",
          "Salah satu dari tujuh mahasiswa FTKI tercepat yang menyelesaikan program Google Cloud Career Launchpad: Generative AI Track.",
          "Profesional bersertifikat BNSP di bidang Analitik Data (Data Analytics).",
          "Membangun sistem klasifikasi performa akademik menggunakan Machine Learning (Random Forest & XGBoost).",
          "Aktif menguasai analisis data, visualisasi, serta pemrograman berbasis Object-Oriented."
        ],
        en: [
          "Second Best Student Award, Information Systems Study Program Batch 2022 in 2022.",
          "One of the seven fastest FTKI students to complete the Google Cloud Career Launchpad: Generative AI Track program.",
          "BNSP certified professional in Data Analytics.",
          "Built an academic performance classification system using Machine Learning (Random Forest & XGBoost).",
          "Actively mastered data analysis, visualization, and Object-Oriented programming."
        ]
      },
      gallery: [
        { src: "assets/images/education/mahasiswa-terbaik.png", caption: "Momen perkuliahan" },
        { src: "assets/images/education/Completed All The Courses And Labs in Google Cloud Career Launchpad Generative Ai Track.png", caption: "Momen perkuliahan" },
        { src: "assets/images/education/sertifikat-plba.jpeg", caption: "Momen perkuliahan" },
        { src: "assets/images/education/sertifikat-toefl.jpg", caption: "Momen perkuliahan" },
        { src: "assets/images/education/selesai-sempro.jpeg", caption: "Momen perkuliahan" },
        { src: "assets/images/education/pemindahan-toga.jpeg", caption: "Momen perkuliahan" },
        { src: "assets/images/education/wisuda-penyerahan-ijazah.jpeg", caption: "Momen perkuliahan" },
        { src: "assets/images/education/foto-ijazah.jpeg", caption: "Momen perkuliahan" },
      ],
    },
  ],

  certifications: [
    {
      name: { id: "Analisis Data", en: "Data Analytics" },
      issuer: "BNSP",
      year: "2026 – 2029",
      image: "assets/images/certifications/sertifikat-bnsp.jpg",
    },
    {
      name: { id: "Analisis Data", en: "Data Analytics" },
      issuer: "Certiport",
      year: "2025 – 2030",
      image: "assets/images/certifications/sertifikat-certiport.jpg",
    },
    {
      name: { id: "Fondasi Komputasi Google Cloud", en: "Google Cloud Computing Foundations" },
      issuer: "Google Cloud",
      year: "2025",
      image: "assets/images/certifications/sertifikat-cloud.png",
    },
  ],
  
  bootcamps: [
    {
      name: { id: "Bootcamp Analisis Data", en: "Data Analytics Bootcamp" },
      issuer: "KarirNex",
      year: "2026",
      image: "assets/images/certifications/bootcamp/bootcamp-karirnex.jpg", 
    },
    {
      name: { id: "Bootcamp Analisis Data", en: "Data Analytics Bootcamp" },
      issuer: "RevoU",
      year: "2026",
      image: "assets/images/certifications/bootcamp/bootcamp-revou.jpg", 
    },
  ],

  seminarsRow1: [
    { name: "seminar ai", image: "assets/images/certifications/seminar/seminar-ai.png" },
    { name: "seminar bi", image: "assets/images/certifications/seminar/seminar-bi.jpg" },
    { name: "seminar datadriven", image: "assets/images/certifications/seminar/seminar-datadriven.jpg" },
    { name: "seminar nocode", image: "assets/images/certifications/seminar/seminar-nocode.png" },
    { name: "seminar sar", image: "assets/images/certifications/seminar/seminar-sar.jpg" },
  ],

  seminarsRow2: [
    { name: "seminar kickandy", image: "assets/images/certifications/seminar/seminar-kickandy.jpg" },
    { name: "seminar personalbranding", image: "assets/images/certifications/seminar/seminar-personalbranding.png" },
    { name: "seminar si-deeplearning", image: "assets/images/certifications/seminar/seminar-si-deeplearning.jpg" },
    { name: "seminar workshop", image: "assets/images/certifications/seminar/workshop.jpg" },
  ],

  projects: [
    {
      title: { id: "Dashboard Analisis Penjualan Furnitur", en: "Furniture Sales Analytics Dashboard" },
      tool: "Looker Studio",
      date: { id: "Mei 2026", en: "May 2026" },
      course: "Bootcamp KarirNex",
      description: {
        id: "Dashboard interaktif untuk memonitor performa penjualan furniture dan KPI bisnis tahun 2025, lengkap dengan filter dinamis berdasarkan kategori, kota, produk, status order, dan periode penjualan.",
        en: "Interactive dashboard to monitor furniture sales performance and business KPIs for 2025, complete with dynamic filters based on category, city, product, order status, and sales period."
      },
      image: "assets/images/projects/project-1.png",
      link: "#",
    },
    {
      title: { id: "Dashboard Pemantauan Performa Akademik", en: "Academic Performance Monitoring Dashboard" },
      tool: "Streamlit & ML",
      date: { id: "Des 2025 – Feb 2026", en: "Dec 2025 – Feb 2026" },
      course: { id: "Proyek Akhir", en: "Final Project" },
      description: {
        id: "Sistem klasifikasi performa akademik mahasiswa menggunakan Random Forest dan XGBoost, disertai dashboard Streamlit interaktif untuk visualisasi data akademik dan analisis faktor yang memengaruhi IPK.",
        en: "Student academic performance classification system using Random Forest and XGBoost, accompanied by an interactive Streamlit dashboard for academic data visualization and GPA influencing factor analysis."
      },
      image: "assets/images/projects/project-2.jpg",
      link: "#",
    },
    {
      title: { id: "Dashboard Analisis & Visualisasi Data Bisnis", en: "Business Data Analytics and Visualization Dashboard" },
      tool: "Tableau",
      date: { id: "April – Juli 2025", en: "April – July 2025" },
      course: { id: "Intelijen Bisnis", en: "Business Intelligence" },
      description: {
        id: "Dashboard Tableau interaktif untuk menganalisis performa bisnis dan memvisualisasikan data terstruktur, termasuk proses data cleaning dan transformasi untuk menjaga kualitas serta konsistensi data.",
        en: "Interactive Tableau dashboard to analyze business performance and visualize structured data, including data cleaning and transformation processes to maintain data quality and consistency."
      },
      image: "assets/images/projects/project-3.jpg",
      link: "#",
    },
    {
      title: { id: "Aplikasi Manajemen Toko Kelontong", en: "Grocery Store Management Application" },
      tool: "Java Swing & MySQL",
      date: { id: "Mei – Juli 2024", en: "May – July 2024" },
      course: { id: "Pemrograman Berorientasi Objek", en: "Object-Oriented Programming" },
      description: {
        id: "Aplikasi desktop manajemen transaksi dan inventaris toko kelontong dengan fungsi CRUD lengkap, dibangun menerapkan prinsip pemrograman berorientasi objek untuk struktur kode yang rapi dan mudah dirawat.",
        en: "Grocery store transaction and inventory management desktop application with complete CRUD functions, built applying object-oriented programming principles for clean and maintainable code structures."
      },
      image: "assets/images/projects/project-4.jpg",
      link: "#",
    },
  ],

  cv: {
    fileName: "CV_MuhammadHaikal_DA.pdf",
    filePath: "documents/CV_MuhammadHaikal_DA.pdf",
    // 1. Ubah namanya menjadi previewImages
    // 2. Gunakan tanda kurung siku [ ] dan pisahkan dengan koma
    previewImages: [
      ["documents/CV_MuhammadHaikal_DA_Page1.jpg"], 
      ["documents/CV_MuhammadHaikal_DA_Page2.jpg"],
    ],
  },
};