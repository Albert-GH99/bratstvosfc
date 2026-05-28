export const paymentProviders = [
  {
    id: 'manual_bank_transfer',
    name: 'Manual bank transfer',
    status: 'active_manual',
    description: 'Admin sends official payment instruction after reviewing the setup request.',
  },
  {
    id: 'duitnow_qr',
    name: 'DuitNow QR',
    status: 'manual_confirmation',
    description: 'DuitNow QR can be shared after review. Receipt upload is optional when manual verification is needed.',
  },
  {
    id: 'payment_link',
    name: 'Payment link',
    status: 'ready_placeholder',
    description: 'Official payment link can be sent by email after scope and amount are confirmed.',
  },
  {
    id: 'payment_gateway_future',
    name: 'Payment gateway',
    status: 'future',
    description: 'Future gateway integration can confirm payment automatically and update Supabase.',
  },
];

export const defaultPaymentProviderId = 'manual_bank_transfer';

