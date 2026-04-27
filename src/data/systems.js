import { getDemoItems, getSystemName, getText, systemsData } from './systemsData';

export const premiumGreen = '#0F5132';
export const brightGreen = '#20C875';
export const premiumGold = '#C6A15B';

export const salesEmail = 'sales@bratstvosfc.com';

export const businessSystems = systemsData.map(system => ({
  ...system,
  emoji: system.icon,
  priceFrom: system.fromPrice,
  tagline: system.description,
}));

export const demoItemsBySystem = systemsData.reduce((acc, system) => {
  const demoItems = getDemoItems(system.id);
  if (demoItems.length) acc[system.id] = demoItems;
  return acc;
}, {});

export const oneTimePackages = [
  {
    id: 'starter',
    name: 'Starter',
    price: 149,
    bestFor: {
      en: 'Testing, side income or one basic flow',
      my: 'Testing, side income atau satu flow asas',
    },
    includes: {
      en: ['1 basic system', 'Simple template UI', 'WhatsApp-ready flow', 'Start small. Upgrade anytime.'],
      my: ['1 sistem asas', 'UI simple template', 'Flow siap WhatsApp', 'Mula kecil. Upgrade bila-bila masa.'],
    },
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 499,
    bestFor: {
      en: 'Small businesses that need basic admin',
      my: 'Small business yang perlukan admin asas',
    },
    includes: {
      en: ['1 system', 'Basic admin panel', 'Basic automation', 'Mobile optimised'],
      my: ['1 sistem', 'Admin panel asas', 'Automasi asas', 'Mobile optimised'],
    },
  },
  {
    id: 'business',
    name: 'Business',
    price: 1499,
    popular: true,
    bestFor: {
      en: 'Default choice for serious businesses',
      my: 'Pilihan utama untuk bisnes serius',
    },
    includes: {
      en: ['Admin PRO', 'Products, orders or workflow records', 'Realtime updates', 'Basic analytics', 'Most Popular'],
      my: ['Admin PRO', 'Produk, order atau rekod workflow', 'Realtime updates', 'Analitik asas', 'Most Popular'],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2999,
    bestFor: {
      en: 'Growing companies with advanced workflow',
      my: 'Growing company dengan workflow advanced',
    },
    includes: {
      en: ['Everything in Business', 'Advanced automation', 'Multi-user access', 'Performance optimised'],
      my: ['Semua dalam Business', 'Automasi advanced', 'Multi-user access', 'Performance optimised'],
    },
  },
  {
    id: 'elite',
    name: 'Elite Custom',
    price: 7999,
    priceLabel: 'Custom quotation',
    bestFor: {
      en: 'Custom quotation for larger builds',
      my: 'Sebutharga custom untuk build besar',
    },
    includes: {
      en: ['Custom quotation', 'Custom feature development', 'Scalable architecture', 'Priority planning'],
      my: ['Sebutharga custom', 'Pembangunan feature custom', 'Architecture boleh scale', 'Priority planning'],
    },
  },
];

export const subscriptionPlans = {
  monthly: [
    {
      id: 'basic-monthly',
      name: 'Basic',
      price: 99,
      includes: {
        en: ['Hosting', 'Basic maintenance', 'Bug fix'],
        my: ['Hosting', 'Maintenance asas', 'Bug fix'],
      },
    },
    {
      id: 'business-monthly',
      name: 'Business',
      price: 299,
      popular: true,
      includes: {
        en: ['Hosting + maintenance', 'Minor updates', 'Normal support', 'Most Popular'],
        my: ['Hosting + maintenance', 'Update kecil', 'Support biasa', 'Most Popular'],
      },
    },
    {
      id: 'pro-monthly',
      name: 'Pro',
      price: 599,
      includes: {
        en: ['Update + improvement', 'Automation support', 'Performance monitoring', 'Fast support'],
        my: ['Update + improvement', 'Support automasi', 'Performance monitoring', 'Support fast'],
      },
    },
    {
      id: 'elite-monthly',
      name: 'Elite',
      price: 999,
      priceLabel: 'Custom quotation',
      includes: {
        en: ['Custom quotation', 'Priority support', 'Scaling support', 'Custom small feature request'],
        my: ['Sebutharga custom', 'Priority support', 'Scaling support', 'Request feature kecil custom'],
      },
    },
  ],
  yearly: [
    {
      id: 'basic-yearly',
      name: 'Basic',
      price: 1099,
      includes: {
        en: ['Hosting + domain', 'Basic maintenance', 'Normal support'],
        my: ['Hosting + domain', 'Maintenance asas', 'Support biasa'],
      },
    },
    {
      id: 'business-yearly',
      name: 'Business',
      price: 3299,
      popular: true,
      includes: {
        en: ['Hosting + domain', 'Admin PRO support', 'Realtime system care', 'Most Popular'],
        my: ['Hosting + domain', 'Support Admin PRO', 'Penjagaan sistem realtime', 'Most Popular'],
      },
    },
    {
      id: 'pro-yearly',
      name: 'Pro',
      price: 6599,
      includes: {
        en: ['Everything in Business', 'Advanced automation care', 'Analytics support', 'Higher priority support'],
        my: ['Semua dalam Business', 'Penjagaan automasi advanced', 'Support analytics', 'Priority support lebih tinggi'],
      },
    },
    {
      id: 'elite-yearly',
      name: 'Elite',
      price: 9999,
      priceLabel: 'Custom quotation',
      includes: {
        en: ['Custom quotation', 'Dedicated support', 'Scaling + architecture support', 'Custom planning'],
        my: ['Sebutharga custom', 'Dedicated support', 'Scaling + architecture support', 'Custom planning'],
      },
    },
  ],
};

export { getDemoItems, getSystemName, getText };
