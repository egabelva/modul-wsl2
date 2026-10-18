# Modul 01: Etika, Hukum, dan Izin Pengujian bagi White Hat Hacker

## Tools yang Digunakan

Tidak ada tools teknis — modul ini membahas aturan dan etika kerja.

## Materi Utama

Seorang White Hat Hacker hanya boleh menguji sistem miliknya sendiri, lab latihan yang memang disediakan untuk itu, atau sistem pihak lain yang sudah memberi izin tertulis (misalnya lewat program bug bounty). Menguji sistem tanpa izin, meskipun niatnya baik, tetap melanggar hukum di hampir semua negara. Program bug bounty biasanya punya dokumen 'scope' yang menjelaskan target mana saja yang boleh diuji dan teknik apa yang dilarang, misalnya serangan yang bisa mematikan layanan (DoS).

## Praktik

1. Baca satu contoh dokumen kebijakan 'Responsible Disclosure' atau 'Scope' dari program bug bounty publik (misalnya di HackerOne atau Bugcrowd).

2. Catat tiga hal: target yang boleh diuji, target yang dilarang, dan teknik yang dilarang.

3. Tulis dalam satu kalimat, kapan sebuah pengujian keamanan dianggap legal menurut dokumen tersebut.

## Hasil yang Diharapkan

*Kamu punya catatan singkat berisi batasan legal dan etis sebuah program bug bounty, dan bisa menjelaskan kapan pengujian dianggap sah.*

# Modul 02: Menyiapkan Lab: Windows, WSL2 Ubuntu, dan Lingkungan Latihan yang Aman

## Tools yang Digunakan

WSL2, Ubuntu, VS Code (opsional)

## Materi Utama

WSL2 (Windows Subsystem for Linux) menjalankan sistem Linux penuh di dalam Windows tanpa mesin virtual terpisah, dan menjadi lingkungan utama latihan di proyek ini. Lab yang aman berarti seluruh praktik hanya menyasar target milik sendiri atau lab yang memang dibuat untuk latihan, dan tidak pernah menyasar jaringan atau perangkat orang lain tanpa izin.

## Praktik

1. Pastikan WSL2 dan distribusi Ubuntu sudah terpasang dan bisa dibuka dari terminal Windows.

2. Jalankan perintah `whoami`, `pwd`, dan `uname -a` di terminal Ubuntu, lalu catat hasilnya.

3. Buat folder kerja khusus untuk latihan, misalnya `~/lab`, sebagai tempat semua praktik modul berikutnya.

## Hasil yang Diharapkan

*Terminal Ubuntu di WSL2 terbuka dan berjalan normal, dan folder `~/lab` sudah dibuat sebagai tempat latihan.*

# Modul 03: Terminal Linux: Navigasi dan Pengelolaan File

## Tools yang Digunakan

Bash (terminal Ubuntu)

## Materi Utama

Hampir semua tools keamanan dijalankan lewat terminal, jadi menguasai perintah dasar Linux adalah syarat sebelum masuk ke tools yang lebih rumit. Perintah seperti `ls`, `cd`, `cp`, `mv`, `rm`, `mkdir`, dan `cat` dipakai untuk menjelajah dan mengelola file. Pipe (`|`) dan redirect (`>`, `>>`) dipakai untuk menyambungkan output satu perintah ke perintah lain atau menyimpannya ke file.

## Praktik

1. Buat struktur folder `~/lab/modul03/{data,hasil}` menggunakan satu perintah `mkdir -p`.

2. Buat file teks berisi lima baris kalimat bebas, lalu gunakan `grep` untuk mencari baris yang mengandung kata tertentu.

3. Simpan hasil pencarian `grep` ke file baru menggunakan tanda `>`.

## Hasil yang Diharapkan

*File hasil pencarian `grep` berhasil dibuat dan isinya hanya memuat baris yang mengandung kata yang dicari.*

# Modul 04: Pengguna, Hak Akses File, dan Proses di Linux

## Tools yang Digunakan

Bash, `chmod`, `chown`, `ps`

## Materi Utama

Linux membedakan hak akses baca, tulis, dan eksekusi untuk pemilik file, grup, dan pengguna lain, yang ditampilkan sebagai kombinasi angka atau huruf (misalnya `rwxr-xr--`). Memahami hak akses ini penting karena banyak kerentanan keamanan sistem berasal dari file atau layanan yang diberi hak akses terlalu longgar. Proses yang sedang berjalan bisa dilihat dengan `ps`, dan ini berguna saat menganalisis aktivitas mencurigakan di sistem.

## Praktik

1. Buat sebuah file skrip kosong, lalu ubah hak aksesnya menjadi bisa dieksekusi dengan `chmod +x`.

2. Jalankan `ls -l` pada file tersebut dan jelaskan arti setiap karakter pada kolom hak akses.

3. Jalankan `ps aux` dan identifikasi tiga proses yang sedang berjalan di sistem.

## Hasil yang Diharapkan

*Kamu bisa membaca notasi hak akses file (misalnya `rwxr-xr--`) dan menjelaskan artinya untuk pemilik, grup, dan pengguna lain.*

# Modul 05: Dasar Jaringan: Alamat IP, Port, DNS, dan Model Lapisan

## Tools yang Digunakan

`ping`, `ip addr`, `nslookup`

## Materi Utama

Setiap perangkat di jaringan punya alamat IP, dan setiap layanan di perangkat itu berjalan di nomor port tertentu (misalnya port 80 untuk web). DNS menerjemahkan nama domain menjadi alamat IP. Model lapisan jaringan (seperti model TCP/IP) menjelaskan bagaimana data berpindah dari aplikasi ke kabel fisik, dan pemahaman ini jadi dasar untuk memahami cara kerja serangan jaringan di modul-modul berikutnya.

## Praktik

1. Jalankan `ip addr` untuk melihat alamat IP komputermu sendiri di jaringan lokal.

2. Jalankan `nslookup` pada sebuah nama domain dan catat alamat IP yang dikembalikan.

3. Jalankan `ping` ke alamat IP tersebut dan amati waktu responsnya.

## Hasil yang Diharapkan

*Kamu bisa menyebutkan alamat IP komputermu sendiri dan alamat IP hasil `nslookup` dari sebuah domain.*

# Modul 06: Cara Kerja HTTP dan HTTPS: Request, Response, Header, dan Cookie

## Tools yang Digunakan

`curl`, DevTools browser

## Materi Utama

HTTP adalah protokol yang dipakai browser untuk berkomunikasi dengan server web. Setiap permintaan (request) punya metode (GET, POST, dan lainnya), header, dan kadang isi (body), sedangkan server membalas dengan kode status (misalnya 200 untuk berhasil, 404 untuk tidak ditemukan) beserta header dan isi responsnya. HTTPS menambahkan enkripsi lewat TLS agar data tidak bisa dibaca pihak lain saat perjalanan. Cookie dipakai server untuk mengingat status sesi pengguna.

## Praktik

1. Jalankan `curl -I` ke sebuah alamat website dan catat kode status serta header yang dikembalikan.

2. Buka tab Network di DevTools browser, muat ulang halaman sebuah website, lalu temukan satu request dan lihat header-nya.

3. Identifikasi apakah website tersebut mengatur cookie, dan sebutkan nama salah satu cookie yang muncul.

