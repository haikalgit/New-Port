/**
 * main.js
 * Titik masuk aplikasi. Menghubungkan data dengan UI dan logika interaksi.
 */

// PERFORMA: helper agar handler resize/scroll tidak dieksekusi
// berkali-kali per frame — cukup 1x per animation frame.
function rafThrottle(fn) {
  let ticking = false;
  return (...args) => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      fn(...args);
      ticking = false;
    });
  };
}

class PortfolioApp {
  constructor(data) {
    this.data = data;
    this.renderer = new ComponentRenderer(data);
    this._marqueeObserver = null; // PERFORMA: simpan observer supaya bisa di-disconnect saat render ulang
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
    this.setupMarqueeGallery();
    this.#setupLightbox();
    this.#setupGridModal();
  }

  #setCurrentYearFallback() {
    const el = document.getElementById("footerYear");
    if (el && !el.textContent) el.textContent = new Date().getFullYear();
  }

  setupMarqueeGallery() {
    const marqueeTracks = document.querySelectorAll('.doc-gallery-track');
    if (marqueeTracks.length === 0) return;

    const PIXELS_PER_SECOND = 50;

    const updateMarqueeSpeed = () => {
      marqueeTracks.forEach(track => {
        const totalWidth = track.scrollWidth;
        if (totalWidth <= 0) return;

        const travelDistance = totalWidth / 2;
        const duration = travelDistance / PIXELS_PER_SECOND;
        track.style.animationDuration = `${duration}s`;
      });
    };

    updateMarqueeSpeed();

    // PERFORMA: resize di-throttle dengan requestAnimationFrame
    const throttledUpdate = rafThrottle(updateMarqueeSpeed);
    window.addEventListener('resize', throttledUpdate);
    setTimeout(updateMarqueeSpeed, 300);

    // PERFORMA: hentikan animasi CSS saat track keluar viewport
    // (mengurangi kerja compositor saat scroll cepat / banyak galeri sekaligus)
    if (this._marqueeObserver) this._marqueeObserver.disconnect();

    this._marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        } else {
          entry.target.style.animationPlayState = 'paused';
        }
      });
    }, { threshold: 0, rootMargin: "50px 0px 50px 0px" });

    marqueeTracks.forEach(track => this._marqueeObserver.observe(track));
  }

  #setupLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxDialog = document.querySelector('.lightbox-dialog'); 
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

    // === SWIPE SUPPORT UNTUK MOBILE ===
    if (lightboxDialog) {
      let touchStartX = 0;
      let touchStartY = 0;
      let touchEndX = 0;
      const SWIPE_THRESHOLD = 40;

      lightboxDialog.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
      }, { passive: true });

      lightboxDialog.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;

        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;

        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > SWIPE_THRESHOLD) {
          if (deltaX < 0) {
            nextBtn && nextBtn.click();
          } else {
            prevBtn && prevBtn.click();
          }
        }
      }, { passive: true });
    }

    let currentGallery = [];
    let currentIndex = 0;

    document.body.addEventListener('click', (e) => {
      const clickedImg = e.target.closest('.doc-thumb img, .cert-image img, .project-media img');
      if (!clickedImg) return;

      let container = null;

      if (clickedImg.closest('#gridModalBody')) {
        container = document.getElementById('gridModalBody');
        currentGallery = Array.from(container.querySelectorAll('img'));
      } 
      else if (clickedImg.closest('.doc-thumb')) {
        container = clickedImg.closest('.gallery-wrapper');
        if (container) {
          currentGallery = Array.from(container.querySelectorAll('.track-original .doc-thumb img'));
        }
      } 
      else if (clickedImg.closest('.cert-image')) {
        container = clickedImg.closest('.grid'); 
        if (container) {
          currentGallery = Array.from(container.querySelectorAll('.cert-image img'));
        }
      }
      else if (clickedImg.closest('.project-media')) {
        container = clickedImg.closest('#projectGrid'); 
        if (container) {
          currentGallery = Array.from(container.querySelectorAll('.project-media img'));
        }
      }

      if (container && currentGallery.length > 0) {
        currentIndex = currentGallery.indexOf(clickedImg);
        
        if (currentIndex === -1) {
          currentIndex = currentGallery.findIndex(img => img.src === clickedImg.src);
          if (currentIndex === -1) currentIndex = 0;
        }
        
        updateLightboxImage('none'); 
        lightbox.classList.add('is-open');
        document.body.classList.add('no-scroll');
      }
    });

    const updateLightboxImage = (direction) => {
      if (currentGallery.length > 0) {
        lightboxDialog.classList.remove('slide-next', 'slide-prev');
        void lightboxDialog.offsetWidth; 
        lightboxImg.src = currentGallery[currentIndex].src;
        
        if (direction === 'next') lightboxDialog.classList.add('slide-next');
        if (direction === 'prev') lightboxDialog.classList.add('slide-prev');
      }
    };

    const closeLightbox = () => {
      lightbox.classList.remove('is-open');
      // --- LOGIKA BARU SCROLL LOCK ---
      // Ambil elemen gridModal untuk mengecek statusnya
      const gridModal = document.getElementById('gridModal');
      
      // Cabut class 'no-scroll' HANYA JIKA gridModal tidak ada ATAU gridModal sedang tertutup
      if (!gridModal || !gridModal.classList.contains('is-open')) {
        document.body.classList.remove('no-scroll');
      }
      
      setTimeout(() => { 
        lightboxImg.src = ''; 
        lightboxDialog.classList.remove('slide-next', 'slide-prev'); 
      }, 300); 
    };

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

    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('is-open')) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); nextBtn.click(); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); prevBtn.click(); }
        else if (e.key === 'Escape') { closeLightbox(); }
      }
    });
  }

  #setupGridModal() {
    const gridModal = document.getElementById('gridModal');
    const gridModalBody = document.getElementById('gridModalBody');
    const gridCloseBtn = document.getElementById('gridCloseBtn');

    if (!gridModal) return;

    const closeGridModal = () => {
      gridModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    };

    window.toggleGallery = (btn) => {
      const wrapper = btn.closest('.gallery-wrapper');
      const section = wrapper.closest('section');
      let itemsToDisplay = [];

      if (section.id === 'sertifikasi') {
        itemsToDisplay = [...(this.data.seminarsRow1 || []), ...(this.data.seminarsRow2 || [])];
      } else {
        const uniqueImages = wrapper.querySelectorAll('.track-original .doc-thumb img');
        itemsToDisplay = Array.from(uniqueImages).map(img => ({
          image: img.src,
          name: img.alt || 'Dokumentasi'
        }));
      }

      if (itemsToDisplay.length > 0) {
        gridModalBody.innerHTML = '';
        
        itemsToDisplay.forEach(item => {
          const figure = document.createElement('figure');
          const thumb = document.createElement('div');
          thumb.className = 'doc-thumb';
          
          const img = document.createElement('img');
          img.src = item.image || item.src;
          img.alt = item.name || item.alt || 'Dokumentasi';
          img.loading = 'lazy';           // PERFORMA
          img.decoding = 'async';         // PERFORMA
          img.style.cursor = 'zoom-in';

          thumb.appendChild(img);
          figure.appendChild(thumb);
          gridModalBody.appendChild(figure);
        });

        gridModal.classList.add('is-open');
        document.body.classList.add('no-scroll');
        // --- FIX: Kembalikan posisi scroll ke paling atas setiap kali modal dibuka ---
        gridModalBody.scrollTop = 0;
      }
    };

    gridCloseBtn.addEventListener('click', closeGridModal);
    
    gridModal.addEventListener('click', (e) => { 
      if (e.target === gridModal) closeGridModal(); 
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && gridModal.classList.contains('is-open')) {
        closeGridModal();
      }
    });
  }
}

