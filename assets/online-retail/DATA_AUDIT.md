# Pemeriksaan awal dataset Online Retail

Sumber: UCI Machine Learning Repository, Online Retail (dataset 352), Daqing Chen, CC BY 4.0. Data transaksi toko daring Inggris dari 1 Desember 2010 sampai 9 Desember 2011. Berkas asli disimpan di `data/Online Retail.xlsx`.

Catatan ini merangkum proses analisis lokal. Nama skrip merujuk pada proses asal; unduhan portofolio menyediakan empat query SQL dan grafik hasil analisis.

## Hasil pembacaan awal

| Pemeriksaan | Hasil |
| --- | ---: |
| Baris dan kolom | 541.909 baris, 8 kolom |
| Rentang `InvoiceDate` | 2010-12-01 08:26 sampai 2011-12-09 12:50 |
| Nomor invoice unik | 25.900 |
| `CustomerID` unik yang tersedia | 4.372 |
| `CustomerID` kosong | 135.080 baris |
| `Description` kosong | 1.454 baris |
| Nomor invoice berawalan C (pembatalan) | 9.288 baris |
| `Quantity` <= 0 | 10.624 baris |
| `UnitPrice` <= 0 | 2.517 baris |
| Baris duplikat persis | 5.268 baris |
| Negara unik | 38 |

Angka pembatalan dan kuantitas nonpositif dapat tumpang tindih. Baris duplikat persis belum tentu salah; aturan penghapusannya harus diperiksa sebelum analisis.

## Pertanyaan yang akan diuji

Dari pelanggan dengan invoice pertama **yang teramati** pada Januari–Juni 2011, berapa proporsi yang memiliki invoice non-pembatalan berikutnya dalam 90 hari? Apakah proporsinya berbeda menurut nilai invoice pertama?

Data hanya dimulai pada Desember 2010, sehingga "pembelian pertama yang teramati" tidak sama dengan pelanggan baru yang sesungguhnya. Perbandingan kelompok bersifat deskriptif dan tidak membuktikan sebab akibat.

## Keputusan yang perlu ditetapkan pada tahap berikutnya

- Unit analisis: invoice non-pembatalan, lalu pelanggan untuk aktivitas invoice lanjutan.
- `CustomerID` kosong tidak dapat dipakai untuk pelacakan pelanggan.
- Pembatalan dan transaksi dengan harga atau kuantitas nonpositif harus dipisahkan dari pembelian yang sah; dampaknya dilaporkan.
- Kebijakan terhadap baris duplikat persis perlu diuji sebelum ditetapkan.

## Aturan kerja untuk analisis aktivitas invoice lanjutan

Satu baris dianggap bagian dari invoice non-pembatalan jika `CustomerID` tersedia, `InvoiceNo` tidak berawalan C, `Quantity` > 0, dan `UnitPrice` > 0. Aturan ini menyisakan 397.884 baris, 18.532 invoice, dan 4.338 pelanggan. Ini belum membuktikan transaksi akhirnya tidak diretur atau dibatalkan.

Semua 9.288 baris pembatalan memiliki kuantitas nonpositif. Ada 1.336 baris kuantitas nonpositif di luar pembatalan dan 2.517 baris harga nonpositif di luar pembatalan. Kelompok-kelompok ini tidak boleh dijumlahkan begitu saja karena bisa tumpang tindih.

Ada 5.192 baris duplikat persis dalam kandidat invoice non-pembatalan. Duplikat itu **dipertahankan sementara**: satu invoice dapat berisi dua unit barang yang dicatat sebagai dua baris sama. Menghapusnya tanpa bukti dapat mengecilkan nilai invoice. Karena aktivitas lanjutan dihitung dari invoice unik, duplikat baris tidak menggandakan jumlah invoice. Pengaruhnya terhadap nilai invoice pertama diuji pada langkah 6.

Definisi aktivitas invoice lanjutan: invoice non-C berikutnya dari `CustomerID` yang sama, dengan `InvoiceNo` berbeda, terjadi lebih dari 0 sampai 90 hari setelah waktu invoice pertama yang teramati. Kohort utama adalah pelanggan dengan invoice pertama teramati pada Januari–Juni 2011; invoice pertama pada Desember 2010 dikeluarkan dari kohort utama, tetapi tetap dipakai untuk mengenali pelanggan yang sudah terlihat sebelumnya. Pembatalan belum direkonsiliasi penuh, sehingga metrik ini bukan retensi pembelian bersih.

## Langkah 2: tabel invoice

Jalankan `python build_database.py` dari folder proyek. Skrip membaca Excel asli dan membuat `data/online_retail.sqlite`. Query di `sql/01_invoice_table.sql` menghasilkan tabel `purchases` dengan satu baris per invoice, berisi pelanggan, waktu, nilai invoice dalam GBP, jumlah unit, dan jumlah baris item. Pemeriksaan awal menghasilkan 18.532 invoice dari 4.338 pelanggan; tidak ada nomor invoice ganda di tabel `purchases`.

## Langkah 3: pembelian pertama yang teramati

Jalankan `python step3_first_purchase.py`. Query di `sql/02_first_purchase.sql` memakai `ROW_NUMBER()` untuk mengurutkan invoice setiap pelanggan berdasarkan waktu lalu nomor invoice, kemudian memilih urutan pertama. Tabel `first_purchases` berisi 4.338 pelanggan. Di antaranya, 2.075 memiliki invoice pertama yang teramati pada Januari–Juni 2011 (417, 380, 452, 300, 284, dan 242 pelanggan per bulan). Ini belum menghitung aktivitas invoice lanjutan.

