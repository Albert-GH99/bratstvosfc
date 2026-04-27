import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext();

const en = {
  nav: { home: 'Home', services: 'Services', demo: 'Demo', pricing: 'Pricing', cta: 'Get Started' },
  hero: {
    badge: 'Digital Agency - Malaysia',
    title: 'We Build Digital\nSystems That Work',
    subtitle: 'From professional websites to full business automation, we build digital infrastructure that grows with your business.',
    cta1: 'Try Demo',
    cta2: 'View Pricing',
  },
  about: {
    label: 'About Us',
    title: 'Built for Businesses Ready to Scale',
    body: 'Bratstvo Digital is a full-service digital agency based in Malaysia. We build websites, automation systems, CRMs, and e-commerce solutions that deliver real business results, not just good looks.',
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
      { title: 'WhatsApp Automation', desc: 'Automated customer conversations, 24/7.' },
      { title: 'CRM Systems', desc: 'Pipeline and lead management tools.' },
      { title: 'E-Commerce', desc: 'Online stores with full payment integration.' },
      { title: 'Business Automation', desc: 'Eliminate repetitive tasks. Scale smarter.' },
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
    subtitle: 'Start lean, then scale your system when your business grows.',
    popular: 'Popular',
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
        name: 'Growth',
        price: 'RM6,599/year',
        desc: 'For active businesses that need admin, automation and real support.',
        features: ['Full system suite', 'Admin PRO', 'Realtime automation', 'Fast support'],
        popular: true,
      },
      {
        name: 'Custom',
        price: 'RM15,599/year',
        desc: 'For teams that need a tailored platform or advanced integrations.',
        features: ['Custom feature planning', 'Advanced integrations', 'Dashboard options', 'Long-term support options'],
      },
    ],
  },
  footer: {
    tagline: 'Building digital systems that work.',
    quickLinks: 'Quick Links',
    contact: 'Get In Touch',
    rights: 'Copyright 2026 Bratstvo Digital. All rights reserved.',
  },
};

const my = {
  nav: { home: 'Utama', services: 'Perkhidmatan', demo: 'Demo', pricing: 'Harga', cta: 'Mula Sekarang' },
  hero: {
    badge: 'Agensi Digital - Malaysia',
    title: 'Kami Bina Sistem Digital\nYang Benar-Benar Berkesan',
    subtitle: 'Daripada laman web profesional sehinggalah automasi perniagaan sepenuhnya, kami bina sistem digital yang membantu perniagaan anda berkembang.',
    cta1: 'Cuba Demo',
    cta2: 'Tengok Harga',
  },
  about: {
    label: 'Tentang Kami',
    title: 'Dibina Khas untuk Perniagaan Malaysia',
    body: 'Bratstvo Digital ialah agensi digital sepenuh masa yang berpusat di Malaysia. Kami bina laman web, sistem automasi, CRM, dan penyelesaian e-dagang yang memberi hasil nyata kepada perniagaan anda.',
    stats: [
      { value: '50+', label: 'Projek Siap' },
      { value: '98%', label: 'Kepuasan Pelanggan' },
      { value: '3x', label: 'Purata ROI' },
    ],
  },
  services: {
    label: 'Perkhidmatan',
    title: 'Apa Yang Kami Bina',
    subtitle: 'Sistem digital profesional yang disesuaikan mengikut keperluan perniagaan anda.',
    items: [
      { title: 'Pembangunan Laman Web', desc: 'Laman web moden, laju dan direka untuk menarik pelanggan.' },
      { title: 'Automasi WhatsApp', desc: 'Layani pelanggan secara automatik, 24 jam sehari.' },
      { title: 'Sistem CRM', desc: 'Urus prospek dan pelanggan dengan lebih sistematik.' },
      { title: 'E-Dagang', desc: 'Kedai dalam talian lengkap dengan sistem pembayaran.' },
      { title: 'Automasi Perniagaan', desc: 'Kurangkan kerja manual. Kembangkan perniagaan dengan lebih bijak.' },
      { title: 'Strategi Digital', desc: 'Pelan hala tuju dan panduan untuk masa depan digital perniagaan anda.' },
    ],
  },
  demo: {
    label: 'Demo',
    title: 'Cuba Aliran Sistem Sebenar',
    subtitle: 'Pilih servis, isi butiran, dan lihat bagaimana perjalanan pelanggan anda boleh berfungsi.',
    step1Title: 'Pilih sistem',
    step2Title: 'Masukkan maklumat pelanggan',
    step3Title: 'Sedia untuk dibina',
    step3Subtitle: 'Mesej WhatsApp anda sudah disediakan.',
    services: ['Pra-Pesanan Makanan', 'Sistem Tempahan', 'Pesanan Produk', 'Sistem CRM'],
    industries: ['Runcit', 'F&B', 'Perkhidmatan', 'Kesihatan', 'Pendidikan', 'Lain-lain'],
    industryLabel: 'Industri',
    namePlaceholder: 'Nama perniagaan',
    phonePlaceholder: 'Nombor WhatsApp',
    next: 'Seterusnya',
    back: 'Kembali',
    buildCta: 'Bina Sistem Ini',
    whatsappMsg: (name, serviceName) => `Hai ${name}, terima kasih kerana berminat dengan ${serviceName}. Kami boleh sediakan setup dan hantar langkah seterusnya melalui WhatsApp.`,
  },
  shop: {
    label: 'Harga',
    title: 'Pakej Mudah',
    subtitle: 'Mula secara ringkas, kemudian naik taraf sistem apabila bisnes berkembang.',
    popular: 'Popular',
    cta: 'Mula Setup',
    ctaCustom: 'Minta Quote',
    packages: [
      {
        name: 'Starter',
        price: 'RM149',
        desc: 'Untuk bisnes kecil yang mahu satu automasi fokus.',
        features: ['1 sistem utama', 'Aliran siap WhatsApp', 'Branding asas', 'Sokongan 14 hari'],
      },
      {
        name: 'Growth',
        price: 'RM6,599/tahun',
        desc: 'Untuk bisnes aktif yang perlukan admin, automasi dan support sebenar.',
        features: ['Full system suite', 'Admin PRO', 'Automasi realtime', 'Fast support'],
        popular: true,
      },
      {
        name: 'Custom',
        price: 'RM15,599/tahun',
        desc: 'Untuk pasukan yang perlukan platform khas atau integrasi lanjutan.',
        features: ['Perancangan ciri khas', 'Integrasi lanjutan', 'Pilihan dashboard', 'Pilihan sokongan jangka panjang'],
      },
    ],
  },
  footer: {
    tagline: 'Kami bina sistem digital yang benar-benar berkesan.',
    quickLinks: 'Pautan Pantas',
    contact: 'Hubungi Kami',
    rights: 'Hak cipta 2026 Bratstvo Digital. Semua hak cipta terpelihara.',
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark';
    return window.localStorage.getItem('bd-theme') || 'dark';
  });

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

export function useLanguage() {
  return useContext(LanguageContext);
}

export function useLang() {
  return useContext(LanguageContext);
}
