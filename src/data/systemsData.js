export const packageOptions = [
  { id: 'Starter', name: 'Starter', price: 149, label: 'RM149' },
  { id: 'Growth', name: 'Growth', price: 499, label: 'RM499' },
  { id: 'Business', name: 'Business', price: 1499, label: 'RM1499' },
  { id: 'Pro', name: 'Pro', price: 2999, label: 'RM2999' },
  { id: 'Elite', name: 'Elite Custom', price: null, label: 'Custom quote' },
];

const packageNames = packageOptions.map(item => item.id);

const packageFeatures = {
  Starter: {
    en: ['Basic customer page', 'Cleaner order or booking flow', 'WhatsApp summary'],
    my: ['Halaman customer asas', 'Flow order atau booking lebih kemas', 'WhatsApp summary'],
  },
  Growth: {
    en: ['Simple owner dashboard', 'Customer records', 'Clearer status tracking'],
    my: ['Dashboard owner ringkas', 'Rekod customer', 'Status lebih mudah track'],
  },
  Business: {
    en: ['Owner dashboard', 'Product, order and customer records', 'More professional flow'],
    my: ['Dashboard owner', 'Rekod produk, order dan customer', 'Flow lebih professional'],
  },
  Pro: {
    en: ['Business analytics', 'Advanced automation', 'Team workflow support'],
    my: ['Analytics bisnes', 'Automation lanjutan', 'Team lebih mudah urus kerja'],
  },
  Elite: {
    en: ['Custom branding', 'Custom process planning', 'Premium planning session'],
    my: ['Branding custom', 'Process planning khas', 'Sesi planning premium'],
  },
};

