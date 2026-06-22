import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calorie Calculator — Daily Calorie Needs | CalorieCalculator.one",
  description: "Calculate your daily calorie needs with the Mifflin-St Jeor equation. Factor in age, gender, height, weight, activity level, and weight goals for accurate results.",
  alternates: { canonical: "https://caloriecalculator.one/calorie-calculator" },
  openGraph: {
    title: "Calorie Calculator — Daily Calorie Needs | CalorieCalculator.one",
    description: "Calculate your daily calorie needs with the Mifflin-St Jeor equation. Factor in age, gender, height, weight, activity level, and weight goals for accurate results.",
    url: "https://caloriecalculator.one/calorie-calculator",
    siteName: "CalorieCalculator.one",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Calculator — Daily Calorie Needs | CalorieCalculator.one",
    description: "Calculate your daily calorie needs with the Mifflin-St Jeor equation. Factor in age, gender, height, weight, activity level, and weight goals for accurate results.",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
