# PANDUAN PRESENTASI & SKENARIO DEMO BISNIS HOMIQ CRM
**Dokumen Resmi:** *Executive Product Dossier, Pitch Guide & Demonstration Script*  
**Target Audiens:** *Direktur / Owner Developer Perumahan, Asosiasi Pengembang (APERSI / REI / HIMPERRA), Investor, dan Bank Rekanan KPR (Bank BTN, BSI, Mandiri).*

---

## 🎯 1. Ringkasan Eksekutif (The Pitch in 60 Seconds)

> *"Mayoritas developer perumahan saat ini masih kehilangan 30% hingga 45% potensi penjualan karena prospek iklan tidak ter-follow up cepat, berkas KPR tercecer di map kertas, dan sering terjadi konflik double-booking kavling antar staf sales di lapangan.*
>
> ***HOMIQ — Smart Property CRM** adalah platform B2B SaaS komando perumahan terpadu. Dari saat calon pembeli klik iklan Instagram/TikTok, data langsung masuk secara instan, dibagikan adil ke sales, kavling dikunci secara aman di denah site plan digital, berkas KPR diunggah mandiri oleh pembeli dari ponsel mereka, hingga surat perjanjian (SPK/PPJB) dan kwitansi resmi diterbitkan secara otomatis dalam 1 klik."*

---

## 📊 2. Komparasi: Cara Lama vs Menggunakan HOMIQ

| Aspek Operasional | Cara Manual / Konvensional | Solusi Modern HOMIQ CRM |
| :--- | :--- | :--- |
| **Respon Iklan Media Sosial** | Data form medsos diekspor manual tiap beberapa hari. Respon sales lambat (>24 jam). | **Webhook Ingestion Otomatis:** Lead masuk dalam hitungan detik & langsung dibagi adil via *Round-Robin*. |
| **Komunikasi WhatsApp** | Sales harus mengetik ulang nomor telepon dan mencari template chat di catatan pribadi. | **Click-to-WA Engine:** Klik tombol hijau di layar, WhatsApp resmi langsung terbuka dengan nomor format `+628...`. |
| **Pemilihan Kavling** | Menggunakan denah kertas cetak di dinding kantor. Sering terjadi **Double Booking** (2 sales menjual unit yang sama). | **Vector SVG Site Plan:** Dilengkapi *Database Row-Locking* (`SELECT ... FOR UPDATE`). Unit terkunci atomik saat di-booking. |
| **Hitung Cicilan KPR** | Menghitung manual dengan kalkulator fisik atau spreadsheet rumit yang rawan salah rumus. | **Kalkulator KPR Subsidi & Komersial:** Perhitungan bunga FLPP 5% flat, biaya pra-akad all-in, rasio DBR 35%, & SPH A4 instan. |
| **Pengumpulan Dokumen KPR** | Konsumen harus bolak-balik ke kantor membawa fotokopi map KTP, KK, slip gaji, dan rekening koran. | **Portal KPR Mandiri Konsumen:** Pembeli tinggal foto dokumen dari HP di rumah via link khusus tanpa perlu login kantor. |
| **Surat & Dokumen Kontrak** | Staf legal menyalin format Word berulang kali dan rawan salah ketik nama atau NIK. | **Legal Hub Generator:** Sekali klik menerbitkan SPK, PPJB, BAST Kunci, dan Surat FLPP PUPR dengan kotak materai Rp 10.000. |
| **Progres Konstruksi & Bank BTN** | Pengawasan lapangan manual via WA grup. Pencairan termin bank lambat karena berkas BAPF belum rapi. | **Construction & Bank Tracker:** Monitoring progres riil (Pondasi s/d BAST), kendali mutu QC SNI, & cetak Berita Acara Pemeriksaan Fisik (BAPF) A4 resmi. |
| **Perhitungan Komisi Sales** | Direkap manual akhir bulan. Sering memicu perdebatan staf terkait nominal dan potongan pajak. | **Slip Komisi Otomatis:** Perhitungan komisi 1.5% - 2.0%, termin 2 tahap (DP & Akad), dan potongan PPh 21 siap cetak A4. |
| **Laporan Direktur / Owner** | Direktur harus menagih rekap staf via WhatsApp tiap akhir pekan. | **Executive Live BI:** Grafik real-time target vs realisasi, serapan kavling, dan efektivitas ROI iklan di laptop direktur. |

---

## 🎬 3. Skenario Demo 7 Langkah (Walkthrough Script untuk Presentasi)

Saat Anda mempresentasikan sistem ini di hadapan calon klien developer atau investor, ikuti urutan langkah berikut:

