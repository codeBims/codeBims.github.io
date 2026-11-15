const tr = (id, en) => document.documentElement.lang === 'en' ? en : id;
const motion = window.PortfolioEffects?.media || matchMedia('(prefers-reduced-motion: reduce)');
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
const caseButtons = [...document.querySelectorAll('[data-case]')];
const caseIds = caseButtons.map(button => button.dataset.case);
const nav = document.querySelector('.section-nav');
const navLinks = [...nav.querySelectorAll('a')];
const header = document.querySelector('.site-header');
const galleries = [];
function hashId() { try { return decodeURIComponent(location.hash.slice(1)); } catch { return ''; } }
function selectCase(id, push = false) {
  if (!caseIds.includes(id)) return;
  const changed = document.querySelector('[data-case][aria-pressed="true"]')?.dataset.case !== id;
  caseButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.case === id)));
  caseIds.forEach(key => { document.getElementById(key).hidden = key !== id; });
  galleries.forEach(gallery => gallery.sync());
  if (changed) window.dispatchEvent(new CustomEvent('portfolio-case-change', { detail: id }));
  if (push && hashId() !== id) history.pushState(null, '', `#${id}`);
}
caseButtons.forEach(button => button.addEventListener('click', () => selectCase(button.dataset.case, true)));
if (caseIds.length) selectCase(caseIds.includes(hashId()) ? hashId() : 'online-retail');

// Keep user pause separate from temporary pauses for visibility and focus.
document.querySelectorAll('[data-gallery]').forEach(gallery => {
  const slides = [...gallery.querySelectorAll('[data-gallery-slide]')];
  const previous = gallery.querySelector('[data-gallery-prev]'), next = gallery.querySelector('[data-gallery-next]');
  const toggle = gallery.querySelector('[data-gallery-toggle]'), current = gallery.querySelector('[data-gallery-current]');
  const thumbnails = document.createElement('div'); thumbnails.className = 'gallery-thumbnails';
  const zoom = document.createElement('button'); zoom.type = 'button'; zoom.className = 'gallery-zoom';
  gallery.insertBefore(zoom, gallery.firstChild); gallery.append(thumbnails);
  let index = 0, inView = false, hovered = false, focused = false, paused = false, timer, touch;
  const canRun = () => !paused && !motion.matches && inView && !document.hidden && !hovered && !focused && !gallery.closest('[hidden]') && !document.getElementById('media-dialog')?.open;
  function sync() {
    clearTimeout(timer);
    const video = slides[index].querySelector('video');
    if (!canRun()) { if (!inView || document.hidden || gallery.closest('[hidden]')) video?.pause(); return; }
    // Videos are played by the visitor; the carousel waits for playback.
    if (video) return;
    timer = setTimeout(() => show(index + 1), 6000);
  }
  const thumbButtons = slides.map((slide, i) => {
    const button = document.createElement('button'); button.type = 'button';
    const media = slide.querySelector('img,video');
    const image = document.createElement('img'); image.src = media.tagName === 'VIDEO' ? media.poster : media.currentSrc || media.src;
    image.alt = ''; image.loading = 'lazy'; image.width = 64; image.height = 44;
    button.append(image); button.addEventListener('click', () => show(i, true)); thumbnails.append(button); return button;
  });
  function labels() {
    previous.setAttribute('aria-label', tr('Mundur satu slide', 'Previous slide'));
    next.setAttribute('aria-label', tr('Maju satu slide', 'Next slide'));
    toggle.textContent = paused ? tr('Putar otomatis', 'Auto play') : tr('Jeda', 'Pause');
    toggle.setAttribute('aria-pressed', String(!paused)); toggle.hidden = motion.matches;
    zoom.textContent = tr('Perbesar', 'Enlarge');
    thumbnails.setAttribute('aria-label', tr('Pilih slide', 'Choose a slide'));
    thumbButtons.forEach((button, i) => button.setAttribute('aria-label', `${tr('Buka slide', 'Open slide')} ${i + 1}`));
    slides.forEach((slide, i) => slide.setAttribute('aria-label', `${i + 1} ${tr('dari', 'of')} ${slides.length}`));
  }
  function show(n, announce = false) {
    slides[index].querySelector('video')?.pause(); index = (n + slides.length) % slides.length;
    slides.forEach((slide, i) => { slide.hidden = i !== index; slide.setAttribute('aria-hidden', String(i !== index)); });
    thumbButtons.forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    current.parentElement.setAttribute('aria-live', announce ? 'polite' : 'off'); current.textContent = String(index + 1);
    zoom.hidden = !slides[index].querySelector('img'); sync();
  }
  previous.addEventListener('click', () => show(index - 1, true)); next.addEventListener('click', () => show(index + 1, true));
  toggle.addEventListener('click', () => { paused = !paused; labels(); sync(); });
  zoom.addEventListener('click', () => openMedia(slides[index].querySelector('img'), slides[index].querySelector('figcaption')?.textContent, zoom));
  gallery.addEventListener('keydown', event => {
    if (event.target.closest('video,input,textarea,select') || !['ArrowLeft','ArrowRight'].includes(event.key)) return;
    event.preventDefault(); show(index + (event.key === 'ArrowRight' ? 1 : -1), true);
  });
  gallery.addEventListener('mouseenter', () => { hovered = true; sync(); });
  gallery.addEventListener('mouseleave', () => { hovered = false; sync(); });
  gallery.addEventListener('focusin', () => { focused = true; sync(); });
  gallery.addEventListener('focusout', event => { if (!gallery.contains(event.relatedTarget)) { focused = false; sync(); } });
  gallery.addEventListener('touchstart', event => { if (event.target.closest('button,video,a')) return; touch = event.changedTouches[0]; clearTimeout(timer); }, { passive: true });
  gallery.addEventListener('touchend', event => {
    if (!touch) return;
    const end = event.changedTouches[0], dx = end.clientX - touch.clientX, dy = end.clientY - touch.clientY; touch = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(index + (dx < 0 ? 1 : -1), true); else sync();
  }, { passive: true });
  gallery.addEventListener('touchcancel', () => { touch = null; sync(); });
  gallery.querySelectorAll('video').forEach(video => {
    video.addEventListener('play', () => clearTimeout(timer)); video.addEventListener('ended', () => { if (canRun()) show(index + 1); });
  });
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }, { threshold: .15 }).observe(gallery);
  galleries.push({ sync }); document.addEventListener('visibilitychange', sync);
  motion.addEventListener('change', () => { labels(); sync(); });
  window.addEventListener('portfolio-language-change', labels); labels(); show(0);
});

