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

  function showComments(comments) {
    list.replaceChildren();
    count.textContent = `(${comments.length}${comments.length === 50 ? '+' : ''})`;
    if (!comments.length) {
      const empty = document.createElement('p');
      empty.textContent = 'Belum ada komentar yang diterbitkan.';
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
      date.textContent = new Intl.DateTimeFormat('id-ID', { dateStyle: 'medium' }).format(new Date(comment.created_at));
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
    } catch {
      list.firstElementChild.textContent = 'Komentar belum dapat dimuat. Coba lagi nanti.';
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (form.elements.website.value) return;
    const name = form.elements.name.value.trim();
    const body = form.elements.body.value.trim();
    if (name.length < 2 || body.length < 3) {
      feedback.textContent = 'Nama atau komentar terlalu singkat.';
      return;
    }
    const submit = form.querySelector('button[type="submit"]');
    submit.disabled = true;
    feedback.textContent = 'Mengirim komentar...';
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { ...headers, Prefer: 'return=minimal' },
        body: JSON.stringify({ name, body })
      });
      if (!response.ok) throw new Error('Gagal mengirim komentar');
      form.reset();
      feedback.textContent = 'Terima kasih. Komentar Anda menunggu peninjauan sebelum tampil.';
    } catch {
      feedback.textContent = 'Komentar belum terkirim. Coba lagi nanti.';
    } finally {
      submit.disabled = false;
    }
  });

  loadComments();
})();
