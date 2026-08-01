# Portofolio — Muhammad Haikal (Data Analyst)

Website portofolio statis (HTML, CSS, JavaScript murni — tanpa framework/build step)
dengan arsitektur berorientasi objek di sisi JavaScript, sehingga mudah dirawat dan
di-deploy ke Vercel maupun GitHub Pages tanpa proses build apapun.

## 📁 Struktur Folder

```
portfolio/
├── index.html                     # Shell halaman (struktur section, placeholder)
├── vercel.json                    # Konfigurasi hosting Vercel
├── documents/
│   └── CV_MuhammadHaikal_DA.pdf   # File CV asli (dipakai untuk preview & tombol unduh)
└── assets/
    ├── css/
    │   ├── variables.css          # 🎨 Semua warna, font, spacing — token desain
    │   ├── base.css                # Reset & gaya dasar
    │   ├── layout.css              # Header, section, grid, footer
    │   ├── components.css          # Kartu, tombol, timeline, KPI widget, dll
    │   ├── animations.css          # Keyframes & scroll-reveal
    │   └── responsive.css          # Breakpoint mobile/tablet
    ├── js/
    │   ├── data/
    │   │   └── portfolio-data.js  # ✏️ SATU-SATUNYA file untuk edit ISI (teks & path gambar)
    │   ├── classes/
    │   │   ├── IconLibrary.js         # Kumpulan ikon SVG inline
    │   │   ├── ImageFallback.js       # Placeholder otomatis jika gambar belum ada
    │   │   ├── NavigationController.js# Navbar: scroll shadow, menu mobile, active link
    │   │   ├── ScrollReveal.js        # Animasi muncul saat discroll
    │   │   └── ComponentRenderer.js   # Merender semua section dari data
    │   └── main.js                 # Entry point, menyatukan semua class di atas
    └── images/
        ├── profile/                # Foto profil (hero)
        ├── experience/             # Logo perusahaan & dokumentasi kerja
        ├── education/              # Logo kampus & dokumentasi kuliah
        ├── certifications/         # Scan/foto sertifikat
        ├── projects/               # Screenshot dashboard/proyek
        └── icons/                  # Favicon

```

## 🖼️ Cara Mengganti Gambar

Selama gambar **belum** ditambahkan, halaman akan otomatis menampilkan placeholder
rapi (bukan ikon "broken image") — jadi situs tetap terlihat bagus sejak awal.

Untuk mengganti dengan foto asli, cukup:
1. Taruh file gambar Anda ke folder yang sesuai di `assets/images/...`
2. Buka `assets/js/data/portfolio-data.js`
3. Ganti nilai path (contoh: `heroPhoto: "assets/images/profile/profile-hero.jpg"`)
   dengan nama file Anda yang sebenarnya.

Tidak perlu menyentuh HTML/CSS sama sekali. Daftar path yang perlu diisi:

| Bagian | Path di `portfolio-data.js` | Rekomendasi ukuran |
|---|---|---|
| Foto profil hero | `profile.heroPhoto` | persegi, min. 600×600px |
| Logo perusahaan magang | `experience[0].logo` | persegi, transparan/putih |
| Dokumentasi kerja (3 foto) | `experience[0].gallery` | rasio 4:3 |
| Logo kampus | `education[0].logo` | persegi |
| Dokumentasi kuliah (3 foto) | `education[0].gallery` | rasio 4:3 |
| Sertifikat (3 buah) | `certifications[].image` | rasio 16:10, hasil scan/screenshot |
| Screenshot proyek (4 buah) | `projects[].image` | rasio 16:10 |

## ✏️ Cara Mengganti Teks / Konten CV

Semua teks (ringkasan, pengalaman, pendidikan, skill, proyek) diambil dari satu
objek `PortfolioData` di `assets/js/data/portfolio-data.js`. Edit teks di sana,
simpan, refresh browser — selesai.

## 📄 Mengganti File CV

Ganti file `documents/CV_MuhammadHaikal_DA.pdf` dengan CV terbaru Anda
(nama file bebas), lalu update `cv.fileName` dan `cv.filePath` di `portfolio-data.js`.

## ▶️ Menjalankan di Lokal

Karena ini situs statis (bukan aplikasi Laravel/PHP), **tidak perlu** `php artisan serve`.
Cukup salah satu cara berikut:

```bash
# Opsi 1 — Python (built-in di banyak sistem)
cd portfolio
python3 -m http.server 8000
# buka http://localhost:8000

# Opsi 2 — PHP built-in server (jika PHP sudah terpasang)
cd portfolio
php -S localhost:8000

# Opsi 3 — Langsung buka index.html dua kali klik di file explorer
```

## 🚀 Deploy ke Vercel

1. Push folder ini ke repository GitHub (lihat langkah di bawah).
2. Buka [vercel.com](https://vercel.com) → **Add New Project** → pilih repo Anda.
3. Framework Preset: pilih **Other** (tidak perlu build command / output directory,
   karena situs ini statis). Vercel akan otomatis membaca `vercel.json`.
4. Klik **Deploy** — selesai dalam hitungan detik.

## 🚀 Deploy ke GitHub Pages

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

Lalu di GitHub: **Settings → Pages → Source: Deploy from branch → main / (root)**.

## 🎨 Palet Warna

| Token | Hex | Kegunaan |
|---|---|---|
| `--color-bg` | `#EEF5FF` | Latar belakang utama |
| `--color-border` | `#B4D4FF` | Border, garis pemisah |
| `--color-accent` | `#86B6F6` | Aksen, gradasi, sparkline |
| `--color-primary` | `#176B87` | Tombol utama, judul aktif, link |

Semua warna terpusat di `assets/css/variables.css` — ubah di satu tempat,
berubah di seluruh situs.
