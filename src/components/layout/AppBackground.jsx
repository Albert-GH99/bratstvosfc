export default function AppBackground({ children }) {
  return (
    <div className="app-background-root relative min-h-screen">
      <div aria-hidden="true" className="app-background-base pointer-events-none fixed inset-0 z-0" />
      <div
        aria-hidden="true"
        className="app-background-texture pointer-events-none fixed inset-0 z-0"
        style={{ backgroundImage: "url('/Dark Green Background.png')" }}
      />
      <div aria-hidden="true" className="app-background-overlay pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="app-background-glow pointer-events-none fixed inset-0 z-0" />
      <div aria-hidden="true" className="app-background-grid pointer-events-none fixed inset-0 z-0" />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
