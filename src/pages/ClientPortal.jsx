import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart3,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Copy,
  CreditCard,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Palette,
  Receipt,
  Search,
  Settings,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  Utensils,
  Users,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useClient } from '@/contexts/ClientContext';
import { signOutClient } from '@/services/authService';
import SafeImage from '@/components/common/SafeImage';
import ImageUploader from '@/components/uploads/ImageUploader';
import { deleteClientImage } from '@/services/storageService';
import {
  createClientMediaRecord,
  deleteClientMediaRecord,
  listClientCustomers,
  listClientMedia,
  listClientOrders,
  listClientProducts,
  updateClientBrandingAsset,
  updateClientProductImage,
} from '@/services/clientDataService';

function formatMoney(value) {
  const amount = Number(value || 0);
  return `RM${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function tenantInitials(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  return (parts[0]?.[0] || 'B') + (parts[1]?.[0] || 'D');
}

function assetObject(url, path, fileName = 'Uploaded image') {
  return url || path
    ? {
      publicUrl: url || '',
      path: path || '',
      fileName,
    }
    : null;
}

function normalizeSystemType(value = '') {
  const type = String(value || '').toLowerCase().replace(/[_\s]+/g, '-');
  if (type.includes('ecommerce') || type.includes('shop') || type.includes('store')) return 'ecommerce';
  if (type.includes('booking') || type.includes('trip') || type.includes('event')) return 'booking';
  if (type.includes('appointment') || type.includes('service')) return 'appointment';
  if (type.includes('food') || type.includes('menu') || type.includes('restaurant')) return 'food_order';
  if (type.includes('dispatch') || type.includes('runner') || type.includes('delivery')) return 'delivery_dispatch';
  return 'custom';
}

function shouldShowPoweredBy(tenant) {
  const settings = tenant?.settings || {};
  const branding = tenant?.branding || {};
  if (branding.hideBratstvoBranding === true || branding.hide_bratstvo_branding === true) return false;
  if (settings.show_powered_by === true) return true;
  if (settings.show_powered_by === false || settings.hide_powered_by === true) return false;
  const plan = String(tenant?.plan || '').toLowerCase();
  return !['business', 'pro', 'elite', 'elite custom'].some(name => plan.includes(name));
}

function getClientPublicPreset(systemType, businessName) {
  const name = businessName || 'Your business';
  const presets = {
    ecommerce: {
      eyebrow: 'Online store',
      title: `${name} online store`,
      subtitle: 'Browse products, choose items, and send your order with clear payment status.',
      primary: 'Shop now',
      Icon: ShoppingBag,
      stats: [['Products', 'Ready'], ['Checkout', 'Easy'], ['Payment', 'Tracked']],
      rows: [
        ['Premium Gift Set', 'RM89.00', 'In stock'],
        ['Travel Tumbler', 'RM45.00', 'Popular'],
        ['Mini Bundle', 'RM120.00', 'New'],
      ],
      side: ['Cart total', 'RM254.00', 'Payment pending'],
    },
    booking: {
      eyebrow: 'Trip and activity booking',
      title: `${name} booking page`,
      subtitle: 'Choose a trip, check available slots, fill participant details, and confirm your booking.',
      primary: 'View slots',
      Icon: CalendarDays,
      stats: [['Slots', '12 left'], ['Deposit', 'Ready'], ['Reminder', 'On']],
      rows: [
        ['Bukit sunrise trip', 'Sat, 8:00 AM', '12 slots'],
        ['Waterfall day pass', 'Sun, 9:30 AM', '6 slots'],
        ['Workshop session', 'Wed, 2:00 PM', 'Open'],
      ],
      side: ['Booking total', 'RM180.00', 'Deposit paid'],
    },
    appointment: {
      eyebrow: 'Appointment booking',
      title: `${name} appointment page`,
      subtitle: 'Pick a service, choose date and time, then submit your appointment details.',
      primary: 'Book appointment',
      Icon: Clock3,
      stats: [['Today', '8 slots'], ['Reminder', 'Sent'], ['Status', 'Confirmed']],
      rows: [
        ['Consultation', '10:30 AM', 'Available'],
        ['Repair check', '1:00 PM', 'Available'],
        ['Follow-up', '4:30 PM', 'Limited'],
      ],
      side: ['Next appointment', '10:30 AM', 'Reminder enabled'],
    },
    food_order: {
      eyebrow: 'Food order',
      title: `${name} menu ordering`,
      subtitle: 'Order from the menu for dine-in QR, pickup, delivery, or preorder depending on business settings.',
      primary: 'Open menu',
      Icon: Utensils,
      stats: [['Table', 'QR ready'], ['Kitchen', 'Live'], ['Pickup', 'Open']],
      rows: [
        ['Nasi box set', 'RM12.00', 'Kitchen queue'],
        ['Iced latte', 'RM8.00', 'Ready'],
        ['Dessert tray', 'RM35.00', 'Preorder'],
      ],
      side: ['Order total', 'RM55.00', 'Kitchen received'],
    },
    delivery_dispatch: {
      eyebrow: 'Tracking page',
      title: name,
      subtitle: 'Track delivery progress and job updates in one place.',
      primary: 'Track Status',
      Icon: Truck,
      stats: [['Runner', 'On the way'], ['ETA', '18 min'], ['Status', 'Live']],
      rows: [
        ['Pickup laundry', 'Assigned', 'Irfan'],
        ['Deliver invoice', 'On the way', 'Danial'],
        ['Pharmacy run', 'Completed', 'Liyana'],
      ],
      side: ['Current route', '3.4 km', 'Arriving soon'],
    },
    custom: {
      eyebrow: 'Business website',
      title: `${name} official website`,
      subtitle: 'Explore services, submit an enquiry, and contact the team through a clean customer flow.',
      primary: 'Explore',
      Icon: Star,
      stats: [['Pages', 'Ready'], ['Enquiry', 'Open'], ['Brand', 'Live']],
      rows: [
        ['Service overview', 'Website page', 'Ready'],
        ['Customer enquiry', 'Form', 'Open'],
        ['Business profile', 'Brand', 'Live'],
      ],
      side: ['Enquiry status', 'Open', 'Reply soon'],
    },
  };

  return presets[normalizeSystemType(systemType)] || presets.custom;
}

const dashboardMenuBySystem = {
  ecommerce: [
    ['Dashboard', '', LayoutDashboard],
    ['Orders', 'orders', ShoppingBag],
    ['Products', 'products', Package],
    ['Customers', 'customers', Users],
    ['Payments', 'payments', CreditCard],
    ['Vouchers', 'vouchers', Star],
    ['Shipping', 'shipping', Truck],
    ['Media', 'media', ImageIcon],
    ['Analytics', 'analytics', BarChart3],
    ['Branding', 'branding', Palette],
    ['Billing', 'billing', CreditCard],
    ['Settings', 'settings', Settings],
  ],
  booking: [
    ['Dashboard', '', LayoutDashboard],
    ['Trips / Events', 'trips-events', MapPin],
    ['Bookings', 'bookings', CalendarDays],
    ['Participants', 'participants', Users],
    ['Calendar', 'calendar', CalendarDays],
    ['Payments', 'payments', CreditCard],
    ['Gallery', 'gallery', ImageIcon],
    ['Reminders', 'reminders', Clock3],
    ['Media', 'media', ImageIcon],
    ['Analytics', 'analytics', BarChart3],
    ['Branding', 'branding', Palette],
    ['Billing', 'billing', CreditCard],
    ['Settings', 'settings', Settings],
  ],
  appointment: [
    ['Dashboard', '', LayoutDashboard],
    ['Calendar', 'calendar', CalendarDays],
    ['Appointments', 'appointments', Clock3],
    ['Services', 'services', Star],
    ['Staff', 'staff', Users],
    ['Customers', 'customers', Users],
    ['Reminders', 'reminders', Clock3],
    ['Payments', 'payments', CreditCard],
    ['Media', 'media', ImageIcon],
    ['Analytics', 'analytics', BarChart3],
    ['Branding', 'branding', Palette],
    ['Billing', 'billing', CreditCard],
    ['Settings', 'settings', Settings],
  ],
  food_order: [
    ['Dashboard', '', LayoutDashboard],
    ['Orders', 'orders', ShoppingBag],
    ['Kitchen Queue', 'kitchen-queue', Utensils],
    ['Menu', 'menu', Receipt],
    ['Categories', 'categories', Package],
    ['Tables / QR', 'tables-qr', Receipt],
    ['Pickup / Delivery', 'pickup-delivery', Truck],
    ['Customers', 'customers', Users],
    ['Payments', 'payments', CreditCard],
    ['Media', 'media', ImageIcon],
    ['Analytics', 'analytics', BarChart3],
    ['Branding', 'branding', Palette],
    ['Billing', 'billing', CreditCard],
    ['Settings', 'settings', Settings],
  ],
  delivery_dispatch: [
    ['Dashboard', '', LayoutDashboard],
    ['Jobs', 'jobs', Truck],
    ['Assign Runner', 'assign-runner', Users],
    ['Live Map', 'live-map', MapPin],
    ['Runners / Staff', 'runners', Users],
    ['Job Status', 'job-status', Clock3],
    ['Proof Uploads', 'proof-uploads', ImageIcon],
    ['Reports', 'reports', BarChart3],
    ['Media', 'media', ImageIcon],
    ['Analytics', 'analytics', BarChart3],
    ['Branding', 'branding', Palette],
    ['Billing', 'billing', CreditCard],
    ['Settings', 'settings', Settings],
  ],
  custom: [
    ['Dashboard', '', LayoutDashboard],
    ['Project Brief', 'project-brief', Receipt],
    ['Requests', 'requests', ShoppingBag],
    ['Files', 'files', ImageIcon],
    ['Appointment', 'appointment', CalendarDays],
    ['Quote', 'quote', Receipt],
    ['Media', 'media', ImageIcon],
    ['Branding', 'branding', Palette],
    ['Billing', 'billing', CreditCard],
    ['Settings', 'settings', Settings],
  ],
};

function getDashboardMenu(systemType) {
  return dashboardMenuBySystem[normalizeSystemType(systemType)] || dashboardMenuBySystem.custom;
}

function ClientShell({ children }) {
  const { tenant, clientSlug, businessSlug } = useClient();
  const { setUser } = useAuth();
  const location = useLocation();
  const slug = clientSlug || businessSlug || tenant?.subdomain || location.pathname.split('/').filter(Boolean)[1] || '';
  const base = `/core/${slug}`;
  const nav = getDashboardMenu(tenant?.systemType).map(([label, path, Icon]) => [
    label,
    path ? `${base}/${path}` : base,
    Icon,
  ]);

  const logout = async () => {
    await signOutClient();
    setUser(null);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <header className="sticky top-0 z-40" style={{ background: 'var(--c-nav)', borderBottom: '1px solid var(--c-border)', backdropFilter: 'blur(14px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to={base} className="flex items-center gap-3 min-w-0">
            <span className="h-10 w-10 rounded-xl flex items-center justify-center text-sm font-black shrink-0" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
              {tenantInitials(tenant?.businessName)}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-black truncate" style={{ color: 'var(--c-text)' }}>{tenant?.businessName}</span>
              <span className="block text-xs truncate" style={{ color: 'var(--c-muted)' }}>{tenant?.plan || 'Business account'}</span>
            </span>
          </Link>
          <button onClick={logout} className="h-10 w-10 rounded-xl inline-flex items-center justify-center" style={{ color: 'var(--c-muted)', border: '1px solid var(--c-border)' }} aria-label="Sign out">
            <LogOut size={17} />
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:grid lg:grid-cols-[240px_1fr] lg:gap-8">
        <aside className="hidden lg:block">
          <nav className="sticky top-24 space-y-1">
            {nav.map(([label, href, Icon]) => {
              const active = location.pathname === href;
              return (
                <Link
                  key={href}
                  to={href}
                  className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold"
                  style={{
                    background: active ? 'var(--c-primary-soft)' : 'transparent',
                    color: active ? 'var(--c-text)' : 'var(--c-muted)',
                    border: active ? '1px solid rgba(22,196,127,0.24)' : '1px solid transparent',
                  }}
                >
                  <Icon size={17} />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <main className="pb-24 lg:pb-8">{children}</main>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-5 lg:hidden" style={{ background: 'var(--c-nav)', borderTop: '1px solid var(--c-border)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        {nav.slice(0, 5).map(([label, href, Icon]) => {
          const active = location.pathname === href;
          return (
            <Link key={href} to={href} className="py-3 flex flex-col items-center gap-1 text-[11px]" style={{ color: active ? 'var(--c-accent)' : 'var(--c-muted)' }}>
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function ClientPublicSite() {
  const { tenant, tenantId } = useClient();
  const branding = tenant?.branding || {};
  const settings = tenant?.settings || {};
  const systemType = normalizeSystemType(tenant?.systemType);
  const businessName = tenant?.businessName || 'Your business';
  const preset = getClientPublicPreset(tenant?.systemType, businessName);
  const Icon = preset.Icon;
  const primaryColor = branding.primary_color || '#16c47f';
  const hasCustomContent = Boolean(settings.public_site_ready || settings.website_ready || settings.products?.length || settings.services?.length || settings.menu?.length || settings.trips?.length);
  const showPoweredBy = shouldShowPoweredBy(tenant);
  const heroTitle = settings.hero_title || (hasCustomContent ? preset.title : businessName);
  const heroSubtitle = settings.hero_subtitle || (systemType === 'delivery_dispatch'
    ? 'Track delivery progress and job updates in one place.'
    : hasCustomContent
      ? preset.subtitle
      : 'Website coming soon.');
  const primaryLabel = settings.primary_action_label || (systemType === 'delivery_dispatch' ? 'Track Status' : hasCustomContent ? preset.primary : 'Contact');
  const secondaryLabel = systemType === 'delivery_dispatch' ? 'Staff Login' : 'Login';
  const logoUrl = branding.logo_url || settings.logo_url || '';
  const bannerUrl = branding.banner_url || settings.banner_url || '';
  const [publicProducts, setPublicProducts] = useState([]);

  useEffect(() => {
    let active = true;

    async function loadProducts() {
      if (!tenantId) return;
      try {
        const rows = await listClientProducts(tenantId);
        if (active) setPublicProducts(rows.filter(item => String(item.status || 'active').toLowerCase() !== 'inactive').slice(0, 6));
      } catch {
        if (active) setPublicProducts([]);
      }
    }

    loadProducts();

    return () => {
      active = false;
    };
  }, [tenantId]);

  const displayRows = publicProducts.length
    ? publicProducts.map(item => [item.name, formatMoney(item.price), item.status || 'Available', item.image_url])
    : preset.rows.map(row => [...row, '']);

  return (
    <div className="min-h-screen" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <header className="px-5 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            {logoUrl ? (
              <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl" style={{ background: primaryColor }}>
                <img
                  src={logoUrl}
                  alt=""
                  className="h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                    const fallback = event.currentTarget.nextElementSibling;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                <span className="absolute inset-0 hidden items-center justify-center text-sm font-black" style={{ color: '#04130d' }}>
                  {branding.logo_text || tenantInitials(businessName)}
                </span>
              </span>
            ) : (
              <span className="h-11 w-11 rounded-xl flex items-center justify-center text-sm font-black shrink-0" style={{ background: primaryColor, color: '#04130d' }}>
                {branding.logo_text || tenantInitials(businessName)}
              </span>
            )}
            <span className="font-black truncate" style={{ color: 'var(--c-text)' }}>{businessName}</span>
          </div>
          <Link to="/login" className="rounded-xl px-4 py-2 text-sm font-black" style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)', background: 'var(--c-surface)' }}>
            {secondaryLabel}
          </Link>
        </div>
      </header>

      <main className="px-5 pb-14 pt-8 md:pb-20 md:pt-14">
        <section className="max-w-6xl mx-auto grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-black" style={{ color: primaryColor, background: 'var(--c-primary-soft)', border: '1px solid var(--c-border)' }}>
              <Icon size={14} /> {settings.eyebrow || preset.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl font-black leading-tight mb-5" style={{ color: 'var(--c-text)', letterSpacing: 0 }}>
              {heroTitle}
            </h1>
            <p className="text-base md:text-lg leading-relaxed max-w-2xl mb-8" style={{ color: 'var(--c-muted)' }}>
              {heroSubtitle}
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={settings.primary_action_url || '#start'} className="rounded-xl px-5 py-3 text-sm font-black" style={{ background: primaryColor, color: '#04130d' }}>
                {primaryLabel}
              </a>
              {systemType === 'delivery_dispatch' ? (
                <Link to="/login" className="rounded-xl px-5 py-3 text-sm font-black" style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)', background: 'var(--c-surface)' }}>
                  Staff Login
                </Link>
              ) : (
                <Link to="/login" className="rounded-xl px-5 py-3 text-sm font-black" style={{ border: '1px solid var(--c-border)', color: 'var(--c-text)', background: 'var(--c-surface)' }}>
                  Login
                </Link>
              )}
            </div>
            {!hasCustomContent && (
              <div className="mt-8 rounded-2xl p-4 text-sm leading-relaxed" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                <strong style={{ color: 'var(--c-text)' }}>{businessName}</strong>
                <span> We're preparing this website right now.</span>
              </div>
            )}
          </div>

          <div id="start" className="relative">
            <div className="absolute -inset-8 rounded-[36px] opacity-30 blur-3xl" style={{ background: primaryColor }} />
            <div className="relative overflow-hidden rounded-[28px] p-3" style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-shadow)' }}>
              <div className="flex items-center gap-2 border-b px-3 py-3" style={{ borderColor: 'var(--c-border-subtle)' }}>
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-yellow-400" />
                <span className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-3 flex min-w-0 flex-1 items-center gap-2 rounded-full px-3 py-1.5 text-xs" style={{ background: 'var(--c-input-bg)', color: 'var(--c-muted)' }}>
                  <Search size={13} />
                  <span className="truncate">{tenant?.customDomain || `${tenant?.subdomain || 'client'}.bratstvosfc.com`}</span>
                </div>
              </div>

              <div className="grid gap-4 p-4 md:grid-cols-[1fr_240px]">
                <div className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                  {bannerUrl && (
                    <div className="mb-4 overflow-hidden rounded-2xl" style={{ aspectRatio: '16 / 7', border: '1px solid var(--c-border)' }}>
                      <SafeImage src={bannerUrl} fallbackType="banner" className="h-full w-full object-cover" />
                    </div>
                  )}

                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{settings.preview_title || preset.title}</p>
                      <p className="mt-1 text-xs" style={{ color: 'var(--c-muted)' }}>{settings.preview_subtitle || preset.eyebrow}</p>
                    </div>
                    <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ background: primaryColor, color: '#04130d' }}>Live</span>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {preset.stats.map(([label, value]) => (
                      <div key={label} className="rounded-xl p-3" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                        <p className="text-[11px] font-bold" style={{ color: 'var(--c-muted)' }}>{label}</p>
                        <p className="mt-1 text-sm font-black" style={{ color: 'var(--c-text)' }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 space-y-2">
                    {displayRows.map(([title, meta, status, image]) => (
                      <div key={`${title}-${meta}`} className="flex items-center justify-between gap-3 rounded-xl p-3" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={{ border: '1px solid var(--c-border)' }}>
                            <SafeImage src={image} fallbackType={systemType === 'food_order' ? 'food' : systemType === 'booking' ? 'trip' : systemType === 'appointment' ? 'service' : 'product'} fallbackLabel={preset.eyebrow} className="h-full w-full object-cover" />
                          </span>
                          <span className="min-w-0">
                            <p className="truncate text-sm font-black" style={{ color: 'var(--c-text)' }}>{title}</p>
                            <p className="mt-1 text-xs" style={{ color: 'var(--c-muted)' }}>{meta}</p>
                          </span>
                        </div>
                        <span className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-black" style={{ background: 'var(--c-primary-soft)', color: primaryColor }}>{status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <aside id="status" className="rounded-[24px] p-4" style={{ background: 'linear-gradient(180deg, var(--c-surface), var(--c-input-bg))', border: '1px solid var(--c-border)' }}>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl" style={{ background: primaryColor, color: '#04130d' }}>
                      <Receipt size={18} />
                    </span>
                    <span className="rounded-full px-3 py-1 text-[10px] font-black" style={{ background: 'var(--c-primary-soft)', color: primaryColor }}>{preset.side[2]}</span>
                  </div>
                  <p className="text-xs font-bold" style={{ color: 'var(--c-muted)' }}>{preset.side[0]}</p>
                  <p className="mt-2 text-3xl font-black" style={{ color: 'var(--c-text)' }}>{preset.side[1]}</p>
                  {systemType === 'delivery_dispatch' && (
                    <label className="mt-5 block">
                      <span className="mb-2 block text-xs font-bold" style={{ color: 'var(--c-muted)' }}>Track delivery/job</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Enter tracking ID"
                          className="min-w-0 flex-1 rounded-xl px-3 py-2 text-xs outline-none"
                          style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}
                        />
                        <button type="button" className="rounded-xl px-3 py-2 text-xs font-black" style={{ background: primaryColor, color: '#04130d' }}>
                          Track
                        </button>
                      </div>
                    </label>
                  )}
                  <div className="mt-5 space-y-3">
                    {[CheckCircle2, MapPin, Clock3].map((StatusIcon, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: 'var(--c-surface)', color: primaryColor, border: '1px solid var(--c-border)' }}>
                          <StatusIcon size={14} />
                        </span>
                        <span className="text-xs font-bold" style={{ color: 'var(--c-muted)' }}>
                          {['Details received', 'Status updated', 'Customer notified'][index]}
                        </span>
                      </div>
                    ))}
                  </div>
                </aside>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-5 pb-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 border-t pt-5 text-xs sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: 'var(--c-border-subtle)', color: 'var(--c-muted)' }}>
          <span>{businessName} official site</span>
          {showPoweredBy && <span>Powered by Bratstvo Digital</span>}
        </div>
      </footer>
    </div>
  );
}

function ProductImagePanel({ tenantId, products, onProductUpdated }) {
  const [message, setMessage] = useState('');

  const saveProductImage = async (product, image) => {
    setMessage('');
    const updated = await updateClientProductImage(tenantId, product.id, image);
    onProductUpdated(updated);
    setMessage(image ? 'Product image saved.' : 'Product image removed.');
  };

  return (
    <section className="mb-8 rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--c-accent)' }}>Product images</p>
        <h2 className="mt-2 text-2xl font-black" style={{ color: 'var(--c-text)' }}>Upload product images.</h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          These images appear in the product list, customer view and cart thumbnail.
        </p>
      </div>
      {message && <p className="mb-4 rounded-xl px-3 py-2 text-xs" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-text)', border: '1px solid rgba(24,217,138,.24)' }}>{message}</p>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="rounded-2xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <div className="mb-3">
              <h3 className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{product.name}</h3>
              <p className="mt-1 text-xs" style={{ color: 'var(--c-muted)' }}>{formatMoney(product.price)} - Stock {product.stock ?? '-'}</p>
            </div>
            <ImageUploader
              tenantId={tenantId}
              category="products"
              value={assetObject(product.image_url, product.image_path, product.name)}
              onChange={image => saveProductImage(product, image)}
              label="Gambar produk"
              helperText="Upload the main product image. JPG, PNG or WebP."
              aspectRatio="4 / 3"
            />
          </div>
        ))}
        {!products.length && (
          <p className="text-sm" style={{ color: 'var(--c-muted)' }}>No products added yet. Add products first, then upload images.</p>
        )}
      </div>
    </section>
  );
}

function BrandingMediaPanel({ tenant, tenantId }) {
  const branding = tenant?.branding || {};
  const [logo, setLogo] = useState(assetObject(branding.logo_url, branding.logo_path, 'Business logo'));
  const [banner, setBanner] = useState(assetObject(branding.banner_url, branding.banner_path, 'Banner website'));
  const [message, setMessage] = useState('');

  const saveBrandingImage = async (image, type) => {
    setMessage('');
    await updateClientBrandingAsset(tenantId, image, type);
    if (type === 'banner') setBanner(image);
    else setLogo(image);
    setMessage(type === 'banner' ? 'Website banner saved.' : 'Business logo saved.');
  };

  return (
    <section className="mb-8 rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--c-accent)' }}>Branding</p>
        <h2 className="mt-2 text-2xl font-black" style={{ color: 'var(--c-text)' }}>Logo and website banner.</h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          The logo appears on the website, checkout/customer view and dashboard preview. The banner appears in the hero/customer page.
        </p>
      </div>
      {message && <p className="mb-4 rounded-xl px-3 py-2 text-xs" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-text)', border: '1px solid rgba(24,217,138,.24)' }}>{message}</p>}
      <div className="grid gap-5 lg:grid-cols-2">
        <ImageUploader
          tenantId={tenantId}
          category="logo"
          value={logo}
          onChange={image => saveBrandingImage(image, 'logo')}
          label="Business logo"
          helperText="Upload a transparent or square logo. Maximum 5MB."
          aspectRatio="1 / 1"
        />
        <ImageUploader
          tenantId={tenantId}
          category="banner"
          value={banner}
          onChange={image => saveBrandingImage(image, 'banner')}
          label="Website banner"
          helperText="Upload a banner or hero image. Maximum 5MB."
          aspectRatio="16 / 7"
        />
      </div>
    </section>
  );
}

function MediaLibraryPanel({ tenantId }) {
  const categories = ['all', 'logo', 'banner', 'products', 'menu', 'trips', 'services', 'gallery', 'staff', 'proof', 'misc'];
  const [category, setCategory] = useState('all');
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const uploadCategory = category === 'all' ? 'misc' : category;

  const loadMedia = async () => {
    setLoading(true);
    try {
      setMedia(await listClientMedia(tenantId, category));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tenantId, category]);

  const addMedia = async image => {
    if (!image) return;
    await createClientMediaRecord(tenantId, image, uploadCategory);
    setMessage('Image saved in the media library.');
    await loadMedia();
  };

  const removeMedia = async item => {
    setMessage('');
    if (item.file_path) await deleteClientImage(item.file_path);
    await deleteClientMediaRecord(tenantId, item.id);
    setMessage('Image deleted.');
    await loadMedia();
  };

  const copyUrl = async url => {
    if (!url) return;
    await navigator.clipboard?.writeText(url);
    setMessage('Image URL copied.');
  };

  return (
    <section className="mb-8 rounded-2xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="mb-5">
        <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--c-accent)' }}>Media library</p>
        <h2 className="mt-2 text-2xl font-black" style={{ color: 'var(--c-text)' }}>All images.</h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          Store menu, trip, service, staff, delivery proof, QR and gallery images in one place.
        </p>
      </div>
      <div className="mb-5 flex flex-wrap gap-2">
        {categories.map(item => (
          <button key={item} type="button" onClick={() => setCategory(item)} className="rounded-full px-3 py-2 text-xs font-black" style={{ background: category === item ? 'var(--c-accent)' : 'var(--c-input-bg)', color: category === item ? 'var(--c-accent-contrast)' : 'var(--c-muted)', border: '1px solid var(--c-border)' }}>
            {item}
          </button>
        ))}
      </div>
      <div className="mb-5">
        <ImageUploader
          tenantId={tenantId}
          category={uploadCategory}
          value={null}
          onChange={addMedia}
          label={`Upload ${uploadCategory} image`}
          helperText="Images are stored by category for easier management."
          aspectRatio="16 / 8"
        />
      </div>
      {message && <p className="mb-4 rounded-xl px-3 py-2 text-xs" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-text)', border: '1px solid rgba(24,217,138,.24)' }}>{message}</p>}
      {loading ? (
        <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Loading media...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {media.map(item => (
            <div key={item.id} className="overflow-hidden rounded-2xl" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
              <div style={{ aspectRatio: '4 / 3' }}>
                <SafeImage src={item.file_url} fallbackType={item.category === 'products' ? 'product' : item.category} fallbackLabel={item.category} className="h-full w-full object-cover" />
              </div>
              <div className="p-3">
                <p className="truncate text-xs font-black" style={{ color: 'var(--c-text)' }}>{item.file_name || item.category}</p>
                <p className="mt-1 text-[11px]" style={{ color: 'var(--c-muted)' }}>{item.category} - {Math.round((item.size || 0) / 1024)}KB</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" onClick={() => copyUrl(item.file_url)} className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: 'var(--c-surface)', color: 'var(--c-muted)', border: '1px solid var(--c-border)' }} aria-label="Copy image URL">
                    <Copy size={15} />
                  </button>
                  <button type="button" onClick={() => removeMedia(item)} className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: 'var(--c-surface)', color: 'var(--c-muted)', border: '1px solid var(--c-border)' }} aria-label="Delete image">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {!media.length && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>No images in this category yet.</p>}
        </div>
      )}
    </section>
  );
}

function StatGrid({ stats, loading }) {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-3 gap-4 mb-8">
      {stats.map(([label, value, Icon]) => (
        <div key={label} className="rounded-xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <Icon size={20} className="mb-4" style={{ color: 'var(--c-accent)' }} />
          <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{label}</p>
          <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{loading ? '-' : value}</p>
        </div>
      ))}
    </div>
  );
}

function DashboardPanel({ title, subtitle, children }) {
  return (
    <section className="rounded-xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
      <div className="p-5" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
        <h2 className="font-black" style={{ color: 'var(--c-text)' }}>{title}</h2>
        {subtitle && <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>{subtitle}</p>}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function SimpleTable({ columns, rows, emptyText = 'No records yet.' }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[680px]">
        <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr))` }}>
          {columns.map(column => (
            <p key={column} className="text-[11px] font-black uppercase" style={{ color: 'var(--c-muted)' }}>{column}</p>
          ))}
        </div>
        <div className="mt-3 space-y-2">
          {rows.map((row, index) => (
            <div key={index} className="grid gap-2 rounded-xl p-3 text-sm" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(120px, 1fr))`, background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
              {row.map((value, cellIndex) => (
                <span key={cellIndex} className="truncate">{value || '-'}</span>
              ))}
            </div>
          ))}
          {!rows.length && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>{emptyText}</p>}
        </div>
      </div>
    </div>
  );
}

function PlaceholderCards({ items }) {
  return (
    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
      {items.map(([title, text, Icon]) => (
        <div key={title} className="rounded-xl p-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <Icon size={18} className="mb-3" style={{ color: 'var(--c-accent)' }} />
          <p className="font-black" style={{ color: 'var(--c-text)' }}>{title}</p>
          <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>{text}</p>
        </div>
      ))}
    </div>
  );
}

function BusinessProfilePanel({ tenant }) {
  return (
    <aside className="rounded-xl p-5" style={{ background: 'var(--c-surface-strong)', border: '1px solid var(--c-border)', boxShadow: 'var(--c-shadow)' }}>
      <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Business profile</p>
      {[
        ['Business', tenant?.businessName],
        ['Website', tenant?.customDomain || tenant?.subdomain || '-'],
        ['System', tenant?.systemType || '-'],
        ['Plan', tenant?.plan || '-'],
      ].map(([label, value]) => (
        <div key={label} className="flex justify-between gap-4 py-3" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
          <span className="text-xs" style={{ color: 'var(--c-muted)' }}>{label}</span>
          <span className="text-xs font-black text-right" style={{ color: 'var(--c-text)' }}>{value}</span>
        </div>
      ))}
    </aside>
  );
}

function NotAvailablePanel({ title, message }) {
  return (
    <DashboardPanel title={title} subtitle="This page is not part of this business system.">
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{message}</p>
    </DashboardPanel>
  );
}

const dispatchJobs = [
  ['JOB-1042', 'HQ Store', 'Taman Melati', 'Aiman', 'Assigned', 'High', '2 min ago'],
  ['JOB-1041', 'Warehouse B', 'Setapak', 'Nora', 'On the way', 'Normal', '8 min ago'],
  ['JOB-1040', 'Client Office', 'Wangsa Maju', 'Hafiz', 'Completed', 'Normal', '21 min ago'],
];

const runners = [
  ['Aiman Rosli', '+60 12-220 1440', 'Motorcycle', 'Online', 'JOB-1042'],
  ['Nora Halim', '+60 13-410 8821', 'Car', 'Online', 'JOB-1041'],
  ['Hafiz Manan', '+60 17-331 9012', 'Van', 'Break', '-'],
];

function getDashboardStats(systemType, { orders, products, customers }) {
  const revenue = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
  const stats = {
    delivery_dispatch: [
      ['Active Jobs', 8, Truck],
      ['Runners Online', 3, Users],
      ['Pending Jobs', 5, Clock3],
      ['Completed Today', 18, CheckCircle2],
      ['Delayed Jobs', 2, Clock3],
      ['Proof Pending', 4, ImageIcon],
    ],
    ecommerce: [
      ["Today's Orders", orders.length, ShoppingBag],
      ['Pending Payment', orders.filter(order => String(order.status || '').toLowerCase().includes('pending')).length, CreditCard],
      ['Completed Orders', orders.filter(order => String(order.status || '').toLowerCase().includes('complete')).length, CheckCircle2],
      ['Revenue', formatMoney(revenue), BarChart3],
      ['Products', products.length, Package],
      ['Customers', customers.length, Users],
    ],
    booking: [
      ['Upcoming Trips', 4, CalendarDays],
      ['Participants', customers.length || 32, Users],
      ['Pending Payment', 6, CreditCard],
      ['Available Slots', 18, Clock3],
      ['Next Event', 'Saturday', CalendarDays],
    ],
    appointment: [
      ["Today's Appointments", 9, CalendarDays],
      ['Pending Confirmation', 3, Clock3],
      ['Completed', 14, CheckCircle2],
      ['No-show', 1, Users],
      ['Available Slots', 7, Clock3],
    ],
    food_order: [
      ['New Orders', orders.length || 12, ShoppingBag],
      ['Kitchen Queue', 5, Utensils],
      ['Preparing', 4, Clock3],
      ['Ready', 3, CheckCircle2],
      ['Revenue Today', formatMoney(revenue), BarChart3],
    ],
    custom: [
      ['Open Requests', 3, ShoppingBag],
      ['Files Shared', 8, ImageIcon],
      ['Pending Quote', 2, Receipt],
      ['Appointments', 1, CalendarDays],
    ],
  };

  return stats[systemType] || stats.custom;
}

function SharedSystemPage({ page, tenant, tenantId }) {
  if (page === 'media') return <MediaLibraryPanel tenantId={tenantId} />;
  if (page === 'branding') {
    return (
      <div className="grid gap-5">
        <BrandingMediaPanel tenant={tenant} tenantId={tenantId} />
        <DashboardPanel title="Brand settings" subtitle="Prepare the public website identity for this business.">
          <PlaceholderCards items={[
            ['Primary color', 'Set the main brand color used on buttons, badges and highlights.', Palette],
            ['Tagline', 'Add a short line that explains the business clearly.', Star],
            ['Public website settings', 'Control contact button labels, hero text and display preferences.', Settings],
          ]} />
        </DashboardPanel>
      </div>
    );
  }
  if (page === 'billing') {
    return (
      <DashboardPanel title="Billing and plan" subtitle="Plan, limits, domain and watermark rules for this client.">
        <PlaceholderCards items={[
          ['Current plan', tenant?.plan || 'Active plan will appear here.', CreditCard],
          ['Domain status', tenant?.customDomain || tenant?.subdomain || 'Domain status will appear here.', MapPin],
          ['Watermark rules', 'Starter and Growth show public branding. Business, Pro and Elite can hide it.', Settings],
        ]} />
      </DashboardPanel>
    );
  }
  if (page === 'settings') {
    return (
      <DashboardPanel title="Business settings" subtitle="Operational settings for this client dashboard.">
        <PlaceholderCards items={[
          ['Business profile', 'Business name, contact details and public website preferences.', Settings],
          ['System settings', 'Configure workflows that match this business system type.', Settings],
          ['Notifications', 'Customer, staff and owner notification preferences.', Clock3],
        ]} />
      </DashboardPanel>
    );
  }
  if (page === 'analytics') {
    return (
      <DashboardPanel title="Analytics" subtitle="Performance snapshot for this business.">
        <PlaceholderCards items={[
          ['Traffic', 'Customer visits and page activity will appear here.', BarChart3],
          ['Conversion', 'Orders, bookings or job completion trends will appear here.', CheckCircle2],
          ['Top activity', 'The most active products, trips, services or jobs will appear here.', Star],
        ]} />
      </DashboardPanel>
    );
  }
  if (page === 'payments') {
    return (
      <DashboardPanel title="Payments" subtitle="Payment tracking for this business system.">
        <SimpleTable columns={['Reference', 'Customer', 'Amount', 'Status', 'Updated']} rows={[
          ['PAY-1008', 'Nadia Rahman', 'RM120.00', 'Pending', 'Today'],
          ['PAY-1007', 'Farid Amin', 'RM54.00', 'Paid', 'Yesterday'],
        ]} />
      </DashboardPanel>
    );
  }
  return null;
}

function EcommerceContent({ page, products, orders, customers, tenantId, setProducts }) {
  if (page === 'products') {
    return (
      <div className="grid gap-5">
        <ProductImagePanel
          tenantId={tenantId}
          products={products}
          onProductUpdated={updatedProduct => setProducts(current => current.map(item => (item.id === updatedProduct.id ? updatedProduct : item)))}
        />
        <DashboardPanel title="Product table" subtitle="Product list, add product and image upload workflow.">
          <SimpleTable columns={['Product', 'Price', 'Stock', 'Status']} rows={products.map(item => [item.name, formatMoney(item.price), item.stock, item.status || 'Active'])} />
        </DashboardPanel>
      </div>
    );
  }
  if (page === 'orders' || page === 'dashboard') {
    return (
      <DashboardPanel title={page === 'dashboard' ? 'Recent orders' : 'Order table'} subtitle="Track ecommerce order status and payment progress.">
        <SimpleTable columns={['Order', 'Customer', 'Status', 'Amount']} rows={orders.map(item => [item.id, item.customer_name || item.email, item.status || 'New', formatMoney(item.total_amount)])} />
      </DashboardPanel>
    );
  }
  if (page === 'customers') {
    return (
      <DashboardPanel title="Customer list" subtitle="Recent customer records from the store.">
        <SimpleTable columns={['Name', 'Phone', 'Email', 'Status']} rows={customers.map(item => [item.customer_name || item.name, item.customer_phone || item.phone, item.email, item.status || 'Active'])} />
      </DashboardPanel>
    );
  }
  if (page === 'vouchers') return <DashboardPanel title="Vouchers" subtitle="Discount and campaign tools for ecommerce."><PlaceholderCards items={[['Voucher setup', 'Create percentage, fixed amount and free shipping vouchers here.', Receipt], ['Usage limits', 'Limit vouchers by date, quantity or customer group.', Settings]]} /></DashboardPanel>;
  if (page === 'shipping') return <DashboardPanel title="Shipping" subtitle="Delivery options and fulfilment rules."><PlaceholderCards items={[['Shipping zones', 'Set delivery areas, fees and pickup rules.', Truck], ['Fulfilment status', 'Track packing, shipped and completed orders.', CheckCircle2]]} /></DashboardPanel>;
  return null;
}

function DeliveryDispatchContent({ page }) {
  if (page === 'products') {
    return <NotAvailablePanel title="Products not available" message="Delivery Dispatch uses jobs, runners, live map and proof uploads instead of ecommerce products." />;
  }
  if (page === 'dashboard' || page === 'jobs') {
    return (
      <DashboardPanel title={page === 'dashboard' ? 'Active job list' : 'Job list'} subtitle="Operational dispatch queue for pickups, drop-offs and runners.">
        <SimpleTable columns={['Job ID', 'Pickup', 'Drop-off', 'Runner', 'Status', 'Priority', 'Updated']} rows={dispatchJobs} />
      </DashboardPanel>
    );
  }
  if (page === 'assign-runner') {
    return (
      <DashboardPanel title="Assign runner" subtitle="Assign staff or runner to a pending job.">
        <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
          {['Select job', 'Select runner'].map(label => (
            <label key={label} className="block">
              <span className="mb-2 block text-xs font-bold" style={{ color: 'var(--c-muted)' }}>{label}</span>
              <select className="w-full rounded-xl px-3 py-3 text-sm outline-none" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                <option>{label === 'Select job' ? 'JOB-1042' : 'Aiman Rosli'}</option>
                <option>{label === 'Select job' ? 'JOB-1041' : 'Nora Halim'}</option>
              </select>
            </label>
          ))}
          <button type="button" className="self-end rounded-xl px-5 py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>Assign</button>
        </div>
      </DashboardPanel>
    );
  }
  if (page === 'live-map') {
    return (
      <div className="grid gap-5">
        <DashboardPanel title="Live map" subtitle="Location tracking placeholder.">
          <div className="grid min-h-[260px] place-items-center rounded-xl text-center" style={{ background: 'var(--c-input-bg)', border: '1px dashed var(--c-border)', color: 'var(--c-muted)' }}>
            Live map will appear here once location tracking is enabled.
          </div>
        </DashboardPanel>
        <PlaceholderCards items={[
          ['Online runners', '3 runners online', Users],
          ['Active routes', '8 active routes', Truck],
          ['Last update', 'Just now', Clock3],
        ]} />
      </div>
    );
  }
  if (page === 'runners') return <DashboardPanel title="Runners / Staff" subtitle="Runner list and current job assignment."><SimpleTable columns={['Name', 'Phone', 'Vehicle', 'Status', 'Current Job']} rows={runners} /></DashboardPanel>;
  if (page === 'job-status') return <DashboardPanel title="Job status board" subtitle="Dispatch kanban by job progress."><PlaceholderCards items={['Assigned', 'On the way', 'Arrived', 'Completed', 'Cancelled'].map(status => [status, 'Jobs in this status will appear here.', Clock3])} /></DashboardPanel>;
  if (page === 'proof-uploads') return <DashboardPanel title="Proof uploads" subtitle="Delivery proof photos and documents."><PlaceholderCards items={[['JOB-1042', 'Photo placeholder - uploaded by Aiman, 10:42 AM', ImageIcon], ['JOB-1041', 'Signature placeholder - uploaded by Nora, 10:18 AM', ImageIcon]]} /></DashboardPanel>;
  if (page === 'reports') return <DashboardPanel title="Reports" subtitle="Daily dispatch and runner performance."><PlaceholderCards items={[['Daily jobs', '26 jobs created today.', BarChart3], ['Completed', '18 jobs completed.', CheckCircle2], ['Delayed', '2 jobs delayed.', Clock3], ['Runner performance', 'Completion and response time by runner.', Users]]} /></DashboardPanel>;
  return null;
}

function BookingContent({ page }) {
  if (page === 'products') return <NotAvailablePanel title="Products not available" message="Booking systems use trips, events, bookings and participants instead of product inventory." />;
  if (page === 'dashboard' || page === 'trips-events') return <DashboardPanel title="Trips / Events" subtitle="Upcoming trips, events and available slots."><SimpleTable columns={['Trip / Event', 'Date', 'Slots', 'Status']} rows={[['Bukit sunrise trip', 'Saturday', '12 slots', 'Open'], ['Workshop session', 'Wednesday', '6 slots', 'Open']]} /></DashboardPanel>;
  if (page === 'bookings') return <DashboardPanel title="Bookings" subtitle="Booking table and payment status."><SimpleTable columns={['Booking', 'Customer', 'Trip', 'Payment', 'Status']} rows={[['BKG-1021', 'Nadia', 'Bukit sunrise trip', 'Deposit paid', 'Confirmed']]} /></DashboardPanel>;
  if (page === 'participants') return <DashboardPanel title="Participants" subtitle="Participant details for each trip or event."><SimpleTable columns={['Name', 'Phone', 'Trip', 'Check-in']} rows={[['Alya Rahman', '+60 12-441 2929', 'Bukit sunrise trip', 'Pending']]} /></DashboardPanel>;
  if (page === 'calendar') return <DashboardPanel title="Calendar" subtitle="Trip and event calendar placeholder."><div className="grid min-h-[240px] place-items-center rounded-xl text-sm" style={{ background: 'var(--c-input-bg)', border: '1px dashed var(--c-border)', color: 'var(--c-muted)' }}>Calendar view will appear here once schedules are connected.</div></DashboardPanel>;
  if (page === 'gallery') return <DashboardPanel title="Gallery" subtitle="Trip/event image gallery."><PlaceholderCards items={[['Trip photos', 'Upload destination or event images here.', ImageIcon], ['Customer previews', 'Images can be reused on the public booking page.', Star]]} /></DashboardPanel>;
  if (page === 'reminders') return <DashboardPanel title="Reminders" subtitle="Booking reminders and customer follow-up."><PlaceholderCards items={[['Reminder queue', 'Upcoming reminder messages will appear here.', Clock3]]} /></DashboardPanel>;
  return null;
}

function AppointmentContent({ page }) {
  if (page === 'products') return <NotAvailablePanel title="Products not available" message="Appointment systems use services, staff and appointment schedules instead of product inventory." />;
  if (page === 'dashboard' || page === 'calendar') return <DashboardPanel title="Calendar view" subtitle="Appointment calendar placeholder."><div className="grid min-h-[240px] place-items-center rounded-xl text-sm" style={{ background: 'var(--c-input-bg)', border: '1px dashed var(--c-border)', color: 'var(--c-muted)' }}>Calendar view will appear here once appointment slots are connected.</div></DashboardPanel>;
  if (page === 'appointments') return <DashboardPanel title="Appointments" subtitle="Appointment table and customer confirmation status."><SimpleTable columns={['Time', 'Customer', 'Service', 'Staff', 'Status']} rows={[['10:30 AM', 'Farah', 'Consultation', 'Izzat', 'Confirmed'], ['2:00 PM', 'Haziq', 'Repair check', 'Mira', 'Pending']]} /></DashboardPanel>;
  if (page === 'services') return <DashboardPanel title="Services" subtitle="Service list and duration settings."><SimpleTable columns={['Service', 'Duration', 'Price', 'Status']} rows={[['Consultation', '30 min', 'RM80.00', 'Active'], ['Repair check', '45 min', 'RM120.00', 'Active']]} /></DashboardPanel>;
  if (page === 'staff') return <DashboardPanel title="Staff schedule" subtitle="Staff list, role and availability."><SimpleTable columns={['Name', 'Role', 'Today', 'Status']} rows={[['Izzat', 'Consultant', '9:00 AM - 5:00 PM', 'Available'], ['Mira', 'Technician', '12:00 PM - 8:00 PM', 'Available']]} /></DashboardPanel>;
  if (page === 'customers') return <DashboardPanel title="Customers" subtitle="Appointment customer records."><SimpleTable columns={['Name', 'Phone', 'Last Visit', 'Status']} rows={[['Farah', '+60 11-220 1200', 'Today', 'Active']]} /></DashboardPanel>;
  if (page === 'reminders') return <DashboardPanel title="Reminders" subtitle="Appointment confirmations and follow-up reminders."><PlaceholderCards items={[['Confirmation reminders', 'Pending customer confirmations will appear here.', Clock3]]} /></DashboardPanel>;
  return null;
}

function FoodOrderContent({ page, orders }) {
  if (page === 'products') return <NotAvailablePanel title="Products not available" message="Food Order systems use Menu, Categories, Kitchen Queue and Tables / QR instead of a product dashboard." />;
  if (page === 'dashboard' || page === 'orders') return <DashboardPanel title={page === 'dashboard' ? 'Recent food orders' : 'Orders'} subtitle="Food order status from order received to ready."><SimpleTable columns={['Order', 'Customer', 'Type', 'Status', 'Total']} rows={(orders.length ? orders : [{ id: 'ORD-1008', customer_name: 'Walk-in customer', status: 'Preparing', total_amount: 35 }]).map(item => [item.id, item.customer_name || 'Customer', item.source || 'Pickup', item.status || 'New', formatMoney(item.total_amount)])} /></DashboardPanel>;
  if (page === 'kitchen-queue') return <DashboardPanel title="Kitchen Queue" subtitle="Queue board for kitchen preparation."><PlaceholderCards items={[['New', 'Orders waiting for kitchen.', ShoppingBag], ['Preparing', 'Food currently being prepared.', Utensils], ['Ready', 'Orders ready for pickup or delivery.', CheckCircle2]]} /></DashboardPanel>;
  if (page === 'menu') return <DashboardPanel title="Menu" subtitle="Menu item table with image placeholder."><SimpleTable columns={['Image', 'Item', 'Category', 'Price', 'Status']} rows={[['Image placeholder', 'Nasi box set', 'Meals', 'RM12.00', 'Active'], ['Image placeholder', 'Iced latte', 'Drinks', 'RM8.00', 'Active']]} /></DashboardPanel>;
  if (page === 'categories') return <DashboardPanel title="Categories" subtitle="Menu categories for customer ordering."><SimpleTable columns={['Category', 'Items', 'Status']} rows={[['Meals', '12', 'Active'], ['Drinks', '8', 'Active']]} /></DashboardPanel>;
  if (page === 'tables-qr') return <DashboardPanel title="Tables / QR" subtitle="Table list and QR code placeholder."><PlaceholderCards items={[['Table A1', 'QR placeholder for dine-in orders.', Receipt], ['Table A2', 'QR placeholder for dine-in orders.', Receipt]]} /></DashboardPanel>;
  if (page === 'pickup-delivery') return <DashboardPanel title="Pickup / Delivery" subtitle="Pickup and delivery status board."><PlaceholderCards items={[['Pickup queue', 'Orders waiting for pickup.', ShoppingBag], ['Delivery queue', 'Orders assigned to delivery.', Truck]]} /></DashboardPanel>;
  return null;
}

function CustomContent({ page }) {
  if (page === 'products') return <NotAvailablePanel title="Products not available" message="This custom system is configured around project requests, files, appointments and quotes." />;
  if (page === 'dashboard' || page === 'project-brief') return <DashboardPanel title="Project brief" subtitle="Summary of the custom workflow and requested features."><PlaceholderCards items={[['Business flow', 'Capture how this business handles customers and operations.', Receipt], ['Required files', 'Documents, references and content will appear here.', ImageIcon]]} /></DashboardPanel>;
  if (page === 'requests') return <DashboardPanel title="Requests" subtitle="Customer or internal request list."><SimpleTable columns={['Request', 'Customer', 'Status', 'Updated']} rows={[['REQ-101', 'Client enquiry', 'Open', 'Today']]} /></DashboardPanel>;
  if (page === 'files') return <DashboardPanel title="Files" subtitle="Shared files and references."><PlaceholderCards items={[['File library', 'Documents and uploaded files will appear here.', ImageIcon]]} /></DashboardPanel>;
  if (page === 'appointment') return <DashboardPanel title="Appointment" subtitle="Appointment placeholder for custom workflows."><PlaceholderCards items={[['Appointment request', 'Booking or consultation requests will appear here.', CalendarDays]]} /></DashboardPanel>;
  if (page === 'quote') return <DashboardPanel title="Quote" subtitle="Quote and estimate placeholder."><PlaceholderCards items={[['Pending quote', 'Quote drafts and approvals will appear here.', Receipt]]} /></DashboardPanel>;
  return null;
}

function SystemPageContent({ systemType, page, tenant, tenantId, products, orders, customers, setProducts }) {
  const shared = SharedSystemPage({ page, tenant, tenantId });
  if (shared) return shared;

  const content =
    systemType === 'delivery_dispatch' ? DeliveryDispatchContent({ page }) :
      systemType === 'ecommerce' ? EcommerceContent({ page, products, orders, customers, tenantId, setProducts }) :
        systemType === 'booking' ? BookingContent({ page }) :
          systemType === 'appointment' ? AppointmentContent({ page }) :
            systemType === 'food_order' ? FoodOrderContent({ page, orders }) :
              CustomContent({ page });

  return content || (
    <DashboardPanel title="Page setup" subtitle="This workspace page is ready for the next setup step.">
      <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
        Configure this page for the selected business system when the workflow is enabled.
      </p>
    </DashboardPanel>
  );
}

export function ClientWorkspacePage({ page = 'dashboard' }) {
  const { tenant, tenantId } = useClient();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadClientDashboardData() {
      if (!tenantId) return;
      setLoading(true);
      setError('');

      try {
        const [productRows, orderRows, customerRows] = await Promise.all([
          listClientProducts(tenantId),
          listClientOrders(tenantId),
          listClientCustomers(tenantId),
        ]);

        if (!active) return;
        setProducts(productRows);
        setOrders(orderRows);
        setCustomers(customerRows);
      } catch (err) {
        if (active) setError(err.message || 'Unable to load records.');
      } finally {
        if (active) setLoading(false);
      }
    }

    loadClientDashboardData();

    return () => {
      active = false;
    };
  }, [tenantId]);

  const systemType = normalizeSystemType(tenant?.systemType);
  const stats = useMemo(() => getDashboardStats(systemType, { orders, products, customers }), [customers, orders, products, systemType]);

  const pageTitle = {
    dashboard: 'Dashboard',
    orders: 'Orders',
    products: 'Products',
    customers: 'Customers',
    payments: 'Payments',
    vouchers: 'Vouchers',
    shipping: 'Shipping',
    'trips-events': 'Trips / Events',
    bookings: 'Bookings',
    participants: 'Participants',
    calendar: 'Calendar',
    gallery: 'Gallery',
    reminders: 'Reminders',
    appointments: 'Appointments',
    services: 'Services',
    staff: 'Staff',
    'kitchen-queue': 'Kitchen Queue',
    menu: 'Menu',
    categories: 'Categories',
    'tables-qr': 'Tables / QR',
    'pickup-delivery': 'Pickup / Delivery',
    jobs: 'Jobs',
    'assign-runner': 'Assign Runner',
    'live-map': 'Live Map',
    runners: 'Runners / Staff',
    'job-status': 'Job Status',
    'proof-uploads': 'Proof Uploads',
    reports: 'Reports',
    'project-brief': 'Project Brief',
    requests: 'Requests',
    files: 'Files',
    appointment: 'Appointment',
    quote: 'Quote',
    media: 'Media Library',
    analytics: 'Analytics',
    billing: 'Billing',
    settings: 'Settings',
    branding: 'Branding',
  }[page] || 'Dashboard';

  return (
    <ClientShell>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
        <div>
          <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>{tenant?.plan || 'Active'}</p>
          <h1 className="text-4xl md:text-5xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{pageTitle}</h1>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
            Signed in as {user?.email}. Your records are ready to manage here.
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-xl p-4 mb-6 text-sm" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
          {error}
        </div>
      )}

      {page === 'dashboard' && <StatGrid stats={stats} loading={loading} />}

      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-5">
        <SystemPageContent
          systemType={systemType}
          page={page}
          tenant={tenant}
          tenantId={tenantId}
          products={products}
          orders={orders}
          customers={customers}
          setProducts={setProducts}
        />
        <BusinessProfilePanel tenant={tenant} />
      </div>
    </ClientShell>
  );
}
