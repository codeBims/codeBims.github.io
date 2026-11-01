document.getElementById('year').textContent = new Date().getFullYear();

const portfolioTabs = [...document.querySelectorAll('[data-portfolio-tab]')];
const caseButtons = [...document.querySelectorAll('[data-case]')];
const caseIds = caseButtons.map((button) => button.dataset.case);

function selectPortfolio(name, updateHash = false) {
  portfolioTabs.forEach((tab) => {
    const selected = tab.dataset.portfolioTab === name;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(`panel-${tab.dataset.portfolioTab}`).hidden = !selected;
  });
  if (updateHash) history.replaceState(null, '', name === 'proyek' ? '#karya' : `#${name}`);
}

function selectCase(id, updateHash = false) {
  selectPortfolio('proyek');
  caseButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.case === id)));
  caseIds.forEach((caseId) => { document.getElementById(caseId).hidden = caseId !== id; });
  if (updateHash) history.replaceState(null, '', `#${id}`);
}

portfolioTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectPortfolio(tab.dataset.portfolioTab, true));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? portfolioTabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + portfolioTabs.length) % portfolioTabs.length;
    portfolioTabs[next].focus();
    selectPortfolio(portfolioTabs[next].dataset.portfolioTab, true);
  });
});
document.querySelectorAll('nav a[href="#sertifikat"], nav a[href="#keahlian"]').forEach((link) => {
  link.addEventListener('click', () => selectPortfolio(link.hash.slice(1)));
});
caseButtons.forEach((button) => button.addEventListener('click', () => selectCase(button.dataset.case, true)));
document.querySelectorAll('.project-index-list a').forEach((link) => link.addEventListener('click', () => {
  const id = link.hash.slice(1);
  if (caseIds.includes(id)) selectCase(id);
}));

function syncPortfolioHash() {
  const hash = decodeURIComponent(location.hash.slice(1));
  if (caseIds.includes(hash)) selectCase(hash);
  else if (hash === 'sertifikat' || hash === 'keahlian') selectPortfolio(hash);
}
selectCase('fittrack');
syncPortfolioHash();
window.addEventListener('hashchange', syncPortfolioHash);

const aboutPhoto = document.querySelector('.about-photo');
aboutPhoto?.addEventListener('pointermove', (event) => {
  if (event.pointerType === 'touch') return;
  const bounds = aboutPhoto.getBoundingClientRect();
  aboutPhoto.style.setProperty('--reveal-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
  aboutPhoto.style.setProperty('--reveal-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
});
aboutPhoto?.addEventListener('click', (event) => {
  if (event.detail && window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const active = aboutPhoto.getAttribute('aria-pressed') !== 'true';
  aboutPhoto.setAttribute('aria-pressed', String(active));
  aboutPhoto.setAttribute('aria-label', active ? 'Tampilkan foto asli' : 'Tampilkan versi armor futuristik');
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navLinks = [...document.querySelectorAll('nav a[href^="#"]')];
const nav = document.querySelector('nav');
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${visible.target.id}`;
      if (!active) {
        link.removeAttribute('aria-current');
        return;
      }

      link.setAttribute('aria-current', 'true');
      if (window.innerWidth <= 980) {
        const left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
        nav.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
      }
    });
  }, { rootMargin: '-20% 0px -65%', threshold: [0, .2, .5] });

  sections.forEach((section) => observer.observe(section));
}

const revealTargets = document.querySelectorAll(
  '.positioning-copy, .section-heading, .timeline article, .capability-grid article, .side-project, .contact-main, .contact-list'
);

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10%', threshold: .08 });

  revealTargets.forEach((target) => {
    target.dataset.reveal = '';
    revealObserver.observe(target);
  });
}

const progress = document.querySelector('.scroll-progress');
let progressTicking = false;

const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
  progressTicking = false;
};

window.addEventListener('scroll', () => {
  if (progressTicking) return;
  progressTicking = true;
  window.requestAnimationFrame(updateProgress);
}, { passive: true });

updateProgress();
