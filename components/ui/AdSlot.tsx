export default function AdSlot({ slot }: { slot: string }) {
  return (
    <div className="ad-slot" data-ad-slot={slot} style={{ margin: "1.5rem 0" }}>
      <div
        style={{
          backgroundColor: "var(--color-surface-alt)",
          border: "1px dashed var(--color-border)",
          borderRadius: "var(--radius-lg)",
          padding: "1rem",
          textAlign: "center",
          fontSize: "0.875rem",
          color: "var(--color-text-muted)",
        }}
      >
        Advertisement
      </div>
    </div>
  );
}
