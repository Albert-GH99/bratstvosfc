export const premiumGreen = '#0F5132';
export const brightGreen = '#20C875';
export const premiumGold = '#C6A15B';

export const salesEmail = 'sales@bratstvosfc.com';

export const businessSystems = [
  {
    id: 'food-preorder',
    emoji: '🍱',
    priceFrom: 149,
    category: { en: 'F&B', my: 'F&B' },
    name: { en: 'Food Preorder System', my: 'Sistem Pra-Pesanan Makanan' },
    shortName: { en: 'Preorder', my: 'Pra-Pesanan' },
    bestFor: { en: 'Bakeries, caterers, food vendors, home cooks', my: 'Bakeri, katering, vendor makanan, peniaga kuih' },
    tagline: { en: 'Customers choose menu, pickup slot and payment without messy chats.', my: 'Pelanggan pilih menu, masa ambil dan bayaran tanpa mesej berselerak.' },
    problem: { en: 'Orders are mixed inside WhatsApp and stock is hard to control.', my: 'Order bercampur dalam WhatsApp dan stok susah dikawal.' },
    outcome: { en: 'Every order arrives with name, items, quantity, slot, payment status and notes.', my: 'Setiap order masuk dengan nama, item, kuantiti, slot, status bayaran dan nota.' },
  },
  {
    id: 'product-order',
    emoji: '🛒',
    priceFrom: 149,
    category: { en: 'Retail', my: 'Runcit' },
    name: { en: 'Product Order System', my: 'Sistem Pesanan Produk' },
    shortName: { en: 'Product', my: 'Produk' },
    bestFor: { en: 'Online sellers, dropshippers, boutiques, resellers', my: 'Seller online, dropshipper, butik, reseller' },
    tagline: { en: 'Catalog, variants, stock and checkout structured for WhatsApp.', my: 'Katalog, variasi, stok dan checkout tersusun untuk WhatsApp.' },
    problem: { en: 'Customers ask price, stock, colour and size one by one.', my: 'Pelanggan tanya harga, stok, warna dan saiz satu-satu.' },
    outcome: { en: 'Owner receives a complete order with variant, address and total.', my: 'Owner terima order lengkap dengan variasi, alamat dan jumlah.' },
  },
  {
    id: 'booking',
    emoji: '📅',
    priceFrom: 149,
    category: { en: 'Service', my: 'Servis' },
    name: { en: 'Appointment Booking System', my: 'Sistem Tempahan Temujanji' },
    shortName: { en: 'Booking', my: 'Tempahan' },
    bestFor: { en: 'Salons, clinics, tutors, photographers, workshops', my: 'Salun, klinik, tutor, jurugambar, bengkel' },
    tagline: { en: 'Clients choose service, date and slot without back-and-forth messages.', my: 'Client pilih servis, tarikh dan slot tanpa ulang-alik mesej.' },
    problem: { en: 'Manual schedules cause double booking and slow replies.', my: 'Jadual manual mudah double booking dan lambat dibalas.' },
    outcome: { en: 'Slots are controlled and the owner sees the day schedule clearly.', my: 'Slot terkawal dan owner nampak jadual harian dengan jelas.' },
  },
  {
    id: 'ecommerce',
    emoji: '🏪',
    priceFrom: 499,
    category: { en: 'Store', my: 'Kedai' },
    name: { en: 'eCommerce Store System', my: 'Sistem Kedai eCommerce' },
    shortName: { en: 'eCommerce', my: 'eCommerce' },
    bestFor: { en: 'Brands that need a real online store', my: 'Brand yang perlukan kedai online sebenar' },
    tagline: { en: 'Product pages, cart, checkout and admin in one flow.', my: 'Halaman produk, cart, checkout dan admin dalam satu flow.' },
    problem: { en: 'Selling only through DM limits trust and scale.', my: 'Jual melalui DM sahaja susah nampak premium dan susah scale.' },
    outcome: { en: 'Customers can shop directly and owner manages orders in admin.', my: 'Customer boleh beli terus dan owner urus order dalam admin.' },
  },
  {
    id: 'membership',
    emoji: '👑',
    priceFrom: 499,
    category: { en: 'Subscription', my: 'Langganan' },
    name: { en: 'Membership System', my: 'Sistem Keahlian' },
    shortName: { en: 'Membership', my: 'Keahlian' },
    bestFor: { en: 'Gyms, academies, paid communities, subscription boxes', my: 'Gym, akademi, komuniti berbayar, subscription box' },
    tagline: { en: 'Manage members, renewal, tiers and access in one place.', my: 'Urus ahli, renewal, tier dan akses dalam satu tempat.' },
    problem: { en: 'Renewals are tracked manually and expired members are missed.', my: 'Renewal dibuat manual dan ahli tamat tempoh mudah terlepas.' },
    outcome: { en: 'Members have clear status and renewal reminders are easier.', my: 'Ahli ada status jelas dan reminder renewal lebih mudah.' },
  },
  {
    id: 'pos',
    emoji: '🏷️',
    priceFrom: 1499,
    category: { en: 'Counter', my: 'Kaunter' },
    name: { en: 'POS System', my: 'Sistem POS' },
    shortName: { en: 'POS', my: 'POS' },
    bestFor: { en: 'Cafes, retail counters, small restaurants', my: 'Kafe, kaunter runcit, restoran kecil' },
    tagline: { en: 'Counter orders, payment and daily sales reports.', my: 'Order kaunter, bayaran dan laporan jualan harian.' },
    problem: { en: 'Cashier records are messy and end-day reports take time.', my: 'Rekod cashier bersepah dan laporan harian ambil masa.' },
    outcome: { en: 'Transactions, payment method and daily totals are tracked.', my: 'Transaksi, kaedah bayaran dan jumlah harian boleh dijejak.' },
  },
  {
    id: 'invoice',
    emoji: '🧾',
    priceFrom: 149,
    category: { en: 'Finance', my: 'Kewangan' },
    name: { en: 'Invoice & Quotation System', my: 'Sistem Invois & Sebut Harga' },
    shortName: { en: 'Invoice', my: 'Invois' },
    bestFor: { en: 'Freelancers, contractors, agencies, B2B services', my: 'Freelancer, kontraktor, agensi, servis B2B' },
    tagline: { en: 'Create professional quotes and invoices quickly.', my: 'Jana quotation dan invois profesional dengan cepat.' },
    problem: { en: 'Documents are made manually and payment follow-up is slow.', my: 'Dokumen dibuat manual dan follow-up bayaran lambat.' },
    outcome: { en: 'Documents, client records and payment status are organised.', my: 'Dokumen, rekod client dan status bayaran jadi tersusun.' },
  },
  {
    id: 'qr-order',
    emoji: '📱',
    priceFrom: 499,
    category: { en: 'F&B', my: 'F&B' },
    name: { en: 'QR Table Ordering System', my: 'Sistem Pesanan QR Meja' },
    shortName: { en: 'QR Order', my: 'QR Order' },
    bestFor: { en: 'Restaurants, cafes, food courts, hotels', my: 'Restoran, kafe, food court, hotel' },
    tagline: { en: 'Customers scan, order and kitchen receives it directly.', my: 'Customer scan, order dan dapur terima terus.' },
    problem: { en: 'Staff spend too much time taking orders manually.', my: 'Staff banyak masa ambil order secara manual.' },
    outcome: { en: 'Orders flow from table to kitchen with fewer mistakes.', my: 'Order masuk dari meja ke dapur dengan kurang kesilapan.' },
  },
  {
    id: 'crm',
    emoji: '📊',
    priceFrom: 499,
    category: { en: 'Sales', my: 'Sales' },
    name: { en: 'CRM & Lead Management', my: 'CRM & Pengurusan Prospek' },
    shortName: { en: 'CRM', my: 'CRM' },
    bestFor: { en: 'Agents, sales teams, consultants, agencies', my: 'Ejen, sales team, consultant, agensi' },
    tagline: { en: 'Track leads from first contact to closed deal.', my: 'Track prospek dari first contact sampai close deal.' },
    problem: { en: 'Leads get lost in WhatsApp and follow-up is inconsistent.', my: 'Lead hilang dalam WhatsApp dan follow-up tidak konsisten.' },
    outcome: { en: 'Each lead has status, value, next action and notes.', my: 'Setiap lead ada status, nilai, tindakan seterusnya dan nota.' },
  },
  {
    id: 'visitor',
    emoji: '🚪',
    priceFrom: 499,
    category: { en: 'Operations', my: 'Operasi' },
    name: { en: 'Visitor Management System', my: 'Sistem Pengurusan Pelawat' },
    shortName: { en: 'Visitor', my: 'Pelawat' },
    bestFor: { en: 'Offices, factories, events, schools, condos', my: 'Pejabat, kilang, event, sekolah, kondominium' },
    tagline: { en: 'Digital check-in, host alert and visitor log.', my: 'Check-in digital, alert host dan log pelawat.' },
    problem: { en: 'Paper logbooks are slow and hard to audit.', my: 'Buku log kertas lambat dan susah diaudit.' },
    outcome: { en: 'Visitor data is searchable and host notifications are instant.', my: 'Data pelawat boleh dicari dan host dapat notifikasi segera.' },
  },
  {
    id: 'rental',
    emoji: '📦',
    priceFrom: 499,
    category: { en: 'Operations', my: 'Operasi' },
    name: { en: 'Rental System', my: 'Sistem Sewa' },
    shortName: { en: 'Rental', my: 'Sewa' },
    bestFor: { en: 'Homestays, equipment rental, canopy rental', my: 'Homestay, sewa barang, sewa kanopi' },
    tagline: { en: 'Availability, deposit, rental period and return status.', my: 'Availability, deposit, tempoh sewa dan status pulang.' },
    problem: { en: 'Availability and deposits are tracked manually.', my: 'Availability dan deposit dijejak manual.' },
    outcome: { en: 'Bookings, deposits and return dates are easier to monitor.', my: 'Tempahan, deposit dan tarikh pulang mudah dipantau.' },
  },
  {
    id: 'clinic-queue',
    emoji: '🩺',
    priceFrom: 499,
    category: { en: 'Healthcare', my: 'Kesihatan' },
    name: { en: 'Clinic Queue System', my: 'Sistem Queue Klinik' },
    shortName: { en: 'Clinic', my: 'Klinik' },
    bestFor: { en: 'Clinics, dental centres, wellness centres', my: 'Klinik, dental, pusat wellness' },
    tagline: { en: 'Patient intake, queue number and treatment status.', my: 'Intake pesakit, nombor giliran dan status rawatan.' },
    problem: { en: 'Reception queue becomes crowded and unclear.', my: 'Queue reception jadi sesak dan tidak jelas.' },
    outcome: { en: 'Patients and staff can track queue status clearly.', my: 'Pesakit dan staff boleh pantau status giliran dengan jelas.' },
  },
  {
    id: 'tuition',
    emoji: '🎓',
    priceFrom: 499,
    category: { en: 'Education', my: 'Pendidikan' },
    name: { en: 'Tuition/Class Booking System', my: 'Sistem Tempahan Kelas/Tuisyen' },
    shortName: { en: 'Class', my: 'Kelas' },
    bestFor: { en: 'Tuition centres, trainers, workshops', my: 'Pusat tuisyen, trainer, workshop' },
    tagline: { en: 'Class registration, level, schedule and trial request.', my: 'Daftar kelas, tahap, jadual dan trial request.' },
    problem: { en: 'Class registrations are scattered across forms and chat.', my: 'Pendaftaran kelas berselerak antara form dan chat.' },
    outcome: { en: 'Students, classes and schedules are organised.', my: 'Pelajar, kelas dan jadual jadi tersusun.' },
  },
  {
    id: 'property',
    emoji: '🏠',
    priceFrom: 499,
    category: { en: 'Sales', my: 'Sales' },
    name: { en: 'Property Lead System', my: 'Sistem Prospek Hartanah' },
    shortName: { en: 'Property', my: 'Hartanah' },
    bestFor: { en: 'Property agents, real estate teams, developers', my: 'Ejen hartanah, team real estate, developer' },
    tagline: { en: 'Qualify leads, budget and viewing appointments.', my: 'Layakkan prospek, bajet dan appointment viewing.' },
    problem: { en: 'Agents waste time on unqualified enquiries.', my: 'Ejen banyak buang masa dengan enquiry tidak qualified.' },
    outcome: { en: 'Hot leads and viewing slots are easier to prioritise.', my: 'Lead panas dan slot viewing lebih mudah diutamakan.' },
  },
  {
    id: 'workshop',
    emoji: '🔧',
    priceFrom: 499,
    category: { en: 'Automotive', my: 'Automotif' },
    name: { en: 'Workshop Job Card System', my: 'Sistem Job Card Workshop' },
    shortName: { en: 'Workshop', my: 'Workshop' },
    bestFor: { en: 'Car workshops, detailing shops, service centres', my: 'Bengkel kereta, detailing, pusat servis' },
    tagline: { en: 'Vehicle intake, job status, parts and billing.', my: 'Intake kenderaan, status kerja, parts dan billing.' },
    problem: { en: 'Job progress is unclear and parts follow-up is manual.', my: 'Progress kerja tidak jelas dan follow-up parts manual.' },
    outcome: { en: 'Jobs are tracked from intake to ready pickup.', my: 'Kerja dijejak dari intake sampai ready pickup.' },
  },
  {
    id: 'event',
    emoji: '🎟️',
    priceFrom: 499,
    category: { en: 'Event', my: 'Event' },
    name: { en: 'Event Registration System', my: 'Sistem Pendaftaran Event' },
    shortName: { en: 'Event', my: 'Event' },
    bestFor: { en: 'Workshops, seminars, communities, conferences', my: 'Workshop, seminar, komuniti, conference' },
    tagline: { en: 'Ticket type, attendee list and check-in status.', my: 'Jenis tiket, senarai peserta dan status check-in.' },
    problem: { en: 'Attendee lists and check-ins are hard to manage manually.', my: 'Senarai peserta dan check-in susah diurus manual.' },
    outcome: { en: 'Registration, payment note and attendance are centralised.', my: 'Pendaftaran, nota bayaran dan kehadiran berpusat.' },
  },
  {
    id: 'donation',
    emoji: '🤝',
    priceFrom: 499,
    category: { en: 'NGO', my: 'NGO' },
    name: { en: 'Donation/NGO System', my: 'Sistem Donation/NGO' },
    shortName: { en: 'Donation', my: 'Donation' },
    bestFor: { en: 'NGOs, mosques, campaigns, community funds', my: 'NGO, masjid, kempen, tabung komuniti' },
    tagline: { en: 'Campaign, donor record and receipt flow.', my: 'Kempen, rekod penyumbang dan aliran resit.' },
    problem: { en: 'Donor records and receipts are not centralised.', my: 'Rekod penyumbang dan resit tidak berpusat.' },
    outcome: { en: 'Collections, donors and receipts are easier to audit.', my: 'Kutipan, penyumbang dan resit lebih mudah diaudit.' },
  },
  {
    id: 'hr-leave',
    emoji: '🧑‍💼',
    priceFrom: 499,
    category: { en: 'HR', my: 'HR' },
    name: { en: 'HR Leave System', my: 'Sistem HR Cuti' },
    shortName: { en: 'HR Leave', my: 'HR Cuti' },
    bestFor: { en: 'Small teams, operations teams, agencies', my: 'Team kecil, team operasi, agensi' },
    tagline: { en: 'Leave request, approval and team availability.', my: 'Request cuti, approval dan availability team.' },
    problem: { en: 'Leave requests are buried in chat and hard to approve.', my: 'Request cuti tenggelam dalam chat dan susah approve.' },
    outcome: { en: 'Managers see pending leave and team availability clearly.', my: 'Manager nampak cuti pending dan availability team dengan jelas.' },
  },
  {
    id: 'inventory',
    emoji: '📦',
    priceFrom: 499,
    category: { en: 'Operations', my: 'Operasi' },
    name: { en: 'Inventory System', my: 'Sistem Inventori' },
    shortName: { en: 'Inventory', my: 'Inventori' },
    bestFor: { en: 'Retail, warehouses, F&B stock, spare parts', my: 'Runcit, gudang, stok F&B, spare parts' },
    tagline: { en: 'Stock in/out, low stock alerts and supplier notes.', my: 'Stock masuk/keluar, low stock alert dan nota supplier.' },
    problem: { en: 'Stock counts are updated late and low-stock items are missed.', my: 'Kiraan stok lambat update dan item low-stock terlepas.' },
    outcome: { en: 'Stock movement and reorder signals are clearer.', my: 'Pergerakan stok dan tanda reorder lebih jelas.' },
  },
  {
    id: 'loyalty',
    emoji: '🎁',
    priceFrom: 499,
    category: { en: 'Marketing', my: 'Marketing' },
    name: { en: 'Loyalty Rewards System', my: 'Sistem Loyalty Rewards' },
    shortName: { en: 'Loyalty', my: 'Loyalty' },
    bestFor: { en: 'Cafes, beauty, retail, membership brands', my: 'Kafe, beauty, retail, brand membership' },
    tagline: { en: 'Points, rewards and repeat customer tracking.', my: 'Point, reward dan tracking customer repeat.' },
    problem: { en: 'Repeat customers are not tracked or rewarded properly.', my: 'Customer repeat tidak dijejak atau diberi ganjaran dengan betul.' },
    outcome: { en: 'Rewards can increase return visits and retention.', my: 'Reward boleh bantu customer datang semula dan kekal.' },
  },
  {
    id: 'dispatch',
    emoji: '🚚',
    priceFrom: 499,
    category: { en: 'Delivery', my: 'Delivery' },
    name: { en: 'Delivery Dispatch System', my: 'Sistem Delivery Dispatch' },
    shortName: { en: 'Dispatch', my: 'Dispatch' },
    bestFor: { en: 'Delivery teams, food businesses, logistics operations', my: 'Team delivery, bisnes makanan, operasi logistik' },
    tagline: { en: 'Assign rider, route, status and proof of delivery.', my: 'Assign rider, route, status dan bukti delivery.' },
    problem: { en: 'Delivery status is unclear and proof is scattered.', my: 'Status delivery tidak jelas dan bukti berselerak.' },
    outcome: { en: 'Owner can track what is pending, out and completed.', my: 'Owner boleh track pending, out dan completed.' },
  },
];

