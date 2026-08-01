/**
 * NavigationController.js
 * Mengelola perilaku header: bayangan saat scroll, menu mobile,
 * dan penyorotan link aktif sesuai section yang sedang dilihat.
 */
class NavigationController {
  constructor({ headerSelector, toggleSelector, linkSelector, sectionSelector }) {
    this.header = document.querySelector(headerSelector);
    this.toggle = document.querySelector(toggleSelector);
    this.links = Array.from(document.querySelectorAll(linkSelector));
    this.sections = Array.from(document.querySelectorAll(sectionSelector));

    if (!this.header) return;
    this.#bindScrollShadow();
    this.#bindMobileToggle();
    this.#bindActiveLinkOnScroll();
    this.#bindLinkAutoClose();
  }

  #bindScrollShadow() {
    const onScroll = () => {
      this.header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  #bindMobileToggle() {
    if (!this.toggle) return;
    this.toggle.addEventListener("click", () => {
      const isOpen = this.header.classList.toggle("nav-open");
      this.toggle.setAttribute("aria-expanded", String(isOpen));
      this.toggle.innerHTML = isOpen ? IconLibrary.get("close") : IconLibrary.get("menu");
    });
  }

  #bindLinkAutoClose() {
    this.links.forEach((link) => {
      link.addEventListener("click", () => {
        this.header.classList.remove("nav-open");
        if (this.toggle) {
          this.toggle.setAttribute("aria-expanded", "false");
          this.toggle.innerHTML = IconLibrary.get("menu");
        }
      });
    });
  }

  #bindActiveLinkOnScroll() {
    if (!this.sections.length || !this.links.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("id");
          this.links.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${id}`);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    this.sections.forEach((section) => observer.observe(section));
  }
}