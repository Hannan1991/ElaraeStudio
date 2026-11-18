/* Progressive enhancement: each screenshot link remains usable without JavaScript. */
(() => {
 const links = [...document.querySelectorAll('a.screen-expand')];
 if (!links.length || typeof HTMLDialogElement === 'undefined') return;
 const dialog = document.createElement('dialog');
 dialog.className = 'image-viewer';
 dialog.setAttribute('aria-labelledby', 'viewer-title');
 dialog.innerHTML = '<header class="viewer-head"><h2 id="viewer-title"></h2><div class="viewer-actions"><button type="button" data-zoom aria-pressed="false">1:1</button><button type="button" data-close aria-label="Afbeelding sluiten" autofocus>Sluiten ×</button></div></header><div class="viewer-canvas"><img alt=""></div><nav class="viewer-nav" aria-label="Screenshotgalerij"><button type="button" data-prev>← Vorige</button><span class="viewer-count" role="status" aria-live="polite"></span><button type="button" data-next>Volgende →</button></nav>';
 document.body.append(dialog);
 const image = dialog.querySelector('img');
 const canvas = dialog.querySelector('.viewer-canvas');
 const zoom = dialog.querySelector('[data-zoom]');
 let active = 0, trigger = null, scrollLock = '';
 function paint() {
  const link = links[active];
  const source = link.querySelector('img');
  image.src = link.href;
  image.alt = source.alt;
  dialog.querySelector('#viewer-title').textContent = source.alt;
  dialog.querySelector('.viewer-count').textContent = `${active + 1} / ${links.length}`;
  canvas.removeAttribute('data-zoomed');
  canvas.scrollTo(0, 0);
  zoom.setAttribute('aria-pressed', 'false');
  zoom.textContent = '1:1';
 }
 links.forEach((link, index) => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  active = index; trigger = link; paint();
  scrollLock = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';
  dialog.showModal();
 }));
 dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
 dialog.querySelector('[data-prev]').addEventListener('click', () => { active = (active - 1 + links.length) % links.length; paint(); });
 dialog.querySelector('[data-next]').addEventListener('click', () => { active = (active + 1) % links.length; paint(); });
 zoom.addEventListener('click', () => {
  const on = canvas.toggleAttribute('data-zoomed');
  zoom.setAttribute('aria-pressed', String(on));
  zoom.textContent = on ? 'Passend' : '1:1';
 });
 dialog.addEventListener('keydown', event => {
  if (canvas.hasAttribute('data-zoomed')) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
   event.preventDefault(); active = (active + (event.key === 'ArrowRight' ? 1 : -1) + links.length) % links.length; paint();
  }
 });
 dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const r = dialog.getBoundingClientRect();
  if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close();
 });
 dialog.addEventListener('close', () => {
  document.documentElement.style.overflow = scrollLock;
  trigger?.focus({ preventScroll: true });
 });
})();
