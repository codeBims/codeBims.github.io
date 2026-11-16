// Follow the device by default. A deliberate site choice can enable full effects.
(() => {
  const system = matchMedia('(prefers-reduced-motion: reduce)');
  const media = new EventTarget();
  let preference = 'auto';
  try { const saved = localStorage.getItem('portfolio-effects'); if (['auto','full','paused'].includes(saved)) preference = saved; } catch {}
  const mode = () => preference === 'paused' ? 'paused' : preference === 'auto' && system.matches ? 'reduced' : 'active';
  Object.defineProperty(media, 'matches', { get: () => mode() !== 'active' });
  const controls = [...document.querySelectorAll('[data-effects-select]')];
  function render() {
    document.documentElement.dataset.effects = mode();
    const en = document.documentElement.lang === 'en';
    const labels = en ? {auto:'Follow device',full:'Full effects',paused:'Pause effects'} : {auto:'Ikuti perangkat',full:'Efek penuh',paused:'Jeda efek'};
    controls.forEach(control => {
      control.value = preference;
      control.setAttribute('aria-label', en ? 'Animation' : 'Animasi');
      control.title = `${en ? 'Animation' : 'Animasi'}: ${labels[preference]}`;
    });
  }
  function changed() {
    render(); media.dispatchEvent(new Event('change'));
    window.dispatchEvent(new Event('portfolio-motion-change'));
  }
  controls.forEach(control => control.addEventListener('change', () => {
    preference = control.value;
    try { localStorage.setItem('portfolio-effects', preference); } catch {}
    changed();
  }));
  system.addEventListener('change', changed);
  window.addEventListener('portfolio-language-change', render);
  window.PortfolioEffects = { media, get interaction() { return mode() === 'active' ? 'full' : mode() === 'reduced' ? 'fade' : 'none'; } };
  render();
})();