// =========================================================
// LOGIKA UTAMA GANTI BAHASA (DENGAN SVG & LOCALSTORAGE)
// =========================================================
let currentLang = localStorage.getItem('selected_lang') || 'id';
window.currentLang = currentLang;
let globalApp = null;

function applyLanguage(lang) {
  currentLang = lang;
  window.currentLang = lang;
  localStorage.setItem('selected_lang', lang);

  const translatableElements = document.querySelectorAll('[data-id][data-en]');
  translatableElements.forEach(el => {
    el.textContent = el.getAttribute(`data-${lang}`);
  });

  if (globalApp && globalApp.renderer) {
    globalApp.renderer.renderAll();
    globalApp.setupMarqueeGallery();

    if (globalApp.reveal) {
      globalApp.reveal.refresh();
    }
  }

  const langFlag = document.getElementById('langFlag');
  const langText = document.getElementById('langText');
  
  if (langFlag && langText) {
    if (lang === 'en') {
      langText.textContent = 'EN';
      langFlag.innerHTML = `
        <svg width="18" height="13" viewBox="0 0 60 30" style="border-radius: 2px; box-shadow: 0 0 1px rgba(0,0,0,0.4); display: block;">
          <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
          <clipPath id="t"><path d="M30,15 h30 v15 z M30,15 h-30 v-15 z M30,15 h-30 v15 z M30,15 h30 v-15 z"/></clipPath>
          <g clip-path="url(#s)">
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" stroke-width="4" clip-path="url(#t)"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
          </g>
        </svg>
      `;
    } else {
      langText.textContent = 'ID';
      langFlag.innerHTML = `
        <svg width="18" height="13" viewBox="0 0 18 13" fill="none" style="border-radius: 2px; box-shadow: 0 0 1px rgba(0,0,0,0.4); display: block;">
          <rect width="18" height="6.5" fill="#E70011"/>
          <rect y="6.5" width="18" height="6.5" fill="#FFFFFF"/>
        </svg>
      `;
    }
  }
}

function toggleLanguage() {
  const nextLang = currentLang === 'id' ? 'en' : 'id';
  applyLanguage(nextLang);
}

// =========================================================
// INISIALISASI APLIKASI
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  globalApp = new PortfolioApp(PortfolioData);
  globalApp.init();
  applyLanguage(currentLang);
});