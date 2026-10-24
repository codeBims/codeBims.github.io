document.getElementById('year').textContent = new Date().getFullYear();

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
  '.positioning-copy, .section-heading, .case-study, .timeline article, .capability-grid article, .side-project, .contact-main, .contact-list'
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
