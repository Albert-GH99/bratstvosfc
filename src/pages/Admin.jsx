import { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, CreditCard, ExternalLink, RefreshCw, ShieldCheck, XCircle } from 'lucide-react';
import { listSetupRequests, reviewPayment, reviewSetupRequest } from '../services/setupRequestService';
import { useAuth } from '../context/AuthContext';

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function formatMoney(value) {
  return `RM${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function statusColor(status) {
  if (['approved', 'verified'].includes(status)) return 'var(--c-accent)';
  if (['rejected', 'payment_rejected'].includes(status)) return '#DC2626';
  return '#B45309';
}

export default function Admin() {
  const { user } = useAuth();
  const [tab, setTab] = useState('requests');
  const [requests, setRequests] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const stats = useMemo(() => {
    const pending = requests.filter(item => item.status === 'pending').length;
    const submitted = invoices.filter(item => item.payment_status === 'payment_submitted').length;
    const verified = invoices.filter(item => item.payment_status === 'verified').length;
    return [
      ['Pending requests', pending, Clock3],
      ['Receipts to review', submitted, CreditCard],
      ['Verified payments', verified, CheckCircle2],
    ];
  }, [invoices, requests]);

  const loadData = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const data = await listSetupRequests();
      setRequests(data.requests);
      setInvoices(data.invoices);
    } catch (err) {
      setError(err.message || 'Unable to load admin data. Confirm your admin account and Edge Function env vars.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const reviewRequest = async (requestId, action) => {
    setWorkingId(`${requestId}:${action}`);
    setError('');
    setMessage('');

    try {
      const result = await reviewSetupRequest({ requestId, action });
      setMessage(action === 'approve'
        ? `Invoice ${result.invoice?.invoice_id || ''} created and payment link sent.`
        : `Request ${requestId} rejected.`);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to review this setup request.');
    } finally {
      setWorkingId('');
    }
  };

  const reviewReceipt = async (invoiceId, action) => {
    setWorkingId(`${invoiceId}:${action}`);
    setError('');
    setMessage('');

    try {
      await reviewPayment({ invoiceId, action });
      setMessage(action === 'approve_payment'
        ? `Payment ${invoiceId} verified and client access activated.`
        : `Payment ${invoiceId} rejected. Client was asked to re-upload.`);
      await loadData();
    } catch (err) {
      setError(err.message || 'Unable to review this payment.');
    } finally {
      setWorkingId('');
    }
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Admin review</p>
              <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--c-text)' }}>Onboarding control centre</h1>
              <p className="text-sm md:text-base max-w-3xl leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                Approve setup requests, issue manual payment invoices, review receipts, then activate client access after payment verification.
              </p>
            </div>
            <div className="rounded-full px-4 py-2 text-xs font-black inline-flex items-center gap-2" style={{ background: 'rgba(32,200,117,0.12)', color: 'var(--c-accent)', border: '1px solid rgba(32,200,117,0.24)' }}>
              <ShieldCheck size={14} /> {user?.email || 'Signed in'}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            {stats.map(([label, value, Icon]) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <Icon size={19} className="mb-4" style={{ color: 'var(--c-accent)' }} />
                <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{label}</p>
                <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
              </div>
            ))}
          </div>

          <div className="flex rounded-xl p-1 mb-8 max-w-xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            {[
              ['requests', 'Setup requests'],
              ['payments', 'Payments'],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm font-black"
                style={{ background: tab === id ? 'var(--c-accent)' : 'transparent', color: tab === id ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
              <div>
                <h2 className="font-black" style={{ color: 'var(--c-text)' }}>{tab === 'requests' ? 'Client setup requests' : 'Manual payment receipts'}</h2>
                <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>Admin actions run through protected Supabase Edge Functions.</p>
              </div>
              <button onClick={loadData} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-black disabled:opacity-50" style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                <RefreshCw size={15} /> Refresh
              </button>
            </div>

            {message && <p className="p-4 text-sm" style={{ color: 'var(--c-accent)' }}>{message}</p>}
            {error && <p className="p-4 text-sm" style={{ color: '#DC2626' }}>{error}</p>}
            {loading && <p className="p-5 text-sm" style={{ color: 'var(--c-muted)' }}>Loading...</p>}

            {!loading && tab === 'requests' && requests.length === 0 && <p className="p-5 text-sm" style={{ color: 'var(--c-muted)' }}>No setup requests found.</p>}
            {!loading && tab === 'requests' && requests.map(request => (
              <div key={request.request_id} className="p-5 grid lg:grid-cols-[1.2fr_1fr_auto] gap-5" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="font-black" style={{ color: 'var(--c-text)' }}>{request.business_name || 'Unnamed business'}</p>
                    <span className="rounded-full px-3 py-1 text-xs font-black" style={{ color: statusColor(request.status), background: 'var(--c-bg)' }}>{request.status}</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: 'var(--c-muted)' }}>Request ID: {request.request_id}</p>
                  <p className="text-xs mb-1" style={{ color: 'var(--c-muted)' }}>Owner: {request.owner_name || '-'} | {request.email || '-'} | {request.whatsapp || '-'}</p>
                  <p className="text-xs" style={{ color: 'var(--c-muted)' }}>Submitted: {formatDate(request.created_at)}</p>
                </div>

                <div className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                  <p><strong style={{ color: 'var(--c-text)' }}>System:</strong> {request.system_name || '-'}</p>
                  <p><strong style={{ color: 'var(--c-text)' }}>Package:</strong> {request.package_name || '-'}</p>
                  <p><strong style={{ color: 'var(--c-text)' }}>Plan:</strong> {request.plan_name || '-'}</p>
                  {request.notes && <p className="mt-2">{request.notes}</p>}
                </div>

                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => reviewRequest(request.request_id, 'approve')}
                    disabled={request.status !== 'pending' || Boolean(workingId)}
                    className="rounded-xl px-4 py-2 text-sm font-black disabled:opacity-40"
                    style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
                  >
                    {workingId === `${request.request_id}:approve` ? 'Creating invoice...' : 'Approve + invoice'}
                  </button>
                  <button
                    onClick={() => reviewRequest(request.request_id, 'reject')}
                    disabled={request.status !== 'pending' || Boolean(workingId)}
                    className="rounded-xl px-4 py-2 text-sm font-black disabled:opacity-40"
                    style={{ color: '#DC2626', border: '1px solid var(--c-border)' }}
                  >
                    {workingId === `${request.request_id}:reject` ? 'Rejecting...' : 'Reject'}
                  </button>
                </div>
              </div>
            ))}

            {!loading && tab === 'payments' && invoices.length === 0 && <p className="p-5 text-sm" style={{ color: 'var(--c-muted)' }}>No payment invoices found.</p>}
            {!loading && tab === 'payments' && invoices.map(invoice => (
              <div key={invoice.invoice_id} className="p-5 grid lg:grid-cols-[1.1fr_1fr_auto] gap-5" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <p className="font-black" style={{ color: 'var(--c-text)' }}>{invoice.invoice_id}</p>
                    <span className="rounded-full px-3 py-1 text-xs font-black" style={{ color: statusColor(invoice.payment_status), background: 'var(--c-bg)' }}>{invoice.payment_status}</span>
                  </div>
                  <p className="text-xs mb-1" style={{ color: 'var(--c-muted)' }}>Request ID: {invoice.request_id}</p>
                  <p className="text-xs mb-1" style={{ color: 'var(--c-muted)' }}>Client: {invoice.client_name || '-'} | {invoice.email || '-'}</p>
                  <p className="text-xs" style={{ color: 'var(--c-muted)' }}>Uploaded: {formatDate(invoice.receipt_uploaded_at)}</p>
                </div>

                <div className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                  <p><strong style={{ color: 'var(--c-text)' }}>Deposit:</strong> {formatMoney(invoice.deposit_amount)}</p>
                  <p><strong style={{ color: 'var(--c-text)' }}>Balance:</strong> {formatMoney(invoice.balance_amount)}</p>
                  <p><strong style={{ color: 'var(--c-text)' }}>Reference:</strong> {invoice.reference_code}</p>
                  {invoice.receipt_url && (
                    <a href={invoice.receipt_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-sm font-black" style={{ color: 'var(--c-accent)' }}>
                      View receipt <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <div className="flex lg:flex-col gap-2">
                  <button
                    onClick={() => reviewReceipt(invoice.invoice_id, 'approve_payment')}
                    disabled={invoice.payment_status !== 'payment_submitted' || Boolean(workingId)}
                    className="rounded-xl px-4 py-2 text-sm font-black disabled:opacity-40"
                    style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
                  >
                    {workingId === `${invoice.invoice_id}:approve_payment` ? 'Verifying...' : 'Verify payment'}
                  </button>
                  <button
                    onClick={() => reviewReceipt(invoice.invoice_id, 'reject_payment')}
                    disabled={invoice.payment_status !== 'payment_submitted' || Boolean(workingId)}
                    className="rounded-xl px-4 py-2 text-sm font-black disabled:opacity-40"
                    style={{ color: '#DC2626', border: '1px solid var(--c-border)' }}
                  >
                    {workingId === `${invoice.invoice_id}:reject_payment` ? 'Rejecting...' : 'Reject receipt'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
