(() => {
  'use strict';
  const settings = window.ELARAE_SETTINGS;
  const manifest = window.ELARAE_MEDIA || {};
  // One contact setting supplies every mail link, including legal pages.
  document.querySelectorAll('a[href^="mailto:"]').forEach(a => {
    const original = a.getAttribute('href');
    const address = original.slice(7).split('?')[0];
    const suffix = original.includes('?') ? original.slice(original.indexOf('?')) : '';
    a.href = 'mailto:' + settings.contactEmail + suffix;
    if (a.textContent.trim() === address) a.textContent = settings.contactEmail;
  });
  document.querySelectorAll('.whatsapp').forEach(a => { const u = new URL(a.href); u.pathname = '/' + settings.whatsappNumber; a.href = u.href; });
  const key = 'elarae-privacy-v1';
  const blank = () => ({ analytics: false, external: false });
  let choice = null;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && saved.version === settings.consentVersion && Date.now() - saved.time < settings.consentDays * 864e5) choice = saved;
  } catch (_) { /* Storage restrictions never enable optional services. */ }
  let prefs = choice || blank();
  let trackingStarted = false;
  let opener = null;
  const lookup = src => {
    try { return manifest[decodeURIComponent(new URL(src, document.baseURI).pathname.slice(1))]; }
    catch (_) { return null; }
  };
  function image(img, src, { thumb = false, full = false, eager = false } = {}) {
    const entry = !full && lookup(src);
    img.dataset.originalSrc = src;
    img.decoding = 'async';
    img.loading = eager ? 'eager' : 'lazy';
    if (entry) {
      img.width = entry.width; img.height = entry.height;
      if (!thumb) { img.srcset = entry.srcset; img.sizes = entry.sizes; }
      img.src = thumb ? entry.thumb : entry.src;
    } else img.src = src;
    return img;
  }
  function hydrate(root) {
    root.querySelectorAll('img[data-src]').forEach(img => {
      image(img, img.dataset.src, { eager: true }); delete img.dataset.src;
    });
  }
  function prepareVideo(video) {
    const narrow = matchMedia('(max-width: 700px)').matches;
    if (video.dataset.videoSrc || video.dataset.src) {
      video.src = narrow && video.dataset.mobileSrc ? video.dataset.mobileSrc : (video.dataset.videoSrc || video.dataset.src);
      delete video.dataset.videoSrc; delete video.dataset.src;
      video.load();
    }
    let changed = false; video.querySelectorAll('source[data-src]').forEach(source => { source.src = source.dataset.src; delete source.dataset.src; changed = true; }); if (changed) video.load();
  }
  const mediaObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      if (target.tagName === 'VIDEO' && target.dataset.poster && !target.closest('details:not([open])')) {
        const entry = lookup(target.dataset.poster); target.poster = entry ? entry.src : target.dataset.poster;
        delete target.dataset.poster;
        if (target.id !== 'aureon' && target.id !== 'fruit') { target.preload = 'metadata'; prepareVideo(target); }
        mediaObserver.unobserve(target);
      }
    });
  }, { rootMargin: '200px' });
  function observeMedia(root = document) {
    root.querySelectorAll('video[data-poster]').forEach(v => mediaObserver.observe(v));
  }
  window.ElaraeMedia = { lookup, image, hydrate, prepareVideo, observeMedia };

  function clearTrackingCookies() {
    document.cookie.split(';').map(x => x.split('=')[0].trim()).filter(x => /^(_ga|_gid|_gat|_gcl)/.test(x)).forEach(name => {
      const domains = ['', location.hostname, '.' + location.hostname, '.elaraestudio.be'];
      domains.forEach(domain => { document.cookie = name + '=; Max-Age=0; path=/' + (domain ? '; domain=' + domain : '') + '; SameSite=Lax'; });
    });
  }
  function startAnalytics() {
    if (!prefs.analytics || trackingStarted) return;
    trackingStarted = true;
    window['ga-disable-' + settings.analyticsId] = false;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const script = document.createElement('script'); script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + encodeURIComponent(settings.tagManagerId);
    script.dataset.elaraeAnalytics = 'true'; document.head.append(script);
  }
  function applyMaps() {
    document.querySelectorAll('.map-consent').forEach(box => {
      const frame = box.querySelector('iframe'); const fallback = box.querySelector('.map-consent-copy');
      if (prefs.external) { frame.src = frame.dataset.mapSrc; frame.hidden = false; fallback.hidden = true; }
      else { frame.removeAttribute('src'); frame.hidden = true; fallback.hidden = false; }
    });
  }
  function applyChoice() {
    if (prefs.analytics) startAnalytics();
    else { window['ga-disable-' + settings.analyticsId] = true; clearTrackingCookies(); }
    applyMaps();
  }
  function store(next) {
    const revoke = prefs.analytics && !next.analytics;
    prefs = { analytics: !!next.analytics, external: !!next.external, version: settings.consentVersion, time: Date.now() };
    try { localStorage.setItem(key, JSON.stringify(prefs)); } catch (_) { /* The current-page choice still applies. */ }
    choice = prefs; banner.hidden = true;
    if (dialog.open) dialog.close();
    applyChoice();
    // Unloading previously consented tags also removes their timers and listeners.
    if (revoke) location.reload();
  }
  const banner = document.createElement('section');
  banner.className = 'privacy-banner'; banner.setAttribute('aria-labelledby', 'privacy-title'); banner.hidden = !!choice;
  banner.innerHTML = '<h2 id="privacy-title" class="sr-only">Jouw privacy, jouw keuze.</h2><div class="cookie-bar-copy"><p>We gebruiken cookies voor statistieken en externe inhoud. Jij bepaalt wat je toestaat. <a href="cookiebeleid.html">Cookies</a></p></div><div class="privacy-actions"><button type="button" data-reject>Weigeren</button><button type="button" data-settings>Voorkeuren</button><button type="button" data-accept>Accepteren</button></div>';
  document.body.append(banner);
  const dialog = document.createElement('dialog'); dialog.className = 'privacy-dialog'; dialog.setAttribute('aria-labelledby', 'privacy-settings-title');
  dialog.innerHTML = '<h2 id="privacy-settings-title">Cookies</h2><p>Noodzakelijke voorkeuren bewaren alleen je keuze. Statistieken en de externe kaart zijn optioneel.</p><label><input type="checkbox" name="analytics"> Statistieken via Google Analytics</label><label><input type="checkbox" name="external"> Google Maps laden</label><p class="privacy-explanation">Google ontvangt bij het laden van deze diensten technische gegevens. Lees ons <a href="cookiebeleid.html">cookiebeleid</a> en <a href="privacy.html">privacybeleid</a>. Je kunt je keuze hier later wijzigen.</p><div class="privacy-actions"><button type="button" data-save>Keuze opslaan</button><button type="button" data-close>Sluiten</button></div>';
  document.body.append(dialog);
  function openPreferences(trigger) {
    opener = trigger || document.activeElement;
    dialog.querySelector('[name=analytics]').checked = !!prefs.analytics;
    dialog.querySelector('[name=external]').checked = !!prefs.external;
    dialog.showModal(); dialog.querySelector('input').focus();
  }
  banner.querySelector('[data-accept]').onclick = () => store({ analytics: true, external: true });
  banner.querySelector('[data-reject]').onclick = () => store(blank());
  banner.querySelector('[data-settings]').onclick = e => openPreferences(e.currentTarget);
  dialog.querySelector('[data-save]').onclick = () => store({ analytics: dialog.querySelector('[name=analytics]').checked, external: dialog.querySelector('[name=external]').checked });
  dialog.querySelector('[data-close]').onclick = () => dialog.close();
  dialog.addEventListener('close', () => opener?.focus({ preventScroll: true }));
  document.querySelectorAll('[data-privacy-settings]').forEach(button => button.onclick = () => openPreferences(button));
  document.querySelectorAll('[data-enable-map]').forEach(button => button.onclick = () => openPreferences(button));
  window.ElaraePrivacy = { open: openPreferences, get: () => ({ analytics: !!prefs.analytics, external: !!prefs.external }) };
  window.addEventListener('storage', e => { if (e.key === key) location.reload(); });
  applyChoice();
  observeMedia();
  document.querySelectorAll('video:not(#aureon):not(#fruit)').forEach(v => {
    v.playsInline = true;
    const prepare = () => { v.preload = 'metadata'; prepareVideo(v); };
    v.addEventListener('focus', prepare, { once: true });
    v.addEventListener('pointerenter', prepare, { once: true });
    v.addEventListener('click', () => {
      const pending = !!(v.dataset.videoSrc || v.dataset.src || v.querySelector('source[data-src]'));
      if (pending) { prepare(); v.play().catch(() => {}); }
    });
  });
  document.querySelectorAll('details').forEach(details => details.addEventListener('toggle', () => {
    if (details.open) details.querySelectorAll('video').forEach(v => {
      if (v.dataset.poster) { const m = lookup(v.dataset.poster); v.poster = m ? m.src : v.dataset.poster; delete v.dataset.poster; }
      v.preload = 'metadata';
      prepareVideo(v);
    });
    else details.querySelectorAll('video').forEach(v => v.pause());
  }));
  const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('.header nav');
  if (menu && nav) {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.focus(); }
    });
  }
})();