## Hasil yang Diharapkan

*Kamu berhasil melihat header HTTP sebuah website lewat `curl` dan lewat DevTools, serta bisa menyebutkan kode status yang didapat.*

# Modul 07: Dasar Pemrograman Python untuk Keamanan

## Tools yang Digunakan

Python 3

## Materi Utama

Python sering dipakai untuk membuat skrip otomatisasi dalam pengujian keamanan, misalnya skrip yang mengirim banyak permintaan HTTP atau memproses daftar kata (wordlist). Modul ini hanya membahas dasar yang langsung relevan: variabel, perulangan (loop), fungsi sederhana, dan membaca file, bukan pemrograman Python secara umum.

## Praktik

1. Tulis skrip Python yang membaca file teks berisi daftar kata, lalu mencetak tiap kata yang panjangnya lebih dari lima karakter.

2. Tambahkan fungsi sederhana yang menghitung jumlah total kata dalam file tersebut.

3. Jalankan skrip dan verifikasi jumlah kata yang dicetak sesuai dengan isi file.

## Hasil yang Diharapkan

*Skrip Python berhasil membaca file dan mencetak kata-kata panjang beserta jumlah total kata secara benar.*

# Modul 08: Dasar Scripting Bash untuk Otomatisasi

## Tools yang Digunakan

Bash

## Materi Utama

Skrip Bash dipakai untuk menjalankan beberapa perintah terminal secara berurutan secara otomatis, misalnya menjalankan beberapa tools pengujian satu per satu lalu menyimpan hasilnya. Modul ini membahas dasar: variabel, perulangan `for`, dan kondisi `if`, yang cukup untuk membuat skrip otomatisasi sederhana.

## Praktik

1. Buat skrip Bash yang menerima daftar alamat IP dari sebuah file, lalu melakukan `ping` ke tiap alamat satu per satu menggunakan perulangan `for`.

2. Tambahkan kondisi sederhana yang mencetak 'aktif' atau 'tidak aktif' berdasarkan hasil `ping`.

3. Jalankan skrip terhadap daftar berisi minimal tiga alamat IP atau domain.

## Hasil yang Diharapkan

*Skrip Bash berjalan dan mencetak status aktif atau tidak aktif untuk setiap alamat dalam daftar.*

# Modul 09: Dasar Kriptografi: Hash, Enkripsi, dan Sertifikat

## Tools yang Digunakan

`sha256sum`, `openssl`

## Materi Utama

Hash adalah fungsi satu arah yang mengubah data menjadi deretan karakter tetap, dan biasa dipakai menyimpan password secara aman karena tidak bisa dibalik langsung ke bentuk aslinya. Enkripsi berbeda dari hash karena bisa dibalik (didekripsi) dengan kunci yang tepat. Sertifikat TLS dipakai website untuk membuktikan identitasnya dan memungkinkan koneksi HTTPS yang terenkripsi.

## Praktik

1. Jalankan `sha256sum` pada sebuah file teks, lalu ubah satu karakter di file itu dan jalankan lagi; bandingkan hasil hash-nya.

2. Gunakan `openssl` untuk melihat detail sertifikat TLS dari sebuah website (misalnya lewat `openssl s_client`).

3. Catat nama penerbit sertifikat dan tanggal kedaluwarsanya.

## Hasil yang Diharapkan

*Kamu melihat perbedaan hash sebelum dan sesudah file diubah, dan berhasil membaca detail sertifikat TLS sebuah website.*

# Modul 10: Alur Kerja Pengujian Keamanan dan Cara Mencatat Temuan

## Tools yang Digunakan

Dokumen catatan (teks atau spreadsheet)

## Materi Utama

Pengujian keamanan yang baik mengikuti alur: pengintaian (mengumpulkan informasi target), pemindaian (mencari celah), eksploitasi (membuktikan celah bisa dipakai), lalu pelaporan. Mencatat temuan sejak awal — target yang diuji, langkah yang dilakukan, dan buktinya — jauh lebih penting daripada sekadar berhasil menemukan celah, karena temuan yang tidak tercatat dengan jelas sulit dipercaya atau diperbaiki.

## Praktik

1. Buat template catatan temuan dengan kolom: tanggal, target, langkah yang dilakukan, hasil yang ditemukan, dan bukti (misalnya tangkapan layar).

2. Isi template itu dengan satu contoh fiktif, misalnya hasil dari modul 6.

3. Simpan template ini untuk dipakai di seluruh modul praktik berikutnya.

## Hasil yang Diharapkan

*Template catatan temuan sudah dibuat dan terisi satu contoh, siap dipakai untuk modul-modul selanjutnya.*

# Modul 11: Cara Kerja Aplikasi Web dan Peta Kerentanan OWASP Top 10

## Tools yang Digunakan

Browser, dokumentasi OWASP

## Materi Utama

Aplikasi web modern terdiri dari bagian depan (frontend, yang dilihat pengguna di browser) dan bagian belakang (backend, yang memproses data dan terhubung ke database). OWASP Top 10 adalah daftar sepuluh jenis kerentanan web paling umum, disusun oleh komunitas keamanan global, dan menjadi peta acuan untuk modul-modul web di blok ini.

## Praktik

1. Buka daftar resmi OWASP Top 10 versi terbaru dan catat sepuluh kategorinya.

2. Pilih tiga kategori yang menurutmu paling relevan dengan modul-modul berikutnya di blok ini, dan jelaskan alasannya singkat.

3. Simpan daftar ini sebagai acuan selama belajar web security.

## Hasil yang Diharapkan

*Kamu punya catatan sepuluh kategori OWASP Top 10 beserta tiga kategori yang kamu anggap paling relevan untuk dipelajari lebih dulu.*

# Modul 12: Browser DevTools dan Proxy Intersepsi untuk Menganalisis Lalu Lintas Web

## Tools yang Digunakan

DevTools browser, Burp Suite Community Edition

## Materi Utama

Proxy intersepsi seperti Burp Suite diletakkan di antara browser dan server, sehingga setiap permintaan dan respons bisa dilihat dan diubah sebelum dikirim. Ini adalah tools paling dasar dan paling sering dipakai dalam pengujian keamanan web, karena memungkinkan kamu melihat data yang sebenarnya dikirim, bukan hanya yang tampil di layar.

## Praktik

1. Pasang sertifikat Burp Suite di browser agar lalu lintas HTTPS bisa terbaca, lalu atur browser agar lewat proxy Burp Suite.

2. Buka sebuah aplikasi web latihan (lihat modul 13) lewat browser yang sudah diatur, dan amati permintaan yang muncul di tab Proxy Burp Suite.

3. Kirim ulang (replay) satu permintaan lewat fitur Repeater Burp Suite dan amati responsnya.

## Hasil yang Diharapkan

*Burp Suite berhasil menangkap lalu lintas dari browser, dan satu permintaan berhasil dikirim ulang lewat Repeater dengan respons yang bisa diamati.*

# Modul 13: Pengintaian Aplikasi Web: Subdomain, Direktori, dan Teknologi yang Dipakai

## Tools yang Digunakan

`whatweb`, `gobuster` atau `ffuf`

## Materi Utama

