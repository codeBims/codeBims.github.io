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

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const navLinks = [...document.querySelectorAll('.section-nav a[href^="#"]')];
const nav = document.querySelector('.section-nav');
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

function setActiveNav(link) {
  if (!link) return;
  navLinks.forEach((item) => {
    if (item === link) item.setAttribute('aria-current', 'true');
    else item.removeAttribute('aria-current');
  });
  nav.style.setProperty('--indicator-x', `${link.offsetLeft}px`);
  nav.style.setProperty('--indicator-width', `${link.offsetWidth}px`);
  if (window.innerWidth <= 980) {
    const left = link.offsetLeft - (nav.clientWidth - link.offsetWidth) / 2;
    nav.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? 'auto' : 'smooth' });
  }
}

navLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    if (location.hash !== link.hash) history.pushState(null, '', link.hash);
    setActiveNav(link);
    target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  });
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    setActiveNav(navLinks.find((link) => link.getAttribute('href') === `#${visible.target.id}`));
  }, { rootMargin: '-20% 0px -65%', threshold: [0, .2, .5] });

  sections.forEach((section) => observer.observe(section));
}

const initialNavLink = navLinks.find((link) => link.hash === location.hash) || navLinks[0];
requestAnimationFrame(() => setActiveNav(initialNavLink));
window.addEventListener('resize', () => {
  const active = navLinks.find((link) => link.getAttribute('aria-current') === 'true') || initialNavLink;
  setActiveNav(active);
}, { passive: true });

const revealTargets = document.querySelectorAll(
  '.hero-copy, .hero-profile, .proof-strip, .positioning > .section-label, .positioning-photo-wrap, .positioning-copy, .section-heading, .portfolio-tabs, .case-switcher, .case-header, .case-copy, .fittrack-showcase, .thesis-showcase, .jalanyuk-showcase, .confidential-panel, .experience > .section-label, .section-intro, .timeline article, .certificate-card, .capability-grid article, .side-project, .contact-main, .contact-list a, .comments-intro, .comments-social, .comments-box, footer'
);

if (!reduceMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('motion-ready');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
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
