import { motion, useReducedMotion } from 'framer-motion';
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  PenTool,
  PhoneCall,
  Route,
  ShoppingBag,
  Truck,
  Utensils,
  UserRoundCheck,
} from 'lucide-react';

const themes = {
  ecommerce: {
    icon: ShoppingBag,
    title: 'Storefront',
    accent: '#18d98a',
    hero: 'Premium Set',
    rows: ['Baju Linen', 'Gift Box', 'Skincare Kit'],
    chips: ['Cart', 'Paid', 'Customer'],
  },
  booking: {
    icon: CalendarDays,
    title: 'Booking calendar',
    accent: '#7dd3fc',
    hero: 'Studio Slot',
    rows: ['10:00 AM', '12:30 PM', '3:00 PM'],
    chips: ['Deposit', 'Slot', 'Confirm'],
  },
  appointment: {
    icon: UserRoundCheck,
    title: 'Appointment desk',
    accent: '#c4b5fd',
    hero: 'Consultation',
    rows: ['Liyana R.', 'Jason Lee', 'Farah M.'],
    chips: ['Reminder', 'Profile', 'Hadir'],
  },
  food: {
    icon: Utensils,
    title: 'Kitchen queue',
    accent: '#fbbf24',
    hero: 'Nasi Lemak Set',
    rows: ['Preparing', 'Ready pickup', 'Delivery'],
    chips: ['Menu', 'Kitchen', 'Pickup'],
  },
  dispatch: {
    icon: Truck,
    title: 'Dispatch board',
    accent: '#fb7185',
    hero: 'Job #D144',
    rows: ['Runner Izzat', 'Runner Lee', 'Runner Harith'],
    chips: ['Route', 'Assigned', 'Done'],
  },
  custom: {
    icon: PenTool,
    title: 'Custom build',
    accent: '#60a5fa',
    hero: 'Brand website',
    rows: ['Homepage', 'CTA section', 'Workflow'],
    chips: ['Custom quote', 'Brand', 'Pages'],
  },
};

