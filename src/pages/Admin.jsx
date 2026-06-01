import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Banknote,
  CheckCircle2,
  Clock3,
  Copy,
  BarChart3,
  FileCheck2,
  Globe2,
  HelpCircle,
  Layers,
  MessageCircle,
  RefreshCw,
  Save,
  Search,
  ServerCog,
  Settings,
  ShieldCheck,
  Users,
  XCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import { useLang } from '@/context/LanguageContext';
import { BRATSTVO_DOMAIN } from '../lib/appConfig';
import { getAccessProfile, roleCapabilities } from '../lib/authProfiles';
import { emailEnvironmentVariables, emailTemplateList } from '@/config/emailTemplates';

const REQUEST_COLUMNS = '*';

const filters = ['all', 'pending', 'reviewed', 'payment_pending', 'paid', 'approved', 'rejected'];
const adminSections = ['Overview', 'Setup Requests', 'Clients', 'Payments', 'Plans', 'Revenue', 'Domains', 'Support', 'Staff', 'Settings'];

const sectionRoutes = {
  Overview: '/master',
  'Setup Requests': '/master/requests',
  Clients: '/master/clients',
  Payments: '/master',
  Plans: '/master',
  Revenue: '/master/revenue',
  Domains: '/master',
  Support: '/master',
  Staff: '/master/staff',
  Settings: '/master',
};

function sectionFromPath(pathname) {
  const path = pathname.toLowerCase();
  if (path.endsWith('/clients')) return 'Clients';
  if (path.endsWith('/requests')) return 'Setup Requests';
  if (path.endsWith('/payments')) return 'Payments';
  if (path.endsWith('/plans')) return 'Plans';
  if (path.endsWith('/revenue')) return 'Revenue';
  if (path.endsWith('/domains')) return 'Domains';
  if (path.endsWith('/support')) return 'Support';
  if (path.endsWith('/staff')) return 'Staff';
  if (path.endsWith('/settings')) return 'Settings';
  return 'Overview';
}

const copy = {
  en: {
    badge: 'Master HQ',
    title: 'Bratstvo internal control center',
    subtitle: 'Manage setup requests, clients, manual payments, plans, domains, support and operating status from one place.',
    listTitle: 'Client setup requests',
    listSub: 'Latest public setup submissions',
    search: 'Search business, owner, phone, email, request ID',
    refresh: 'Refresh',
    loading: 'Loading setup requests...',
    empty: 'No setup requests found.',
    noMatch: 'No requests match this filter.',
    adminNotes: 'Admin notes',
    saveNotes: 'Save notes',
    approve: 'Approve',
    approveInvite: 'Approve + Create Account',
    resendLogin: 'Resend Login Email',
    copyLogin: 'Copy Login Info',
    openWebsite: 'Open Client Website',
    reject: 'Reject',
    unpaid: 'Mark Unpaid',
    partial: 'Mark Partial',
    paid: 'Mark Paid',
    saveFinance: 'Save pricing/payment',
    generateLink: 'Generate client link',
    markLive: 'Mark website live',
    customPending: 'Mark custom domain pending',
    customLive: 'Mark custom domain live',
    copyLink: 'Copy client link',
    whatsapp: 'WhatsApp Client',
  },
  my: {
    badge: 'Master HQ',
    title: 'Bratstvo internal control center',
    subtitle: 'Urus setup request, client, payment manual, plan, domain, support dan status operasi dari satu tempat.',
    listTitle: 'Client setup requests',
    listSub: 'Permintaan setup terkini',
    search: 'Cari bisnes, owner, phone, email, request ID',
    refresh: 'Refresh',
    loading: 'Loading setup requests...',
    empty: 'Tiada setup request.',
    noMatch: 'Tiada request untuk filter ini.',
    adminNotes: 'Admin notes',
    saveNotes: 'Save notes',
    approve: 'Approve',
    approveInvite: 'Approve + Create Account',
    resendLogin: 'Resend Login Email',
    copyLogin: 'Copy Login Info',
    openWebsite: 'Open Client Website',
    reject: 'Reject',
    unpaid: 'Mark Unpaid',
    partial: 'Mark Partial',
    paid: 'Mark Paid',
    saveFinance: 'Save pricing/payment',
    generateLink: 'Generate client link',
    markLive: 'Mark website live',
    customPending: 'Mark custom domain pending',
    customLive: 'Mark custom domain live',
    copyLink: 'Copy client link',
    whatsapp: 'WhatsApp Client',
  },
};

function formatDate(value) {
  if (!value) return '-';
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

function statusColor(status) {
  if (['approved', 'paid', 'sent', 'live', 'reviewed'].includes(status)) return 'var(--c-accent)';
  return 'var(--c-muted)';
}

function displayValue(value) {
  return value || '-';
}

function amount(value) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : 0;
}

