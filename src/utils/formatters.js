/**
 * Format angka menjadi format Rupiah Indonesia.
 * @param {number} amount - Jumlah dalam rupiah
 * @returns {string} String terformat, contoh: "Rp 350.000"
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Menghitung subtotal item keranjang.
 * @param {number} harga_per_hari
 * @param {number} jumlah_hari
 * @returns {number}
 */
export function hitungSubtotal(harga_per_hari, jumlah_hari) {
  return harga_per_hari * jumlah_hari;
}

/**
 * Generate pesan WhatsApp dari data keranjang dan form checkout.
 * @param {Array} items - Item keranjang [{nama, harga_per_hari, jumlah_hari, subtotal}]
 * @param {Object} formData - {nama, noWa, alamat, catatan}
 * @param {number} totalHarga - Total harga keseluruhan
 * @param {string} adminWaNumber - Nomor WA admin tanpa tanda + (contoh: "6281234567890")
 * @returns {string} URL WhatsApp siap buka
 */
export function generateWhatsAppLink(items, formData, totalHarga, adminWaNumber) {
  const daftarItem = items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.nama}\n   ${item.jumlah_hari} hari × ${formatRupiah(item.harga_per_hari)} = ${formatRupiah(item.subtotal)}`
    )
    .join('\n');

  const pesan = [
    '🎥 *PESANAN SEWA KAMERA*',
    '━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '📋 *Data Pemesan:*',
    `Nama     : ${formData.nama}`,
    `No. WA   : ${formData.noWa}`,
    `Alamat   : ${formData.alamat || '-'}`,
    `Catatan  : ${formData.catatan || '-'}`,
    '',
    '🛒 *Detail Pesanan:*',
    daftarItem,
    '',
    '━━━━━━━━━━━━━━━━━━━━━━',
    `💰 *Total: ${formatRupiah(totalHarga)}*`,
    '━━━━━━━━━━━━━━━━━━━━━━',
    '',
    '_Mohon konfirmasi ketersediaan dan jadwal pengambilan. Terima kasih!_ 🙏',
  ].join('\n');

  const encoded = encodeURIComponent(pesan);
  return `https://wa.me/${adminWaNumber}?text=${encoded}`;
}
