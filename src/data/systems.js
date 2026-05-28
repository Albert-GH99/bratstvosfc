import { getDemoItems, getFeatureList, getSystemName, getText, systemsData } from './systemsData';

export const premiumGreen = 'var(--c-bg)';
export const brightGreen = '#16C47F';
export const premiumEmerald = '#16C47F';

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
      en: 'Testing a new idea, side income or one simple flow',
      my: 'Trial idea baru, side income atau satu flow asas',
    },
    includes: {
      en: ['1 basic system', 'Clean customer flow', 'Automated WhatsApp summary', 'Scale later'],
      my: ['1 sistem asas', 'Customer flow yang kemas', 'WhatsApp summary automatik', 'Boleh scale kemudian'],
    },
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 499,
    bestFor: {
      en: 'Small businesses that need simple owner management',
      my: 'Bisnes kecil yang perlukan pengurusan owner yang ringkas',
    },
    includes: {
      en: ['1 system', 'Basic business dashboard', 'Customer records', 'Mobile optimised'],
      my: ['1 sistem', 'Dashboard bisnes asas', 'Rekod customer', 'Mobile-friendly'],
    },
  },
  {
    id: 'business',
    name: 'Business',
    price: 1499,
    popular: true,
    bestFor: {
      en: 'Best fit for growing businesses',
      my: 'Pilihan utama untuk bisnes yang sedang berkembang',
    },
    includes: {
      en: ['Business dashboard', 'Products, orders or customer records', 'Live status updates', 'Basic insights', 'Recommended'],
      my: ['Dashboard bisnes', 'Produk, order atau rekod customer', 'Status update jelas', 'Analytics asas', 'Paling disyorkan'],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 2999,
    bestFor: {
      en: 'Growing companies with more moving parts',
      my: 'Syarikat berkembang dengan proses bisnes yang lebih banyak',
    },
    includes: {
      en: ['Everything in Business', 'Advanced business process support', 'Team access', 'Priority optimisation'],
      my: ['Semua dalam Business', 'Support proses bisnes lanjutan', 'Akses team', 'Priority optimisation'],
    },
  },
  {
    id: 'elite',
    name: 'Elite Custom',
    price: 7999,
    priceLabel: 'Custom quote',
    bestFor: {
      en: 'Custom quote for larger builds',
      my: 'Custom quote untuk build yang lebih besar',
    },
    includes: {
      en: ['Custom quote', 'Tailored feature planning', 'Growth-ready setup', 'Priority planning'],
      my: ['Custom quote', 'Feature planning mengikut keperluan', 'Setup sedia berkembang', 'Priority planning'],
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
        en: ['Hosting', 'Basic maintenance', 'Issue support'],
        my: ['Hosting', 'Maintenance asas', 'Issue support'],
      },
    },
    {
      id: 'business-monthly',
      name: 'Business',
      price: 299,
      popular: true,
      includes: {
        en: ['Hosting and maintenance', 'Minor updates', 'Standard support', 'Recommended'],
        my: ['Hosting dan maintenance', 'Update kecil', 'Standard support', 'Paling disyorkan'],
      },
    },
    {
      id: 'pro-monthly',
      name: 'Pro',
      price: 599,
      includes: {
        en: ['Updates and improvements', 'Business process support', 'Performance monitoring', 'Priority support'],
        my: ['Update dan improvement', 'Support proses bisnes', 'Performance monitoring', 'Priority support'],
      },
    },
    {
      id: 'elite-monthly',
      name: 'Elite',
      price: 999,
      priceLabel: 'Custom quote',
      includes: {
        en: ['Custom quote', 'Priority support', 'Growth support', 'Small custom requests'],
        my: ['Custom quote', 'Priority support', 'Growth support', 'Request custom kecil'],
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
        my: ['Hosting + domain', 'Maintenance asas', 'Standard support'],
      },
    },
    {
      id: 'business-yearly',
      name: 'Business',
      price: 3299,
      popular: true,
      includes: {
        en: ['Hosting and domain', 'Business dashboard support', 'Live system care', 'Recommended'],
        my: ['Hosting dan domain', 'Support dashboard bisnes', 'Care sistem live', 'Paling disyorkan'],
      },
    },
    {
      id: 'pro-yearly',
      name: 'Pro',
      price: 6599,
      includes: {
        en: ['Everything in Business', 'Advanced business process care', 'Insights support', 'Higher priority support'],
        my: ['Semua dalam Business', 'Care proses bisnes lanjutan', 'Support analytics', 'Priority support lebih tinggi'],
      },
    },
    {
      id: 'elite-yearly',
      name: 'Elite',
      price: 9999,
      priceLabel: 'Custom quote',
      includes: {
        en: ['Custom quote', 'Dedicated support', 'Growth planning support', 'Custom planning'],
        my: ['Custom quote', 'Dedicated support', 'Growth planning support', 'Custom planning'],
      },
    },
  ],
};

export { getDemoItems, getFeatureList, getSystemName, getText };