Sebelum menguji celah, penguji perlu memetakan apa saja yang ada di target: subdomain, direktori tersembunyi, dan teknologi yang dipakai (misalnya versi server web atau framework). Tahap ini disebut pengintaian (reconnaissance) dan menentukan target serangan yang lebih spesifik di modul-modul berikutnya. Catatan: target pengintaian pada modul ini hanya aplikasi web latihan milik lab, bukan website publik sembarangan.

## Praktik

1. Jalankan `whatweb` terhadap aplikasi web latihan (misalnya DVWA yang dijalankan lokal) dan catat teknologi yang terdeteksi.

2. Jalankan `gobuster` atau `ffuf` dengan wordlist kecil untuk mencari direktori yang tersembunyi di aplikasi tersebut.

3. Catat semua direktori yang ditemukan beserta kode status HTTP-nya.

## Hasil yang Diharapkan

*Kamu punya daftar teknologi dan direktori yang ditemukan pada aplikasi web latihan, lengkap dengan kode status masing-masing.*

# Modul 14: SQL Injection

## Tools yang Digunakan

Burp Suite, aplikasi web latihan rentan (misalnya DVWA)

## Materi Utama

SQL injection terjadi ketika input pengguna dimasukkan langsung ke perintah database tanpa disaring, sehingga penyerang bisa menyisipkan perintah SQL sendiri. Ini bisa dipakai untuk melihat data yang seharusnya tidak boleh diakses, bahkan mengubah atau menghapus data. Pencegahannya adalah memakai parameterized query, bukan menggabungkan input langsung ke perintah SQL.

## Praktik

1. Pada form login aplikasi web latihan, coba masukkan payload SQL injection dasar (misalnya `' OR '1'='1`) di kolom username.

2. Amati apakah login berhasil tanpa password yang benar, dan catat payload yang berhasil.

3. Jelaskan dalam satu atau dua kalimat mengapa payload tersebut bisa membuat login berhasil.

## Hasil yang Diharapkan

*Kamu berhasil atau gagal login dengan payload SQL injection pada aplikasi latihan, dan bisa menjelaskan alasan teknisnya.*

# Modul 15: Cross-Site Scripting (XSS)

## Tools yang Digunakan

Browser, aplikasi web latihan rentan

## Materi Utama

XSS terjadi ketika input pengguna ditampilkan kembali di halaman web tanpa disaring, sehingga penyerang bisa menyisipkan kode JavaScript yang dijalankan di browser korban. Ada tiga jenis utama: reflected (langsung dari request), stored (tersimpan di server dan muncul ke pengguna lain), dan DOM-based (terjadi di sisi browser). XSS bisa dipakai untuk mencuri cookie sesi atau menipu pengguna.

## Praktik

1. Pada kolom input aplikasi web latihan yang menampilkan kembali isi input (misalnya kolom komentar atau pencarian), masukkan payload sederhana seperti `<script>alert(1)</script>`.

2. Amati apakah muncul jendela pop-up, dan catat apakah XSS tersebut bersifat reflected atau stored.

3. Jelaskan satu cara mencegah XSS tersebut di sisi server.

## Hasil yang Diharapkan

*Jendela pop-up berhasil muncul dari payload XSS, dan kamu bisa menyebutkan jenisnya beserta satu cara pencegahannya.*

# Modul 16: CSRF dan Kebijakan Same-Origin

## Tools yang Digunakan

Browser, aplikasi web latihan

## Materi Utama

CSRF (Cross-Site Request Forgery) menipu browser korban yang sedang login agar mengirim permintaan ke aplikasi target tanpa sepengetahuan korban, misalnya lewat halaman jahat yang memuat form tersembunyi. Same-Origin Policy adalah aturan browser yang membatasi interaksi antar situs berbeda, dan token CSRF adalah salah satu cara aplikasi mencegah serangan ini.

## Praktik

1. Periksa apakah form penting di aplikasi web latihan (misalnya ganti password) menyertakan token CSRF tersembunyi di dalamnya.

2. Buat halaman HTML sederhana berisi form tersembunyi yang menunjuk ke endpoint aplikasi tersebut, lalu amati apakah permintaan berhasil tanpa token yang benar.

3. Catat apakah aplikasi menolak atau menerima permintaan tanpa token CSRF.

## Hasil yang Diharapkan

*Kamu tahu apakah aplikasi latihan memakai token CSRF atau tidak, dan sudah mengujinya dengan form buatan sendiri.*

# Modul 17: Autentikasi Lemah dan Manajemen Sesi

## Tools yang Digunakan

Burp Suite

## Materi Utama

Autentikasi yang lemah mencakup password yang mudah ditebak, tidak ada pembatasan percobaan login, atau sesi yang tidak kedaluwarsa. Token sesi (biasanya disimpan di cookie) harus acak dan sulit ditebak; jika polanya bisa diprediksi, penyerang bisa membajak sesi pengguna lain tanpa mengetahui passwordnya.

## Praktik

1. Di aplikasi web latihan, login beberapa kali dan bandingkan nilai token sesi (cookie) yang diberikan setiap kali login.

2. Amati apakah ada pola yang terlihat pada token sesi tersebut (misalnya angka berurutan).

3. Periksa apakah aplikasi membatasi jumlah percobaan login yang gagal.

## Hasil yang Diharapkan

*Kamu punya catatan apakah token sesi aplikasi latihan terlihat acak atau berpola, dan apakah ada pembatasan percobaan login.*

# Modul 18: Kontrol Akses Rusak: IDOR dan Eskalasi Hak di Aplikasi Web

## Tools yang Digunakan

Burp Suite

## Materi Utama

IDOR (Insecure Direct Object Reference) terjadi ketika aplikasi mengandalkan ID yang terlihat di URL atau parameter untuk mengakses data, tanpa memeriksa apakah pengguna yang sedang login benar-benar berhak atas data tersebut. Ini memungkinkan pengguna biasa mengakses atau mengubah data milik pengguna lain hanya dengan mengubah angka ID.

## Praktik

1. Login ke aplikasi web latihan sebagai satu pengguna, lalu temukan URL atau parameter yang memuat ID data milik pengguna itu (misalnya ID pesanan atau profil).

2. Ubah nilai ID tersebut ke angka lain lewat Burp Suite Repeater, lalu amati apakah data milik pengguna lain ikut terlihat.

3. Catat apakah aplikasi memeriksa kepemilikan data sebelum menampilkannya.

## Hasil yang Diharapkan

*Kamu tahu apakah aplikasi latihan rentan IDOR atau tidak, dibuktikan dengan percobaan mengubah ID data.*

# Modul 19: Unggah File, Path Traversal, dan Inklusi File

## Tools yang Digunakan

Burp Suite, aplikasi web latihan

## Materi Utama

Fitur unggah file yang tidak membatasi jenis file bisa dipakai menyusupkan skrip berbahaya ke server. Path traversal terjadi ketika aplikasi mengambil nama file dari input pengguna tanpa membatasi lokasinya, sehingga penyerang bisa memakai pola seperti `../../` untuk mengakses file di luar folder yang seharusnya. Inklusi file terkait, yaitu ketika aplikasi memuat isi file berdasarkan input yang tidak disaring.

## Praktik

1. Pada fitur unggah file aplikasi latihan, coba unggah file dengan ekstensi yang seharusnya tidak diizinkan dan amati apakah ditolak.

