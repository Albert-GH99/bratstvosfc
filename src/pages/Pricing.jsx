import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, CircleDollarSign, CreditCard, HelpCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getText, oneTimePackages, subscriptionPlans } from '../data/systems';
import { useLanguage } from '../context/LanguageContext';

const copy = {
  en: {
    badge: 'Clear pricing, clear scope',
    title: 'Start with one-time build. Add monthly or yearly care when the system is live.',
    subtitle: 'Pricing follows the production model: Starter, Growth, Business, Pro and Elite. Business is the main product; Elite is the upsell.',
    oneTimeLabel: 'First',
    oneTimeTitle: 'One-Time Build Packages',
    careLabel: 'After launch',
    careTitle: 'Monthly or Yearly Plans',
    careSub: 'Monthly plans cover hosting, maintenance and support. Yearly plans package the system, hosting, admin, chatbot and support into a cleaner SaaS offer.',
    popular: 'Main product',
    choose: 'Choose this plan',
    monthly: 'Monthly',
    yearly: 'Yearly',
    monthSuffix: '/month',
    yearSuffix: '/year',
    paymentTitle: 'How does payment work?',
    paymentText: 'Start with invoice, QR DuitNow or bank transfer. For automatic paid/unpaid status, connect a gateway such as Billplz, ToyyibPay or Stripe through backend/webhook.',
    careDiffTitle: 'Build vs care',
    careDiffText: 'Build is the system development work. Care is what happens after launch: hosting, fixes, updates, automation tuning and support.',
    bestTitle: 'Which plan is best?',
    bestText: 'Starter is for testing. Growth is for small businesses. Business RM1,499 or Business RM6,599/year is the main serious-business anchor.',
    ctaTitle: 'Need an accurate quote?',
    ctaText: 'Fill setup once. Your request becomes a pending account and opens WhatsApp with the full brief.',
    cta: 'Start setup',
  },
  my: {
    badge: 'Harga jelas, scope jelas',
    title: 'Mula dengan build sekali bayar. Tambah penjagaan bulanan atau tahunan bila sistem sudah live.',
    subtitle: 'Harga ikut production model: Starter, Growth, Business, Pro dan Elite. Business ialah produk utama; Elite ialah upsell.',
    oneTimeLabel: 'Pertama',
    oneTimeTitle: 'Pakej Build Sekali Bayar',
    careLabel: 'Selepas launch',
    careTitle: 'Pelan Bulanan atau Tahunan',
    careSub: 'Monthly cover hosting, maintenance dan support. Yearly package sistem, hosting, admin, chatbot dan support sebagai offer SaaS yang lebih kemas.',
    popular: 'Produk utama',
    choose: 'Pilih pakej ini',
    monthly: 'Monthly',
    yearly: 'Yearly',
    monthSuffix: '/bulan',
    yearSuffix: '/tahun',
    paymentTitle: 'Payment client macam mana?',
    paymentText: 'Mula dengan invoice, QR DuitNow atau bank transfer. Untuk status paid/unpaid automatik, sambung gateway seperti Billplz, ToyyibPay atau Stripe melalui backend/webhook.',
    careDiffTitle: 'Build vs care',
    careDiffText: 'Build ialah kerja bina sistem. Care ialah penjagaan selepas launch: hosting, fix, update, tuning automasi dan support.',
    bestTitle: 'Pakej mana terbaik?',
    bestText: 'Starter untuk testing. Growth untuk small business. Business RM1,499 atau Business RM6,599/year ialah anchor utama untuk bisnes serius.',
    ctaTitle: 'Nak quote yang tepat?',
    ctaText: 'Isi setup sekali sahaja. Request akan jadi pending account dan WhatsApp terbuka dengan brief lengkap.',
    cta: 'Mula setup',
  },
};

function formatPrice(value) {
  return `RM${value.toLocaleString()}`;
}

