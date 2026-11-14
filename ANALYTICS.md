# Statistik portofolio

Integrasi Umami sudah disiapkan, belum aktif karena akun dan Website ID belum tersedia. Tidak ada request analitik sebelum konfigurasi diisi. Pengujian localhost otomatis dikecualikan.

1. Buat akun Umami dan tambahkan website `https://codebims.github.io`.
2. Salin Script URL dan Website ID dari pengaturan tracking website tersebut. Gunakan URL script HTTPS yang diberikan layanan; jangan masukkan API secret.
3. Isi dua nilai publik di `analytics-config.js`, lalu publish dan periksa halaman Realtime Umami saat mengunjungi situs publik.
4. Pastikan page view dan event uji muncul, kemudian cocokkan domain serta halaman detail.

Event yang disiapkan: `project_select`, `case_open`, `project_outbound_click`, `cv_download_click`, `contact_click`. Properti hanya ID proyek atau kanal/domain, tanpa isi komentar, email pengunjung, atau data formulir. Klik CV tidak membuktikan PDF selesai dibaca; klik email tidak membuktikan pesan terkirim. Statistik mulai tersedia setelah aktivasi dan tidak mengisi kunjungan lama.

Dokumentasi layanan: https://umami.is/docs/collect-data dan https://umami.is/docs/track-events
