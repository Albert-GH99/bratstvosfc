import { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';
import { extendDemoSession, startDemoSession } from './demoStorage';

const copy = {
  en: {
    badge: 'Demo',
    title: 'Need more time to explore?',
    body: 'Your demo time has ended. Add more time or return to Systems.',
    extend: 'Ya, tambah 1 jam',
    leave: 'Tidak, kembali ke Systems',
  },
  my: {
    badge: 'Demo',
    title: 'Masih perlukan masa untuk survey?',
    body: 'Masa demo sudah tamat. Tambah masa atau kembali ke Sistem.',
    extend: 'Ya, tambah 1 jam',
    leave: 'Tidak, kembali ke Sistem',
  },
};

function formatTime(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export default function DemoTimer({ lang = 'en', onLeave }) {
  const t = copy[lang] || copy.en;
  const [endTime, setEndTime] = useState(() => startDemoSession());
  const [timeLeft, setTimeLeft] = useState(() => endTime - Date.now());
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const remaining = endTime - Date.now();
      setTimeLeft(remaining);
      if (remaining <= 0) setExpired(true);
    };

    tick();
    const interval = window.setInterval(tick, 1000);
    return () => window.clearInterval(interval);
  }, [endTime]);

  const extend = () => {
    const nextEndTime = extendDemoSession();
    setEndTime(nextEndTime);
    setTimeLeft(nextEndTime - Date.now());
    setExpired(false);
  };

  return (
    <>
      <div className="rounded-full px-4 py-2 text-xs font-black inline-flex items-center gap-2" style={{ background: 'var(--c-accent-muted)', color: 'var(--c-accent)', border: '1px solid var(--c-border)' }}>
        <Timer size={14} /> {t.badge}: {formatTime(timeLeft)}
      </div>

      {expired && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4" style={{ background: 'rgba(5, 9, 13, 0.78)', backdropFilter: 'blur(12px)' }}>
          <div className="max-w-md w-full rounded-2xl p-6" style={{ background: 'var(--c-bg)', border: '1px solid var(--c-border)' }}>
            <Timer size={24} className="mb-4" style={{ color: 'var(--c-accent)' }} />
            <h2 className="text-2xl font-black mb-3" style={{ color: 'var(--c-text)' }}>{t.title}</h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--c-muted)' }}>{t.body}</p>
            <div className="grid gap-3">
              <button onClick={extend} className="rounded-xl py-3 text-sm font-black" style={{ background: 'var(--c-accent)', color: 'var(--c-accent-contrast)' }}>{t.extend}</button>
              <button onClick={onLeave} className="rounded-xl py-3 text-sm font-black" style={{ color: 'var(--c-text)', border: '1px solid var(--c-border)' }}>{t.leave}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
