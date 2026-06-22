import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "BMR Calculator — Basal Metabolic Rate | CalorieCalculator.one",
  description: "Calculate your Basal Metabolic Rate using three scientific formulas: Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle. Compare results side by side.",
  alternates: { canonical: "https://caloriecalculator.one/bmr-calculator" },
  openGraph: {
    title: "BMR Calculator — Basal Metabolic Rate | CalorieCalculator.one",
    description: "Calculate your Basal Metabolic Rate using three scientific formulas: Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle. Compare results side by side.",
    url: "https://caloriecalculator.one/bmr-calculator",
    siteName: "CalorieCalculator.one",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BMR Calculator — Basal Metabolic Rate | CalorieCalculator.one",
    description: "Calculate your Basal Metabolic Rate using three scientific formulas: Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle. Compare results side by side.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