export const demoItemsBySystem = {
  default: [
    { name: 'Starter Item', price: 49, stock: 20 },
    { name: 'Premium Item', price: 129, stock: 10 },
    { name: 'Priority Add-on', price: 29, stock: 30 },
  ],
  'food-preorder': [
    { name: 'Nasi Lemak Ayam', price: 12.9, stock: 28 },
    { name: 'Kuih Mix Box', price: 18, stock: 16 },
    { name: 'Spaghetti Carbonara', price: 15.5, stock: 12 },
  ],
  'booking': [
    { name: 'Haircut + Wash', price: 65, stock: 6 },
    { name: 'Facial Treatment', price: 180, stock: 3 },
    { name: 'Consultation Slot', price: 50, stock: 9 },
  ],
  'crm': [
    { name: 'Website Inquiry', price: 3000, stock: 1 },
    { name: 'Product System Lead', price: 1500, stock: 1 },
    { name: 'Retainer Prospect', price: 650, stock: 1 },
  ],
};

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
      en: ['1 basic system: preorder, booking or product', 'Simple template UI', 'WhatsApp order flow', 'No admin panel'],
      my: ['1 sistem asas: preorder, booking atau produk', 'UI simple template', 'WhatsApp order flow', 'Tiada admin panel'],
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
      en: ['1 system', 'Basic admin panel: view orders only', 'Basic WhatsApp automation', 'Mobile optimised'],
      my: ['1 sistem', 'Admin panel asas: lihat order sahaja', 'WhatsApp automation asas', 'Mobile optimised'],
    },
  },
  {
    id: 'business',
    name: 'Business',
    price: 1499,
    popular: true,
    bestFor: {
      en: 'Main product for serious businesses',
      my: 'Produk utama untuk bisnes serius',
    },
    includes: {
      en: ['All systems unlock', 'Admin PRO: products, orders, customer data', 'Full WhatsApp automation', 'Realtime updates', 'Basic analytics', 'Premium UI with light custom branding'],
      my: ['Semua sistem unlock', 'Admin PRO: produk, order, data customer', 'WhatsApp automation penuh', 'Realtime updates', 'Analitik asas', 'UI premium dengan branding ringan'],
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 4999,
    bestFor: {
      en: 'Growing companies with advanced workflow',
      my: 'Growing company dengan workflow advanced',
    },
    includes: {
      en: ['Everything in Business', 'Advanced automation and follow-up', 'Complete analytics dashboard', 'Multi-user access', 'Performance optimised'],
      my: ['Semua dalam Business', 'Automation advanced dan follow-up', 'Dashboard analytics lengkap', 'Multi-user access', 'Performance optimized'],
    },
  },
  {
    id: 'elite',
    name: 'Elite',
    price: 19999,
    bestFor: {
      en: 'High-level brands or companies',
      my: 'High-level brand atau company',
    },
    includes: {
      en: ['Full custom website, not template', 'System + marketing site + funnel', 'Custom feature development', 'Scalable architecture', 'Full branding: logo + UI direction', 'Priority dev support'],
      my: ['Full custom website, bukan template', 'System + marketing site + funnel', 'Custom feature development', 'Scalable architecture', 'Full branding: logo + UI direction', 'Priority dev support'],
    },
  },
];

