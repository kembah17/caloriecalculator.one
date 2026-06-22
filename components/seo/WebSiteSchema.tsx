export default function WebSiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "CalorieCalculator.one",
    url: "https://caloriecalculator.one",
    description: "Free online calorie, TDEE, BMR, and macro calculators. Science-based nutrition tools for your health goals.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://caloriecalculator.one/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
