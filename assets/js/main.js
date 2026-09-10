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
    this.#setupProjectDetail();
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
      // TAMBAHAN: Mendeteksi class pd-detail-img
      const clickedImg = e.target.closest('.doc-thumb img, .cert-image img, .project-media img, .pd-detail-img');
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
        container = clickedImg.closest('.project-media'); 
        if (container) {
          currentGallery = Array.from(container.querySelectorAll('img'));
        }
      }
      // TAMBAHAN: Menangkap gambar dari dalam Modal Detail Proyek
      else if (clickedImg.classList.contains('pd-detail-img')) {
        container = clickedImg.closest('#projectDetailBody');
        if (container) {
          currentGallery = Array.from(container.querySelectorAll('.pd-detail-img'));
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
        // TAMBAHAN: Paksa Z-Index lebih tinggi agar menutupi Modal Detail
        lightbox.style.zIndex = '9999999';
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
      
      const gridModal = document.getElementById('gridModal');
      const pdModal = document.getElementById('projectDetailModal');
      
      // TAMBAHAN PENGAMANAN SCROLL: 
      // Hanya izinkan scroll jika KEDUA modal sedang tertutup.
      const isGridOpen = gridModal && gridModal.classList.contains('is-open');
      const isPdOpen = pdModal && pdModal.classList.contains('is-open');
      
      if (!isGridOpen && !isPdOpen) {
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
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { 
          e.preventDefault(); 
          nextBtn.click(); 
        }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { 
          e.preventDefault(); 
          prevBtn.click(); 
        }
        else if (e.key === 'Escape') { 
          // 3 BARIS INI ADALAH KUNCI RAHASIANYA
          e.preventDefault();
          e.stopImmediatePropagation(); // Mencegah modal di bawahnya ikut tertutup
          closeLightbox(); 
        }
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
        // CEGAH TUTUP JIKA: Lightbox foto (imageLightbox) sedang terbuka
        const imageLightbox = document.getElementById('imageLightbox');
        if (imageLightbox && imageLightbox.classList.contains('is-open')) {
          return; // Hentikan proses, biarkan fungsi Lightbox yang menutup fotonya
        }
        closeGridModal();
      }
    });
  }

  #setupProjectDetail() {
    const pdModal = document.getElementById('projectDetailModal');
    const pdCloseBtn = document.getElementById('projectDetailCloseBtn');
    const pdBody = document.getElementById('projectDetailBody');
    const pdTitle = document.getElementById('pdHeaderTitle');

    // FIX: helper terpusat untuk reset scroll modal detail proyek ke posisi paling atas.
    // Dipakai baik saat modal dibuka (proyek baru) maupun saat ditutup, supaya
    // konsisten dan tidak bergantung urutan event.
    const resetPdScroll = () => {
      if (pdBody) pdBody.scrollTop = 0;
      const dialogEl = pdModal.querySelector('.lightbox-dialog');
      if (dialogEl) dialogEl.scrollTop = 0;
    };

    window.openProjectDetail = (index) => {
      if (!pdModal || !pdBody) return;

      const project = PortfolioData.projects[index];
      if (!project) return;
      const lang = window.currentLang || 'id';

      pdTitle.textContent = typeof project.title === 'object' ? project.title[lang] : project.title;
      pdBody.innerHTML = '';

      let contentHTML = `
        <style>
          /* =====================================================
             FIX UTAMA: #projectDetailBody memakai class yang SAMA
             (.grid-modal-body) dengan galeri foto #gridModalBody.
             Class itu di-set jadi CSS Grid dengan max-height terkunci
             (khusus untuk thumbnail foto), sehingga modal proyek ikut
             kepotong kecil. Override di bawah "membebaskan" 
             #projectDetailBody dari aturan grid galeri tersebut,
             baik di desktop maupun mobile.
             ===================================================== */
          #projectDetailModal #projectDetailBody.grid-modal-body {
            display: block !important;
            grid-template-columns: none !important;
            grid-auto-rows: unset !important;
            gap: 0 !important;
            max-height: none !important;
            flex: 1 1 auto !important;
            min-height: 0 !important;
            overflow-y: auto !important;
            overflow-x: hidden !important;
          }

          .pd-container { display: flex; flex-direction: column; width: 100% !important; box-sizing: border-box !important; grid-column: 1 / -1; }
          
          /* MEMBUAT SETIAP KOTAK BAGIAN ATAS MEMBENTANG PENUH 100% TANPA SISA KOSONG */
          .pd-section-box { width: 100% !important; max-width: 100% !important; margin-bottom: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid var(--color-border); box-sizing: border-box !important; }
          .pd-section-box.no-border { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
          
          /* TATA LETAK BAWAH: FOTO DI KIRI, TEKS DI KANAN (LEBAR PENUH) */
          .pd-grid-full { display: grid; grid-template-columns: 200px 1fr; gap: 2.5rem; width: 100% !important; align-items: start; }
          
          .pd-subtitle { font-size: 1.1rem; color: var(--color-heading); border-bottom: 2px solid var(--color-primary); display: inline-block; margin-bottom: 0.5rem; padding-bottom: 0.1rem; }
          .pd-text { color: var(--color-text); font-size: 0.95rem; line-height: 1.6; text-align: justify; width: 100% !important; margin: 0; }
          .pd-list { width: 100% !important; padding-left: 1.2rem; margin: 0; color: var(--color-text); line-height: 1.6; }
          .pd-caption { font-weight: 700; color: var(--color-heading); text-align: center; margin-top: 0; margin-bottom: 0.5rem; font-size: 0.8rem; }

          @media (max-width: 768px) {
            #projectDetailModal .lightbox-dialog {
              width: calc(100% - 2rem) !important;
              max-width: calc(100% - 2rem) !important;
              min-width: auto !important;
              max-height: 85dvh !important;
              margin: auto !important;
              padding: 1.25rem !important;
            }
            .pd-grid-full { grid-template-columns: 1fr; gap: 1rem; }
            .pd-section-box { margin-bottom: 1rem !important; padding-bottom: 1rem !important; }
            .pd-section-box.no-border { margin-bottom: 0 !important; padding-bottom: 0 !important; }

            /* Perkecil subjudul & isi teks di mobile */
            .pd-subtitle { font-size: 0.8rem !important; margin-bottom: 0.4rem !important; }
            .pd-text { font-size: 0.65rem !important; line-height: 1.5 !important; }
            .pd-list { font-size: 0.65rem !important; line-height: 1.5 !important; }
            .pd-list li { margin-bottom: 0.25rem !important; }
            .pd-caption { font-size: 0.8rem !important; }

            /* Perkecil ukuran gambar galeri agar tidak memenuhi lebar penuh */
            .pd-grid-full > div:first-child {
              max-width: 200px !important;
              margin: 0 auto !important;
            }
          }
        </style>
        
        <div class="pd-container">
          <!-- 1. Penjelasan Proyek (Lebar Penuh) -->
          <div class="pd-section-box">
            <h4 class="pd-subtitle">Penjelasan Proyek</h4>
            <p class="pd-text">${typeof project.description === 'object' ? project.description[lang] : project.description}</p>
          </div>

          <!-- Detail Lainnya (Tujuan, Spesifikasi, Hasil - Lebar Penuh) -->
          ${project.details ? (() => {
            const d = project.details;
            const obj = d.objective ? (typeof d.objective === 'object' ? d.objective[lang] : d.objective) : '';
            const res = d.result ? (typeof d.result === 'object' ? d.result[lang] : d.result) : '';
            
            let specsHTML = '';
            if (d.specifications) {
              const specData = typeof d.specifications === 'object' && Array.isArray(d.specifications[lang]) ? d.specifications[lang] : d.specifications;
              if (Array.isArray(specData)) {
                specsHTML = `<ul class="pd-list">` + specData.map(s => `<li style="margin-bottom: 0.3rem;">${s}</li>`).join('') + `</ul>`;
              } else {
                specsHTML = `<p class="pd-text">${specData}</p>`;
              }
            }

            let detailsBlock = '';
            if (obj) detailsBlock += `<div class="pd-section-box"><h4 class="pd-subtitle">Tujuan Proyek</h4><p class="pd-text">${obj}</p></div>`;
            if (specsHTML) detailsBlock += `<div class="pd-section-box"><h4 class="pd-subtitle">Spesifikasi & Tools</h4>${specsHTML}</div>`;
            if (res) detailsBlock += `<div class="pd-section-box"><h4 class="pd-subtitle">Hasil & Dampak</h4><p class="pd-text">${res}</p></div>`;
            return detailsBlock;
          })() : ''}

          <!-- 2. Galeri Foto & Penjelasan Foto -->
          <div style="display: flex; flex-direction: column; width: 100%;">
            ${(project.gallery || [project.image]).map((img, i) => {
              const src = typeof img === 'string' ? img : img.src;
              const caption = typeof img === 'string' ? '' : (typeof img.caption === 'object' ? img.caption[lang] : (img.caption || ''));
              const desc = typeof img === 'string' ? '' : (typeof img.description === 'object' ? img.description[lang] : (img.description || ''));
              const isLast = i === (project.gallery || [project.image]).length - 1;

              return `
                <div class="pd-section-box ${isLast ? 'no-border' : ''}">
                  <div class="pd-grid-full">
                    <div>
                      ${caption ? `<div class="pd-caption">${caption}</div>` : ''}
                      <div style="border-radius: 8px; overflow: hidden; border: 1px solid var(--color-border); box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                        <img src="${src}" class="pd-detail-img" style="width: 100%; height: auto; display: block; cursor: zoom-in;" loading="lazy">
                      </div>
                    </div>
                    <div>
                      ${desc ? `
                        <h4 class="pd-subtitle">Penjelasan Foto</h4>
                        <p class="pd-text">${desc}</p>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      pdBody.innerHTML = contentHTML;
      pdModal.classList.add('is-open');
      document.body.classList.add('no-scroll');

      // FIX: reset scroll SETELAH modal terlihat & konten baru ter-render.
      // requestAnimationFrame memastikan browser sudah selesai layout dulu,
      // jadi scrollTop = 0 benar-benar "kena" (tidak diabaikan seperti saat
      // elemen masih display:none atau belum sempat di-layout ulang).
      requestAnimationFrame(resetPdScroll);
    };

    if (!pdModal) return;
    const closePD = () => {
      // FIX: reset scroll SEBELUM modal disembunyikan (class is-open dilepas).
      // Kalau scrollTop diset SESUDAH elemen disembunyikan (display:none via CSS),
      // browser mengabaikan perubahan tsb karena tidak ada area scroll aktif untuk
      // di-reset — inilah sebab bug "masih di bawah saat dibuka lagi".
      resetPdScroll();

      pdModal.classList.remove('is-open');
      document.body.classList.remove('no-scroll');
    };
    if (pdCloseBtn) pdCloseBtn.addEventListener('click', closePD);
    pdModal.addEventListener('click', (e) => { 
      if (e.target === pdModal) closePD(); 
    });

    // Close modal dengan tombol Esc
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && pdModal.classList.contains('is-open')) {
        closePD();
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