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
  lbsToKg,
  feetInchesToCm,
  type Gender,
} from "@/lib/formulas";

const faqs = [
  {
    question: "What is Basal Metabolic Rate (BMR)?",
    answer:
      "BMR is the number of calories your body needs to perform basic life-sustaining functions at complete rest. This includes breathing, blood circulation, cell production, nutrient processing, and maintaining body temperature. BMR typically accounts for 60-75% of your total daily calorie expenditure.",
  },
  {
    question: "Which BMR formula is the most accurate?",
    answer:
      "The Mifflin-St Jeor equation is considered the most accurate for the general population, predicting BMR within 10% for about 82% of people. If you know your body fat percentage, the Katch-McArdle formula may be more accurate as it uses lean body mass. The Harris-Benedict equation tends to slightly overestimate BMR.",
  },
  {
    question: "What factors affect BMR?",
    answer:
      "Several factors influence BMR: age (BMR decreases about 1-2% per decade after 20), gender (men typically have higher BMR due to more muscle mass), body composition (more muscle means higher BMR), genetics, hormonal status (thyroid hormones significantly affect BMR), body size, and environmental temperature.",
  },
  {
    question: "Can I increase my BMR?",
    answer:
      "Yes, the most effective way to increase BMR is by building muscle through resistance training, as muscle tissue burns more calories at rest than fat tissue. Other factors include staying well-hydrated, getting adequate sleep, eating enough protein, and avoiding prolonged extreme calorie restriction which can lower BMR.",
  },
  {
    question: "Why do I need to know my BMR?",
    answer:
      "Knowing your BMR helps you understand the minimum calories your body needs to function. This is the foundation for calculating your total daily energy needs (TDEE) and creating an effective nutrition plan. Eating significantly below your BMR for extended periods can be harmful and counterproductive to weight loss goals.",
  },
];

