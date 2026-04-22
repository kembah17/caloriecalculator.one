import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TDEE Calculator — Total Daily Energy Expenditure | CalorieCalculator.one",
  description: "Calculate your Total Daily Energy Expenditure (TDEE) across all activity levels. Compare Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas side by side.",
  alternates: { canonical: "https://caloriecalculator.one/tdee-calculator" },
  openGraph: {
    title: "TDEE Calculator — Total Daily Energy Expenditure | CalorieCalculator.one",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) across all activity levels. Compare Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas side by side.",
    url: "https://caloriecalculator.one/tdee-calculator",
    siteName: "CalorieCalculator.one",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TDEE Calculator — Total Daily Energy Expenditure | CalorieCalculator.one",
    description: "Calculate your Total Daily Energy Expenditure (TDEE) across all activity levels. Compare Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas side by side.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
