import { AlertTriangle } from 'lucide-react';
import { BRATSTVO_DOMAIN } from '@/lib/appConfig';

export default function TenantNotFound({ hostname, error }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6" style={{ background: 'var(--c-page-bg)', color: 'var(--c-text)' }}>
      <div className="premium-card max-w-xl w-full p-7 md:p-9">
        <div className="mb-6 h-12 w-12 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--c-accent)' }}>
          <AlertTriangle size={22} />
        </div>
        <p className="text-xs font-black uppercase tracking-widest mb-3" style={{ color: 'var(--c-accent)' }}>Tenant not found</p>
        <h1 className="text-3xl md:text-4xl font-black mb-4" style={{ color: 'var(--c-text)' }}>
          This workspace is not active.
        </h1>
        <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--c-muted)' }}>
          We could not find an active tenant for {hostname || `this ${BRATSTVO_DOMAIN} subdomain`}. Please check the link from your onboarding email or contact Bratstvo Digital support.
        </p>
        {error && (
          <p className="rounded-xl px-4 py-3 text-sm" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