2. Jika aplikasi latihan punya parameter yang memuat nama file (misalnya `?page=`), coba ubah nilainya dengan pola `../../` dan amati hasilnya.

3. Catat apakah server berhasil mencegah kedua percobaan tersebut.

## Hasil yang Diharapkan

*Kamu punya catatan hasil percobaan unggah file dan path traversal, beserta apakah aplikasi berhasil mencegahnya.*

# Modul 20: SSRF dan Injeksi Perintah

## Tools yang Digunakan

Burp Suite, aplikasi web latihan

## Materi Utama

SSRF (Server-Side Request Forgery) terjadi ketika aplikasi mengambil data dari URL yang diberikan pengguna, sehingga penyerang bisa memaksa server mengakses alamat internal yang seharusnya tidak bisa diakses dari luar. Injeksi perintah (command injection) terjadi ketika input pengguna dijalankan langsung sebagai perintah sistem operasi di server, biasanya lewat fitur yang memanggil tools command-line di belakang layar.

## Praktik

1. Jika aplikasi latihan punya fitur yang mengambil data dari URL (misalnya pratinjau gambar dari tautan), coba arahkan ke alamat internal seperti `127.0.0.1` dan amati responsnya.

2. Jika aplikasi latihan punya fitur yang memanggil perintah sistem (misalnya `ping` dari form), coba sisipkan karakter seperti `;` atau `&&` diikuti perintah lain.

3. Catat apakah salah satu dari kedua percobaan berhasil menunjukkan tanda-tanda kerentanan.

## Hasil yang Diharapkan

*Kamu punya catatan hasil percobaan SSRF dan injeksi perintah pada aplikasi latihan, beserta tanda-tanda keberhasilan atau penolakannya.*

# Modul 21: Dasar Keamanan API

## Tools yang Digunakan

Burp Suite, Postman atau `curl`

## Materi Utama

API web modern sering memakai format JSON dan autentikasi lewat token (misalnya JWT). Kerentanan API yang umum meliputi endpoint yang tidak memeriksa otorisasi dengan benar, data berlebihan yang dikembalikan (excessive data exposure), dan dokumentasi API yang bocor ke publik dan membuka jalan untuk mengetahui endpoint tersembunyi.

## Praktik

1. Temukan satu endpoint API pada aplikasi latihan (biasanya terlihat lewat tab Network saat memakai aplikasi), dan amati formatnya lewat `curl` atau Postman.

2. Coba akses endpoint tersebut tanpa menyertakan token autentikasi, dan amati apakah tetap berhasil.

3. Periksa apakah respons API mengembalikan data lebih banyak dari yang ditampilkan di halaman web.

## Hasil yang Diharapkan

*Kamu punya catatan apakah endpoint API aplikasi latihan memeriksa autentikasi dengan benar dan apakah ada data berlebihan yang terekspos.*

# Modul 22: Kesalahan Logika Bisnis dan Konfigurasi Keliru

## Tools yang Digunakan

Burp Suite

## Materi Utama

Tidak semua kerentanan berasal dari kesalahan teknis seperti injeksi kode; sebagian berasal dari logika bisnis yang tidak mempertimbangkan penyalahgunaan, misalnya alur checkout yang bisa dilewati atau diskon yang bisa dipakai berulang kali. Konfigurasi keliru mencakup hal seperti halaman admin yang bisa diakses tanpa login, atau pesan error yang menampilkan detail teknis berlebihan.

## Praktik

1. Coba telusuri alur pada aplikasi latihan (misalnya alur checkout atau alur ubah data) dan cari apakah ada langkah yang bisa dilewati dengan mengakses URL langsung.

2. Cari halaman yang seharusnya hanya untuk admin, dan coba akses langsung tanpa login sebagai admin.

3. Catat pesan error yang muncul saat memasukkan input tidak terduga, dan amati apakah pesan itu membocorkan detail teknis.

## Hasil yang Diharapkan

*Kamu punya catatan minimal satu temuan terkait alur yang bisa dilewati atau konfigurasi yang terlalu terbuka pada aplikasi latihan.*

# Modul 23: Bug Bounty: Membaca Scope dan Menulis Laporan Kerentanan

## Tools yang Digunakan

Template laporan (dari modul 10)

## Materi Utama

Program bug bounty punya dokumen scope yang menjelaskan target dan jenis kerentanan yang diterima. Laporan kerentanan yang baik berisi: judul singkat, langkah reproduksi yang jelas, dampak dari kerentanan tersebut, dan saran perbaikan. Laporan yang tidak jelas langkah reproduksinya biasanya ditolak, walaupun kerentanannya benar-benar ada.

## Praktik

1. Pilih satu temuan dari modul 14 sampai 22 (SQL injection, XSS, IDOR, atau lainnya).

2. Tulis laporan kerentanan lengkap untuk temuan itu memakai template dari modul 10: judul, langkah reproduksi, dampak, dan saran perbaikan.

3. Baca ulang laporanmu dan pastikan orang lain yang belum tahu masalahnya bisa mengikuti langkah reproduksinya.

## Hasil yang Diharapkan

*Satu laporan kerentanan lengkap berhasil ditulis, mencakup judul, langkah reproduksi, dampak, dan saran perbaikan.*

# Modul 24: Pemindaian Jaringan dengan Nmap

## Tools yang Digunakan

Nmap

## Materi Utama

Nmap adalah tools pemindai jaringan yang dipakai untuk menemukan perangkat aktif, port yang terbuka, dan layanan yang berjalan pada target. Pemindaian ini adalah langkah pengintaian paling dasar sebelum menguji keamanan jaringan atau server, dan hanya boleh dijalankan terhadap jaringan atau mesin lab sendiri.

## Praktik

1. Jalankan `nmap` pemindaian dasar terhadap mesin lab lokal (misalnya mesin virtual latihan) untuk menemukan port yang terbuka.

2. Jalankan `nmap -sV` untuk mendeteksi versi layanan yang berjalan pada port yang terbuka tersebut.

3. Catat daftar port, layanan, dan versinya dalam template catatan temuan.

## Hasil yang Diharapkan

*Daftar port terbuka beserta layanan dan versinya pada mesin lab berhasil dicatat lewat hasil pemindaian Nmap.*

# Modul 25: Analisis Lalu Lintas dengan Wireshark

## Tools yang Digunakan

Wireshark

## Materi Utama

Wireshark menangkap dan menampilkan paket data yang melintas di jaringan, sehingga penguji bisa melihat detail komunikasi antar perangkat, termasuk protokol yang dipakai dan isi data jika tidak terenkripsi. Tools ini sangat membantu untuk memahami cara kerja protokol jaringan secara nyata, bukan hanya secara teori.

## Praktik

1. Jalankan Wireshark dan mulai menangkap lalu lintas pada antarmuka jaringan lokal.

2. Buka sebuah halaman web (gunakan HTTP, bukan HTTPS, di lab lokal) dan amati paket yang tertangkap.

3. Temukan satu paket HTTP dan identifikasi isi request serta response-nya di Wireshark.

## Hasil yang Diharapkan

*Satu paket HTTP berhasil ditemukan di Wireshark, dan isi request serta response-nya bisa dijelaskan.*

# Modul 26: Enumerasi Layanan Umum: SSH, FTP, SMB, dan HTTP

