/**
 * DocGallerySlider.js
 * ---------------------------------------------------------
 * Membuat efek "jendela geser" pada setiap .doc-gallery:
 * selalu menampilkan 3 foto, lalu setiap beberapa detik
 * bergeser satu foto ke kanan (looping tanpa henti).
 *
 *   Awal        : [Foto1][Foto2][Foto3]
 *   +N detik    : [Foto2][Foto3][Foto4]
 *   +N detik    : [Foto3][Foto4][Foto5]
 *   +N detik    : [Foto4][Foto5][Foto1]  ... dst
 *
 * Cara pakai: panggil DocGallerySlider.init() SETELAH
 * ComponentRenderer.renderAll() selesai (galeri harus
 * sudah ada di DOM), lalu panggil ImageFallback.watch()
 * lagi karena elemen <img> di-render ulang.
 * ---------------------------------------------------------
 */
class DocGallerySlider {
  // Jeda antar pergeseran (ms). Ubah sesuai selera.
  static intervalMs = 3000;
  // Lama transisi fade (ms) — harus selaras dengan CSS transition di bawah.
  static fadeMs = 400;

  static init(root = document) {
    root.querySelectorAll(".doc-gallery").forEach((gallery) => {
      DocGallerySlider.#setup(gallery);
    });
  }

  static #setup(gallery) {
    // Ambil semua foto asli (src + label) sebelum grid ditulis ulang
    const originalImgs = Array.from(gallery.querySelectorAll("img"));
    const items = originalImgs.map((img) => ({
      src: img.getAttribute("src"),
      label: img.getAttribute("data-label") || img.getAttribute("alt") || "",
    }));

    // Kalau foto <= 3, tampilkan statis saja, tidak perlu slide
    if (items.length <= 3) return;

    // Bangun ulang galeri: hanya 3 slot tetap
    gallery.innerHTML = "";
    gallery.classList.add("doc-gallery--slider");

    const slots = [];
    for (let i = 0; i < 3; i++) {
      const figure = document.createElement("figure");
      const thumb = document.createElement("div");
      thumb.className = "doc-thumb";
      const img = document.createElement("img");
      img.loading = "lazy";
      img.className = "doc-thumb-img";
      img.setAttribute("data-fallback", "");
      thumb.appendChild(img);
      figure.appendChild(thumb);
      gallery.appendChild(figure);
      slots.push(img);
    }

    let start = 0;

    const paintSlot = (img, item) => {
      img.classList.remove("is-visible");
      window.setTimeout(() => {
        img.src = item.src;
        img.alt = item.label;
        img.setAttribute("data-label", item.label);
        // beri browser satu frame untuk mendaftarkan opacity:0 sebelum fade-in
        requestAnimationFrame(() => {
          requestAnimationFrame(() => img.classList.add("is-visible"));
        });
      }, DocGallerySlider.fadeMs);
    };

    const render = (first = false) => {
      slots.forEach((img, i) => {
        const item = items[(start + i) % items.length];
        if (first) {
          img.src = item.src;
          img.alt = item.label;
          img.setAttribute("data-label", item.label);
          requestAnimationFrame(() => img.classList.add("is-visible"));
        } else {
          paintSlot(img, item);
        }
      });
    };

    render(true);

    setInterval(() => {
      start = (start + 1) % items.length;
      render(false);
    }, DocGallerySlider.intervalMs);
  }
}