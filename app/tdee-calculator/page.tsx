"use client";
import { useState } from "react";
import AdSlot from "@/components/ui/AdSlot";
import CopyButton from "@/components/ui/CopyButton";
import FAQ from "@/components/ui/FAQ";
import RelatedTools from "@/components/ui/RelatedTools";
import FaqSchema from "@/components/seo/FaqSchema";
import {
  mifflinStJeor,
  harrisBenedict,
  katchMcArdle,
  ACTIVITY_LEVELS,
  lbsToKg,
  feetInchesToCm,
  type Gender,
} from "@/lib/formulas";

const faqs = [
  {
    question: "What is TDEE and why does it matter?",
    answer:
      "TDEE stands for Total Daily Energy Expenditure — the total number of calories you burn in a day including all activities. It matters because it determines how many calories you need to eat to maintain, lose, or gain weight. Eating below your TDEE creates a caloric deficit for weight loss, while eating above creates a surplus for weight gain.",
  },
  {
    question: "Which TDEE formula is most accurate?",
    answer:
      "The Mifflin-St Jeor equation is considered the most accurate for the general population. However, if you know your body fat percentage, the Katch-McArdle formula may be more accurate as it accounts for lean body mass. The Harris-Benedict equation tends to slightly overestimate in some populations.",
  },
  {
    question: "How often should I recalculate my TDEE?",
    answer:
      "Recalculate your TDEE every 4-6 weeks or whenever your weight changes by more than 2-3 kg (5 lbs), your activity level changes significantly, or you are not seeing expected results. As you lose or gain weight, your TDEE changes because your body requires different amounts of energy at different sizes.",
  },
  {
    question: "Why is my TDEE different from online calculators?",
    answer:
      "Different calculators may use different formulas or activity multipliers. Our calculator shows results from multiple formulas so you can compare. Additionally, individual factors like genetics, muscle mass, hormones, and metabolic adaptation can cause your actual TDEE to differ from calculated estimates by 10-15%.",
  },
];

