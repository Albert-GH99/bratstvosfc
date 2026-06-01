import { ArrowLeft, CheckCircle2, Globe2, MailCheck, ServerCog, ShieldCheck } from 'lucide-react';
import GradientBackground from '@/components/premium/GradientBackground';
import PremiumCard from '@/components/premium/PremiumCard';
import PremiumButton from '@/components/premium/PremiumButton';

const adminSteps = [
  'Review setup request.',
  'Confirm package, system, domain and payment details.',
  'If custom domain is selected, confirm the selected extension price: .com/.net/.com.my RM125/year, .my RM179/year, .co RM229/year.',
  'If the domain checker returns manual_confirmation_required, confirm availability manually before purchase.',
  'Confirm final amount.',
  'Send official payment instruction.',
  'After payment, approve and start build.',
  'Client account is created.',
  'Client receives login email.',
  'If client uses Bratstvo path link, prepare bratstvosfc.com/clientslug.',
  'If client uses custom domain, configure domain DNS/hosting.',
];

const clientSteps = [
  'Submit setup request.',
  'Wait for review and official payment instruction.',
  'Make payment.',
  'Receive login email.',
  'Change password.',
  'Complete business profile.',
  'Add products, services, menu or booking details.',
  'Test customer view.',
  'Share website link.',
];

const resendUses = [
  'Transactional: setup request received, admin approval/onboarding, payment instruction, receipt confirmation and password reset.',
  'Marketing: broadcast promotions, monthly SME tips and new system launch updates.',
  'Automation: abandoned setup follow-up, demo user follow-up, onboarding day 1/day 3/day 7 and subscription renewal reminders.',
  'Webhooks: store delivered, bounced, opened or spam events in Supabase and show status in admin dashboard.',
];

function GuideList({ items }) {
  return (
    <ol className="grid gap-3">
      {items.map((item, index) => (
        <li key={item} className="flex gap-3 rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>
            {index + 1}
          </span>
          <span className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function InfoBlock({ icon: Icon, title, children }) {
  return (
    <PremiumCard className="p-5 md:p-6" hover={false}>
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-2xl" style={{ background: 'var(--c-primary-soft)', color: 'var(--c-accent)' }}>
          <Icon size={20} />
        </span>
        <h2 className="text-xl font-black" style={{ color: 'var(--c-text)' }}>{title}</h2>
      </div>
      {children}
    </PremiumCard>
  );
}

export default function AdminActivationGuide() {
  return (
    <GradientBackground className="page-shell">
      <main className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="premium-eyebrow mb-3">Internal admin guide</p>
              <h1 className="premium-section-title">Client activation, domain, payment and Resend guide.</h1>
              <p className="mt-4 text-sm leading-relaxed md:text-base" style={{ color: 'var(--c-muted)' }}>
                Use this page when reviewing setup requests. It keeps operational steps out of the public homepage while documenting what Bratstvo admin and the client need to do.
              </p>
            </div>
            <PremiumButton to="/master" variant="secondary" className="px-4 py-3 text-sm">
              <ArrowLeft size={16} /> Back to Master
            </PremiumButton>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <InfoBlock icon={ShieldCheck} title="Bratstvo admin flow">
              <GuideList items={adminSteps} />
            </InfoBlock>

            <InfoBlock icon={CheckCircle2} title="Client first-login flow">
              <GuideList items={clientSteps} />
            </InfoBlock>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
            <InfoBlock icon={Globe2} title="Client link and custom domain flow">
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                <p>Custom domain availability is checked through the Supabase Edge Function <strong style={{ color: 'var(--c-text)' }}>check-domain-availability</strong>, which calls Spaceship server-side with protected secrets. .my and .com.my can fall back to manual admin confirmation if the API does not support them.</p>
                <p>Create the client slug first. The default public link stays path-based on bratstvosfc.com.</p>
                <div className="rounded-2xl p-4 font-mono text-xs" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-text)' }}>
                  Public link: bratstvosfc.com/clientslug<br />
                  Dashboard: bratstvosfc.com/core/clientslug<br />
                  Custom domain: future/manual setup only
                </div>
                <p>After adding the custom domain in Netlify, wait for DNS propagation and SSL readiness before telling the client to share the live link.</p>
              </div>
            </InfoBlock>

            <InfoBlock icon={ServerCog} title="Supabase client activation">
              <div className="grid gap-3">
                {[
                  'Client row must include business_name, client slug/custom_domain, status, plan, system_type, branding and settings.',
                  'Only active clients should load on public client routes.',
                  'All client product/order/customer/settings queries must filter by the client business id.',
                  'Onboarding email should point to /login?next=/core/clientslug until custom domain login is manually configured.',
                ].map(item => (
                  <div key={item} className="flex gap-3 rounded-2xl p-3" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)' }}>
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0" style={{ color: 'var(--c-accent)' }} />
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>{item}</p>
                  </div>
                ))}
              </div>
            </InfoBlock>
          </div>

          <InfoBlock icon={MailCheck} title="Resend usage guide">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: 'var(--c-muted)' }}>
                <p><strong style={{ color: 'var(--c-text)' }}>Domains:</strong> verify bratstvosfc.com and keep SPF, DKIM and DMARC records correct.</p>
                <p><strong style={{ color: 'var(--c-text)' }}>API keys:</strong> used by Supabase Edge Functions to send transactional emails.</p>
                <p><strong style={{ color: 'var(--c-text)' }}>Emails:</strong> onboarding, password/setup info, payment confirmation and reset messages.</p>
                <p><strong style={{ color: 'var(--c-text)' }}>Logs:</strong> check sent, delivered, bounced and opened events if tracking is enabled.</p>
                <p><strong style={{ color: 'var(--c-text)' }}>Suppressions:</strong> avoid emailing contacts who unsubscribed, bounced or marked spam.</p>
              </div>
              <div className="grid gap-3">
                {resendUses.map(item => (
                  <div key={item} className="rounded-2xl p-3 text-sm leading-relaxed" style={{ background: 'var(--c-input-bg)', border: '1px solid var(--c-border)', color: 'var(--c-muted)' }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-5 rounded-2xl p-4 text-sm leading-relaxed" style={{ background: 'var(--c-primary-soft)', border: '1px solid rgba(24,217,138,.24)', color: 'var(--c-text)' }}>
              Use Broadcasts for newsletters/promotions only. Do not use Broadcasts for password, setup access or onboarding credentials. Use transactional Edge Function emails for those.
            </div>
          </InfoBlock>
        </div>
      </main>
    </GradientBackground>
  );
}
