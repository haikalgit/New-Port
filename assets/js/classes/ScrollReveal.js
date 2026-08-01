/**
 * ScrollReveal.js
 * Menambahkan class "is-visible" pada elemen ber-class "reveal"
 * atau "reveal-stagger" ketika elemen tersebut masuk viewport.
 */
class ScrollReveal {
  constructor(selector = ".reveal, .reveal-stagger") {
    this.elements = Array.from(document.querySelectorAll(selector));
    if (!this.elements.length) return;

    this.observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    this.elements.forEach((el) => this.observer.observe(el));
  }

  /** Panggil ulang setelah konten baru disuntikkan secara dinamis. */
  refresh(selector = ".reveal, .reveal-stagger") {
    document.querySelectorAll(selector).forEach((el) => {
      if (!el.classList.contains("is-visible")) this.observer.observe(el);
    });
  }
}