### Langkah 1: Tampilkan Dasbor Utama (The Cockpit)
* **Buka:** `/`
* **Poin Bicara:**
  > *"Selamat pagi Bapak/Ibu Direksi. Ini adalah dasbor utama HOMIQ. Di sini kita langsung melihat 4 denyut nadi bisnis perumahan: Total Prospek, Pelanggan Aktif, Conversion Rate, dan Realisasi Omzet Penjualan. Di sebelah kanan, ada grafik Target vs Realisasi bulan berjalan, serta antrean follow-up prioritas hari ini agar tidak ada konsumen potensial yang terlewat."*

### Langkah 2: Simulasi Iklan Masuk (Leads & Ads Webhook)
* **Buka:** `/leads`
* **Aksi Demo:**
  1. Klik tombol **`[⚡ Integrasi Webhook Ads]`**.
  2. Pilih channel *Instagram Ads*, lalu klik **Kirim Simulasi Webhook**.
  3. Tunjukkan notifikasi hijau: Lead baru otomatis masuk di baris teratas dan langsung dialokasikan ke staf *Kang Dika Pratama* secara *round-robin*.
  4. Klik tombol **`[📥 Ekspor CSV]`** untuk memperlihatkan data dapat diunduh ke Excel dalam 1 detik.
* **Poin Bicara:**
  > *"Saat tim digital marketing Anda menjalankan iklan di Instagram atau TikTok, data calon pembeli tidak lagi menumpuk di dashboard Ads. Sistem HOMIQ langsung menangkapnya dan membagikannya secara adil ke tim sales secara otomatis."*

### Langkah 3: Interaksi WhatsApp Cerdas (Smart Follow-up)
* **Buka:** `/follow-ups` atau `/whatsapp-center`
* **Aksi Demo:**
  1. Tunjukkan tab filter: *Due Today*, *Overdue*, *Scheduled*, dan *Completed*.
  2. Klik tombol hijau **WhatsApp** pada salah satu calon pembeli.
  3. Buka `/whatsapp-center` untuk memperlihatkan live preview smartphone mockup.
* **Poin Bicara:**
  > *"Sales Anda tidak perlu repot mengetik ulang nomor HP atau mencari template pesan. Cukup satu klik, WhatsApp terbuka dengan sapaan resmi, informasi subsidi DP, dan nama marketing yang bertugas."*

### Langkah 4: Tinjau Denah Kavling Anti Double-Booking (Projects & Masterplan)
* **Buka:** `/projects`
* **Aksi Demo:**
  1. Perlihatkan denah Masterplan Vektor SVG: gerbang One Gate System, pos sekuriti, jalan aspal 10m, dan blok kavling berwarna hijau (*Ready*), kuning (*Booked*), dan abu-abu (*Sold*).
  2. Klik salah satu kavling kosong (Hijau) -> form booking terbuka.
  3. Masukkan nama pembeli dan klik konfirmasi booking -> kavling seketika berubah menjadi kuning (*Booked*) dan terkunci transaksional.
  4. Klik tombol **`[📑 Cetak Pricelist Resmi / PDF]`** untuk memperlihatkan brosur daftar harga A4 siap cetak.
  5. Pindah ke tab **Denah Rumah 2D** untuk memperlihatkan *Room Inspector* spesifikasi interior tipe 36/60.
* **Poin Bicara:**
  > *"Ini adalah salah satu fitur paling krusial bagi developer: proteksi transaksi anti-double booking. Ketika satu sales sedang mengunci Blok A-05, sales lain di lapangan tidak akan bisa menjual kavling tersebut. Di sini kita juga bisa langsung mencetak brosur pricelist resmi dengan sekali klik."*

### Langkah 5: Hitung Angsuran KPR & Terbitkan SPH
* **Buka:** `/kpr-calculator` dan `/pipeline`
* **Aksi Demo:**
  1. Di `/kpr-calculator`, pilih preset *Bumi Cimanuk Asri (Subsidi FLPP)*. Tunjukkan rincian angsuran 10, 15, 20 tahun, biaya pra-akad, dan analisis DBR gaji 35%.
  2. Klik **Kirim Rincian WhatsApp** untuk mengirimkan hasil hitungan ke pembeli.
  3. Buka `/pipeline`, klik **`[📑 Buat SPH]`** pada salah satu kartu pembeli untuk memperlihatkan draf Surat Penawaran Harga resmi 3 skema pembayaran yang siap dicetak.
