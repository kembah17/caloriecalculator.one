import AdSlot from "@/components/ui/AdSlot";

export const metadata = {
  title: "About CalorieCalculator.one | Free Nutrition Calculators",
  description: "Learn about CalorieCalculator.one — free, privacy-first calorie, TDEE, BMR, and macro calculators powered by scientifically validated formulas.",
  alternates: { canonical: "https://caloriecalculator.one/about" },
  openGraph: {
    title: "About CalorieCalculator.one | Free Nutrition Calculators",
    description: "Free, privacy-first calorie and nutrition calculators powered by scientifically validated formulas.",
    url: "https://caloriecalculator.one/about",
    siteName: "CalorieCalculator.one",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", marginBottom: "1rem" }}>
        About CalorieCalculator.one
      </h1>

      <AdSlot slot="leaderboard" />

      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
          <p style={{ marginBottom: "1rem" }}>
            CalorieCalculator.one provides free, scientifically accurate nutrition calculators to help you understand your body&apos;s energy needs. Our tools use peer-reviewed formulas including the Mifflin-St Jeor equation, Harris-Benedict equation, and Katch-McArdle formula to deliver reliable estimates for calorie needs, metabolic rate, and macronutrient targets.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Our Mission</h2>
          <p style={{ marginBottom: "1rem" }}>
            We believe everyone deserves access to quality nutrition tools without barriers. Our calculators are completely free, require no registration, and work entirely in your browser. No data is ever sent to our servers &mdash; your personal health information stays on your device.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Our Tools</h2>
          <ul style={{ paddingLeft: "1.5rem", marginBottom: "1rem" }}>
            <li style={{ marginBottom: "0.5rem" }}><strong>Calorie Calculator</strong> &mdash; Calculate daily calorie needs based on your age, gender, height, weight, activity level, and weight goals using the Mifflin-St Jeor equation.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>TDEE Calculator</strong> &mdash; Find your Total Daily Energy Expenditure across all activity levels with side-by-side formula comparisons.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>BMR Calculator</strong> &mdash; Determine your Basal Metabolic Rate using three scientifically validated formulas for the most accurate estimate.</li>
            <li style={{ marginBottom: "0.5rem" }}><strong>Macro Calculator</strong> &mdash; Calculate protein, carbohydrate, and fat targets with preset diet plans and custom ratio options.</li>
          </ul>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Scientific Accuracy</h2>
          <p style={{ marginBottom: "1rem" }}>
            All calculations are based on peer-reviewed research. The Mifflin-St Jeor equation (1990) is recommended by the Academy of Nutrition and Dietetics as the most accurate BMR prediction equation for the general population. The Harris-Benedict equation (revised 1984) and Katch-McArdle formula provide additional reference points for comparison.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Privacy First</h2>
          <p style={{ marginBottom: "1rem" }}>
            All calculations run 100% in your browser using JavaScript. We never collect, store, or transmit your personal health data. There are no accounts to create, no data to sync, and no information shared with third parties. Your privacy is not just a feature &mdash; it&apos;s our foundation.
          </p>

          <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "0.75rem", marginTop: "1.5rem" }}>Important Disclaimer</h2>
          <p>
            Our calculators provide estimates based on population-level research formulas. Individual results may vary based on genetics, medical conditions, medications, and other factors. These tools are for informational purposes only and should not replace professional medical or nutritional advice. Always consult a healthcare professional or registered dietitian before making significant changes to your diet or exercise routine.
          </p>
        </div>
      </div>

      <AdSlot slot="footer" />
    </div>
  );
}
