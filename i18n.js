(() => {
  const en = {
    'Lewati ke konten':'Skip to content','Data portfolio':'Data portfolio','Studi kasus':'Case studies','Pengalaman':'Experience','Sertifikat':'Certificates','Keahlian':'Skills','Kontak':'Contact','Unduh CV':'Download CV','Tersedia untuk peluang kerja':'Open to opportunities','Dari log dan gerakan,':'From logs and movement,','menjadi informasi yang jelas.':'to clear information.','Jelajahi studi kasus':'Explore case studies','Fokus saat ini':'Current focus','Studi kasus terpilih':'Selected case studies','Pengalaman magang':'Internship experience','Tugas akhir evaluasi model':'Model evaluation thesis','S1 Informatika':'BSc Informatics','01 / Profil':'01 / Profile','Kelulusan 2026':'Graduation 2026','Sentuh foto untuk versi lain':'Tap photo for another version','Saya mulai dari masalah yang ingin dijawab.':'I start with the problem that needs answering.','Rapikan':'Organize','Uji':'Test','Ceritakan':'Explain','02 / Portofolio':'02 / Portfolio','Mau lihat yang saya kerjakan?':'Want to see what I have worked on?','Proyek':'Projects','Pose estimation':'Pose estimation','Produk pribadi · 2026':'Personal product · 2026','Tugas akhir · 2025–2026':'Final thesis · 2025–2026','Proyek pribadi · 2026':'Personal project · 2026','Tantangan':'Challenge','Pendekatan':'Approach','Kontribusi':'Contribution','Kunjungi FitTrack':'Visit FitTrack','Metrik':'Metrics','Temuan':'Finding','Data':'Data','Batasan':'Limitations','Proses':'Process','Lihat kode dan batasan produk':'View code and product limitations','Dokumentasi pribadi selama magang di Telkom Indonesia.':'Personal photo during my Telkom Indonesia internship.','Catatan privasi.':'Privacy note.','Pelatihan yang pernah saya selesaikan.':'Training I have completed.','Buka sertifikat ↗':'View certificate ↗','Lihat 8 sertifikat lainnya':'View 8 more certificates','Alat yang memang pernah saya pakai.':'Tools I have actually used.','Analisis data':'Data analysis','Monitoring':'Monitoring','Evaluasi':'Evaluation','Produk web':'Web products','Proyek tambahan · 2025':'Additional project · 2025','Buka situs':'Visit site','03 / Jejak':'03 / Background','Perjalanan saya sejauh ini.':'My journey so far.','Pendidikan':'Education','Pelatihan':'Training','04 / Kontak':'04 / Contact','Ada data yang perlu dibuat lebih jelas?':'Have data that needs to be made clearer?','Mari ngobrol':'Let’s talk','Dokumen':'Document','05 / Komentar':'05 / Comments','Ada masukan atau pertanyaan?':'Have feedback or a question?','Temukan saya':'Find me','Komentar':'Comments','Nama':'Name','Kirim komentar':'Post comment','Komentar langsung tampil untuk semua pengunjung. Jangan tulis informasi pribadi atau rahasia.':'Comments appear publicly right away. Do not include personal or confidential information.','Memuat komentar...':'Loading comments...','Jul–Agu 2025':'Jul–Aug 2025','2022–Sep 2026':'2022–Sep 2026','masih berjalan':'in progress','Prototipe':'Prototype','Data lokasi & produk':'Location data & product','Log & observability':'Logs & observability','Monitoring operasional berbasis ELK Stack':'Operational monitoring with ELK Stack','Evaluasi pose estimation untuk analisis gerakan':'Pose estimation evaluation for movement analysis'
  };
  const sentences = {
    'MAE dan RMSE untuk mengukur selisih prediksi model dari pengukuran manual.':'MAE and RMSE to measure the difference between model predictions and manual measurements.',
    'Sudut siku, jumlah repetisi, range of motion, angular velocity, dan time under tension.':'Elbow angle, repetition count, range of motion, angular velocity, and time under tension.',
    'Normal curl subjek 1: MAE BlazePose 8,4° dan YOLOv8-Pose 8,6°.':'Normal curl, subject 1: BlazePose MAE 8.4° and YOLOv8-Pose MAE 8.6°.',
    'Alur evaluasi dari video hingga tabel, grafik, dan CSV.':'Evaluation flow from video to tables, charts, and CSV.',
    'Error sudut per frame terhadap ground truth.':'Per-frame angle error against ground truth.',
    'Contoh pemantauan sudut siku dan repetisi pada rekaman bicep curl.':'Example of elbow angle and repetition tracking in a bicep curl video.',
    'Jelajahi: katalog destinasi dengan sumber lokasi yang dapat ditelusuri.':'Explore: a destination catalog with traceable place sources.',
    'Rute Kustom: pilih moda, titik awal, singgah, dan tujuan.':'Custom route: choose travel mode, start, stops, and destination.',
    'Berikut sertifikat Digital Talent Scholarship 2026 dari Komdigi. Sebagian besar berupa Micro Skill singkat, jadi durasinya saya tampilkan apa adanya. Klik kartu untuk melihat PDF asli.':'These are my Digital Talent Scholarship 2026 certificates from Komdigi. Most are short Micro Skills, so I show their duration as-is. Select a card to view the original PDF.',
    'Pengenalan Data Science dan Pemanfaatannya di Berbagai Sektor':'Introduction to Data Science and Its Applications Across Sectors',
    'Dasar-Dasar Implementasi Kecerdasan Artifisial':'Fundamentals of Artificial Intelligence Implementation',
    'Menerapkan Rekayasa Prompt dengan Azure OpenAI Service':'Applying Prompt Engineering with Azure OpenAI Service',
    'Tips Melindungi Diri dari Ancaman Phishing dan Malware':'Protecting Yourself from Phishing and Malware',
    'Daftar ini berasal dari pekerjaan magang, tugas akhir, dan proyek pribadi saya, bukan sekadar teknologi yang pernah saya baca.':'This list comes from my internship, thesis, and personal projects, not just technologies I have read about.',
    'Perbandingan dengan ground truth (tugas akhir)':'Comparison with ground truth (thesis)',
    'Eksperimen e-commerce sederhana yang saya bangun dengan HTML, CSS, dan JavaScript, lengkap dengan alur pemesanan melalui WhatsApp.':'A simple e-commerce experiment I built with HTML, CSS, and JavaScript, including an ordering flow through WhatsApp.',
    'Mengolah log ITGC dan Kubernetes menggunakan ELK Stack.':'Processed ITGC and Kubernetes logs using the ELK Stack.',
    'Menyusun beberapa dashboard Kibana untuk monitoring operasional.':'Built several Kibana dashboards for operational monitoring.',
    'Menyiapkan keluaran log bagi alur otomasi audit lanjutan.':'Prepared log output for subsequent audit automation.',
    'Untuk tugas akhir, saya membandingkan MediaPipe BlazePose dan YOLOv8-Pose dalam membaca gerakan bicep curl dari video.':'For my thesis, I compared MediaPipe BlazePose and YOLOv8-Pose in reading bicep curl movements from video.',
    'Saat ini saya sedang mempelajari dasar kecerdasan buatan dan penerapannya pada layanan AWS.':'I am currently studying AI fundamentals and how they are applied in AWS services.',
    'Saya Henry Abimanyu Dewandani, lulusan Informatika yang tertarik pada analisis data. Saat magang, saya membuat dashboard dari log operasional. Dalam tugas akhir, saya menguji model pembaca gerakan. Di sini saya tunjukkan proses dan hasil yang bisa diperiksa.':'I am Henry Abimanyu Dewandani, an Informatics graduate interested in data analysis. During my internship, I built dashboards from operational logs. For my thesis, I evaluated movement analysis models. Here I show the process and results you can examine.',
    'Datanya bisa berupa log operasional atau rekaman gerakan tubuh. Apa pun bentuknya, saya mulai dengan memahami konteks, merapikan datanya, lalu memilih cara ukur yang benar-benar membantu.':'The data may be operational logs or recordings of human movement. Whatever the format, I start by understanding the context, organizing the data, and choosing measurements that are genuinely useful.',
    'Data mentah saya susun dulu supaya masalahnya terlihat dan analisisnya tidak menyesatkan.':'I organize raw data first so the problem becomes visible and the analysis does not mislead.',
    'Saya memilih metrik sesuai kebutuhan, termasuk MAE dan RMSE saat mengevaluasi model.':'I choose metrics based on the need, including MAE and RMSE when evaluating models.',
    'Hasil akhirnya saya ubah menjadi dashboard, grafik, atau ringkasan yang cepat dipahami.':'I turn the final results into dashboards, charts, or summaries that are quick to understand.',
    'Mulai dari proyek yang paling menarik perhatian Anda. Tiap studi kasus membahas apa yang saya kerjakan, alasan di baliknya, dan batasan yang masih ada.':'Start with whichever project catches your attention. Each case study covers what I built, why I made those choices, and what limitations remain.',
    'Saya membangun FitTrack agar catatan latihan bisa dilihat kembali sebagai progres. Pengguna dapat mencatat sesi, membandingkan riwayat, dan membaca grafiknya, termasuk saat sedang offline.':'I built FitTrack so workout records could be reviewed as progress. Users can log sessions, compare their history, and read charts, even while offline.',
    'Catatan latihan mudah tercecer dan sulit dibaca kembali sebagai progres.':'Workout records were easy to lose and difficult to read as progress.',
    'Saya menyatukan pencatatan, riwayat, grafik progres, volume mingguan, dan estimasi 1RM, yaitu perkiraan beban maksimal untuk satu repetisi.':'I brought together logging, history, progress charts, weekly volume, and estimated 1RM, an estimate of the maximum weight for one repetition.',
    'Saya merancang alur, membangun aplikasinya, lalu menguji kembali perilaku fitur analitiknya.':'I designed the flow, built the application, and then tested how its analytics features behaved.',
    'Dalam tugas akhir ini, saya membandingkan MediaPipe BlazePose dan YOLOv8-Pose dengan pengukuran manual dari ImageJ pada video bicep curl.':'In this thesis, I compared MediaPipe BlazePose and YOLOv8-Pose with manual ImageJ measurements on bicep curl videos.',
    'repetisi berhasil terdeteksi oleh BlazePose pada salah satu skenario pengujian yang tercantum di CV.':'repetitions were detected by BlazePose in one of the test scenarios listed in my CV.',
    'JalanYuk adalah prototipe untuk mencari destinasi dan menyusun rute dalam satu alur. Bagian tersulitnya bukan sekadar menampilkan tempat, tetapi memastikan sumber dan identitas setiap lokasi tetap jelas.':'JalanYuk is a prototype for finding destinations and planning routes in one flow. The hardest part was not simply showing places, but keeping the source and identity of each location clear.',
    'Katalog memakai data OpenStreetMap, sedangkan pencarian tempat tambahan menggunakan Photon.':'The catalog uses OpenStreetMap data, while additional place searches use Photon.',
    'Saya membangun pencarian, pin lokasi manual, perencanaan rute, serta cadangan data perjalanan terenkripsi.':'I built the search flow, manual location pins, route planning, and encrypted trip data backups.',
    'Cakupan katalog belum merata di seluruh Indonesia. Rute juga tetap perlu diperiksa sebelum digunakan di perjalanan.':'The catalog does not yet cover Indonesia evenly. Routes still need to be checked before they are used for travel.',
    'Saat magang di Telkom Indonesia, saya mengolah log pemeriksaan kontrol TI (ITGC) dan Kubernetes. Hasilnya disusun menjadi dashboard Kibana agar aktivitas operasional lebih mudah dipantau.':'During my Telkom Indonesia internship, I processed IT control (ITGC) and Kubernetes logs. I organized the results in Kibana dashboards to make operational activity easier to monitor.',
    'Log operasional dari beberapa sumber dengan struktur yang belum seragam.':'Operational logs from several sources with inconsistent structures.',
    'Saya melakukan parsing, menyusun field, memeriksa hasil tampilannya, lalu membuat dashboard.':'I parsed the logs, organized the fields, checked the resulting views, and then built the dashboard.',
    'Dashboard monitoring dan keluaran log yang dapat dipakai pada tahap otomasi audit berikutnya.':'Monitoring dashboards and log output that could be used in the next audit automation stage.',
    'Tangkapan layar daftar dashboard ini ditampilkan dengan izin. Data log, nama host, dan isi dashboard internal tetap tidak saya publikasikan.':'This dashboard list screenshot is shown with permission. I do not publish internal log data, host names, or dashboard contents.',
    'Dari kuliah Informatika, magang di Telkom Indonesia, sampai pelatihan yang masih berjalan.':'From studying Informatics and interning at Telkom Indonesia to training that is still in progress.',
    'Saya terbuka untuk posisi junior atau fresh graduate, juga proyek freelance analitik yang sesuai dengan pengalaman saya.':'I am open to junior or graduate roles, as well as freelance analytics projects that match my experience.',
    'Tulis langsung di sini. Komentar Anda akan tampil untuk pengunjung lain; jika ingin membahas pekerjaan atau proyek, hubungi saya lewat kontak di atas.':'Write directly here. Your comment will be visible to other visitors; if you would like to discuss a role or project, contact me using the details above.'
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
    'Daftar dashboard monitoring yang saya buat selama magang.':'Monitoring dashboards I built during my internship.',
    'Suasana kerja bersama peserta magang di Telkom Jatinegara.':'Working with fellow interns at Telkom Jatinegara.',
    'Identitas peserta Digistar Internship.':'Digistar Internship participant badge.',
    'Digital Talent Academy · 12 jam':'Digital Talent Academy · 12 hours',
    'Micro Skill · 1 jam':'Micro Skill · 1 hour',
    'Micro Skill · 2 jam':'Micro Skill · 2 hours',
    'Micro Skill · 3 jam':'Micro Skill · 3 hours'
  });
  Object.assign(en, {
    'Datanya bisa berupa log operasional, transaksi, atau rekaman gerakan tubuh. Apa pun bentuknya, saya mulai dengan memahami konteks, merapikan datanya, lalu memilih cara ukur yang benar-benar membantu.':'The data may be operational logs, transactions, or recordings of human movement. Whatever the format, I start by understanding the context, organizing the data, and choosing measurements that are genuinely useful.',
    'Analisis data · 2026':'Data analysis · 2026',
    'Studi kasus publik':'Public case study',
    'Analisis transaksi':'Transaction analysis',
    'Saya memeriksa 541.909 baris transaksi untuk mencari tahu berapa banyak pelanggan yang punya invoice lain dalam 90 hari setelah invoice pertama yang terlihat di data.':'I examined 541,909 transaction rows to find how many customers had another invoice within 90 days of their first observed invoice.',
    '885 dari 2.075 pelanggan pada kohort Januari–Juni 2011 memiliki invoice non-pembatalan berikutnya dalam 90 hari.':'885 of 2,075 customers in the January–June 2011 cohort had another non-cancellation invoice within 90 days.',
    'Saya memeriksa data kosong, pembatalan, nilai nonpositif, dan baris identik sebelum membentuk kohort dengan SQL.':'I checked missing data, cancellations, nonpositive values, and identical rows before building the cohort with SQL.',
    'Proporsi invoice lanjutan berbeda menurut bulan dan kelompok nilai invoice pertama.':'The share with another invoice varied by month and first invoice value group.',
    'Ini mengukur aktivitas invoice, bukan retensi pembelian bersih. Pembatalan dan retur belum sepenuhnya dipasangkan dengan invoice asal.':'This measures invoice activity, not net purchase retention. Cancellations and returns have not been fully matched to their original invoices.',
    'Sumber data: UCI Online Retail':'Data source: UCI Online Retail',
    'Invoice lanjutan menurut bulan invoice pertama yang teramati.':'Subsequent invoices by month of first observed invoice.',
    'Perbandingan menurut nilai invoice pertama. Hubungan ini bersifat deskriptif.':'Comparison by first invoice value. This relationship is descriptive.',
    'Lihat ukuran penuh ↗':'View full size ↗',
    'SQL: SQLite dan window functions':'SQL: SQLite and window functions'
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
    document.title = lang === 'en' ? 'Henry Abimanyu | Junior Data Analyst Portfolio' : 'Henry Abimanyu | Junior Data Analyst';
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