* **Poin Bicara:**
  > *"Konsumen sering bertanya berapa cicilan per bulan dan biaya all-in. Sistem HOMIQ menghitungnya secara instan, memverifikasi apakah gaji konsumen memenuhi syarat bank, dan langsung menerbitkan Surat Penawaran Harga resmi."*

### Langkah 6: Portal KPR Mandiri Konsumen
* **Buka:** `/portal-kpr/cust-101`
* **Aksi Demo:**
  1. Perlihatkan tampilan portal di browser: bersih, ramah smartphone, dan tidak memerlukan login staf kantor.
  2. Tunjukkan stepper 5 tahap progres kredit perbankan (*Berkas* → *Verifikasi* → *Analisa Bank* → *SP3K* → *Akad*).
  3. Tunjukkan area audit 6 berkas dokumen (KTP, KK, NPWP, Slip Gaji, Rekening Koran, Surat Kerja) dengan status *Terverifikasi* dan *Perlu Revisi*.
* **Poin Bicara:**
  > *"Pembeli rumah Anda mendapatkan tautan khusus. Mereka cukup membuka link ini di HP mereka untuk mengunggah foto KTP dan slip gaji dari rumah. Tim legal Anda tinggal memverifikasi di kantor: jika ada foto yang buram, tinggal tolak dengan catatan revisi."*

### Langkah 7: Legalitas Kontrak, Kwitansi, & Slip Komisi
* **Buka:** `/bookings`, `/documents`, dan `/team`
* **Aksi Demo:**
  1. Di `/bookings`, klik **Cetak Kwitansi** -> muncul kwitansi resmi tanda jadi bernomor seri unik.
  2. Di `/documents`, pilih dokumen *Perjanjian Pengikatan Jual Beli (PPJB)* atau *Berita Acara Serah Terima (BAST)* lengkap dengan kotak Materai Rp 10.000.
  3. Di `/team`, klik **`[Rincian Slip]`** pada konsultan Kang Dika Pratama -> muncul Slip Komisi A4 resmi dengan potongan PPh 21 (2.5%) dan termin pencairan (50% DP, 50% Akad).
* **Poin Bicara:**
  > *"Siklus ditutup dengan sempurna: kwitansi booking sah, surat perjanjian hukum lengkap, dan hak komisi staf marketing dihitung secara transparan tanpa perlu perselisihan di akhir bulan."*

### Langkah 8: Progres Konstruksi & Pencairan Termin Bank BTN
* **Buka:** `/construction`
* **Aksi Demo:**
  1. Perlihatkan dasbor monitoring fisik: unit aktif dibangun, selesai 100%, total termin cair (Rp 580 Juta) vs termin siap diajukan (Rp 950 Juta).
  2. Klik tombol **`[Update Progres Fisik]`** pada salah satu kavling -> perlihatkan slider progres, tahap pekerjaan, dan checklist kendali mutu teknis SNI (Pondasi K-225, Kolom, Atap C75, Granit, Plafon, Listrik/Air).
  3. Klik tombol **`[Cetak BAPF Bank A4]`** -> dokumen resmi Berita Acara Pemeriksaan Fisik standar PU langsung tampil rapi dengan kop surat PT, tabel rincian bobot teknis, rekomendasi pencairan, dan tanda tangan 3 pihak (Kontraktor, Pengawas, Direktur Utama).
  4. Klik tombol **`[Ajukan Termin Bank (WA)]`** -> WhatsApp otomatis terbuka mengirimkan laporan resmi ke Loan Officer Bank BTN.
* **Poin Bicara:**
  > *"Bagi pengembang, kelancaran arus kas sangat bergantung pada seberapa cepat bank mencairkan dana KPR. Di modul ini, progres kontraktor diawasi ketat dan dokumen Berita Acara Pemeriksaan Fisik diterbitkan dalam hitungan detik agar dana termin perbankan segera cair ke rekening giro pengembang."*

### Langkah 9: Autentikasi Multi-Peran & Pra-Skrining BI Checking OJK
* **Halaman:** `/login` & `/customers`
* **Aksi Demo:**
  1. Buka `/login` -> tunjukkan 5 kartu peran demo 1-klik (*Direktur Utama, Marketing, Finance DP, Site Manager Fisik, Super Admin*).
  2. Beralih ke `/customers` -> klik salah satu konsumen -> tunjukkan kartu audit **Pra-Skrining BI Checking & SLIK OJK (KOL-1 Lancar, Skor 98/100, Bebas Pinjol)**.
  3. Klik tombol **`[Kirim Resume SLIK (WA)]`** -> pesan resmi dikirimkan langsung ke WhatsApp konsumen.
