export function Button({ children, ...props }) {
  return (
    <button {...props} style={{ padding: "10px 16px", borderRadius: "8px" }}>
      {children}
    </button>
  );
}