## Langkah 4: invoice lanjutan dalam 90 hari

Jalankan `python step4_repeat_purchase.py`. Query di `sql/03_repeat_purchase.sql` memakai `EXISTS` untuk memberi penanda 1 jika pelanggan memiliki invoice non-C berbeda setelah invoice pertama dan paling lambat 90 hari kemudian. Dalam kohort 2.075 pelanggan, 885 (42,7%) memenuhi definisi tersebut. Per bulan Januari–Juni: 48,4%, 43,9%, 41,8%, 41,7%, 38,4%, dan 38,4%. Angka ini bersifat deskriptif; belum menjelaskan penyebab perbedaan antarkohort atau memastikan pembelian bersih.

## Langkah 5: kelompok nilai invoice pertama

Jalankan `python step5_value_segments.py`. Query di `sql/04_first_invoice_segments.sql` memakai `NTILE(4)` untuk membagi 2.075 pelanggan menjadi empat kelompok berukuran hampir sama berdasarkan nilai invoice pertama. Persentase dengan invoice lanjutan kelompok 1–4 berturut-turut 34,7%, 37,8%, 47,0%, dan 51,2%. Kelompok tertinggi memiliki rentang GBP 451,03–77.183,60; nilai ekstrem dan kemungkinan pengaruh baris duplikat harus diperiksa sebelum hasil ini dipakai sebagai kesimpulan portofolio.

## Langkah 6: pemeriksaan sensitivitas awal

Jalankan `python step6_sensitivity.py`. Bila baris identik pada invoice pertama dihapus, nilai invoice pertama berubah untuk 197 dari 2.075 pelanggan. Persentase dengan invoice lanjutan per kelompok nilai berubah dari 34,7%, 37,8%, 47,0%, 51,2% menjadi 35,3%, 37,8%, 46,4%, 51,2%. Jadi pola kelompok relatif serupa, tetapi aturan duplikat tetap harus dinyatakan.

Invoice pertama terbesar (pelanggan 12346, GBP 77.183,60) dibatalkan penuh 16 menit kemudian melalui invoice `C541433`. Ini menunjukkan bahwa invoice non-C masih dapat dibatalkan kemudian. Sebagai uji kasar, bila seluruh pelanggan yang pernah memiliki pembatalan dikeluarkan, tinggal 1.275 pelanggan dan persentase dengan invoice lanjutan menjadi 32,2%; angka kelompok 1–4 menjadi 30,4%, 25,7%, 34,8%, 38,1%. Uji ini **bukan hasil utama** karena mengeluarkan pelanggan yang mungkin memiliki invoice lain yang tidak dibatalkan. Karena itu, hasil utama hanya boleh ditafsirkan sebagai aktivitas invoice non-C, bukan pembelian bersih.

## Langkah 7: audit pencocokan pembatalan

Jalankan `python step7_cancellation_audit.py`. Dari 8.905 baris pembatalan yang memiliki pelanggan dan harga positif, hanya 2.787 (31,3%) dapat dipasangkan dengan baris positif sebelumnya memakai pelanggan, kode produk, jumlah absolut, dan harga yang sama. Ada 6.118 yang tidak cocok dan 598 pasangan yang memiliki lebih dari satu kandidat saat dipilih. Dalam kohort utama, 11 invoice pertama tampak dibatalkan seluruh barisnya dan 155 dibatalkan sebagian berdasarkan metode ini. Invoice pelanggan 12346 termasuk yang cocok dibatalkan penuh.

Pencocokan otomatis ini belum cukup andal untuk membangun omzet bersih atau menyebut semua invoice non-C sebagai pembelian final. Untuk studi kasus singkat, metrik utama sebaiknya dilabeli **aktivitas invoice non-pembatalan berikutnya dalam 90 hari**, dengan batasan bahwa retur/pembatalan tidak direkonsiliasi penuh. Angka 42,7% menggambarkan aktivitas invoice, bukan retensi pembelian bersih.

## Langkah 8: grafik per bulan

Jalankan `python step8_monthly_chart.py` untuk membuat `../online-retail-by-month.png`. Grafik menampilkan persentase dan pecahan pelanggan per bulan invoice pertama, dengan sumbu dimulai dari nol serta catatan definisi metrik dan sumber data. Ini adalah visual deskriptif; penurunan Januari–Juni tidak membuktikan penyebab tertentu.

## Langkah 9: grafik menurut nilai invoice pertama

Jalankan `python step9_value_chart.py` untuk membuat `../online-retail-by-first-invoice.png`. Grafik membandingkan empat kelompok nilai invoice pertama, menampilkan jumlah pelanggan di tiap kelompok, dan mengingatkan bahwa pembatalan belum direkonsiliasi penuh. Perbedaan kelompok tidak membuktikan bahwa nilai invoice menyebabkan aktivitas berikutnya.

## Langkah 10: draf studi kasus

`CASE_STUDY.md` merangkum pertanyaan, SQL, hasil, audit pembatalan, batasan, dan keputusan yang disarankan. Ringkasan ini dibagikan bersama query dan grafik portofolio.

## Langkah 11: reproduksi

`README.md` menjelaskan sumber data, dependensi, urutan menjalankan skrip, dan angka pemeriksaan utama. `requirements.txt` mencatat versi pustaka yang dipakai dalam sesi ini. `.gitignore` mengecualikan Excel asli, ZIP unduhan, dan database lokal dari repo yang mungkin dibuat nanti.
