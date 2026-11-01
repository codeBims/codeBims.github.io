# Komentar portofolio

Situs GitHub Pages tidak memiliki penyimpanan untuk formulir. Fitur ini memakai proyek Supabase tersendiri agar komentar dapat ditulis dan dibaca langsung di halaman.

1. Buat proyek Supabase khusus portofolio. Jangan memakai database FitTrack atau proyek lain.
2. Jalankan `comments-schema.sql` di SQL Editor proyek. Skrip ini juga dapat dijalankan ulang untuk mengubah proyek lama ke komentar yang langsung tampil.
3. Isi `url` dan `publishableKey` di `comments-config.js` dari pengaturan API proyek. Keduanya memang untuk dipakai di browser. Jangan pernah memasukkan `service_role` atau secret key ke situs.
4. Kirim komentar uji dari halaman. Komentar baru langsung terbit dan daftar diperbarui tanpa memuat ulang halaman.
5. Untuk menyembunyikan komentar yang tidak pantas, ubah `approved` menjadi `false` di Table Editor `portfolio_comments`.

Komentar hanya meminta nama dan isi. Email serta foto profil tidak dikumpulkan. Avatar dibuat dari dua huruf pertama nama. Karena komentar anonim langsung tampil, spam atau konten tidak pantas dapat terlihat sebelum dihapus; periksa situs secara berkala. Jika mulai diserang, kembalikan moderasi atau tambahkan CAPTCHA dan pembatasan permintaan melalui fungsi server.
