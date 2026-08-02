/**
 * portfolio-data.js
 * ---------------------------------------------------------
 * SATU-SATUNYA file yang perlu diedit untuk mengubah isi CV.
 * Ganti teks & path gambar di sini — layout & style tidak perlu disentuh.
 *
 * Semua path gambar bersifat RELATIF terhadap index.html.
 * Cukup taruh file gambar Anda pada folder yang sesuai lalu
 * ganti nilai string di bawah ini. Jika file belum ada,
 * placeholder otomatis akan tampil (lihat ImageFallback.js).
 * ---------------------------------------------------------
 */

const PortfolioData = {
  site: {
    brandInitials: "MH",
    brandName: "M. Haikal",
    footerNote: "Dibuat dengan HTML, CSS & JavaScript murni.",
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
    summary:
      "Fresh graduate Sistem Informasi yang berfokus pada analitik data, business intelligence, dan machine learning. Terbiasa mengolah data mentah menjadi dashboard dan model prediktif menggunakan Python, SQL, dan Tableau — dengan satu tujuan: insight yang benar-benar bisa ditindaklanjuti.",
    heroPhoto: "assets/images/profile/FOTO SQUARE.jpg",
  },

  kpis: [
    { tag: "GPA", value: "3.88", label: "IPK / Cumlaude", spark: [4, 8, 6, 10, 9, 12] },
    { tag: "PROJECT", value: "4+", label: "Proyek Data & Dashboard", spark: [2, 4, 3, 6, 8, 9] },
    { tag: "CERTIFICATIONS", value: "3", label: "Sertifikasi Profesional", spark: [1, 2, 2, 3, 3, 4] },
    { tag: "EXPERIENCE", value: "2+", label: "Pengalaman Profesional", spark: [1, 1, 2, 2, 3, 3] },
  ],

  skills: {
    technical: [
      "Python", "SQL / MySQL", "Tableau", "Looker Studio",
      "Excel", "Data Analysis", "Data Cleaning", "Machine Learning (XGBoost, Random Forest)",
    ],
    soft: [
      "Analytical Thinking", "Problem Solving", "Attention to Detail",
      "Technical Communication", "Team Collaboration",
    ],
  },

  experience: [

    {
      title: "Staff Administrasi",
      org: "PT Suryatata Internusa",
      period: "22 Juni – Present",
      location: "Jakarta Pusat, Indonesia",
      logo: "assets/images/experience/logo-sti.jpg",
      points: [
        "Berkolaborasi dengan tim pengembang menggunakan aplikasi internal PROMAN untuk manajemen backlog, pelacakan tugas, dan koordinasi pengembangan.",
        "Mengembangkan dan menyempurnakan fitur untuk sistem manajemen aset dan ruang rapat menggunakan framework Laravel.",
        "Meningkatkan aksesibilitas data dengan mengimplementasikan fitur pencarian untuk mengoptimalkan penarikan informasi.",
        "Mengelola pembaruan fitur dan integrasi kode menggunakan GitLab untuk version control dan kolaborasi tim.",
      ],
      gallery: [
        { src: "assets/images/experience/foto-gedung-gbi.jpg", caption: "Dokumentasi kerja 1" },
        { src: "assets/images/experience/foto-kerja-sti.jpg", caption: "Dokumentasi kerja 2" },
        { src: "assets/images/experience/foto-gambar-sti.jpg", caption: "Dokumentasi kerja 3" },
        { src: "assets/images/experience/gbi-malam.jpeg", caption: "Dokumentasi kerja 4" },
      ],
    },
    
    {
      title: "Web Developer Intern",
      org: "Dinas Cipta Karya, Tata Ruang dan Pertanahan DKI Jakarta",
      period: "April – Juni 2025",
      location: "Jakarta Pusat, Indonesia",
      logo: "assets/images/experience/dcktrp.png",
      points: [
        "Berkolaborasi dengan tim pengembang menggunakan aplikasi internal PROMAN untuk manajemen backlog, pelacakan tugas, dan koordinasi pengembangan.",
        "Mengembangkan dan menyempurnakan fitur untuk sistem manajemen aset dan ruang rapat menggunakan framework Laravel.",
        "Meningkatkan aksesibilitas data dengan mengimplementasikan fitur pencarian untuk mengoptimalkan penarikan informasi.",
        "Mengelola pembaruan fitur dan integrasi kode menggunakan GitLab untuk version control dan kolaborasi tim.",
      ],
      gallery: [
        { src: "assets/images/experience/foto-serti-mentor.jpg", caption: "Dokumentasi kerja 1" },
        { src: "assets/images/experience/serti-intern.jpg", caption: "Dokumentasi kerja 2" },
        { src: "assets/images/experience/foto-mentor-intern.jpeg", caption: "Dokumentasi kerja 3" },
        { src: "assets/images/experience/foto-kerja-intern.jpg", caption: "Dokumentasi kerja 4" },
        { src: "assets/images/experience/lobby-jakarta-satu.jpeg", caption: "Dokumentasi kerja 4" },
      ],
    },

  ],

  education: [
    {
      degree: "Bachelor of Information Systems",
      institution: "Universitas Nasional, Jakarta Selatan",
      period: "September 2022 – May 2026",
      status: ["Lulus", "Cumlaude"],
      gpa: "GPA: 3.88 / 4.00",
      logo: "assets/images/education/logo-unas.png",
      thesis:
        "\"Analisis Faktor yang Mempengaruhi Prestasi Akademik Mahasiswa Perguruan Tinggi Menggunakan Random Forest dan XGBoost\"",
      achievements: [
        "Penghargaan Mahasiswa Terbaik Kedua, Program Studi Sistem Informasi Angkatan 2022 pada tahun 2022.",
        "Salah satu dari tujuh mahasiswa FTKI tercepat yang menyelesaikan program Google Cloud Career Launchpad: Generative AI Track.",
        "Profesional bersertifikat BNSP di bidang Analitik Data (Data Analytics).",
        "Membangun sistem klasifikasi performa akademik menggunakan Machine Learning (Random Forest & XGBoost).",
        "Aktif menguasai analisis data, visualisasi, serta pemrograman berbasis Object-Oriented.",
      ],
      gallery: [
        { src: "assets/images/education/mahasiswa-terbaik.png", caption: "Momen semasa perkuliahan & presentasi" },
        { src: "assets/images/education/Completed All The Courses And Labs in Google Cloud Career Launchpad Generative Ai Track.png", caption: "Momen semasa perkuliahan & presentasi" },
        { src: "assets/images/education/wisuda-penyerahan-ijazah.jpg", caption: "Momen semasa perkuliahan & presentasi" },
      ],
    },
  ],

certifications: [
    {
      name: "Data Analytics",
      issuer: "BNSP",
      year: "2026 – 2029",
      image: "assets/images/certifications/sertifikat-bnsp.jpg",
    },
    {
      name: "Data Analytics",
      issuer: "Certiport",
      year: "2025 – 2030",
      image: "assets/images/certifications/sertifikat-certiport.jpg",
    },
    {
      name: "Google Cloud Computing Foundations",
      issuer: "Google Cloud",
      year: "2025",
      image: "assets/images/certifications/sertifikat-cloud.png",
    },
  ], // <-- Perhatikan kurung siku penutup array certifications ada di sini
  
  bootcamps: [
    {
      name: "Bootcamp Data Analytics",
      issuer: "KarirNex",
      year: "2025",
      image: "assets/images/certifications/sertifikat-bnsp.jpg", 
    },
    // Anda bisa menambah data bootcamp lainnya di sini
  ],
  
  seminars: [
    {
      name: "Webinar: AI in Business Analytics",
      issuer: "Tech Platform",
      year: "2024",
      image: "assets/images/certifications/sertifikat-bnsp.jpg", 
    },
    // Anda bisa menambah data seminar lainnya di sini
  ],

  projects: [
    {
      title: "Furniture Sales Analytics Dashboard",
      tool: "Looker Studio",
      date: "Mei 2026",
      course: "Bootcamp KarirNex",
      description:
        "Dashboard interaktif untuk memonitor performa penjualan furniture dan KPI bisnis tahun 2025, lengkap dengan filter dinamis berdasarkan kategori, kota, produk, status order, dan periode penjualan.",
      image: "assets/images/projects/furniture-sales-dashboard.jpg",
      link: "#",
    },
    {
      title: "Academic Performance Monitoring Dashboard",
      tool: "Streamlit & Machine Learning",
      date: "Des 2025 – Feb 2026",
      course: "Final Project",
      description:
        "Sistem klasifikasi performa akademik mahasiswa menggunakan Random Forest dan XGBoost, disertai dashboard Streamlit interaktif untuk visualisasi data akademik dan analisis faktor yang memengaruhi IPK.",
      image: "assets/images/projects/academic-performance-dashboard.jpg",
      link: "#",
    },
    {
      title: "Business Data Analytics and Visualization Dashboard",
      tool: "Tableau",
      date: "April – Juli 2025",
      course: "Business Intelligence",
      description:
        "Dashboard Tableau interaktif untuk menganalisis performa bisnis dan memvisualisasikan data terstruktur, termasuk proses data cleaning dan transformasi untuk menjaga kualitas serta konsistensi data.",
      image: "assets/images/projects/business-analytics-dashboard.jpg",
      link: "#",
    },
    {
      title: "Grocery Store Management Application",
      tool: "Java Swing & MySQL",
      date: "Mei – Juli 2024",
      course: "Object-Oriented Programming",
      description:
        "Aplikasi desktop manajemen transaksi dan inventaris toko kelontong dengan fungsi CRUD lengkap, dibangun menerapkan prinsip pemrograman berorientasi objek untuk struktur kode yang rapi dan mudah dirawat.",
      image: "assets/images/projects/grocery-store-app.jpg",
      link: "#",
    },
  ],

  cv: {
    fileName: "CV_MuhammadHaikal_DA.pdf",
    filePath: "documents/CV_MuhammadHaikal_DA.pdf",
  },
};
