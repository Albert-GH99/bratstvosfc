import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { isSupabaseConfigured } from '../lib/supabase';
import { signupClientAccount } from '../services/authService';

const copy = {
  en: {
    label: 'Client onboarding',
    title: 'Create Client Portal Account',
    subtitle: 'This is the real account flow: auth user, client profile, owner link and starter records are created together.',
    business: 'Business name',
    owner: 'Owner name',
    email: 'Email',
    phone: 'WhatsApp number',
    password: 'Password',
    industry: 'Industry',
    system: 'System',
    package: 'Package',
    maintenance: 'Maintenance',
    create: 'Create account',
    configured: 'Supabase is connected.',
    missing: 'Supabase env is missing. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before using this live.',
    success: 'Account created. Check email confirmation if Supabase requires it.',
    back: 'Back to setup',
  },
  my: {
    label: 'Onboarding client',
    title: 'Create Akaun Portal Client',
    subtitle: 'Ini flow account sebenar: auth user, profile client, owner link dan starter record dibuat sekali.',
    business: 'Nama bisnes',
    owner: 'Nama owner',
    email: 'E-mel',
    phone: 'Nombor WhatsApp',
    password: 'Password',
    industry: 'Industri',
    system: 'Sistem',
    package: 'Pakej',
    maintenance: 'Maintenance',
    create: 'Create akaun',
    configured: 'Supabase sudah connected.',
    missing: 'Env Supabase belum ada. Letak VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY sebelum guna live.',
    success: 'Akaun berjaya dibuat. Check email confirmation kalau Supabase minta.',
    back: 'Kembali ke setup',
  },
};

const systems = ['Food Preorder', 'Product Order', 'Booking System', 'CRM & Lead', 'Invoice & Quotation', 'POS', 'Inventory', 'Custom System'];
const packages = ['Basic - RM1,099/year', 'Growth - RM3,299/year', 'Business - RM6,599/year', 'Pro - RM9,889/year', 'Elite - RM15,599/year', 'Starter - RM149', 'Growth Build - RM499', 'Business Build - RM1,499', 'Pro - RM4,999', 'Elite - RM19,999'];
const carePlans = ['none', 'Hosting - RM99/mo', 'Maintenance - RM299/mo', 'Growth Care - RM599/mo', 'Scale Care - RM899/mo', 'Technical Partner - RM1,599/mo'];

export default function Signup() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.my;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    password: '',
    industry: '',
    selectedSystem: 'Food Preorder',
    selectedPackage: 'Business - RM6,599/year',
    maintenancePlan: 'none',
  });

  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const canSubmit = form.businessName && form.ownerName && form.email && form.password && form.selectedSystem && form.selectedPackage;

  const submit = async event => {
    event.preventDefault();
    if (!canSubmit || loading) return;

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const result = await signupClientAccount(form);
      setMessage(result.needsEmailConfirmation ? t.success : t.success);
      if (result.session) navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Unable to create account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Link to="/setup" className="inline-flex items-center text-sm font-bold mb-6" style={{ color: 'var(--c-accent)' }}>
              {t.back}
            </Link>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.label}</p>
            <h1 className="text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
            <p className="text-base leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
          </div>

          <div className="rounded-xl p-4 mb-6 flex items-center gap-3" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <CheckCircle size={18} style={{ color: isSupabaseConfigured ? 'var(--c-accent)' : '#B45309' }} />
            <p className="text-sm" style={{ color: 'var(--c-text)' }}>{isSupabaseConfigured ? t.configured : t.missing}</p>
          </div>

          <form onSubmit={submit} className="rounded-xl p-6 md:p-8 space-y-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                ['businessName', t.business],
                ['ownerName', t.owner],
                ['email', t.email],
                ['phone', t.phone],
                ['password', t.password],
                ['industry', t.industry],
              ].map(([key, placeholder]) => (
                <input
                  key={key}
                  value={form[key]}
                  onChange={event => set(key, event.target.value)}
                  type={key === 'password' ? 'password' : key === 'email' ? 'email' : 'text'}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                  style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}
                />
              ))}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <select value={form.selectedSystem} onChange={event => set('selectedSystem', event.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}>
                {systems.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
              <select value={form.selectedPackage} onChange={event => set('selectedPackage', event.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}>
                {packages.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
              <select value={form.maintenancePlan} onChange={event => set('maintenancePlan', event.target.value)}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none"
                style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}>
                {carePlans.map(item => <option key={item} value={item}>{item}</option>)}
              </select>
            </div>

            {message && <p className="text-sm" style={{ color: 'var(--c-accent)' }}>{message}</p>}
            {error && <p className="text-sm" style={{ color: '#DC2626' }}>{error}</p>}

            <button
              type="submit"
              disabled={!canSubmit || loading || !isSupabaseConfigured}
              className="w-full py-3.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
            >
              {loading ? 'Creating...' : t.create} <ArrowRight size={15} />
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
