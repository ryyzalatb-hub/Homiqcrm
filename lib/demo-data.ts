import { Project, Unit, Lead, Booking } from '@/types';

export interface SiteVisit {
  id: string;
  lead_name: string;
  phone: string;
  project_name: string;
  unit_code?: string;
  scheduled_at: string;
  marketing_name: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes: string;
}

export const DEMO_PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Bumi Cimanuk Asri',
    location: 'Tarogong Kidul',
    city: 'Kabupaten Garut',
    description: 'Hunian subsidi FLPP strategis 5 menit dari pusat Pemda Garut.',
    facilities: ['Masjid Al-Ikhlas', 'Taman Bermain Anak', 'One Gate System', 'CCTV 24 Jam'],
    total_units: 30,
    available_units: 25
  },
  {
    id: 'p2',
    name: 'Grand Karangpawitan Residence',
    location: 'Karangpawitan',
    city: 'Kabupaten Garut',
    description: 'Perumahan komersial modern view perbukitan asri bebas banjir.',
    facilities: ['Masjid Jami', 'Row Jalan 8 Meter', 'Security 24 Jam', 'Playground'],
    total_units: 25,
    available_units: 21
  },
  {
    id: 'p3',
    name: 'Banyuresmi Hillside',
    location: 'Banyuresmi',
    city: 'Kabupaten Garut',
    description: 'Hunian asri keluarga muda dekat kawasan wisata Situ Bagendit.',
    facilities: ['Taman Tematik', 'Jogging Track', 'Musholla Warga'],
    total_units: 20,
    available_units: 19
  }
];