* **Poin Bicara:**
  > *"Developer tidak perlu buang waktu memproses calon pembeli yang riwayat kreditnya macet di bank. Dengan fitur pra-skrining SLIK OJK terintegrasi, kelayakan finansial konsumen langsung terverifikasi sejak awal sebelum berkas masuk ke bank mitra."*

### Langkah 10: Simulasi Payment Gateway Escrow & QRIS Bank Indonesia
* **Halaman:** `/bookings`
* **Aksi Demo:**
  1. Di `/bookings`, klik tab atau tombol **`[Buku Kontrol DP]`** pada salah satu pemesanan aktif.
  2. Klik tombol **`[⚡ VA / QRIS]`** pada termin angsuran yang belum lunas.
  3. Perlihatkan modal interaktif Payment Gateway:
     * Tab **Bank BTN Virtual Account** (`9881 2345 0092 1189`), **BCA VA**, dan **Mandiri VA**.
     * Tab **QRIS Dinamis** lengkap dengan logo standar ASPI / Bank Indonesia, NMID, dan countdown timer 24 jam.
  4. Klik tombol **`[⚡ Simulasikan Pembayaran Berhasil (Webhook HTTP 200)]`**.
  5. Tunjukkan audio chime berbunyi, status angsuran seketika berubah menjadi **LUNAS**, kwitansi resmi terbit otomatis, dan tombol WhatsApp bukti bayar siap dikirimkan ke pembeli.
* **Poin Bicara:**
  > *"Untuk kelancaran penagihan uang muka, sistem HOMIQ menyediakan payment gateway otomatis terhubung ke rekening escrow pengembang. Saat pembeli membayar via QRIS atau Virtual Account bank, sistem langsung menangkap webhook secara instan tanpa perlu cek mutasi manual."*

### Langkah 11: Portal Mandiri Pembeli & PWA Mobile Instalasi
* **Halaman:** `/portal-kpr`
* **Aksi Demo:**
  1. Buka `/portal-kpr` -> masukkan kode booking demo (*BOK-202611-892*) atau klik profil instan Bapak Agus Setiawan.
  2. Tunjukkan tampilan elegan tanpa sidebar kantor: pembeli dapat memantau progres fisik rumah, kwitansi pembayaran, dan mengunggah berkas KPR dari rumah.
  3. Tunjukkan kemampuan instalasi PWA di browser untuk diunduh sebagai aplikasi mandiri di ponsel atau laptop.
* **Poin Bicara:**
  > *"Pengalaman konsumen menjadi sangat modern. Pembeli tidak perlu menanyakan progres rumah bolak-balik ke kantor pemasaran. Mereka cukup membuka portal mandiri dari ponsel mereka kapan saja secara transparan."*

---

## 💰 4. Model Monetisasi & Nilai Investasi (B2B SaaS Pricing)

Jika Anda menawarkan HOMIQ ke pengembang perumahan lain:

1. **Paket Starter (Rp 1.500.000 / bulan)**:
   * Kapasitas s.d. 60 Unit Kavling / 2 Proyek Perumahan.
   * Maksimal 5 Akun Staf Pemasaran.
   * Cocok untuk developer perumahan subsidi skala rintisan.

2. **Paket Business (Rp 3.500.000 / bulan)** — *Paling Diminati*:
   * Kapasitas s.d. 250 Unit Kavling / 5 Proyek Perumahan.
   * Maksimal 15 Akun Staf Pemasaran & Keuangan.
   * Seluruh fitur legalitas, kalkulator KPR, portal mandiri konsumen, dan ekspor CSV aktif.

3. **Paket Professional / Enterprise (Rp 7.500.000 / bulan)**:
   * Kapasitas s.d. 1.000 Unit Kavling / 15 Proyek Perumahan.
   * Maksimal 40 Akun Pengguna & Akses API Webhook Tanpa Batas.
   * Bimbingan instalasi on-premise / private cloud Supabase.

---

## 🔒 5. Keamanan & Kepatuhan Data (*Enterprise Security*)

* **Isolasi Multi-Tenant PostgreSQL RLS**: Data keuangan dan nomor kontak konsumen antar developer perumahan diisolasi 100% menggunakan *Row Level Security*.
* **Pencadangan Mandiri (Self-Backup)**: Pengembang dapat mengunduh seluruh data dalam format JSON terenkripsi kapan saja melalui menu `/settings`.
* **Kepatuhan Privasi Konsumen**: Dokumen sensitif KPR hanya dapat diakses oleh staf legal dan pimpinan yang berwenang.

---

*Dokumen ini merupakan bagian dari paket rilis HOMIQ Smart Property CRM v1.2.*
