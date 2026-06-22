import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Macro Calculator — Protein, Carbs & Fat Targets | CalorieCalculator.one",
  description: "Calculate your daily macronutrient targets with preset diet plans (Balanced, Low Carb, High Protein, Keto) or custom ratios. Includes meal distribution.",
  alternates: { canonical: "https://caloriecalculator.one/macro-calculator" },
  openGraph: {
    title: "Macro Calculator — Protein, Carbs & Fat Targets | CalorieCalculator.one",
    description: "Calculate your daily macronutrient targets with preset diet plans (Balanced, Low Carb, High Protein, Keto) or custom ratios. Includes meal distribution.",
    url: "https://caloriecalculator.one/macro-calculator",
    siteName: "CalorieCalculator.one",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Macro Calculator — Protein, Carbs & Fat Targets | CalorieCalculator.one",
    description: "Calculate your daily macronutrient targets with preset diet plans (Balanced, Low Carb, High Protein, Keto) or custom ratios. Includes meal distribution.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
