# Website Pembelajaran Cybersecurity White Hat Hacker

Website statis untuk membaca 50 modul, menandai modul selesai secara berurutan, dan memantau progres. Tanpa backend, tanpa database, tanpa pustaka luar. Progres disimpan di `localStorage` Chrome.

## Isi folder

```
index.html                       halaman utama (satu-satunya halaman)
css/style.css                    tampilan (gelap, aksen neon merah)
js/markdown.js                   pembaca Markdown kecil + pemecah modul
js/storage.js                    penyimpanan progres, ekspor, impor
js/app.js                        dashboard, halaman belajar, navigasi
content/modul-cybersecurity.md   seluruh materi (50 modul dalam satu file)
.nojekyll                        agar GitHub Pages menyajikan file apa adanya
```

## Menjalankan di komputer

Jangan klik dua kali `index.html`. Chrome memblokir pemuatan file materi kalau halaman dibuka dengan alamat `file://`, dan website akan menampilkan pesan error. Pakai server lokal:

**Cara 1: VS Code**
1. Pasang ekstensi **Live Server**.
2. Buka folder proyek di VS Code.
3. Klik kanan `index.html`, pilih **Open with Live Server**.

**Cara 2: Python** (kalau sudah terpasang)
1. Buka terminal di folder proyek.
2. Jalankan `python -m http.server 8000`.
3. Buka `http://localhost:8000` di Chrome.

## Mengunggah ke GitHub Pages

1. Buat repositori baru di GitHub, lalu unggah seluruh isi folder ini (termasuk `.nojekyll`). `index.html` harus berada di akar repositori.
2. Di repositori, buka **Settings > Pages**.
3. Pada **Build and deployment**, pilih **Deploy from a branch**, branch `main`, folder `/ (root)`, lalu simpan.
4. Tunggu beberapa menit. Alamatnya biasanya `https://USERNAME.github.io/NAMA-REPO/`.

Semua alamat file di proyek ini relatif, jadi tetap berfungsi meskipun website berada di subfolder (`/NAMA-REPO/`).

## Cara kerja progres

- Modul diselesaikan **berurutan**. Tombol **Selesai** hanya aktif di modul berikutnya (progres + 1). Modul lain tetap bebas dibuka dan dibaca.
- Hanya modul terakhir yang selesai yang bisa dibatalkan.
- Persen progres = jumlah modul selesai / jumlah seluruh modul x 100, dibulatkan ke bilangan bulat.
- Yang disimpan hanya satu angka: jumlah modul selesai.

## Cadangan progres

`localStorage` hanya berlaku untuk browser dan perangkat yang sama. Progres hilang jika data situs dihapus (misalnya "Clear browsing data" di Chrome), dan tidak pindah ke perangkat lain.

- Di dashboard, bagian **Cadangan progres**, klik **Ekspor progres** untuk mengunduh file `.json`.
- Klik **Impor progres** untuk memulihkan dari file itu. Impor **menimpa** progres saat ini dan meminta konfirmasi dulu.
- Ekspor berkala (misalnya seminggu sekali). Tanpa file ekspor, progres yang hilang tidak bisa dipulihkan.

## Mengubah atau menambah modul

Semua materi ada di `content/modul-cybersecurity.md`.

- Setiap modul dimulai dengan satu baris `# Modul NN: Judul`. Jangan memakai awalan `# Modul ` di tempat lain.
- Empat bagian di dalam modul memakai `##`: Tools yang Digunakan, Materi Utama, Praktik, Hasil yang Diharapkan.
- Nomor modul di website mengikuti **urutan kemunculan** di file, bukan angka di judul. Tetap tulis angka di judul agar file mudah dibaca.
- Jumlah modul dihitung otomatis dari file.

**Penting:**
- Tambahkan modul baru di **akhir** file. Menyisipkan atau menghapus modul di tengah menggeser nomor, sehingga progres yang sudah tersimpan bisa menunjuk modul yang salah.
- Pembaca Markdown mendukung judul, paragraf, daftar bernomor dan poin, blok kode (` ``` `), huruf tebal, huruf miring, dan kode dalam backtick. Tabel, tautan, dan gambar belum didukung.
- Tanda `<` dan `>` selalu tampil sebagai teks biasa, jadi contoh seperti `<script>` aman.
