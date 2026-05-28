export default function GradientBackground({ children, className = '' }) {
  return (
    <div className={`relative ${className}`.trim()}>
      {children}
    </div>
  );
}
