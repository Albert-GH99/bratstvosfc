import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext();

const en = {
  nav: { home: 'Home', services: 'Services', demo: 'Demo', pricing: 'Pricing', cta: 'Get Started' },
  hero: {
    badge: 'Digital Agency - Malaysia',
    title: 'Websites & Systems\nThat Make Business Look Professional',
    subtitle: 'Professional websites, order systems, booking pages and owner dashboards that help customers buy or book with more confidence.',
    cta1: 'Try Demo',
    cta2: 'View Pricing',
  },
  about: {
    label: 'About Us',
    title: 'Built for Businesses Ready to Scale',
    body: 'Bratstvo Digital is a Malaysia-based digital agency building websites, order systems, booking pages and owner dashboards for growing businesses.',
    stats: [
      { value: '50+', label: 'Projects Delivered' },
      { value: '98%', label: 'Client Satisfaction' },
      { value: '3x', label: 'Average ROI' },
    ],
  },
  services: {
    label: 'Services',
    title: 'What We Build',
    subtitle: 'Professional digital systems tailored to your business goals.',
    items: [
      { title: 'Website Development', desc: 'Fast, modern, conversion-optimised websites.' },
      { title: 'WhatsApp Flow', desc: 'Clear automated WhatsApp summaries for customers and teams.' },
      { title: 'Customer Records', desc: 'Keep leads, customers and follow-ups organised.' },
      { title: 'eCommerce Systems', desc: 'Product catalog, cart, checkout and order status.' },
      { title: 'Business Process', desc: 'Reduce repeated manual work and keep daily tasks easier to follow.' },
      { title: 'Digital Strategy', desc: 'Roadmap and consulting for your digital future.' },
    ],
  },
  demo: {
    label: 'Demo',
    title: 'Try a Real System Flow',
    subtitle: 'Pick a service, fill in the details, and preview how your customer journey can work.',
    step1Title: 'Choose a system',
    step2Title: 'Add customer details',
    step3Title: 'Ready to build',
    step3Subtitle: 'Your WhatsApp message is prepared.',
    services: ['Food Preorder', 'Booking System', 'Product Order', 'CRM System'],
    industries: ['Retail', 'F&B', 'Services', 'Healthcare', 'Education', 'Other'],
    industryLabel: 'Industry',
    namePlaceholder: 'Business name',
    phonePlaceholder: 'WhatsApp number',
    next: 'Next',
    back: 'Back',
    buildCta: 'Build This System',
    whatsappMsg: (name, serviceName) => `Hi ${name}, thanks for your interest in ${serviceName}. We can prepare your setup and send the next steps on WhatsApp.`,
  },
  shop: {
    label: 'Pricing',
    title: 'Simple Packages',
    subtitle: 'Start simple and scale when your business is ready.',
    popular: 'Recommended',
    cta: 'Start Setup',
    ctaCustom: 'Request Quote',
    packages: [
      {
        name: 'Starter',
        price: 'RM149',
        desc: 'For small businesses launching one focused automation.',
        features: ['1 core system', 'WhatsApp-ready flow', 'Basic branding', '14-day support'],
      },
      {
        name: 'Business',
        price: 'RM1,499',
        desc: 'A strong setup for businesses that need clearer daily order, booking or customer handling.',
        features: ['Business dashboard', 'Live status updates', 'Order or customer records', 'Priority support'],
        popular: true,
      },
      {
        name: 'Elite Custom',
        price: 'Custom quote',
        desc: 'For teams that need a tailored system and long-term support.',
        features: ['Custom feature planning', 'Advanced business process options', 'Owner dashboard options', 'Long-term support options'],
      },
    ],
  },
  footer: {
    tagline: 'Websites and systems that make your business look more trusted, organised and ready to grow.',
    quickLinks: 'Quick Links',
    contact: 'Get In Touch',
    rights: 'Copyright 2026 Bratstvo Digital. All rights reserved.',
  },
};

