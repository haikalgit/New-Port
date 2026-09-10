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
        id: "Bandung, Indonesia",
        en: "Bandung, Indonesia"
      },
      logo: "assets/images/experience/sti/logo-sti.jpg",
      points: {
        id: [
          "Mengelola administrasi internal, pengarsipan dokumen, serta pengaturan jadwal operasional perusahaan.",
          "Menyusun laporan berkala, berita acara, dokumentasi proyek, dan laporan administrasi keuangan untuk kebutuhan manajemen.",
          "Mengelola proses administrasi penggajian karyawan, mulai dari perhitungan hingga distribusi gaji.",
          "Mengelola dan menyesuaikan layout gambar teknis proyek, termasuk pengeditan serta penyesuaian format sesuai kebutuhan pekerjaan",
        ],
        en: [
          "Manage internal administration, document filing, and operational scheduling to support the company’s daily activities.",
          "Prepare periodic reports, official meeting records, project documentation, and financial administrative reports for management purposes.",
          "Manage employee payroll administration, including salary calculations, verification, and distribution.",
          "Manage and adjust technical drawing layouts for project requirements, including editing and formatting to meet project specifications.",
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
          "Mengelola bisnis online yang bergerak di bidang parfum dengan fokus pada penjualan parfum decant melalui platform e-commerce dan media sosial.",
          "Mengelola seluruh operasional bisnis secara mandiri, mulai dari pengadaan produk, pengelolaan stok, pemrosesan pesanan, pengemasan, hingga pengiriman.",
          "Mengelola katalog produk pada platform e-commerce, termasuk deskripsi produk, harga, foto produk, dan materi promosi.",
          "Membuat dan mengedit konten visual seperti poster produk, katalog, dan materi promosi untuk mendukung kegiatan pemasaran digital.",
          "Mengembangkan dan mengelola konten TikTok untuk meningkatkan brand awareness, menjangkau calon pelanggan, dan mempromosikan produk.",
          "Mengelola sesi TikTok Live untuk memperkenalkan produk, berinteraksi dengan pelanggan, menjawab pertanyaan, dan meningkatkan penjualan secara langsung.",
          "Memantau penjualan, persediaan produk, respons pelanggan, serta tren pasar untuk mendukung pertumbuhan dan pengembangan bisnis.",
        ],
        en: [
          "Manage an online fragrance business specializing in decant perfumes through e-commerce platforms and social media.",
          "Handle end-to-end business operations, including product sourcing, inventory management, order processing, packaging, and fulfillment.",
          "Manage e-commerce product listings, including product descriptions, pricing, product photos, and promotional materials.",
          "Create and edit visual content, including product posters, catalogs, and promotional designs to support digital marketing activities.",
          "Develop and manage TikTok content to increase brand awareness, engage potential customers, and promote products.",
          "Host TikTok Live sessions to showcase products, interact with customers, answer inquiries, and drive direct sales.",
          "Monitor sales performance, inventory, customer feedback, and market trends to support business growth and improve overall operations.",
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
          "Penghargaan Mahasiswa Terbaik Kedua, Program Studi Sistem Informasi Angkatan 2022 (2023).",
          "Salah satu dari tujuh mahasiswa FTKI tercepat yang menyelesaikan program Google Cloud Career Launchpad: Generative AI Track.",
          "Profesional bersertifikat BNSP di bidang Analitik Data (Data Analytics).",
          "Membangun sistem klasifikasi performa akademik menggunakan Machine Learning (Random Forest & XGBoost).",
          "Aktif menguasai analisis data, visualisasi, serta pemrograman berbasis Object-Oriented."
        ],
        en: [
          "Second Best Student Award, Information Systems Study Program Batch 2022 (2023).",
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
    title: { 
      id: "Personal Finance Dashboard", 
      en: "Personal Finance Dashboard" 
    },
    tool: "Looker Studio & Spreadsheet",
    date: { 
      id: "Juli – Agustus 2026", 
      en: "July – August 2026" 
    },
    course: { 
      id: "Proyek Pribadi", 
      en: "Private Project" 
    },
    description: {
      id: "Dashboard interaktif multi-halaman untuk memonitor kesehatan finansial pribadi. Dilengkapi fitur visualisasi cashflow, pengawasan budget harian/bulanan, dan pelacakan tabungan secara terintegrasi.",
      en: "Interactive multi-page dashboard for monitoring personal financial health. Features cashflow visualizations, daily/monthly budget oversight, and integrated savings tracking."
    },

    gallery: [
      { 
        src: "assets/images/projects/project-3/page-1.jpg", 
        caption: { 
          id: "Halaman Utama (Overview)", 
          en: "Main Page (Overview)" 
        },
        description: {
          id: "Menampilkan ringkasan arus kas dan sisa saldo. Bagian ini memberikan gambaran cepat mengenai total pemasukan dan pengeluaran serta kondisi keuangan pada periode berjalan.",
          en: "Shows a summary of cash flow and remaining balance. This section provides a quick overview of total income, expenses, and financial condition for the current period."
        }
      },
      { 
        src: "assets/images/projects/project-3/page-2.jpg", 
        caption: { 
          id: "Analisis Pengeluaran Bulanan", 
          en: "Monthly Expense Analysis" 
        },
        description: {
          id: "Visualisasi interaktif yang menganalisis pengeluaran berdasarkan kategori transaksi dan tren pengeluaran untuk membantu mengidentifikasi pos pengeluaran terbesar.",
          en: "Interactive visualization that analyzes expenses by transaction category and spending trends to help identify the largest expense categories."
        }
      },
      { 
        src: "assets/images/projects/project-3/page-3.jpg", 
        caption: { 
          id: "Pelacakan Target Tabungan", 
          en: "Savings Target Tracking" 
        },
        description: {
          id: "Modul untuk memantau perkembangan target tabungan dan alokasi dana melalui indikator persentase dan visualisasi progres.",
          en: "A module for monitoring savings targets and fund allocation through percentage indicators and progress visualizations."
        }
      }
    ],

    details: {
      objective: {
        id: "Membangun sistem pelacakan keuangan pribadi yang terpusat untuk mengelola arus kas, mengontrol pengeluaran, dan memantau pencapaian target tabungan.",
        en: "To build a centralized personal finance tracking system to manage cash flow, control expenses, and monitor savings target achievement."
      },

      specifications: {
        id: [
          "Sumber Data: Google Sheets dengan pencatatan manual harian.",
          "Platform Visualisasi: Google Looker Studio.",
          "Fitur Utama: Filter rentang tanggal dinamis, perbandingan MoM, dan grafik sparkline."
        ],
        en: [
          "Data Source: Google Sheets with daily manual entry.",
          "Visualization Platform: Google Looker Studio.",
          "Key Features: Dynamic date range filters, MoM comparison, and sparkline charts."
        ]
      },

      result: {
        id: "Berhasil memberikan visibilitas yang lebih jelas terhadap arus kas, pengeluaran, dan perkembangan tabungan melalui satu dashboard terintegrasi.",
        en: "Successfully provided clearer visibility into cash flow, expenses, and savings progress through a single integrated dashboard."
      }
    }
  },

  {
    title: { 
      id: "Dashboard Analisis Penjualan Furniture", 
      en: "Furniture Sales Analytics Dashboard" 
    },
    tool: "Looker Studio & BigQuery",
    date: { 
      id: "Mei 2026", 
      en: "May 2026" 
    },
    course: { 
      id: "Bootcamp KarirNex", 
      en: "Bootcamp KarirNex" 
    },
    description: {
      id: "Dashboard interaktif untuk menganalisis performa penjualan furniture berdasarkan jumlah order, pendapatan, status pesanan, wilayah, tren penjualan bulanan, dan performa produk.",
      en: "Interactive dashboard for analyzing furniture sales performance based on order volume, revenue, order status, geographic performance, monthly sales trends, and product performance."
    },

    gallery: [
      { 
        src: "assets/images/projects/project-2/page-1.png", 
        caption: { 
          id: "Dashboard Performa Penjualan", 
          en: "Sales Performance Dashboard" 
        },
        description: {
          id: "Menampilkan ringkasan performa penjualan melalui metrik Average Order, Total Order, Completion Rate, dan Total Revenue. Dashboard juga menyajikan pendapatan berdasarkan kota, tren jumlah order bulanan, serta daftar produk dengan jumlah order dan total penjualan tertinggi.",
          en: "Presents an overview of sales performance through Average Order, Total Order, Completion Rate, and Total Revenue metrics. The dashboard also shows revenue by city, monthly order trends, and products with the highest order volume and total sales."
        }
      }
    ],

    details: {
      objective: {
        id: "Membangun dashboard analitik untuk memantau performa penjualan secara menyeluruh serta mengidentifikasi wilayah, periode, dan produk dengan kontribusi penjualan yang tinggi.",
        en: "To build an analytical dashboard for monitoring overall sales performance and identifying regions, periods, and products with high sales contributions."
      },

      specifications: {
        id: [
          "Sumber Data: Dataset transaksi penjualan furniture tahun 2025.",
          "Platform Visualisasi: Google Looker Studio.",
          "KPI Utama: Average Order, Total Order, Completion Rate, dan Total Revenue.",
          "Analisis: Pendapatan berdasarkan kota, tren order bulanan, dan performa produk.",
          "Fitur Interaktif: Filter berdasarkan kategori, kota, nama produk, dan status pesanan."
        ],
        en: [
          "Data Source: Furniture sales transaction dataset for 2025.",
          "Visualization Platform: Google Looker Studio.",
          "Key KPIs: Average Order, Total Order, Completion Rate, and Total Revenue.",
          "Analysis: Revenue by city, monthly order trends, and product performance.",
          "Interactive Features: Filters by category, city, product name, and order status."
        ]
      },

      result: {
        id: "Berhasil menghasilkan dashboard interaktif yang memberikan gambaran menyeluruh mengenai performa penjualan, membantu mengidentifikasi kota dengan pendapatan tinggi, tren jumlah order bulanan, serta produk dengan performa penjualan terbaik.",
        en: "Successfully developed an interactive dashboard that provides a comprehensive view of sales performance, helping identify high-revenue cities, monthly order trends, and the best-performing products."
      }
    }
  },

  {
    title: { 
      id: "Academic Monitor - Sistem Prediksi & Analisis Kinerja Mahasiswa", 
      en: "Academic Monitor - Student Performance Prediction & Analytics System" 
    },
    tool: "Streamlit & Python",
    date: { 
      id: "Desember 2025 - Februari 2026", 
      en: "December 2025 - February 2026" 
    },
    course: { 
      id: "Tugas akhir", 
      en: "Final Project" 
    },
    description: {
      id: "Aplikasi web interaktif berbasis Machine Learning untuk memantau kinerja akademik mahasiswa, menganalisis faktor penentu keberhasilan studi, serta memprediksi klasifikasi performa secara real-time.",
      en: "An interactive Machine Learning web application to monitor student academic performance, analyze key success factors, and predict performance classification in real time."
    },

    gallery: [
      { 
        src: "assets/images/projects/project-1/page-1.png", 
        caption: { 
          id: "Overview Distribusi IPK & Ranking Mahasiswa", 
          en: "GPA Distribution Overview & Student Ranking"
        },
        description: {
          id: "Visualisasi distribusi IPK mahasiswa yang mengategorikan ke dalam kelas Unggul vs Reguler, serta menampilkan papan peringkat (Top IPK) mahasiswa.",
          en: "GPA distribution visualization categorizing students into Excellent vs Regular classes, along with a top GPA leaderboard."
        }
      },
      { 
        src: "assets/images/projects/project-1/page-2.png", 
        caption: { 
          id: "Faktor Dominan Perbedaan Mahasiswa", 
          en: "Dominant Factors in Student Differences"
        },
        description: {
          id: "Visualisasi bar chart yang menampilkan persentase kontribusi faktor-faktor utama (seperti Demografis, Akademik, Kesehatan) yang membedakan klasifikasi mahasiswa Unggul dan Reguler.",
          en: "Bar chart visualization showing the percentage contribution of key factors (e.g., Demographics, Academic, Health) distinguishing Excellent and Regular students."
        }
      },
      { 
        src: "assets/images/projects/project-1/page-3.png", 
        caption: { 
          id: "Validasi Model & Prediksi Probabilitas", 
          en: "Model Validation & Probability Prediction"  
        },
        description: {
          id: "Grafik scatter plot yang menggambarkan sebaran IPK aktual terhadap prediksi probabilitas model machine learning di berbagai universitas.",
          en: "Scatter plot chart illustrating actual GPA distribution against machine learning model probability predictions across different universities."
        }
      },
      { 
        src: "assets/images/projects/project-1/page-4.png", 
        caption: { 
          id: "Tabel Data Lengkap Mahasiswa", 
          en: "Complete Student Data Table"  
        },
        description: {
          id: "Halaman ringkasan metrik utama (Total Mahasiswa, Rata-rata IPK, IPK Tertinggi/Terendah) beserta tabel interaktif data mahasiswa yang telah dibersihkan.",
          en: "Overview page featuring key metrics (Total Students, Average GPA, Highest/Lowest GPA) alongside an interactive table of cleaned student data."
        }
      },
      { 
        src: "assets/images/projects/project-1/page-5.png", 
        caption: { 
          id: "Input Prediksi Klasifikasi Performa", 
          en: "Performance Classification Prediction Input" 
        },
        description: {
          id: "Formulir interaktif untuk memilih/memasukkan profil mahasiswa dan mengatur parameter akademik (seperti kehadiran, bimbingan, fasilitas) sebelum melakukan analisis.",
          en: "Interactive form to select/input student profiles and adjust academic parameters (such as attendance, counseling, facilities) prior to analysis."
        }
      },
      { 
        src: "assets/images/projects/project-1/page-6.png", 
        caption: { 
          id: "Hasil Analisis Komparasi Model Machine Learning", 
          en: "Machine Learning Model Comparison Results"  
        },
        description: {
          id: "Tampilan hasil analisis per mahasiswa yang membandingkan tingkat keyakinan prediksi dari model Random Forest dan XGBoost, dilengkapi profil parameter serta rekomendasi akademik terarah.",
          en: "Student-level analysis result view comparing prediction confidence levels between Random Forest and XGBoost models, complete with parameter profiles and targeted academic recommendations."
        }
      }
    ],

    details: {
      objective: {
        id: "Membangun sistem analitik terpadu yang memadukan visualisasi data interaktif dengan pemodelan Machine Learning (Random Forest & XGBoost) untuk mengevaluasi kinerja akademik, mengidentifikasi faktor dominan risiko akademik, serta memberikan intervensi dini berbasis data.",
        en: "To build an integrated analytics system combining interactive data visualization with Machine Learning modeling (Random Forest & XGBoost) to evaluate academic performance, identify dominant risk factors, and provide data-driven early interventions."
      },

      specifications: {
        id: [
          "Sumber Data: Dataset kuesioner survei evaluasi kinerja akademik mahasiswa (423 data terproses).",
          "Framework & Visualisasi: Streamlit, Plotly / Matplotlib, Python.",
          "Model ML: Random Forest & XGBoost untuk evaluasi dan klasifikasi komparatif.",
          "Fitur Utama: Upload file CSV dinamis, penyesuaian parameter interaktif, evaluasi persentase kontribusi faktor, dashboard intervensi dini, dan ekspor laporan rekomendasi (.txt)."
        ],
        en: [
          "Data Source: Student academic evaluation survey questionnaire dataset (423 processed records).",
          "Framework & Visualization: Streamlit, Plotly / Matplotlib, Python.",
          "ML Models: Random Forest & XGBoost for comparative evaluation and classification.",
          "Key Features: Dynamic CSV file upload, interactive parameter tuning, factor contribution evaluation, early intervention dashboard, and exportable recommendation report (.txt)."
        ]
      },

      result: {
        id: "Model XGBoost terbukti lebih efektif dan seimbang dibanding Random Forest dengan Akurasi 0.75, ROC-AUC 0.77, dan Macro F1-score 0.67. Dashboard berhasil mengidentifikasi kehadiran kuliah dan bimbingan dosen sebagai faktor kontributor utama, sekaligus memberikan visualisasi interaktif untuk mendukung intervensi akademik berbasis bukti.",
        en: "The XGBoost model proved more effective and balanced than Random Forest, achieving 0.75 Accuracy, 0.77 ROC-AUC, and a 0.67 Macro F1-score. The dashboard successfully highlighted class attendance and faculty guidance as key contributing factors while providing interactive visualizations to support evidence-based academic interventions."
      }
    }
  }

],

  cv: {
    fileName: "CV_MuhammadHaikal_DA.pdf",
    filePath: "documents/CV_MuhammadHaikal_DA.pdf",
    // 1. Ubah namanya menjadi previewImages
    // 2. Gunakan tanda kurung siku [ ] dan pisahkan dengan koma
    previewImages: [
      ["documents/CV_MuhammadHaikal_Page1.jpg"], 
      ["documents/CV_MuhammadHaikal_Page2.jpg"], 
    ],
  },
};