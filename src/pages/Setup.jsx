import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { businessSystems, getSystemName, getText, oneTimePackages, subscriptionPlans } from '../data/systems';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';
import { notifyAdminSetupRequest } from '../services/setupRequestService';

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
    submitting: 'Submitting...',
    confirmTitle: 'Review your request',
    confirmSub: 'After this, your request will be saved and our team will review it.',
    noCare: 'No care plan for now',
    emailError: 'Please enter a valid email address.',
    submitError: 'We could not submit your request right now. Please try again.',
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
    submitting: 'Sedang hantar...',
    confirmTitle: 'Semak permintaan anda',
    confirmSub: 'Selepas ini, request anda akan disimpan dan team kami akan semak.',
    noCare: 'Tiada care plan dahulu',
    emailError: 'Sila masukkan alamat e-mel yang sah.',
    submitError: 'We could not submit your request right now. Please try again.',
    oneTime: 'Build Sekali Bayar',
    monthly: 'Care Bulanan',
    yearly: 'SaaS Tahunan',
    whatsappIntro: 'Hai Bratstvo Digital, saya nak mula setup sistem.',
  },
};

function packageLabel(plan, suffix = '') {
  if (plan.priceLabel) return `${plan.name} - ${plan.priceLabel}`;
  return `${plan.name} - RM${plan.price.toLocaleString()}${suffix}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export default function Setup() {
  const { lang } = useLanguage();
  const navigate = useNavigate();
  const t = copy[lang] || copy.en;
  const [step, setStep] = useState(1);
  const [emailError, setEmailError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    industry: '',
    systemId: businessSystems[0].id,
    packageId: 'business',
    careType: 'monthly',
    careId: 'none',
    notes: '',
  });

  const selectedSystem = businessSystems.find(system => system.id === form.systemId) || businessSystems[0];
  const selectedPackage = oneTimePackages.find(plan => plan.id === form.packageId) || oneTimePackages[0];
  const visibleCareOptions = subscriptionPlans[form.careType];
  const selectedCare = form.careId === 'none' ? null : visibleCareOptions.find(plan => plan.id === form.careId);

  const emailFormatError = form.email && !isValidEmail(form.email) ? t.emailError : '';
  const canNext1 = form.businessName && form.ownerName && form.phone && form.email && isValidEmail(form.email) && form.industry;
  const canNext2 = form.systemId && form.packageId;

  const set = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));

    // Validation: clear the email error as soon as the user edits the email field.
    if (key === 'email') setEmailError('');
  };

  const chooseCareType = type => {
    setForm(prev => ({ ...prev, careType: type, careId: 'none' }));
  };

  const submission = useMemo(() => {
    const careSuffix = form.careType === 'yearly' ? (lang === 'en' ? '/year' : '/tahun') : (lang === 'en' ? '/month' : '/bulan');
    return {
      status: 'pending',
      businessName: form.businessName,
      ownerName: form.ownerName,
      phone: form.phone,
      email: form.email,
      industry: form.industry,
      system: getSystemName(selectedSystem, lang),
      package: packageLabel(selectedPackage),
      care: selectedCare ? packageLabel(selectedCare, careSuffix) : t.noCare,
      notes: form.notes || (lang === 'en' ? 'No notes' : 'Tiada nota'),
      createdAt: new Date().toISOString(),
    };
  }, [form, lang, selectedCare, selectedPackage, selectedSystem, t.noCare]);

  const buildMessage = (request, summary) => `${t.whatsappIntro}

Request ID: ${request.id}
Status: PENDING
Business: ${request.business_name}
Owner: ${request.owner_name}
WhatsApp: ${request.phone}
Email: ${request.email}
Industry: ${request.industry}
System: ${request.system_name}
Package: ${request.package_name}
Plan: ${request.plan_name}
Notes: ${summary.notes}`;

  const goToStep2 = () => {
    // Validation: block the next step when the email format is not valid.
    if (!isValidEmail(form.email)) {
      setEmailError(t.emailError);
      return;
    }

    setStep(2);
  };

  const submit = async () => {
    setSubmitError('');
    setIsSubmitting(true);

    const selectedSystemName = submission.system;
    const selectedPackageName = submission.package;
    const selectedPlanName = submission.care;

    const payload = {
      business_name: form.businessName || form.name || '',
      owner_name: form.ownerName || form.owner || '',
      phone: form.phone || '',
      email: form.email || '',
      industry: form.industry || '',
      system_name: form.system || form.systemName || selectedSystemName || '',
      package_name: form.package || form.packageName || selectedPackageName || '',
      plan_name: form.plan || form.budget || selectedPlanName || '',
      notes: form.notes || '',
      status: 'pending',
    };

    const summary = {
      businessName: form.businessName || '',
      ownerName: form.ownerName || '',
      phone: form.phone || '',
      email: form.email || '',
      industry: form.industry || '',
      system: selectedSystemName || '',
      package: selectedPackageName || '',
      care: selectedPlanName || '',
      notes: form.notes || (lang === 'en' ? 'No notes' : 'Tiada nota'),
    };

    try {
      if (!supabase) throw new Error('Supabase is not configured.');

      // Supabase insert: save the setup request before showing the success page.
      const { data, error } = await supabase
        .schema('public')
        .from('setup_requests')
        .insert([payload])
        .select();

      if (error) {
        console.error('Setup request submit failed. Supabase table: setup_requests', error);
        throw error;
      }

      const request = data?.[0] || payload;

      try {
        await notifyAdminSetupRequest(request.id);
      } catch (notifyError) {
        // Email runs in an Edge Function, so frontend logs help debug without exposing email API keys.
        console.error('Admin setup email notification failed.', {
          'error.message': notifyError?.message,
          'request_id': request.id,
        });
      }

      const successPayload = {
        id: request.id,
        request_id: request.id,
        status: request.status,
        summary,
        businessName: summary.businessName,
        ownerName: summary.ownerName,
        phone: summary.phone,
        email: summary.email,
        industry: summary.industry,
        system: summary.system,
        package: summary.package,
        care: summary.care,
        notes: summary.notes,
        whatsappMessage: buildMessage(request, summary),
      };

      window.localStorage.setItem('bd_pending_setup', JSON.stringify(successPayload));

      navigate('/setup-processing', { state: successPayload });
    } catch (error) {
      // Read these console fields together: message is the main failure, while details/hint/code explain the Supabase cause.
      console.error('Setup request submit failed. Supabase table: setup_requests', error);
      setSubmitError(t.submitError);
    } finally {
      setIsSubmitting(false);
    }
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
                    <div key={key}>
                      <input value={form[key]} onChange={event => set(key, event.target.value)} placeholder={placeholder} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: key === 'email' && emailError ? '1px solid #ef4444' : '1px solid var(--c-input-border)', color: 'var(--c-text)' }} />
                      {key === 'email' && (emailError || emailFormatError) && (
                        <p className="text-xs mt-1.5" style={{ color: '#ef4444' }}>{emailError || emailFormatError}</p>
                      )}
                    </div>
                  ))}
                </div>
                <select value={form.industry} onChange={event => set('industry', event.target.value)} className="w-full px-4 py-3 rounded-xl text-sm outline-none" style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-input-border)', color: form.industry ? 'var(--c-text)' : 'var(--c-muted)' }}>
                  <option value="">{t.industry}</option>
                  {t.industries.map(industry => <option key={industry} value={industry}>{industry}</option>)}
                </select>
                <button onClick={goToStep2} disabled={!canNext1} className="w-full py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-4 transition-all hover:brightness-110 disabled:opacity-40" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
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
                  <div className="inline-flex rounded-full px-4 py-2 text-sm font-black mb-4" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                    {t.oneTime}
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    {oneTimePackages.map(plan => (
                      <button key={plan.id} onClick={() => set('packageId', plan.id)} className="text-left p-4 rounded-xl text-sm transition-all" style={{ background: form.packageId === plan.id ? 'rgba(32,200,117,0.14)' : 'var(--c-input-bg)', border: form.packageId === plan.id ? '1px solid var(--c-accent)' : '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                        <span className="font-black block">{packageLabel(plan)}</span>
                        {plan.bestFor && <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{getText(plan.bestFor, lang)}</span>}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold mb-1" style={{ color: 'var(--c-text)' }}>{t.careLabel}</p>
                  <p className="text-xs mb-3" style={{ color: 'var(--c-muted)' }}>{t.careSub}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {[
                      ['monthly', t.monthly],
                      ['yearly', t.yearly],
                    ].map(([id, label]) => (
                      <button key={id} onClick={() => chooseCareType(id)} className="rounded-full px-4 py-2 text-sm font-black" style={{ background: form.careType === id ? 'var(--c-accent)' : 'var(--c-input-bg)', color: form.careType === id ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <div className="grid md:grid-cols-2 gap-2">
                    <button onClick={() => set('careId', 'none')} className="text-left p-4 rounded-xl text-sm transition-all" style={{ background: form.careId === 'none' ? 'rgba(32,200,117,0.14)' : 'var(--c-input-bg)', border: form.careId === 'none' ? '1px solid var(--c-accent)' : '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                      <span className="font-black block">{t.noCare}</span>
                      <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{lang === 'en' ? 'Skip care plan for now' : 'Langkau care plan dahulu'}</span>
                    </button>
                    {visibleCareOptions.map(plan => {
                      const suffix = form.careType === 'yearly' ? (lang === 'en' ? '/year' : '/tahun') : (lang === 'en' ? '/month' : '/bulan');
                      return (
                        <button key={plan.id} onClick={() => set('careId', plan.id)} className="text-left p-4 rounded-xl text-sm transition-all" style={{ background: form.careId === plan.id ? 'rgba(32,200,117,0.14)' : 'var(--c-input-bg)', border: form.careId === plan.id ? '1px solid var(--c-accent)' : '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                          <span className="font-black block">{packageLabel(plan, suffix)}</span>
                          <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{getText(plan.includes, lang).slice(0, 3).join(' • ')}</span>
                        </button>
                      );
                    })}
                  </div>
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
                  <button onClick={submit} disabled={isSubmitting} className="flex-1 py-3 rounded-xl font-bold text-sm text-center transition-all hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                    {isSubmitting ? t.submitting : t.submit} <Send size={16} />
                  </button>
                </div>
                {submitError && <p className="text-sm mt-4" style={{ color: '#ef4444' }}>{submitError}</p>}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
