/**
 * ComponentRenderer.js
 * ---------------------------------------------------------
 * Bertanggung jawab merender seluruh konten dinamis berdasarkan 
 * PortfolioData dan bahasa aktif (window.currentLang).
 * ---------------------------------------------------------
 */

class ComponentRenderer {
  #typewriterTimer = null;

  constructor(data) {
    this.data = data;
  }

  renderAll() {
    this.#renderNav();
    this.#renderHero();
    this.#renderKpis();
    this.#renderSkills();
    this.#renderExperience();
    this.#renderEducation();
    this.#renderCertifications();
    this.#renderProjects();
    this.#renderCvPreview();
    this.#renderFooter();
    ImageFallback.watch(document);
  }

  #lang() {
    return window.currentLang || 'id';
  }

  #mount(id) {
    return document.getElementById(id);
  }

  #img(src, label, extraClass = "") {
    return `<img src="${src}" data-fallback data-label="${label}" alt="${label}" class="${extraClass}" loading="lazy">`;
  }

  #sparkline(values) {
    const w = 120, h = 32;
    const max = Math.max(...values), min = Math.min(...values);
    const step = w / (values.length - 1);
    const points = values.map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / (max - min || 1)) * (h - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return `<svg class="kpi-sparkline" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">
      <polyline fill="none" stroke="var(--color-accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" points="${points.join(" ")}"/>
    </svg>`;
  }

  #padItems(items, targetCount) {
    if (!items || items.length === 0) return [];
    if (items.length >= targetCount) return items;
    const padded = [];
    for (let i = 0; i < targetCount; i++) {
      padded.push(items[i % items.length]);
    }
    return padded;
  }

  #getGlobalMarqueeMax() {
    const lengths = [];
    (this.data.experience || []).forEach(exp => lengths.push((exp.gallery || []).length));
    (this.data.education || []).forEach(edu => lengths.push((edu.gallery || []).length));
    lengths.push((this.data.seminarsRow1 || []).length);
    lengths.push((this.data.seminarsRow2 || []).length);
    return Math.max(1, ...lengths);
  }

  #renderNav() {
    const { site } = this.data;
    const brand = this.#mount("brandSlot");
    if (brand) {
      brand.innerHTML = `<span class="brand-mark">${site.brandInitials}</span> ${site.brandName}`;
    }
  }

  #renderHero() {
    const { profile, kpis } = this.data;
    const el = this.#mount("heroContent");
    const lang = this.#lang();
    if (!el) return;

    this.heroRevealed = false;

    const summaryText = typeof profile.summary === 'object' ? profile.summary[lang] : profile.summary;
    const greetingText = typeof profile.greeting === 'object' ? profile.greeting[lang] : "Halo, saya";
    const btnCvText = lang === 'en' ? "View My CV" : "Lihat CV Saya";
    const btnExploreText = lang === 'en' ? "Explore Portfolio" : "Jelajahi Portofolio";

    el.innerHTML = `
      <div class="hero-grid">
        <div class="hero-profile-col" style="display: flex; flex-direction: column; align-items: center;">
          <div class="hero-photo-frame">
            <div class="data-floating-badge badge-chart" title="Data Analytics">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            </div>
            <div class="data-floating-badge badge-analytics" title="Data Insights">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>
            <div class="photo-inner">
              ${this.#img(profile.heroPhoto, "Foto Profil " + profile.name)}
            </div>
            <div class="hero-stat-chip hero-stat-chip--1">
              <div class="chip-value">${kpis[0].value}</div>
              <div class="chip-label">${typeof kpis[0].label === 'object' ? kpis[0].label[lang] : kpis[0].label}</div>
            </div>
            <div class="hero-stat-chip hero-stat-chip--2">
              <div class="chip-value">${kpis[1].value}</div>
              <div class="chip-label">${typeof kpis[1].label === 'object' ? kpis[1].label[lang] : kpis[1].label}</div>
            </div>
          </div>
          
          <span class="eyebrow-badge animated-role-badge" style="margin-top: 1.5rem; margin-bottom: 0;">
            <span class="trend-chart">
              <svg viewBox="0 0 24 12" width="28" height="14">
                <path d="M0,3 H24 M0,6 H24 M0,9 H24" stroke="#cbd5e1" stroke-width="0.5" stroke-dasharray="2 1"/>
                <polyline points="0,6 4,4 9,10" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="trend-red" />
                <polyline points="9,10 14,3 18,5 24,1" fill="none" stroke="#10b981" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="trend-green" />
                <circle cx="24" cy="1" r="1.5" fill="#10b981" class="trend-dot" />
              </svg>
            </span>
            ${profile.role}
          </span>
          
        </div>
        <div>
          <h1 class="hero-title" style="min-height: 2.4em; line-height: 1.2;">
            <span id="tw-line1"></span><br>
            <span id="tw-line2" class="highlight"></span><span class="tw-cursor">|</span>
          </h1>
          
          <p id="heroDesc" class="hero-desc" style="opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);">${summaryText}</p>
          <div id="heroActions" class="hero-actions" style="opacity: 0; transform: translateY(24px); transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;">
            <a href="#cv" class="btn btn--primary">${IconLibrary.get("fileText")} ${btnCvText}</a>
            <a href="#portofolio" class="btn btn--ghost">${btnExploreText} ${IconLibrary.get("arrowRight")}</a>
          </div>
        </div>
      </div>
    `;

    this.#startTypewriter(greetingText, profile.name);

    setTimeout(() => {
      this.#revealHeroElements();
    }, 100);
  }

  #revealHeroElements() {
    if (this.heroRevealed) return;
    this.heroRevealed = true;

    const descEl = document.getElementById("heroDesc");
    const actionsEl = document.getElementById("heroActions");
    const kpiCards = document.querySelectorAll('.kpi-card');

    if (descEl) { descEl.style.opacity = "1"; descEl.style.transform = "translateY(0)"; }
    if (actionsEl) { actionsEl.style.opacity = "1"; actionsEl.style.transform = "translateY(0)"; }

    kpiCards.forEach((card, index) => {
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = ""; 
        setTimeout(() => { card.style.transition = ""; }, 800);
      }, 200 + (index * 150));
    });
  }

  #startTypewriter(text1, text2) {
    const el1 = document.getElementById("tw-line1");
    const el2 = document.getElementById("tw-line2");
    
    if (!el1 || !el2) return;
    if (this.#typewriterTimer) clearTimeout(this.#typewriterTimer);

    let line1Current = "";
    let line2Current = "";
    let phase = "line1"; 

    const type = () => {
      let typingSpeed = 80;

      if (phase === "line1") {
        line1Current = text1.substring(0, line1Current.length + 1);
        el1.textContent = line1Current;
        if (line1Current === text1) {
          phase = "line2";
          typingSpeed = 300; 
        }
      } 
      else if (phase === "line2") {
        line2Current = text2.substring(0, line2Current.length + 1);
        el2.textContent = line2Current;

        if (line2Current === text2) {
          phase = "deletingLine2";
          typingSpeed = 2500; 
        }
      }
      else if (phase === "deletingLine2") {
        typingSpeed = 40; 
        line2Current = text2.substring(0, line2Current.length - 1);
        el2.textContent = line2Current;

        if (line2Current === "") {
          phase = "line2"; 
          typingSpeed = 500; 
        }
      }

      this.#typewriterTimer = setTimeout(type, typingSpeed);
    };

    type();
  }

  #renderKpis() {
    const el = this.#mount("kpiRow");
    const lang = this.#lang();
    if (!el) return;
    el.innerHTML = this.data.kpis
      .map(
        (k) => {
          const tagText = typeof k.tag === 'object' ? k.tag[lang] : k.tag;
          const labelText = typeof k.label === 'object' ? k.label[lang] : k.label;
          return `
          <div class="kpi-card" data-tag="${tagText}" style="opacity: 0; transform: translateY(24px); transition: opacity 0.8s ease-out, transform 0.8s ease-out;">
            <div class="kpi-value">${k.value}</div>
            <div class="kpi-label">${labelText}</div>
            ${this.#sparkline(k.spark)}
          </div>`;
        }
      )
      .join("");
  }

  #renderSkills() {
    const { technical, soft, title, subtitle, technicalTitle, softTitle } = this.data.skills;
    const el = this.#mount("skillsPanel");
    const lang = this.#lang();
    
    const sectionTitleEl = document.querySelector('#keahlian .section-title');
    const sectionSubEl = document.querySelector('#keahlian .section-subtitle');
    
    if (sectionTitleEl) sectionTitleEl.textContent = typeof title === 'object' ? title[lang] : title;
    if (sectionSubEl) sectionSubEl.textContent = typeof subtitle === 'object' ? subtitle[lang] : subtitle;

    if (!el) return;

    const tTitle = typeof technicalTitle === 'object' ? technicalTitle[lang] : "Technical Skills & Tools";
    const sTitle = typeof softTitle === 'object' ? softTitle[lang] : "Soft Skills";

    const techArr = Array.isArray(technical) ? technical : (technical[lang] || technical['id']);
    const softArr = Array.isArray(soft) ? soft : (soft[lang] || soft['id']);

    const chips = (arr, startIndex = 0) => arr.map((s, index) => 
      `<span class="tag-chip" style="--delay: ${startIndex + index};">${s}</span>`
    ).join("");
    
    const iconTech = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`;
    const iconSoft = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`;
    
    el.innerHTML = `
      <div class="tag-group reveal">
        <div class="tag-group-title">${iconTech} ${tTitle}</div>
        <div class="tag-cloud">${chips(techArr, 0)}</div>
      </div>
      <div class="tag-group reveal" style="margin-top: 3rem;">
        <div class="tag-group-title">${iconSoft} ${sTitle}</div>
        <div class="tag-cloud">${chips(softArr, techArr.length)}</div>
      </div>
    `;
  }

  #renderExperience() {
    const el = this.#mount("experienceList");
    const lang = this.#lang();
    if (!el) return;

    const panelTitle = document.querySelector('#pengalaman .panel-header h3');
    if (panelTitle) panelTitle.textContent = lang === 'en' ? 'Work Experience' : 'Pengalaman Kerja';

    const marqueeMax = this.#getGlobalMarqueeMax();

    el.innerHTML = this.data.experience
      .map((exp) => {
        const titleText = typeof exp.title === 'object' ? exp.title[lang] : exp.title;
        const periodText = typeof exp.period === 'object' ? exp.period[lang] : exp.period;
        const locationText = typeof exp.location === 'object' ? exp.location[lang] : exp.location;
        const pointsArr = typeof exp.points === 'object' && exp.points[lang] ? exp.points[lang] : exp.points;
        const viewMoreText = lang === 'en' ? 'More Documentation ▾' : 'Dokumentasi Selengkapnya ▾';
        const captionText = lang === 'en' ? 'Developer team activity & meeting documentation' : 'Dokumentasi kegiatan & rapat tim developer';

        const galleryItems = exp.gallery
          .map((g) => `<figure><div class="doc-thumb">${this.#img(g.src, g.caption)}</div></figure>`)
          .join("");

        const paddedItems = this.#padItems(exp.gallery, marqueeMax);
        const duplicatedItems = paddedItems
          .map((g) => `<figure><div class="doc-thumb">${this.#img(g.src, g.caption)}</div></figure>`)
          .join("");

        return `
        <div class="timeline-item reveal">
          <div class="timeline-rail">
            <div class="timeline-logo">${this.#img(exp.logo, exp.org + " logo")}</div>
          </div>
          <div class="timeline-body">
            <h4 class="entry-title">${titleText}</h4>
            <div class="entry-org">${exp.org}</div>
            <div class="meta-row">
              <span class="meta-pill">${IconLibrary.get("calendar")} ${periodText}</span>
              <span class="meta-pill">${IconLibrary.get("pin")} ${locationText}</span>
            </div>
            <ul>${pointsArr.map((p) => `<li>${p}</li>`).join("")}</ul>
            <div class="gallery-wrapper">
              <div class="doc-gallery">
                <div class="doc-gallery-track">
                  <div class="track-original">${galleryItems}</div>
                  <div class="track-duplicate">${duplicatedItems}</div>
                </div>
              </div>
              <button class="btn-view-more" onclick="window.toggleGallery(this)">${viewMoreText}</button>
            </div>
            <p class="doc-caption">${captionText}</p>
          </div>
        </div>
        `;
      })
      .join("");
  }

  #renderEducation() {
    const el = this.#mount("educationList");
    const lang = this.#lang();
    if (!el) return;

    const panelTitle = document.querySelector('#pendidikan .panel-header h3');
    if (panelTitle) panelTitle.textContent = lang === 'en' ? 'Education' : 'Pendidikan';

    const marqueeMax = this.#getGlobalMarqueeMax();

    el.innerHTML = this.data.education
      .map((edu) => {
        const degreeText = typeof edu.degree === 'object' ? edu.degree[lang] : edu.degree;
        const periodText = typeof edu.period === 'object' ? edu.period[lang] : edu.period;
        const statusArr = typeof edu.status === 'object' && edu.status[lang] ? edu.status[lang] : edu.status;
        const gpaText = typeof edu.gpa === 'object' ? edu.gpa[lang] : edu.gpa;
        const thesisText = typeof edu.thesis === 'object' ? edu.thesis[lang] : edu.thesis;
        const achievementsArr = typeof edu.achievements === 'object' && edu.achievements[lang] ? edu.achievements[lang] : edu.achievements;
        const viewMoreText = lang === 'en' ? 'More Documentation ▾' : 'Dokumentasi Selengkapnya ▾';
        const captionText = lang === 'en' ? 'Lectures & presentation moments' : 'Momen semasa perkuliahan & presentasi';

        const galleryItems = edu.gallery
          .map((g) => `<figure><div class="doc-thumb">${this.#img(g.src, g.caption)}</div></figure>`)
          .join("");

        const paddedItems = this.#padItems(edu.gallery, marqueeMax);
        const duplicatedItems = paddedItems
          .map((g) => `<figure><div class="doc-thumb">${this.#img(g.src, g.caption)}</div></figure>`)
          .join("");

        return `
        <div class="timeline-item reveal">
          <div class="timeline-rail">
            <div class="timeline-logo">${this.#img(edu.logo, edu.institution + " logo")}</div>
          </div>
          <div class="timeline-body">
            <h4 class="entry-title">${degreeText}</h4>
            <div class="entry-org">${edu.institution}</div>
            <div class="meta-row">
              <span class="meta-pill">${IconLibrary.get("calendar")} ${periodText}</span>
              <span class="meta-pill">${statusArr.join(" · ")}</span>
              <span class="meta-pill">${gpaText}</span>
            </div>
            <div class="entry-thesis">${thesisText}</div>
            <ul>${achievementsArr.map((a) => `<li>${a}</li>`).join("")}</ul>
            <div class="gallery-wrapper">
              <div class="doc-gallery">
                <div class="doc-gallery-track">
                  <div class="track-original">${galleryItems}</div>
                  <div class="track-duplicate">${duplicatedItems}</div>
                </div>
              </div>
              <button class="btn-view-more" onclick="window.toggleGallery(this)">${viewMoreText}</button>
            </div>
            <p class="doc-caption">${captionText}</p>
          </div>
        </div>
        `;
      })
      .join("");
  }

  #renderCertifications() {
    const certEl = this.#mount("certGrid");
    const lang = this.#lang();
    if (certEl && this.data.certifications) {
      // Mengirimkan index untuk mengatur urutan delay
      certEl.innerHTML = this.data.certifications.map((c, index) => this.#generateCertHTML(c, lang, index)).join("");
    }

    const bootcampEl = this.#mount("bootcampGrid");
    if (bootcampEl && this.data.bootcamps) {
      // Mengirimkan index untuk mengatur urutan delay
      bootcampEl.innerHTML = this.data.bootcamps.map((c, index) => this.#generateCertHTML(c, lang, index)).join("");
    }

    const seminarEl = this.#mount("seminarGrid");
    if (seminarEl) {
      seminarEl.className = "seminar-gallery-container reveal";
      const viewMoreText = lang === 'en' ? 'More Documentation ▾' : 'Dokumentasi Selengkapnya ▾';
      
      const row1Data = this.data.seminarsRow1 || [];
      const row2Data = this.data.seminarsRow2 || [];
      const marqueeMax = this.#getGlobalMarqueeMax();

      const createFigures = (arr) => arr.map(s => 
        `<figure><div class="doc-thumb">${this.#img(s.image, s.name)}</div></figure>`
      ).join("");

      const originalRow1 = createFigures(row1Data);
      const originalRow2 = createFigures(row2Data);

      const paddedRow1 = this.#padItems(row1Data, marqueeMax);
      const paddedRow2 = this.#padItems(row2Data, marqueeMax);
      const duplicateRow1 = createFigures(paddedRow1);
      const duplicateRow2 = createFigures(paddedRow2);

      seminarEl.innerHTML = `
        <div class="gallery-wrapper">
          <div class="doc-gallery">
            <div class="doc-gallery-track">
              <div class="track-original">${originalRow1}</div>
              <div class="track-duplicate">${duplicateRow1}</div>
            </div>
          </div>
          <div class="doc-gallery second-row" style="margin-top: 1rem;">
            <div class="doc-gallery-track track-reverse">
              <div class="track-original">${originalRow2}</div>
              <div class="track-duplicate">${duplicateRow2}</div>
            </div>
          </div>
          <button class="btn-view-more" onclick="window.toggleGallery(this)">${viewMoreText}</button>
        </div>
      `;
    }
  }

  // Menambahkan parameter index dan CSS inline variabel --card-delay
  #generateCertHTML(c, lang, index = 0) {
    const nameText = typeof c.name === 'object' ? c.name[lang] : c.name;
    return `
      <div class="cert-card reveal" style="--card-delay: ${index};">
        <div class="cert-image">${this.#img(c.image, nameText + " - " + c.issuer)}</div>
        <div class="cert-body">
          <h4 class="cert-name">${nameText}</h4>
          <div class="cert-meta">
            <span class="cert-issuer">${c.issuer}</span>
            <span class="cert-year">${c.year}</span>
          </div>
        </div>
      </div>
    `;
  }

  #renderProjects() {
    const el = this.#mount("projectGrid");
    const lang = this.#lang();
    if (!el) return;
    const detailText = lang === 'en' ? 'Project Detail' : 'Detail Proyek';

    el.innerHTML = this.data.projects
      .map(
        (p, index) => { // PERBAIKAN: Menambahkan parameter index
          const titleText = typeof p.title === 'object' ? p.title[lang] : p.title;
          const descText = typeof p.description === 'object' ? p.description[lang] : p.description;
          const dateText = typeof p.date === 'object' ? p.date[lang] : p.date;
          const courseText = typeof p.course === 'object' ? p.course[lang] : p.course;

          return `
          <!-- PERBAIKAN: Menambahkan inline style CSS variable untuk delay animasi -->
          <article class="project-card reveal" style="--card-delay: ${index};">
            <div class="project-media" onclick="openLightbox('${p.image}')" style="cursor: zoom-in;">
              <img src="${p.image}" alt="${titleText}" style="width: 100%; height: 100%; object-fit: cover !important;">
              <span class="project-tool-tag">${p.tool}</span>
            </div>
            <div class="project-body">
              <div class="project-date">${courseText} • ${dateText}</div>
              <h4 class="project-title">${titleText}</h4>
              <p class="project-desc">${descText}</p>
              <a href="${p.link}" class="project-link">${detailText} ${IconLibrary.get("arrowRight")}</a>
            </div>
          </article>`;
        }
      )
      .join("");
  }

  #renderCvPreview() {
    const { cv } = this.data;
    const frame = this.#mount("cvEmbed");
    const dl = this.#mount("cvDownloadBtn");
    const dlTop = this.#mount("cvDownloadBtnTop");
    const lang = this.#lang();

    [dl, dlTop].forEach((btn) => {
      if (!btn) return;
      btn.setAttribute("href", cv.filePath);
      btn.setAttribute("download", cv.fileName);
    });

    if (!frame) return;

    let images = [];
    if (Array.isArray(cv.previewImages) && cv.previewImages.length > 0) {
      images = cv.previewImages;
    } else if (cv.previewImage) {
      images = [cv.previewImage];
    } else {
      images = [frame.getAttribute('src') || ""];
    }

    let currentIndex = 0;
    const parent = frame.parentElement;
    
    if (!parent.classList.contains('cv-slider-container')) {
      parent.classList.add('cv-slider-container');
      frame.style.display = 'none'; 

      const track = document.createElement('div');
      track.className = 'cv-slider-track';
      
      images.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'cv-slide-img';
        img.alt = `CV Page ${idx + 1}`;
        img.setAttribute('loading', 'lazy');
        img.setAttribute('data-fallback', ''); 
        track.appendChild(img);
      });
      
      parent.appendChild(track);

      const controls = document.createElement('div');
      controls.className = 'cv-controls';
      controls.id = 'cvControls';
      
      const targetFrame = parent.closest('.cv-frame-wrap') || parent;
      targetFrame.insertAdjacentElement('afterend', controls);

      controls.innerHTML = `
        <button id="cvPrevBtn" class="btn btn--ghost cv-nav-btn"></button>
        <span id="cvPageNum"></span>
        <button id="cvNextBtn" class="btn btn--ghost cv-nav-btn"></button>
      `;

      const syncWidth = () => {
        const frameWidth = targetFrame.getBoundingClientRect().width;
        if (frameWidth > 0) {
          controls.style.width = frameWidth + 'px'; 
        }
      };

      if (window.ResizeObserver) {
        const observer = new ResizeObserver(() => syncWidth());
        observer.observe(targetFrame);
      } else {
        window.addEventListener('resize', syncWidth);
      }
      setTimeout(syncWidth, 150);

      // LOGIKA GESER & HILANGKAN TOMBOL
      const updateSlider = () => {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        const pageNum = document.getElementById('cvPageNum');
        const prevBtn = document.getElementById('cvPrevBtn');
        const nextBtn = document.getElementById('cvNextBtn');
        
        if (pageNum) pageNum.textContent = `${currentIndex + 1} / ${images.length}`;
        
        // Logika Fleksibel: Sembunyikan tombol 'Sebelumnya' jika di halaman pertama (index 0)
        if (prevBtn) {
          prevBtn.style.visibility = currentIndex === 0 ? 'hidden' : 'visible';
          prevBtn.style.opacity = currentIndex === 0 ? '0' : '1';
        }
        
        // Logika Fleksibel: Sembunyikan tombol 'Selanjutnya' jika di halaman terakhir
        if (nextBtn) {
          nextBtn.style.visibility = currentIndex === images.length - 1 ? 'hidden' : 'visible';
          nextBtn.style.opacity = currentIndex === images.length - 1 ? '0' : '1';
        }

        // Opsional: Sembunyikan seluruh baris angka dan tombol jika CV cuma 1 halaman
        if (images.length <= 1) {
          controls.style.display = 'none';
        }
      };

      controls.addEventListener('click', (e) => {
        const prevBtn = e.target.closest('#cvPrevBtn');
        const nextBtn = e.target.closest('#cvNextBtn');
        
        if (prevBtn && currentIndex > 0) {
          currentIndex--;
          updateSlider();
        } else if (nextBtn && currentIndex < images.length - 1) {
          currentIndex++;
          updateSlider();
        }
      });

      updateSlider();
    }

    const prevBtn = document.getElementById('cvPrevBtn');
    const nextBtn = document.getElementById('cvNextBtn');
    if (prevBtn) prevBtn.innerHTML = `&larr; ${lang === 'en' ? 'Previous' : 'Sebelumnya'}`;
    if (nextBtn) nextBtn.innerHTML = `${lang === 'en' ? 'Next' : 'Selanjutnya'} &rarr;`;
  }

  #renderFooter() {
    const { profile } = this.data;
    const el = this.#mount("footerContact");
    const lang = this.#lang();
    if (!el) return;

    const locationText = typeof profile.location === 'object' ? profile.location[lang] : profile.location;

    el.innerHTML = `
      <li>${IconLibrary.get("mail")} <a href="mailto:${profile.email}">${profile.email}</a></li>
      <li>${IconLibrary.get("linkedin")} <a href="${profile.linkedinUrl}" target="_blank" rel="noopener">${profile.linkedin}</a></li>
      <li>${IconLibrary.get("pin")} ${locationText}</li>
    `;
    const year = this.#mount("footerYear");
    if (year) year.textContent = new Date().getFullYear();
  }
}

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

    window.addEventListener('resize', updateMarqueeSpeed);
    setTimeout(updateMarqueeSpeed, 300);

    const marqueeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animationPlayState = 'running';
        } else {
          entry.target.style.animationPlayState = 'paused';
        }
      });
    }, { threshold: 0, rootMargin: "50px 0px 50px 0px" });

    marqueeTracks.forEach(track => marqueeObserver.observe(track));
  }

  #setupLightbox() {
    const lightbox = document.getElementById('imageLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxDialog = document.querySelector('.lightbox-dialog'); 
    const closeBtn = document.querySelector('.lightbox-close');
    const prevBtn = document.querySelector('.lightbox-prev');
    const nextBtn = document.querySelector('.lightbox-next');

    if (!lightbox) return;

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
      document.body.classList.remove('no-scroll');
      
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
          img.style.cursor = 'zoom-in';

          thumb.appendChild(img);
          figure.appendChild(thumb);
          gridModalBody.appendChild(figure);
        });

        gridModal.classList.add('is-open');
        document.body.classList.add('no-scroll');
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
    
    // KUNCI PERBAIKAN: Refresh observer setelah elemen di-render ulang
    // agar kapsul keahlian muncul kembali!
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

document.addEventListener("DOMContentLoaded", () => {
  globalApp = new PortfolioApp(PortfolioData);
  globalApp.init();
  applyLanguage(currentLang);
});