export const subscriptionPlans = {
  monthly: [
    {
      id: 'hosting',
      name: 'Hosting',
      price: 99,
      includes: {
        en: ['Hosting', 'Basic maintenance', 'Bug fix'],
        my: ['Hosting', 'Maintenance basic', 'Bug fix'],
      },
    },
    {
      id: 'maintenance',
      name: 'Maintenance',
      price: 299,
      includes: {
        en: ['Hosting + maintenance', 'Minor update request', 'Normal support'],
        my: ['Hosting + maintenance', 'Minor update request', 'Support normal'],
      },
    },
    {
      id: 'growth-care',
      name: 'Growth Care',
      price: 599,
      popular: true,
      includes: {
        en: ['Hosting + maintenance', 'Update + improvement', 'WhatsApp automation support', 'Performance monitoring', 'Fast support'],
        my: ['Hosting + maintenance', 'Update + improvement', 'WhatsApp automation support', 'Performance monitoring', 'Support fast'],
      },
    },
    {
      id: 'scale-care',
      name: 'Scale Care',
      price: 899,
      includes: {
        en: ['Everything in Growth Care', 'Automation tuning', 'Analytics support', 'Priority fix'],
        my: ['Semua dalam Growth Care', 'Automation tuning', 'Analytics support', 'Priority fix'],
      },
    },
    {
      id: 'technical',
      name: 'Technical Partner',
      price: 1599,
      includes: {
        en: ['Full technical support', 'Scaling support', 'Custom small feature request', 'Direct dev access'],
        my: ['Full technical support', 'Scaling support', 'Custom small feature request', 'Direct dev access'],
      },
    },
  ],
  yearly: [
    {
      id: 'basic-yearly',
      name: 'Basic',
      price: 1099,
      includes: {
        en: ['1 system only', 'Hosting + domain', 'Basic admin', 'Basic chatbot', 'Normal support'],
        my: ['1 system sahaja', 'Hosting + domain', 'Admin basic', 'Chatbot basic', 'Support biasa'],
      },
    },
    {
      id: 'growth-yearly',
      name: 'Growth',
      price: 3299,
      includes: {
        en: ['2-3 systems', 'Improved admin', 'WhatsApp integration', 'Better UI'],
        my: ['2-3 system', 'Admin improved', 'WhatsApp integration', 'UI better'],
      },
    },
    {
      id: 'business-yearly',
      name: 'Business',
      price: 6599,
      popular: true,
      includes: {
        en: ['All systems unlock', 'Admin PRO: products, orders, customer', 'Upgraded chatbot: lead capture + automation', 'Realtime system', 'Full WhatsApp automation', 'Analytics dashboard', 'Performance optimised', 'Hosting + domain', 'Fast priority support'],
        my: ['Semua system unlock', 'Admin PRO: products, orders, customer', 'Chatbot upgrade: lead capture + automation', 'Realtime system', 'WhatsApp automation FULL', 'Dashboard analytics', 'Performance optimized', 'Hosting + domain', 'Support fast priority'],
      },
    },
    {
      id: 'pro-yearly',
      name: 'Pro',
      price: 9889,
      includes: {
        en: ['Everything in Business', 'Advanced automation', 'CRM + lead tracking', 'Multi-user', 'Scaling ready', 'Higher priority support'],
        my: ['Semua Business', 'Automation advanced', 'CRM + lead tracking', 'Multi-user', 'Scaling ready', 'Support priority tinggi'],
      },
    },
    {
      id: 'elite-yearly',
      name: 'Elite',
      price: 15599,
      includes: {
        en: ['Full custom system', 'Own branding', 'Custom feature request', 'Dedicated support', 'Scaling + architecture support'],
        my: ['Full custom system', 'Branding sendiri', 'Custom feature request', 'Dedicated support', 'Scaling + architecture support'],
      },
    },
  ],
};

export function getText(value, lang = 'en') {
  if (value && typeof value === 'object' && !Array.isArray(value)) return value[lang] || value.en || value.my || '';
  return value || '';
}

export function getSystemName(system, lang = 'en') {
  return `${system.emoji} ${getText(system.name, lang)}`;
}

export function getDemoItems(systemId) {
  return demoItemsBySystem[systemId] || demoItemsBySystem.default;
}