const systems = [
  {
    id: 'ecommerce',
    name: { en: 'eCommerce System', my: 'eCommerce System' },
    image: '',
    shortDesc: {
      en: 'Sell products with a polished catalogue, checkout flow, payment records and customer database.',
      my: 'Untuk jual produk dengan katalog kemas, checkout, rekod payment dan database customer.',
    },
    longDesc: {
      en: 'A product selling system for businesses that want customers to browse items, choose products, submit orders and pay with more confidence without losing everything inside chat.',
      my: 'Sistem jualan untuk bisnes yang mahu customer browse produk, pilih item, submit order dan bayar dengan lebih yakin tanpa semuanya tenggelam dalam chat.',
    },
    suitableFor: {
      en: 'Retail, boutiques, resellers, physical products, product launches and small online stores.',
      my: 'Retail, butik, reseller, produk fizikal, launch produk dan online store kecil.',
    },
    packages: packageNames,
    featuresByPackage: {
      Starter: {
        en: ['Simple shop page', 'Limited products and orders', 'Basic WhatsApp order summary'],
        my: ['Shop page ringkas', 'Had produk dan order asas', 'WhatsApp order summary asas'],
      },
      Growth: {
        en: ['More products', 'Voucher support', 'Cleaner checkout'],
        my: ['Lebih banyak produk', 'Voucher', 'Checkout lebih kemas'],
      },
      Business: {
        en: ['Dashboard analytics', 'Customer records', 'Payment status tracking'],
        my: ['Dashboard analytics', 'Rekod customer', 'Status payment'],
      },
      Pro: {
        en: ['Advanced order management', 'Automation', 'Popular product insights'],
        my: ['Order management lanjutan', 'Automation', 'Insight produk popular'],
      },
      Elite: {
        en: ['Custom flow and integration planning', 'Custom storefront branding', 'Premium dashboard'],
        my: ['Custom flow dan integration planning', 'Storefront branding custom', 'Dashboard premium'],
      },
    },
    demoType: 'ecommerce',
  },
  {
    id: 'booking',
    name: { en: 'Booking System', my: 'Booking System' },
    image: '',
    shortDesc: {
      en: 'Manage trips, events, activities, classes, participant slots, deposits and booking confirmations.',
      my: 'Untuk trip, event, aktiviti, kelas, slot peserta, deposit dan booking confirmation.',
    },
    longDesc: {
      en: 'A booking system for events, trips, activities and classes. Customers can view activity details, dates, prices, itinerary, participant slots and deposit or full payment options.',
      my: 'Booking System untuk event, trip, aktiviti atau kelas. Customer boleh lihat detail aktiviti, tarikh, harga, itinerary, slot peserta dan pilihan deposit atau full payment.',
    },
    suitableFor: {
      en: 'Hiking groups, travel groups, event organisers, classes, workshops, tours, activities and sports sessions.',
      my: 'Hiking group, travel group, event organiser, kelas, workshop, tour, aktiviti dan sports session.',
    },
    packages: packageNames,
    featuresByPackage: {
      Starter: {
        en: ['Activity or trip page', 'Participant form', 'WhatsApp booking summary'],
        my: ['Activity atau trip page', 'Participant form', 'WhatsApp booking summary'],
      },
      Growth: {
        en: ['Trip and activity list', 'Slot availability', 'Deposit records'],
        my: ['Senarai trip dan aktiviti', 'Slot availability', 'Rekod deposit'],
      },
      Business: {
        en: ['Participant list', 'Booking calendar', 'Payment and deposit status'],
        my: ['Senarai peserta', 'Booking calendar', 'Status payment dan deposit'],
      },
      Pro: {
        en: ['Reminder settings', 'Itinerary editor', 'Capacity insights'],
        my: ['Reminder settings', 'Itinerary editor', 'Capacity insights'],
      },
      Elite: {
        en: ['Custom booking rules', 'Custom trip flow', 'Premium activity portal'],
        my: ['Custom booking rules', 'Trip flow custom', 'Activity portal premium'],
      },
    },
    demoType: 'booking',
  },
  {
    id: 'appointment',
    name: { en: 'Appointment System', my: 'Appointment System' },
    image: '',
    shortDesc: {
      en: 'Manage service appointments, customer records, reminders and visit status.',
      my: 'Untuk servis appointment, rekod customer, reminder dan status kehadiran.',
    },
    longDesc: {
      en: 'An appointment system for service businesses that need to manage customers, staff, appointment times, reminders and visit status with a more professional flow.',
      my: 'Appointment System untuk bisnes servis yang perlu urus customer, staff, masa appointment, reminder dan status kehadiran dengan flow yang lebih professional.',
    },
    suitableFor: {
      en: 'Clinics, salons, consultants, tutors, repair services and personal service teams.',
      my: 'Klinik, salon, consultant, tutor, repair service dan personal service team.',
    },
    packages: packageNames,
    featuresByPackage: {
      Starter: {
        en: ['Service display page', 'Appointment request form', 'WhatsApp appointment summary'],
        my: ['Service display page', 'Appointment request form', 'WhatsApp appointment summary'],
      },
      Growth: {
        en: ['Simple appointment list', 'Saved customer records', 'Manual schedule review'],
        my: ['Senarai appointment ringkas', 'Rekod customer tersimpan', 'Semakan jadual manual'],
      },
      Business: {
        en: ['Appointment calendar', 'Customer records', 'Clear appointment status'],
        my: ['Appointment calendar', 'Rekod customer', 'Status appointment jelas'],
      },
      Pro: {
        en: ['Staff schedule', 'Reminder automation', 'No-show, completed and cancelled tracking'],
        my: ['Staff schedule', 'Reminder automation', 'No-show, completed dan cancelled tracking'],
      },
      Elite: {
        en: ['Custom appointment flow', 'Custom staff or branch routing', 'Premium branded experience'],
        my: ['Appointment flow custom', 'Routing staff atau branch custom', 'Experience branded premium'],
      },
    },
    demoType: 'appointment',
  },
  {
    id: 'food-order',
    name: { en: 'Food Order System', my: 'Food Order System' },
    image: '',
    shortDesc: {
      en: 'A premium F&B operating system with QR ordering, kitchen screen, payment flow, delivery setup, costing and sales tracking.',
      my: 'Sistem operasi F&B premium dengan QR order, kitchen screen, payment flow, delivery setup, costing dan sales tracking.',
    },
    longDesc: {
      en: 'Run dine-in, takeaway and delivery orders in one branded system. Customers order from a mobile-first menu, orders move to the kitchen screen, and owners track menu, payment, stock, costing and sales from the admin dashboard.',
      my: 'Urus order dine-in, takeaway dan delivery dalam satu sistem berjenama. Customer order melalui menu mobile-first, order masuk ke kitchen screen, dan owner boleh track menu, payment, stock, costing serta sales dari admin dashboard.',
    },
    suitableFor: {
      en: 'Restaurants, cafes, stalls, home-based food sellers, caterers and cloud kitchens that want to start fast and upgrade later.',
      my: 'Restoran, cafe, gerai, home-based food seller, catering dan cloud kitchen yang mahu mula cepat dan upgrade kemudian.',
    },
    packages: packageNames,
    featuresByPackage: {
      Starter: {
        en: ['Digital menu', 'Basic checkout', 'WhatsApp order summary', 'Basic admin'],
        my: ['Digital menu', 'Basic checkout', 'WhatsApp order summary', 'Basic admin'],
      },
      Growth: {
        en: ['QR ordering', 'Kitchen dashboard', 'Takeaway and delivery flow', 'Basic sales summary'],
        my: ['QR order', 'Kitchen dashboard', 'Flow takeaway dan delivery', 'Sales summary asas'],
      },
      Business: {
        en: ['Full dine-in, takeaway and delivery', 'QR generator and payment flow', 'Promo, voucher and costing', 'Sales analytics'],
        my: ['Dine-in, takeaway dan delivery penuh', 'QR generator dan payment flow', 'Promo, voucher dan costing', 'Sales analytics'],
      },
      Pro: {
        en: ['Inventory and ingredient costing', 'Advanced reports', 'Multi-staff access', 'Custom automation'],
        my: ['Inventory dan ingredient costing', 'Report lanjutan', 'Akses multi-staff', 'Custom automation'],
      },
      Elite: {
        en: ['Multi-branch operations', 'Advanced custom system', 'Full automation', 'Priority support'],
        my: ['Operasi multi-branch', 'Advanced custom system', 'Full automation', 'Priority support'],
      },
    },
    demoType: 'food',
  },
  {
    id: 'dispatch',
    name: { en: 'Delivery Dispatch System', my: 'Delivery Dispatch System' },
    image: '',
    shortDesc: {
      en: 'For companies with internal runners or staff who need job assignment, location tracking, work status and daily movement records.',
      my: 'Untuk syarikat yang ada runner atau staff sendiri dan perlu assign job, track lokasi, monitor status kerja dan rekod perjalanan harian.',
    },
    longDesc: {
      en: 'An operations system for HR, admin and operations managers who monitor runners or field staff. It focuses on job assignment, current status, location, proof notes and staff movement history, not large courier marketplace operations.',
      my: 'Sistem operasi untuk HR, admin dan operations manager yang perlu monitor runner atau staff harian. Fokusnya ialah assignment kerja, status semasa, lokasi, proof note dan sejarah pergerakan staff, bukan marketplace courier besar.',
    },
    suitableFor: {
      en: 'Companies with 5+ daily runners or field staff, HR/admin operations, laundry pickup teams, catering delivery teams, hardware shops, pharmacies and service dispatch teams.',
      my: 'Company dengan 5+ runner atau staff harian, HR/admin operations, laundry pickup team, catering delivery team, hardware shop, pharmacy dan service dispatch team.',
    },
    packages: packageNames,
    featuresByPackage: {
      Starter: {
        en: ['Basic job records', 'Staff or runner list', 'Manual status updates'],
        my: ['Rekod job asas', 'Senarai staff atau runner', 'Status update manual'],
      },
      Growth: {
        en: ['Create jobs or tasks', 'Assign staff or runners', 'Runner accepts job'],
        my: ['Create job atau task', 'Assign staff atau runner', 'Runner accept job'],
      },
      Business: {
        en: ['Assigned, on the way, arrived and completed status', 'Job history', 'Daily staff movement'],
        my: ['Status assigned, on the way, arrived dan completed', 'Job history', 'Pergerakan staff harian'],
      },
      Pro: {
        en: ['Location tracking flow', 'Proof photo and note support', 'Runner performance dashboard'],
        my: ['Location tracking flow', 'Support proof photo dan note', 'Runner performance dashboard'],
      },
      Elite: {
        en: ['Custom HR or operations workflow', 'Advanced dispatch dashboard', 'Priority support and integration planning'],
        my: ['Workflow HR atau operasi custom', 'Dispatch dashboard lanjutan', 'Priority support dan integration planning'],
      },
    },
    demoType: 'dispatch',
  },
  {
    id: 'custom-website',
    name: { en: 'Custom Website / System', my: 'Custom Website / System' },
    image: '',
    shortDesc: {
      en: 'For businesses that need a custom website or system built around their own workflow.',
      my: 'Untuk bisnes yang perlukan website atau system khas ikut workflow sendiri.',
    },
    longDesc: {
      en: 'For businesses that need a custom website or system built around their own workflow. We review your needs and set a consultation before the final quote is confirmed.',
      my: 'Untuk bisnes yang perlukan website atau system khas ikut workflow sendiri. Kami review keperluan anda dan set appointment sebelum harga akhir diberi.',
    },
    suitableFor: {
      en: 'Company profiles, campaigns, premium brands, service providers, portfolios and businesses with custom workflows.',
      my: 'Company profile, campaign, premium brand, service provider, portfolio dan bisnes dengan workflow khas.',
    },
    packages: packageNames,
    featuresByPackage: {
      Starter: {
        en: ['Consultation request', 'Needs review', 'Basic direction planning'],
        my: ['Consultation request', 'Review keperluan', 'Direction planning asas'],
      },
      Growth: {
        en: ['Consultation request', 'Page and flow planning', 'Implementation roadmap'],
        my: ['Consultation request', 'Page dan flow planning', 'Implementation roadmap'],
      },
      Business: {
        en: ['Consultation request', 'Premium website direction', 'Custom quote after review'],
        my: ['Consultation request', 'Arah website premium', 'Custom quote selepas review'],
      },
      Pro: {
        en: ['Consultation request', 'Advanced process planning', 'Integration discussion'],
        my: ['Consultation request', 'Process planning lanjutan', 'Integration discussion'],
      },
      Elite: {
        en: ['Consultation request', 'Tailored feature planning', 'Priority architecture review'],
        my: ['Consultation request', 'Feature planning mengikut keperluan', 'Priority architecture review'],
      },
    },
    demoType: 'custom',
    priceMode: 'custom',
    hasPrice: false,
  },
];

