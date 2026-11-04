# HOMIQ — Smart Property CRM (Enterprise B2B SaaS)
**Tagline:** *Manage Leads. Build Relationships. Close More Sales.*

HOMIQ adalah platform B2B SaaS Multi-Tenant *Customer Relationship Management* (CRM) modern berstandar enterprise yang dirancang khusus untuk perusahaan pengembang perumahan (*property developer*) dan agensi pemasaran properti. 

Mengacu pada standar estetika desain kelas dunia (*Modern SaaS Real Estate Tech*), sistem ini dibangun menggunakan **Next.js 14 App Router, TypeScript, Tailwind CSS, Recharts, dan skema 16 tabel PostgreSQL/Supabase**, dilengkapi proteksi transaksi *atomic row-locking* (`SELECT ... FOR UPDATE`) untuk mencegah *double-booking* unit kavling antar tim marketing di lapangan secara waktu nyata (*real-time*).

---

## 🌟 18 Modul Unggulan HOMIQ CRM

1. **Executive Sales Command Center (`/` & `/dashboard`):**
   - KPI metrics: Total Leads, Active Customers, Conversion Rate, dan Realisasi Penjualan Bulanan.
   - Grafik Target vs Realisasi Penjualan (*Recharts*).
   - Antrean prioritas *Smart Follow-up* dengan tombol Click-to-WA langsung dan aksi cepat tandai selesai.
   - Status serapan kavling proyek waktu nyata dengan progress bar persentase serapan unit.
   - **Quick Operational Toolbar**: Pintasan langsung 6 modul operasional (Webhook, Site Plan, Konstruksi, Angsuran DP, Amortisasi KPR, dan Kontrak Legalitas).

2. **Direktori Leads & Simulator Webhook Iklan (`/leads`):**
   - Integrasi Webhook iklan Meta Ads (Instagram/Facebook) & TikTok Ads (`/v1/webhooks/meta-ads`).
   - Fitur **Simulator Webhook Interaktif** untuk uji coba injeksi prospek secara langsung dengan alokasi otomatis (*round-robin*) ke tim marketing.
   - Filter multi-kriteria berdasarkan proyek perumahan, status prospek, dan tingkat urgensi minat.
   - Ekspor data prospek ke format UTF-8 BOM CSV / Excel.

3. **Direktori Pelanggan & Customer 360° Dossier (`/customers`):**
   - Basis data pelanggan yang telah melakukan pembayaran tanda jadi atau akad kredit.
   - Modal **Customer 360° Dossier**: NIK terverifikasi, profesi, audit kelengkapan 6 dokumen bank (KTP, KK, NPWP, Slip Gaji, Rekening Koran, Surat Kerja), status SP3K Bank BTN, dan jaminan BAST serah terima kunci.
   - **Pra-Skrining BI Checking & SLIK OJK**: Audit kelayakan kredit perbankan (*KOL-1 Lancar*, skor 98/100, 0 tunggakan paylater/pinjol, estimasi plafon KPR) dan tombol **[Kirim Resume SLIK (WA)]**.

4. **Sales Pipeline Kanban Board & SPH Generator (`/pipeline`):**
   - 7 tahapan progresif: `Prospek Baru` → `Sudah Dihubungi` → `Berminat Serius` → `Survei Lokasi` → `Negosiasi / DP` → `Booking Unit` → `Closing & Akad`.
   - Kalkulasi dinamis akumulasi nominal potensi omzet per kolom tahap pipeline.
   - **Generator Surat Penawaran Harga (SPH) Resmi**: Otomatis menghasilkan draft penawaran harga A4 dengan 3 opsi skema pembayaran (Cash Keras Diskon 5%, Cash Bertahap 12 Bulan 0%, dan KPR Subsidi FLPP Bank BTN) yang siap dicetak (*native browser print*) atau dikirim via WhatsApp.

5. **Smart Follow-up Engine (`/follow-ups`):**
   - Filter tab dinamis: *Hari Ini (Due Today)*, *Terlambat (Overdue)*, *Terjadwal (Scheduled)*, dan *Selesai (Completed)*.
   - Integrasi Click-to-WA cerdas yang memformat nomor kontak ke standar internasional (`wa.me/628...`).
   - Modal interaktif untuk mencatat hasil interaksi (*Mark as Complete*) atau menjadwalkan ulang (*Reschedule*).