export default function BMRCalculatorPage() {
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
    msj: number;
    hb: number;
    km: number | null;
    avg: number;
    hourly: number;
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

    const msj = Math.round(mifflinStJeor(wKg, hCm, ageNum, gender));
    const hb = Math.round(harrisBenedict(wKg, hCm, ageNum, gender));
    const bf = parseFloat(bodyFat);
    const km = bf > 0 && bf < 100 ? Math.round(katchMcArdle(wKg, bf)) : null;

    const values = [msj, hb, ...(km ? [km] : [])];
    const avg = Math.round(values.reduce((a, b) => a + b, 0) / values.length);

    setResults({ msj, hb, km, avg, hourly: Math.round(avg / 24) });
    setCalculated(true);
  };

  const reset = () => {
    setAge(""); setWeightKg(""); setWeightLbs(""); setHeightCm(""); setHeightFt(""); setHeightIn("");
    setBodyFat(""); setGender("male"); setUnit("metric"); setCalculated(false); setResults(null);
  };

  const getResultsText = () => {
    if (!results) return "";
    let text = `BMR Calculator Results\n\n`;
    text += `Mifflin-St Jeor: ${results.msj} cal/day\n`;
    text += `Harris-Benedict: ${results.hb} cal/day\n`;
    if (results.km) text += `Katch-McArdle: ${results.km} cal/day\n`;
    text += `\nAverage BMR: ${results.avg} cal/day\n`;
    text += `Hourly burn rate: ~${results.hourly} cal/hour`;
    return text;
  };

  const maxBMR = results ? Math.max(results.msj, results.hb, results.km || 0) : 1;

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.5rem" }}>
          BMR Calculator
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.0625rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Calculate your Basal Metabolic Rate using three scientifically validated formulas. Compare Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle results side by side.
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

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label">Gender</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["male", "female"] as const).map((g) => (
                <button key={g} onClick={() => setGender(g)} style={{ padding: "0.5rem 1.5rem", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: gender === g ? "var(--color-primary)" : "var(--color-border)", backgroundColor: gender === g ? "var(--color-primary-bg)" : "var(--color-surface)", color: gender === g ? "var(--color-primary)" : "var(--color-text)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                  {g === "male" ? "Male" : "Female"}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label" htmlFor="age">Age</label>
            <input id="age" type="number" className="input-field" placeholder="Enter your age" value={age} onChange={(e) => setAge(e.target.value)} min="1" max="120" style={{ maxWidth: "200px" }} />
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label">{unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}</label>
            {unit === "metric" ? (
              <input type="number" className="input-field" placeholder="e.g. 70" value={weightKg} onChange={(e) => setWeightKg(e.target.value)} min="1" style={{ maxWidth: "200px" }} />
            ) : (
              <input type="number" className="input-field" placeholder="e.g. 154" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} min="1" style={{ maxWidth: "200px" }} />
            )}
          </div>

          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label">{unit === "metric" ? "Height (cm)" : "Height"}</label>
            {unit === "metric" ? (
              <input type="number" className="input-field" placeholder="e.g. 175" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} min="1" style={{ maxWidth: "200px" }} />
            ) : (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input type="number" className="input-field" placeholder="ft" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} min="0" style={{ maxWidth: "100px" }} />
                <span style={{ color: "var(--color-text-muted)" }}>ft</span>
                <input type="number" className="input-field" placeholder="in" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} min="0" max="11" style={{ maxWidth: "100px" }} />
                <span style={{ color: "var(--color-text-muted)" }}>in</span>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <label className="label" htmlFor="bodyFat">Body Fat % (optional, for Katch-McArdle)</label>
            <input id="bodyFat" type="number" className="input-field" placeholder="e.g. 20" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} min="1" max="70" style={{ maxWidth: "200px" }} />
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>Provide body fat % to enable the Katch-McArdle formula.</p>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={calculate}>Calculate BMR</button>
            <button className="btn-secondary" onClick={reset}>Clear / Reset</button>
          </div>
        </div>

        {/* Results */}
        {calculated && results && (
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)" }}>Your BMR Results</h2>
              <CopyButton text={getResultsText()} />
            </div>

            {/* Three formula cards */}
            <div style={{ display: "grid", gridTemplateColumns: results.km ? "repeat(auto-fit, minmax(160px, 1fr))" : "repeat(2, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
              <div style={{ padding: "1.25rem", backgroundColor: "var(--color-primary-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-primary)", textAlign: "center" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Mifflin-St Jeor</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.msj.toLocaleString()}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>calories/day</div>
                <div style={{ fontSize: "0.6875rem", color: "var(--color-primary)", marginTop: "0.25rem", fontWeight: 500 }}>Most Recommended</div>
              </div>
              <div style={{ padding: "1.25rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Harris-Benedict</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-text)" }}>{results.hb.toLocaleString()}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>calories/day</div>
                <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", marginTop: "0.25rem", fontWeight: 500 }}>Revised 1984</div>
              </div>
              {results.km && (
                <div style={{ padding: "1.25rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Katch-McArdle</div>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-text)" }}>{results.km.toLocaleString()}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>calories/day</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", marginTop: "0.25rem", fontWeight: 500 }}>Lean Mass Based</div>
                </div>
              )}
            </div>

            {/* Visual comparison bars */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.75rem" }}>Visual Comparison</h3>
              {[
                { label: "Mifflin-St Jeor", value: results.msj, color: "var(--color-primary)" },
                { label: "Harris-Benedict", value: results.hb, color: "#3B82F6" },
                ...(results.km ? [{ label: "Katch-McArdle", value: results.km, color: "#8B5CF6" }] : []),
              ].map((f) => (
                <div key={f.label} style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>{f.label}</span>
                    <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-text)" }}>{f.value.toLocaleString()} cal/day</span>
                  </div>
                  <div style={{ height: "1.25rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-border-light)" }}>
                    <div style={{ height: "100%", width: `${(f.value / (maxBMR * 1.1)) * 100}%`, backgroundColor: f.color, borderRadius: "var(--radius-sm)", transition: "width 0.5s ease" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Additional stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ padding: "0.75rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.125rem" }}>Average BMR</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.avg.toLocaleString()}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>cal/day</div>
              </div>
              <div style={{ padding: "0.75rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.125rem" }}>Hourly Burn</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text)" }}>~{results.hourly}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>cal/hour</div>
              </div>
              <div style={{ padding: "0.75rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.125rem" }}>Formula Spread</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--color-text)" }}>{Math.abs(results.msj - results.hb)}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>cal difference</div>
              </div>
            </div>

            {/* Factors affecting BMR */}
            <div style={{ padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.5rem" }}>Factors That Affect Your BMR</h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.5rem" }}>
                {[
                  { factor: "Muscle Mass", effect: "More muscle = higher BMR", icon: "💪" },
                  { factor: "Age", effect: "BMR decreases with age", icon: "📅" },
                  { factor: "Body Size", effect: "Larger bodies need more energy", icon: "📏" },
                  { factor: "Genetics", effect: "Natural metabolic variation", icon: "🧬" },
                  { factor: "Hormones", effect: "Thyroid affects metabolism", icon: "⚡" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: "0.5rem", backgroundColor: "var(--color-surface)", borderRadius: "0.375rem", border: "1px solid var(--color-border-light)" }}>
                    <div style={{ fontSize: "1rem", marginBottom: "0.125rem" }}>{item.icon} <strong>{item.factor}</strong></div>
                    <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>{item.effect}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <AdSlot slot="leaderboard" />
      </div>
    </>
  );
}

