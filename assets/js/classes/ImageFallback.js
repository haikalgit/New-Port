/**
 * ImageFallback.js
 * ---------------------------------------------------------
 * Membuat <img> yang gambarnya belum tersedia otomatis menampilkan
 * placeholder rapi (bukan ikon "broken image" browser).
 * Cukup pasang atribut data-label="Nama Placeholder" pada <img>.
 *
 * Saat Anda mengganti file di /assets/images/... dengan foto asli,
 * placeholder otomatis hilang tanpa perlu ubah kode apapun.
 * ---------------------------------------------------------
 */
class ImageFallback {
  static watch(root = document) {
    const images = root.querySelectorAll("img[data-fallback]");
    images.forEach((img) => {
      img.addEventListener("error", () => ImageFallback.#replaceWithPlaceholder(img), {
        once: true,
      });
    });
  }

  static #replaceWithPlaceholder(img) {
    const label = img.dataset.label || img.alt || "Gambar";
    const placeholder = document.createElement("div");
    placeholder.className = "img-placeholder";
    placeholder.setAttribute("role", "img");
    placeholder.setAttribute("aria-label", label);
    placeholder.innerHTML = `${IconLibrary.get("image")}<span>${label}</span>`;
    img.replaceWith(placeholder);
  }
}