(() => {
  const read = (key, fallback) => { try { return localStorage.getItem(key) || fallback; } catch { return fallback; } };
  const save = (key, value) => { try { localStorage.setItem(key, value); } catch {} };
  const nodes = [...document.querySelectorAll('[data-i18n]')].map(el => ({ el, id: el.textContent }));
  const attributes = [];
  for (const name of ['alt', 'aria-label', 'placeholder']) {
    document.querySelectorAll(`[data-en-${name}]`).forEach(el => attributes.push({ el, name, id: el.getAttribute(name), en: el.getAttribute(`data-en-${name}`) }));
  }
  const languageButton = document.getElementById('language-toggle');
  const themeSelect = document.getElementById('theme-select');
  const media = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme() {
    const mode = themeSelect.value;
    document.documentElement.dataset.theme = mode === 'dark' || (mode === 'auto' && media.matches) ? 'dark' : 'light';
    document.querySelector('meta[name="theme-color"]').content = document.documentElement.dataset.theme === 'dark' ? '#11151b' : '#f3f0e7';
  }
  function setLanguage(lang) {
    document.documentElement.lang = lang;
    nodes.forEach(({ el, id }) => { el.textContent = lang === 'en' ? el.dataset.en : id; });
    attributes.forEach(({ el, name, id, en }) => el.setAttribute(name, lang === 'en' ? en : id));
    languageButton.textContent = lang === 'en' ? 'ID' : 'EN';
    languageButton.setAttribute('aria-label', lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English');
    languageButton.title = languageButton.getAttribute('aria-label');
    const name = document.getElementById('comment-name'), body = document.getElementById('comment-body');
    if (name) name.placeholder = lang === 'en' ? 'Your name' : 'Nama Anda';
    if (body) body.placeholder = lang === 'en' ? 'Write your comment here...' : 'Tulis komentar Anda di sini...';
    save('portfolio-language', lang);
    window.dispatchEvent(new Event('portfolio-language-change'));
  }
  themeSelect.value = ['auto', 'light', 'dark'].includes(read('portfolio-theme', 'auto')) ? read('portfolio-theme', 'auto') : 'auto';
  themeSelect.addEventListener('change', () => { save('portfolio-theme', themeSelect.value); applyTheme(); });
  media.addEventListener('change', applyTheme);
  languageButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'id' : 'en'));
  setLanguage(read('portfolio-language', 'id') === 'en' ? 'en' : 'id');
  applyTheme();
})();
