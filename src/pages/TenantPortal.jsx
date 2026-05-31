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
import { useTenant } from '@/contexts/TenantContext';
import { signOutClient } from '@/services/authService';
import SafeImage from '@/components/common/SafeImage';
import ImageUploader from '@/components/uploads/ImageUploader';
import { deleteTenantImage } from '@/services/storageService';
import {
  createTenantMediaRecord,
  deleteTenantMediaRecord,
  listTenantCustomers,
  listTenantMedia,
  listTenantOrders,
  listTenantProducts,
  updateTenantBrandingAsset,
  updateTenantProductImage,
} from '@/services/tenantDataService';

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

function getTenantPublicPreset(systemType, businessName) {
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

function TenantShell({ children }) {
  const { tenant } = useTenant();
  const { setUser } = useAuth();
  const location = useLocation();

  const nav = [
    ['Dashboard', '/dashboard', LayoutDashboard],
    ['Orders', '/orders', ShoppingBag],
    ['Products', '/products', Package],
    ['Customers', '/customers', Users],
    ['Media', '/media', ImageIcon],
    ['Analytics', '/analytics', BarChart3],
    ['Billing', '/billing', CreditCard],
    ['Branding', '/branding', Palette],
    ['Settings', '/settings', Settings],
  ];

  const logout = async () => {
    await signOutClient();
    setUser(null);
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <header className="sticky top-0 z-40" style={{ background: 'var(--c-nav)', borderBottom: '1px solid var(--c-border)', backdropFilter: 'blur(14px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/dashboard" className="flex items-center gap-3 min-w-0">
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

export function TenantPublicSite() {
  const { tenant, tenantId } = useTenant();
  const branding = tenant?.branding || {};
  const settings = tenant?.settings || {};
  const systemType = normalizeSystemType(tenant?.systemType);
  const businessName = tenant?.businessName || 'Your business';
  const preset = getTenantPublicPreset(tenant?.systemType, businessName);
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
        const rows = await listTenantProducts(tenantId);
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
    const updated = await updateTenantProductImage(tenantId, product.id, image);
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
    await updateTenantBrandingAsset(tenantId, image, type);
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
      setMedia(await listTenantMedia(tenantId, category));
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
    await createTenantMediaRecord(tenantId, image, uploadCategory);
    setMessage('Image saved in the media library.');
    await loadMedia();
  };

  const removeMedia = async item => {
    setMessage('');
    if (item.file_path) await deleteTenantImage(item.file_path);
    await deleteTenantMediaRecord(tenantId, item.id);
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

export function TenantWorkspacePage({ page = 'dashboard' }) {
  const { tenant, tenantId } = useTenant();
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    async function loadTenantData() {
      if (!tenantId) return;
      setLoading(true);
      setError('');

      try {
        const [productRows, orderRows, customerRows] = await Promise.all([
          listTenantProducts(tenantId),
          listTenantOrders(tenantId),
          listTenantCustomers(tenantId),
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

    loadTenantData();

    return () => {
      active = false;
    };
  }, [tenantId]);

  const stats = useMemo(() => {
    const revenue = orders.reduce((sum, order) => sum + Number(order.total_amount || 0), 0);
    return [
      ['Orders', orders.length, ShoppingBag],
      ['Products', products.length, Package],
      ['Customers', customers.length, Users],
      ['Revenue', formatMoney(revenue), BarChart3],
    ];
  }, [customers.length, orders, products.length]);

  const pageTitle = {
    dashboard: 'Dashboard',
    orders: 'Orders',
    products: 'Products',
    customers: 'Customers',
    media: 'Media Library',
    analytics: 'Analytics',
    billing: 'Billing',
    settings: 'Settings',
    branding: 'Branding',
    payments: 'Payments',
  }[page] || 'Dashboard';

  return (
    <TenantShell>
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

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {stats.map(([label, value, Icon]) => (
          <div key={label} className="rounded-xl p-5" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
            <Icon size={20} className="mb-4" style={{ color: 'var(--c-accent)' }} />
            <p className="text-xs font-bold mb-2" style={{ color: 'var(--c-muted)' }}>{label}</p>
            <p className="text-2xl font-black" style={{ color: 'var(--c-text)' }}>{loading ? '-' : value}</p>
          </div>
        ))}
      </div>

      {page === 'branding' && <BrandingMediaPanel tenant={tenant} tenantId={tenantId} />}
      {page === 'media' && <MediaLibraryPanel tenantId={tenantId} />}
      {page === 'products' && (
        <ProductImagePanel
          tenantId={tenantId}
          products={products}
          onProductUpdated={updatedProduct => setProducts(current => current.map(item => (item.id === updatedProduct.id ? updatedProduct : item)))}
        />
      )}

      {page !== 'media' && page !== 'branding' && (
      <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-5">
        <section className="rounded-xl overflow-hidden" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
          <div className="p-5" style={{ borderBottom: '1px solid var(--c-border-subtle)' }}>
            <h2 className="font-black" style={{ color: 'var(--c-text)' }}>{pageTitle} records</h2>
            <p className="text-xs mt-1" style={{ color: 'var(--c-muted)' }}>Recent records for this business.</p>
          </div>
          <div className="p-5 space-y-3">
            {(page === 'orders' || page === 'dashboard' || page === 'payments' ? orders : page === 'customers' ? customers : products).slice(0, 8).map(item => (
              <div key={item.id} className="rounded-xl p-4 flex items-center justify-between gap-4" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                <div className="flex min-w-0 items-center gap-3">
                  {page === 'products' && (
                    <span className="h-12 w-12 shrink-0 overflow-hidden rounded-xl" style={{ border: '1px solid var(--c-border)' }}>
                      <SafeImage src={item.image_url} fallbackType="product" className="h-full w-full object-cover" />
                    </span>
                  )}
                  <div className="min-w-0">
                    <p className="font-black truncate" style={{ color: 'var(--c-text)' }}>{item.name || item.customer_name || item.email || item.id}</p>
                    <p className="text-xs truncate" style={{ color: 'var(--c-muted)' }}>{item.status || item.customer_phone || item.created_at || 'Active'}</p>
                  </div>
                </div>
                {'total_amount' in item && <p className="font-black" style={{ color: 'var(--c-accent)' }}>{formatMoney(item.total_amount)}</p>}
                {'price' in item && <p className="font-black" style={{ color: 'var(--c-accent)' }}>{formatMoney(item.price)}</p>}
              </div>
            ))}
            {!loading && !error && orders.length + products.length + customers.length === 0 && (
              <p className="text-sm" style={{ color: 'var(--c-muted)' }}>No records yet.</p>
            )}
            {loading && <p className="text-sm" style={{ color: 'var(--c-muted)' }}>Loading records...</p>}
          </div>
        </section>

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
      </div>
      )}
    </TenantShell>
  );
}
