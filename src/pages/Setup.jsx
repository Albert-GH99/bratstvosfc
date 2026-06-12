import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Globe2,
  LayoutGrid,
  Send,
  Sparkles,
} from 'lucide-react';
import { businessSystems, getFeatureList, getSystemName, getText, oneTimePackages, subscriptionPlans } from '../data/systems';
import { useLang } from '@/context/LanguageContext';
import { supabase } from '../lib/supabase';
import GradientBackground from '@/components/premium/GradientBackground';
import PremiumButton from '@/components/premium/PremiumButton';
import PremiumCard from '@/components/premium/PremiumCard';
import PriceSummary from '@/components/premium/PriceSummary';
import SectionShell from '@/components/premium/SectionShell';
import SystemShowcaseVisual from '@/components/premium/SystemShowcaseVisual';
import { getDomainPricing, getDomainYearlyPrice } from '@/config/domainPricing';
import { buildDomainSuggestions, checkDomainAvailability, normalizeDomainName } from '@/services/domainAvailability';

const MAX_SYSTEMS = 3;
const CUSTOM_SYSTEM_ID = 'custom-website';

const industryOptions = [
  {
    id: 'retail',
    en: 'Retail / Online Shop',
    my: 'Retail / Online Shop',
    systems: ['ecommerce', CUSTOM_SYSTEM_ID],
    helper: {
      en: 'Best for product catalogues, checkout, payment records and customer lists.',
      my: 'Sesuai untuk katalog produk, checkout, rekod payment dan senarai customer.',
    },
  },
  {
    id: 'fnb',
    en: 'Food & Beverage',
    my: 'Food & Beverage',
    systems: ['food-order', 'ecommerce', CUSTOM_SYSTEM_ID],
    helper: {
      en: 'Best for menu orders, preorder, pickup, delivery and small food sellers.',
      my: 'Sesuai untuk menu order, preorder, pickup, delivery dan penjual makanan kecil.',
    },
  },
  {
    id: 'restaurant',
    en: 'Restaurant / Cafe',
    my: 'Restaurant / Cafe',
    systems: ['food-order', 'booking', CUSTOM_SYSTEM_ID],
    helper: {
      en: 'Food Order fits dine-in QR and online orders. Booking helps if you run events, activities or table sessions.',
      my: 'Food Order sesuai untuk QR dine-in dan online order. Booking sesuai jika ada event, aktiviti atau sesi meja.',
    },
  },
  {
    id: 'event',
    en: 'Hiking / Travel / Event',
    my: 'Hiking / Travel / Event',
    systems: ['booking', 'ecommerce', CUSTOM_SYSTEM_ID],
    helper: {
      en: 'Best for trips, classes, workshops, participant slots and merchandise.',
      my: 'Sesuai untuk trip, kelas, workshop, slot peserta dan merchandise.',
    },
  },
  {
    id: 'service',
    en: 'Clinic / Beauty / Service',
    my: 'Clinic / Beauty / Service',
    systems: ['appointment', CUSTOM_SYSTEM_ID],
    helper: {
      en: 'Best for scheduled services, staff calendars, appointment reminders and customer records.',
      my: 'Sesuai untuk servis berjadual, calendar staff, appointment reminder dan rekod customer.',
    },
  },
  {
    id: 'runners',
    en: 'Company With Internal Runners',
    my: 'Syarikat Dengan Runner Sendiri',
    systems: ['dispatch', 'appointment', CUSTOM_SYSTEM_ID],
    helper: {
      en: 'Best for HR/admin teams that assign jobs and monitor internal runners or field staff.',
      my: 'Sesuai untuk HR/admin yang assign job dan monitor runner atau staff lapangan.',
    },
  },
  {
    id: 'general',
    en: 'General SME / Not Sure',
    my: 'General SME / Tak Pasti',
    systems: ['ecommerce', 'booking', 'appointment', 'food-order', 'dispatch', CUSTOM_SYSTEM_ID],
    helper: {
      en: 'Not sure? Choose Custom Website/System and we will suggest the cleanest flow.',
      my: 'Tak pasti? Pilih Custom Website/System dan kami bantu cadangkan flow paling kemas.',
    },
  },
];

