(() => {
  const form = document.getElementById('comment-form');
  const list = document.getElementById('guestbook-comments');
  const count = document.getElementById('comment-count');
  const feedback = document.getElementById('comment-feedback');
  const config = window.PORTFOLIO_COMMENTS;
  if (!form || !list) return;

  if (!config?.url || !config?.publishableKey) {
    form.querySelector('button[type="submit"]').disabled = true;
    list.firstElementChild.textContent = 'Komentar sedang disiapkan.';
    feedback.textContent = 'Pengiriman komentar belum tersedia.';
    return;
  }

  const endpoint = `${config.url.replace(/\/$/, '')}/rest/v1/portfolio_comments`;
  const headers = { apikey: config.publishableKey, 'Content-Type': 'application/json' };
  const tr = (id, english) => document.documentElement.lang === 'en' ? english : id;

  function showComments(comments) {
    list.replaceChildren();
    count.textContent = `(${comments.length}${comments.length === 50 ? '+' : ''})`;
    if (!comments.length) {
      const empty = document.createElement('p');
      empty.textContent = tr('Belum ada komentar yang diterbitkan.', 'No comments have been posted yet.');
      list.append(empty);
      return;
    }
    comments.forEach((comment) => {
      const article = document.createElement('article');
      const avatar = document.createElement('span');
      avatar.className = 'comment-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.textContent = comment.name.trim().slice(0, 2).toUpperCase();
      const content = document.createElement('div');
      const meta = document.createElement('p');
      meta.className = 'comment-meta';
      const author = document.createElement('strong');
      author.textContent = comment.name;
      const date = document.createElement('time');
      date.dateTime = comment.created_at;
      date.textContent = new Intl.DateTimeFormat(document.documentElement.lang === 'en' ? 'en-US' : 'id-ID', { dateStyle: 'medium' }).format(new Date(comment.created_at));
      const body = document.createElement('p');
      body.textContent = comment.body;
      meta.append(author, date);
      content.append(meta, body);
      article.append(avatar, content);
      list.append(article);
    });
  }

  async function loadComments() {
    try {
      const response = await fetch(`${endpoint}?select=name,body,created_at&approved=eq.true&order=created_at.desc&limit=50`, { headers: { apikey: config.publishableKey } });
      if (!response.ok) throw new Error('Gagal memuat komentar');
      showComments(await response.json());
      return true;
    } catch {
      list.firstElementChild.textContent = tr('Komentar belum dapat dimuat. Coba lagi nanti.', 'Comments could not be loaded. Try again later.');
      return false;
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (form.elements.website.value) return;
    const name = form.elements.name.value.trim();
    const body = form.elements.body.value.trim();
    if (name.length < 2 || body.length < 3) {
      feedback.textContent = tr('Nama atau komentar terlalu singkat.', 'Name or comment is too short.');
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    feedback.textContent = tr('Mengirim komentar...', 'Posting comment...');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { ...headers, Prefer: 'return=minimal' },
        body: JSON.stringify({ name, body })
      });
      if (!response.ok) throw new Error('Gagal mengirim komentar');
      form.reset();
      const visible = await loadComments();
      if (visible) list.scrollTop = 0;
      feedback.textContent = visible
        ? tr('Komentar terkirim dan sudah tampil di bawah.', 'Comment posted and shown below.')
        : tr('Komentar terkirim, tetapi daftar belum dapat dimuat. Muat ulang halaman untuk melihatnya.', 'Comment posted, but the list could not be loaded. Refresh the page to see it.');
    } catch {
      feedback.textContent = tr('Komentar belum terkirim. Coba lagi nanti.', 'Comment could not be posted. Try again later.');
    } finally {
      submit.disabled = false;
    }
  });

  loadComments();
  window.addEventListener('portfolio-language-change', loadComments);
})();
