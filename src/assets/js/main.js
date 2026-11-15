(function () {
  var root = document.documentElement;

  // Text size control (remembered between visits).
  var sizeButtons = document.querySelectorAll(".textsize-btn");
  function applySize(size) {
    if (size) root.dataset.textsize = size;
    else delete root.dataset.textsize;
    sizeButtons.forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(btn.dataset.size === (size || "")));
    });
    try { localStorage.setItem("cbc-text-size", size || ""); } catch (e) {}
  }
  applySize(root.dataset.textsize || "");
  sizeButtons.forEach(function (btn) {
    btn.addEventListener("click", function () { applySize(btn.dataset.size); });
  });

  // Mobile menu.
  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".menu-toggle");
  var label = toggle && toggle.querySelector(".menu-label");
  function setMenu(open) {
    header.classList.toggle("menu-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    if (label) label.textContent = open ? "Close" : "Menu";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      setMenu(!header.classList.contains("menu-open"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && header.classList.contains("menu-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.matchMedia("(min-width: 1101px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  // Header shadow once the page scrolls.
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Gentle fade-in as sections come into view.
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el, i) {
      el.style.transitionDelay = Math.min((i % 4) * 90, 270) + "ms";
      io.observe(el);
    });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }
})();
