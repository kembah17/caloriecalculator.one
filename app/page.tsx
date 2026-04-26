import Link from "next/link";
import HomeToolGrid from "@/components/ui/HomeToolGrid";
import AdSlot from "@/components/ui/AdSlot";
import WebSiteSchema from "@/components/seo/WebSiteSchema";

const tools = [
  {
    name: "Calorie Calculator",
    href: "/calorie-calculator",
    description: "Calculate your daily calorie needs based on age, gender, activity level, and weight goals using the Mifflin-St Jeor equation.",
    icon: "🔥",
  },
  {
    name: "TDEE Calculator",
    href: "/tdee-calculator",
    description: "Find your Total Daily Energy Expenditure across all activity levels. Compare Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas.",
    icon: "⚡",
  },
  {
    name: "BMR Calculator",
    href: "/bmr-calculator",
    description: "Calculate your Basal Metabolic Rate using three scientifically validated formulas. Understand your body's energy needs at rest.",
    icon: "💓",
  },
  {
    name: "Macro Calculator",
    href: "/macro-calculator",
    description: "Get your ideal macronutrient breakdown for protein, carbs, and fat. Choose from preset diet plans or create custom ratios.",
    icon: "🥗",
  },
];

export default function HomePage() {
  return (
    <>
      <WebSiteSchema />

      {/* Hero Section */}
      <section style={{ textAlign: "center", marginBottom: "3rem" }}>
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 800,
            color: "var(--color-text)",
            marginBottom: "1rem",
            lineHeight: 1.2,
          }}
        >
          Free Online{" "}
          <span style={{ color: "var(--color-primary)" }}>Calorie &amp; Nutrition</span>{" "}
          Calculators
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--color-text)",
            maxWidth: "700px",
            margin: "0 auto 2rem",
            lineHeight: 1.7,
          }}
        >
          Science-based nutrition tools powered by the Mifflin-St Jeor, Harris-Benedict, and
          Katch-McArdle equations. Calculate your daily calorie needs, TDEE, BMR, and ideal
          macronutrient ratios — all 100% free and private.
        </p>
      </section>

      <AdSlot slot="leaderboard" />

            {/* Tool Grid */}
      <section style={{ marginBottom: "3rem" }}>
        <HomeToolGrid tools={tools} />
      </section>

      <AdSlot slot="in-content" />

      {/* SEO Content */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "1rem",
          }}
        >
          Understanding Your Calorie Needs
        </h2>
        <div
          style={{
            color: "var(--color-text)",
            fontSize: "0.9375rem",
            lineHeight: 1.8,
          }}
        >
          <p style={{ marginBottom: "1rem" }}>
            Calories are the fundamental unit of energy that fuels every process in your body — from
            breathing and circulating blood to exercising and thinking. Understanding how many
            calories your body needs each day is the cornerstone of effective nutrition planning,
            whether your goal is weight loss, muscle gain, or maintaining a healthy weight.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Your daily calorie needs are determined by two primary factors: your <strong>Basal
            Metabolic Rate (BMR)</strong> and your <strong>activity level</strong>. BMR represents
            the number of calories your body burns at complete rest — just to keep your organs
            functioning, your heart beating, and your lungs breathing. This typically accounts for
            60-75% of your total daily energy expenditure.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            When you add physical activity on top of your BMR, you get your <strong>Total Daily
            Energy Expenditure (TDEE)</strong>. This is the total number of calories you burn in a
            day, and it&apos;s the number you need to know to manage your weight effectively. Eat
            fewer calories than your TDEE to lose weight, eat more to gain weight, or match it to
            maintain your current weight.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Our calculators use scientifically validated formulas trusted by nutritionists and
            healthcare professionals worldwide. The <strong>Mifflin-St Jeor equation</strong>,
            developed in 1990, is considered the most accurate for estimating BMR in most
            populations. The <strong>Harris-Benedict equation</strong>, revised in 1984, provides a
            reliable comparison. For those who know their body fat percentage, the{" "}
            <strong>Katch-McArdle formula</strong> offers the most precise estimate by factoring in
            lean body mass.
          </p>
          <p style={{ marginBottom: "1rem" }}>
            Beyond calories, <strong>macronutrients</strong> — protein, carbohydrates, and fat —
            play crucial roles in body composition, energy levels, and overall health. Protein
            supports muscle repair and growth (4 calories per gram), carbohydrates provide quick
            energy for your brain and muscles (4 calories per gram), and dietary fat supports
            hormone production and nutrient absorption (9 calories per gram).
          </p>
          <p>
            All our tools run entirely in your browser — your personal data is never sent to any
            server. Use our suite of calculators to build a complete picture of your nutritional
            needs and take control of your health journey with science-backed precision.
          </p>
        </div>
      </section>

      {/* Why Use Our Calculators */}
      <section className="card" style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "var(--color-text)",
            marginBottom: "1rem",
          }}
        >
          Why Use Our Calculators?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {[
            {
              title: "Science-Based Formulas",
              desc: "We use peer-reviewed equations (Mifflin-St Jeor, Harris-Benedict, Katch-McArdle) trusted by nutritionists worldwide.",
              icon: "🧪",
            },
            {
              title: "100% Private",
              desc: "All calculations happen in your browser. Your personal health data is never sent to any server or stored anywhere.",
              icon: "🔒",
            },
            {
              title: "Completely Free",
              desc: "No sign-ups, no subscriptions, no hidden fees. Professional-grade nutrition tools available to everyone.",
              icon: "🆓",
            },
            {
              title: "Multiple Formulas",
              desc: "Compare results from different equations side by side to get the most accurate estimate for your body type.",
              icon: "📊",
            },
          ].map((item) => (
            <div key={item.title}>
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{item.icon}</div>
              <h3
                style={{
                  fontWeight: 600,
                  color: "var(--color-text)",
                  marginBottom: "0.25rem",
                }}
              >
                {item.title}
              </h3>
              <p style={{ color: "var(--color-text-muted)", fontSize: "0.875rem", lineHeight: 1.6 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <AdSlot slot="footer" />
    </>
  );
}
