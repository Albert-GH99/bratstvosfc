import { requireSupabase } from '../lib/supabase';

export async function getPaymentInvoice(invoiceId) {
  const db = requireSupabase();

  const { data, error } = await db.functions.invoke('payment-invoice', {
    body: {
      action: 'get',
      invoice_id: invoiceId,
    },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data;
}

export async function uploadPaymentReceipt({ invoiceId, file }) {
  const db = requireSupabase();
  const extension = file.name.split('.').pop() || 'receipt';
  const safeName = file.name.replace(/[^a-z0-9._-]/gi, '-').toLowerCase();
  const receiptPath = `${invoiceId}/${Date.now()}-${safeName || `receipt.${extension}`}`;

  // The file goes to Supabase Storage; only the path is saved on the invoice.
  const { error: uploadError } = await db.storage
    .from('payment-receipts')
    .upload(receiptPath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (uploadError) throw uploadError;

  const { data, error } = await db.functions.invoke('payment-invoice', {
    body: {
      action: 'submit_receipt',
      invoice_id: invoiceId,
      receipt_path: receiptPath,
      receipt_file_name: file.name,
    },
  });

  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data.invoice;
}
