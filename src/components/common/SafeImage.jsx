import { Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

const fallbackLabels = {
  product: 'Product image',
  food: 'Food image',
  trip: 'Trip image',
  service: 'Service image',
  logo: 'Logo',
  banner: 'Banner',
  staff: 'Staff photo',
  proof: 'Proof photo',
  default: 'Image',
};

const fallbackStyles = {
  product: 'linear-gradient(135deg, rgba(24,217,138,.20), rgba(59,130,246,.10))',
  food: 'linear-gradient(135deg, rgba(245,158,11,.20), rgba(24,217,138,.12))',
  trip: 'linear-gradient(135deg, rgba(14,165,233,.20), rgba(24,217,138,.12))',
  service: 'linear-gradient(135deg, rgba(168,85,247,.16), rgba(24,217,138,.12))',
  logo: 'linear-gradient(135deg, rgba(24,217,138,.24), rgba(255,255,255,.08))',
  banner: 'linear-gradient(135deg, rgba(24,217,138,.18), rgba(15,23,42,.18))',
  staff: 'linear-gradient(135deg, rgba(59,130,246,.18), rgba(24,217,138,.12))',
  proof: 'linear-gradient(135deg, rgba(245,158,11,.18), rgba(239,68,68,.10))',
  default: 'linear-gradient(135deg, var(--c-primary-soft), var(--c-input-bg))',
};

export default function SafeImage({
  src,
  alt = '',
  fallbackType = 'default',
  fallbackLabel = '',
  className = '',
}) {
  const [failed, setFailed] = useState(false);
  const type = fallbackStyles[fallbackType] ? fallbackType : 'default';
  const label = fallbackLabel || fallbackLabels[type] || fallbackLabels.default;

  if (src && !failed) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <div
      className={`flex h-full w-full flex-col items-center justify-center gap-2 ${className}`}
      style={{ background: fallbackStyles[type], color: 'var(--c-muted)' }}
      role="img"
      aria-label={label}
    >
      <ImageIcon size={22} />
      <span className="px-3 text-center text-[11px] font-black">{label}</span>
    </div>
  );
}
