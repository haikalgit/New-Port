/**
 * main.js
 * Titik masuk aplikasi. Menghubungkan data (PortfolioData) dengan
 * tampilan (ComponentRenderer) dan perilaku interaktif (NavigationController,
 * ScrollReveal, ImageFallback).
 */
class PortfolioApp {
  constructor(data) {
    this.data = data;
    this.renderer = new ComponentRenderer(data);
  }

  init() {
    this.renderer.renderAll();

    this.nav = new NavigationController({
      headerSelector: "#siteHeader",
      toggleSelector: "#navToggle",
      linkSelector: ".nav-link",
      sectionSelector: "main section[id]",
    });

    this.reveal = new ScrollReveal();

    this.#setCurrentYearFallback();
  }

  #setCurrentYearFallback() {
    const el = document.getElementById("footerYear");
    if (el && !el.textContent) el.textContent = new Date().getFullYear();
  }
}

// 1. Inisialisasi Aplikasi Utama
document.addEventListener("DOMContentLoaded", () => {
  const app = new PortfolioApp(PortfolioData);
  app.init();
});

// 2. Interaktivitas Tambahan (Lightbox & Marquee Reset)
document.addEventListener('DOMContentLoaded', () => {
  
  /* =========================================================
     KODE RESET ANIMASI MARQUEE & PENYELARASAN KECEPATAN
     ========================================================= */
  const marqueeTracks = document.querySelectorAll('.doc-gallery-track');
  
  if (marqueeTracks.length > 0) {
    
    // LOGIKA PENYELARASAN KECEPATAN (CONSTANT SPEED)
    marqueeTracks.forEach(track => {
      // Menghitung total elemen foto di dalam galeri ini
      const totalPhotos = track.querySelectorAll('figure').length;
      
      // Tentukan "Kecepatan Konstan": 1 foto butuh waktu berapa detik untuk bergeser?
      const detikPerFoto = 3; 
      
      // Kalkulasi otomatis: Jarak (foto) x Waktu Konstan
      const totalDurasi = totalPhotos * detikPerFoto;
      
      // Terapkan waktu ke CSS agar kecepatannya merata di semua galeri
      track.style.animationDuration = `${totalDurasi}s`;
    });

    // LOGIKA RESET SAAT DI-SCROLL
    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationName = 'none'; 
          void entry.target.offsetWidth; // Paksa browser me-reset animasi ke 0%
          entry.target.style.animationName = 'scrollMarquee'; 
        }
      });
    }, {
      threshold: 0.1, 
      rootMargin: "0px 0px -10% 0px" 
    });

    marqueeTracks.forEach(track => {
      marqueeObserver.observe(track);
    });
  }

  /* =========================================================
     KODE LIGHTBOX DENGAN GALERI MULTIPLE SECTIONS
     ========================================================= */
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentGallery = [];
  let currentIndex = 0;

  // Membuka Lightbox dan mendeteksi asal galeri
  document.body.addEventListener('click', (e) => {
    // Deteksi jika yang diklik adalah gambar dokumentasi ATAU gambar sertifikasi
    const clickedImg = e.target.closest('.doc-thumb img, .cert-image img');
    
    if (clickedImg) {
      let container = null;
      let imgSelector = '';

      // Cek asal gambar untuk menentukan kontainer induknya
      if (clickedImg.closest('.doc-thumb')) {
        // Jika dari pengalaman kerja / pendidikan
        container = clickedImg.closest('.doc-gallery');
        imgSelector = '.doc-thumb img';
      } else if (clickedImg.closest('.cert-image')) {
        // Jika dari sertifikasi (berlaku untuk SEMUA kategori sertifikat berkat .grid)
        container = clickedImg.closest('.grid'); 
        imgSelector = '.cert-image img';
      }

      if (container) {
        // Kumpulkan semua gambar yang ada di dalam kontainer yang sama
        currentGallery = Array.from(container.querySelectorAll(imgSelector));
        currentIndex = currentGallery.indexOf(clickedImg);

        updateLightboxImage();
        lightbox.classList.add('is-open');
      }
    }
  });

  // Fungsi untuk mengganti src gambar
  const updateLightboxImage = () => {
    if (currentGallery.length > 0) {
      lightboxImg.src = currentGallery[currentIndex].src;
    }
  };

  // Navigasi Kanan (Selanjutnya)
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation(); // Mencegah klik tembus ke background
      if (currentGallery.length > 0) {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxImage();
      }
    });
  }

  // Navigasi Kiri (Sebelumnya)
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      if (currentGallery.length > 0) {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage();
      }
    });
  }

  // Fungsi Menutup Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    setTimeout(() => { lightboxImg.src = ''; }, 300);
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  // Menutup jika area background gelap diklik
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }
});