6. **WhatsApp Marketing Center (`/whatsapp-center`):**
   - Akses cepat langsung dari sidebar navigasi dengan badge `wa.me`.
   - 5 skenario percakapan properti instan: Follow-up Minat, Undangan Survei Lokasi & Peta Rute, Konfirmasi Booking Kavling & Rekening Escrow, Link Portal KPR Mandiri, dan Ucapan Selamat SP3K Terbit.
   - Live editable textarea dengan pratinjau pesan waktu nyata pada simulasi layar smartphone iPhone/Android.

7. **Masterplan Site Plan & Denah Rumah Interaktif (`/projects`):**
   - **Vector SVG Masterplan Site Plan**: Denah tata ruang perumahan lengkap dengan One Gate System, pos sekuriti, jalan boulevard aspal 10 meter, taman bermain, masjid warga, dan blok kavling berkode warna interaktif:
     - *Ready (Hijau)*: Tersedia untuk dibooking langsung.
     - *Booked (Kuning)*: Terkunci transaksional, tidak bisa dipilih ulang.
     - *Sold (Abu-abu)*: Telah lunas serah terima.
   - **Pencari Kavling dengan Pulse Locator Ring**: Mengetik kode unit (misal: `A-06`) langsung memunculkan cincin animasi berdenyut pada koordinat SVG unit yang dicari.
   - **Denah Rumah Arsitektural 2D & Galeri Show Unit**: Vektor denah tata ruang interior, modal foto show unit render resolusi tinggi (*Lightbox*), matriks material SNI, dan tombol **[Kirim Brosur (WA)]**.

8. **Monitoring Progres Konstruksi & Pencairan Bank BTN (`/construction`):**
   - Pelacak progres fisik lapangan 0–100% (Pondasi 25%, Pasangan Bata 50%, Atap Baja Ringan 75%, Keramik Granit 90%, BAST Siap Huni 100%).
   - Ceklis kendali mutu SNI / PUPR (Mutu Beton K-225, Rangka Atap C75, Granit 60x60, Listrik 1300 VA & Air PDAM).
   - Monitoring pengajuan termin pencairan KPR Bank BTN (Termin 1 30%, Termin 2 30%, Termin 3 40%).
   - Cetak resmi **Berita Acara Pemeriksaan Fisik (BAPF) A4** bertanda tangan 3 pihak (Kontraktor, Pengawas, Direktur Utama) & ekspor CSV.

9. **Kinerja Tim Marketing & Slip Komisi Penjualan (`/team`):**
   - Leaderboard performa konsultan properti (Top Closer, unit closing, omzet, rasio target).
   - Fitur pembagian prospek adil bergantian (*Round-Robin Allocation Engine*).
   - **Kalkulator & Slip Komisi Penjualan A4**: Skema komisi 2.0% (FLPP) & 1.5% (Komersial), milestone pencairan 2 tahap (50% tanda jadi, 50% akad kredit), potongan PPh 21, dan cetak format A4 resmi.

10. **Jadwal Survei Lokasi & Show Unit (`/site-visits`):**
    - Manajemen reservasi survei unit contoh calon pembeli didampingi konsultan pemasaran.
    - Integrasi navigasi rute instan via **Google Maps** dan sinkronisasi 1-klik ke **Google Calendar**.
    - Generator pesan undangan resmi dan konfirmasi titik temu via WhatsApp.

11. **Transaksi Booking & Buku Kontrol Angsuran DP (`/bookings`):**
    - Pencatatan transaksi tanda jadi (*booking fee*), metode bayar (KPR FLPP, KPR Komersial, Cash Keras, Cash Bertahap), dan nomor rekening penampung.
    - **Buku Kontrol Angsuran Uang Muka (DP Tahap 1, 2, 3)**: Status lunas/jatuh tempo, hitung otomatis sisa kewajiban, dan tombol 1-klik **[Kirim Pengingat WA]** rekening escrow bank.
    - **Modal Kwitansi Resmi Tanda Jadi & DP**: Dilengkapi nomor seri faktur unik, terbilang Rupiah otomatis, tanggal jatuh tempo, dan fungsi cetak browser instan (`window.print()`).

