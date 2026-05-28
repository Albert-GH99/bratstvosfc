import { Loader2 } from 'lucide-react';

export default function TenantLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <div className="premium-card max-w-sm w-full p-7 text-center">
        <div className="mx-auto mb-5 h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
          <Loader2 size={22} className="animate-spin" />
        </div>
        <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: 'var(--c-accent)' }}>Loading workspace</p>
        <h1 className="text-2xl font-black mb-2" style={{ color: 'var(--c-text)' }}>Finding tenant</h1>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
          Preparing the right Bratstvo Digital workspace for this hostname.
        </p>
      </div>
    </div>
  );
}
