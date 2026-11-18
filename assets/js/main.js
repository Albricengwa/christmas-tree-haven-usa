/* =========================================================================
   Christmas Tree Haven USA — site behaviour
   Nav, scroll reveals, product rendering, filters, FAQ accordion,
   and Messenger wiring for every button, card and photograph.
   ========================================================================= */

(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Path prefix for pages that live in a subfolder (e.g. /products/). */
  const BASE = (document.body && document.body.dataset.base) || "";

  /* ── Messenger wiring ──────────────────────────────────────────────── */
  function applyMessengerLinks() {
    // Generic buttons: <a data-messenger> or <a data-messenger="message">
    document.querySelectorAll("[data-messenger]").forEach(function (el) {
      const custom = el.getAttribute("data-messenger");
      el.href = messengerLink(custom || "");
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });

    // Facebook page links configured centrally
    document.querySelectorAll("[data-facebook]").forEach(function (el) {
      el.href = SITE_CONFIG.facebookPage;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });

    // Optional contact details — hidden when not configured
    document.querySelectorAll("[data-contact-email]").forEach(function (el) {
      if (SITE_CONFIG.contactEmail) {
        el.textContent = SITE_CONFIG.contactEmail;
        el.href = "mailto:" + SITE_CONFIG.contactEmail;
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });

    document.querySelectorAll("[data-contact-phone]").forEach(function (el) {
      if (SITE_CONFIG.contactPhone) {
        el.textContent = SITE_CONFIG.contactPhone;
        el.href = "tel:" + SITE_CONFIG.contactPhone.replace(/[^+\d]/g, "");
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });

    document.querySelectorAll("[data-service-area]").forEach(function (el) {
      el.textContent = SITE_CONFIG.serviceArea;
    });
  }

  /* Message text used when a customer clicks a tree. */
  function inquiryFor(product) {
    return (
      "Hello Christmas Tree Haven USA, I would like to ask about the " +
      product.name +
      " — " +
      product.heightFt +
      " ft (" +
      product.heightM.toFixed(2) +
      " m), " +
      formatPrice(product.price) +
      ". Is it available?"
    );
  }

  /* ── Product card markup ───────────────────────────────────────────── */
  function productCard(product) {
    const primary = product.images[0];
    const article = document.createElement("article");
    article.className = "product-card";
    article.setAttribute("data-reveal", "");

    article.innerHTML =
      '<a class="product-media" aria-label="Ask about the ' + product.name + ' on Messenger">' +
        '<img src="' + BASE + primary.src + '" alt="' + primary.alt + '" width="700" height="840" loading="lazy" decoding="async">' +
        (product.badge ? '<span class="product-badge">' + product.badge + "</span>" : "") +
        '<span class="product-media-hint">Enquire on Messenger</span>' +
      "</a>" +
      '<div class="product-body">' +
        '<p class="product-style">' + product.style + "</p>" +
        '<h3 class="product-name"><a href="' + BASE + product.slug + '">' + product.name + "</a></h3>" +
        '<p class="product-size"><strong>' + product.heightFt + " ft</strong> · " + product.heightM.toFixed(2) + " m</p>" +
        '<p class="product-summary">' + product.summary + "</p>" +
        '<div class="product-foot">' +
          '<p class="product-price">' + formatPrice(product.price) + "</p>" +
          '<a class="btn btn-gold btn-sm" href="' + messengerLink(inquiryFor(product)) + '" target="_blank" rel="noopener noreferrer">Order Now</a>' +
        "</div>" +
        '<p class="product-avail"><span class="dot"></span>' + product.availability + "</p>" +
      "</div>";

    // The photograph opens Messenger, as required.
    const media = article.querySelector(".product-media");
    media.href = messengerLink(inquiryFor(product));

    return article;
  }

  /* ── Render product grids ──────────────────────────────────────────── */
  function renderGrids() {
    document.querySelectorAll("[data-products]").forEach(function (host) {
      const mode = host.getAttribute("data-products");
      let list = PRODUCTS.slice();

      if (mode === "featured") {
        list = PRODUCTS.filter(function (p) { return p.featured; });
      }

      // On a product page, do not show the tree being viewed again.
      const current = document.querySelector("[data-product-id]");
      if (current) {
        const currentId = current.getAttribute("data-product-id");
        list = list.filter(function (p) { return p.id !== currentId; });
      }

      host.innerHTML = "";
      list.forEach(function (product) {
        host.appendChild(productCard(product));
      });
    });
  }

  /* ── Shop filters ──────────────────────────────────────────────────── */
  function wireFilters() {
    const bar = document.querySelector("[data-filters]");
    if (!bar) return;

    const grid = document.querySelector("[data-products]");
    if (!grid) return;

    bar.addEventListener("click", function (event) {
      const btn = event.target.closest("button[data-height]");
      if (!btn) return;

      bar.querySelectorAll("button").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", b === btn ? "true" : "false");
      });

      const wanted = btn.getAttribute("data-height");
      let list = PRODUCTS.slice();
      if (wanted !== "all") {
        list = PRODUCTS.filter(function (p) { return String(p.heightFt) === wanted; });
      }

      grid.innerHTML = "";
      if (!list.length) {
        grid.innerHTML =
          '<p class="empty-state">No tree at that height is listed right now. ' +
          '<a data-messenger="Hello Christmas Tree Haven USA, I am looking for a specific tree height.">Ask us on Messenger</a>.</p>';
        applyMessengerLinks();
        return;
      }
      list.forEach(function (product) { grid.appendChild(productCard(product)); });
      revealNow();
    });
  }

  /* ── Individual product page ───────────────────────────────────────── */
  function renderProductPage() {
    const host = document.querySelector("[data-product-id]");
    if (!host) return;

    const id = host.getAttribute("data-product-id");
    const product = PRODUCTS.find(function (p) { return p.id === id; });
    if (!product) return;

    const ask = messengerLink(inquiryFor(product));

    // Gallery
    const gallery = document.querySelector("[data-product-gallery]");
    if (gallery) {
      gallery.innerHTML = product.images
        .map(function (img, index) {
          return (
            '<a class="gallery-shot' + (index === 0 ? " is-main" : "") + '" href="' + ask + '" ' +
            'target="_blank" rel="noopener noreferrer" aria-label="Enquire about the ' + product.name + ' on Messenger">' +
            '<img src="' + BASE + img.src + '" alt="' + img.alt + '" width="900" height="1100" ' +
            (index === 0 ? 'loading="eager"' : 'loading="lazy"') + ' decoding="async">' +
            "</a>"
          );
        })
        .join("");
    }

    // Facts
    const nameEl = document.querySelector("[data-product-name]");
    if (nameEl) nameEl.textContent = product.name;
    const styleEl = document.querySelector("[data-product-style]");
    if (styleEl) styleEl.textContent = product.style;
    const sizeEl = document.querySelector("[data-product-size]");
    if (sizeEl) sizeEl.textContent = product.heightFt + " ft (" + product.heightM.toFixed(2) + " m)";
    const priceEl = document.querySelector("[data-product-price]");
    if (priceEl) priceEl.textContent = formatPrice(product.price);
    const availEl = document.querySelector("[data-product-availability]");
    if (availEl) availEl.textContent = product.availability;
    const descEl = document.querySelector("[data-product-description]");
    if (descEl) descEl.textContent = product.description;
    const listEl = document.querySelector("[data-product-details]");
    if (listEl) {
      listEl.innerHTML = product.details.map(function (d) { return "<li>" + d + "</li>"; }).join("");
    }

    // Every order button on the page
    document.querySelectorAll("[data-order]").forEach(function (el) {
      el.href = ask;
      el.target = "_blank";
      el.rel = "noopener noreferrer";
    });

    // Enquiry blurb
    const noteEl = document.querySelector("[data-product-enquiry]");
    if (noteEl) {
      noteEl.textContent =
        "Message us about the " + product.name + " — " + product.heightFt + " ft (" +
        product.heightM.toFixed(2) + " m) at " + formatPrice(product.price) +
        ". We will confirm availability and delivery to your address.";
    }

    document.title = product.name + " — " + product.heightFt + " ft Artificial Christmas Tree | " + SITE_CONFIG.brand;
  }

  /* ── Scroll reveal ─────────────────────────────────────────────────── */
  let observer = null;

  function setupReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    document.querySelectorAll("[data-reveal]").forEach(function (el) {
      observer.observe(el);
    });
  }

  function revealNow() {
    if (!observer) {
      document.querySelectorAll("[data-reveal]").forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }
    document.querySelectorAll("[data-reveal]:not(.is-visible)").forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ── Header behaviour + mobile nav ─────────────────────────────────── */
  function wireHeader() {
    const header = document.querySelector(".site-header");
    if (header) {
      const onScroll = function () {
        header.classList.toggle("is-scrolled", window.scrollY > 24);
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    const toggle = document.querySelector("[data-nav-toggle]");
    const nav = document.getElementById("primary-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("nav-open", open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });

    const closeNav = function (refocus) {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-open");
      if (refocus) toggle.focus();
    };

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav(true);
      }
    });

    // Tapping outside the drawer closes it (common phone behaviour).
    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNav(false);
    });
  }

  /* ── Sticky mobile action bar ──────────────────────────────────────── */
  function injectMobileBar() {
    if (document.querySelector(".mobile-bar")) return;

    const bar = document.createElement("div");
    bar.className = "mobile-bar";
    bar.setAttribute("aria-label", "Quick actions");
    bar.innerHTML =
      '<a class="btn btn-gold" data-messenger="Hello Christmas Tree Haven USA, I would like to ask about your Christmas trees.">Message Us</a>' +
      '<a class="btn btn-outline" href="' + BASE + 'shop.html">Shop Trees</a>';

    document.body.appendChild(bar);
  }

  /* ── FAQ accordion ─────────────────────────────────────────────────── */
  function wireAccordions() {
    document.querySelectorAll(".accordion").forEach(function (root) {
      root.addEventListener("click", function (event) {
        const trigger = event.target.closest(".accordion-trigger");
        if (!trigger) return;

        const item = trigger.closest(".accordion-item");
        const open = item.classList.toggle("is-open");
        trigger.setAttribute("aria-expanded", open ? "true" : "false");

        const panel = item.querySelector(".accordion-panel");
        if (panel) panel.hidden = !open;
      });
    });
  }

  /* ── Year in footer ────────────────────────────────────────────────── */
  function stampYear() {
    document.querySelectorAll("[data-year]").forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  /* ── Boot ──────────────────────────────────────────────────────────── */
  function boot() {
    renderGrids();
    renderProductPage();
    wireFilters();
    wireHeader();
    wireAccordions();
    stampYear();
    injectMobileBar();
    applyMessengerLinks();
    setupReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
