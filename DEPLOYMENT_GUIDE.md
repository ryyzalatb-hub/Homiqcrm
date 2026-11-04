# PANDUAN DEPLOYMENT KE CLOUD & LIVE DATABASE SUPABASE
**HOMIQ — Smart Property CRM (Enterprise B2B SaaS)**

Dokumen ini berisi panduan teknis langkah demi langkah untuk mempublikasikan aplikasi HOMIQ ke internet agar dapat diakses oleh publik, investor, dan tim pemasaran di mana saja melalui smartphone dan laptop.

---

## 🚀 1. Deployment Cepat ke Vercel (Rekomendasi Utama & Gratis)

Platform **Vercel** adalah platform hosting resmi untuk Next.js dengan performa edge jaringan global dan sertifikat SSL/HTTPS otomatis.

### Cara A: Melalui Dashboard Vercel (Tanpa Terminal)
1. Unggah (*Push*) repository kode HOMIQ ke akun **GitHub / GitLab / Bitbucket** Anda.
2. Buka [https://vercel.com](https://vercel.com) dan login menggunakan akun GitHub Anda.
3. Klik tombol **"Add New..."** lalu pilih **"Project"**.
4. Pilih repository `homiq-smart-property-crm` yang baru saja Anda unggah.
5. Pada bagian **Configure Project**:
   * **Framework Preset**: Pilih `Next.js` (otomatis terdeteksi).
   * **Build Command**: `next build` atau biarkan default.
   * **Output Directory**: `.next` (default).
6. Buka menu **Environment Variables**, lalu tambahkan variabel dari file `.env.example`:
   * `NEXT_PUBLIC_APP_NAME` = `HOMIQ — Smart Property CRM`
   * `NEXT_PUBLIC_APP_URL` = `https://homiq-demo.vercel.app` (sesuaikan domain Anda)
   * `NEXT_PUBLIC_ENABLE_DEMO_DATA` = `true`
7. Klik tombol **"Deploy"**. Dalam waktu sekitar 1–2 menit, aplikasi Anda sudah live dengan URL publik (contoh: `https://homiq-crm.vercel.app`).

### Cara B: Melalui Vercel CLI (Dari Terminal)
```bash
# 1. Jalankan Vercel CLI
npx vercel

# 2. Ikuti instruksi di layar (Link to existing project? No -> Project name: homiq-crm)
# 3. Untuk deployment produksi langsung:
npx vercel --prod
```

---

## 🗄️ 2. Menghubungkan ke Database Supabase (PostgreSQL Cloud)

Aplikasi HOMIQ telah dilengkapi dengan sistem basis data 16 tabel, isolasi keamanan *Row Level Security (RLS)*, dan *stored procedure atomic row-locking* anti-double booking.

### Langkah Setup Supabase:
1. Buka [https://supabase.com](https://supabase.com) dan buat akun (gratis).
2. Klik **"New Project"**, beri nama proyek (misal: `homiq-garut-property`), buat password database, dan pilih region terdekat (misal: `Singapore (ap-southeast-1)`).
3. Setelah database siap, buka menu **SQL Editor** di sidebar kiri.
4. Klik **"New Query"**:
   * Salin seluruh isi file `supabase/migrations/01_schema.sql` lalu tempelkan di SQL Editor.
   * Klik tombol **"Run"** (Membuat 16 tabel, Enums, RLS policies, dan Stored Procedure `create_unit_booking_tx`).
5. Buat Query baru lagi:
   * Salin seluruh isi file `supabase/migrations/02_seeder_demo.sql` lalu tempelkan di SQL Editor.
   * Klik tombol **"Run"** (Mengisi 75 unit kavling, prospek leads, data pemesanan, dan akun staf).
6. Buka menu **Project Settings** (ikon gerigi) $\rightarrow$ **API**:
   * Salin **Project URL** (contoh: `https://abcdefghijkl.supabase.co`).
   * Salin **anon / public key**.
7. Buka file `.env.local` di project Next.js Anda (atau Environment Variables di Vercel):
   ```env
   NEXT_PUBLIC_SUPABASE_URL="https://abcdefghijkl.supabase.co"
   NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
   ```

---

## 🌐 3. Menghubungkan Domain Kustom Perusahaan (Custom Domain)

Jika developer perumahan Anda memiliki domain sendiri (misal: `crm.garutsejahtera.co.id` atau `homiq.id`):

1. Buka dashboard Vercel $\rightarrow$ Proyek Anda $\rightarrow$ **Settings** $\rightarrow$ **Domains**.
2. Masukkan nama domain atau subdomain Anda (contoh: `crm.garutsejahtera.co.id`), lalu klik **Add**.
3. Buka panel DNS tempat Anda membeli domain (misal: Niagahoster, Domainesia, Rumahweb, Cloudflare):
   * Tambahkan DNS Record tipe **CNAME**:
     * **Name / Host**: `crm`
     * **Value / Target**: `cname.vercel-dns.com`
     * **TTL**: Automatic / 3600
4. Tunggu propagasi DNS (biasanya 5–15 menit). Vercel akan otomatis menerbitkan sertifikat SSL HTTPS gratis dari Let's Encrypt.

---

## 📱 4. Cara Instalasi PWA di Ponsel Klien & Konsumen

Aplikasi HOMIQ dapat langsung diinstal seperti aplikasi Android (APK) atau iOS app tanpa harus masuk ke Google Play Store / Apple App Store:

### Pada Perangkat Android (Google Chrome):
1. Buka alamat aplikasi HOMIQ di Google Chrome.
2. Ketuk ikon titik tiga (⋮) di pojok kanan atas browser.
3. Pilih menu **"Tambahkan ke Layar Utama" (Add to Home screen)** atau **"Instal Aplikasi"**.
4. Ikon HOMIQ dengan logo resmi akan muncul di halaman beranda ponsel Anda dan dapat dibuka layar penuh (*full screen*).

### Pada Perangkat iPhone / iPad (Safari):
1. Buka alamat aplikasi HOMIQ di browser Safari.
2. Ketuk tombol **Bagikan (Share)** (ikon kotak dengan panah ke atas di bagian bawah layar).
3. Gulir ke bawah lalu pilih **"Tambah ke Layar Utama" (Add to Home Screen)**.
4. Ketuk **Tambah (Add)** di pojok kanan atas.

---

## 🔒 5. Checklist Verifikasi Sebelum Go-Live Produksi

Sebelum mengundang jajaran direksi developer atau bank rekanan:
- [x] TypeScript compilation lulus tanpa error (`npm run typecheck` $\rightarrow$ 0 error).
- [x] Webhook simulasi iklan Meta Ads & TikTok Ads berfungsi normal di `/leads`.
- [x] Proteksi transaksional row-locking anti double-booking aktif di `/projects`.
- [x] Dokumen resmi (SPK, PPJB, BAST, BAPF Bank) rapi pada kertas cetak standar A4.
- [x] e-Meterai Peruri Rp 10.000 dan verifikasi digital tanda tangan terpasang.
- [x] Portal mandiri konsumen `/portal-kpr` dapat dibuka dari smartphone tanpa kendala.
- [x] Nomor WhatsApp dikonfigurasi ke format standar Indonesia (`+628...`).

---
*Dokumen resmi deployment HOMIQ PropTech Platform v1.2.*
