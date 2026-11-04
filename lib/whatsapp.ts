/**
 * Helper utility for WhatsApp formatting and Click-to-WA message generation.
 * Handles Indonesian telephone format standards (628...) and URL-safe templating.
 */

/**
 * Normalizes phone number into international WhatsApp standard (e.g. 628xxxxxxxxxx).
 * Handles formats like:
 * - "0812-3456-7890" -> "6281234567890"
 * - "+62 812 3456 7890" -> "6281234567890"
 * - "+62 0812 3456 7890" -> "6281234567890" (trunk 0 edge case)
 * - "81234567890" -> "6281234567890"
 * - "006281234567890" -> "6281234567890"
 * - "6281234567890" -> "6281234567890"
 */
export function formatWhatsAppNumber(rawPhone: string): string {
  if (!rawPhone) return '';

  // Remove any non-digits
  let cleaned = rawPhone.replace(/\D/g, '');

  // Strip international call prefix 00 (e.g. 0062...)
  if (cleaned.startsWith('0062')) {
    cleaned = cleaned.slice(2);
  }

  // Handle standard Indonesian phone patterns
  if (cleaned.startsWith('620')) {
    // Edge case: +62 0812... -> 620812... -> 62812...
    cleaned = '62' + cleaned.slice(3);
  } else if (cleaned.startsWith('0')) {
    // 0812... -> 62812...
    cleaned = '62' + cleaned.slice(1);
  } else if (cleaned.startsWith('8')) {
    // 812... -> 62812...
    cleaned = '62' + cleaned;
  }

  return cleaned;
}

/**
 * Formats a phone number for display (e.g. "+62 812-3456-7890")
 */
export function formatPhoneDisplay(rawPhone: string): string {
  const normalized = formatWhatsAppNumber(rawPhone);
  if (!normalized) return '-';
  if (normalized.startsWith('62') && normalized.length >= 10) {
    const prefix = '+62';
    const operator = normalized.slice(2, 5);
    const middle = normalized.slice(5, 9);
    const rest = normalized.slice(9);
    return `${prefix} ${operator}-${middle}-${rest}`;
  }
  return rawPhone;
}

/**
 * Builds standard Click-to-WA URL with properly encoded message.
 */
export function buildWhatsAppLink(rawPhone: string, message: string): string {
  const formattedNumber = formatWhatsAppNumber(rawPhone);
  const encodedText = encodeURIComponent(message.trim());
  return `https://wa.me/${formattedNumber}?text=${encodedText}`;
}

/**
 * Property Real Estate Template Generators
 */
export const WhatsAppTemplates = {
  followUp: (leadName: string, projectName: string, marketingName = 'Tim Marketing HOMIQ') => {
    return `Halo Bapak/Ibu ${leadName}, salam hangat dari ${marketingName} (Garut Sejahtera Property).

Kami ingin menanyakan kabar dan kelanjutan rencana hunian impian Anda di perumahan *${projectName}*. 

Apakah ada hal yang ingin ditanyakan terkait simulasi cicilan KPR, denah unit, atau promo DP minggu ini? Kami siap membantu dengan senang hati 🙏`;
  },

  siteVisitInvitation: (leadName: string, projectName: string, location = 'Garut', visitTime = 'minggu ini') => {
    return `Halo Bapak/Ibu ${leadName}, 

Terima kasih atas minat Anda pada proyek *${projectName}* di ${location}.

Kami mengundang Bapak/Ibu untuk survei lokasi langsung dan melihat unit rumah contoh serta progres fasilitas lingkungan (${visitTime}). Kapan kira-kira waktu luang yang nyaman untuk Bapak/Ibu?

Konfirmasi jadwal bisa dibalas langsung melalui pesan ini. Terima kasih! 🙏`;
  },

  bookingConfirmation: (leadName: string, unitCode: string, projectName: string, bookingFee: number) => {
    const formattedFee = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(bookingFee);
    return `Selamat Bapak/Ibu ${leadName}! 🎉

Pemesanan unit kavling *${unitCode}* di *${projectName}* telah berhasil tercatat di sistem kami dengan tanda jadi sebesar ${formattedFee}.

Tahap selanjutnya adalah pengumpulan berkas persyaratan KPR/administrasi. Tim kami akan mendampingi proses hingga serah terima kunci.`;
  },

  documentReminder: (leadName: string, unitCode: string, projectName: string) => {
    return `Halo Bapak/Ibu ${leadName},

Kami mengingatkan terkait kelengkapan berkas KPR untuk unit *${unitCode}* di *${projectName}* (KTP, NPWP, Slip Gaji 3 Bulan, Rekening Koran). 

Mohon berkas dapat diserahkan minggu ini agar pengajuan akad kredit ke bank mitra dapat segera diproses. Terima kasih!`;
  },

  quickFollowUp: (leadName: string, projectName: string) => {
    return `Halo Bapak/Ibu ${leadName}, kami ingin mengonfirmasi jadwal follow-up untuk proyek *${projectName}*. Apakah ada waktu luang hari ini?`;
  }
};
