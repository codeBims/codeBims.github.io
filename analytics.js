(() => {
  const config = window.PORTFOLIO_ANALYTICS;
  if (!config?.scriptUrl || !config?.websiteId || ['localhost','127.0.0.1'].includes(location.hostname)) return;
  let url;
  try { url = new URL(config.scriptUrl); } catch { return; }
  if (url.protocol !== 'https:') return;
  const script = document.createElement('script');
  script.src = url.href; script.defer = true; script.dataset.websiteId = config.websiteId;
  script.dataset.doNotTrack = 'true'; document.head.append(script);
  const track = (name, data) => window.umami?.track(name, data);
  const idOf = link => link.closest('.case-study')?.id || link.getAttribute('href').split('/').pop().split('.')[0];
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-case]');
    if (button) track('project_select', { project: button.dataset.case });
    const link = event.target.closest('a[href]'); if (!link) return;
    const href = link.getAttribute('href');
    if (href.includes('CV-Henry-Abimanyu.pdf')) track('cv_download_click');
    else if (link.matches('.work-card,.detail-link')) track('case_open', { project: idOf(link) });
    else if (link.closest('.contact-list') || href.startsWith('mailto:')) track('contact_click', { channel: href.startsWith('mailto:') ? 'email' : new URL(link.href).hostname });
    else if (link.matches('.case-link,.happiness-evidence .button') && /^https:/.test(href)) track('project_outbound_click', { project: link.closest('.case-study')?.id || 'detail' });
  });
})();
