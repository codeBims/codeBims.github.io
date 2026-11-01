# Komentar portofolio

Situs GitHub Pages tidak memiliki penyimpanan untuk formulir. Fitur ini memakai proyek Supabase tersendiri agar komentar dapat ditulis dan dibaca langsung di halaman.

1. Buat proyek Supabase khusus portofolio. Jangan memakai database FitTrack atau proyek lain.
2. Jalankan `comments-schema.sql` di SQL Editor proyek baru.
3. Isi `url` dan `publishableKey` di `comments-config.js` dari pengaturan API proyek. Keduanya memang untuk dipakai di browser. Jangan pernah memasukkan `service_role` atau secret key ke situs.
4. Kirim komentar uji dari halaman. Komentar baru berstatus `approved = false` dan belum terlihat publik.
5. Tinjau isi di Table Editor `portfolio_comments`, lalu ubah `approved` menjadi `true` untuk menerbitkannya. Muat ulang halaman untuk memastikan komentar tampil.

Komentar hanya meminta nama dan isi. Email serta foto profil tidak dikumpulkan. Avatar dibuat dari dua huruf pertama nama. Komentar anonim tetap dapat menjadi sasaran spam; tinjau antrean secara berkala. Jika antrean mulai diserang, tambahkan CAPTCHA dan pembatasan permintaan melalui fungsi server sebelum membuka pengiriman lagi.