function formatMoney(value) {
  return `RM${amount(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function cleanPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('0')) return `6${digits}`;
  return digits;
}

function field(request, ...keys) {
  for (const key of keys) {
    if (request?.[key]) return request[key];
  }
  return '';
}

function businessSlug(businessName) {
  return String(businessName || 'client')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '')
    .replace(/^$/, 'client');
}

function requestSlug(request) {
  return cleanDomain(request?.client_slug || request?.slug || request?.subdomain || businessSlug(request?.business_name));
}

function publicPath(request) {
  return `/${requestSlug(request)}`;
}

function dashboardPath(request) {
  return `/core/${requestSlug(request)}`;
}

function publicLink(request) {
  return `${BRATSTVO_DOMAIN}${publicPath(request)}`;
}

function sensitiveValue(value, canSeeSensitive) {
  return canSeeSensitive ? displayValue(value) : 'Owner only';
}

function cleanDomain(value) {
  return String(value || '')
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/\/.*$/, '')
    .toLowerCase();
}

function resolveClientWebsite(request, draft = {}) {
  const domainType = draft.domain_type || request.domain_type || 'bratstvo_domain';
  const customDomain = cleanDomain(draft.custom_domain ?? request.custom_domain);

  if (customDomain) return customDomain;
  return publicLink(request);
}

function billingPlanLabel(value) {
  const labels = {
    monthly: 'Monthly plan',
    yearly: 'Yearly plan',
    none: 'No care plan for now',
  };
  return labels[value] || labels.none;
}

function domainTypeLabel(value) {
  return value === 'custom_domain' ? 'Custom domain' : 'Bratstvo path link';
}

function websiteStatusLabel(value) {
  const labels = {
    pending_setup: 'Pending setup',
    live: 'Live',
    custom_domain_pending: 'Custom domain pending',
    custom_domain_live: 'Custom domain live',
  };
  return labels[value] || labels.pending_setup;
}

function emailStatusLabel(request) {
  if (request.client_email_sent) return 'Sent';
  if (request.temp_password && !request.client_email_sent) return 'Failed';
  return 'Not configured';
}

function paymentSnapshot(totalAmount, amountPaid) {
  const total = Math.max(0, amount(totalAmount));
  const paid = Math.max(0, amount(amountPaid));

  if (paid <= 0) return { total_amount: total, amount_paid: 0, balance_amount: total, payment_status: 'unpaid' };
  if (paid >= total) return { total_amount: total, amount_paid: paid, balance_amount: 0, payment_status: 'paid' };
  return { total_amount: total, amount_paid: paid, balance_amount: total - paid, payment_status: 'partial' };
}

function buildWhatsappUrl(request) {
  const phone = cleanPhone(request.whatsapp || request.phone);
  if (!phone) return '';

  const message = `Hi ${request.owner_name || ''}, request untuk ${request.business_name || 'bisnes anda'} telah diluluskan.

Sistem: ${field(request, 'selected_system', 'system_name')}
Pakej: ${field(request, 'selected_package', 'package_name')}
Plan: ${billingPlanLabel(field(request, 'billing_plan', 'plan_name'))}

Website link cadangan:
${request.client_website || resolveClientWebsite(request)}

Status sekarang:
Website sedang dalam proses setup. Kami akan update semula selepas link sudah live.

Terima kasih.`;

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export default function Admin() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lang } = useLang();
  const t = copy[lang] || copy.en;
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [noteDrafts, setNoteDrafts] = useState({});
  const [fieldDrafts, setFieldDrafts] = useState({});
  const [section, setSection] = useState(() => sectionFromPath(location.pathname));
  const [accessProfile, setAccessProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [workingId, setWorkingId] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const capabilities = accessProfile?.capabilities || roleCapabilities('client');
  const canSeeSensitive = Boolean(capabilities.fullAccess);

  const stats = useMemo(() => {
    const pending = requests.filter(item => item.status === 'pending').length;
    const approved = requests.filter(item => item.status === 'approved').length;
    const rejected = requests.filter(item => item.status === 'rejected').length;
    const paid = requests.filter(item => item.payment_status === 'paid').length;
    const unpaid = requests.filter(item => item.payment_status === 'unpaid').length;
    const totalPaid = capabilities.canViewRevenue ? requests.reduce((sum, item) => sum + amount(item.amount_paid), 0) : 0;

    return [
      ['Pending', pending, Clock3],
      ['Approved', approved, ShieldCheck],
      ['Rejected', rejected, XCircle],
      ['Paid', paid, CheckCircle2],
      ['Unpaid', unpaid, Banknote],
      ['Revenue', capabilities.canViewRevenue ? formatMoney(totalPaid) : 'Owner only', FileCheck2],
    ];
  }, [capabilities.canViewRevenue, requests]);

  const revenueStats = useMemo(() => {
    const approvedOrPaid = requests.filter(item => item.status === 'approved' || item.payment_status === 'paid');
    const setupRevenue = approvedOrPaid.reduce((sum, item) => sum + amount(item.setup_price), 0);
    const paidAmount = requests.reduce((sum, item) => sum + amount(item.amount_paid), 0);
    const outstanding = requests.reduce((sum, item) => sum + amount(item.balance_amount), 0);
    const monthly = requests
      .filter(item => item.status === 'approved' && item.billing_plan === 'monthly')
      .reduce((sum, item) => sum + amount(item.plan_price), 0);
    const yearly = requests
      .filter(item => item.status === 'approved' && item.billing_plan === 'yearly')
      .reduce((sum, item) => sum + amount(item.plan_price), 0);
    const pendingPayments = requests.filter(item => item.payment_status !== 'paid').length;

    return [
      ['Total setup revenue', formatMoney(setupRevenue), Banknote],
      ['Paid amount', formatMoney(paidAmount), CheckCircle2],
      ['Outstanding balance', formatMoney(outstanding), XCircle],
      ['Monthly recurring revenue', formatMoney(monthly), RefreshCw],
      ['Yearly recurring revenue', formatMoney(yearly), FileCheck2],
      ['Pending payments', pendingPayments, Clock3],
    ];
  }, [requests]);

  const approvedClients = useMemo(() => requests.filter(item => item.status === 'approved'), [requests]);

  const paymentRows = useMemo(
    () => requests.filter(item => item.payment_status || amount(item.total_amount) || amount(item.balance_amount)),
    [requests],
  );

  const planRows = useMemo(() => {
    const counts = new Map();
    requests.forEach(request => {
      const plan = billingPlanLabel(field(request, 'billing_plan', 'plan_name'));
      counts.set(plan, (counts.get(plan) || 0) + 1);
    });
    return Array.from(counts, ([plan, count]) => ({ plan, count }));
  }, [requests]);

  const domainRows = useMemo(
    () => requests.filter(item => item.domain_type || item.custom_domain || item.requested_full_domain || item.client_website),
    [requests],
  );

  const supportRows = useMemo(
    () => requests.filter(item => item.notes || item.admin_note || item.admin_notes || item.whatsapp || item.phone),
    [requests],
  );

  const filteredRequests = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    return requests.filter(request => {
      const statusValue = String(request.status || 'pending').toLowerCase();
      const paymentValue = String(request.payment_status || '').toLowerCase();
      const matchesFilter = filter === 'all' || statusValue === filter || paymentValue === filter;
      const haystack = [
        request.business_name,
        request.owner_name,
        request.phone,
        request.whatsapp,
        request.email,
        request.request_id,
        field(request, 'selected_system', 'system_name'),
        field(request, 'selected_package', 'package_name'),
      ].join(' ').toLowerCase();

      return matchesFilter && (!searchText || haystack.includes(searchText));
    });
  }, [filter, query, requests]);

  const loadRequests = async () => {
    setLoading(true);
    setError('');
    setMessage('');

    try {
      if (!supabase) throw new Error('Supabase is not configured.');
      if (user?.email) setAccessProfile(await getAccessProfile(user));

      const { data, error: queryError } = await supabase
        .from('setup_requests')
        .select(REQUEST_COLUMNS)
        .order('created_at', { ascending: false });

      if (queryError) throw queryError;
      setRequests(data || []);
      setNoteDrafts({});
      setFieldDrafts({});
    } catch (err) {
      setError(err.message || 'Unable to load setup requests.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    setSection(sectionFromPath(location.pathname));
  }, [location.pathname]);

  const updateRequest = async (request, updates, successText, actionKey = Object.keys(updates).join('-')) => {
    setWorkingId(`${request.id}:${actionKey}`);
    setError('');
    setMessage('');

    try {
      if (!supabase) throw new Error('Supabase is not configured.');

      let query = supabase
        .from('setup_requests')
        .update(updates)
        .select(REQUEST_COLUMNS);

      query = request.id ? query.eq('id', request.id) : query.eq('request_id', request.request_id);

      const { data, error: updateError } = await query.maybeSingle();

      if (updateError) throw updateError;

      setRequests(prev => prev.map(item => (item.id === request.id ? { ...item, ...(data || updates) } : item)));
      setMessage(successText);
    } catch (err) {
      setError(err.message || 'Unable to update setup request.');
    } finally {
      setWorkingId('');
    }
  };

  const draftValue = (request, key) => fieldDrafts[request.id]?.[key] ?? request[key] ?? '';

  const setDraftValue = (request, key, value) => {
    setFieldDrafts(prev => ({
      ...prev,
      [request.id]: {
        ...(prev[request.id] || {}),
        [key]: value,
      },
    }));
  };

  const getDraft = request => fieldDrafts[request.id] || {};

  const buildFinanceUpdates = request => {
    const draft = getDraft(request);
    const setupPrice = amount(draft.setup_price ?? request.setup_price);
    const planPrice = amount(draft.plan_price ?? request.plan_price);
    const domainPrice = amount(draft.domain_price ?? request.domain_price);
    const totalAmount = setupPrice + planPrice + domainPrice;
    const paid = amount(draft.amount_paid ?? request.amount_paid);
    const payment = paymentSnapshot(totalAmount, paid);
    const domainType = draft.domain_type || request.domain_type || 'bratstvo_domain';
    const customDomain = cleanDomain(draft.custom_domain ?? request.custom_domain);

    return {
      setup_price: setupPrice,
      plan_price: planPrice,
      domain_price: domainPrice,
      total_amount: payment.total_amount,
      amount_paid: payment.amount_paid,
      balance_amount: payment.balance_amount,
      payment_status: payment.payment_status,
      billing_plan: draft.billing_plan || request.billing_plan || 'monthly',
      domain_type: domainType,
      custom_domain: customDomain,
    };
  };

  const generateClientLinkUpdates = request => {
    const draft = getDraft(request);
    const domainType = draft.domain_type || request.domain_type || 'bratstvo_domain';
    const customDomain = cleanDomain(draft.custom_domain ?? request.custom_domain);

    return {
      domain_type: domainType,
      custom_domain: customDomain,
      client_website: resolveClientWebsite(request, { domain_type: domainType, custom_domain: customDomain }),
      client_website_status: request.client_website_status || 'pending_setup',
    };
  };

  const saveFinance = request => {
    updateRequest(
      request,
      buildFinanceUpdates(request),
      `Pricing and payment updated for ${request.request_id || request.id}.`,
      'finance',
    );
  };

  const generateClientLink = request => {
    updateRequest(
      request,
      generateClientLinkUpdates(request),
      'Proposed client link generated. Website is not live yet until deployment/path setup is completed.',
      'client-link',
    );
  };

  const approveRequest = async request => {
    setWorkingId(`${request.id}:status-approved`);
    setError('');
    setMessage('');

    try {
      if (!supabase) throw new Error('Supabase is not configured.');

      const { data, error: functionError } = await supabase.functions.invoke('approve-setup-request', {
        body: { request_id: request.request_id },
      });

      if (functionError) {
        setError(functionError.message || 'Edge Function approve-setup-request is not deployed or configured.');
        return;
      }

      await loadRequests();

      if (data?.success) {
        setMessage('Approved. Client account created and login email sent. Website setup is pending.');
        return;
      }

      if (data?.approved) {
        setError(data?.error || 'Request was approved, but the client email was not sent.');
      } else {
        setError(data?.error || 'Approve + Create Account failed.');
      }
    } catch (err) {
      setError(err.message || 'Approve + Create Account failed.');
    } finally {
      setWorkingId('');
    }
  };

  const copyLoginInfo = async request => {
    const link = request.client_website || resolveClientWebsite(request);
    const loginInfo = `Bratstvo Digital login details

Website: https://${link}
Login: https://${link}/login
Email: ${request.email || ''}
Temporary password: ${request.temp_password || 'Not generated yet'}

You will be required to change your password after first login.`;

    setError('');
    setMessage('');

    try {
      await navigator.clipboard.writeText(loginInfo);
      setMessage('Copied client login details.');
    } catch {
      setError(loginInfo);
    }
  };

  const rejectRequest = request => {
    updateRequest(
      request,
      { status: 'rejected', admin_note: noteDrafts[request.id] ?? request.admin_note ?? request.admin_notes ?? '' },
      'Rejected. Email notification is not configured yet.',
      'status-rejected',
    );
  };

  const setPaymentStatus = (request, paymentStatus) => {
    const total = amount(draftValue(request, 'total_amount')) || amount(request.total_amount);
    const currentPaid = amount(draftValue(request, 'amount_paid')) || amount(request.amount_paid);
    const nextPaid = paymentStatus === 'paid'
      ? total
      : paymentStatus === 'partial'
        ? (currentPaid > 0 && currentPaid < total ? currentPaid : total / 2)
        : 0;
    const payment = paymentSnapshot(total, nextPaid);

    updateRequest(
      request,
      payment,
      `Payment marked ${payment.payment_status} for ${request.request_id || request.id}.`,
      `payment-${paymentStatus}`,
    );
  };

  const setWebsiteStatus = (request, websiteStatus) => {
    const draft = getDraft(request);
    const domainType = websiteStatus.startsWith('custom_domain') ? 'custom_domain' : (draft.domain_type || request.domain_type || 'bratstvo_domain');
    const customDomain = cleanDomain(draft.custom_domain ?? request.custom_domain);

    updateRequest(
      request,
      {
        domain_type: domainType,
        custom_domain: customDomain,
        client_website: request.client_website || resolveClientWebsite(request, { domain_type: domainType, custom_domain: customDomain }),
        client_website_status: websiteStatus,
      },
      `Website status updated to ${websiteStatus}.`,
      `website-${websiteStatus}`,
    );
  };

  const copyClientLink = async request => {
    const link = request.client_website || resolveClientWebsite(request);
    setError('');
    setMessage('');

    try {
      await navigator.clipboard.writeText(link);
      setMessage(`Copied client link: ${link}`);
    } catch (err) {
      setError(`Copy failed. Client link: ${link}`);
    }
  };

  const saveAdminNotes = request => {
    updateRequest(
      request,
      { admin_note: noteDrafts[request.id] ?? request.admin_note ?? request.admin_notes ?? '' },
      `Admin notes saved for ${request.request_id || request.id}.`,
      'admin_note',
    );
  };

  const actionBusy = (request, key) => workingId === `${request.id}:${key}`;
  const anyBusy = Boolean(workingId);

  return (
    <div className="page-shell">
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.badge}</p>
              <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
              <p className="text-sm md:text-base max-w-3xl leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
            </div>
            <div className="rounded-full px-4 py-2 text-xs font-black inline-flex items-center gap-2" style={{ background: 'rgba(32,200,117,0.12)', color: 'var(--c-accent)', border: '1px solid rgba(32,200,117,0.24)' }}>
              <ShieldCheck size={14} /> {user?.email || 'Signed in'} · {capabilities.role}
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto mb-6 pb-1">
            {adminSections.map(item => {
              const hidden =
                (item === 'Setup Requests' && !capabilities.canViewRequests) ||
                (item === 'Clients' && !capabilities.canViewClients) ||
                (item === 'Payments' && !capabilities.canViewPayments) ||
                (item === 'Plans' && !capabilities.canViewPlans) ||
                (item === 'Revenue' && !capabilities.canViewRevenue) ||
                (item === 'Domains' && !capabilities.canViewDomains) ||
                (item === 'Support' && !capabilities.canViewSupport) ||
                (item === 'Staff' && !capabilities.canManageStaff) ||
                (item === 'Settings' && !capabilities.canManageSettings);
              if (hidden) return null;
              return (
                <button
                  key={item}
                  onClick={() => {
                    setSection(item);
                  }}
                  className="shrink-0 rounded-xl px-4 py-3 text-xs font-black"
                  style={{
                    background: section === item ? 'var(--c-accent)' : 'var(--c-surface)',
                    color: section === item ? 'var(--c-accent-contrast)' : 'var(--c-muted)',
                    border: '1px solid var(--c-border)',
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map(([label, value, Icon]) => (
              <div key={label} className="rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <Icon size={19} className="mb-4" style={{ color: 'var(--c-accent)' }} />
                <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{label}</p>
                <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
              </div>
            ))}
          </div>

          {section === 'Overview' && (
            <div className="grid lg:grid-cols-4 gap-4 mb-8">
              {[
                ['Requests ready for review', requests.filter(item => item.status === 'pending').length, Clock3],
                ['Approved clients', approvedClients.length, Users],
                ['Manual payments', paymentRows.filter(item => item.payment_status !== 'paid').length, Banknote],
                ['System status', supabase ? 'Supabase connected' : 'Supabase missing', ServerCog],
              ].map(([label, value, Icon]) => (
                <div key={label} className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <Icon size={20} className="mb-4" style={{ color: 'var(--c-accent)' }} />
                  <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{label}</p>
                  <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
                </div>
              ))}
            </div>
          )}

          {section === 'Revenue' && capabilities.canViewRevenue && (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
              {revenueStats.map(([label, value, Icon]) => (
                <div key={label} className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                  <Icon size={20} className="mb-4" style={{ color: 'var(--c-accent)' }} />
                  <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{label}</p>
                  <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
                </div>
              ))}
            </div>
          )}

          {section === 'Clients' && capabilities.canViewClients && (
            <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <h2 className="font-black mb-4" style={{ color: 'var(--c-text)' }}>Clients</h2>
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-3">
                {approvedClients.map(client => (
                  <div key={client.id || client.request_id} className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <p className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{displayValue(client.business_name)}</p>
                    {[
                      ['Slug', requestSlug(client)],
                      ['System', field(client, 'selected_system', 'system_name') || client.system_type],
                      ['Plan', field(client, 'billing_plan', 'plan_name')],
                      ['Status', client.status || 'approved'],
                      ['Created', formatDate(client.created_at)],
                      ['Public', publicPath(client)],
                      ['Dashboard', dashboardPath(client)],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 py-1.5 text-xs" style={{ color: 'var(--c-muted)' }}>
                        <span>{label}</span>
                        <span className="font-black text-right" style={{ color: 'var(--c-text)' }}>{displayValue(value)}</span>
                      </div>
                    ))}
                  </div>
                ))}
                {approvedClients.length === 0 && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>No approved clients yet.</p>}
              </div>
            </div>
          )}

          {section === 'Payments' && capabilities.canViewPayments && (
            <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <h2 className="font-black mb-2" style={{ color: 'var(--c-text)' }}>Payment review</h2>
              <p className="mb-5 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>Manual bank transfer, DuitNow QR and receipt checks stay owner-only until real payment RBAC is implemented.</p>
              <div className="grid gap-3">
                {paymentRows.map(request => (
                  <div key={request.id || request.request_id} className="grid gap-3 rounded-xl p-4 lg:grid-cols-[1fr_1fr_auto]" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <div>
                      <p className="font-black" style={{ color: 'var(--c-text)' }}>{displayValue(request.request_id)}</p>
                      <p className="mt-1 text-xs" style={{ color: 'var(--c-muted)' }}>{displayValue(request.business_name)}</p>
                    </div>
                    <div className="grid gap-1 text-xs" style={{ color: 'var(--c-muted)' }}>
                      <span>Amount: <strong style={{ color: 'var(--c-text)' }}>{formatMoney(request.total_amount || request.setup_price)}</strong></span>
                      <span>Status: <strong style={{ color: statusColor(request.payment_status) }}>{request.payment_status || 'pending_review'}</strong></span>
                      <span>Receipt: <strong style={{ color: 'var(--c-text)' }}>{request.receipt_url ? 'Receipt uploaded' : 'Preview placeholder'}</strong></span>
                    </div>
                    <button onClick={() => setPaymentStatus(request, 'paid')} disabled={anyBusy || !capabilities.canManagePayments} className="rounded-xl px-4 py-2 text-xs font-black disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                      {actionBusy(request, 'payment-paid') ? 'Updating...' : 'Mark paid'}
                    </button>
                  </div>
                ))}
                {paymentRows.length === 0 && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>No payment records yet.</p>}
              </div>
            </div>
          )}

          {section === 'Plans' && capabilities.canViewPlans && (
            <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <h2 className="font-black mb-4" style={{ color: 'var(--c-text)' }}>Plans</h2>
              <div className="grid gap-3 md:grid-cols-3">
                {planRows.map(item => (
                  <div key={item.plan} className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <Layers size={18} className="mb-3" style={{ color: 'var(--c-accent)' }} />
                    <p className="font-black" style={{ color: 'var(--c-text)' }}>{item.plan}</p>
                    <p className="mt-2 text-xs" style={{ color: 'var(--c-muted)' }}>{item.count} request/client records</p>
                  </div>
                ))}
                {planRows.length === 0 && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Plan records will appear after setup requests arrive.</p>}
              </div>
            </div>
          )}

          {section === 'Domains' && capabilities.canViewDomains && (
            <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <h2 className="font-black mb-4" style={{ color: 'var(--c-text)' }}>Domains</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {domainRows.map(request => (
                  <div key={request.id || request.request_id} className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <Globe2 size={18} className="mb-3" style={{ color: 'var(--c-accent)' }} />
                    <p className="font-black" style={{ color: 'var(--c-text)' }}>{displayValue(request.business_name)}</p>
                    <p className="mt-2 text-xs" style={{ color: 'var(--c-muted)' }}>Public link: {publicPath(request)}</p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--c-muted)' }}>Custom domain: {request.custom_domain || request.requested_full_domain || 'Future option'}</p>
                    <p className="mt-1 text-xs" style={{ color: 'var(--c-muted)' }}>Status: {request.domain_status || websiteStatusLabel(request.client_website_status)}</p>
                  </div>
                ))}
                {domainRows.length === 0 && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Domain records will appear after setup requests arrive.</p>}
              </div>
            </div>
          )}

          {section === 'Support' && capabilities.canViewSupport && (
            <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <h2 className="font-black mb-4" style={{ color: 'var(--c-text)' }}>Support</h2>
              <div className="grid gap-3 md:grid-cols-2">
                {supportRows.slice(0, 12).map(request => (
                  <div key={request.id || request.request_id} className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <HelpCircle size={18} className="mb-3" style={{ color: 'var(--c-accent)' }} />
                    <p className="font-black" style={{ color: 'var(--c-text)' }}>{displayValue(request.business_name)}</p>
                    <p className="mt-2 text-xs" style={{ color: 'var(--c-muted)' }}>Contact: {sensitiveValue(request.whatsapp || request.phone, canSeeSensitive)}</p>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{displayValue(request.admin_note || request.admin_notes || request.notes)}</p>
                  </div>
                ))}
                {supportRows.length === 0 && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Support notes will appear after setup requests arrive.</p>}
              </div>
            </div>
          )}

          {section === 'Staff' && capabilities.canManageStaff && (
            <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <h2 className="font-black mb-3" style={{ color: 'var(--c-text)' }}>Staff roles</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                Supported roles: owner, admin, staff, sales, support and client. Create or update staff in the profiles table with status approved.
              </p>
            </div>
          )}

          {section === 'Settings' && capabilities.canManageSettings && (
            <div className="rounded-2xl p-5 mb-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <h2 className="font-black mb-3" style={{ color: 'var(--c-text)' }}>Settings</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                Required future automation settings: {emailEnvironmentVariables.join(', ')}.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {emailTemplateList.map(template => (
                  <div key={template.key} className="rounded-xl p-4" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
                    <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{template.subject}</p>
                    <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{template.preview}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-xl p-4" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.24)' }}>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--c-text)' }}>
                  Email templates are structure-only. Resend is not configured here and no real emails are sent from this screen.
                </p>
              </div>
            </div>
          )}

          {section === 'Setup Requests' && capabilities.canViewRequests && (
          <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
              <div>
                <h2 className="font-black" style={{ color: 'var(--c-text)' }}>{t.listTitle}</h2>
                <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>{t.listSub}</p>
              </div>
              <button onClick={loadRequests} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-black disabled:opacity-50" style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                <RefreshCw size={15} /> {t.refresh}
              </button>
            </div>

            <div className="p-5 grid lg:grid-cols-[1fr_auto] gap-4" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
              <label className="relative block">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--c-muted)' }} />
                <input
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                  placeholder={t.search}
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm outline-none"
                  style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
                />
              </label>
              <div className="flex gap-2 overflow-x-auto">
                {filters.map(item => (
                  <button
                    key={item}
                    onClick={() => setFilter(item)}
                    className="shrink-0 rounded-xl px-4 py-3 text-xs font-black capitalize"
                    style={{
                      background: filter === item ? 'var(--c-accent)' : 'var(--c-bg)',
                      color: filter === item ? 'var(--c-accent-contrast)' : 'var(--c-muted)',
                      border: '1px solid var(--c-border)',
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {message && <p className="p-4 text-sm" style={{ color: 'var(--c-accent)' }}>{message}</p>}
            {error && <p className="p-4 text-sm" style={{ color: 'var(--c-muted)' }}>{error}</p>}
            {loading && <p className="p-5 text-sm" style={{ color: 'var(--c-muted)' }}>{t.loading}</p>}

            {!loading && requests.length === 0 && (
              <p className="p-5 text-sm" style={{ color: 'var(--c-muted)' }}>{t.empty}</p>
            )}

            {!loading && requests.length > 0 && filteredRequests.length === 0 && (
              <p className="p-5 text-sm" style={{ color: 'var(--c-muted)' }}>{t.noMatch}</p>
            )}

            {!loading && filteredRequests.map(request => {
              const noteValue = noteDrafts[request.id] ?? request.admin_note ?? request.admin_notes ?? '';

              return (
                <div key={request.id} className="p-5 grid xl:grid-cols-[1.1fr_1fr_1fr] gap-5" style={{ borderTop: '1px solid var(--c-border-subtle)' }}>
                  <div className="space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <p className="font-black" style={{ color: 'var(--c-text)' }}>{displayValue(request.business_name)}</p>
                        <span className="rounded-full px-3 py-1 text-xs font-black" style={{ color: statusColor(request.status), background: 'var(--c-bg)' }}>
                          {request.status || 'pending'}
                        </span>
                        <span className="rounded-full px-3 py-1 text-xs font-black" style={{ color: statusColor(request.payment_status), background: 'var(--c-bg)' }}>
                          {request.payment_status || 'unpaid'}
                        </span>
                      </div>
                      <p className="text-xs mb-1" style={{ color: 'var(--c-muted)' }}>Request ID: {displayValue(request.request_id)}</p>
                      <p className="text-xs" style={{ color: 'var(--c-muted)' }}>Created: {formatDate(request.created_at)}</p>
                    </div>

                    {[
                      ['Owner', request.owner_name],
                      ['Phone', sensitiveValue(request.phone, canSeeSensitive)],
                      ['WhatsApp', sensitiveValue(request.whatsapp, canSeeSensitive)],
                      ['Email', sensitiveValue(request.email, canSeeSensitive)],
                      ['Industry', request.industry],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 text-xs" style={{ color: 'var(--c-muted)' }}>
                        <span>{label}</span>
                        <span className="font-black text-right" style={{ color: 'var(--c-text)' }}>{displayValue(value)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    {[
                      ['System', field(request, 'selected_system', 'system_name')],
                      ['Package', field(request, 'selected_package', 'package_name')],
                      ['Billing plan', billingPlanLabel(field(request, 'billing_plan', 'plan_name'))],
                      ['Domain type', domainTypeLabel(request.domain_type)],
                      ...(request.domain_type === 'custom_domain' ? [['Custom domain', request.custom_domain]] : []),
                      ['Public link', publicPath(request)],
                      ['Dashboard link', dashboardPath(request)],
                      ['Website status', websiteStatusLabel(request.client_website_status)],
                      ['Temp password', canSeeSensitive ? (request.temp_password ? 'Generated' : 'Not generated') : 'Owner only'],
                      ['Email status', emailStatusLabel(request)],
                    ].map(([label, value]) => (
                      <div key={label} className="flex justify-between gap-4 text-xs" style={{ color: 'var(--c-muted)' }}>
                        <span>{label}</span>
                        <span className="font-black text-right" style={{ color: label.includes('status') ? statusColor(value) : 'var(--c-text)' }}>{displayValue(value)}</span>
                      </div>
                    ))}

                    <div className="rounded-xl p-3 text-xs leading-relaxed" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                      {request.client_email_sent ? (
                        <p>Client invite email sent. Website setup is still in progress until the link is marked live.</p>
                      ) : (
                        <>
                          <p>Client login email has not been sent yet. Use Approve + Create Account when ready.</p>
                          <p className="mt-2">If email is not configured, the exact automation error will appear here after approval.</p>
                        </>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>Notes</p>
                      <p className="rounded-xl p-3 text-sm leading-relaxed min-h-20" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                        {displayValue(request.notes)}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{t.adminNotes}</p>
                      <textarea
                        value={noteValue}
                        onChange={event => setNoteDrafts(prev => ({ ...prev, [request.id]: event.target.value }))}
                        rows={4}
                        disabled={!capabilities.canEditFollowUp}
                        className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none"
                        style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
                      />
                      <button
                        onClick={() => saveAdminNotes(request)}
                        disabled={anyBusy || !capabilities.canEditFollowUp}
                        className="mt-2 w-full rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40"
                        style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)' }}
                      >
                        <Save size={15} /> {actionBusy(request, 'admin_note') ? 'Saving...' : t.saveNotes}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button onClick={() => updateRequest(request, { status: 'reviewed', reviewed_at: new Date().toISOString() }, `Request marked reviewed for ${request.request_id || request.id}.`, 'status-reviewed')} disabled={anyBusy || !capabilities.canEditFollowUp} className="rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                        <FileCheck2 size={15} /> {actionBusy(request, 'status-reviewed') ? 'Updating...' : 'Mark reviewed'}
                      </button>
                      <button onClick={() => updateRequest(request, { payment_status: 'payment_pending' }, `Payment marked pending for ${request.request_id || request.id}.`, 'payment-pending')} disabled={anyBusy || !capabilities.canEditFinance} className="rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                        <Clock3 size={15} /> {actionBusy(request, 'payment-pending') ? 'Updating...' : 'Payment pending'}
                      </button>
                      <button onClick={() => approveRequest(request)} disabled={anyBusy || !capabilities.canApprove} className="rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                        <CheckCircle2 size={15} /> {actionBusy(request, 'status-approved') ? 'Approving...' : t.approveInvite}
                      </button>
                      <button onClick={() => rejectRequest(request)} disabled={anyBusy || !capabilities.canReject} className="rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                        <XCircle size={15} /> {actionBusy(request, 'status-rejected') ? 'Rejecting...' : t.reject}
                      </button>
                      <button onClick={() => setPaymentStatus(request, 'unpaid')} disabled={anyBusy || !capabilities.canEditFinance} className="rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                        <Banknote size={15} /> {actionBusy(request, 'payment-unpaid') ? 'Updating...' : t.unpaid}
                      </button>
                      <button onClick={() => setPaymentStatus(request, 'partial')} disabled={anyBusy || !capabilities.canEditFinance} className="rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                        <FileCheck2 size={15} /> {actionBusy(request, 'payment-partial') ? 'Updating...' : t.partial}
                      </button>
                      <button onClick={() => setPaymentStatus(request, 'paid')} disabled={anyBusy || !capabilities.canEditFinance} className="rounded-xl px-4 py-2 text-sm font-black inline-flex items-center justify-center gap-2 disabled:opacity-40" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                        <Banknote size={15} /> {actionBusy(request, 'payment-paid') ? 'Updating...' : t.paid}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>
    </div>
  );
}