## Tools yang Digunakan

Nmap, `nc` (netcat)

## Materi Utama

Enumerasi adalah proses mengumpulkan informasi lebih detail dari layanan yang sudah ditemukan lewat pemindaian, misalnya versi perangkat lunak, banner layanan, atau daftar folder yang dibagikan (pada SMB). Informasi ini membantu menentukan apakah sebuah layanan punya kerentanan yang sudah diketahui publik.

## Praktik

1. Gunakan `nc` untuk terhubung ke port layanan yang terbuka di mesin lab (misalnya port 21 atau 22) dan amati banner yang ditampilkan.

2. Jalankan skrip enumerasi bawaan Nmap (`--script`) yang sesuai dengan layanan tersebut, misalnya untuk SMB atau FTP.

3. Catat informasi tambahan yang berhasil didapat dari proses enumerasi ini.

## Hasil yang Diharapkan

*Informasi tambahan tentang layanan di mesin lab (versi, banner, atau folder yang dibagikan) berhasil dikumpulkan dan dicatat.*

# Modul 27: Konfigurasi Layanan yang Lemah dan Password Lemah

## Tools yang Digunakan

Nmap, Hydra (di lab terkendali)

## Materi Utama

Banyak layanan jaringan masih memakai konfigurasi bawaan yang tidak aman, misalnya login anonim yang diizinkan pada FTP, atau password default yang tidak pernah diganti. Pengujian password lemah lewat percobaan berulang (brute force) hanya boleh dilakukan di lab sendiri, karena di sistem nyata hal ini bisa mengganggu layanan atau melanggar aturan.

## Praktik

1. Periksa apakah layanan FTP di mesin lab mengizinkan login anonim.

2. Di lab terkendali, jalankan Hydra dengan wordlist password kecil terhadap layanan login sederhana yang memang disediakan untuk latihan.

3. Catat apakah ditemukan kombinasi login yang berhasil, dan jelaskan risikonya jika ini terjadi di sistem nyata.

## Hasil yang Diharapkan

*Kamu punya catatan hasil pengujian login lemah di lab, beserta penjelasan risikonya bila terjadi pada sistem nyata.*

# Modul 28: Serangan Jaringan Lokal Dasar di Lab: Sniffing dan ARP Spoofing

## Tools yang Digunakan

Wireshark, `arpspoof` (di lab terkendali)

## Materi Utama

Sniffing adalah menangkap data yang melintas di jaringan, dan ARP spoofing adalah teknik menipu perangkat di jaringan lokal agar mengirim data lewat penyerang terlebih dahulu. Teknik ini hanya boleh dipraktikkan di jaringan lab milik sendiri, karena melakukannya di jaringan orang lain adalah pelanggaran serius.

## Praktik

1. Di jaringan lab milik sendiri, jalankan Wireshark untuk menangkap lalu lintas antar dua mesin virtual latihan.

2. Jalankan `arpspoof` di lab terkendali untuk mengarahkan lalu lintas satu mesin lewat mesin penguji.

3. Amati di Wireshark apakah lalu lintas dari mesin target berhasil tertangkap setelah ARP spoofing dijalankan.

## Hasil yang Diharapkan

*Lalu lintas dari mesin target berhasil tertangkap di Wireshark setelah ARP spoofing dijalankan di jaringan lab sendiri.*

# Modul 29: Keamanan Wi-Fi: Konsep dan Pengujian di Jaringan Sendiri

## Tools yang Digunakan

Aircrack-ng (memerlukan adapter Wi-Fi yang mendukung mode monitor)

## Materi Utama

Keamanan Wi-Fi bergantung pada protokol enkripsinya (WEP sudah usang dan mudah dibobol, WPA2 dan WPA3 jauh lebih kuat). Pengujian keamanan Wi-Fi membutuhkan adapter jaringan yang mendukung mode monitor, yang umumnya tidak tersedia lewat WSL2 karena WSL2 tidak punya akses langsung ke perangkat Wi-Fi fisik, sehingga praktik penuh modul ini lebih cocok dilakukan di Kali Linux yang terpasang langsung atau live USB.

## Praktik

1. Pelajari perbedaan protokol WEP, WPA2, dan WPA3 dari dokumentasi resmi, dan catat kelemahan utama WEP.

2. Periksa jaringan Wi-Fi rumahmu sendiri dan catat protokol keamanan yang sedang dipakai.

3. Jika tersedia adapter yang mendukung mode monitor, jalankan Aircrack-ng untuk menangkap paket handshake dari jaringan Wi-Fi milik sendiri; jika tidak, cukup pelajari alur kerjanya dari dokumentasi.

## Hasil yang Diharapkan

*Kamu tahu protokol keamanan Wi-Fi yang dipakai jaringan rumahmu, dan memahami alur kerja pengujian Wi-Fi meski belum tentu mempraktikkannya penuh.*

# Modul 30: Pemindaian Kerentanan dan Cara Membaca Hasilnya

## Tools yang Digunakan

OpenVAS atau Nikto

## Materi Utama

Pemindai kerentanan otomatis membandingkan layanan yang ditemukan dengan basis data kerentanan yang sudah diketahui, lalu memberi daftar temuan beserta tingkat keparahannya. Hasilnya tidak selalu akurat — ada false positive (dilaporkan rentan padahal tidak) — sehingga tetap perlu diperiksa manual sebelum dipercaya sepenuhnya.

## Praktik

1. Jalankan Nikto terhadap aplikasi web latihan di lab untuk memindai kerentanan server web yang umum.

2. Baca hasilnya dan pilih tiga temuan dengan tingkat keparahan tertinggi.

3. Untuk satu dari tiga temuan itu, coba verifikasi manual apakah benar-benar rentan atau termasuk false positive.

## Hasil yang Diharapkan

*Tiga temuan kerentanan tingkat tinggi dari Nikto berhasil dicatat, dan satu di antaranya sudah diverifikasi manual.*

# Modul 31: Memanfaatkan Layanan Rentan di Mesin Lab

## Tools yang Digunakan

Metasploit Framework (di lab terkendali seperti Metasploitable)

## Materi Utama

Metasploit adalah kerangka kerja yang mengumpulkan banyak modul eksploitasi siap pakai untuk layanan yang memiliki kerentanan yang sudah diketahui. Latihan ini hanya boleh dilakukan terhadap mesin lab yang memang dirancang rentan (misalnya Metasploitable), karena menjalankan eksploitasi nyata di sistem lain tanpa izin adalah tindakan ilegal.

## Praktik

1. Jalankan mesin lab rentan (misalnya Metasploitable) di jaringan lab milik sendiri.

2. Gunakan Metasploit untuk mencari modul eksploitasi yang sesuai dengan salah satu layanan rentan yang ditemukan di modul 24 dan 30.

3. Jalankan modul eksploitasi tersebut dan catat apakah berhasil mendapatkan akses ke mesin lab.

## Hasil yang Diharapkan

*Akses ke mesin lab rentan berhasil atau gagal didapat lewat Metasploit, dan prosesnya tercatat lengkap.*

# Modul 32: Akses Awal dan Shell pada Mesin Lab

## Tools yang Digunakan

Netcat, Metasploit

## Materi Utama

