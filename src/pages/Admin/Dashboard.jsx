import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CalendarClock, CheckCircle2, ExternalLink, FileText, LayoutDashboard, MessageSquare, Package, ShieldCheck } from 'lucide-react';
import { getClientPortalData } from '../../services/clientService';
import { signOutClient } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';
import { hasAdminAccess, isOwnerEmail } from '../../lib/authProfiles';

function formatDate(value) {
  if (!value) return 'Not set';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
}

function label(value) {
  const labels = {
    monthly: 'Monthly plan',
    yearly: 'Yearly plan',
    none: 'No care plan for now',
    pending_setup: 'Pending setup',
    live: 'Live',
    custom_domain_pending: 'Custom domain pending',
    custom_domain_live: 'Custom domain live',
    unpaid: 'Unpaid',
    partial: 'Partial',
    paid: 'Paid',
  };
  return labels[value] || value || 'Not assigned';
}

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(() => isOwnerEmail(user?.email));

  useEffect(() => {
    const loadPortal = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError('');

      try {
        const adminAccess = await hasAdminAccess(user);
        setIsAdmin(adminAccess);
        if (adminAccess) return;

        const data = await getClientPortalData(user);
        setPortal(data);
      } catch (err) {
        setError('Unable to load client dashboard. Please try again or contact Bratstvo Digital support.');
      } finally {
        setLoading(false);
      }
    };

    loadPortal();
  }, [user?.id, user?.email]);

  const primarySystem = portal?.systems?.[0] || null;
  const client = portal?.client || null;
  const setupRequest = portal?.setupRequest || null;
  const noAccess = portal?.noAccess;

  const cards = useMemo(() => [
    ['Website status', label(primarySystem?.status || setupRequest?.client_website_status), 'Current setup progress for your website link.', ShieldCheck],
    ['Package', primarySystem?.package_name || client?.selected_package || setupRequest?.selected_package || 'Not assigned', 'Approved package for this client.', Package],
    ['Billing plan', label(primarySystem?.plan_name || client?.billing_plan || setupRequest?.billing_plan), 'Care plan connected to this account.', CalendarClock],
    ['Payment status', label(client?.payment_status || setupRequest?.payment_status), 'Latest payment record from Bratstvo Digital.', FileText],
  ], [client, primarySystem, setupRequest]);

  const checklist = [
    ['Request approved', setupRequest?.status === 'approved' || client?.status === 'approved'],
    ['Payment confirmed', ['paid', 'partial'].includes(setupRequest?.payment_status || client?.payment_status)],
    ['Website setup in progress', ['pending_setup', 'custom_domain_pending'].includes(primarySystem?.status || setupRequest?.client_website_status)],
    ['Website live', ['live', 'custom_domain_live'].includes(primarySystem?.status || setupRequest?.client_website_status)],
    ['Domain connected', ['custom_domain_live', 'live'].includes(primarySystem?.status || setupRequest?.client_website_status)],
  ];

  const logout = async () => {
    await signOutClient();
    setUser(null);
  };

  if (isAdmin) {
    return <Navigate to="/master" replace />;
  }

  if (!user?.id) {
    return <Navigate to="/login?next=/master" replace />;
  }

  if (portal?.profile?.must_change_password) {
    return <Navigate to="/change-password" replace />;
  }

  return (
    <div className="page-shell">
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch mb-8">
            <div className="rounded-xl p-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ color: 'var(--c-accent)', border: '1px solid rgba(22,196,127,0.28)', background: 'var(--c-primary-soft)' }}>
                <LayoutDashboard size={13} /> Client Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{client?.business_name || 'Your system command centre'}</h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--c-muted)' }}>
                Monitor your approved system, billing plan, proposed website link, payment status and setup progress.
              </p>
              <div className="flex flex-wrap gap-3">
                {primarySystem?.dashboard_url && (
                  <a href={primarySystem.dashboard_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                    Open proposed website <ExternalLink size={15} />
                  </a>
                )}
                <button onClick={logout} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                  Sign out
                </button>
              </div>
            </div>

            <div className="rounded-xl p-8 flex flex-col justify-between" style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-shadow)' }}>
              <ShieldCheck size={34} style={{ color: 'var(--c-accent)' }} />
              <div>
              <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{primarySystem?.system_name || client?.selected_system || 'System access'}</h2>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{user?.email}</p>
              </div>
            </div>
          </div>

          {loading && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Loading dashboard...</p>}
          {error && <p className="text-sm mb-6" style={{ color: 'var(--c-muted)' }}>{error}</p>}

          {!loading && !error && noAccess && (
            <div className="rounded-xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck size={18} style={{ color: 'var(--c-accent)' }} />
                <h3 className="font-black" style={{ color: 'var(--c-text)' }}>Your client access is not active yet.</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                Your client access is not active yet. Please wait for admin approval.
              </p>
            </div>
          )}

          {!loading && !error && !noAccess && (
            <>
              <div className="grid md:grid-cols-4 gap-4 mb-8">
                {cards.map(([title, value, desc, Icon]) => (
                  <div key={title} className="rounded-xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                    <Icon size={20} style={{ color: 'var(--c-accent)' }} className="mb-4" />
                    <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--c-muted)' }}>{title}</p>
                    <p className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{value}</p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{desc}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <MessageSquare size={18} style={{ color: 'var(--c-accent)' }} />
                  <h3 className="font-black" style={{ color: 'var(--c-text)' }}>Account details</h3>
                </div>
                {[
                  ['Owner', client?.owner_name],
                  ['WhatsApp', client?.whatsapp || client?.phone],
                  ['Selected system', primarySystem?.system_name || client?.selected_system],
                  ['Proposed website link', primarySystem?.system_url],
                  ['Support contact', 'admin@bratstvosfc.com'],
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-3" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                    <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                    <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value || '-'}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-6 mt-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <div className="flex items-center gap-2 mb-5">
                  <CheckCircle2 size={18} style={{ color: 'var(--c-accent)' }} />
                  <h3 className="font-black" style={{ color: 'var(--c-text)' }}>Setup progress</h3>
                </div>
                <div className="space-y-3">
                  {checklist.map(([item, done]) => (
                    <div key={item} className="flex items-center gap-3 text-sm" style={{ color: done ? 'var(--c-text)' : 'var(--c-muted)' }}>
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black" style={{ background: done ? 'var(--c-accent)' : 'var(--c-input-bg)', color: done ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
                        {done ? '✓' : ''}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