export const DEMO_LEADS: Lead[] = [
  {
    id: 'l-hasanudin',
    full_name: 'Bapak Hasanudin',
    phone: '6282215269402',
    source: 'WhatsApp Inbound',
    assigned_to_name: 'Kang Dika Pratama',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'high',
    status: 'interested',
    last_contacted: 'Hari ini, 09:30',
    next_follow_up: 'Hari ini, 13:00',
    notes: 'Minat kuat unit subsidi Tipe 36/60, request simulasi angsuran BTN Syariah & jadwal survei.'
  },
  {
    id: 'l-nugraha',
    full_name: 'Bapak Nugraha',
    phone: '6283138320817',
    source: 'Meta Ads',
    assigned_to_name: 'Teh Nisa Andriani',
    project_name: 'Grand Karangpawitan Residence',
    budget: 345000000,
    priority: 'high',
    status: 'site_visit',
    last_contacted: 'Hari ini, 10:15',
    next_follow_up: 'Besok, 14:00',
    notes: 'Minat unit komersial Tipe 45/72, konfirmasi jadwal survei kavling Blok B-05 bersama keluarga.'
  },
  {
    id: 'l-sitipatonah',
    full_name: 'Ibu Siti Patonah',
    phone: '6283857061667',
    source: 'Instagram Ads',
    assigned_to_name: 'Kang Fajar Ramadhan',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'high',
    status: 'booking',
    last_contacted: 'Hari ini, 11:00',
    next_follow_up: 'Hari ini, 16:00',
    notes: 'Memilih kavling Blok A-07 (Tipe 36/60), persiapan berkas KPR FLPP Bank BTN KC Garut.'
  },
  {
    id: 'l-azharpratama',
    full_name: 'Om Azhar Pratama',
    phone: '62895704969810',
    source: 'Walk-In Kantor',
    assigned_to_name: 'Kang Dika Pratama',
    project_name: 'Banyuresmi Hillside',
    budget: 485000000,
    priority: 'high',
    status: 'negotiation',
    last_contacted: 'Kemarin, 15:30',
    next_follow_up: 'Hari ini, 15:30',
    notes: 'Minat Tipe 54/84 Villa Asri dekat Situ Bagendit, negosiasi skema pembayaran & fasilitas hook.'
  },
  {
    id: 'l-anggijulianti',
    full_name: 'Neng Anggi Julianti',
    phone: '628886066919',
    source: 'TikTok Ads',
    assigned_to_name: 'Teh Nisa Andriani',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'high',
    status: 'new_lead',
    last_contacted: 'Hari ini, 11:45',
    next_follow_up: 'Hari ini, 14:30',
    notes: 'Lead baru masuk kampanye FLPP Garut, konsultasi syarat batas usia & penghasilan single worker.'
  },
  {
    id: 'l1',
    full_name: 'Bapak Agus Setiawan',
    phone: '6281223456789',
    source: 'Meta Ads',
    assigned_to_name: 'Kang Dika Pratama',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'high',
    status: 'site_visit',
    last_contacted: '02-11-2026',
    next_follow_up: 'Hari ini, 14:00',
    notes: 'Jadwal survei lokasi Blok A-06 bersama istri.'
  },
  {
    id: 'l2',
    full_name: 'Ibu Siti Nurhaliza',
    phone: '6282119876543',
    source: 'Instagram Ads',
    assigned_to_name: 'Teh Nisa Andriani',
    project_name: 'Grand Karangpawitan Residence',
    budget: 345000000,
    priority: 'high',
    status: 'negotiation',
    last_contacted: '01-11-2026',
    next_follow_up: 'Hari ini, 16:30',
    notes: 'Menanyakan skema DP bertahap 6 kali untuk kavling B-04.'
  },
  {
    id: 'l3',
    full_name: 'Bapak Rudi Hermawan',
    phone: '6285223344556',
    source: 'Brosur Pameran IBC',
    assigned_to_name: 'Kang Fajar Ramadhan',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'medium',
    status: 'contacted',
    last_contacted: '28-10-2026',
    next_follow_up: 'Terlambat (30-10-2026)',
    notes: 'Sudah kirim brosur PDF, minta ditelepon ulang setelah gajian.'
  },
  {
    id: 'l4',
    full_name: 'Ibu Dewi Sartika',
    phone: '6281399887766',
    source: 'Walk-In Kantor',
    assigned_to_name: 'Kang Dika Pratama',
    project_name: 'Banyuresmi Hillside',
    budget: 485000000,
    priority: 'high',
    status: 'booking',
    last_contacted: '02-11-2026',
    next_follow_up: 'Besok, 10:00',
    notes: 'Sudah transfer booking fee Rp 2.500.000 untuk Blok C-01.'
  },
  {
    id: 'l5',
    full_name: 'Kang Asep Sopian',
    phone: '6287766554433',
    source: 'TikTok Ads',
    assigned_to_name: 'Teh Nisa Andriani',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'low',
    status: 'new_lead',
    last_contacted: '-',
    next_follow_up: 'Hari ini, 11:00',
    notes: 'Lead baru masuk dari kampanye subsidi FLPP, perlu dikontak pertama.'
  },
  {
    id: 'l6',
    full_name: 'Kang Deni Mulyadi',
    phone: '6281987654321',
    source: 'Google Ads',
    assigned_to_name: 'Kang Dika Pratama',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'high',
    status: 'interested',
    last_contacted: '03-11-2026',
    next_follow_up: 'Hari ini, 15:00',
    notes: 'Sangat berminat Tipe 36/60 subsidi, minta dikirimkan simulasi cicilan BTN.'
  },
  {
    id: 'l7',
    full_name: 'Bapak Irwan Santoso',
    phone: '6281233445599',
    source: 'Meta Ads',
    assigned_to_name: 'Kang Fajar Ramadhan',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'high',
    status: 'closing',
    last_contacted: '15-10-2026',
    next_follow_up: 'Selesai (Sudah Akad)',
    notes: 'Telah melaksanakan akad kredit FLPP Bank BTN untuk unit Blok A-02.'
  },
  {
    id: 'l8',
    full_name: 'Ibu Lilis Karlina',
    phone: '6281244556677',
    source: 'Instagram Ads',
    assigned_to_name: 'Teh Nisa Andriani',
    project_name: 'Grand Karangpawitan Residence',
    budget: 345000000,
    priority: 'high',
    status: 'closing',
    last_contacted: '20-10-2026',
    next_follow_up: 'Selesai (Sudah Akad)',
    notes: 'Akad kredit KPR Komersial Mandiri selesai untuk unit Blok B-01.'
  },
  {
    id: 'l9',
    full_name: 'Bapak Hendra Lesmana',
    phone: '6281355667788',
    source: 'Walk-In Kantor',
    assigned_to_name: 'Kang Dika Pratama',
    project_name: 'Bumi Cimanuk Asri',
    budget: 166000000,
    priority: 'high',
    status: 'closing',
    last_contacted: '25-10-2026',
    next_follow_up: 'Selesai (Sudah Akad)',
    notes: 'Pelunasan Cash Keras untuk unit Blok A-01.'
  }
];