function LiveBadge({ label, accent, className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion ? {} : { y: [0, -4, 0], opacity: [0.88, 1, 0.88] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      className={`pointer-events-none rounded-full px-3 py-1 text-[10px] font-black shadow-lg ${className}`.trim()}
      style={{ background: accent, color: '#05120d' }}
    >
      {label}
    </motion.div>
  );
}

function MovingProgress({ accent }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-3 h-1.5 overflow-hidden rounded-full" style={{ background: 'var(--c-input-bg)' }}>
      <motion.span
        className="block h-full rounded-full"
        style={{ background: accent }}
        animate={reduceMotion ? {} : { width: ['42%', '78%', '58%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

function ProductTile({ label, active, accent }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      animate={reduceMotion || !active ? {} : { y: [0, -3, 0] }}
      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
      className="rounded-2xl p-3"
      style={{ background: active ? 'rgba(255,255,255,0.16)' : 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
    >
      <div className="mb-3 flex h-16 items-end justify-between rounded-xl p-2" style={{ background: `linear-gradient(135deg, ${accent}55, rgba(255,255,255,0.08))` }}>
        <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: 'rgba(255,255,255,0.18)', color: 'var(--c-text)' }}>
          <ShoppingBag size={15} />
        </span>
        <span className="rounded-full px-2 py-1 text-[10px] font-black" style={{ background: 'rgba(0,0,0,0.24)', color: '#fff' }}>
          RM{active ? '189' : '86'}
        </span>
      </div>
      <p className="truncate text-[11px] font-black" style={{ color: 'var(--c-text)' }}>{label}</p>
      <p className="mt-1 text-[10px]" style={{ color: 'var(--c-muted)' }}>{active ? 'Best seller' : 'In stock'}</p>
    </motion.div>
  );
}

function EcommerceVisual({ theme }) {
  return (
    <div className="relative grid grid-cols-[1.05fr_0.95fr] gap-3">
      <LiveBadge label="Added to cart" accent={theme.accent} className="absolute -right-1 -top-3 z-10" />
      <div className="grid grid-cols-2 gap-3">
        {theme.rows.slice(0, 2).map((row, index) => <ProductTile key={row} label={row} active={index === 0} accent={theme.accent} />)}
      </div>
      <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>Cart summary</p>
        <div className="mt-3 space-y-2">
          {['2 items', 'Delivery', 'RM240'].map(item => (
            <div key={item} className="flex justify-between rounded-xl px-3 py-2 text-[11px]" style={{ background: 'var(--c-input-bg)', color: 'var(--c-muted)' }}>
              <span>{item}</span>
              <CheckCircle2 size={13} style={{ color: 'var(--c-accent)' }} />
            </div>
          ))}
        </div>
        <MovingProgress accent={theme.accent} />
      </div>
    </div>
  );
}

function BookingVisual({ theme }) {
  const activeSlots = {
    3: 'Full',
    9: 'Deposit',
    15: 'Open',
  };

  return (
    <div className="relative grid grid-cols-[0.92fr_1.08fr] gap-3">
      <LiveBadge label="Participant added" accent={theme.accent} className="absolute -right-1 -top-3 z-10" />
      <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>May 2026</p>
          <span className="rounded-full px-2 py-1 text-[10px] font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>12 slots</span>
        </div>
        <div className="mb-2 grid grid-cols-7 gap-1 text-center">
          {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => (
            <span key={`${day}-${index}`} className="text-[9px] font-black" style={{ color: 'var(--c-muted)' }}>{day}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: 21 }).map((_, index) => (
            <span
              key={index}
              className="flex h-8 flex-col items-center justify-center rounded-md text-[9px] font-black"
              style={{
                background: activeSlots[index] ? theme.accent : 'var(--c-input-bg)',
                color: activeSlots[index] ? '#05120d' : 'var(--c-muted)',
                opacity: activeSlots[index] ? 0.92 : 1,
              }}
            >
              <span>{index + 1}</span>
              {activeSlots[index] && <span className="text-[7px] leading-none">{activeSlots[index]}</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="space-y-2">
        {theme.rows.map((row, index) => (
          <div key={row} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <Clock3 size={15} style={{ color: index === 1 ? theme.accent : 'var(--c-muted)' }} />
            <div>
              <p className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{row}</p>
              <p className="text-[10px]" style={{ color: 'var(--c-muted)' }}>{index === 1 ? 'Deposit paid' : 'Available slot'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppointmentVisual({ theme }) {
  return (
    <div className="relative grid grid-cols-[0.9fr_1.1fr] gap-3">
      <LiveBadge label="2:30 PM selected" accent={theme.accent} className="absolute -right-1 -top-3 z-10" />
      <div className="rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div className="grid h-16 w-16 place-items-center rounded-2xl text-lg font-black" style={{ background: `${theme.accent}30`, color: 'var(--c-text)' }}>LR</div>
        <p className="mt-4 text-sm font-black" style={{ color: 'var(--c-text)' }}>Liyana Razak</p>
        <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>Treatment - 2:30 PM</p>
      </div>
      <div className="space-y-2">
        {['Reminder sent', 'Deposit received', 'Hadir'].map((row, index) => (
          <div key={row} className="flex items-center gap-3 rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: index === 2 ? 'var(--c-accent)' : theme.accent }} />
            <span className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{row}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function FoodVisual({ theme }) {
  return (
    <div className="relative grid grid-cols-[0.92fr_1.08fr] gap-3">
      <LiveBadge label="Kitchen updated" accent={theme.accent} className="absolute -right-1 -top-3 z-10" />
      <div className="rounded-2xl p-4" style={{ background: `linear-gradient(135deg, ${theme.accent}33, var(--c-surface))`, border: '1px solid var(--c-border)' }}>
        <Utensils size={22} style={{ color: theme.accent }} />
        <p className="mt-4 text-sm font-black" style={{ color: 'var(--c-text)' }}>{theme.hero}</p>
        <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>2 pax - spicy normal</p>
      </div>
      <div className="space-y-2">
        {theme.rows.map((row, index) => (
          <div key={row} className="flex items-center justify-between rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <span className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{row}</span>
            <span className="rounded-full px-2 py-1 text-[10px] font-black" style={{ background: index === 1 ? `${theme.accent}33` : 'var(--c-surface)', color: 'var(--c-text)' }}>{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DispatchVisual({ theme }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative grid grid-cols-[1.1fr_0.9fr] gap-3">
      <LiveBadge label="Runner assigned" accent={theme.accent} className="absolute -right-1 -top-3 z-10" />
      <div className="relative min-h-[150px] overflow-hidden rounded-2xl p-4" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <Route size={20} style={{ color: theme.accent }} />
        <div className="absolute left-8 top-14 h-16 w-[72%] rounded-full border-2 border-dashed" style={{ borderColor: `${theme.accent}88` }} />
        <span className="absolute left-8 top-16 h-3 w-3 rounded-full" style={{ background: 'var(--c-accent)' }} />
        <motion.span
          className="absolute left-8 top-16 h-3 w-3 rounded-full"
          style={{ background: theme.accent }}
          animate={reduceMotion ? {} : { x: [0, 128, 96], y: [0, 46, 22] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <span className="absolute right-12 bottom-10 h-3 w-3 rounded-full" style={{ background: theme.accent }} />
        <p className="absolute bottom-4 left-4 text-xs font-black" style={{ color: 'var(--c-text)' }}>Route assigned</p>
        <p className="absolute right-4 top-4 rounded-full px-2 py-1 text-[10px] font-black" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>3.2 km</p>
      </div>
      <div className="space-y-2">
        {theme.rows.map(row => (
          <div key={row} className="flex items-center gap-2 rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
            <MapPin size={14} style={{ color: theme.accent }} />
            <span className="text-xs font-black" style={{ color: 'var(--c-text)' }}>{row}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomVisual({ theme }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative grid gap-3">
      <LiveBadge label="Consult request sent" accent={theme.accent} className="absolute -right-1 -top-3 z-10" />
      <div className="overflow-hidden rounded-2xl" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)' }}>
        <div className="flex items-center justify-between gap-3 px-4 py-3" style={{ borderBottom: '1px solid var(--c-border)' }}>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6b6b]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffd166]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#18d98a]" />
          </div>
          <span className="truncate rounded-full px-3 py-1 text-[10px] font-black" style={{ background: 'var(--c-input-bg)', color: 'var(--c-muted)' }}>
            www.brandanda.com
          </span>
        </div>
        <div className="p-4">
          <div className="rounded-2xl p-4" style={{ background: `linear-gradient(135deg, ${theme.accent}33, rgba(255,255,255,0.08))`, border: '1px solid var(--c-border)' }}>
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-black" style={{ color: 'var(--c-text)' }}>Premium service website</span>
              <PhoneCall size={15} style={{ color: theme.accent }} />
            </div>
            <p className="max-w-[190px] text-lg font-black leading-tight" style={{ color: 'var(--c-text)' }}>Grow your brand with a sharper online presence.</p>
            <button type="button" className="mt-4 rounded-full px-3 py-2 text-[10px] font-black" style={{ background: theme.accent, color: '#05120d' }}>
              Book consult
            </button>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ['Brand story', 'Trust'],
              ['Lead form', 'Enquiry'],
              ['WhatsApp CTA', 'Fast reply'],
            ].map(([title, sub], index) => (
              <motion.div
                key={title}
                animate={reduceMotion ? {} : { y: [0, index === 1 ? -4 : -2, 0] }}
                transition={{ duration: 2.4 + index * 0.25, repeat: Infinity, ease: 'easeInOut' }}
                className="rounded-xl p-2"
                style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}
              >
                <p className="truncate text-[10px] font-black" style={{ color: 'var(--c-text)' }}>{title}</p>
                <p className="mt-1 truncate text-[9px]" style={{ color: 'var(--c-muted)' }}>{sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualBody({ type, theme }) {
  if (type === 'booking') return <BookingVisual theme={theme} />;
  if (type === 'appointment') return <AppointmentVisual theme={theme} />;
  if (type === 'food') return <FoodVisual theme={theme} />;
  if (type === 'dispatch') return <DispatchVisual theme={theme} />;
  if (type === 'custom') return <CustomVisual theme={theme} />;
  return <EcommerceVisual theme={theme} />;
}

export default function SystemShowcaseVisual({ type = 'ecommerce', label = 'Business', compact = false, className = '' }) {
  const theme = themes[type] || themes.ecommerce;
  const Icon = theme.icon;
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42 }}
      className={`system-showcase-visual relative overflow-hidden rounded-[24px] p-3 md:p-4 ${compact ? 'min-h-[190px] max-h-[220px] md:min-h-[230px] md:max-h-none' : 'min-h-[250px] max-h-[280px] md:min-h-[320px] md:max-h-none'} ${className}`.trim()}
      style={{
        background: `radial-gradient(circle at 18% 0%, ${theme.accent}30, transparent 38%), linear-gradient(145deg, var(--c-bg-soft), var(--c-surface-strong))`,
        border: '1px solid var(--c-border)',
        boxShadow: compact ? 'none' : 'var(--c-card-shadow)',
      }}
    >
      <motion.div
        animate={reduceMotion ? {} : { opacity: [0.55, 0.9, 0.55] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-0 top-0 h-28 w-28 rounded-full blur-3xl"
        style={{ background: theme.accent, opacity: 0.2 }}
      />
      <div className="relative mb-3 flex items-center justify-between gap-3 md:mb-4">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: `${theme.accent}24`, color: theme.accent, border: '1px solid var(--c-border)' }}>
            <Icon size={20} />
          </span>
          <div>
            <p className="text-sm font-black" style={{ color: 'var(--c-text)' }}>{theme.title}</p>
            <p className="text-[11px]" style={{ color: 'var(--c-muted)' }}>{theme.hero}</p>
          </div>
        </div>
        <span className="rounded-full px-3 py-1 text-[11px] font-black" style={{ background: 'var(--c-surface)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
          {label}
        </span>
      </div>

      <VisualBody type={type} theme={theme} />

      <div className="relative mt-4 hidden flex-wrap gap-2 sm:flex">
        {theme.chips.map(chip => (
          <span key={chip} className="rounded-full px-3 py-1 text-[11px] font-black" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
            {chip}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
