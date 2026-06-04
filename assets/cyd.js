/* ============================================================
   CYD — Header (mega-menú) + Footer compartidos + interacciones
   Inyecta nav/footer en cada página para mantener consistencia.
   Cada página define window.CYD_PAGE = 'inicio' | 'nosotros' | ...
============================================================ */
(function () {
  const PHONES = ["989 659 113", "921 341 586", "902 441 534"];
  const tel = (p) => "tel:" + p.replace(/\s/g, "");

  // Categorías y servicios (fuente única de verdad)
  const CATS = [
    {
      id: "transporte",
      n: "01",
      title: "Servicios de Transporte y Traslados",
      short: "Transporte y Traslados",
      services: [
        { id: "ejecutivo", name: "Transporte Ejecutivo y Corporativo" },
        { id: "proyectos", name: "Traslado a Proyectos y Operaciones" },
      ],
    },
    {
      id: "alquiler",
      n: "02",
      title: "Alquiler de Vehículos",
      short: "Alquiler de Vehículos",
      services: [
        { id: "camionetas", name: "Alquiler de Camionetas" },
        { id: "buses", name: "Alquiler de Minibuses" },
        { id: "autos", name: "Alquiler de Autos" },
      ],
    },
    {
      id: "soluciones",
      n: "03",
      title: "Soluciones Integrales",
      short: "Soluciones Integrales",
      services: [
        { id: "movilidad", name: "Soluciones de Movilidad Empresarial" },
      ],
    },
  ];
  window.CYD_CATS = CATS;

  const NAV = [
    { key: "inicio", label: "Inicio", href: "index.html" },
    { key: "nosotros", label: "Nosotros", href: "nosotros.html" },
    { key: "servicios", label: "Servicios", href: "servicios.html", mega: true },
    { key: "contacto", label: "Contacto", href: "contacto.html" },
  ];

  const page = window.CYD_PAGE || "";
  const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>';
  const arrowR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>';

  /* ---------- Mega-menú markup ---------- */
  function megaHTML() {
    const cats = CATS.map((c, i) => `
      <div class="mega-cat${i === 0 ? " active" : ""}" data-cat="${c.id}">
        <span class="cn">${c.n}</span>
        <span class="ct">${c.short}</span>
        <svg class="ca" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
      </div>`).join("");
    const panels = CATS.map((c, i) => `
      <div class="mega-panel${i === 0 ? " active" : ""}" data-panel="${c.id}">
        <h4>${c.title}</h4>
        ${c.services.map(s => `<a href="servicios.html#${s.id}">${s.name}</a>`).join("")}
      </div>`).join("");
    return `<div class="mega"><div class="mega-cats">${cats}</div><div class="mega-panels">${panels}</div></div>`;
  }

  /* ---------- Header ---------- */
  function headerHTML() {
    const links = NAV.map(n => {
      const active = n.key === page ? " active" : "";
      if (n.mega) {
        return `<div class="nav-item${active}"><a href="${n.href}">${n.label} ${chev}</a>${megaHTML()}</div>`;
      }
      return `<a href="${n.href}" class="${active.trim()}">${n.label}</a>`;
    }).join("");
    return `
      <div class="container nav">
        <a href="index.html" class="logo" aria-label="CYD inicio">
          <div class="ticks"><span></span><span></span><span></span></div>
          <div class="logo-stack"><span class="word">CYD</span><span class="tag">Transporte &amp; Alquiler</span></div>
        </a>
        <nav class="nav-links">${links}</nav>
        <div class="nav-cta">
          <a href="cotizacion.html" class="btn btn-primary">Solicitar cotización</a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menú"><span></span><span></span><span></span></button>
        </div>
      </div>`;
  }

  /* ---------- Mobile menu ---------- */
  function mobileHTML() {
    const groups = NAV.map(n => {
      if (n.mega) {
        const cats = CATS.map(c => `
          <div class="mm-group">
            <a class="mm-cat-head" href="servicios.html#cat-${c.id}">${c.n} · ${c.short}</a>
            ${c.services.map(s => `<a href="servicios.html#${s.id}">${s.name}</a>`).join("")}
          </div>`).join("");
        return `<a href="${n.href}">${n.label}</a>${cats}`;
      }
      return `<a href="${n.href}">${n.label}</a>`;
    }).join("");
    return `${groups}<a href="cotizacion.html" class="btn btn-primary">Solicitar cotización</a>`;
  }

  /* ---------- Footer ---------- */
  function footerHTML() {
    return `
      <div class="container">
        <div class="footer-top">
          <div>
            <a href="index.html" class="footer-logo" aria-label="CYD inicio">
              <img src="assets/cyd-logo.png" alt="CYD — Transporte y Alquiler de Vehículos" />
            </a>
            <p class="footer-lema"><span class="q">“</span>Comprometidos con la Seguridad y la Confiabilidad Operacional<span class="q">”</span></p>
          </div>
          <div class="footer-col">
            <h5>Navegación</h5>
            <a href="index.html">Inicio</a>
            <a href="nosotros.html">Nosotros</a>
            <a href="servicios.html">Servicios</a>
            <a href="contacto.html">Contacto</a>
            <a href="cotizacion.html">Solicitar cotización</a>
          </div>
          <div class="footer-col">
            <h5>Servicios</h5>
            <a href="servicios.html#ejecutivo">Transporte Ejecutivo</a>
            <a href="servicios.html#proyectos">Traslado a Proyectos</a>
            <a href="servicios.html#camionetas">Alquiler de Camionetas</a>
            <a href="servicios.html#buses">Alquiler de Minibuses</a>
            <a href="servicios.html#autos">Alquiler de Autos</a>
          </div>
          <div class="footer-col">
            <h5>Contacto · 24/7</h5>
            ${PHONES.map(p => `<a href="${tel(p)}">${p}</a>`).join("")}
            <p style="margin-top:14px;color:rgba(255,255,255,0.5)">Atención los 7 días, las 24 horas.</p>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2025 CYD — Transporte y Alquiler de Vehículos. Todos los derechos reservados.</span>
          <span>Movilidad Minera, Industrial y Ejecutiva</span>
        </div>
      </div>`;
  }

  /* ---------- Mount ---------- */
  function mount() {
    const header = document.getElementById("site-header");
    if (header) header.innerHTML = headerHTML();
    const mm = document.getElementById("mobile-menu");
    if (mm) mm.innerHTML = mobileHTML();
    const footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = footerHTML();

    // Solid header on interior pages (no full hero behind it)
    if (header && document.body.classList.contains("has-page-hero")) header.classList.add("solid");

    // Scroll state
    const onScroll = () => { if (header) header.classList.toggle("scrolled", window.scrollY > 30); };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mega-menú: hover/click categoría -> panel
    document.querySelectorAll(".mega-cat").forEach(cat => {
      const activate = () => {
        const id = cat.dataset.cat;
        cat.closest(".mega").querySelectorAll(".mega-cat").forEach(c => c.classList.toggle("active", c === cat));
        cat.closest(".mega").querySelectorAll(".mega-panel").forEach(p => p.classList.toggle("active", p.dataset.panel === id));
      };
      cat.addEventListener("mouseenter", activate);
      cat.addEventListener("click", activate);
    });

    // Mega-menú: abrir con clic/tap en el enlace padre (táctil o sin hover)
    document.querySelectorAll(".nav-item").forEach(item => {
      if (!item.querySelector(".mega")) return;
      const link = item.querySelector(":scope > a");
      if (!link) return;
      link.addEventListener("click", (e) => {
        // 1.er toque: abre el mega-menú en vez de navegar; 2.º toque: navega.
        if (!item.classList.contains("open")) {
          e.preventDefault();
          document.querySelectorAll(".nav-item.open").forEach(i => { if (i !== item) i.classList.remove("open"); });
          item.classList.add("open");
        }
      });
    });
    // Cerrar el mega-menú al hacer clic fuera
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav-item")) {
        document.querySelectorAll(".nav-item.open").forEach(i => i.classList.remove("open"));
      }
    });

    // Mobile toggle
    const toggle = document.getElementById("nav-toggle");
    if (toggle && mm) {
      const setMenu = (open) => {
        mm.classList.toggle("open", open);
        toggle.classList.toggle("open", open);
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (header) header.classList.toggle("solid", open || window.scrollY > 30 || document.body.classList.contains("has-page-hero"));
        document.body.style.overflow = open ? "hidden" : "";
      };
      toggle.addEventListener("click", () => setMenu(!mm.classList.contains("open")));
      mm.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
      window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    }

    // Reveal on scroll (con red de seguridad robusta)
    // Si el contexto no pinta (pestaña oculta, herramientas de captura),
    // la transición de opacidad nunca avanza: forzamos el estado final.
    const revealAll = () => document.querySelectorAll(".reveal:not(.in)").forEach(el => {
      el.classList.add("in");
      el.style.transition = "none";
      el.style.opacity = "1";
      el.style.transform = "none";
    });
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -7% 0px" });
      document.querySelectorAll(".reveal").forEach(el => io.observe(el));
      setTimeout(revealAll, 1600);
      // Si la página se renderiza en un contexto que no pinta (oculto), fuerza el estado final.
      if (document.visibilityState === "hidden") revealAll();
    } else { revealAll(); }
    window.CYD_revealAll = revealAll;
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();