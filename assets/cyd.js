/* ============================================================
   CYD — Header (mega-menú) + Footer compartidos + interacciones
   Inyecta nav/footer en cada página para mantener consistencia.
   Cada página define window.CYD_PAGE = 'inicio' | 'nosotros' | ...
============================================================ */
(function () {
  const PHONES = ["989 659 113", "921 341 586", "902 441 534", "942 894 250"];
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
    { key: "inicio", label: "Inicio", href: "/" },
    { key: "nosotros", label: "Nosotros", href: "/nosotros" },
    { key: "servicios", label: "Servicios", href: "/servicios", mega: true },
    { key: "contacto", label: "Contacto", href: "/contacto" },
  ];

  const page = window.CYD_PAGE || "";
  const chev = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 9l6 6 6-6"/></svg>';
  const arrowR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>';
  const phoneSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/></svg>';
  const waSVG = '<svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16.04 4C9.93 4 4.98 8.95 4.98 15.06c0 2.05.56 4.05 1.62 5.8L4.8 27.2l6.5-1.7a11 11 0 0 0 4.74 1.08h.01c6.1 0 11.06-4.95 11.06-11.06C27.11 8.95 22.15 4 16.04 4Zm0 20.2a9.1 9.1 0 0 1-4.64-1.27l-.33-.2-3.86 1.01 1.03-3.76-.22-.39a9.06 9.06 0 0 1-1.39-4.83c0-5.04 4.1-9.14 9.15-9.14 2.44 0 4.74.95 6.46 2.68a9.08 9.08 0 0 1 2.68 6.47c0 5.05-4.1 9.15-9.13 9.15Zm5.02-6.85c-.27-.14-1.62-.8-1.87-.89-.25-.09-.43-.14-.62.14-.18.27-.71.89-.87 1.07-.16.18-.32.2-.59.07-.27-.14-1.16-.43-2.2-1.36-.81-.72-1.36-1.62-1.52-1.89-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.46.09-.18.05-.34-.02-.48-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47l-.53-.01c-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.29s.98 2.66 1.12 2.84c.14.18 1.93 2.95 4.68 4.13.65.28 1.16.45 1.56.58.66.21 1.25.18 1.72.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.18.16-1.3-.07-.11-.25-.18-.52-.32Z"/></svg>';
  const waLink = (raw) => `https://wa.me/51${raw.replace(/\D/g, "")}?text=Hola%20CYD%2C%20quisiera%20informaci%C3%B3n%20sobre%20sus%20servicios.`;

  /* ---------- Mega-menú markup ---------- */
  function megaHTML() {
    const cats = CATS.map((c, i) => `
      <a class="mega-cat${i === 0 ? " active" : ""}" data-cat="${c.id}" href="/servicios#cat-${c.id}">
        <span class="cn">${c.n}</span>
        <span class="ct">${c.short}</span>
        <svg class="ca" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
      </a>`).join("");
    const panels = CATS.map((c, i) => `
      <div class="mega-panel${i === 0 ? " active" : ""}" data-panel="${c.id}">
        <h4>${c.title}</h4>
        ${c.services.map(s => `<a href="/servicios#${s.id}">${s.name}</a>`).join("")}
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
        <a href="/" class="logo" aria-label="CYD inicio">
          <div class="ticks"><span></span><span></span><span></span></div>
          <div class="logo-stack"><span class="word">CYD</span><span class="tag">Transporte &amp; Alquiler</span></div>
        </a>
        <nav class="nav-links">${links}</nav>
        <div class="nav-cta">
          <a href="/cotizacion" class="btn btn-primary">Solicitar cotización</a>
          <button class="nav-toggle" id="nav-toggle" aria-label="Menú"><span></span><span></span><span></span></button>
        </div>
      </div>`;
  }

  /* ---------- Mobile menu ---------- */
  function mobileHTML() {
    const groups = NAV.map(n => {
      const active = n.key === page ? " active" : "";
      if (n.mega) {
        const cats = CATS.map(c => `
          <a class="mm-cat-head" href="/servicios#cat-${c.id}">${c.n} · ${c.short}</a>
          ${c.services.map(s => `<a class="mm-svc" href="/servicios#${s.id}">${s.name}</a>`).join("")}`).join("");
        const open = n.key === page ? " open" : "";
        return `
          <div class="mm-acc${open}">
            <button class="mm-acc-head${active}" type="button" aria-expanded="${open ? "true" : "false"}">
              <span>${n.label}</span>${chev}
            </button>
            <div class="mm-acc-body">
              <a class="mm-all" href="${n.href}">Ver todos los servicios</a>
              ${cats}
            </div>
          </div>`;
      }
      return `<a class="mm-link${active}" href="${n.href}">${n.label}</a>`;
    }).join("");
    const contact = `
      <div class="mm-contact">
        <a class="btn-wa" href="${waLink(PHONES[0])}" target="_blank" rel="noopener">${waSVG}Escríbete por WhatsApp</a>
        <a class="mm-call" href="${tel(PHONES[0])}">${phoneSVG}Llamar ${PHONES[0]}</a>
      </div>`;
    return `${groups}<a href="/cotizacion" class="btn btn-primary">Solicitar cotización</a>${contact}`;
  }

  /* ---------- Footer ---------- */
  function footerHTML() {
    return `
      <div class="footer-accent" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="container">
        <div class="footer-top">
          <div class="footer-brand">
            <a href="/" class="footer-logo" aria-label="CYD inicio">
              <img src="assets/cyd-logo.webp" alt="CYD — Transporte y Alquiler de Vehículos" width="230" height="165" loading="lazy" />
            </a>
            <p class="footer-lema"><span class="q">“</span>Comprometidos con la Seguridad y la Confiabilidad Operacional<span class="q">”</span></p>
            <a class="footer-wa btn-wa" href="${waLink(PHONES[0])}" target="_blank" rel="noopener">${waSVG}Escríbenos por WhatsApp</a>
          </div>
          <div class="footer-col">
            <h5>Navegación</h5>
            <a href="/">Inicio</a>
            <a href="/nosotros">Nosotros</a>
            <a href="/servicios">Servicios</a>
            <a href="/contacto">Contacto</a>
            <a href="/cotizacion">Solicitar cotización</a>
          </div>
          <div class="footer-col">
            <h5>Servicios</h5>
            <a href="/servicios#ejecutivo">Transporte Ejecutivo</a>
            <a href="/servicios#proyectos">Traslado a Proyectos</a>
            <a href="/servicios#camionetas">Alquiler de Camionetas</a>
            <a href="/servicios#buses">Alquiler de Minibuses</a>
            <a href="/servicios#autos">Alquiler de Autos</a>
          </div>
          <div class="footer-col footer-contact">
            <h5>Contacto</h5>
            <span class="footer-status"><span class="dot"></span>Atención 24/7 · los 365 días</span>
            <div class="footer-phones">
              ${PHONES.map(p => `<a href="${tel(p)}">${phoneSVG}<span>${p}</span></a>`).join("")}
            </div>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 CYD — Transporte y Alquiler de Vehículos. Todos los derechos reservados.</span>
          <span>Movilidad Minera, Industrial y Ejecutiva</span>
        </div>
      </div>`;
  }

  /* ---------- Reveal on scroll (reutilizable) ----------
     Animación de aparición. Reutilizable desde las páginas que inyectan
     contenido con JS (p.ej. /servicios) vía window.CYD.observeReveals(scope).
     Red de seguridad: si el contexto no pinta (pestaña oculta), fuerza el estado final. */
  let revealIO = null;
  const revealAll = (scope) => (scope || document).querySelectorAll(".reveal:not(.in)").forEach(el => {
    el.classList.add("in");
    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.transform = "none";
  });
  const observeReveals = (scope) => {
    const root = scope || document;
    if (!("IntersectionObserver" in window)) { revealAll(root); return; }
    if (!revealIO) {
      revealIO = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); revealIO.unobserve(e.target); } });
      }, { threshold: 0.1, rootMargin: "0px 0px -7% 0px" });
    }
    root.querySelectorAll(".reveal:not(.in)").forEach(el => revealIO.observe(el));
    setTimeout(() => revealAll(root), 1600);
    if (document.visibilityState === "hidden") revealAll(root);
  };
  window.CYD = window.CYD || {};
  window.CYD.observeReveals = observeReveals;
  window.CYD.revealAll = revealAll;
  window.CYD_revealAll = revealAll; // compatibilidad

  /* ---------- Mount ---------- */
  function mount() {
    const header = document.getElementById("site-header");
    if (header) header.innerHTML = headerHTML();
    const mm = document.getElementById("mobile-menu");
    if (mm) mm.innerHTML = mobileHTML();
    const footer = document.getElementById("site-footer");
    if (footer) footer.innerHTML = footerHTML();

    // Botón flotante de WhatsApp (todas las páginas)
    if (!document.getElementById("wa-float")) {
      const wa = document.createElement("a");
      wa.id = "wa-float";
      wa.href = waLink(PHONES[0]);
      wa.target = "_blank";
      wa.rel = "noopener";
      wa.setAttribute("aria-label", "Escríbenos por WhatsApp");
      wa.innerHTML = waSVG;
      document.body.appendChild(wa);
    }

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

    // ¿El dispositivo tiene ratón (puede hacer hover) o es táctil?
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    // En escritorio: mantener el mega-menú abierto mientras el mouse esté
    // sobre el ítem o su panel; cerrarlo con un pequeño retraso al salir,
    // para que no se cierre de golpe si el mouse se mueve un poco.
    if (canHover) {
      document.querySelectorAll(".nav-item").forEach(item => {
        if (!item.querySelector(".mega")) return;
        let closeTimer;
        item.addEventListener("mouseenter", () => {
          clearTimeout(closeTimer);
          document.querySelectorAll(".nav-item.open").forEach(i => { if (i !== item) i.classList.remove("open"); });
          item.classList.add("open");
        });
        item.addEventListener("mouseleave", () => {
          closeTimer = setTimeout(() => item.classList.remove("open"), 320);
        });
      });
    }

    // Mega-menú: abrir con clic/tap en el enlace padre.
    // En escritorio (con ratón) el menú ya se abre solo con hover, así que el
    // clic en "Servicios" navega normal a la página. En táctil el 1.er toque
    // abre el menú y el 2.º navega.
    document.querySelectorAll(".nav-item").forEach(item => {
      if (!item.querySelector(".mega")) return;
      const link = item.querySelector(":scope > a");
      if (!link) return;
      link.addEventListener("click", (e) => {
        if (canHover) return; // escritorio: dejar que el clic navegue
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
        document.body.classList.toggle("menu-open", open); // oculta el WhatsApp flotante
        document.body.style.overflow = open ? "hidden" : "";
        // recalcula la altura de acordeones abiertos (fuentes ya cargadas)
        if (open) mm.querySelectorAll(".mm-acc.open .mm-acc-body").forEach(b => { b.style.maxHeight = b.scrollHeight + "px"; });
      };
      toggle.addEventListener("click", () => setMenu(!mm.classList.contains("open")));
      mm.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
      window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });
    }

    // Acordeón del menú móvil (Servicios se despliega al tocar)
    if (mm) {
      const setBody = (acc, open) => {
        const body = acc.querySelector(".mm-acc-body");
        acc.classList.toggle("open", open);
        acc.querySelector(".mm-acc-head").setAttribute("aria-expanded", open ? "true" : "false");
        body.style.maxHeight = open ? body.scrollHeight + "px" : "0";
      };
      mm.querySelectorAll(".mm-acc-head").forEach(head => {
        head.addEventListener("click", () => setBody(head.closest(".mm-acc"), !head.closest(".mm-acc").classList.contains("open")));
      });
      // Deja abierto el que viene marcado (página actual)
      mm.querySelectorAll(".mm-acc.open").forEach(acc => setBody(acc, true));
    }

    // Reveal on scroll (helper compartido, ver arriba)
    observeReveals();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();