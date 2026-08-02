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

// =========================================================
// GABUNGAN SEMUA LOGIKA KE DALAM SATU EVENT LISTENER
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  
  // 1. INISIALISASI APLIKASI (Pastikan foto di-render duluan)
  const app = new PortfolioApp(PortfolioData);
  app.init();

  // 2. KODE RESET ANIMASI MARQUEE & PENYELARASAN KECEPATAN
  const marqueeTracks = document.querySelectorAll('.doc-gallery-track');
  
  if (marqueeTracks.length > 0) {
    // Penyelarasan Kecepatan Konstan
    marqueeTracks.forEach(track => {
      const totalPhotos = track.querySelectorAll('figure').length;
      const detikPerFoto = 3; 
      const totalDurasi = totalPhotos * detikPerFoto;
      track.style.animationDuration = `${totalDurasi}s`;
    });

    // Reset saat di-scroll
    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationName = 'none'; 
          void entry.target.offsetWidth; 
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

  // 3. KODE LIGHTBOX DENGAN ANIMASI SLIDE (SELURUH KOTAK PUTIH)
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxDialog = document.querySelector('.lightbox-dialog'); // Variabel Kotak Putih
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  let currentGallery = [];
  let currentIndex = 0;

  // Membuka Lightbox dan mendeteksi asal galeri
  document.body.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('.doc-thumb img, .cert-image img');
    
    if (clickedImg) {
      let container = null;
      let imgSelector = '';

      if (clickedImg.closest('.doc-thumb')) {
        container = clickedImg.closest('.doc-gallery');
        imgSelector = '.doc-thumb img';
      } else if (clickedImg.closest('.cert-image')) {
        container = clickedImg.closest('.grid'); 
        imgSelector = '.cert-image img';
      }

      if (container) {
        currentGallery = Array.from(container.querySelectorAll(imgSelector));
        currentIndex = currentGallery.indexOf(clickedImg);

        updateLightboxImage('none'); // Parameter 'none' agar saat pertama diklik tidak bergeser
        lightbox.classList.add('is-open');
      }
    }
  });

  // Fungsi untuk mengganti src gambar dengan Animasi Slide pada KOTAK PUTIH
  const updateLightboxImage = (direction) => {
    if (currentGallery.length > 0) {
      // Hapus class animasi dari kotak putih agar bisa diulang
      lightboxDialog.classList.remove('slide-next', 'slide-prev');
      
      // Paksa browser me-reset rendering kotak putih
      void lightboxDialog.offsetWidth;
      
      // Ganti sumber gambar fotonya
      lightboxImg.src = currentGallery[currentIndex].src;
      
      // Tambahkan class animasi ke KOTAK PUTIH sesuai tombol yang diklik
      if (direction === 'next') {
        lightboxDialog.classList.add('slide-next');
      } else if (direction === 'prev') {
        lightboxDialog.classList.add('slide-prev');
      }
    }
  };

  // Navigasi Kanan (Selanjutnya)
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      if (currentGallery.length > 0) {
        currentIndex = (currentIndex + 1) % currentGallery.length;
        updateLightboxImage('next'); // Panggil animasi dari kanan
      }
    });
  }

  // Navigasi Kiri (Sebelumnya)
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation(); 
      if (currentGallery.length > 0) {
        currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
        updateLightboxImage('prev'); // Panggil animasi dari kiri
      }
    });
  }

  // Fungsi Menutup Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    setTimeout(() => { 
      lightboxImg.src = ''; 
      lightboxDialog.classList.remove('slide-next', 'slide-prev'); // Bersihkan animasi pada kotak
    }, 300);
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