const copy = {
  en: {
    label: 'Guided setup',
    title: 'Build your business system package.',
    subtitle: 'Choose your industry first. We will show the most suitable systems, then you choose the package and submit your business details.',
    steps: ['Industry', 'Systems', 'Package', 'Add-ons', 'Details', 'Review'],
    industryTitle: 'Choose your industry',
    industrySub: 'This filters the systems so the choices feel clearer.',
    suggested: 'Suggested systems',
    allSystems: 'All systems',
    selected: 'Selected',
    maxMessage: 'For more than 3 systems, we recommend Custom System so the flow stays cleaner and pricing can be arranged around your real needs.',
    switchCustom: 'Switch to Custom System',
    systemTitle: 'Choose up to 3 systems',
    systemSub: 'Select the flow your business needs: orders, bookings, appointments, staff dispatch or a custom system.',
    packageTitle: 'Choose package',
    packageSub: 'Business is usually the best starting point for growing SMEs that need a professional owner dashboard.',
    benefits: 'Included at this package',
    optionalTitle: 'Optional add-ons',
    careLabel: 'Monthly care plan',
    careSub: 'Add hosting, maintenance and support after launch. You can skip this for now.',
    noCare: 'No care plan',
    noCareSelected: 'No care plan selected.',
    noCareNote: 'You can add it later from the dashboard if needed.',
    monthlyTotal: 'Monthly total',
    monthly: 'Monthly',
    yearly: 'Yearly',
    domainTitle: 'Domain option',
    domainSubdomain: 'Bratstvo path link',
    domainCustom: 'Future custom domain from RM125/year',
    customDomain: 'Your domain',
    domainName: 'Business/domain name',
    domainHint: 'Launch link stays path-based first: bratstvosfc.com/bisnesanda. Custom domain is a future/Business yearly option and will not be automated yet.',
    domainPriceNote: 'Final price depends on selected extension.',
    domainCheckNote: 'Initial check only. Domain will be confirmed again before purchase.',
    domainAdminMessage: 'Availability will be confirmed before purchase.',
    domainCheckError: 'Domain could not be checked right now. Try again or use a Bratstvo path link first.',
    checkDomain: 'Check domain',
    checkingDomain: 'Checking...',
    selectDomain: 'Select',
    selectedDomain: 'Selected domain',
    subdomainPreview: 'Use Bratstvo path link',
    domainAvailable: 'Available',
    domainTaken: 'Taken',
    domainPremium: 'Premium',
    domainManual: 'Admin confirmation needed',
    domainError: 'Error',
    detailsTitle: 'Business details',
    detailsSub: 'Tell us what feels messy now and what should look professional after setup.',
    businessName: 'Business name',
    ownerName: 'Your name',
    phone: 'WhatsApp number (+60...)',
    email: 'Email address',
    notes: 'What do you sell, how do customers order/book now, and what is the main problem?',
    customNeeds: 'Tell us what you need',
    customNeedsPlaceholder: 'Website pages, customer actions, integrations, examples, appointment needs or custom business process.',
    consultDate: 'Preferred consultation date',
    consultTime: 'Preferred consultation time',
    pricingTitle: 'Review summary',
    selectedSystems: 'Selected systems',
    subtotal: 'Subtotal',
    discount: 'Bundle discount',
    discountAmount: 'Discount amount',
    estimatedTotal: 'Estimated setup',
    customQuote: 'Custom quote after review',
    quoteNote: 'Final quote is confirmed after we understand your business needs.',
    maxNote: 'Max 3 systems',
    paymentInstruction: 'Payment instruction will be sent after Bratstvo reviews your request.',
    submit: 'Submit setup request',
    submitting: 'Submitting...',
    emailError: 'Please enter a valid email address.',
    requiredError: 'Please complete the required details before submitting.',
    submitError: 'We could not submit your request right now. Please try again.',
    whatsappIntro: 'Hi Bratstvo Digital, I want to start a system setup.',
  },
  my: {
    label: 'Setup berpandu',
    title: 'Bina pakej sistem anda.',
    subtitle: 'Pilih industri dahulu. Kami akan tunjuk sistem yang paling sesuai, kemudian anda pilih pakej dan hantar detail bisnes.',
    steps: ['Industri', 'Sistem', 'Pakej', 'Add-on', 'Detail', 'Review'],
    industryTitle: 'Pilih industri anda',
    industrySub: 'Ini tapis cadangan sistem supaya pilihan lebih jelas.',
    suggested: 'Sistem dicadangkan',
    allSystems: 'Semua sistem',
    selected: 'Dipilih',
    maxMessage: 'Untuk gabungan lebih daripada 3 sistem, kami cadangkan Custom System supaya flow lebih kemas dan harga boleh disusun ikut keperluan sebenar.',
    switchCustom: 'Tukar ke Custom System',
    systemTitle: 'Pilih sehingga 3 sistem',
    systemSub: 'Pilih flow yang bisnes anda perlukan: order, booking, appointment, dispatch staff atau custom system.',
    packageTitle: 'Pilih pakej',
    packageSub: 'Business biasanya titik mula terbaik untuk SME yang sedang berkembang dan perlukan dashboard owner yang professional.',
    benefits: 'Apa yang termasuk',
    optionalTitle: 'Add-on pilihan',
    careLabel: 'Monthly care plan',
    careSub: 'Tambah hosting, maintenance dan support selepas launch. Boleh skip dahulu.',
    noCare: 'Tiada care plan',
    noCareSelected: 'Tiada care plan dipilih.',
    noCareNote: 'Boleh tambah kemudian dari dashboard jika perlu.',
    monthlyTotal: 'Jumlah bulanan',
    monthly: 'Bulanan',
    yearly: 'Tahunan',
    domainTitle: 'Pilihan domain',
    domainSubdomain: 'Link path Bratstvo',
    domainCustom: 'Custom domain masa depan dari RM125/tahun',
    customDomain: 'Domain anda',
    domainName: 'Nama bisnes/domain',
    domainHint: 'Link launch kekal path-based dahulu: bratstvosfc.com/bisnesanda. Custom domain ialah pilihan masa depan/Business yearly dan belum diautomasi.',
    domainPriceNote: 'Harga akhir bergantung pada extension yang dipilih.',
    domainCheckNote: 'Semakan awal sahaja. Domain akan disahkan semula sebelum pembelian.',
    domainAdminMessage: 'Domain akan disahkan sebelum pembelian.',
    domainCheckError: 'Domain tak dapat disemak sekarang. Cuba lagi atau pilih link path Bratstvo dahulu.',
    checkDomain: 'Semak domain',
    checkingDomain: 'Sedang semak...',
    selectDomain: 'Pilih',
    selectedDomain: 'Domain dipilih',
    subdomainPreview: 'Guna link path Bratstvo',
    domainAvailable: 'Available',
    domainTaken: 'Taken',
    domainPremium: 'Premium',
    domainManual: 'Perlu confirmation admin',
    domainError: 'Error',
    detailsTitle: 'Detail bisnes',
    detailsSub: 'Ceritakan apa yang serabut sekarang dan apa yang perlu nampak professional selepas setup.',
    businessName: 'Nama bisnes',
    ownerName: 'Nama anda',
    phone: 'Nombor WhatsApp (+60...)',
    email: 'Email',
    notes: 'Apa yang anda jual, cara customer order/booking sekarang, dan masalah utama?',
    customNeeds: 'Ceritakan apa yang anda perlukan',
    customNeedsPlaceholder: 'Page website, tindakan customer, integration, contoh rujukan, keperluan appointment atau workflow khas.',
    consultDate: 'Tarikh consultation pilihan',
    consultTime: 'Masa consultation pilihan',
    pricingTitle: 'Review ringkasan',
    selectedSystems: 'Sistem dipilih',
    subtotal: 'Subtotal',
    discount: 'Diskaun bundle',
    discountAmount: 'Jumlah diskaun',
    estimatedTotal: 'Anggaran setup',
    customQuote: 'Custom quote selepas review',
    quoteNote: 'Quote akhir disahkan selepas kami faham keperluan bisnes anda.',
    maxNote: 'Maksimum 3 sistem',
    paymentInstruction: 'Payment instruction akan dihantar selepas Bratstvo review request anda.',
    submit: 'Hantar setup request',
    submitting: 'Sedang hantar...',
    emailError: 'Sila masukkan alamat e-mel yang sah.',
    requiredError: 'Sila lengkapkan detail wajib sebelum hantar.',
    submitError: 'Request anda tak dapat dihantar buat masa sekarang. Sila cuba lagi.',
    whatsappIntro: 'Hai Bratstvo Digital, saya nak mula setup sistem.',
  },
};

