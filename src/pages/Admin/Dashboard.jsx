import { useEffect, useMemo, useState } from 'react';
import { CalendarClock, ExternalLink, FileText, LayoutDashboard, MessageSquare, Package, ShieldCheck } from 'lucide-react';
import { getClientPortalData } from '../../services/clientService';
import { signOutClient } from '../../services/authService';
import { useAuth } from '../../context/AuthContext';

function formatDate(value) {
  if (!value) return 'Not set';
  return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' }).format(new Date(value));
}

export default function Dashboard() {
  const { user, setUser } = useAuth();
  const [portal, setPortal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadPortal = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError('');

      try {
        const data = await getClientPortalData(user.id);
        setPortal(data);
      } catch (err) {
        setError(err.message || 'Unable to load client dashboard.');
      } finally {
        setLoading(false);
      }
    };

    loadPortal();
  }, [user?.id]);

  const primarySystem = portal?.systems?.[0] || null;
  const client = portal?.client || null;

  const cards = useMemo(() => [
    ['Project status', primarySystem?.status || client?.status || 'Active', 'Current onboarding/system status.', ShieldCheck],
    ['Package', primarySystem?.package_name || client?.selected_package || 'Not assigned', 'Approved package for this client.', Package],
    ['Plan', primarySystem?.plan_name || client?.maintenance_plan || 'Not assigned', 'Care or SaaS plan connected to this account.', CalendarClock],
    ['Renewal date', formatDate(primarySystem?.renewal_date), 'Renewal tracking can be updated later.', FileText],
  ], [client, primarySystem]);

  const logout = async () => {
    await signOutClient();
    setUser(null);
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 items-stretch mb-8">
            <div className="rounded-xl p-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-5" style={{ color: 'var(--c-accent)', border: '1px solid rgba(194,168,107,0.35)', background: 'rgba(194,168,107,0.08)' }}>
                <LayoutDashboard size={13} /> Client portal
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{client?.business_name || 'Your system command centre'}</h1>
              <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--c-muted)' }}>
                Monitor your approved system, package, plan, access status, renewal date and dashboard link.
              </p>
              <div className="flex flex-wrap gap-3">
                {primarySystem?.dashboard_url && (
                  <a href={primarySystem.dashboard_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                    Open dashboard <ExternalLink size={15} />
                  </a>
                )}
                <button onClick={logout} className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                  Sign out
                </button>
              </div>
            </div>

            <div className="rounded-xl p-8 flex flex-col justify-between" style={{ background: 'linear-gradient(145deg, rgba(47,58,39,0.92), rgba(8,12,8,0.96))', border: '1px solid rgba(194,168,107,0.25)' }}>
              <ShieldCheck size={34} style={{ color: 'var(--c-accent)' }} />
              <div>
                <h2 className="text-2xl font-black mb-3 text-white">{primarySystem?.system_name || 'System access'}</h2>
                <p className="text-sm leading-relaxed" style={{ color: '#C8D0BE' }}>{user?.email}</p>
              </div>
            </div>
          </div>

          {loading && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Loading dashboard...</p>}
          {error && <p className="text-sm mb-6" style={{ color: '#DC2626' }}>{error}</p>}

          {!loading && !error && (
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
                  ['System link', primarySystem?.system_url],
                  ['Dashboard link', primarySystem?.dashboard_url],
                  ['Future settings', 'Settings updates and plan upgrades can be added here.'],
                ].map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 py-3" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                    <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                    <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value || '-'}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
