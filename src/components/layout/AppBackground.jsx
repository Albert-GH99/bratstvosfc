export default function AppBackground({ children }) {
  return (
    <div className="app-background-root relative min-h-screen">
      <div aria-hidden="true" className="app-background-base fixed inset-0 z-0" />
      <div
        aria-hidden="true"
        className="app-background-texture fixed inset-0 z-0"
        style={{ backgroundImage: "url('/Dark Green Background.png')" }}
      />
      <div aria-hidden="true" className="app-background-overlay fixed inset-0 z-0" />
      <div aria-hidden="true" className="app-background-glow fixed inset-0 z-0" />
      <div aria-hidden="true" className="app-background-grid fixed inset-0 z-0" />
      <div className="relative z-10 min-h-screen">{children}</div>
    </div>
  );
}
