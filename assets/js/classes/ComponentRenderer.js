/**
 * ComponentRenderer.js
 * ---------------------------------------------------------
 * Bertanggung jawab merender seluruh konten dinamis berdasarkan 
 * PortfolioData dan bahasa aktif (window.currentLang).
 * ---------------------------------------------------------
 */
class ComponentRenderer {
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

  /**
   * ============================================================
   * NORMALISASI JUMLAH ITEM MARQUEE (kunci penyamaan kecepatan)
   * ============================================================
   * Semua galeri marquee (Pengalaman, Pendidikan, Seminar) dipadatkan
   * ke jumlah item yang SAMA PERSIS (= jumlah terbanyak di antara semua
   * galeri yang ada). Dengan jumlah figure yang identik di setiap galeri,
   * lebar total track (figure x count + gap x count) otomatis identik,
   * sehingga kecepatan visual otomatis sama tanpa perlu kalkulasi lebar
   * yang rumit dan rawan meleset.
   *
   * Foto yang jumlahnya kurang akan diulang (cycle) sampai mencapai
   * jumlah target — ini aman untuk marquee karena kontennya memang
   * akan terlihat berulang saat loop.
   */
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
          <span class="eyebrow-badge" style="margin-top: 1.5rem; margin-bottom: 0;">${profile.role}</span>
        </div>
        <div>
          <h1 class="hero-title">${greetingText}<br><span class="highlight">${profile.name}</span></h1>
          <p class="hero-desc">${summaryText}</p>
          <div class="hero-actions">
            <a href="#cv" class="btn btn--primary">${IconLibrary.get("fileText")} ${btnCvText}</a>
            <a href="#portofolio" class="btn btn--ghost">${btnExploreText} ${IconLibrary.get("arrowRight")}</a>
          </div>
        </div>
      </div>
    `;
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
          <div class="kpi-card" data-tag="${tagText}">
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

    const chips = (arr) => arr.map((s) => `<span class="tag-chip">${s}</span>`).join("");
    
    el.innerHTML = `
      <div class="tag-group">
        <div class="tag-group-title">${tTitle}</div>
        <div class="tag-cloud">${chips(techArr)}</div>
      </div>
      <div class="tag-group">
        <div class="tag-group-title">${sTitle}</div>
        <div class="tag-cloud">${chips(softArr)}</div>
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

        // track-original: foto ASLI apa adanya (dipakai lightbox & grid modal, jangan diubah)
        const galleryItems = exp.gallery
          .map((g) => `<figure><div class="doc-thumb">${this.#img(g.src, g.caption)}</div></figure>`)
          .join("");

        // track-duplicate: dipadatkan ke jumlah target GLOBAL yang sama untuk semua galeri,
        // lalu digandakan SIMETRIS 1x (bukan rasio ganjil) — supaya lebar total track
        // (original + duplicate) SAMA di semua galeri, dan trik loop translateX(-50%)
        // tetap presisi seperti desain aslinya.
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
      certEl.innerHTML = this.data.certifications.map(c => this.#generateCertHTML(c, lang)).join("");
    }

    const bootcampEl = this.#mount("bootcampGrid");
    if (bootcampEl && this.data.bootcamps) {
      bootcampEl.innerHTML = this.data.bootcamps.map(c => this.#generateCertHTML(c, lang)).join("");
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

      // Sama seperti Pengalaman/Pendidikan: padatkan ke jumlah target GLOBAL,
      // lalu duplikasi simetris 1x — bukan repeat(3) seperti sebelumnya.
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

  #generateCertHTML(c, lang) {
    const nameText = typeof c.name === 'object' ? c.name[lang] : c.name;
    return `
      <div class="cert-card reveal">
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
        (p) => {
          const titleText = typeof p.title === 'object' ? p.title[lang] : p.title;
          const descText = typeof p.description === 'object' ? p.description[lang] : p.description;
          const dateText = typeof p.date === 'object' ? p.date[lang] : p.date;
          const courseText = typeof p.course === 'object' ? p.course[lang] : p.course;

          return `
          <article class="project-card reveal">
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

    if (frame) frame.setAttribute("src", cv.previewImage);

    [dl, dlTop].forEach((btn) => {
      if (!btn) return;
      btn.setAttribute("href", cv.filePath);
      btn.setAttribute("download", cv.fileName);
    });
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