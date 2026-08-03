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
        <!-- Kolom Kiri: Foto Profil & Badge Di Bawahnya -->
        <div class="hero-profile-col" style="display: flex; flex-direction: column; align-items: center;">
          <div class="hero-photo-frame">
            <!-- Simbol Grafik Batang (Kanan Atas Luar) -->
            <div class="data-floating-badge badge-chart" title="Data Analytics">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
            </div>

            <!-- Simbol Tren Garis (Kiri Bawah Luar) -->
            <div class="data-floating-badge badge-analytics" title="Data Insights">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
            </div>

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

          <!-- Posisinya sekarang dipindah ke bawah foto profil -->
          <span class="eyebrow-badge" style="margin-top: 1.5rem; margin-bottom: 0;">${profile.role}</span>
        </div>
        
        <!-- Kolom Kanan: Teks & Tombol (Tanpa Eyebrow Badge) -->
        <div>
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
            <div class="gallery-wrapper">
              <div class="doc-gallery">
                <div class="doc-gallery-track">
                  <div class="track-original">${galleryItems}</div>
                  <div class="track-duplicate">${galleryItems}</div>
                </div>
              </div>
              <button class="btn-view-more" onclick="window.toggleGallery(this)">Lihat Selengkapnya &nbsp; ▾</button>
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
            <div class="gallery-wrapper">
              <div class="doc-gallery">
                <div class="doc-gallery-track">
                  <div class="track-original">${galleryItems}</div>
                  <div class="track-duplicate">${galleryItems}</div>
                </div>
              </div>
              <button class="btn-view-more" onclick="window.toggleGallery(this)">Lihat Selengkapnya &nbsp; ▾</button>
            </div>
            
            <p class="doc-caption">Momen semasa perkuliahan &amp; presentasi</p>
          </div>
        </div>
        `;
      })
      .join("");
  }

#renderCertifications() {
    // 1. Render Sertifikasi Profesional (Bentuk Kotak Grid)
    const certEl = this.#mount("certGrid");
    if (certEl && this.data.certifications) {
      certEl.innerHTML = this.data.certifications.map(c => this.#generateCertHTML(c)).join("");
    }

    // 2. Render Pelatihan & Bootcamp (Bentuk Kotak Grid)
    const bootcampEl = this.#mount("bootcampGrid");
    if (bootcampEl && this.data.bootcamps) {
      bootcampEl.innerHTML = this.data.bootcamps.map(c => this.#generateCertHTML(c)).join("");
    }

    // 3. Render Sertifikat Pendukung & Seminar (2 Baris Marquee Bersih Tanpa Duplikat Bersebelahan)
    const seminarEl = this.#mount("seminarGrid");
    if (seminarEl && this.data.seminarsRow1 && this.data.seminarsRow2) {
      seminarEl.className = "seminar-gallery-container reveal";
      
      // Ambil data asli row 1 & row 2
      const row1Data = this.data.seminarsRow1;
      const row2Data = this.data.seminarsRow2;

      // Fungsi helper untuk merender elemen figure asli
      const createFigures = (arr) => arr.map(s => 
        `<figure><div class="doc-thumb">${this.#img(s.image, s.name)}</div></figure>`
      ).join("");

      const originalRow1 = createFigures(row1Data);
      const originalRow2 = createFigures(row2Data);

      // Duplikat secukupnya khusus untuk mulusnya animasi berjalan (marquee loop)
      const cloneRow1 = originalRow1.repeat(3);
      const cloneRow2 = originalRow2.repeat(3);

      seminarEl.innerHTML = `
        <div class="gallery-wrapper">
          <!-- Baris 1: Berjalan ke Kiri -->
          <div class="doc-gallery">
            <div class="doc-gallery-track">
              <div class="track-original">${originalRow1}</div>
              <div class="track-duplicate">${cloneRow1}</div>
            </div>
          </div>
          
          <!-- Baris 2: Berjalan ke Kanan (Terbalik) -->
          <div class="doc-gallery second-row" style="margin-top: 1rem;">
            <div class="doc-gallery-track track-reverse">
              <div class="track-original">${originalRow2}</div>
              <div class="track-duplicate">${cloneRow2}</div>
            </div>
          </div>
          
          <button class="btn-view-more" onclick="window.toggleGallery(this)">Lihat Selengkapnya &nbsp; ▾</button>
        </div>
      `;
    }
  }

  // Fungsi template untuk kartu sertifikat grid (biarkan tetap seperti ini)
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
  }

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
    
    // Parameter ditambahkan pada baris di bawah ini agar UI PDF bawaan browser disembunyikan
    if (frame) frame.setAttribute("src", cv.filePath + "#toolbar=0&navpanes=0&scrollbar=0&view=FitH");
    
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
