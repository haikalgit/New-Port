/**
 * ComponentRenderer.js
 * ---------------------------------------------------------
 * Bertanggung jawab merender seluruh konten dinamis (KPI, skills,
 * pengalaman, pendidikan, sertifikasi, proyek, CV) ke dalam
 * placeholder <section> di index.html berdasarkan PortfolioData.
 *
 * Ini adalah satu-satunya class yang perlu Anda pahami jika ingin
 * mengubah STRUKTUR tampilan. Untuk mengubah ISI, cukup edit
 * assets/js/data/portfolio-data.js.
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

  // ---------- helpers ----------
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

  // ---------- sections ----------
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
    if (!el) return;
    el.innerHTML = `
      <div class="hero-grid">
        <div class="hero-photo-frame">
          <div class="photo-inner">
            ${this.#img(profile.heroPhoto, "Foto Profil " + profile.name)}
          </div>
          <div class="hero-stat-chip hero-stat-chip--1">
            <div class="chip-value">${kpis[0].value}</div>
            <div class="chip-label">${kpis[0].label}</div>
          </div>
          <div class="hero-stat-chip hero-stat-chip--2">
            <div class="chip-value">${kpis[1].value}</div>
            <div class="chip-label">${kpis[1].label}</div>
          </div>
        </div>
        <div>
          <span class="eyebrow-badge">${profile.role}</span>
          <h1 class="hero-title">Halo, saya<br><span class="highlight">${profile.name}</span></h1>
          <p class="hero-desc">${profile.summary}</p>
          <div class="hero-actions">
            <a href="#cv" class="btn btn--primary">${IconLibrary.get("fileText")} Lihat CV Saya</a>
            <a href="#portofolio" class="btn btn--ghost">Jelajahi Portofolio ${IconLibrary.get("arrowRight")}</a>
          </div>
        </div>
      </div>
    `;
  }

  #renderKpis() {
    const el = this.#mount("kpiRow");
    if (!el) return;
    el.innerHTML = this.data.kpis
      .map(
        (k) => `
      <div class="kpi-card" data-tag="${k.tag}">
        <div class="kpi-value">${k.value}</div>
        <div class="kpi-label">${k.label}</div>
        ${this.#sparkline(k.spark)}
      </div>`
      )
      .join("");
  }

  #renderSkills() {
    const { technical, soft } = this.data.skills;
    const el = this.#mount("skillsPanel");
    if (!el) return;
    const chips = (arr) => arr.map((s) => `<span class="tag-chip">${s}</span>`).join("");
    el.innerHTML = `
      <div class="tag-group">
        <div class="tag-group-title">Technical Skills &amp; Tools</div>
        <div class="tag-cloud">${chips(technical)}</div>
      </div>
      <div class="tag-group">
        <div class="tag-group-title">Soft Skills</div>
        <div class="tag-cloud">${chips(soft)}</div>
      </div>
    `;
  }

  #renderExperience() {
    const el = this.#mount("experienceList");
    if (!el) return;
    el.innerHTML = this.data.experience
      .map((exp) => {
        // 1. Buat string elemen foto
        const galleryItems = exp.gallery
          .map((g) => `<figure><div class="doc-thumb">${this.#img(g.src, g.caption)}</div></figure>`)
          .join("");

        return `
        <div class="timeline-item reveal">
          <div class="timeline-rail">
            <div class="timeline-logo">${this.#img(exp.logo, exp.org + " logo")}</div>
          </div>
          <div class="timeline-body">
            <h4 class="entry-title">${exp.title}</h4>
            <div class="entry-org">${exp.org}</div>
            <div class="meta-row">
              <span class="meta-pill">${IconLibrary.get("calendar")} ${exp.period}</span>
              <span class="meta-pill">${IconLibrary.get("pin")} ${exp.location}</span>
            </div>
            <ul>${exp.points.map((p) => `<li>${p}</li>`).join("")}</ul>
            
            <!-- 2. Masukkan ke dalam track dua kali (Asli + Duplikat) -->
            <div class="doc-gallery">
              <div class="doc-gallery-track">
                ${galleryItems}
                ${galleryItems}
              </div>
            </div>
            
            <p class="doc-caption">Dokumentasi kegiatan &amp; rapat tim developer</p>
          </div>
        </div>
        `;
      })
      .join("");
  }

#renderEducation() {
    const el = this.#mount("educationList");
    if (!el) return;
    el.innerHTML = this.data.education
      .map((edu) => {
        // 1. Buat string elemen foto
        const galleryItems = edu.gallery
          .map((g) => `<figure><div class="doc-thumb">${this.#img(g.src, g.caption)}</div></figure>`)
          .join("");

        return `
        <div class="timeline-item reveal">
          <div class="timeline-rail">
            <div class="timeline-logo">${this.#img(edu.logo, edu.institution + " logo")}</div>
          </div>
          <div class="timeline-body">
            <h4 class="entry-title">${edu.degree}</h4>
            <div class="entry-org">${edu.institution}</div>
            <div class="meta-row">
              <span class="meta-pill">${IconLibrary.get("calendar")} ${edu.period}</span>
              <span class="meta-pill">${edu.status.join(" · ")}</span>
              <span class="meta-pill">${edu.gpa}</span>
            </div>
            <div class="entry-thesis">${edu.thesis}</div>
            <ul>${edu.achievements.map((a) => `<li>${a}</li>`).join("")}</ul>
            
            <!-- 2. Masukkan ke dalam track dua kali (Asli + Duplikat) -->
            <div class="doc-gallery">
              <div class="doc-gallery-track">
                ${galleryItems}
                ${galleryItems}
              </div>
            </div>
            
            <p class="doc-caption">Momen semasa perkuliahan &amp; presentasi</p>
          </div>
        </div>
        `;
      })
      .join("");
  }

#renderCertifications() {
    // Render Sertifikasi Profesional
    const certEl = this.#mount("certGrid");
    if (certEl && this.data.certifications) {
      certEl.innerHTML = this.data.certifications.map(c => this.#generateCertHTML(c)).join("");
    }

    // Render Pelatihan & Bootcamp
    const bootcampEl = this.#mount("bootcampGrid");
    if (bootcampEl && this.data.bootcamps) {
      bootcampEl.innerHTML = this.data.bootcamps.map(c => this.#generateCertHTML(c)).join("");
    }

    // Render Sertifikat Pendukung & Seminar
    const seminarEl = this.#mount("seminarGrid");
    if (seminarEl && this.data.seminars) {
      seminarEl.innerHTML = this.data.seminars.map(c => this.#generateCertHTML(c)).join("");
    }
  }

  // Fungsi template untuk kartu sertifikat (agar kode tidak berulang)
  #generateCertHTML(c) {
    return `
      <div class="cert-card reveal">
        <div class="cert-image">${this.#img(c.image, c.name + " - " + c.issuer)}</div>
        <div class="cert-body">
          <h4 class="cert-name">${c.name}</h4>
          <div class="cert-meta">
            <span class="cert-issuer">${c.issuer}</span>
            <span class="cert-year">${c.year}</span>
          </div>
        </div>
      </div>
    `;
  }y

  #renderProjects() {
    const el = this.#mount("projectGrid");
    if (!el) return;
    el.innerHTML = this.data.projects
      .map(
        (p) => `
      <article class="project-card reveal">
        <div class="project-media">
          ${this.#img(p.image, p.title)}
          <span class="project-tool-tag">${p.tool}</span>
        </div>
        <div class="project-body">
          <div class="project-date">${p.course} • ${p.date}</div>
          <h4 class="project-title">${p.title}</h4>
          <p class="project-desc">${p.description}</p>
          <a href="${p.link}" class="project-link">Detail Proyek ${IconLibrary.get("arrowRight")}</a>
        </div>
      </article>`
      )
      .join("");
  }

  #renderCvPreview() {
    const { cv } = this.data;
    const frame = this.#mount("cvEmbed");
    const dl = this.#mount("cvDownloadBtn");
    const dlTop = this.#mount("cvDownloadBtnTop");
    if (frame) frame.setAttribute("src", cv.filePath);
    [dl, dlTop].forEach((btn) => {
      if (!btn) return;
      btn.setAttribute("href", cv.filePath);
      btn.setAttribute("download", cv.fileName);
    });
  }

  #renderFooter() {
    const { profile } = this.data;
    const el = this.#mount("footerContact");
    if (!el) return;
    el.innerHTML = `
      <li>${IconLibrary.get("mail")} <a href="mailto:${profile.email}">${profile.email}</a></li>
      <li>${IconLibrary.get("linkedin")} <a href="${profile.linkedinUrl}" target="_blank" rel="noopener">${profile.linkedin}</a></li>
      <li>${IconLibrary.get("pin")} ${profile.location}</li>
    `;
    const year = this.#mount("footerYear");
    if (year) year.textContent = new Date().getFullYear();
  }
}