Setelah eksploitasi berhasil, penyerang biasanya mendapat akses awal berupa shell, yaitu akses baris perintah ke mesin target. Reverse shell adalah teknik umum di mana mesin target yang menghubungi balik ke mesin penguji, sering dipakai karena lebih mudah menembus firewall dibanding koneksi langsung ke target.

## Praktik

1. Di mesin lab penguji, jalankan `nc` dalam mode mendengarkan (listener) pada port tertentu.

2. Dari mesin lab target, kirim koneksi reverse shell sederhana ke listener tersebut (bisa lewat payload Metasploit atau skrip netcat).

3. Verifikasi bahwa perintah yang dijalankan di shell tersebut benar-benar dieksekusi di mesin target, misalnya dengan `whoami`.

## Hasil yang Diharapkan

*Reverse shell berhasil terhubung dari mesin lab target ke mesin penguji, dibuktikan dengan hasil perintah `whoami`.*

# Modul 33: Eskalasi Hak Akses di Linux

## Tools yang Digunakan

LinPEAS atau skrip enumerasi manual

## Materi Utama

Setelah mendapat akses awal dengan hak terbatas, penguji sering mencari cara menaikkan hak akses menjadi root, misalnya lewat konfigurasi `sudo` yang longgar, file dengan bit SUID yang salah konfigurasi, atau cron job yang bisa dimanipulasi. Proses ini disebut eskalasi hak akses (privilege escalation).

## Praktik

1. Pada mesin lab target yang sudah diakses di modul 32, jalankan skrip enumerasi (misalnya LinPEAS) untuk mencari jalur eskalasi hak akses.

2. Identifikasi satu jalur yang paling mungkin dipakai, misalnya file SUID yang tidak biasa atau entri `sudo` tanpa password.

3. Coba jalur tersebut dan catat apakah berhasil mendapatkan akses root.

## Hasil yang Diharapkan

*Hasil percobaan eskalasi hak akses di mesin lab tercatat, termasuk jalur yang dicoba dan apakah berhasil mendapat akses root.*

# Modul 34: Eskalasi Hak Akses di Windows

## Tools yang Digunakan

WinPEAS atau pemeriksaan manual

## Materi Utama

Eskalasi hak akses di Windows punya pola yang berbeda dari Linux, misalnya lewat layanan yang berjalan dengan hak admin tapi bisa dikonfigurasi ulang oleh pengguna biasa, token yang disalahgunakan, atau password yang tersimpan dalam file konfigurasi. Modul ini membahas konsepnya menggunakan mesin lab Windows yang memang dirancang rentan.

## Praktik

1. Pada mesin lab Windows yang dirancang rentan, jalankan skrip enumerasi (misalnya WinPEAS) untuk mencari jalur eskalasi hak akses.

2. Identifikasi satu kesalahan konfigurasi, misalnya layanan yang bisa ditulis ulang oleh pengguna biasa.

3. Jelaskan dalam satu atau dua kalimat bagaimana kesalahan konfigurasi tersebut bisa dimanfaatkan.

## Hasil yang Diharapkan

*Satu jalur eskalasi hak akses di mesin lab Windows berhasil diidentifikasi dan dijelaskan cara kerjanya.*

# Modul 35: Analisis Log dan Deteksi Serangan

## Tools yang Digunakan

`grep`, `awk`, contoh file log

## Materi Utama

Log server menyimpan jejak setiap permintaan atau aktivitas yang masuk, dan menjadi sumber utama untuk mendeteksi serangan setelah atau saat terjadi, misalnya banyak percobaan login gagal dalam waktu singkat atau pola permintaan SQL injection di log akses web. Menganalisis log adalah keterampilan yang menyeimbangkan sisi menyerang (offensive) dengan sisi bertahan (defensive).

## Praktik

1. Ambil contoh file log akses web (bisa dari aplikasi latihan sendiri atau contoh log publik), lalu gunakan `grep` untuk mencari baris yang mengandung pola percobaan SQL injection.

2. Gunakan `awk` untuk menghitung alamat IP mana yang paling sering muncul dalam log tersebut.

3. Tentukan apakah pola yang ditemukan terlihat seperti aktivitas serangan, dan jelaskan alasannya.

## Hasil yang Diharapkan

*Pola permintaan mencurigakan berhasil ditemukan di file log, lengkap dengan alamat IP yang paling sering muncul.*

# Modul 36: Hardening Server dan Firewall sebagai Pencegahan

## Tools yang Digunakan

`ufw` (firewall Linux sederhana)

## Materi Utama

Hardening adalah proses mengurangi permukaan serangan sebuah sistem, misalnya menonaktifkan layanan yang tidak dipakai, memperbarui perangkat lunak secara rutin, dan membatasi akses jaringan dengan firewall. Modul ini menutup blok jaringan dan server dengan melihat dari sisi bertahan, setelah modul-modul sebelumnya banyak membahas sisi menyerang.

## Praktik

1. Pada mesin lab, jalankan `ufw` untuk mengaktifkan firewall dan hanya mengizinkan port yang benar-benar dibutuhkan (misalnya SSH).

2. Nonaktifkan satu layanan yang tidak terpakai pada mesin lab tersebut.

3. Jalankan ulang Nmap dari modul 24 terhadap mesin ini dan bandingkan jumlah port terbuka sebelum dan sesudah hardening.

## Hasil yang Diharapkan

*Jumlah port terbuka pada mesin lab berkurang setelah hardening, dibuktikan dengan perbandingan hasil Nmap sebelum dan sesudahnya.*

# Modul 37: Arsitektur Android dan Model Keamanannya

## Tools yang Digunakan

Dokumentasi resmi Android

## Materi Utama

Android membatasi akses tiap aplikasi lewat sistem izin (permission) dan sandboxing, yaitu setiap aplikasi berjalan terisolasi dari aplikasi lain kecuali diberi izin eksplisit. Memahami model ini penting sebelum menganalisis kerentanan aplikasi Android, karena banyak kerentanan muncul justru ketika batasan ini dilonggarkan secara sengaja atau tidak sengaja oleh pengembang aplikasi.

## Praktik

1. Baca dokumentasi resmi Android tentang sistem izin aplikasi dan konsep sandboxing.

2. Pasang satu aplikasi contoh di perangkat atau emulator, lalu periksa daftar izin yang diminta lewat pengaturan aplikasi.

3. Catat apakah ada izin yang terlihat tidak sesuai dengan fungsi utama aplikasi tersebut.

## Hasil yang Diharapkan

*Daftar izin sebuah aplikasi Android berhasil diperiksa, dan kamu bisa menilai apakah izin tersebut wajar untuk fungsi aplikasinya.*

# Modul 38: Menyiapkan Lab Android: Emulator, ADB, dan Batasan WSL2

## Tools yang Digunakan

Android Studio (emulator), ADB

## Materi Utama

Analisis aplikasi Android membutuhkan emulator atau perangkat fisik serta ADB (Android Debug Bridge) untuk berkomunikasi dengannya lewat terminal. WSL2 tidak bisa menjalankan emulator Android dengan akselerasi grafis secara langsung, sehingga modul-modul mobile di blok ini lebih praktis dijalankan dari sisi Windows (Android Studio di Windows), sementara ADB tetap bisa dipanggil dari terminal WSL2 dengan konfigurasi tambahan.

## Praktik

