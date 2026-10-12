Oke, mari kita bedah halaman **Home (`/`)** ini! Dari _screenshot_ dan struktur kodenya, halaman utama ini ternyata juga menggunakan templat pola generik ala generator UI/AI (_AI slop_) yang biasa dipakai untuk _startup_ SaaS, tetapi diterapkan untuk yayasan wakaf dan pesantren. Akibatnya, nuansa kemanusiaan dan kehangatan khas pesantren jadi tertutup oleh kesan kaku "aplikasi teknologi".

Berikut adalah bedah tuntas elemen UI/UX di halaman Home:

---

### 1. Hero Section + Tab Navigasi Mini di Bawah

- **Elemen:** Teks besar _"Membangun Ekosistem Pesantren..."_, tombol aksi merah/biru, serta navigasi kecil di bagian bawah hero (`[01 Brand Utama]`, `[02 Pendidikan & Kompetensi]`, dll.).
- **Kenapa Terasa "AI Slop"?:** Ini adalah pola _hero section_ klasik hasil _generate_ tool seperti v0 atau komponen _template_ Tailwind. Adanya tombol angka kecil di bawah _hero_ membuat tampilannya terkesan seperti _dashboard_ atau _slider_ produk SaaS, bukan halaman utama organisasi filantropi yang butuh daya tarik emosional kuat.

### 2. Grid Statistik & "Pendekatan Ekosistem" (6 Langkah)

- **Elemen:** 6 kotak grid sejajar yang menjelaskan alur (_Kebaikan -> Pendidikan -> Kompetensi -> Kemandirian -> Kolaborasi -> Dampak Sosial_).
- **Kenapa Terasa "AI Slop"?:** Penyakit utama _AI slop_ adalah **Grid Fatigue**—memasukkan setiap poin informasi ke dalam kotak putih ber-border tipis dengan _shadow_ seragam. Karena polanya diulang-ulang terus dari atas sampai bawah, pembaca akan cepat merasa bosan dan mengabaikan teksnya (_banner blindness_).

### 3. Saluran Kebaikan (6 Kartu Cara Berkontribusi)

- **Elemen:** 6 kotak terpisah untuk _Infak & Sedekah_, _Zakat Maal_, _Wakaf Uang_, _Donasi Barang_, dll.
- **Kenapa Terasa "AI Slop"?:** Memajang 6 kartu sekaligus dalam satu layar penuh membuat halaman terasa sangat panjang (_infinite scrolling_ yang melelahkan) dan monoton karena bentuk visualnya tidak punya hierarki yang jelas mana yang jadi fokus utama (_Primary Call to Action_).

### 4. Kalkulator Kebaikan & Form Kontak

- **Elemen:** Widget simulasi wakaf (pilih program, luas lahan, ringkasan total) dan form input data.
- **Kenapa Terasa "AI Slop"?:** Desainnya meniru persis _pricing table_ atau _configurator_ produk digital (seperti kalkulator biaya server cloud). Untuk platform donasi/wakaf, pendekatan ini terasa terlalu dingin, klinis, dan kurang menyentuh aspek niat baik (_sadaqah jariyah_).

---

### Solusi Redesign agar Keluar dari Gaya "AI Slop":

1. **Ganti Kartu Kotak dengan _Storytelling Flow_:** Alih-alih membuat 6 kotak grid untuk Pendekatan Ekosistem, ubah menjadi narasi vertikal yang elegan dengan foto dokumentasi asli kegiatan di [Sukasirna, Jonggol](http://localhost:4321/program/wakaf#legalitas) sebagai latar belakang penuh (_immersive background_).
2. **Sederhanakan Saluran Kebaikan:** Gabungkan 6 cara berkontribusi ke dalam komponen _tabs_ interaktif atau _accordion_ yang bersih, sehingga _user_ bisa memilih sendiri jenis kontribusinya tanpa harus scroll melewati dinding kotak-kotak yang panjang.
3. **Bikin Kalkulator Wakaf Lebih Personal:** Ubah tampilannya agar tidak terlihat seperti tabel hitung-hitungan pajak atau _checkout_ e-commerce. Berikan teks pengantar yang hangat dan interaksi tombol yang lebih natural.

Bagian mana di halaman Home ini yang paling ingin Andarombak duluan penampilannya?
