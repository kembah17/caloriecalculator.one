import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// GSC verification loaded from env
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  ...(gscVerification && { verification: { google: gscVerification } }),
  metadataBase: new URL("https://caloriecalculator.one"),
  title: {
    default: "Calorie Calculator - Free Online Calorie & Nutrition Tools | CalorieCalculator.one",
    template: "%s | CalorieCalculator.one",
  },
  description:
    "Free online calorie calculator, TDEE calculator, BMR calculator, and macro calculator. Science-based nutrition tools using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas.",
  keywords: [
    "calorie calculator",
    "TDEE calculator",
    "BMR calculator",
    "macro calculator",
    "calorie counter",
    "nutrition calculator",
    "daily calorie needs",
    "macronutrient calculator",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://caloriecalculator.one",
    siteName: "CalorieCalculator.one",
    title: "Calorie Calculator - Free Online Calorie & Nutrition Tools",
    description:
      "Free online calorie calculator, TDEE calculator, BMR calculator, and macro calculator. Science-based nutrition tools.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calorie Calculator - Free Online Calorie & Nutrition Tools",
    description:
      "Free online calorie calculator, TDEE calculator, BMR calculator, and macro calculator.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://caloriecalculator.one",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem("theme");
                  if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
                    document.documentElement.classList.add("dark");
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <GoogleAnalytics />
        <Header />
        <main
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "2rem 1rem",
            minHeight: "calc(100vh - 4rem - 200px)",
          }}
        >
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