const dialog = document.getElementById('media-dialog');
let mediaReturnFocus;
function openMedia(image, caption, trigger) {
  if (!image || !dialog) return;
  mediaReturnFocus = trigger;
  const full = document.getElementById('media-image'); full.src = image.dataset.fullSrc || image.src; full.alt = image.alt;
  document.getElementById('media-caption').textContent = caption || '';
  dialog.showModal(); document.body.classList.add('media-open'); galleries.forEach(g => g.sync());
}
dialog?.querySelector('[data-close-media]').addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog?.addEventListener('close', () => { document.body.classList.remove('media-open'); mediaReturnFocus?.focus(); galleries.forEach(g => g.sync()); });

function setActiveNav(link, center = false) {
  if (!link) return;
  navLinks.forEach(item => item === link ? item.setAttribute('aria-current','location') : item.removeAttribute('aria-current'));
  nav.style.setProperty('--indicator-x', `${link.offsetLeft}px`); nav.style.setProperty('--indicator-width', `${link.offsetWidth}px`);
  if (center && nav.scrollWidth > nav.clientWidth) nav.scrollTo({ left: Math.max(0, link.offsetLeft - (nav.clientWidth - link.offsetWidth)/2), behavior: motion.matches ? 'auto' : 'smooth' });
}
function refreshNav() {
  const links = navLinks.filter(link => link.getAttribute('href').startsWith('#'));
  if (!links.length) { setActiveNav(navLinks[0]); return; }
  const line = header.getBoundingClientRect().bottom + 70;
  const active = links.reduce((prev, link) => document.getElementById(link.hash.slice(1))?.getBoundingClientRect().top <= line ? link : prev, links[0]);
  setActiveNav(active);
}
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const id = link.hash.slice(1);
  if (caseIds.includes(id)) selectCase(id, false);
  const target = document.getElementById(id);
  if (!target || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault(); if (hashId() !== id) history.pushState(null,'',`#${id}`);
  target.scrollIntoView({ behavior: motion.matches ? 'auto' : 'smooth', block: 'start' });
  if (nav.contains(link)) setActiveNav(link, true);
}));
function syncHash() { const id = hashId(); if (caseIds.includes(id)) selectCase(id); requestAnimationFrame(refreshNav); }
window.addEventListener('hashchange', syncHash); window.addEventListener('popstate', syncHash);
window.addEventListener('portfolio-language-change', () => requestAnimationFrame(refreshNav));
new ResizeObserver(() => {
  document.documentElement.style.setProperty('--header-height', `${header.getBoundingClientRect().height}px`); refreshNav();
}).observe(header);
const progress = document.querySelector('.scroll-progress');
let ticking = false;
function updateScroll() {
  refreshNav(); const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.max(0, Math.min(1, scrollY/max)) : 0})`; ticking = false;
}
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateScroll); } }, { passive:true });
updateScroll();
if (!motion.matches && 'IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
  }), { threshold: .05 });
  document.documentElement.classList.add('motion-ready');
  let cardOrder = 0;
  document.querySelectorAll('.work-card, .section-heading, .section-intro, .explorer-heading, .positioning-photo-wrap, .positioning-copy, .timeline article, .case-narrative article, .contact-main').forEach(el => { el.dataset.reveal=''; el.style.setProperty('--reveal-delay',`${el.matches('.work-card') ? cardOrder++%3*100 : 0}ms`); observer.observe(el); });
}