function packageLabel(plan, suffix = '') {
  if (plan.priceLabel) return `${plan.name} - ${plan.priceLabel}`;
  return `${plan.name} - RM${Number(plan.price).toLocaleString()}${suffix}`;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

function makeRequestId() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
  const suffix = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `BD-${stamp}-${suffix}`;
}

function discountFor(count) {
  if (count >= 3) return 0.5;
  if (count === 2) return 0.25;
  return 0;
}

function isCustomSystem(system) {
  return system?.priceMode === 'custom' || system?.id === CUSTOM_SYSTEM_ID;
}

function isCustomPackage(plan) {
  return Boolean(plan?.priceLabel);
}

function billingPlanLabel(value, lang = 'en') {
  const labels = {
    monthly: lang === 'en' ? 'Monthly plan' : 'Pelan bulanan',
    yearly: lang === 'en' ? 'Yearly plan' : 'Pelan tahunan',
    none: lang === 'en' ? 'No care plan for now' : 'Tiada care plan dahulu',
  };
  return labels[value] || labels.none;
}

function formatMoney(value) {
  return `RM${Number(value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function isSelectableDomainStatus(status) {
  return ['available', 'premium', 'manual_confirmation_required'].includes(status);
}

function setupSlug(value) {
  return normalizeDomainName(value || 'client') || 'client';
}

function SetupStepper({ steps, current }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-2xl p-2 sm:grid-cols-6" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      {steps.map((step, index) => {
        const active = index <= current;
        return (
          <div key={step} className="rounded-xl px-2 py-3 text-center" style={{ background: active ? 'var(--c-primary-soft)' : 'transparent', color: active ? 'var(--c-text)' : 'var(--c-muted)' }}>
            <span className="mx-auto mb-1 grid h-6 w-6 place-items-center rounded-full text-[10px] font-black" style={{ background: active ? 'var(--c-accent)' : 'var(--c-input-bg)', color: active ? 'var(--c-accent-contrast)' : 'var(--c-muted)' }}>{index + 1}</span>
            <span className="block truncate text-[10px] font-black md:text-xs">{step}</span>
          </div>
        );
      })}
    </div>
  );
}

function Field({ value, onChange, placeholder, type = 'text' }) {
  return (
    <input
      value={value}
      onChange={event => onChange(event.target.value)}
      type={type}
      placeholder={placeholder}
      className="premium-input w-full px-4 py-3.5 text-sm outline-none"
    />
  );
}

export default function Setup() {
  const { lang } = useLang();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const t = copy[lang] || copy.en;
  const querySystemId = searchParams.get('system');
  const queryPackage = searchParams.get('package');
  const initialSystem = businessSystems.find(system => system.id === querySystemId) || null;
  const initialPackage =
    oneTimePackages.find(plan => plan.id === String(queryPackage || '').toLowerCase()) ||
    oneTimePackages.find(plan => plan.name.toLowerCase() === String(queryPackage || '').toLowerCase()) ||
    oneTimePackages[2];

  const [openOptional, setOpenOptional] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [selectionError, setSelectionError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [domainChecks, setDomainChecks] = useState({});
  const [checkingDomains, setCheckingDomains] = useState(false);
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    email: '',
    industry: '',
    selectedSystemIds: initialSystem ? [initialSystem.id] : [],
    packageId: initialPackage.id,
    billingPlan: 'none',
    careType: 'monthly',
    careId: 'none',
    domainType: 'bratstvo_domain',
    customDomain: '',
    requestedDomainName: '',
    requestedDomainExtension: '',
    requestedFullDomain: '',
    domainStatus: '',
    customNeeds: '',
    consultationDate: '',
    consultationTime: '',
    notes: '',
  });

  const selectedIndustry = industryOptions.find(item => item.id === form.industry);
  const recommendedIds = selectedIndustry?.systems || businessSystems.map(system => system.id);
  const recommendedSystems = useMemo(() => {
    const priority = new Map(recommendedIds.map((id, index) => [id, index]));
    return businessSystems
      .filter(system => !selectedIndustry || priority.has(system.id))
      .sort((a, b) => (priority.get(a.id) ?? 99) - (priority.get(b.id) ?? 99));
  }, [recommendedIds, selectedIndustry]);

  const selectedSystems = useMemo(
    () => form.selectedSystemIds.map(id => businessSystems.find(system => system.id === id)).filter(Boolean),
    [form.selectedSystemIds],
  );
  const selectedPackage = oneTimePackages.find(plan => plan.id === form.packageId) || oneTimePackages[0];
  const visibleCareOptions = subscriptionPlans[form.careType] || [];
  const selectedCare = form.careId === 'none' ? null : visibleCareOptions.find(plan => plan.id === form.careId);
  const hasCustomSystem = selectedSystems.some(isCustomSystem);
  const hasCustomPackage = isCustomPackage(selectedPackage);
  const customQuote = hasCustomSystem || hasCustomPackage;
  const domainAddon = form.domainType === 'custom_domain';
  const domainSuggestions = useMemo(() => buildDomainSuggestions(form.requestedDomainName || form.customDomain), [form.customDomain, form.requestedDomainName]);
  const selectedDomainCheck = form.requestedFullDomain ? domainChecks[form.requestedFullDomain] : null;
  const selectedDomainPricing = getDomainPricing(form.requestedDomainExtension);
  const selectedDomainYearlyPrice = domainAddon && form.requestedFullDomain ? getDomainYearlyPrice(form.requestedDomainExtension) : 0;
  const pathBasedLink = `bratstvosfc.com/${setupSlug(form.businessName || 'bisnesanda')}`;

  const pricing = useMemo(() => {
    const fixedSystems = selectedSystems.filter(system => !isCustomSystem(system) && !hasCustomPackage);
    const fixedPrice = Number(selectedPackage.price || 0);
    const subtotal = fixedSystems.length * fixedPrice;
    const discountPercent = discountFor(selectedSystems.length);
    const discountAmount = subtotal * discountPercent;
    const setupTotal = Math.max(0, subtotal - discountAmount);
    const planPrice = selectedCare ? Number(selectedCare.price || 0) : 0;
    const domainPrice = selectedDomainYearlyPrice;
    const total = setupTotal + planPrice + domainPrice;

    return {
      subtotal,
      discountPercent,
      discountAmount,
      setupTotal,
      planPrice,
      domainPrice,
      total,
      subtotalLabel: customQuote && subtotal === 0 ? t.customQuote : customQuote ? `${formatMoney(subtotal)} + ${t.customQuote}` : formatMoney(subtotal),
      totalLabel: customQuote && total === 0 ? t.customQuote : customQuote ? `${formatMoney(total)} + ${t.customQuote}` : formatMoney(total),
    };
  }, [customQuote, hasCustomPackage, selectedCare, selectedDomainYearlyPrice, selectedPackage.price, selectedSystems, t.customQuote]);

  const canSubmit =
    selectedSystems.length > 0 &&
    form.businessName &&
    form.ownerName &&
    form.phone &&
    form.email &&
    isValidEmail(form.email) &&
    form.industry &&
    (!domainAddon || (form.requestedDomainName && form.requestedFullDomain)) &&
    (!hasCustomSystem || (form.customNeeds.trim() && form.consultationDate && form.consultationTime));

  const set = (key, value) => {
    setSubmitError('');
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const chooseIndustry = id => {
    set('industry', id);
    setSelectionError('');
    setActiveStep(1);
  };

  const switchToCustom = () => {
    setSelectionError('');
    setForm(prev => ({ ...prev, selectedSystemIds: [CUSTOM_SYSTEM_ID] }));
    setActiveStep(3);
  };

  const toggleSystem = systemId => {
    setSelectionError('');
    setForm(prev => {
      const exists = prev.selectedSystemIds.includes(systemId);
      if (exists) return { ...prev, selectedSystemIds: prev.selectedSystemIds.filter(id => id !== systemId) };
      if (prev.selectedSystemIds.length >= MAX_SYSTEMS) {
        setSelectionError(t.maxMessage);
        return prev;
      }
      return { ...prev, selectedSystemIds: [...prev.selectedSystemIds, systemId] };
    });
    setActiveStep(2);
  };

  const chooseCareType = type => {
    setForm(prev => ({
      ...prev,
      billingPlan: type,
      careType: type === 'yearly' ? 'yearly' : 'monthly',
      careId: 'none',
    }));
  };

  const updateDomainName = value => {
    const normalized = normalizeDomainName(value);
    setDomainChecks({});
    setForm(prev => ({
      ...prev,
      requestedDomainName: normalized,
      requestedDomainExtension: '',
      requestedFullDomain: '',
      customDomain: '',
      domainStatus: '',
    }));
  };

  const runDomainCheck = async () => {
    if (!domainSuggestions.length || checkingDomains) return;
    setCheckingDomains(true);
    setDomainChecks(Object.fromEntries(domainSuggestions.map(item => [item.domain, { domain: item.domain, status: 'checking', message: t.checkingDomain }])));

    try {
      const data = await checkDomainAvailability(form.requestedDomainName || form.customDomain);
      setDomainChecks(Object.fromEntries((data.results || []).map(result => [result.domain, result])));
    } finally {
      setCheckingDomains(false);
    }
  };

  const selectDomain = suggestion => {
    const check = domainChecks[suggestion.domain] || {
      domain: suggestion.domain,
      status: 'error',
      message: t.domainCheckError,
    };

    if (!isSelectableDomainStatus(check.status)) return;

    setForm(prev => ({
      ...prev,
      requestedDomainName: suggestion.name,
      requestedDomainExtension: suggestion.extension,
      requestedFullDomain: suggestion.domain,
      customDomain: suggestion.domain,
      domainStatus: check.status,
    }));
  };

  const buildMessage = (request, summary) => `${t.whatsappIntro}

Request ID: ${request.request_id}
Business: ${request.business_name}
Owner: ${request.owner_name}
WhatsApp: ${request.whatsapp}
Email: ${request.email}
Industry: ${request.industry}
Systems: ${request.selected_system}
Package: ${request.selected_package}
Billing: ${billingPlanLabel(request.billing_plan, lang)}
Estimate: ${pricing.totalLabel}
Notes: ${summary.notes}`;

  const submit = async () => {
    setSubmitError('');

    if (!canSubmit) {
      setSubmitError(form.email && !isValidEmail(form.email) ? t.emailError : t.requiredError);
      setActiveStep(4);
      return;
    }

    setIsSubmitting(true);

    const requestId = makeRequestId();
    const systemNames = selectedSystems.map(system => getSystemName(system, lang));
    const phoneValue = form.phone || '';
    const pricingNote = [
      `Selected systems: ${systemNames.join(', ')}`,
      `Package: ${selectedPackage.name}`,
      `Subtotal: ${pricing.subtotalLabel}`,
      `Discount: ${Math.round(pricing.discountPercent * 100)}% (${formatMoney(pricing.discountAmount)})`,
      `Domain add-on: ${domainAddon ? `${formatMoney(selectedDomainYearlyPrice)}/year - ${form.requestedFullDomain || form.customDomain}` : `No - ${pathBasedLink}`}`,
      domainAddon ? `Domain status: ${form.domainStatus || 'pending_check'}` : '',
      `Estimated total: ${pricing.totalLabel}`,
      `Payment: Official payment instruction will be sent by email after review.`,
      hasCustomSystem ? `Custom needs: ${form.customNeeds}` : '',
      hasCustomSystem ? `Preferred consultation: ${form.consultationDate} ${form.consultationTime}` : '',
      hasCustomPackage ? `Package requires a custom quote.` : '',
      t.quoteNote,
    ].filter(Boolean).join('\n');

    const payload = {
      request_id: requestId,
      business_name: form.businessName,
      owner_name: form.ownerName,
      whatsapp: phoneValue,
      phone: phoneValue,
      email: form.email,
      industry: selectedIndustry ? (lang === 'en' ? selectedIndustry.en : selectedIndustry.my) : form.industry,
      system_id: form.selectedSystemIds.join(','),
      selected_system: systemNames.join(' + '),
      selected_package: customQuote ? `${selectedPackage.name} + ${t.customQuote}` : selectedPackage.name,
      billing_plan: form.billingPlan || 'none',
      domain_type: form.domainType || 'bratstvo_domain',
      custom_domain: form.domainType === 'custom_domain' ? (form.requestedFullDomain || form.customDomain || '') : '',
      requested_domain_name: domainAddon ? form.requestedDomainName : '',
      requested_domain_extension: domainAddon ? form.requestedDomainExtension : '',
      requested_full_domain: domainAddon ? form.requestedFullDomain : '',
      domain_status: domainAddon ? (form.domainStatus || 'pending_check') : 'not_requested',
      selected_domain: domainAddon ? form.requestedFullDomain : '',
      selected_domain_extension: domainAddon ? form.requestedDomainExtension : '',
      domain_yearly_price: domainAddon ? selectedDomainYearlyPrice : 0,
      domain_check_status: domainAddon ? (form.domainStatus || 'pending_check') : 'not_requested',
      domain_provider_preference: domainAddon ? 'spaceship' : '',
      domain_requires_manual_confirmation: domainAddon ? form.domainStatus === 'manual_confirmation_required' : false,
      setup_price: pricing.setupTotal,
      plan_price: pricing.planPrice,
      domain_price: pricing.domainPrice,
      total_amount: pricing.total,
      balance_amount: pricing.total,
      notes: [form.notes, pricingNote].filter(Boolean).join('\n\n'),
      status: 'pending',
      payment_status: 'pending_review',
      payment_method: 'manual_bank_transfer',
      payment_instruction_status: 'pending_review',
      payment_instruction_sent_at: null,
      receipt_url: null,
      payment_notes: 'Payment instruction rasmi akan dihantar melalui email selepas request disemak.',
      client_website_status: 'pending_setup',
      created_at: new Date().toISOString(),
    };

    const summary = {
      businessName: form.businessName,
      ownerName: form.ownerName,
      phone: form.phone,
      email: form.email,
      industry: payload.industry,
      system: payload.selected_system,
      package: payload.selected_package,
      care: billingPlanLabel(payload.billing_plan, lang),
      notes: form.notes || (lang === 'en' ? 'No notes' : 'Tiada nota'),
      pricing: pricing.totalLabel,
      paymentStatus: 'Pending review',
      paymentInstructionStatus: 'pending_review',
      requestedDomain: domainAddon ? form.requestedFullDomain : '',
      publicLink: pathBasedLink,
    };

    try {
      if (!supabase) throw new Error('Supabase is not configured.');

      let { error } = await supabase
        .from('setup_requests')
        .insert(payload);

      if (error && /requested_domain|selected_domain|domain_yearly_price|domain_check_status|domain_provider_preference|domain_requires_manual_confirmation|domain_status|payment_instruction_status|schema cache|column/i.test(error.message || '')) {
        const {
          requested_domain_name,
          requested_domain_extension,
          requested_full_domain,
          domain_status,
          selected_domain,
          selected_domain_extension,
          domain_yearly_price,
          domain_check_status,
          domain_provider_preference,
          domain_requires_manual_confirmation,
          payment_method,
          payment_instruction_status,
          payment_instruction_sent_at,
          receipt_url,
          payment_notes,
          ...legacyPayload
        } = payload;

        const retry = await supabase
          .from('setup_requests')
          .insert(legacyPayload);

        error = retry.error;
      }

      if (error) throw error;

      const request = payload;
      const successPayload = {
        id: request.id,
        request_id: request.request_id,
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
        pricing: summary.pricing,
        paymentStatus: summary.paymentStatus,
        paymentInstructionStatus: summary.paymentInstructionStatus,
        requestedDomain: summary.requestedDomain,
        publicLink: summary.publicLink,
        whatsappMessage: buildMessage(request, summary),
      };

      window.localStorage.setItem('bd_pending_setup', JSON.stringify(successPayload));
      navigate('/setup-processing', { state: successPayload });
    } catch (error) {
      console.error('Setup submit failed:', error);
      setSubmitError(error.message || t.submitError);
    } finally {
      setIsSubmitting(false);
    }
  };

  const packageBenefits = selectedSystems
    .flatMap(system => getFeatureList(system.featuresByPackage?.[selectedPackage.name], lang))
    .slice(0, 6);

  return (
    <GradientBackground className="page-shell">
      <SectionShell className="pt-10 md:pt-12" eyebrow={t.label} title={t.title} subtitle={t.subtitle}>
        <div className="mb-6">
          <SetupStepper steps={t.steps} current={activeStep} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <PremiumCard className="p-5 md:p-7" hover={false}>
              <div className="mb-5">
                <p className="premium-eyebrow mb-2">{t.steps[0]}</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{t.industryTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.industrySub}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {industryOptions.map(item => {
                  const active = form.industry === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => chooseIndustry(item.id)}
                      className="rounded-2xl p-4 text-left"
                      style={{
                        background: active ? 'var(--c-primary-soft)' : 'var(--c-input-bg)',
                        border: active ? '1px solid var(--c-accent)' : '1px solid var(--c-border)',
                      }}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{lang === 'en' ? item.en : item.my}</span>
                        {active && <CheckCircle2 size={17} style={{ color: 'var(--c-accent)' }} />}
                      </div>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(item.helper, lang)}</p>
                    </button>
                  );
                })}
              </div>
            </PremiumCard>

            <PremiumCard className="p-5 md:p-7" hover={false}>
              <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="premium-eyebrow mb-2">{selectedIndustry ? t.suggested : t.allSystems}</p>
                  <h2 className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{t.systemTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                    {selectedIndustry ? getText(selectedIndustry.helper, lang) : t.systemSub}
                  </p>
                </div>
                <span className="inline-flex rounded-full px-3 py-1 text-xs font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
                  {selectedSystems.length}/{MAX_SYSTEMS} - {t.maxNote}
                </span>
              </div>

              {selectionError && (
                <div className="mb-4 rounded-2xl p-4" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.28)' }}>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--c-text)' }}>{selectionError}</p>
                  <PremiumButton variant="secondary" className="mt-3 px-4 py-2.5 text-xs" onClick={switchToCustom}>
                    {t.switchCustom} <ArrowRight size={14} />
                  </PremiumButton>
                </div>
              )}

              <motion.div initial="hidden" animate="show" transition={{ staggerChildren: 0.045 }} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {recommendedSystems.map(system => {
                  const active = form.selectedSystemIds.includes(system.id);
                  const disabled = !active && form.selectedSystemIds.length >= MAX_SYSTEMS;
                  const custom = isCustomSystem(system) || hasCustomPackage;

                  return (
                    <motion.button
                      key={system.id}
                      type="button"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={!disabled ? { y: -5 } : undefined}
                      whileTap={!disabled ? { scale: 0.98 } : undefined}
                      onClick={() => !disabled && toggleSystem(system.id)}
                      disabled={disabled}
                      className="relative overflow-hidden rounded-[24px] p-3 text-left disabled:opacity-45"
                      style={{
                        background: active ? 'linear-gradient(145deg, var(--c-primary-soft), var(--c-surface))' : 'var(--c-input-bg)',
                        border: active ? '1px solid rgba(24,217,138,.54)' : '1px solid var(--c-border)',
                        boxShadow: active ? '0 22px 65px rgba(18,185,120,.14)' : 'none',
                      }}
                    >
                      {active && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                          <CheckCircle2 size={16} />
                        </motion.span>
                      )}
                      <SystemShowcaseVisual type={system.demoType} label={custom ? t.customQuote : selectedPackage.name} compact />
                      <div className="px-1 pb-2 pt-4">
                        <h3 className="text-lg font-black leading-tight" style={{ color: 'var(--c-text)' }}>{getText(system.shortName, lang)}</h3>
                        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(system.description, lang)}</p>
                        <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--c-text)' }}>{getText(system.suitableFor, lang)}</p>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </PremiumCard>

            <PremiumCard className="p-5 md:p-7" hover={false}>
              <div className="mb-5">
                <p className="premium-eyebrow mb-2">{t.steps[2]}</p>
                <h2 className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{t.packageTitle}</h2>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.packageSub}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                {oneTimePackages.map(plan => {
                  const active = form.packageId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => {
                        set('packageId', plan.id);
                        setActiveStep(3);
                      }}
                      className="rounded-2xl p-4 text-left"
                      style={{
                        background: active ? 'var(--c-primary-soft)' : 'var(--c-input-bg)',
                        border: active ? '1px solid var(--c-accent)' : '1px solid var(--c-border)',
                      }}
                    >
                      <span className="block text-sm font-black" style={{ color: 'var(--c-text)' }}>{packageLabel(plan)}</span>
                      {plan.bestFor && <span className="mt-2 block text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(plan.bestFor, lang)}</span>}
                    </button>
                  );
                })}
              </div>
              {packageBenefits.length > 0 && (
                <div className="mt-5 rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                  <p className="mb-3 text-xs font-black" style={{ color: 'var(--c-muted)' }}>{t.benefits}</p>
                  <div className="flex flex-wrap gap-2">
                    {packageBenefits.map(item => (
                      <span key={item} className="rounded-full px-3 py-1 text-xs font-black" style={{ background: 'var(--c-surface)', color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>{item}</span>
                    ))}
                  </div>
                </div>
              )}
              {selectedSystems.length > 0 && (
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  {selectedSystems.map(system => {
                    const features = getFeatureList(system.featuresByPackage?.[selectedPackage.name] || system.packageBreakdown?.[selectedPackage.name], lang);
                    return (
                      <div key={`${system.id}-${selectedPackage.name}`} className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                        <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{getSystemName(system, lang)}</p>
                        <p className="mt-1 text-xs font-bold" style={{ color: 'var(--c-accent)' }}>{selectedPackage.name}</p>
                        <ul className="mt-3 space-y-2">
                          {features.map(feature => (
                            <li key={feature} className="flex gap-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                              <CheckCircle2 size={13} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              )}
            </PremiumCard>

            <PremiumCard className="p-5 md:p-7" hover={false}>
              <button type="button" onClick={() => setOpenOptional(value => !value)} className="flex w-full items-center justify-between gap-4 text-left">
                <span>
                  <span className="premium-eyebrow mb-2 block">{t.optionalTitle}</span>
                  <span className="block text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.careSub}</span>
                </span>
                <ChevronDown size={18} style={{ color: 'var(--c-muted)', transform: openOptional ? 'rotate(180deg)' : 'rotate(0deg)' }} />
              </button>
              {openOptional && (
                <div className="mt-5 grid gap-5 xl:grid-cols-2">
                  <div>
                    <p className="mb-3 text-sm font-black" style={{ color: 'var(--c-text)' }}>{t.careLabel}</p>
                    <div className="mb-4 flex flex-wrap gap-2">
                      {[
                        ['none', t.noCare],
                        ['monthly', t.monthly],
                        ['yearly', t.yearly],
                      ].map(([id, label]) => (
                        <button key={id} type="button" onClick={() => chooseCareType(id)} className="rounded-full px-4 py-2 text-xs font-black" style={{ background: form.billingPlan === id ? 'var(--c-accent)' : 'var(--c-input-bg)', color: form.billingPlan === id ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
                          {label}
                        </button>
                      ))}
                    </div>
                    {form.billingPlan === 'none' ? (
                      <div className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                        <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{t.noCareSelected}</p>
                        <p className="mt-1 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.noCareNote}</p>
                      </div>
                    ) : (
                      <div className="grid gap-2">
                        {visibleCareOptions.slice(0, 3).map(plan => {
                          const active = form.careId === plan.id;
                          const suffix = form.careType === 'yearly' ? '/year' : '/month';
                          return (
                            <button key={plan.id} type="button" onClick={() => setForm(prev => ({ ...prev, billingPlan: prev.careType, careId: plan.id }))} className="rounded-xl p-3 text-left" style={{ background: active ? 'var(--c-primary-soft)' : 'var(--c-input-bg)', border: active ? '1px solid var(--c-accent)' : '1px solid var(--c-border)' }}>
                              <span className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{packageLabel(plan, suffix)}</span>
                              <span className="mt-1 block text-[11px] leading-relaxed" style={{ color: 'var(--c-muted)' }}>{getText(plan.includes, lang)?.slice?.(0, 2)?.join?.(' - ') || ''}</span>
                            </button>
                          );
                        })}
                        {selectedCare && (
                          <div className="rounded-xl p-3" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                            <p className="text-xs font-black" style={{ color: 'var(--c-muted)' }}>{t.monthlyTotal}</p>
                            <p className="mt-1 text-lg font-black" style={{ color: 'var(--c-accent)' }}>
                              {form.careType === 'yearly' ? `${formatMoney(selectedCare.price)}/year` : `${formatMoney(selectedCare.price)}/month`}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="mb-3 text-sm font-black" style={{ color: 'var(--c-text)' }}>{t.domainTitle}</p>
                    <div className="grid gap-3">
                      {[
                        ['bratstvo_domain', t.domainSubdomain, LayoutGrid],
                        ['custom_domain', t.domainCustom, Globe2],
                      ].map(([id, label, Icon]) => {
                        const active = form.domainType === id;
                        return (
                          <button key={id} type="button" onClick={() => set('domainType', id)} className="flex items-center gap-3 rounded-2xl p-4 text-left" style={{ background: active ? 'var(--c-primary-soft)' : 'var(--c-input-bg)', border: active ? '1px solid var(--c-accent)' : '1px solid var(--c-border)' }}>
                            <Icon size={18} style={{ color: 'var(--c-accent)' }} />
                            <span className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{label}</span>
                          </button>
                        );
                      })}
                    </div>
                    <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.domainHint}</p>
                    <p className="mt-1 text-xs font-bold" style={{ color: 'var(--c-accent)' }}>{t.domainPriceNote}</p>
                    {form.domainType === 'bratstvo_domain' && (
                      <div className="mt-3 rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                        <p className="text-xs font-black" style={{ color: 'var(--c-muted)' }}>{t.subdomainPreview}</p>
                        <p className="mt-1 break-all text-sm font-black" style={{ color: 'var(--c-text)' }}>
                          {pathBasedLink}
                        </p>
                      </div>
                    )}
                    {form.domainType === 'custom_domain' && (
                      <div className="mt-4 rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                        <label className="block">
                          <span className="mb-2 block text-xs font-bold" style={{ color: 'var(--c-muted)' }}>{t.domainName}</span>
                          <Field value={form.requestedDomainName} onChange={updateDomainName} placeholder="bisnesanda" />
                        </label>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.domainCheckNote}</p>
                          <button type="button" onClick={runDomainCheck} disabled={!domainSuggestions.length || checkingDomains} className="rounded-xl px-4 py-2 text-xs font-black disabled:opacity-50" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
                            {checkingDomains ? t.checkingDomain : t.checkDomain}
                          </button>
                        </div>
                        {domainSuggestions.length > 0 && (
                          <div className="mt-4 grid gap-2">
                            {domainSuggestions.map(suggestion => {
                              const check = domainChecks[suggestion.domain];
                              const selected = form.requestedFullDomain === suggestion.domain;
                              const status = check?.status || 'idle';
                              const selectable = isSelectableDomainStatus(status);
                              const pricingInfo = suggestion.pricing || getDomainPricing(suggestion.extension);
                              const statusLabel = status === 'checking'
                                ? t.checkingDomain
                                : status === 'available'
                                  ? t.domainAvailable
                                  : status === 'premium'
                                    ? `${t.domainPremium}${check?.price ? ` - ${check.currency || ''} ${check.price}` : ''}`
                                    : status === 'manual_confirmation_required'
                                      ? (check?.message || t.domainManual)
                                    : status === 'unavailable'
                                      ? t.domainTaken
                                      : status === 'error'
                                        ? (check?.message || t.domainCheckError)
                                        : t.domainCheckNote;
                              return (
                                <div key={suggestion.domain} className="flex flex-col gap-3 rounded-xl p-3 sm:flex-row sm:items-center sm:justify-between" style={{ background: selected ? 'var(--c-primary-soft)' : 'var(--c-surface)', border: selected ? '1px solid var(--c-accent)' : '1px solid var(--c-border)' }}>
                                  <div>
                                    <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{suggestion.domain}</p>
                                    <p className="mt-1 text-[11px] leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                                      RM{pricingInfo?.sellPrice || 0}/year - {pricingInfo?.label || suggestion.extension}. {pricingInfo?.note || t.domainPriceNote}
                                    </p>
                                    <p className="mt-1 text-[11px] leading-relaxed" style={{ color: status === 'manual_confirmation_required' ? 'var(--c-accent)' : 'var(--c-muted)' }}>{statusLabel}</p>
                                  </div>
                                  <button type="button" onClick={() => selectDomain(suggestion)} disabled={!selectable} className="rounded-lg px-3 py-2 text-xs font-black disabled:opacity-45" style={{ background: selected ? 'var(--c-accent)' : 'var(--c-input-bg)', color: selected ? 'var(--c-accent-contrast)' : 'var(--c-text)', border: '1px solid var(--c-border)' }}>
                                    {selected ? t.selected : t.selectDomain}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                        {selectedDomainCheck && (
                          <div className="mt-3 rounded-xl p-3 text-xs leading-relaxed" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.24)', color: 'var(--c-text)' }}>
                            <strong>{t.selectedDomain}:</strong> {form.requestedFullDomain} - RM{selectedDomainYearlyPrice}/year. {selectedDomainCheck.status === 'manual_confirmation_required' ? t.domainManual : t.domainCheckNote}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </PremiumCard>

            <PremiumCard className="p-5 md:p-7" hover={false}>
              <div className="mb-6 flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
                  <ClipboardList size={19} />
                </span>
                <div>
                  <p className="premium-eyebrow mb-2">{t.steps[3]}</p>
                  <h2 className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{t.detailsTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{t.detailsSub}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Field value={form.businessName} onChange={value => set('businessName', value)} placeholder={t.businessName} />
                <Field value={form.ownerName} onChange={value => set('ownerName', value)} placeholder={t.ownerName} />
                <Field value={form.phone} onChange={value => set('phone', value)} placeholder={t.phone} />
                <Field value={form.email} onChange={value => set('email', value)} placeholder={t.email} type="email" />
              </div>
              {form.email && !isValidEmail(form.email) && <p className="mt-2 text-xs" style={{ color: 'var(--c-muted)' }}>{t.emailError}</p>}

              <textarea value={form.notes} onChange={event => set('notes', event.target.value)} placeholder={t.notes} rows={4} className="premium-input mt-4 w-full resize-none px-4 py-3 text-sm outline-none" />

              {hasCustomSystem && (
                <div className="mt-4 rounded-2xl p-4" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.28)' }}>
                  <p className="mb-3 text-sm font-black" style={{ color: 'var(--c-text)' }}>{t.customQuote}</p>
                  <textarea value={form.customNeeds} onChange={event => set('customNeeds', event.target.value)} placeholder={t.customNeedsPlaceholder} rows={5} className="premium-input w-full resize-none px-4 py-3 text-sm outline-none" />
                  <div className="mt-3 grid gap-3 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold" style={{ color: 'var(--c-muted)' }}>{t.consultDate}</span>
                      <Field value={form.consultationDate} onChange={value => set('consultationDate', value)} type="date" />
                    </label>
                    <label className="block">
                      <span className="mb-2 block text-xs font-bold" style={{ color: 'var(--c-muted)' }}>{t.consultTime}</span>
                      <Field value={form.consultationTime} onChange={value => set('consultationTime', value)} type="time" />
                    </label>
                  </div>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                {submitError && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{submitError}</p>}
                <PremiumButton className="w-full px-6 py-3.5 text-sm sm:ml-auto sm:w-auto" onClick={submit} disabled={isSubmitting}>
                  {isSubmitting ? t.submitting : t.submit} <Send size={16} />
                </PremiumButton>
              </div>
            </PremiumCard>
          </div>

          <PriceSummary
            labels={t}
            selectedSystems={selectedSystems}
            selectedPackage={selectedPackage}
            selectedCare={selectedCare}
            billingPlan={billingPlanLabel(form.billingPlan, lang)}
            pricing={pricing}
            domainAddon={domainAddon}
            customQuote={customQuote}
            requestedDomain={form.requestedFullDomain}
            selectedDomainPricing={selectedDomainPricing}
            domainYearlyPrice={selectedDomainYearlyPrice}
            domainCheckStatus={form.domainStatus}
          />
        </div>
      </SectionShell>
    </GradientBackground>
  );
}