1. Pasang Android Studio di Windows dan buat satu emulator Android.

2. Jalankan emulator tersebut dan hubungkan lewat `adb devices` untuk memastikan terdeteksi.

3. Jalankan satu perintah ADB sederhana, misalnya `adb shell` lalu `whoami`, untuk memastikan koneksi berfungsi.

## Hasil yang Diharapkan

*Emulator Android berhasil dijalankan dan terdeteksi lewat `adb devices`, dengan satu perintah ADB berhasil dijalankan di dalamnya.*

# Modul 39: Struktur APK dan Analisis Statis

## Tools yang Digunakan

`apktool`, `unzip`

## Materi Utama

File APK sebenarnya adalah arsip ZIP yang berisi kode aplikasi, manifest (deskripsi izin dan komponen aplikasi), dan resource. Analisis statis berarti memeriksa isi APK tanpa menjalankan aplikasinya, misalnya membaca manifest untuk melihat izin yang diminta atau komponen yang diekspos.

## Praktik

1. Ambil satu file APK contoh (misalnya aplikasi latihan keamanan Android yang legal), lalu ekstrak isinya dengan `apktool`.

2. Buka file `AndroidManifest.xml` hasil ekstraksi dan catat izin-izin yang diminta aplikasi tersebut.

3. Identifikasi apakah ada komponen (Activity atau Service) yang ditandai `exported="true"`.

## Hasil yang Diharapkan

*Isi `AndroidManifest.xml` dari sebuah APK berhasil dibaca, lengkap dengan daftar izin dan komponen yang diekspor.*

# Modul 40: Dekompilasi dan Membaca Kode Aplikasi Android

## Tools yang Digunakan

`jadx`

## Materi Utama

Dekompilasi mengubah kode mesin (bytecode) aplikasi Android kembali menjadi kode yang mendekati bentuk aslinya, sehingga bisa dibaca manusia meski tidak selalu sama persis dengan kode sumber asli. Ini dipakai untuk memahami logika aplikasi, misalnya bagaimana ia menyimpan data atau memverifikasi login, sebagai dasar menemukan kerentanan di modul berikutnya.

## Praktik

1. Gunakan `jadx` untuk mendekompilasi APK yang sama dari modul 39 menjadi kode Java yang bisa dibaca.

2. Cari kelas atau fungsi yang berhubungan dengan login atau penyimpanan data pengguna.

3. Catat satu temuan menarik dari kode tersebut, misalnya string yang tertulis langsung di kode (hardcoded).

## Hasil yang Diharapkan

*Kode hasil dekompilasi APK berhasil dibaca lewat `jadx`, dan satu temuan menarik terkait login atau penyimpanan data berhasil dicatat.*

# Modul 41: Penyimpanan Data yang Tidak Aman di Android

## Tools yang Digunakan

ADB

## Materi Utama

Aplikasi Android bisa menyimpan data di beberapa tempat: SharedPreferences, database SQLite lokal, atau penyimpanan eksternal. Jika data sensitif seperti password atau token disimpan tanpa enkripsi di tempat-tempat ini, siapa pun yang punya akses ke perangkat (termasuk aplikasi lain yang mendapat hak akses root) bisa membacanya langsung.

## Praktik

1. Pada aplikasi latihan di emulator, login dan lakukan beberapa aktivitas yang melibatkan data pengguna.

2. Gunakan `adb shell` untuk menjelajah folder data aplikasi tersebut (`/data/data/<nama-paket>/`) dan cari file SharedPreferences atau database SQLite.

3. Buka salah satu file tersebut dan periksa apakah data sensitif tersimpan dalam bentuk teks biasa (tidak terenkripsi).

## Hasil yang Diharapkan

*Kamu menemukan apakah aplikasi latihan menyimpan data sensitif dalam bentuk teks biasa atau terenkripsi di penyimpanan lokalnya.*

# Modul 42: Analisis Komunikasi Aplikasi dan Certificate Pinning

## Tools yang Digunakan

Burp Suite, emulator Android

## Materi Utama

Sama seperti aplikasi web, lalu lintas aplikasi mobile bisa dianalisis lewat proxy intersepsi seperti Burp Suite. Sebagian aplikasi menerapkan certificate pinning, yaitu hanya mempercayai sertifikat tertentu sehingga proxy intersepsi tidak bisa membaca lalu lintasnya secara langsung; ini adalah mekanisme pertahanan yang perlu dipahami, bukan sekadar dilewati sembarangan.

## Praktik

1. Atur emulator Android agar lalu lintasnya melewati proxy Burp Suite, mirip seperti pada modul 12.

2. Pasang sertifikat Burp Suite di emulator dan amati apakah lalu lintas aplikasi latihan berhasil terbaca.

3. Jika aplikasi memakai certificate pinning dan lalu lintas tidak terbaca, catat hal tersebut sebagai temuan dan jelaskan mengapa itu meningkatkan keamanan aplikasi.

## Hasil yang Diharapkan

*Kamu mengetahui apakah aplikasi latihan menerapkan certificate pinning, berdasarkan berhasil atau tidaknya Burp Suite membaca lalu lintasnya.*

# Modul 43: Instrumentasi Dinamis dengan Frida

## Tools yang Digunakan

Frida

## Materi Utama

Frida memungkinkan penguji menyisipkan kode ke dalam aplikasi yang sedang berjalan untuk mengubah perilakunya secara langsung, misalnya melewati pemeriksaan tertentu di memori tanpa mengubah file APK. Teknik ini disebut instrumentasi dinamis, berbeda dari analisis statis di modul 39 dan 40 karena dilakukan saat aplikasi aktif berjalan. Catatan: Frida membutuhkan emulator atau perangkat yang sudah di-root, dan penyiapannya bisa lebih rumit lewat WSL2.

## Praktik

1. Pasang Frida di komputer dan `frida-server` di emulator Android yang sudah di-root.

2. Jalankan aplikasi latihan dan hubungkan Frida ke proses aplikasi tersebut lewat `frida -U`.

3. Jalankan satu skrip Frida sederhana yang mencetak nama fungsi yang dipanggil saat aplikasi melakukan login.

## Hasil yang Diharapkan

*Frida berhasil terhubung ke aplikasi latihan yang berjalan, dan satu fungsi terkait login berhasil terdeteksi lewat skrip Frida.*

# Modul 44: Komponen Android yang Terekspos: Activity, Intent, dan Content Provider

## Tools yang Digunakan

ADB, `apktool`

## Materi Utama

Android punya empat komponen utama aplikasi: Activity (layar), Service (proses latar belakang), Broadcast Receiver, dan Content Provider (akses data antar aplikasi). Jika komponen ini ditandai `exported="true"` tanpa pembatasan yang tepat, aplikasi lain di perangkat yang sama bisa memanggilnya langsung, termasuk melewati alur normal aplikasi (misalnya layar login).

## Praktik

1. Dari manifest APK di modul 39, pilih satu Activity yang ditandai `exported="true"`.

2. Gunakan `adb shell am start` untuk memanggil Activity tersebut secara langsung dari luar aplikasi.

3. Amati apakah Activity tersebut terbuka tanpa melewati alur normal aplikasi, misalnya layar login.

## Hasil yang Diharapkan

