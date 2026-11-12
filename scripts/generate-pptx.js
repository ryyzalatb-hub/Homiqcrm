const path = require('path');
const fs = require('fs');
const pptxgen = require('pptxgenjs');

async function createPresentation() {
  const pptx = new pptxgen();

  // Set 16:9 widescreen dimensions (13.33 x 7.5 inches)
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = 'Homiiq Smart Property CRM - Presentasi Mata Kuliah CRM';
  pptx.author = 'MUHAMMAD RIZAL';
  pptx.company = 'Homiiq PropTech / PT Garut Sejahtera Propertindo';

  // Palette definitions
  const BG_COLOR = '060913';
  const CARD_BG = '0C1222';
  const CARD_BORDER = '2A2415';
  const GOLD_PRIMARY = 'D4AF37';
  const GOLD_LIGHT = 'E5C07B';
  const TEXT_WHITE = 'F8FAFC';
  const TEXT_MUTED = '94A3B8';
  const TEXT_BODY = 'E2E8F0';
  const ACCENT_EMERALD = '10B981';

  const slidesData = [
    {
      num: '01',
      tag: 'TUGAS MATA KULIAH CRM • PROPOSAL PROYEK',
      title: 'Homiiq: Smart Property CRM',
      subtitle: 'Solusi Digital Terpadu Manajemen Pemasaran & Relasi Pelanggan Real Estate',
      points: [
        {
          label: 'Platform Properti Terintegrasi',
          desc: 'Solusi platform digital modern untuk mentransformasi tata kelola operasional pemasaran dan relasi pelanggan di industri properti.'
        },
        {
          label: 'Kavling Real-Time & Finansial',
          desc: 'Mengintegrasikan pengelolaan inventaris unit kavling dinamis, kualifikasi prospek konsumen, hingga simulasi pembiayaan secara real-time.'
        },
        {
          label: 'Ekosistem Akuntabel & Transparan',
          desc: 'Dirancang untuk menciptakan ekosistem transaksi properti yang transparan, terstruktur, dan akuntabel bagi developer maupun agen.'
        }
      ]
    },
    {
      num: '02',
      tag: 'ANALISIS MASALAH • LATAR BELAKANG',
      title: 'Tantangan Manajemen Properti Konvensional',
      subtitle: 'Inefisiensi Pendataan Manual dan Risiko Fatal Operasional Lapangan',
      points: [
        {
          label: 'Fragmentasi & Kehilangan Data',
          desc: 'Pencatatan data klien yang manual via spreadsheet dan buku fisik rentan memicu inkonsistensi serta hilangnya riwayat komunikasi prospek.'
        },
        {
          label: 'Risiko Double-Booking Kavling',
          desc: 'Manajemen ketersediaan unit yang tidak terpusat kerap menimbulkan insiden fatal pemesanan ganda (double-booking) antar tenaga pemasar.'
        },
        {
          label: 'Visibilitas Manajemen Rendah',
          desc: 'Ketiadaan laporan data terpusat menghambat jajaran manajemen dalam mengevaluasi efektivitas pemasaran dan laju konversi penjualan.'
        }
      ]
    },
    {
      num: '03',
      tag: 'STRATEGI & FUNGSI • SOLUSI APLIKASI',
      title: 'Penyederhanaan Alur Kerja Terpusat',
      subtitle: 'Satu Pusat Komando Digital untuk Seluruh Siklus Interaksi Penjualan',
      points: [
        {
          label: 'Sentralisasi Saluran Interaksi',
          desc: 'Homiiq menyatukan seluruh siklus interaksi agen dan calon pembeli ke dalam satu pusat komando operasional digital yang terstandarisasi.'
        },
        {
          label: 'Eliminasi Informasi Terpisah',
          desc: 'Sistem mengeliminasi fragmentasi informasi melalui sentralisasi basis data kavling, status negosiasi, dan jadwal tindak lanjut (follow-up).'
        },
        {
          label: 'Koordinasi Lintas Divisi',
          desc: 'Memfasilitasi koordinasi lintas divisi mulai dari tim pemasaran lapangan, legalitas dokumen, hingga verifikasi berkas perbankan.'
        }
      ]
    },
    {
      num: '04',
      tag: 'ANALISIS STAKEHOLDER • TARGET PENGGUNA',
      title: 'Segmentasi Pengguna Platform Homiiq',
      subtitle: 'Dirancang Khusus Menjawab Kebutuhan Tiga Entitas Utama Industri',
      points: [
        {
          label: 'Pengembang Properti (Developers)',
          desc: 'Membutuhkan kontrol penuh atas siteplan kavling, transparansi perputaran arus kas transaksi, dan analisis serapan unit di pasar.'
        },
        {
          label: 'Agen & Broker Properti Independen',
          desc: 'Memerlukan alat bantu mobilitas tinggi untuk mengelola basis prospek pribadi serta sistem pengingat komunikasi terjadwal.'
        },
        {
          label: 'Konsumen Calon Pembeli (Homebuyers)',
          desc: 'Memperoleh transparansi riwayat berkas kepemilikan, kepastian ketersediaan unit hunian, dan kalkulasi simulasi KPR yang akurat.'
        }
      ]
    },
    {
      num: '05',
      tag: 'KAPABILITAS SISTEM • FITUR UTAMA',
      title: 'Tiga Pilar Fungsionalitas Inti CRM',
      subtitle: 'Fitur Unggulan untuk Mengoptimalkan Produktivitas dan Rasio Konversi',
      points: [
        {
          label: 'Manajemen Prospek & Lead Scoring',
          desc: 'Pencatatan terstruktur data calon pembeli disertai algoritma parameter skor kesiapan finansial untuk menentukan prioritas follow-up.'
        },
        {
          label: 'Katalog Unit & Siteplan Digital 2D',
          desc: 'Visualisasi inventaris kavling interaktif lengkap dengan spesifikasi fisik, denah arsitektur, dan status ketersediaan dinamis.'
        },
        {
          label: 'Riwayat Interaksi & Otomasi Kontak',
          desc: 'Dokumentasi menyeluruh riwayat kontak konsumen, pengajuan berkas KPR, serta integrasi pesan langsung ke WhatsApp calon pembeli.'
        }
      ]
    },
    {
      num: '06',
      tag: 'VISUALISASI PRODUK • DEMO ANTARMUKA',
      title: 'Visualisasi Dasbor Eksekutif Homiiq',
      subtitle: 'Estetika Ultra-Luxury Obsidian Gold dengan Hierarki Informasi yang Intuitif',
      points: [
        {
          label: 'Desain Dark Luxury Antarmuka',
          desc: 'Antarmuka web mengadopsi estetika luxury dark theme (Obsidian Slate & Champagne Gold) yang elegan dan nyaman bagi mata pengguna.'
        },
        {
          label: 'Metrik Performa Eksekutif (KPI)',
          desc: 'Dasbor menampilkan ringkasan metrik performa utama mencakup Gross Development Value (GDV), rasio serapan, dan efektivitas agen.'
        },
        {
          label: 'Floating AI Assistant Fleksibel',
          desc: 'Dilengkapi asisten AI ringkas yang bebas digeser kemana saja pada layar guna mendukung operasional tanpa menghalangi visual data.'
        }
      ]
    },
    {
      num: '07',
      tag: 'USER JOURNEY • ALUR PENGGUNA',
      title: 'Tahapan Siklus Konversi Penjualan',
      subtitle: 'Alur Sistematis dari Kontak Pertama Calon Pembeli hingga Closing Pembelian',
      points: [
        {
          label: '1. Inisiasi & Kualifikasi Prospek',
          desc: 'Data prospek masuk melalui kanal pemasaran dan langsung diklasifikasikan ke dalam sistem berdasarkan profil preferensi hunian.'
        },
        {
          label: '2. Eksplorasi Siteplan & Negosiasi',
          desc: 'Agen memaparkan ketersediaan kavling melalui siteplan interaktif dan menyusun rincian simulasi angsuran pembiayaan konsumen.'
        },
        {
          label: '3. Konversi & Penguncian Unit Instan',
          desc: 'Pembayaran booking fee mengunci unit di basis data secara instan untuk mencegah benturan transaksi hingga SPK resmi diterbitkan.'
        }
      ]
    },
    {
      num: '08',
      tag: 'REKAYASA SISTEM • ARSITEKTUR TEKNOLOGI',
      title: 'Fondasi Komputasi & Rekayasa Perangkat Lunak',
      subtitle: 'Teknologi Web Modern, Skalabel, dan Teroptimasi untuk Skala Komersial',
      points: [
        {
          label: 'Next.js 14 & React Framework',
          desc: 'Dibangun menggunakan kerangka kerja modern Next.js yang menjamin performa rendering cepat dan keamanan kode berstandar industri.'
        },
        {
          label: 'Tailwind CSS Modular Styling',
          desc: 'Desain modular ditopang Tailwind CSS dengan arsitektur komponen terstandarisasi, adaptif di layar laptop maupun ponsel cerdas.'
        },
        {
          label: 'Optimasi AI Platform Antigravity',
          desc: 'Efisiensi penulisan kode, penataan arsitektur, dan inspeksi integritas sistem dioptimalkan secara komprehensif via Antigravity.'
        }
      ]
    },
    {
      num: '09',
      tag: 'DEVOPS & CLOUD • INFRASTRUKTUR SISTEM',
      title: 'Pengelolaan Repositori & Publikasi Cloud',
      subtitle: 'Alur Kerja Continuous Integration & Continuous Deployment (CI/CD) Otomatis',
      points: [
        {
          label: 'Version Control via GitHub',
          desc: 'Manajemen kode sumber dikelola secara kolaboratif melalui GitHub dengan mekanisme version control yang rapi dan terverifikasi.'
        },
        {
          label: 'Otomasi CI/CD Menuju Vercel',
          desc: 'Jalur otomatisasi Continuous Deployment terhubung langsung ke infrastruktur cloud Vercel untuk membangun paket produksi secara instan.'
        },
        {
          label: 'Ketersediaan Global Berlatensi Rendah',
          desc: 'Menghasilkan aplikasi web produksi berkecepatan tinggi yang dapat diakses publik secara live tanpa kendala latensi server.'
        }
      ]
    },
    {
      num: '10',
      tag: 'EVALUASI NILAI TAMBAH • ANALISIS EFISIENSI',
      title: 'Komparasi Efisiensi Homiiq vs Tradisional',
      subtitle: 'Bukti Kuantitatif Keunggulan Sistem CRM Digital Terpadu',
      points: [
        {
          label: 'Reduksi Waktu Operasional > 80%',
          desc: 'Memangkas waktu pencarian berkas fisik dan verifikasi status ketersediaan kavling secara signifikan dari jam menjadi hitungan detik.'
        },
        {
          label: 'Eliminasi Risiko Double-Booking (0%)',
          desc: 'Mekanisme penguncian data transaksional otomatis berhasil menghapus total potensi kerugian finansial akibat konflik kavling ganda.'
        },
        {
          label: 'Akselerasi Rasio Closing Penjualan',
          desc: 'Respon tindak lanjut calon pembeli menjadi lebih cepat dan presisi, secara langsung mendongkrak persentase konversi penjualan properti.'
        }
      ]
    },
    {
      num: '11',
      tag: 'PETA JALAN INOVASI • RENCANA PENGEMBANGAN',
      title: 'Target Pengembangan Fitur Masa Depan',
      subtitle: 'Evolusi Menuju Smart Autonomous Property CRM Berbasis Kecerdasan Buatan',
      points: [
        {
          label: 'Kualifikasi KPR via Machine Learning',
          desc: 'Penerapan model analitik prediktif untuk menakar kelayakan profil kredit calon debitur sebelum pengajuan berkas ke pihak bank.'
        },
        {
          label: 'AI WhatsApp Drip-Campaign Terjadwal',
          desc: 'Integrasi kampanye pesan otomatis berbasis AI untuk merawat prospek calon pembeli secara berkala dengan pendekatan personal.'
        },
        {
          label: 'Kontrak Digital Bersertifikat (E-Sign)',
          desc: 'Fasilitas penandatanganan SPK dan perjanjian digital berkekuatan hukum dengan e-meterai resmi untuk kemudahan transaksi jarak jauh.'
        }
      ]
    },
    {
      num: '12',
      tag: 'PENUTUP & SINTESIS • KESIMPULAN',
      title: 'Sintesis Efisiensi Operasional Homiiq',
      subtitle: 'Transformasi Digital Berkelanjutan untuk Keunggulan Kompetitif Industri Properti',
      points: [
        {
          label: 'Digitalisasi Menyeluruh Rantai Nilai',
          desc: 'Homiiq Smart Property CRM berhasil mendigitalisasi rantai nilai pemasaran properti menjadi lebih terstruktur, cepat, dan akuntabel.'
        },
        {
          label: 'Fondasi Teknologi Siap Produksi',
          desc: 'Sinergi Next.js, GitHub, dan Vercel membuktikan keandalan sistem dalam mendukung skala komersial developer perumahan modern.'
        },
        {
          label: 'Dampak Nyata Keunggulan Bisnis',
          desc: 'Implementasi platform ini menghadirkan keunggulan kompetitif konkret dalam menaikkan efisiensi kerja agen serta profitabilitas perusahaan.'
        }
      ]
    }
  ];

  for (let i = 0; i < slidesData.length; i++) {
    const data = slidesData[i];
    const slide = pptx.addSlide();

    // Background color: Obsidian Deep Slate
    slide.background = { color: BG_COLOR };

    // Ambient Top Accent Bar (Champagne Gold Gradient simulation)
    slide.addShape(pptx.shapes.RECTANGLE, {
      x: 0,
      y: 0,
      w: 13.33,
      h: 0.08,
      fill: { color: GOLD_PRIMARY },
      line: { color: GOLD_PRIMARY, width: 0 }
    });

    // Tag / Category Pill
    slide.addText(data.tag, {
      x: 0.8,
      y: 0.5,
      w: 10.0,
      h: 0.3,
      fontSize: 10,
      fontFace: 'Calibri',
      color: GOLD_LIGHT,
      bold: true,
      charSpacing: 2
    });

    // Slide Title (Editorial Luxury Headline)
    slide.addText(data.title, {
      x: 0.8,
      y: 0.8,
      w: 11.0,
      h: 0.7,
      fontSize: 24,
      fontFace: 'Georgia',
      color: TEXT_WHITE,
      bold: true
    });

    // Slide Subtitle
    slide.addText(data.subtitle, {
      x: 0.8,
      y: 1.5,
      w: 11.5,
      h: 0.35,
      fontSize: 12,
      fontFace: 'Calibri',
      color: GOLD_LIGHT,
      italic: true
    });

    // 3 Cards Layout (Horizontal Row)
    const cardWidth = 3.65;
    const cardHeight = 4.3;
    const cardGap = 0.35;
    const startX = 0.8;
    const cardY = 2.1;

    for (let j = 0; j < data.points.length; j++) {
      const pt = data.points[j];
      const curX = startX + j * (cardWidth + cardGap);

      // Card Background Box
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: curX,
        y: cardY,
        w: cardWidth,
        h: cardHeight,
        fill: { color: CARD_BG },
        line: { color: CARD_BORDER, width: 1.2 },
        rectRadius: 0.15
      });

      // Card Header Number Badge
      slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
        x: curX + 0.3,
        y: cardY + 0.3,
        w: 0.75,
        h: 0.35,
        fill: { color: '1A150A' },
        line: { color: GOLD_PRIMARY, width: 1 },
        rectRadius: 0.08
      });

      slide.addText(`0${j + 1}`, {
        x: curX + 0.3,
        y: cardY + 0.3,
        w: 0.75,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Calibri',
        color: GOLD_PRIMARY,
        bold: true,
        align: 'center',
        valign: 'middle'
      });

      // Card Point Label / Title
      slide.addText(pt.label, {
        x: curX + 0.3,
        y: cardY + 0.85,
        w: cardWidth - 0.6,
        h: 0.65,
        fontSize: 14,
        fontFace: 'Georgia',
        color: TEXT_WHITE,
        bold: true,
        valign: 'top'
      });

      // Decorative divider inside card
      slide.addShape(pptx.shapes.LINE, {
        x: curX + 0.3,
        y: cardY + 1.55,
        w: cardWidth - 0.6,
        h: 0,
        line: { color: '20293A', width: 0.8 }
      });

      // Card Point Description Text
      slide.addText(pt.desc, {
        x: curX + 0.3,
        y: cardY + 1.75,
        w: cardWidth - 0.6,
        h: 2.2,
        fontSize: 11.5,
        fontFace: 'Calibri',
        color: TEXT_BODY,
        valign: 'top',
        lineSpacingMultiple: 1.2
      });
    }

    // Bottom Footer Bar
    slide.addShape(pptx.shapes.LINE, {
      x: 0.8,
      y: 6.8,
      w: 11.73,
      h: 0,
      line: { color: '1E293B', width: 0.8 }
    });

    slide.addText('HOMIIQ SMART PROPERTY CRM • CUSTOMER RELATIONSHIP MANAGEMENT TUGAS AKADEMIS', {
      x: 0.8,
      y: 6.9,
      w: 8.0,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Calibri',
      color: TEXT_MUTED
    });

    slide.addText(`SLIDE ${data.num} / 12`, {
      x: 10.53,
      y: 6.9,
      w: 2.0,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Calibri',
      color: GOLD_PRIMARY,
      bold: true,
      align: 'right'
    });
  }

  // Save to Brain Artifact directory and Project public directory
  const artifactPath = path.resolve('C:/Users/ASUS/.gemini/antigravity/brain/73f17233-aa9a-4722-bc1a-2815b674d2b6/Homiiq_Smart_Property_CRM_Presentation.pptx');
  const projectPublicPath = path.resolve(__dirname, '../public/Homiiq_Smart_Property_CRM_Presentation.pptx');

  await pptx.writeFile({ fileName: artifactPath });
  console.log(`[OK] PPTX generated successfully at: ${artifactPath}`);

  // Also copy to public directory for direct live browser download
  try {
    fs.copyFileSync(artifactPath, projectPublicPath);
    console.log(`[OK] Copied PPTX to public folder for live web download: ${projectPublicPath}`);
  } catch (err) {
    console.warn(`[WARN] Could not copy to public folder: ${err.message}`);
  }
}

createPresentation().catch(err => {
  console.error('[FAIL] Error generating PPTX:', err);
  process.exit(1);
});
