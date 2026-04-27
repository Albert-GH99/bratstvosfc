import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { businessSystems, getSystemName, getText, oneTimePackages, salesEmail, subscriptionPlans } from '../data/systems';
import { useLanguage } from '../context/LanguageContext';

const copy = {
  en: {
    label: 'Qualified setup',
    title: 'Start Your Build Request',
    subtitle: 'Fill the details once. We create a pending request and open WhatsApp with the complete brief.',
    steps: ['Business', 'System & Package', 'Confirm'],
    businessName: 'Business name',
    ownerName: 'Your name',
    phone: 'WhatsApp number (+60...)',
    email: 'Email address',
    industry: 'Industry',
    industries: ['Retail', 'F&B', 'Services', 'Healthcare', 'Education', 'Automotive', 'Property', 'Beauty', 'Fitness', 'Event', 'Other'],
    systemLabel: 'Which system do you need?',
    packageLabel: 'Choose package',
    careLabel: 'Optional monthly/yearly plan',
    careSub: 'Choose if you want hosting, maintenance or yearly SaaS care. You can skip for now.',
    notes: 'Tell us your workflow, volume, branches, staff, payment method or current problem.',
    next: 'Next',
    back: 'Back',
    submit: 'Create pending request',
    confirmTitle: 'Review your request',
    confirmSub: 'After this, you will be sent to a processing page and WhatsApp will open with your brief.',
    noCare: 'No care plan for now',
    oneTime: 'One-Time Build',
    monthly: 'Monthly Care',
    yearly: 'Yearly SaaS',
    whatsappIntro: 'Hi Bratstvo Digital, I want to start a system setup.',
  },
  my: {
    label: 'Setup terarah',
    title: 'Mulakan Permintaan Sistem Anda',
    subtitle: 'Isi detail sekali sahaja. Kami cipta request pending dan buka WhatsApp dengan brief lengkap.',
    steps: ['Bisnes', 'Sistem & Pakej', 'Sahkan'],
    businessName: 'Nama perniagaan',
    ownerName: 'Nama anda',
    phone: 'Nombor WhatsApp (+60...)',
    email: 'Alamat e-mel',
    industry: 'Industri',
    industries: ['Runcit', 'F&B', 'Perkhidmatan', 'Kesihatan', 'Pendidikan', 'Automotif', 'Hartanah', 'Kecantikan', 'Fitness', 'Event', 'Lain-lain'],
    systemLabel: 'Sistem yang anda perlukan?',
    packageLabel: 'Pilih pakej',
    careLabel: 'Pelan bulanan/tahunan pilihan',
    careSub: 'Pilih kalau mahu hosting, maintenance atau penjagaan SaaS tahunan. Boleh langkau dahulu.',
    notes: 'Ceritakan workflow, volume, cawangan, staff, kaedah bayaran atau masalah utama sekarang.',
    next: 'Seterusnya',
    back: 'Kembali',
    submit: 'Cipta request pending',
    confirmTitle: 'Semak permintaan anda',
    confirmSub: 'Selepas ini, anda akan pergi ke processing page dan WhatsApp akan terbuka dengan brief anda.',
    noCare: 'Tiada care plan dahulu',
    oneTime: 'Build Sekali Bayar',
    monthly: 'Care Bulanan',
    yearly: 'SaaS Tahunan',
    whatsappIntro: 'Hai Bratstvo Digital, saya nak mula setup sistem.',
  },
};

function packageLabel(plan, suffix = '') {
  return `${plan.name} - RM${plan.price.toLocaleString()}${suffix}`;
}