*Satu Activity yang diekspor berhasil dipanggil langsung lewat ADB, dan kamu mencatat apakah ini melewati alur normal aplikasi.*

# Modul 45: Autentikasi dan Pengelolaan Kredensial di Aplikasi Mobile

## Tools yang Digunakan

Burp Suite, `jadx`

## Materi Utama

Aplikasi mobile yang baik tidak menyimpan password secara langsung di perangkat, melainkan memakai token yang bisa dicabut (seperti OAuth atau JWT) dan menyimpannya di tempat yang lebih terlindungi (seperti Android Keystore). Modul ini menggabungkan analisis statis (modul 40) dan analisis lalu lintas (modul 42) untuk menilai bagaimana aplikasi latihan menangani proses login.

## Praktik

1. Amati lalu lintas login aplikasi latihan lewat Burp Suite dan catat jenis token yang dikirim setelah login berhasil.

2. Periksa di kode hasil dekompilasi (modul 40) bagaimana token tersebut disimpan di perangkat.

3. Simpulkan apakah cara penyimpanan token tersebut tergolong aman atau berisiko, dan jelaskan alasannya.

## Hasil yang Diharapkan

*Kamu punya kesimpulan tentang bagaimana aplikasi latihan menyimpan token login, beserta penilaian aman atau berisikonya.*

# Modul 46: Keamanan Sistem Windows: Akun, Registri, dan Layanan

## Tools yang Digunakan

Event Viewer, `services.msc`

## Materi Utama

Sistem Windows menyimpan konfigurasi penting di registri dan menjalankan banyak layanan latar belakang. Memahami pengaturan akun pengguna, kebijakan password, dan daftar layanan yang berjalan membantu mengenali potensi celah, seperti layanan yang berjalan dengan hak admin padahal tidak perlu.

## Praktik

1. Buka `services.msc` di Windows dan catat tiga layanan yang berjalan dengan hak akses tinggi (System atau Administrator).

2. Buka Event Viewer dan cari log terkait percobaan login, baik yang berhasil maupun gagal.

3. Catat apakah ada pola percobaan login gagal yang berulang dalam waktu singkat.

## Hasil yang Diharapkan

*Tiga layanan berhak akses tinggi dan catatan percobaan login dari Event Viewer berhasil didokumentasikan.*

# Modul 47: Pengelolaan Kredensial dan Password Cracking Hash Offline di Lab

## Tools yang Digunakan

John the Ripper atau Hashcat (di lab terkendali)

## Materi Utama

Password yang disimpan dengan baik berbentuk hash, bukan teks biasa, tetapi hash yang lemah (misalnya MD5 tanpa salt) tetap bisa dipecahkan lewat percobaan offline memakai wordlist. Latihan ini hanya memakai hash milik sendiri yang dibuat untuk latihan, bukan hash yang didapat dari sumber lain tanpa izin.

## Praktik

1. Buat beberapa hash MD5 dari password contoh milikmu sendiri menggunakan `md5sum` atau `openssl`.

2. Jalankan John the Ripper atau Hashcat dengan wordlist kecil untuk mencoba memecahkan hash tersebut.

3. Catat berapa lama waktu yang dibutuhkan dan password mana yang berhasil dipecahkan lebih cepat, lalu jelaskan hubungannya dengan kekuatan password.

## Hasil yang Diharapkan

*Hash password contoh berhasil dicoba dipecahkan, dan kamu bisa menjelaskan hubungan antara kekuatan password dan waktu yang dibutuhkan.*

# Modul 48: Dasar Analisis Malware secara Aman di Lingkungan Terisolasi

## Tools yang Digunakan

Mesin virtual terisolasi (tanpa akses jaringan keluar), VirusTotal

## Materi Utama

Analisis malware harus dilakukan di lingkungan yang benar-benar terisolasi dari jaringan nyata, karena menjalankan sampel berbahaya di luar lab bisa menyebar ke sistem lain. Analisis statis dasar (melihat ciri file tanpa menjalankannya) adalah langkah paling aman untuk pemula sebelum mencoba analisis dinamis (menjalankan sampel) yang risikonya jauh lebih tinggi.

## Praktik

1. Ambil satu contoh file yang sudah diketahui publik sebagai sampel latihan analisis malware yang aman (bukan malware nyata), lalu periksa hash-nya.

2. Cari hash tersebut di VirusTotal untuk melihat bagaimana file semacam itu umumnya terdeteksi.

3. Jelaskan dalam satu paragraf mengapa menjalankan sampel mencurigakan hanya boleh dilakukan di mesin virtual yang benar-benar terisolasi dari jaringan.

## Hasil yang Diharapkan

*Hash sebuah file sampel berhasil diperiksa lewat VirusTotal, dan kamu bisa menjelaskan pentingnya isolasi jaringan saat analisis malware.*

# Modul 49: Dasar Forensik dan Jejak Serangan

## Tools yang Digunakan

`find`, log sistem

## Materi Utama

Forensik digital adalah proses mengumpulkan dan menganalisis jejak setelah sebuah insiden keamanan terjadi, misalnya file yang baru diubah, proses yang tidak biasa, atau log yang menunjukkan aktivitas mencurigakan. Keterampilan ini melengkapi kemampuan menyerang dengan kemampuan memahami apa yang terjadi setelah sebuah sistem berhasil dibobol.

## Praktik

1. Pada mesin lab dari modul 31 sampai 33 yang sebelumnya berhasil diakses, gunakan `find` untuk mencari file yang diubah dalam 24 jam terakhir.

2. Periksa log sistem pada mesin tersebut untuk menemukan jejak aktivitas yang berkaitan dengan akses awal di modul 32.

3. Susun garis waktu singkat (timeline) dari jejak yang ditemukan, dari awal akses sampai eskalasi hak akses.

## Hasil yang Diharapkan

*Garis waktu singkat aktivitas penyerang berhasil disusun dari jejak file yang berubah dan log sistem pada mesin lab.*

# Modul 50: Proyek Penutup: Simulasi Pengujian dari Pengintaian sampai Laporan, dan Langkah Menuju Kali Linux

## Tools yang Digunakan

Seluruh tools dari modul-modul sebelumnya

## Materi Utama

Modul penutup ini menggabungkan seluruh tahapan yang sudah dipelajari — pengintaian, pemindaian, eksploitasi, eskalasi hak akses, dan pelaporan — dalam satu simulasi pengujian menyeluruh terhadap mesin lab. Setelah modul ini, fondasi yang sudah dibangun menjadi dasar untuk melanjutkan ke Kali Linux, yang menyediakan tools penetration testing lebih lengkap dan terintegrasi dibanding WSL2 Ubuntu.

## Praktik

1. Pilih satu mesin lab (boleh yang sudah dipakai di modul sebelumnya atau mesin lab baru) dan jalankan seluruh alur: pengintaian, pemindaian, eksploitasi, eskalasi hak akses.

2. Tulis laporan lengkap hasil simulasi ini memakai template dari modul 10 dan 23.

3. Buat daftar tools dan topik dari 50 modul yang menurutmu paling perlu didalami lebih jauh sebelum pindah ke Kali Linux.

## Hasil yang Diharapkan

*Satu laporan simulasi pengujian menyeluruh berhasil ditulis, beserta daftar topik prioritas untuk didalami sebelum beralih ke Kali Linux.*