function PlanCard({ plan, lang, labels, suffix = '', compact = false }) {
  const includes = getText(plan.includes, lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className="relative rounded-2xl p-5 flex flex-col"
      style={{
        background: plan.popular ? 'rgba(32,200,117,0.11)' : 'var(--c-surface)',
        border: plan.popular ? '1px solid rgba(32,200,117,0.48)' : '1px solid var(--c-border)',
        boxShadow: plan.popular ? '0 28px 80px rgba(0,0,0,0.18)' : 'none',
      }}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-5 rounded-full px-3 py-1 text-xs font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
          {labels.popular}
        </span>
      )}
      <div className="mb-5">
        <h3 className="text-xl font-black mb-2" style={{ color: 'var(--c-text)' }}>{plan.name}</h3>
        {plan.bestFor && <p className="text-sm leading-relaxed min-h-[44px]" style={{ color: 'var(--c-muted)' }}>{getText(plan.bestFor, lang)}</p>}
      </div>
      <div className="flex items-end gap-2 mb-5">
        <span className={compact ? 'text-3xl font-black' : 'text-4xl md:text-5xl font-black'} style={{ color: plan.popular ? 'var(--c-accent)' : 'var(--c-text)' }}>{formatPrice(plan.price)}</span>
        {suffix && <span className="text-sm mb-1" style={{ color: 'var(--c-muted)' }}>{suffix}</span>}
      </div>
      <ul className="space-y-3 flex-1 mb-6">
        {includes.map(item => (
          <li key={item} className="flex gap-2 text-sm" style={{ color: 'var(--c-muted)' }}>
            <CheckCircle2 size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Link to="/setup" className="rounded-xl py-3 text-center text-sm font-black transition-all hover:brightness-110" style={{ background: plan.popular ? 'var(--c-accent)' : 'transparent', color: plan.popular ? 'var(--c-accent-contrast)' : 'var(--c-text)', border: plan.popular ? 'none' : '1px solid var(--c-border)' }}>
        {labels.choose}
      </Link>
    </motion.div>
  );
}

export default function Pricing() {
  const { lang } = useLanguage();
  const t = copy[lang] || copy.en;
  const [billing, setBilling] = useState('monthly');
  const recurringPlans = subscriptionPlans[billing];

  return (
    <div style={{ background: 'var(--c-bg)', minHeight: '100vh' }}>
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-black mb-5" style={{ color: 'var(--c-accent)', background: 'rgba(32,200,117,0.10)', border: '1px solid rgba(32,200,117,0.24)' }}>
              <Sparkles size={14} />
              {t.badge}
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-5" style={{ color: 'var(--c-text)' }}>{t.title}</h1>
            <p className="text-base md:text-lg leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.subtitle}</p>
          </div>

          <section className="mb-20">
            <div className="flex items-end justify-between gap-5 mb-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.oneTimeLabel}</p>
                <h2 className="text-3xl font-black" style={{ color: 'var(--c-text)' }}>{t.oneTimeTitle}</h2>
              </div>
              <CircleDollarSign className="hidden md:block" size={28} style={{ color: 'var(--c-gold)' }} />
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
              {oneTimePackages.map(plan => <PlanCard key={plan.id} plan={plan} lang={lang} labels={t} compact />)}
            </div>
          </section>

          <section className="mb-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-7">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{t.careLabel}</p>
                <h2 className="text-3xl font-black mb-2" style={{ color: 'var(--c-text)' }}>{t.careTitle}</h2>
                <p className="text-sm max-w-2xl" style={{ color: 'var(--c-muted)' }}>{t.careSub}</p>
              </div>
              <div className="inline-flex rounded-xl p-1" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                {[
                  ['monthly', t.monthly],
                  ['yearly', t.yearly],
                ].map(([id, label]) => (
                  <button key={id} onClick={() => setBilling(id)} className="rounded-lg px-5 py-2.5 text-sm font-black transition-all" style={{ background: billing === id ? 'var(--c-accent)' : 'transparent', color: billing === id ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-4">
              {recurringPlans.map(plan => (
                <PlanCard key={plan.id} plan={plan} lang={lang} labels={t} suffix={billing === 'monthly' ? t.monthSuffix : t.yearSuffix} compact />
              ))}
            </div>
          </section>

          <section className="grid lg:grid-cols-3 gap-4 mb-16">
            {[
              { icon: CreditCard, title: t.paymentTitle, text: t.paymentText },
              { icon: ShieldCheck, title: t.careDiffTitle, text: t.careDiffText },
              { icon: HelpCircle, title: t.bestTitle, text: t.bestText },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-2xl p-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                <Icon size={22} className="mb-4" style={{ color: title === t.paymentTitle ? 'var(--c-gold)' : 'var(--c-accent)' }} />
                <h3 className="font-black mb-2" style={{ color: 'var(--c-text)' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
              </div>
            ))}
          </section>

          <div className="rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-5" style={{ background: 'linear-gradient(145deg, rgba(15,81,50,0.82), rgba(2,16,10,0.88))', border: '1px solid rgba(32,200,117,0.28)' }}>
            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-2">{t.ctaTitle}</h2>
              <p className="text-sm leading-relaxed" style={{ color: '#CDE4D4' }}>{t.ctaText}</p>
            </div>
            <Link to="/setup" className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-4 text-sm font-black shrink-0" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
              {t.cta} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
