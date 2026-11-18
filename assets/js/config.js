/* =========================================================================
   Christmas Tree Haven USA — Site configuration
   -------------------------------------------------------------------------
   EDIT THIS FILE ONLY to change contact details, the Messenger link,
   or the site domain. Every page and product button reads from here.
   ========================================================================= */

const SITE_CONFIG = {
  brand: "Christmas Tree Haven USA",
  tagline: "Luxury artificial Christmas trees, delivered across America.",

  /* ── Facebook Messenger ──────────────────────────────────────────────
     Paste your official Messenger link here when you have it, for example:

         messenger: "https://m.me/YourPageName"

     While this is left empty the site falls back to your Facebook page
     below, so every button on the site still reaches you.

     Do not invent a page username — use the real one from your Page.
     ──────────────────────────────────────────────────────────────────── */
  messenger: "",
  facebookPage: "https://www.facebook.com/share/1ELDsjBDkr/?mibextid=wwXIfr",

  /* ── Contact ──────────────────────────────────────────────────────── */
  contactEmail: "",          // optional — leave empty to hide
  contactPhone: "",          // optional — leave empty to hide
  serviceArea: "United States — nationwide delivery",
  responseNote: "We reply through Facebook Messenger.",

  /* ── Canonical domain (update after you connect your custom domain) ─ */
  siteUrl: "https://christmastreehavenusa.com",

  currency: "USD",
  currencySymbol: "$"
};

/* Build a Messenger link, optionally prefilled with an inquiry message. */
function messengerLink(message) {
  const cfg = SITE_CONFIG;

  // A real m.me link can carry a prefilled message.
  if (cfg.messenger && /^https?:\/\/m\.me\//i.test(cfg.messenger)) {
    return message
      ? cfg.messenger + (cfg.messenger.includes("?") ? "&" : "?") + "text=" + encodeURIComponent(message)
      : cfg.messenger;
  }

  // Otherwise use whatever link is configured (e.g. your Facebook page).
  return cfg.messenger || cfg.facebookPage;
}

/* Format a price in the site currency. */
function formatPrice(value) {
  return SITE_CONFIG.currencySymbol + Number(value).toLocaleString("en-US");
}