export const DEMO_BOOKINGS: Booking[] = [
  {
    id: 'b-sitipatonah',
    booking_code: 'BOK-202611-005',
    customer_name: 'Ibu Siti Patonah',
    customer_phone: '6283857061667',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-07',
    marketing_name: 'Kang Fajar Ramadhan',
    price: 166000000,
    booking_fee: 1500000,
    payment_method: 'KPR Subsidi FLPP',
    payment_status: 'Lunas Booking',
    akad_status: 'Pemberkasan',
    booked_at: '03-11-2026'
  },
  {
    id: 'b1',
    booking_code: 'BOK-202611-001',
    customer_name: 'Ibu Dewi Sartika',
    customer_phone: '6281399887766',
    project_name: 'Banyuresmi Hillside',
    unit_code: 'Blok C-01',
    marketing_name: 'Kang Dika Pratama',
    price: 485000000,
    booking_fee: 2500000,
    payment_method: 'KPR Komersial',
    payment_status: 'Lunas Booking',
    akad_status: 'Pemberkasan',
    booked_at: '02-11-2026'
  },
  {
    id: 'b2',
    booking_code: 'BOK-202610-042',
    customer_name: 'Bapak Irwan Santoso',
    customer_phone: '6281233445599',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-02',
    marketing_name: 'Kang Fajar Ramadhan',
    price: 166000000,
    booking_fee: 1000000,
    payment_method: 'KPR Subsidi FLPP',
    payment_status: 'Lunas DP',
    akad_status: 'Sudah Akad',
    booked_at: '15-10-2026'
  },
  {
    id: 'b3',
    booking_code: 'BOK-202610-038',
    customer_name: 'Ibu Lilis Karlina',
    customer_phone: '6281244556677',
    project_name: 'Grand Karangpawitan Residence',
    unit_code: 'Blok B-01',
    marketing_name: 'Teh Nisa Andriani',
    price: 345000000,
    booking_fee: 2000000,
    payment_method: 'KPR Komersial',
    payment_status: 'Lunas DP',
    akad_status: 'Sudah Akad',
    booked_at: '20-10-2026'
  },
  {
    id: 'b4',
    booking_code: 'BOK-202610-031',
    customer_name: 'Bapak Hendra Lesmana',
    customer_phone: '6281355667788',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-01',
    marketing_name: 'Kang Dika Pratama',
    price: 166000000,
    booking_fee: 5000000,
    payment_method: 'Cash Keras',
    payment_status: 'Lunas Penuh',
    akad_status: 'Sudah Akad',
    booked_at: '25-10-2026'
  }
];

export const DEMO_SITE_VISITS: SiteVisit[] = [
  {
    id: 'sv-nugraha',
    lead_name: 'Bapak Nugraha',
    phone: '6283138320817',
    project_name: 'Grand Karangpawitan Residence',
    unit_code: 'Blok B-05',
    scheduled_at: 'Besok, 14:00 WIB',
    marketing_name: 'Teh Nisa Andriani',
    status: 'scheduled',
    notes: 'Kunjungan show unit komersial Tipe 45/72 bersama keluarga.'
  },
  {
    id: 'sv-hasanudin',
    lead_name: 'Bapak Hasanudin',
    phone: '6282215269402',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-08',
    scheduled_at: '05-11-2026, 10:00 WIB',
    marketing_name: 'Kang Dika Pratama',
    status: 'scheduled',
    notes: 'Survei lokasi kavling subsidi Tipe 36/60 & cek akses jalan utama.'
  },
  {
    id: 'sv1',
    lead_name: 'Bapak Agus Setiawan',
    phone: '6281223456789',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-06',
    scheduled_at: 'Hari ini, 14:00 WIB',
    marketing_name: 'Kang Dika Pratama',
    status: 'scheduled',
    notes: 'Survei unit subsidi Tipe 36/60 bersama keluarga.'
  },
  {
    id: 'sv2',
    lead_name: 'Ibu Siti Nurhaliza',
    phone: '6282119876543',
    project_name: 'Grand Karangpawitan Residence',
    unit_code: 'Blok B-04',
    scheduled_at: 'Besok, 10:00 WIB',
    marketing_name: 'Teh Nisa Andriani',
    status: 'scheduled',
    notes: 'Kunjungan show unit komersial 45/72.'
  },
  {
    id: 'sv3',
    lead_name: 'Kang Deni Mulyadi',
    phone: '6281987654321',
    project_name: 'Bumi Cimanuk Asri',
    unit_code: 'Blok A-10',
    scheduled_at: '05-11-2026, 13:30 WIB',
    marketing_name: 'Kang Dika Pratama',
    status: 'scheduled',
    notes: 'Cek lokasi kavling sudut / hook.'
  }
];

export const DEMO_KPI = {
  total_customers: 31,
  total_leads: 50,
  new_leads: 9,
  follow_up_today: 8,
  follow_up_overdue: 3,
  total_projects: 3,
  total_units: 75,
  available_units: 64,
  booked_units: 8,
  sold_units: 3,
  total_booking_fee: 14000000,
  total_closing_value: 677000000 // 166M + 345M + 166M (Blok A-01, A-02, B-01)
};
