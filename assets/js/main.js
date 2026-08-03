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
      sectionSelector: "main section[id], main .panel[id]",
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
// INISIALISASI & PENGGABUNGAN SEMUA LOGIKA
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  // 1. Inisialisasi Aplikasi Utama
  const app = new PortfolioApp(PortfolioData);
  app.init();

  // 2. Setup Marquee Animation (Galeri Berjalan)
  setupMarqueeGallery();

  // 3. Setup Lightbox (Preview Gambar Fullscreen)
  setupLightbox();

  setupGridModal();
});

// =========================================================
// FUNGSI: ANIMASI MARQUEE (GALERI BERJALAN)
// =========================================================
function setupMarqueeGallery() {
  const marqueeTracks = document.querySelectorAll('.doc-gallery-track');
  if (marqueeTracks.length === 0) return;

  // Menentukan durasi animasi berdasarkan jumlah foto
  marqueeTracks.forEach(track => {
    const totalPhotos = track.querySelectorAll('figure').length;
    track.style.animationDuration = `${totalPhotos * 3}s`; // 3 detik per foto
  });

  // Me-reset animasi saat elemen masuk ke layar (viewport)
  const marqueeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationName = 'none'; 
        void entry.target.offsetWidth; // Memicu reflow
        entry.target.style.animationName = 'scrollMarquee'; 
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });

  marqueeTracks.forEach(track => marqueeObserver.observe(track));
}

// =========================================================
// FUNGSI: LIGHTBOX (PREVIEW GAMBAR KETIKA DIKLIK)
// =========================================================
function setupLightbox() {
  const lightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxDialog = document.querySelector('.lightbox-dialog'); 
  const closeBtn = document.querySelector('.lightbox-close');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');

  if (!lightbox) return;

  let currentGallery = [];
  let currentIndex = 0;

  // Membuka Lightbox dan mendeteksi asal galeri (Pengalaman/Sertifikat)
  document.body.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('.doc-thumb img, .cert-image img');
    
    if (clickedImg) {
      let container = null;

      if (clickedImg.closest('.doc-thumb')) {
        // Mode Galeri: Ambil HANYA foto dari deretan asli (bukan duplikat animasi)
        container = clickedImg.closest('.gallery-wrapper');
        currentGallery = Array.from(container.querySelectorAll('.track-original .doc-thumb img'));
      } else if (clickedImg.closest('.cert-image')) {
        // Mode Sertifikat Grid biasa
        container = clickedImg.closest('.grid'); 
        currentGallery = Array.from(container.querySelectorAll('.cert-image img'));
      }

      if (container && currentGallery.length > 0) {
        currentIndex = currentGallery.indexOf(clickedImg);
        
        // Proteksi: Jika yang terklik adalah gambar duplikat, cari index berdasarkan src-nya
        if (currentIndex === -1) {
          currentIndex = currentGallery.findIndex(img => img.src === clickedImg.src);
          if (currentIndex === -1) currentIndex = 0;
        }

        updateLightboxImage('none'); 
        lightbox.classList.add('is-open');
      }
    }
  });

  // Fungsi Transisi Gambar (Slide)
  const updateLightboxImage = (direction) => {
    if (currentGallery.length > 0) {
      lightboxDialog.classList.remove('slide-next', 'slide-prev');
      void lightboxDialog.offsetWidth; // Memicu reflow animasi CSS
      lightboxImg.src = currentGallery[currentIndex].src;
      
      if (direction === 'next') lightboxDialog.classList.add('slide-next');
      if (direction === 'prev') lightboxDialog.classList.add('slide-prev');
    }
  };

  // Fungsi Menutup Lightbox
  const closeLightbox = () => {
    lightbox.classList.remove('is-open');
    setTimeout(() => { 
      lightboxImg.src = ''; 
      lightboxDialog.classList.remove('slide-next', 'slide-prev'); 
    }, 300); // Sinkron dengan durasi transisi CSS
  };

  // Event Listeners untuk Tombol Kontrol Lightbox
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => { 
      e.stopPropagation(); 
      currentIndex = (currentIndex + 1) % currentGallery.length; 
      updateLightboxImage('next'); 
    });
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => { 
      e.stopPropagation(); 
      currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length; 
      updateLightboxImage('prev'); 
    });
  }
  
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  
  lightbox.addEventListener('click', (e) => { 
    if (e.target === lightbox) closeLightbox(); 
  });

  // Navigasi Keyboard untuk Lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox.classList.contains('is-open')) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { 
        e.preventDefault(); 
        nextBtn.click(); 
      }
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { 
        e.preventDefault(); 
        prevBtn.click(); 
      }
      else if (e.key === 'Escape') {
        closeLightbox();
      }
    }
  });
}

// =========================================================
// FUNGSI: MODAL ALBUM (GRID FOTO) - BERDASARKAN DATA ASLI
// =========================================================
function setupGridModal() {
  const gridModal = document.getElementById('gridModal');
  const gridModalBody = document.getElementById('gridModalBody');
  const gridCloseBtn = document.getElementById('gridCloseBtn');

  if (!gridModal) return;

  window.toggleGallery = function(btn) {
    const wrapper = btn.closest('.gallery-wrapper');
    const section = wrapper.closest('section');
    
    let itemsToDisplay = [];

    // Menentukan sumber data asli berdasarkan letak tombol (section mana yang diklik)
    if (section.id === 'sertifikasi') {
      // Jika diklik di bagian Sertifikasi & Seminar, gabungkan data row1 dan row2 asli
      itemsToDisplay = [...(PortfolioData.seminarsRow1 || []), ...(PortfolioData.seminarsRow2 || [])];
    } else {
      // Untuk bagian Pengalaman / Pendidikan, cari data berdasarkan index elemen atau atributnya
      // Atau ambil dari elemen track-original yang unik (tanpa duplikat clone)
      const uniqueImages = wrapper.querySelectorAll('.track-original .doc-thumb img');
      itemsToDisplay = Array.from(uniqueImages).map(img => ({
        image: img.src,
        name: img.alt || 'Dokumentasi'
      }));
    }

    if (itemsToDisplay.length > 0) {
      gridModalBody.innerHTML = ''; // Bersihkan isi sebelumnya

      // Render foto secara dinamis sesuai jumlah data yang benar-benar ada
      itemsToDisplay.forEach(item => {
        const figure = document.createElement('figure');
        const thumb = document.createElement('div');
        thumb.className = 'doc-thumb';
        
        const img = document.createElement('img');
        // Mendukung struktur data objek seminar ({ image, name }) maupun elemen HTML img biasa
        img.src = item.image || item.src;
        img.alt = item.name || item.alt || 'Dokumentasi';
        
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
          // Cari elemen gambar yang cocok di halaman untuk memicu fungsi Zoom/Lightbox utama
          const targetImg = Array.from(document.querySelectorAll('.doc-thumb img')).find(el => el.src === img.src);
          if (targetImg) {
            targetImg.click();
          }
        });

        thumb.appendChild(img);
        figure.appendChild(thumb);
        gridModalBody.appendChild(figure);
      });

      // Buka Modal Album
      gridModal.classList.add('is-open');
    }
  };

  // Menutup kotak Album
  gridCloseBtn.addEventListener('click', () => {
    gridModal.classList.remove('is-open');
  });

  gridModal.addEventListener('click', (e) => {
    if (e.target === gridModal) {
      gridModal.classList.remove('is-open');
    }
  });
}