import { Loader2 } from 'lucide-react';

export default function TenantLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <div className="max-w-sm w-full text-center">
        <div className="mx-auto mb-5 h-14 w-14 rounded-2xl flex items-center justify-center" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
          <Loader2 size={24} className="animate-spin" />
        </div>
        <h1 className="text-2xl font-black mb-2" style={{ color: 'var(--c-text)' }}>Preparing your page...</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          Please wait a moment.
        </p>
      </div>
    </div>
  );
}