const my = {
  nav: { home: 'Utama', services: 'Servis', demo: 'Demo', pricing: 'Harga', cta: 'Mula Setup' },
  hero: {
    badge: 'Agensi Digital - Malaysia',
    title: 'Website & Sistem\nYang Buat Bisnes Nampak Professional',
    subtitle: 'Website profesional, sistem order, halaman booking dan dashboard owner yang bantu customer beli atau booking dengan lebih yakin.',
    cta1: 'Cuba Demo',
    cta2: 'Lihat Harga',
  },
  about: {
    label: 'Tentang Kami',
    title: 'Dibina untuk Bisnes Malaysia yang Mahu Nampak Lebih Premium',
    body: 'Bratstvo Digital ialah agensi digital Malaysia yang membina website, sistem order, halaman booking dan dashboard owner untuk bisnes yang sedang berkembang.',
    stats: [
      { value: '50+', label: 'Projek Siap' },
      { value: '98%', label: 'Kepuasan Customer' },
      { value: '3x', label: 'Purata ROI' },
    ],
  },
  services: {
    label: 'Servis',
    title: 'Apa Kami Bina',
    subtitle: 'Sistem digital professional yang disusun ikut cara bisnes anda beroperasi.',
    items: [
      { title: 'Website Development', desc: 'Website moden, laju dan direka untuk bantu customer yakin.' },
      { title: 'WhatsApp Flow', desc: 'WhatsApp summary automatik yang jelas untuk customer dan team anda.' },
      { title: 'Rekod Customer', desc: 'Urus prospek, customer dan follow-up dengan lebih tersusun.' },
      { title: 'Sistem eCommerce', desc: 'Katalog produk, cart, checkout dan status order.' },
      { title: 'Proses Bisnes', desc: 'Kurangkan kerja manual berulang dan jadikan tugasan harian lebih mudah diikuti.' },
      { title: 'Strategi Digital', desc: 'Roadmap dan panduan untuk fasa digital bisnes anda yang seterusnya.' },
    ],
  },
  demo: {
    label: 'Demo',
    title: 'Cuba Flow Sistem Sebenar',
    subtitle: 'Pilih servis, isi detail dan lihat cara customer anda bergerak dalam sistem.',
    step1Title: 'Pilih sistem',
    step2Title: 'Masukkan detail customer',
    step3Title: 'Sedia untuk dibina',
    step3Subtitle: 'Mesej WhatsApp anda sudah disediakan.',
    services: ['Food Preorder', 'Booking System', 'Product Order', 'CRM System'],
    industries: ['Retail', 'F&B', 'Servis', 'Healthcare', 'Education', 'Lain-lain'],
    industryLabel: 'Industri',
    namePlaceholder: 'Nama bisnes',
    phonePlaceholder: 'Nombor WhatsApp',
    next: 'Seterusnya',
    back: 'Kembali',
    buildCta: 'Bina Sistem Ini',
    whatsappMsg: (name, serviceName) => `Hai ${name}, terima kasih kerana berminat dengan ${serviceName}. Kami boleh sediakan setup dan hantar langkah seterusnya melalui WhatsApp.`,
  },
  shop: {
    label: 'Harga',
    title: 'Pakej Mudah',
    subtitle: 'Mula dengan mudah. Naik taraf apabila bisnes anda bersedia.',
    popular: 'Disyorkan',
    cta: 'Mula Setup',
    ctaCustom: 'Minta Quote',
    packages: [
      {
        name: 'Starter',
        price: 'RM149',
        desc: 'Untuk bisnes kecil yang mahu satu sistem fokus.',
        features: ['1 sistem utama', 'WhatsApp flow ready', 'Branding asas', 'Support 14 hari'],
      },
      {
        name: 'Business',
        price: 'RM1,499',
        desc: 'Setup yang sesuai untuk bisnes yang perlukan urusan order, booking atau customer lebih jelas.',
        features: ['Dashboard bisnes', 'Status update jelas', 'Rekod order atau customer', 'Priority support'],
        popular: true,
      },
      {
        name: 'Elite Custom',
        price: 'Custom quote',
        desc: 'Untuk team yang perlukan system khas dan support jangka panjang.',
        features: ['Feature planning custom', 'Pilihan proses bisnes lanjutan', 'Pilihan dashboard owner', 'Pilihan support jangka panjang'],
      },
    ],
  },
  footer: {
    tagline: 'Website dan sistem yang buat bisnes anda nampak lebih trusted, tersusun dan sedia berkembang.',
    quickLinks: 'Link Pantas',
    contact: 'Hubungi Kami',
    rights: 'Hak cipta 2026 Bratstvo Digital. Semua hak cipta terpelihara.',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    const storedLang = window.localStorage.getItem('bd-lang');
    return storedLang === 'my' || storedLang === 'en' ? storedLang : 'en';
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    const storedTheme = window.localStorage.getItem('bd-theme');
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'dark';
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem('bd-lang', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light');
    window.localStorage.setItem('bd-theme', theme);
  }, [theme]);

  const value = useMemo(() => ({
    lang,
    setLang,
    t: lang === 'en' ? en : my,
    theme,
    setTheme,
  }), [lang, theme]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
