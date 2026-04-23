import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-footer-bg)",
        color: "var(--color-footer-text)",
        marginTop: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "2rem 1rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <div>
            <h3
              style={{
                fontWeight: 700,
                fontSize: "1.125rem",
                color: "var(--color-footer-text)",
                marginBottom: "0.75rem",
              }}
            >
              CalorieCalculator.one
            </h3>
            <p style={{ color: "var(--color-footer-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
              Free online calorie and nutrition calculators. Calculate your daily calorie needs, TDEE, BMR, and macronutrient targets.
            </p>
          </div>
          <div>
            <h4
              style={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "var(--color-footer-text)",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Calculators
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link href="/calorie-calculator" style={{ color: "var(--color-footer-muted)", fontSize: "0.875rem", textDecoration: "none" }}>Calorie Calculator</Link>
              <Link href="/tdee-calculator" style={{ color: "var(--color-footer-muted)", fontSize: "0.875rem", textDecoration: "none" }}>TDEE Calculator</Link>
              <Link href="/bmr-calculator" style={{ color: "var(--color-footer-muted)", fontSize: "0.875rem", textDecoration: "none" }}>BMR Calculator</Link>
              <Link href="/macro-calculator" style={{ color: "var(--color-footer-muted)", fontSize: "0.875rem", textDecoration: "none" }}>Macro Calculator</Link>
            </div>
          </div>
          <div>
            <h4
              style={{
                fontWeight: 600,
                fontSize: "0.875rem",
                color: "var(--color-footer-text)",
                marginBottom: "0.75rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Company
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <Link href="/about" style={{ color: "var(--color-footer-muted)", fontSize: "0.875rem", textDecoration: "none" }}>About</Link>
              <Link href="/privacy" style={{ color: "var(--color-footer-muted)", fontSize: "0.875rem", textDecoration: "none" }}>Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div
          style={{
            borderTop: "1px solid var(--color-footer-border)",
            paddingTop: "1.5rem",
            textAlign: "center",
            color: "var(--color-footer-muted)",
            fontSize: "0.8125rem",
          }}
        >
          © {new Date().getFullYear()} CalorieCalculator.one. All rights reserved. For informational purposes only.
        </div>
      </div>
    </footer>
  );
}
