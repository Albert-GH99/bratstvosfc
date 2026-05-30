import { ArrowLeft } from 'lucide-react';

export default function TenantNotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <div className="max-w-xl w-full text-center">
        <div className="mx-auto mb-6 h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
          <ArrowLeft size={22} />
        </div>
        <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>
          This link is not available.
        </h1>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>
          The page may be inactive, moved or not ready yet.
        </p>
        <button
          type="button"
          onClick={() => window.history.back()}
          className="rounded-xl px-5 py-3 text-sm font-black"
          style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}
        >
          Go back
        </button>
        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          If this should be your website, please contact support.
        </p>
      </div>
    </div>
  );
}