function buildInitials(name) {
  return String(name || 'BD')
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function toLegacySystem(system) {
  const enName = getText(system.name, 'en');
  const myName = getText(system.name, 'my');
  const startingPackage = packageOptions[0];
  const isCustom = system.priceMode === 'custom' || system.hasPrice === false;

  return {
    ...system,
    icon: buildInitials(enName),
    emoji: buildInitials(enName),
    shortName: {
      en: enName.replace(' System', ''),
      my: myName.replace(' System', ''),
    },
    category: system.demoType === 'food' ? 'F&B' : system.demoType === 'dispatch' ? 'Operations' : 'Business',
    description: system.shortDesc,
    bestFor: system.suitableFor,
    fromPrice: isCustom ? null : startingPackage.price,
    price: isCustom ? null : startingPackage.price,
    priceMode: isCustom ? 'custom' : 'fixed',
    hasPrice: !isCustom,
    availableInPackages: system.packages,
    packageBreakdown: system.featuresByPackage,
    features: getFeatureList(system.featuresByPackage.Starter, 'en'),
    workflowSteps: getFeatureList(system.featuresByPackage.Business, 'en'),
    dashboardFeatures: {
      en: ['Demo records', 'Business dashboard structure', 'Manageable status flow'],
      my: ['Rekod demo', 'Struktur dashboard bisnes', 'Status mudah diurus'],
    },
    paymentFeatures: {
      en: ['Payment tracking', 'Collection notes', 'Payment flow ready to scale'],
      my: ['Payment tracking', 'Nota collection', 'Payment flow ready to scale'],
    },
    whatsappFeatures: {
      en: ['Automated WhatsApp summary', 'Customer details', 'Follow-up message'],
      my: ['WhatsApp summary automatik', 'Detail customer', 'Follow-up message'],
    },
    demoEnabled: true,
  };
}

export const systemsData = systems.map(toLegacySystem);

export function getText(value, lang = 'en') {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value[lang] || value.en || value.my || '';
  return value || '';
}

export function getFeatureList(value, lang = 'en') {
  if (!value) return [];
  if (Array.isArray(value)) return value.map(item => getText(item, lang)).filter(Boolean);
  if (typeof value === 'object') {
    const list = value[lang] || value.en || value.my || [];
    return Array.isArray(list) ? list.filter(Boolean) : [list].filter(Boolean);
  }
  return [value].filter(Boolean);
}

export function getSystemName(system, lang = 'en') {
  return getText(system?.name, lang);
}

export function getSystemPriceLabel(system) {
  if (!system?.hasPrice) return '';
  return `RM${Number(system.price).toLocaleString()}+`;
}

export function getDemoItems(systemId) {
  const system = systemsData.find(item => item.id === systemId);
  if (!system) return [];

  const samples = {
    ecommerce: [
      { id: 'tee', name: 'Premium Tee', price: 69, stock: 30 },
      { id: 'bag', name: 'Canvas Bag', price: 45, stock: 20 },
    ],
    booking: [
      { id: 'broga', name: 'Broga Sunrise Hike', price: 120, slots: 18 },
      { id: 'rafting', name: 'Gopeng Rafting Trip', price: 180, slots: 14 },
    ],
    appointment: [
      { id: 'consult', name: 'Consultation Session', price: 60, slots: 8 },
      { id: 'repair', name: 'Repair Appointment', price: 90, slots: 6 },
    ],
    food: [
      { id: 'nasi', name: 'Nasi Lemak Ayam', price: 12.9, stock: 25 },
      { id: 'kuih', name: 'Kuih Mix Box', price: 18, stock: 15 },
      { id: 'rice', name: 'Chicken Rice Set', price: 11.9, stock: 22 },
      { id: 'coffee', name: 'Iced Kopi Premium', price: 6.5, stock: 40 },
    ],
    dispatch: [
      { id: 'pickup', name: 'Staff Movement Job', price: 0, slots: 20 },
      { id: 'service', name: 'Service Dispatch Task', price: 0, slots: 10 },
    ],
  };

  return samples[system.demoType] || [];
}

export { packageFeatures };
