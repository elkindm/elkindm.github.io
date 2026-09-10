(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  const hero = document.querySelector(".hero");

  const onScroll = () => {
    if (!nav) return;
    const pastHero = hero
      ? window.scrollY > Math.max(hero.offsetHeight - 72, 24)
      : window.scrollY > 12;
    nav.classList.toggle("is-scrolled", pastHero);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const open = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const animateCount = (el) => {
    const raw = Number(el.dataset.count);
    if (Number.isNaN(raw)) return;
    const suffix = el.dataset.suffix || "";
    const duration = 1100;
    const start = performance.now();
    const from = 0;
    const to = Math.abs(raw);
    const negative = raw < 0;

    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = Math.round(from + (to - from) * eased);
      el.textContent = `${negative ? "−" : ""}${value}${suffix}`;
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          entry.target
            .querySelectorAll("strong[data-count]")
            .forEach((el) => {
              if (!el.dataset.done) {
                el.dataset.done = "1";
                animateCount(el);
              }
            });
          if (entry.target.matches("strong[data-count]") && !entry.target.dataset.done) {
            entry.target.dataset.done = "1";
            animateCount(entry.target);
          }
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add("is-visible"));
  }
})();
