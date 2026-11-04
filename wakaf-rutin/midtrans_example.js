/**
 * Panduan & Contoh Integrasi Midtrans GoPay / Snap untuk Wakaf Rutin
 */

// 1. Install Midtrans Client SDK:
// npm install midtrans-client

const midtransClient = require('midtrans-client');

// Inisialisasi Snap client
const snap = new midtransClient.Snap({
  isProduction: false, // ubah true untuk live
  serverKey: 'YOUR_MIDTRANS_SERVER_KEY',
  clientKey: 'YOUR_MIDTRANS_CLIENT_KEY'
});

/**
 * Contoh Handler Backend (Express / Next.js API) saat form disubmit
 */
async function handleWakafCheckout(req, res) {
  const { name, phone, email, amount, packet, notes } = req.body;

  const orderId = 'WKF-' + Date.now();

  const parameter = {
    transaction_details: {
      order_id: orderId,
      gross_amount: Number(amount)
    },
    customer_details: {
      first_name: name,
      email: email,
      phone: phone
    },
    item_details: [
      {
        id: 'WAKAF-RUTIN',
        price: Number(amount),
        quantity: 1,
        name: packet || 'Wakaf Rutin'
      }
    ],
    // Aktifkan metode pembayaran yang diinginkan (GoPay, QRIS, Bank Transfer)
    enabled_payments: ['gopay', 'qris', 'bca_va', 'bni_va', 'bri_va', 'permata_va'],
    custom_field1: notes || ''
  };

  try {
    const transaction = await snap.createTransaction(parameter);
    // transaction.token -> token Snap untuk popup frontend
    // transaction.redirect_url -> URL langsung ke pembayaran Midtrans
    res.json({
      status: 'success',
      token: transaction.token,
      redirect_url: transaction.redirect_url
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { handleWakafCheckout };