export default function Setup() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const t = copy[lang] || copy.en;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    industry: '',
    systemId: businessSystems[0].id,
    packageType: 'one-time',
    packageId: 'business',
    careId: 'none',
    notes: '',
  });

  const selectedSystem = businessSystems.find(system => system.id === form.systemId) || businessSystems[0];
  const packageOptions = form.packageType === 'one-time' ? oneTimePackages : subscriptionPlans[form.packageType === 'monthly' ? 'monthly' : 'yearly'];
  const selectedPackage = packageOptions.find(plan => plan.id === form.packageId) || packageOptions[0];
  const careOptions = [
    { id: 'none', name: t.noCare, price: 0, includes: { en: [], my: [] } },
    ...subscriptionPlans.monthly,
    ...subscriptionPlans.yearly,
  ];
  const selectedCare = careOptions.find(plan => plan.id === form.careId) || careOptions[0];

  const canNext1 = form.businessName && form.ownerName && form.phone && form.email && form.industry;
  const canNext2 = form.systemId && form.packageId;

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const choosePackageType = type => {
    const firstPlan = type === 'one-time' ? oneTimePackages[2] : subscriptionPlans[type][type === 'monthly' ? 2 : 2];
    setForm(prev => ({ ...prev, packageType: type, packageId: firstPlan.id }));
  };

  const submission = useMemo(() => {
    const pkgSuffix = form.packageType === 'monthly' ? (lang === 'en' ? '/month' : '/bulan') : form.packageType === 'yearly' ? (lang === 'en' ? '/year' : '/tahun') : '';
    const careSuffix = selectedCare.id === 'none' ? '' : selectedCare.id.includes('yearly') ? (lang === 'en' ? '/year' : '/tahun') : (lang === 'en' ? '/month' : '/bulan');
    return {
      id: `BD-PENDING-${Date.now().toString().slice(-6)}`,
      status: 'pending',
      salesEmail,
      businessName: form.businessName,
      ownerName: form.ownerName,
      phone: form.phone,
      email: form.email,
      industry: form.industry,
      system: getSystemName(selectedSystem, lang),
      package: packageLabel(selectedPackage, pkgSuffix),
      care: selectedCare.id === 'none' ? t.noCare : packageLabel(selectedCare, careSuffix),
      notes: form.notes || (lang === 'en' ? 'No notes' : 'Tiada nota'),
      createdAt: new Date().toISOString(),
    };
  }, [form, lang, selectedCare, selectedPackage, selectedSystem, t.noCare]);

  const buildMessage = () => `${t.whatsappIntro}

Request ID: ${submission.id}
Status: PENDING
Business: ${submission.businessName}
Owner: ${submission.ownerName}
Phone: ${submission.phone}
Email: ${submission.email}
Industry: ${submission.industry}
System: ${submission.system}
Package: ${submission.package}
Care: ${submission.care}
Notes: ${submission.notes}

Sales email: ${salesEmail}`;

  const submit = () => {
    const payload = { ...submission, whatsappMessage: buildMessage() };
    window.localStorage.setItem('bd_pending_setup', JSON.stringify(payload));

    const salesWhatsapp = import.meta.env.VITE_SALES_WHATSAPP || '';
    if (salesWhatsapp) {
      window.open(`https://wa.me/${salesWhatsapp}?text=${encodeURIComponent(payload.whatsappMessage)}`, '_blank', 'noopener,noreferrer');
    }

    navigate('/setup-processing', { state: payload });
  };

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.label}</p>
            <h1 className="text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
          </div>

          <div className="flex items-center justify-center gap-3 mb-10">
            {[1, 2, 3].map(n => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: step >= n ? 'var(--c-accent)' : 'var(--c-border)', color: step >= n ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}>
                  {step > n ? <Check size={12} /> : n}
                </div>
                <span className="text-xs hidden sm:block" style={{ color: step >= n ? 'var(--c-text)' : 'var(--c-muted)' }}>{t.steps[n - 1]}</span>
                {n < 3 && <div className="w-8 h-px mx-1" style={{ background: step > n ? 'var(--c-accent)' : 'var(--c-border)' }} />}
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-6 md:p-8" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    ['businessName', t.businessName],
                    ['ownerName', t.ownerName],
                    ['phone', t.phone],
                    ['email', t.email],
                  ].map(([key, placeholder]) => (
                    <input key={key} value={form[key]} onChange={event => set(key, event.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
                  ))}
                </div>
                <select value={form.industry} onChange={event => set('industry', event.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-input-border)', color: form.industry ? 'var(--c-text)' : 'var(--c-muted)' }}>
                  <option value="">{t.industry}</option>
                  {t.industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
                </select>
                <button onClick={() => canNext1 && setStep(2)} disabled={!canNext1} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-4 transition-all hover:brightness-110 disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                  {t.next} <ChevronRight size={16} />
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <p className="text-sm font-bold mb-3" style={{ color: 'var(--c-text)' }}>{t.systemLabel}</p>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {businessSystems.map(system => (
                      <button key={system.id} onClick={() => set('systemId', system.id)} className="text-left px-4 py-3 rounded-xl text-sm transition-all" style={{ background: form.systemId === system.id ? 'rgba(32,200,117,0.14)' : 'var(--c-input-bg)', border: form.systemId === system.id ? '1px solid var(--c-accent)' : '1px solid var(--c-border)', color: form.systemId === system.id ? 'var(--c-accent)' : 'var(--c-text)' }}>
                        <span className="font-black">{system.emoji} {getText(system.shortName, lang)}</span>
                        <span className="block text-xs mt-1" style={{ color: 'var(--c-muted)' }}>{getText(system.category, lang)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold mb-3" style={{ color: 'var(--c-text)' }}>{t.packageLabel}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      ['one-time', t.oneTime],
                      ['monthly', t.monthly],
                      ['yearly', t.yearly],
                    ].map(([id, label]) => (
                      <button key={id} onClick={() => choosePackageType(id)} className="rounded-full px-4 py-2 text-sm font-black" style={{ background: form.packageType === id ? 'var(--c-accent)' : 'var(--c-input-bg)', color: form.packageType === id ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {packageOptions.map(plan => {
                      const suffix = form.packageType === 'monthly' ? (lang === 'en' ? '/month' : '/bulan') : form.packageType === 'yearly' ? (lang === 'en' ? '/year' : '/tahun') : '';
                      return (
                        <button key={plan.id} onClick={() => set('packageId', plan.id)} className="text-left p-4 rounded-xl text-sm transition-all" style={{ background: form.packageId === plan.id ? 'rgba(32,200,117,0.14)' : 'var(--c-input-bg)', border: form.packageId === plan.id ? '1px solid var(--c-accent)' : '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                          <span className="font-black block">{packageLabel(plan, suffix)}</span>
                          {plan.bestFor && <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{getText(plan.bestFor, lang)}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: 'var(--c-text)' }}>{t.careLabel}</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--c-muted)' }}>{t.careSub}</p>
                  <select value={form.careId} onChange={event => set('careId', event.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }}>
                    {careOptions.map(plan => {
                      const suffix = plan.id === 'none' ? '' : plan.id.includes('yearly') ? (lang === 'en' ? '/year' : '/tahun') : (lang === 'en' ? '/month' : '/bulan');
                      return <option key={plan.id} value={plan.id}>{plan.id === 'none' ? plan.name : packageLabel(plan, suffix)}</option>;
                    })}
                  </select>
                </div>

                <textarea value={form.notes} onChange={event => set('notes', event.target.value)} placeholder={t.notes} rows={4} className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />

                <div className="flex gap-3">
                  <button onClick={() => setStep(1)} className="flex items-center gap-1 px-5 py-3 rounded-xl text-sm font-medium transition-all" style={{ border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                    <ChevronLeft size={16} /> {t.back}
                  </button>
                  <button onClick={() => canNext2 && setStep(3)} disabled={!canNext2} className="flex-1 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                    {t.next} <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h3 className="font-black text-xl mb-2" style={{ color: 'var(--c-text)' }}>{t.confirmTitle}</h3>
                <p className="text-sm mb-6" style={{ color: 'var(--c-muted)' }}>{t.confirmSub}</p>
                <div className="space-y-3 mb-8">
                  {[
                    [t.businessName, submission.businessName],
                    [t.ownerName, submission.ownerName],
                    [t.phone, submission.phone],
                    [t.email, submission.email],
                    [t.industry, submission.industry],
                    [t.systemLabel, submission.system],
                    [t.packageLabel, submission.package],
                    [t.careLabel, submission.care],
                    ['Sales email', salesEmail],
                  ].map(([key, value]) => (
                    <div key={key} className="flex justify-between gap-4 py-2" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
                      <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{key}</span>
                      <span className="text-xs font-bold text-right" style={{ color: 'var(--c-text)' }}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => setStep(2)} className="flex items-center gap-1 px-5 py-3 rounded-xl text-sm font-medium transition-all" style={{ border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                    <ChevronLeft size={16} /> {t.back}
                  </button>
                  <button onClick={submit} className="flex-1 py-3 rounded-xl font-bold text-sm text-center transition-all hover:brightness-110 flex items-center justify-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                    {t.submit} <Send size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