12. **Kalkulator KPR & Tabel Amortisasi 20 Tahun (`/kpr-calculator`):**
    - Simulasi kredit perumahan bersubsidi FLPP bunga tetap 5% p.a. tenor s.d. 20 tahun vs KPR Komersial bank umum.
    - Rincian estimasi biaya pra-akad *all-in* (DP, BPHTB, AJB/BBN, Provisi, Asuransi, SBUM).
    - **Tabel Jadwal Amortisasi Pinjaman Lengkap (Tahun ke-1 s.d. 20)**: Rincian penurunan pokok vs bunga bank, sisa hutang akhir tahun, bar pelunasan, akumulasi total biaya kredit, dan tombol unduh file CSV Excel.
    - Tombol kirim rincian simulasi angsuran instan ke WhatsApp calon pembeli.

13. **Pusat Dokumen & Kontrak Legalitas (`/documents`):**
    - Generator kontrak hukum properti resmi berstandar perbankan dan notaris:
      - **Surat Pesanan Kavling (SPK)**: Klausul pengikatan tanda jadi dan batas waktu pengajuan berkas KPR.
      - **Perjanjian Pengikatan Jual Beli (PPJB)**: Pasal spesifikasi bangunan, termin pembayaran, dan denda keterlambatan.
      - **Berita Acara Serah Terima (BAST)**: Serah terima fisik kunci rumah, daya listrik PLN, saluran air PDAM, dan masa retensi pemeliharaan 100 hari kerja.
      - **Surat Pernyataan Pemohon KPR Subsidi FLPP**: Format resmi Kementerian PUPR (bebas kepemilikan rumah & subsidi).
    - Format cetak A4 rapi lengkap dengan kotak Materai Tempel Rp 10.000 dan tanda tangan para pihak.

14. **Laporan & Analitik Bisnis Eksekutif (`/analytics`):**
    - Grafik tren penjualan bulanan, rasio konversi pipeline, serapan kavling per proyek, dan matriks efektivitas saluran iklan (Meta Ads vs TikTok vs Direct Agent).
    - **Modal Laporan Kinerja Bisnis Direksi**: Kop surat eksekutif, ringkasan 4 metrik KPI, tabel evaluasi saluran iklan, analisis serapan stok, rekomendasi strategi bisnis AI, dan fungsi cetak / kirim laporan ke Direktur via WhatsApp.

15. **Pengaturan Profil Pengembang & Workspace (`/settings`):**
    - Identitas legal developer: Nama resmi PT, merk dagang, NIB, keanggotaan APERSI/REI, alamat kantor pemasaran, dan kontak.
    - Rekening resmi penampung (*Escrow Account*) untuk tanda jadi & DP (Bank BTN).
    - Nilai default tanda jadi, suku bunga FLPP, batas maksimal DBR cicilan, dan kebijakan refund.
    - Manajemen akun pengguna staf kantor (Owner, Finance, Legal, Marketing).
    - Tombol Reset Demo 1-Klik dan kartu panduan instalasi PWA Mobile.

16. **Konsol Platform Super Admin (`/super-admin`):**
    - Manajemen multi-tenant B2B SaaS dengan arsitektur Row-Level Security (RLS) PostgreSQL.
    - Matriks paket langganan: **Starter** (Maks 60 Unit / 2 Proyek), **Business** (Maks 250 Unit / 5 Proyek), dan **Professional** (Maks 1.000 Unit / 15 Proyek).
    - Pemantauan status server, kapasitas unit terpakai, dan masa aktif langganan developer.