export default function TDEECalculatorPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState<{
    bmrMSJ: number;
    bmrHB: number;
    bmrKM: number | null;
    tdeeLevels: { key: string; label: string; description: string; multiplier: number; tdeeMSJ: number; tdeeHB: number; tdeeKM: number | null }[];
    weeklyMSJ: number[];
  } | null>(null);

  const calculate = () => {
    const ageNum = parseInt(age);
    let wKg: number;
    let hCm: number;

    if (unit === "metric") {
      wKg = parseFloat(weightKg);
      hCm = parseFloat(heightCm);
    } else {
      wKg = lbsToKg(parseFloat(weightLbs));
      hCm = feetInchesToCm(parseFloat(heightFt) || 0, parseFloat(heightIn) || 0);
    }

    if (!ageNum || !wKg || !hCm || ageNum < 1 || wKg < 1 || hCm < 1) return;

    const bmrMSJ = mifflinStJeor(wKg, hCm, ageNum, gender);
    const bmrHB = harrisBenedict(wKg, hCm, ageNum, gender);
    const bf = parseFloat(bodyFat);
    const bmrKM = bf > 0 && bf < 100 ? katchMcArdle(wKg, bf) : null;

    const tdeeLevels = ACTIVITY_LEVELS.map((a) => ({
      key: a.key,
      label: a.label,
      description: a.description,
      multiplier: a.multiplier,
      tdeeMSJ: Math.round(bmrMSJ * a.multiplier),
      tdeeHB: Math.round(bmrHB * a.multiplier),
      tdeeKM: bmrKM ? Math.round(bmrKM * a.multiplier) : null,
    }));

    const weeklyMSJ = tdeeLevels.map((t) => t.tdeeMSJ * 7);

    setResults({
      bmrMSJ: Math.round(bmrMSJ),
      bmrHB: Math.round(bmrHB),
      bmrKM: bmrKM ? Math.round(bmrKM) : null,
      tdeeLevels,
      weeklyMSJ,
    });
    setCalculated(true);
  };

  const reset = () => {
    setAge(""); setWeightKg(""); setWeightLbs(""); setHeightCm(""); setHeightFt(""); setHeightIn("");
    setBodyFat(""); setGender("male"); setUnit("metric"); setCalculated(false); setResults(null);
  };

  const getResultsText = () => {
    if (!results) return "";
    let text = `TDEE Calculator Results\n\nBMR Comparison:\n`;
    text += `  Mifflin-St Jeor: ${results.bmrMSJ} cal/day\n`;
    text += `  Harris-Benedict: ${results.bmrHB} cal/day\n`;
    if (results.bmrKM) text += `  Katch-McArdle: ${results.bmrKM} cal/day\n`;
    text += `\nTDEE by Activity Level (Mifflin-St Jeor):\n`;
    results.tdeeLevels.forEach((t) => {
      text += `  ${t.label}: ${t.tdeeMSJ} cal/day (${(t.tdeeMSJ * 7).toLocaleString()} cal/week)\n`;
    });
    return text;
  };

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.5rem" }}>
          TDEE Calculator
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.0625rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Calculate your Total Daily Energy Expenditure across all activity levels. Compare results from Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle formulas.
        </p>

        <AdSlot slot="leaderboard" />

        {/* Calculator Form */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {(["metric", "imperial"] as const).map((u) => (
              <button key={u} onClick={() => setUnit(u)} style={{ padding: "0.5rem 1.25rem", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: unit === u ? "var(--color-primary)" : "var(--color-border)", backgroundColor: unit === u ? "var(--color-primary)" : "var(--color-surface)", color: unit === u ? "#FFFFFF" : "var(--color-text)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem", transition: "all 0.2s" }}>
                {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/ft)"}
              </button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
            <div>
              <label className="label">Gender</label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(["male", "female"] as const).map((g) => (
                  <button key={g} onClick={() => setGender(g)} style={{ padding: "0.5rem 1.5rem", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: gender === g ? "var(--color-primary)" : "var(--color-border)", backgroundColor: gender === g ? "var(--color-primary-bg)" : "var(--color-surface)", color: gender === g ? "var(--color-primary)" : "var(--color-text)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                    {g === "male" ? "Male" : "Female"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="label" htmlFor="age">Age</label>
              <input id="age" type="number" className="input-field" placeholder="e.g. 30" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="120" />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.25rem", marginBottom: "1.25rem" }}>
            <div>
              <label className="label">{unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}</label>
              {unit === "metric" ? (
                <input type="number" className="input-field" placeholder="e.g. 70" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min="1" />
              ) : (
                <input type="number" className="input-field" placeholder="e.g. 154" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} min="1" />
              )}
            </div>
            <div>
              <label className="label">{unit === "metric" ? "Height (cm)" : "Height"}</label>
              {unit === "metric" ? (
                <input type="number" className="input-field" placeholder="e.g. 175" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} min="1" />
              ) : (
                <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                  <input type="number" className="input-field" placeholder="ft" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} min="0" style={{ maxWidth: "80px" }} />
                  <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>ft</span>
                  <input type="number" className="input-field" placeholder="in" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} min="0" max="11" style={{ maxWidth: "80px" }} />
                  <span style={{ color: "var(--color-text-muted)", fontSize: "0.875rem" }}>in</span>
                </div>
              )}
            </div>
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label className="label" htmlFor="bodyFat">Body Fat % (optional, for Katch-McArdle)</label>
            <input id="bodyFat" type="number" className="input-field" placeholder="e.g. 20" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} min="1" max="70" style={{ maxWidth: "200px" }} />
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>Enter your body fat percentage to enable the Katch-McArdle formula comparison.</p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={calculate}>Calculate TDEE</button>
            <button className="btn-secondary" onClick={reset}>Clear / Reset</button>
          </div>
        </div>

        {/* Results */}
        {calculated && results && (
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)" }}>Your TDEE Results</h2>
              <CopyButton text={getResultsText()} />
            </div>

            {/* BMR Comparison */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.75rem" }}>BMR Comparison</h3>
              <div style={{ display: "grid", gridTemplateColumns: results.bmrKM ? "repeat(3, 1fr)" : "repeat(2, 1fr)", gap: "0.75rem" }}>
                <div style={{ padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Mifflin-St Jeor</div>
                  <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.bmrMSJ}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>cal/day</div>
                </div>
                <div style={{ padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Harris-Benedict</div>
                  <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.bmrHB}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>cal/day</div>
                </div>
                {results.bmrKM && (
                  <div style={{ padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                    <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Katch-McArdle</div>
                    <div style={{ fontSize: "1.375rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.bmrKM}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>cal/day</div>
                  </div>
                )}
              </div>
            </div>

            {/* TDEE by Activity Level */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.75rem" }}>TDEE by Activity Level</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                      <th style={{ textAlign: "left", padding: "0.75rem 0.5rem", color: "var(--color-text)", fontWeight: 600 }}>Activity Level</th>
                      <th style={{ textAlign: "right", padding: "0.75rem 0.5rem", color: "var(--color-text)", fontWeight: 600 }}>Mifflin-St Jeor</th>
                      <th style={{ textAlign: "right", padding: "0.75rem 0.5rem", color: "var(--color-text)", fontWeight: 600 }}>Harris-Benedict</th>
                      {results.bmrKM && <th style={{ textAlign: "right", padding: "0.75rem 0.5rem", color: "var(--color-text)", fontWeight: 600 }}>Katch-McArdle</th>}
                      <th style={{ textAlign: "right", padding: "0.75rem 0.5rem", color: "var(--color-text)", fontWeight: 600 }}>Weekly</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.tdeeLevels.map((t, i) => (
                      <tr key={t.key} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          <div style={{ fontWeight: 600, color: "var(--color-text)" }}>{t.label}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{t.description} (x{t.multiplier})</div>
                        </td>
                        <td style={{ textAlign: "right", padding: "0.75rem 0.5rem", fontWeight: 600, color: "var(--color-primary)" }}>{t.tdeeMSJ.toLocaleString()}</td>
                        <td style={{ textAlign: "right", padding: "0.75rem 0.5rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>{t.tdeeHB.toLocaleString()}</td>
                        {results.bmrKM && <td style={{ textAlign: "right", padding: "0.75rem 0.5rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>{t.tdeeKM?.toLocaleString()}</td>}
                        <td style={{ textAlign: "right", padding: "0.75rem 0.5rem", color: "var(--color-text-muted)" }}>{results.weeklyMSJ[i].toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Level Visual */}
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.75rem" }}>Visual Comparison</h3>
              {results.tdeeLevels.map((t) => {
                const maxTDEE = results.tdeeLevels[results.tdeeLevels.length - 1].tdeeMSJ;
                return (
                  <div key={t.key} style={{ marginBottom: "0.5rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.125rem" }}>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>{t.label}</span>
                      <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "var(--color-primary)" }}>{t.tdeeMSJ.toLocaleString()} cal</span>
                    </div>
                    <div style={{ height: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-border-light)" }}>
                      <div style={{ height: "100%", width: `${(t.tdeeMSJ / maxTDEE) * 100}%`, backgroundColor: "var(--color-primary)", borderRadius: "var(--radius-sm)", transition: "width 0.5s ease", opacity: 0.6 + (t.multiplier - 1.2) * 0.57 }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="disclaimer">
              This calculator provides estimates based on scientific formulas. Consult a healthcare professional for personalized advice.
            </div>
          </div>
        )}

        <AdSlot slot="below-results" />

        {/* How-to Guide */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            How to Calculate Your TDEE
          </h2>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "1rem" }}>
              Your Total Daily Energy Expenditure (TDEE) represents the total number of calories your body burns in a 24-hour period. Unlike BMR, which only accounts for calories burned at rest, TDEE includes every calorie you burn — from sleeping and digesting food to walking, exercising, and even fidgeting. Understanding your TDEE is essential for any nutrition goal because it tells you exactly how many calories you need to maintain your current weight.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>The Science Behind TDEE:</strong> TDEE is calculated by multiplying your Basal Metabolic Rate (BMR) by an activity factor. The activity multipliers used in our calculator are based on research by the World Health Organization and validated through numerous metabolic studies. Sedentary individuals (desk workers with no exercise) multiply their BMR by 1.2, while extremely active people (athletes or those with physically demanding jobs who also exercise intensely) multiply by 1.9.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Comparing Formulas:</strong> Our calculator provides results from up to three formulas. The Mifflin-St Jeor equation (1990) is the gold standard for most people. The Harris-Benedict equation (revised 1984) is slightly older but still widely used. The Katch-McArdle formula is unique because it uses lean body mass instead of total weight, making it potentially more accurate for people who know their body fat percentage — especially athletes or those with above-average muscle mass.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Using Your TDEE:</strong> Once you know your TDEE, weight management becomes straightforward math. To lose weight, eat 15-25% below your TDEE (a 500-calorie deficit produces roughly 0.5 kg of fat loss per week). To gain weight, eat 10-20% above your TDEE. For maintenance, eat at your TDEE level. The weekly calorie budget shown in our results gives you flexibility — you can eat slightly more on active days and less on rest days, as long as your weekly total stays on target.
            </p>
            <p>
              <strong>Important Considerations:</strong> TDEE calculations are estimates based on population averages. Your actual energy expenditure can vary based on genetics, hormonal status, sleep quality, stress levels, and metabolic adaptation. If you have been dieting for an extended period, your metabolism may have adapted downward. Track your weight and intake for 2-3 weeks, then adjust your calorie target by 100-200 calories if results do not match expectations.
            </p>
          </div>
        </div>

        <AdSlot slot="in-content" />

        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>Frequently Asked Questions</h2>
          <FAQ items={faqs} />
        </div>

        <RelatedTools current="/tdee-calculator" />
        <AdSlot slot="footer" />
      </div>
    </>
  );
}
