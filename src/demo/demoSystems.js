import { getDemoItems, getSystemName, getText, systemsData } from '../data/systemsData';

export const demoPackages = ['Starter', 'Growth', 'Business', 'Pro', 'Elite'];
export const demoTabs = ['setup', 'customer', 'admin'];

const defaultDates = ['2026-06-05', '2026-06-06', '2026-06-07', '2026-06-08'];
const defaultTimes = ['10:00 AM', '12:30 PM', '3:00 PM', '5:30 PM'];

const typeLabel = {
  food: { en: 'Food Preorder', my: 'Food Preorder' },
  product: { en: 'Product Store', my: 'Kedai Produk' },
  booking: { en: 'Booking', my: 'Booking' },
  appointment: { en: 'Appointment', my: 'Appointment' },
  dispatch: { en: 'Delivery Dispatch', my: 'Delivery Dispatch' },
  custom: { en: 'Custom Website/System', my: 'Custom Website/System' },
  hr: { en: 'HR Leave', my: 'HR Cuti' },
  crm: { en: 'CRM', my: 'CRM' },
  visitor: { en: 'Visitor', my: 'Visitor' },
  invoice: { en: 'Invoice', my: 'Invois' },
  qr: { en: 'QR Table Order', my: 'QR Order Meja' },
  workflow: { en: 'Custom Process', my: 'Proses Khas' },
};

export function getSandboxType(system) {
  if (system.id === 'ecommerce') return 'product';
  if (system.id === 'booking') return 'booking';
  if (system.id === 'appointment') return 'appointment';
  if (system.id === 'food-order') return 'food';
  if (system.id === 'dispatch') return 'dispatch';
  if (system.id === 'custom-website') return 'custom';
  if (system.id === 'food-preorder') return 'food';
  if (system.id === 'qr-order') return 'qr';
  if (['product-order', 'ecommerce', 'pos'].includes(system.id)) return 'product';
  if (system.id === 'hr-leave') return 'hr';
  if (['crm', 'property'].includes(system.id)) return 'crm';
  if (system.id === 'visitor') return 'visitor';
  if (['invoice', 'donation'].includes(system.id)) return 'invoice';
  if (system.demoComponentKey === 'booking') return 'booking';
  return 'workflow';
}

function initials(name) {
  return String(name || 'BD')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase();
}

function normalizeItems(items, fallbackName = 'Demo Item') {
  const source = items.length ? items : [{ name: fallbackName, price: 29, stock: 20 }];
  return source.map((item, index) => ({
    id: item.id || `item-${index + 1}`,
    name: item.name || `${fallbackName} ${index + 1}`,
    price: Number(item.price || 0),
    stock: Number(item.stock || item.slots || 10),
    variants: item.variants || ['Standard', 'Premium'],
    active: item.active !== false,
  }));
}

function buildSlots() {
  return defaultDates.flatMap(date => defaultTimes.map(time => ({
    id: `${date}-${time.replace(/\W/g, '')}`,
    date,
    time,
    available: true,
  })));
}

export const demoSystems = systemsData
  .filter(system => system.demoEnabled && !system.demoPath)
  .map(system => ({
    ...system,
    sandboxType: getSandboxType(system),
    sandboxTypeLabel: typeLabel[getSandboxType(system)] || typeLabel.workflow,
  }));

export function getDemoSystem(systemId) {
  return demoSystems.find(system => system.id === systemId) || demoSystems[0];
}

export function getPackageAccess(packageName) {
  const tier = Math.max(0, demoPackages.indexOf(packageName));
  return {
    tier,
    hasAdmin: tier > 0,
    basicAdmin: tier >= 1,
    customerRecords: tier >= 2,
    automation: tier >= 2,
    analytics: tier >= 3,
    multiUser: tier >= 3,
    customBranding: tier >= 4,
    customWorkflow: tier >= 4,
  };
}

export function formatMoney(value) {
  return `RM${Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}

export function createSubmissionId(prefix = 'BD-DEMO') {
  return `${prefix}-${Date.now().toString(36).toUpperCase().slice(-5)}`;
}

export function getDefaultDemoSettings(system, lang = 'en') {
  const sandboxType = getSandboxType(system);
  const systemName = getSystemName(system, lang);
  const items = normalizeItems(getDemoItems(system.id), getText(system.shortName, lang) || systemName);
  const base = {
    businessName: `${systemName} Demo`,
    brandColor: '#16C47F',
    logoText: initials(systemName),
    whatsapp: '0123456789',
    paymentText: 'Pay by DuitNow QR or bank transfer. Send receipt after payment.',
    pickupEnabled: true,
    deliveryEnabled: ['product', 'food', 'qr'].includes(sandboxType),
    pickupTimes: defaultTimes,
    products: items,
    services: items,
    slots: buildSlots(),
    staff: ['Amirul Hakimi', 'Farah Roslan', 'Danial Tan'],
    leaveTypes: ['Annual Leave', 'Medical Leave', 'Emergency Leave'],
    pipelineStages: ['New Lead', 'Qualified', 'Proposal', 'Won'],
    hosts: ['Front Desk', 'Operations Manager', 'Sales Team'],
    purposes: ['Meeting', 'Delivery', 'Interview', 'Maintenance'],
    invoiceItems: items.map(item => ({ ...item, stock: 1 })),
    workflowSteps: system.workflowSteps?.length ? system.workflowSteps : ['Request', 'In progress', 'Completed'],
    runners: ['Izzat', 'Harith', 'Qayyum'],
    branches: ['HQ', 'Branch 2'],
    consultationTimes: ['10:00 AM', '12:30 PM', '3:00 PM'],
    itinerary: ['Meet up and briefing', 'Start activity', 'Rest/photo stop', 'Return and confirmation'],
    bringList: ['Water bottle', 'Comfortable shoes', 'Light snacks'],
    difficulty: 'Beginner friendly',
  };

  if (sandboxType === 'qr') {
    base.businessName = 'QR Table Order Demo';
    base.deliveryEnabled = false;
  }

  if (sandboxType === 'hr') {
    base.businessName = 'HR Leave Demo';
    base.paymentText = 'No payment needed for this request.';
  }

  if (sandboxType === 'crm') {
    base.businessName = 'CRM Pipeline Demo';
    base.paymentText = 'Deal value is tracked inside the pipeline.';
  }

  return base;
}

export function getInitialDemoState(system, lang = 'en') {
  return {
    systemId: system.id,
    settings: getDefaultDemoSettings(system, lang),
    submissions: [],
    activity: [],
    updatedAt: new Date().toISOString(),
  };
}
