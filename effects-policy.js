// One preference controls decorative motion and existing automatic galleries.
(() => {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const media = new EventTarget();
  let paused = false;
  try { paused = localStorage.getItem('portfolio-effects') === 'paused'; } catch {}
  Object.defineProperty(media, 'matches', { get: () => system.matches || paused });
  const buttons = [...document.querySelectorAll('[data-effects-toggle]')];
  function render() {
    document.documentElement.dataset.effects = media.matches ? 'paused' : 'active';
    const en = document.documentElement.lang === 'en';
    const label = system.matches
      ? (en ? 'Motion reduced by your device' : 'Gerak dikurangi sesuai perangkat')
      : media.matches ? (en ? 'Resume visual effects' : 'Nyalakan efek gerak')
      : (en ? 'Pause visual effects' : 'Jeda efek gerak');
    buttons.forEach(button => {
      button.setAttribute('aria-label', system.matches ? label : (en ? 'Visual effects' : 'Efek gerak')); button.title = label;
      button.setAttribute('aria-pressed', String(!media.matches));
      button.disabled = system.matches;
    });
  }
  function changed() {
    render(); media.dispatchEvent(new Event('change'));
    window.dispatchEvent(new Event('portfolio-motion-change'));
  }
  buttons.forEach(button => button.addEventListener('click', () => {
    paused = !paused;
    try { localStorage.setItem('portfolio-effects', paused ? 'paused' : 'auto'); } catch {}
    changed();
  }));
  system.addEventListener('change', changed);
  window.addEventListener('portfolio-language-change', render);
  window.PortfolioEffects = { media };
  render();
})();
