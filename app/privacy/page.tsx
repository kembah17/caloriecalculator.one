import AdSlot from "@/components/ui/AdSlot";

export const metadata = {
  title: "Privacy Policy | CalorieCalculator.one",
  description: "Privacy policy for CalorieCalculator.one. All calculations run client-side. We never collect or store your personal health data.",
  alternates: { canonical: "https://caloriecalculator.one/privacy" },
  openGraph: {
    title: "Privacy Policy | CalorieCalculator.one",
    description: "Privacy policy for CalorieCalculator.one. All calculations run client-side.",
    url: "https://caloriecalculator.one/privacy",
    siteName: "CalorieCalculator.one",
    type: "website",
  },
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", marginBottom: "1rem" }}>
        Privacy Policy
      </h1>

      <AdSlot slot="leaderboard" />

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "0.5rem", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Last updated: April 2026</p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Overview</h2>
          <p style={{ marginBottom: "1rem" }}>
            CalorieCalculator.one (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we handle information when you use our website and nutrition calculator tools.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Client-Side Processing</h2>
          <p style={{ marginBottom: "1rem" }}>
            All calculations on CalorieCalculator.one are performed entirely in your web browser using JavaScript. Your personal data &mdash; including age, weight, height, body fat percentage, and any other inputs &mdash; never leaves your device. We do not collect, transmit, or store any health-related information you enter into our calculators.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Information We Collect</h2>
          <p style={{ marginBottom: "0.5rem" }}>We may collect limited, non-personal information through:</p>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li style={{ marginBottom: "0.5rem" }}><strong>Analytics:</strong> We may use privacy-respecting analytics to understand general usage patterns such as page views, device types, and geographic regions. This data is aggregated and cannot identify individual users.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Cookies:</strong> We may use essential cookies for site functionality (such as dark/light mode preference) and third-party cookies from advertising partners. You can control cookie preferences through your browser settings.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Advertising:</strong> We display advertisements to support our free service. Ad networks may use cookies and similar technologies to serve relevant ads. These third parties have their own privacy policies.</li>
          </ul>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Data Storage</h2>
          <p style={{ marginBottom: "1rem" }}>
            We do not maintain user accounts or databases containing personal information. Any preferences (such as theme settings) are stored locally in your browser using localStorage and are never transmitted to our servers.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Third-Party Services</h2>
          <p style={{ marginBottom: "1rem" }}>
            Our website may include third-party advertising and analytics services. These services may collect information about your browsing activity across websites. We encourage you to review the privacy policies of these third-party services.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Children&apos;s Privacy</h2>
          <p style={{ marginBottom: "1rem" }}>
            Our tools are intended for general audiences. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Changes to This Policy</h2>
          <p style={{ marginBottom: "1rem" }}>
            We may update this privacy policy from time to time. Changes will be posted on this page with an updated revision date. Your continued use of the site after changes constitutes acceptance of the updated policy.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us through our website.
          </p>
        </div>
      </div>

      <AdSlot slot="footer" />
    </div>
  );
}
