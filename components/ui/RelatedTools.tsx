import Link from "next/link";

interface Tool {
  name: string;
  href: string;
  description: string;
  icon: string;
}

const allTools: Tool[] = [
  { name: "Calorie Calculator", href: "/calorie-calculator", description: "Calculate daily calorie needs based on your goals", icon: "🔥" },
  { name: "TDEE Calculator", href: "/tdee-calculator", description: "Find your Total Daily Energy Expenditure", icon: "⚡" },
  { name: "BMR Calculator", href: "/bmr-calculator", description: "Calculate your Basal Metabolic Rate", icon: "💓" },
  { name: "Macro Calculator", href: "/macro-calculator", description: "Get your ideal macronutrient breakdown", icon: "🥗" },
];

export default function RelatedTools({ current }: { current: string }) {
  const related = allTools.filter((t) => t.href !== current);

  return (
    <div>
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--color-text)",
          marginBottom: "1rem",
        }}
      >
        Related Calculators
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1rem",
        }}
      >
        {related.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            style={{
              display: "block",
              padding: "1.25rem",
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-sm)",
              textDecoration: "none",
              transition: "box-shadow 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-md)";
              e.currentTarget.style.borderColor = "var(--color-primary)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "var(--shadow-sm)";
              e.currentTarget.style.borderColor = "var(--color-border)";
            }}
          >
            <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{tool.icon}</div>
            <h3 style={{ fontWeight: 600, color: "var(--color-text)", marginBottom: "0.25rem" }}>
              {tool.name}
            </h3>
            <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>
              {tool.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