17. **Portal Pengumpulan Berkas KPR Mandiri (`/portal-kpr/[id]`):**
    - Halaman khusus calon pembeli yang dapat dibuka melalui smartphone pembeli tanpa memerlukan login staf CRM internal.
    - Stepper 5 tahap progres kredit perbankan (*Pengumpulan Berkas* → *Verifikasi Internal* → *Analisa Bank* → *Penerbitan SP3K* → *Akad Kredit*).
    - Area unggah 6 dokumen utama: KTP Pemohon & Pasangan, Kartu Keluarga (KK), NPWP Pribadi, Slip Gaji 3 Bulan, Rekening Koran 3 Bulan, dan Surat Keterangan Kerja Aktif.
    - Feedback status dokumen secara waktu nyata (*Terverifikasi*, *Sedang Ditinjau*, atau *Perlu Revisi* lengkap dengan alasan penolakan dan panduan perbaikan).

18. **Layar Autentikasi Enterprise & 5-Role Switcher (`/login`):**
    - Tampilan Midnight Navy korporat dengan label enkripsi TLS 1.3 perbankan dan OJK SLIK Audit Ready.
    - **5-Role 1-Click Demo Switcher**:
      - 👔 **Direktur Utama & Owner**: Pak Muhammad Rizal (`/`)
      - 💼 **Konsultan Marketing**: Kang Dika Pratama (`/follow-ups`)
      - 💳 **Admin Keuangan & KPR**: Ibu Siti Rahma (`/bookings`)
      - 🏗️ **Site Manager & Teknik Sipil**: Ir. Hendra Wijaya (`/construction`)
      - 🛡️ **Platform Super Admin**: Multi-Tenant Master Console (`/super-admin`)

---

## 🛠️ Panduan Menjalankan Sistem Secara Lokal

### 1. Prasyarat
- Node.js versi 18.x atau 20.x ke atas
- npm (versi 9.x atau 10.x ke atas)

### 2. Langkah Menjalankan
```bash
# 1. Masuk ke direktori proyek
cd homiq-smart-property-crm

# 2. Salin environment variable
cp .env.example .env.local

# 3. Install dependencies
npm install

# 4. Verifikasi TypeScript & Build
npm run build

# 5. Jalankan development server
npm run dev
```

Buka peramban di **`http://localhost:3000`** (atau **`http://localhost:3001`** jika port 3000 sedang digunakan).

---

## 🗄️ Konfigurasi Supabase PostgreSQL (Cloud Database)

Jika ingin menghubungkan langsung ke instance live database PostgreSQL di cloud:
1. Buat project baru di [Supabase Dashboard](https://supabase.com).
2. Buka menu **SQL Editor**.
3. Jalankan skrip `supabase/migrations/01_schema.sql` untuk membangun 16 tabel relasional, enum, fungsi RLS, dan prosedur transaksi `create_unit_booking_tx`.
4. Jalankan skrip `supabase/migrations/02_seeder_demo.sql` untuk mengisi dataset simulasi *Garut Sejahtera Property*.
5. Buka **Project Settings -> API** di Supabase, lalu salin kredensial ke `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-KEY]"
   ```

---

## 🚀 Panduan Deployment ke Vercel (Production Ready)

Proyek ini telah dikonfigurasi 100% *zero-config* untuk platform Vercel:

1. **Push ke Git Repository (GitHub / GitLab / Bitbucket):**
   ```bash
   git init
   git add .
   git commit -m "feat: complete production-ready HOMIQ Property CRM"
   git remote add origin https://github.com/[username]/homiq-smart-property-crm.git
   git push -u origin main
   ```

2. **Impor ke Vercel:**
   - Masuk ke dashboard [Vercel](https://vercel.com) dan klik **Add New... -> Project**.
   - Pilih repository `homiq-smart-property-crm`.
   - Framework Preset otomatis terdeteksi sebagai **Next.js**.

3. **Konfigurasi Environment Variables di Vercel Settings:**
   - `NEXT_PUBLIC_APP_NAME`: `HOMIQ — Smart Property CRM`
   - `NEXT_PUBLIC_ENABLE_DEMO_DATA`: `true`
   - `NEXT_PUBLIC_DEFAULT_TENANT_ID`: `aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`
   - `NEXT_PUBLIC_SUPABASE_URL`: *(URL project Supabase Anda)*
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: *(Anon key Supabase Anda)*

4. **Deploy:**
   - Klik **Deploy**.
   - Dalam ~60 detik, sistem akan aktif secara publik di domain Vercel Anda.
