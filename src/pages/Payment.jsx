import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Banknote, CheckCircle2, Copy, FileUp, Loader2, ReceiptText } from 'lucide-react';
import { getPaymentInvoice, uploadPaymentReceipt } from '../services/paymentService';

function formatMoney(value) {
  return `RM${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function statusLabel(status) {
  if (status === 'payment_submitted') return 'Receipt submitted';
  if (status === 'verified') return 'Payment verified';
  if (status === 'payment_rejected') return 'Receipt rejected - please re-upload';
  return 'Awaiting payment';
}

export default function Payment() {
  const { invoiceId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [bank, setBank] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const canUpload = invoice && ['awaiting_payment', 'payment_rejected'].includes(invoice.payment_status);

  useEffect(() => {
    const loadInvoice = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getPaymentInvoice(invoiceId);
        setInvoice(data.invoice);
        setBank(data.bank);
      } catch (err) {
        setError(err.message || 'Unable to load invoice.');
      } finally {
        setLoading(false);
      }
    };

    loadInvoice();
  }, [invoiceId]);

  const copyReference = async () => {
    await navigator.clipboard.writeText(invoice.reference_code);
    setMessage('Payment reference copied.');
  };

  const submitReceipt = async event => {
    event.preventDefault();
    if (!file || !canUpload || submitting) return;

    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const updatedInvoice = await uploadPaymentReceipt({ invoiceId, file });
      setInvoice(updatedInvoice);
      setFile(null);
      setMessage('Receipt uploaded. We will verify your payment shortly.');
    } catch (err) {
      setError(err.message || 'Unable to upload receipt.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Manual payment</p>
            <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--c-text)' }}>Complete your setup deposit</h1>
            <p className="text-sm md:text-base max-w-2xl leading-relaxed" style={{ color: 'var(--c-muted)' }}>
              Pay using bank transfer or DuitNow QR, then upload your receipt for admin verification.
            </p>
          </div>

          {loading && (
            <div className="rounded-2xl p-6 flex items-center gap-3" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
              <Loader2 className="animate-spin" size={18} /> Loading invoice...
            </div>
          )}

          {error && <p className="rounded-xl p-4 text-sm mb-6" style={{ color: '#DC2626', background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>{error}</p>}
          {message && <p className="rounded-xl p-4 text-sm mb-6" style={{ color: 'var(--c-accent)', background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>{message}</p>}

          {!loading && invoice && bank && (
            <div className="grid lg:grid-cols-[1fr_380px] gap-6">
              <div className="space-y-6">
                <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-2 mb-3" style={{ color: 'var(--c-accent)' }}>
                        <ReceiptText size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">Invoice details</span>
                      </div>
                      <h2 className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{invoice.invoice_id}</h2>
                    </div>
                    <span className="rounded-full px-3 py-1 text-xs font-black" style={{ background: 'var(--c-bg)', color: 'var(--c-accent)' }}>{statusLabel(invoice.payment_status)}</span>
                  </div>

                  {[
                    ['Request ID', invoice.request_id],
                    ['Client', invoice.client_name],
                    ['Package', invoice.package_name],
                    ['Plan', invoice.plan_name],
                    ['Total amount', formatMoney(invoice.amount)],
                    ['Deposit due now', formatMoney(invoice.deposit_amount)],
                    ['Balance after deposit', formatMoney(invoice.balance_amount)],
                  ].map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4 py-3" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
                      <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                      <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value || '-'}</span>
                    </div>
                  ))}
                </div>

                <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <div className="flex items-center gap-2 mb-5" style={{ color: 'var(--c-accent)' }}>
                    <Banknote size={18} />
                    <h2 className="font-black" style={{ color: 'var(--c-text)' }}>Bank transfer details</h2>
                  </div>

                  {[
                    ['Account name', bank.account_name],
                    ['Bank name', bank.bank_name],
                    ['Account number', bank.account_number],
                    ['Payment reference', invoice.reference_code],
                  ].map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4 py-3" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
                      <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                      <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value || '-'}</span>
                    </div>
                  ))}

                  <button onClick={copyReference} className="mt-4 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black" style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                    <Copy size={15} /> Copy reference
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <h2 className="font-black mb-4" style={{ color: 'var(--c-text)' }}>DuitNow QR</h2>
                  {bank.duitnow_qr_url ? (
                    <img src={bank.duitnow_qr_url} alt="DuitNow QR" className="w-full rounded-xl mb-4" style={{ border: '1px solid var(--c-border)' }} />
                  ) : (
                    <div className="aspect-square rounded-xl flex items-center justify-center text-sm mb-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                      QR image not configured
                    </div>
                  )}
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>Use the payment reference code when transferring so your receipt can be matched quickly.</p>
                </div>

                <form onSubmit={submitReceipt} className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <div className="flex items-center gap-2 mb-4">
                    <FileUp size={18} style={{ color: 'var(--c-accent)' }} />
                    <h2 className="font-black" style={{ color: 'var(--c-text)' }}>Upload receipt</h2>
                  </div>

                  {invoice.receipt_file_name && (
                    <div className="rounded-xl p-3 text-xs mb-4 flex items-center gap-2" style={{ background: 'var(--c-bg)', color: 'var(--c-muted)' }}>
                      <CheckCircle2 size={15} style={{ color: 'var(--c-accent)' }} /> Current receipt: {invoice.receipt_file_name}
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,application/pdf"
                    disabled={!canUpload || submitting}
                    onChange={event => setFile(event.target.files?.[0] || null)}
                    className="w-full rounded-xl px-4 py-3 text-sm outline-none mb-4"
                    style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
                  />

                  <button
                    type="submit"
                    disabled={!file || !canUpload || submitting}
                    className="w-full rounded-xl py-3 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-50"
                    style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
                  >
                    {submitting ? 'Uploading...' : 'Submit receipt'} <FileUp size={15} />
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
