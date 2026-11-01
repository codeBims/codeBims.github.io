(() => {
  const en = {
    'Lewati ke konten':'Skip to content','Data portfolio':'Data portfolio','Studi kasus':'Case studies','Pengalaman':'Experience','Sertifikat':'Certificates','Keahlian':'Skills','Kontak':'Contact','Unduh CV':'Download CV','Tersedia untuk peluang kerja':'Open to opportunities','Data teknis,':'Technical data,','dibuat lebih jelas.':'made clearer.','Jelajahi studi kasus':'Explore case studies','Fokus saat ini':'Current focus','Studi kasus terpilih':'Selected case studies','Pengalaman magang':'Internship experience','Repetisi terdeteksi':'Repetitions detected','S1 Informatika':'BSc Informatics','01 / Profil':'01 / Profile','Kelulusan 2026':'Graduation 2026','Sentuh foto untuk versi lain':'Tap photo for another version','Berangkat dari pertanyaan, bukan dari alat.':'Start with the question, not the tool.','Strukturkan':'Structure','Ukur':'Measure','Jelaskan':'Explain','02 / Portofolio':'02 / Portfolio','Pilih bukti kerja yang ingin dilihat.':'Choose the work you want to explore.','Proyek':'Projects','Pose estimation':'Pose estimation','Produk pribadi · 2026':'Personal product · 2026','Tugas akhir · 2025–2026':'Final thesis · 2025–2026','Proyek pribadi · 2026':'Personal project · 2026','Tantangan':'Challenge','Pendekatan':'Approach','Kontribusi':'Contribution','Kunjungi FitTrack':'Visit FitTrack','Metrik':'Metrics','Temuan':'Finding','Data':'Data','Batasan':'Limitations','Proses':'Process','Lihat kode dan batasan produk':'View code and product limitations','Dokumentasi pribadi selama magang di Telkom Indonesia.':'Personal photo during my Telkom Indonesia internship.','Batas publikasi.':'Publication limits.','Pelatihan yang dapat diperiksa.':'Verifiable training.','Buka sertifikat ↗':'View certificate ↗','Lihat 8 sertifikat lainnya':'View 8 more certificates','Perangkat yang saya gunakan untuk menjawab masalah.':'Tools I use to solve problems.','Analisis data':'Data analysis','Monitoring':'Monitoring','Evaluasi':'Evaluation','Produk web':'Web products','Proyek tambahan · 2025':'Additional project · 2025','Buka situs':'Visit site','03 / Jejak':'03 / Background','Pengalaman dan pendidikan.':'Experience and education.','Pendidikan':'Education','Pelatihan':'Training','04 / Kontak':'04 / Contact','Mencari Junior Data Analyst yang mampu menjelaskan prosesnya?':'Looking for a Junior Data Analyst who can explain the process?','Mulai percakapan':'Get in touch','Dokumen':'Document','05 / Komentar':'05 / Comments','Tinggalkan kesan atau pertanyaan.':'Leave a thought or question.','Temukan saya':'Find me','Komentar':'Comments','Nama':'Name','Kirim komentar':'Post comment','Komentar langsung tampil untuk semua pengunjung. Jangan tulis informasi pribadi atau rahasia.':'Comments appear publicly right away. Do not include personal or confidential information.','Memuat komentar...':'Loading comments...','Jul–Agu 2025':'Jul–Aug 2025','2022–Sep 2026':'2022–Sep 2026','masih berjalan':'in progress','Prototipe':'Prototype','Data lokasi & produk':'Location data & product','Log & observability':'Logs & observability','Monitoring operasional berbasis ELK Stack':'Operational monitoring with ELK Stack','Evaluasi pose estimation untuk analisis gerakan':'Pose estimation evaluation for movement analysis'
  };
  const sentences = {
    'MAE dan RMSE terhadap ground truth manual.':'MAE and RMSE against manual ground truth.',
    'Sudut siku, jumlah repetisi, range of motion, angular velocity, dan time under tension.':'Elbow angle, repetition count, range of motion, angular velocity, and time under tension.',
    'Normal curl subjek 1: MAE BlazePose 8,4° dan YOLOv8-Pose 8,6°.':'Normal curl, subject 1: BlazePose MAE 8.4° and YOLOv8-Pose MAE 8.6°.',
    'Alur evaluasi dari video hingga tabel, grafik, dan CSV.':'Evaluation flow from video to tables, charts, and CSV.',
    'Error sudut per frame terhadap ground truth.':'Per-frame angle error against ground truth.',
    'Jelajahi: katalog destinasi dengan sumber lokasi yang dapat ditelusuri.':'Explore: a destination catalog with traceable place sources.',
    'Rute Kustom: pilih moda, titik awal, singgah, dan tujuan.':'Custom route: choose travel mode, start, stops, and destination.',
    'Dokumen Digital Talent Scholarship 2026 dari Komdigi. Sebagian besar adalah Micro Skill singkat; durasi masing-masing dicantumkan agar konteksnya jelas. Pilih kartu untuk membuka PDF asli.':'Digital Talent Scholarship 2026 documents from Komdigi. Most are short Micro Skills; each duration is shown for context. Select a card to open the original PDF.',
    'Pengenalan Data Science dan Pemanfaatannya di Berbagai Sektor':'Introduction to Data Science and Its Applications Across Sectors',
    'Dasar-Dasar Implementasi Kecerdasan Artifisial':'Fundamentals of Artificial Intelligence Implementation',
    'Menerapkan Rekayasa Prompt dengan Azure OpenAI Service':'Applying Prompt Engineering with Azure OpenAI Service',
    'Tips Melindungi Diri dari Ancaman Phishing dan Malware':'Protecting Yourself from Phishing and Malware',
    'Alat dan metode yang pernah saya gunakan dalam pengalaman magang, tugas akhir, atau proyek pribadi. Label proyek membantu menunjukkan konteksnya.':'Tools and methods I have used in my internship, thesis, and personal projects. Project labels provide context.',
    'Perbandingan dengan ground truth (tugas akhir)':'Comparison with ground truth (thesis)',
    'Situs e-commerce responsif dengan alur pembelian melalui WhatsApp, dibangun secara mandiri menggunakan HTML, CSS, dan JavaScript.':'A responsive e-commerce site with purchasing through WhatsApp, built independently with HTML, CSS, and JavaScript.',
    'Mengolah log ITGC dan Kubernetes menggunakan ELK Stack.':'Processed ITGC and Kubernetes logs using the ELK Stack.',
    'Menyusun beberapa dashboard Kibana untuk monitoring operasional.':'Built several Kibana dashboards for operational monitoring.',
    'Menyiapkan keluaran log bagi alur otomasi audit lanjutan.':'Prepared log output for subsequent audit automation.',
    'Tugas akhir membandingkan MediaPipe BlazePose dan YOLOv8-Pose untuk analisis gerakan bicep curl berbasis video.':'My thesis compared MediaPipe BlazePose and YOLOv8-Pose for video-based bicep curl movement analysis.',
    'Mempelajari dasar kecerdasan buatan dan penerapannya pada layanan AWS. Status program mengikuti CV terbaru.':'Studying AI fundamentals and their applications with AWS services. Program status follows the latest CV.',
    'Saya Henry Abimanyu Dewandani. Saya mengolah log, mengevaluasi model, dan membangun visualisasi agar informasi yang rumit dapat diperiksa, dibandingkan, dan digunakan untuk mengambil keputusan.':'I am Henry Abimanyu Dewandani. I analyze logs, evaluate models, and build visualizations so complex information can be examined, compared, and used to make decisions.',
    'Pengalaman saya bergerak dari log operasional hingga data gerakan tubuh. Polanya sama: memahami konteks, merapikan informasi, memilih ukuran yang tepat, lalu menyajikan hasil yang dapat ditelusuri kembali.':'My work spans operational logs and human movement data. The approach is consistent: understand the context, structure the information, choose meaningful measures, and present traceable results.',
    'Mengubah data mentah atau tidak terstruktur menjadi informasi yang siap dianalisis.':'Turn raw or unstructured data into information ready for analysis.',
    'Menggunakan metrik yang relevan, termasuk MAE dan RMSE untuk evaluasi model.':'Use relevant metrics, including MAE and RMSE for model evaluation.',
    'Menyusun dashboard, grafik, dan ringkasan agar temuan mudah diperiksa.':'Build dashboards, charts, and summaries that make findings easy to inspect.',
    'Proyek, sertifikat, dan alat kerja tersusun dalam satu tempat. Pilih studi kasus untuk membaca proses dan batasannya.':'Projects, certificates, and tools are organized in one place. Select a case study to see the process and its limitations.',
    'Aplikasi pencatatan latihan yang berkembang menjadi produk analitik untuk membantu pengguna membaca progresnya sendiri—bahkan ketika bekerja secara offline.':'A workout log that grew into an analytics product, helping users understand their progress even while offline.',
    'Riwayat latihan tersebar dan sulit dibandingkan antar-sesi.':'Workout history was scattered and hard to compare across sessions.',
    'Menyatukan logging, riwayat, grafik progres, volume mingguan, dan tren estimasi 1RM.':'Bring together logging, history, progress charts, weekly volume, and estimated 1RM trends.',
    'Merancang alur, membangun aplikasi, dan meninjau perilaku fitur analitik.':'Designed the flow, built the app, and reviewed the behavior of its analytics features.',
    'Pipeline Python untuk membandingkan MediaPipe BlazePose dan YOLOv8-Pose terhadap pengukuran manual ImageJ pada video bicep curl.':'A Python pipeline comparing MediaPipe BlazePose and YOLOv8-Pose against manual ImageJ measurements on bicep curl videos.',
    'repetisi terdeteksi oleh BlazePose pada skenario terpilih yang dicatat di CV.':'repetitions detected by BlazePose in a selected scenario documented in the CV.',
    'Prototipe perencana perjalanan yang menggabungkan katalog destinasi, pencarian tempat, dan penyusunan rute. Tantangannya adalah menjaga asal dan identitas lokasi tetap jelas saat hasil katalog bercampur dengan hasil pencarian.':'A trip planning prototype combining a destination catalog, place search, and route planning. The challenge was preserving clear source and place identity when catalog and search results met.',
    'Katalog lokasi bersumber dari OpenStreetMap, dengan pencarian tempat tambahan melalui Photon.':'The place catalog uses OpenStreetMap, with additional place search through Photon.',
    'Membangun alur pencarian, pin lokasi manual, perencanaan rute, dan cadangan data perjalanan terenkripsi.':'Built search, manual location pins, route planning, and encrypted trip data backups.',
    'Katalog belum mencakup seluruh Indonesia; rute bergantung pada layanan peta publik dan perlu diperiksa sebelum perjalanan.':'The catalog does not cover all of Indonesia; routes depend on public map services and need checking before travel.',
    'Mengolah log ITGC dan Kubernetes menjadi data terstruktur serta dashboard Kibana untuk kebutuhan monitoring operasional dan alur audit.':'Structured ITGC and Kubernetes logs and built Kibana dashboards for operational monitoring and audit workflows.',
    'Log operasional yang belum terstruktur dari beberapa sumber.':'Unstructured operational logs from multiple sources.',
    'Parsing, penyusunan field, validasi tampilan, dan pembuatan dashboard.':'Parsing, field design, visual validation, and dashboard development.',
    'Visualisasi monitoring dan keluaran log untuk alur otomasi audit lanjutan.':'Monitoring visualizations and log output for later audit automation.',
    'Materi, nama host, data, dan tangkapan layar sistem internal tidak ditampilkan karena tidak ada izin publikasi.':'Internal materials, host names, data, and system screenshots are omitted because publication permission was not granted.',
    'Fondasi teknis Informatika yang dipertemukan dengan praktik monitoring dan analisis data.':'An Informatics foundation combined with hands-on monitoring and data analysis.',
    'Saya terbuka untuk posisi penuh waktu, kesempatan fresh graduate, dan proyek freelance analitik terpilih.':'I am open to full-time roles, graduate opportunities, and selected freelance analytics projects.',
    'Tulis langsung di halaman ini. Nama dan komentar Anda akan terlihat oleh pengunjung lain. Untuk peluang kerja atau proyek, gunakan kontak pribadi di atas.':'Write directly on this page. Your name and comment will be visible to other visitors. For jobs or projects, use the contact details above.'
  };
  Object.assign(en, sentences);
  Object.assign(en, {
    'Portofolio':'Portfolio',
    'S1 Informatika · IPK 3,21/4,00':'BSc Informatics · GPA 3.21/4.00',
    'Yayasan Indonesia Emas Merdeka · masih berjalan':'Yayasan Indonesia Emas Merdeka · in progress',
    'Dashboard monitoring (magang Telkom)':'Monitoring dashboard (Telkom internship)',
    'Excel: formula, grafik, dashboard':'Excel: formulas, charts, dashboards',
    'SQL dasar':'Basic SQL',
    'Interpretasi hasil (tugas akhir)':'Result interpretation (thesis)',
    'Konsep Pemrograman':'Programming Concepts',
    'Dasar-dasar Keamanan AI':'AI Security Fundamentals',
    'Generative AI untuk Pendidikan':'Generative AI for Education',
    'Membangun Lab Virtual & Dasar Linux':'Building a Virtual Lab & Linux Fundamentals',
    'Pencatatan drop set.':'Drop set logging.',
    'Quick Import dengan tahap peninjauan.':'Quick Import with a review step.',
    'Ringkasan dan perbandingan sesi.':'Session summary and comparison.',
    'Hari pertama magang di Telkom Indonesia.':'First day of my internship at Telkom Indonesia.',
    'Suasana kerja bersama peserta magang di Telkom Jatinegara.':'Working with fellow interns at Telkom Jatinegara.',
    'Identitas peserta Digistar Internship.':'Digistar Internship participant badge.',
    'Digital Talent Academy · 12 jam':'Digital Talent Academy · 12 hours',
    'Micro Skill · 1 jam':'Micro Skill · 1 hour',
    'Micro Skill · 2 jam':'Micro Skill · 2 hours',
    'Micro Skill · 3 jam':'Micro Skill · 3 hours'
  });
  const original = new WeakMap();
  const nodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.parentElement.closest('script, style, #guestbook-comments') || !node.textContent.trim()) continue;
    original.set(node, node.textContent);
    nodes.push(node);
  }
  const langButton = document.getElementById('language-toggle');
  function setLanguage(lang) {
    document.documentElement.lang = lang;
    nodes.forEach((node) => {
      const source = original.get(node);
      const trimmed = source.trim();
      node.textContent = lang === 'en' && en[trimmed] ? source.replace(trimmed, en[trimmed]) : source;
    });
    const name = document.getElementById('comment-name');
    const body = document.getElementById('comment-body');
    name.placeholder = lang === 'en' ? 'Your name' : 'Nama Anda';
    body.placeholder = lang === 'en' ? 'Write your comment here...' : 'Tulis komentar Anda di sini...';
    document.querySelector('nav').setAttribute('aria-label', lang === 'en' ? 'Main navigation' : 'Navigasi utama');
    document.getElementById('guestbook-comments').setAttribute('aria-label', lang === 'en' ? 'Scrollable comments' : 'Daftar komentar, dapat digulir');
    document.title = lang === 'en' ? 'Henry Abimanyu — Junior Data Analyst | Portfolio' : 'Henry Abimanyu — Junior Data Analyst';
    langButton.textContent = lang === 'en' ? 'ID' : 'EN';
    langButton.setAttribute('aria-label', lang === 'en' ? 'Ganti ke Bahasa Indonesia' : 'Switch to English');
    langButton.title = langButton.getAttribute('aria-label');
    localStorage.setItem('portfolio-language', lang);
    window.dispatchEvent(new Event('portfolio-language-change'));
  }
  langButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'id' ? 'en' : 'id'));
  setLanguage(localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'id');

  const themeButton = document.getElementById('theme-toggle');
  const media = matchMedia('(prefers-color-scheme: dark)');
  let mode = localStorage.getItem('portfolio-theme') || 'auto';
  function applyTheme() {
    const dark = mode === 'dark' || (mode === 'auto' && media.matches);
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    themeButton.textContent = mode === 'auto' ? '◐' : mode === 'light' ? '☼' : '☾';
    const english = document.documentElement.lang === 'en';
    const label = mode === 'auto' ? (english ? 'Follow device' : 'Ikuti perangkat') : mode === 'light' ? (english ? 'Light' : 'Terang') : (english ? 'Dark' : 'Gelap');
    themeButton.setAttribute('aria-label', english ? `Theme: ${label}. Click to change` : `Tema: ${label}. Klik untuk mengganti`);
    themeButton.title = themeButton.getAttribute('aria-label');
    document.querySelector('meta[name="theme-color"]').content = dark ? '#11151b' : '#f3f0e7';
  }
  themeButton.addEventListener('click', () => { mode = mode === 'auto' ? 'light' : mode === 'light' ? 'dark' : 'auto'; localStorage.setItem('portfolio-theme', mode); applyTheme(); });
  media.addEventListener('change', applyTheme);
  window.addEventListener('portfolio-language-change', applyTheme);
  applyTheme();
})();
