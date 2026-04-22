"use client";
import { useState } from "react";
import type { Metadata } from "next";
import AdSlot from "@/components/ui/AdSlot";
import CopyButton from "@/components/ui/CopyButton";
import FAQ from "@/components/ui/FAQ";
import RelatedTools from "@/components/ui/RelatedTools";
import FaqSchema from "@/components/seo/FaqSchema";
import {
  mifflinStJeor,
  harrisBenedict,
  ACTIVITY_LEVELS,
  GOALS,
  calculateMacros,
  lbsToKg,
  feetInchesToCm,
  type Gender,
} from "@/lib/formulas";

const faqs = [
  {
    question: "How accurate is the Mifflin-St Jeor equation?",
    answer:
      "The Mifflin-St Jeor equation is considered the most accurate BMR estimation formula for most people. Studies show it predicts BMR within 10% of measured values in about 82% of people, making it the preferred formula recommended by the Academy of Nutrition and Dietetics.",
  },
  {
    question: "How many calories should I eat to lose weight?",
    answer:
      "To lose weight safely, aim for a caloric deficit of 250-500 calories per day below your maintenance level. This translates to about 0.25-0.5 kg (0.5-1 lb) of weight loss per week. Extreme deficits above 1000 calories are not recommended as they can lead to muscle loss and metabolic slowdown.",
  },
  {
    question: "What is the difference between BMR and TDEE?",
    answer:
      "BMR (Basal Metabolic Rate) is the number of calories your body burns at complete rest just to maintain basic life functions. TDEE (Total Daily Energy Expenditure) includes your BMR plus all calories burned through physical activity, exercise, and digestion. TDEE is always higher than BMR.",
  },
  {
    question: "Should I eat back my exercise calories?",
    answer:
      "It depends on your goals. If you are trying to lose weight, eating back all exercise calories may slow your progress. A common approach is to eat back about 50% of exercise calories. If you are maintaining or gaining weight, eating back exercise calories helps ensure adequate nutrition.",
  },
  {
    question: "How do I choose my activity level?",
    answer:
      "Be honest about your typical week. Sedentary means a desk job with no exercise. Lightly active means light exercise 1-3 days per week. Moderately active means moderate exercise 3-5 days. Very active means hard exercise 6-7 days. Extra active means very intense exercise plus a physically demanding job.",
  },
];

export default function CalorieCalculatorPage() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [gender, setGender] = useState<Gender>("male");
  const [age, setAge] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [goal, setGoal] = useState("maintain");
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState<{
    bmrMSJ: number;
    bmrHB: number;
    tdee: number;
    goalCalories: number;
    macros: { proteinGrams: number; carbsGrams: number; fatGrams: number; proteinCals: number; carbsCals: number; fatCals: number };
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
    const actLevel = ACTIVITY_LEVELS.find((a) => a.key === activity)!;
    const tdee = bmrMSJ * actLevel.multiplier;
    const goalObj = GOALS.find((g) => g.key === goal)!;
    const goalCalories = Math.round(tdee + goalObj.adjustment);
    const macros = calculateMacros(goalCalories, 30, 40, 30);

    setResults({ bmrMSJ: Math.round(bmrMSJ), bmrHB: Math.round(bmrHB), tdee: Math.round(tdee), goalCalories, macros });
    setCalculated(true);
  };

  const reset = () => {
    setAge("");
    setWeightKg("");
    setWeightLbs("");
    setHeightCm("");
    setHeightFt("");
    setHeightIn("");
    setActivity("moderate");
    setGoal("maintain");
    setGender("male");
    setUnit("metric");
    setCalculated(false);
    setResults(null);
  };

  const getResultsText = () => {
    if (!results) return "";
    return `Calorie Calculator Results\n` +
      `BMR (Mifflin-St Jeor): ${results.bmrMSJ} cal/day\n` +
      `BMR (Harris-Benedict): ${results.bmrHB} cal/day\n` +
      `Maintenance (TDEE): ${results.tdee} cal/day\n` +
      `Goal Calories: ${results.goalCalories} cal/day\n` +
      `Macros: Protein ${results.macros.proteinGrams}g | Carbs ${results.macros.carbsGrams}g | Fat ${results.macros.fatGrams}g`;
  };

  const maxMacro = results ? Math.max(results.macros.proteinCals, results.macros.carbsCals, results.macros.fatCals) : 1;

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.5rem" }}>
          Calorie Calculator
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.0625rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Calculate your daily calorie needs using the Mifflin-St Jeor equation. Get personalized results based on your age, gender, activity level, and weight goals.
        </p>

        <AdSlot slot="leaderboard" />

        {/* Calculator */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          {/* Unit Toggle */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            {(["metric", "imperial"] as const).map((u) => (
              <button
                key={u}
                onClick={() => setUnit(u)}
                style={{
                  padding: "0.5rem 1.25rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid",
                  borderColor: unit === u ? "var(--color-primary)" : "var(--color-border)",
                  backgroundColor: unit === u ? "var(--color-primary)" : "var(--color-surface)",
                  color: unit === u ? "#FFFFFF" : "var(--color-text)",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.875rem",
                  transition: "all 0.2s",
                }}
              >
                {u === "metric" ? "Metric (kg/cm)" : "Imperial (lbs/ft)"}
              </button>
            ))}
          </div>

          {/* Gender */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label">Gender</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {(["male", "female"] as const).map((g) => (
                <button
                  key={g}
                  onClick={() => setGender(g)}
                  style={{
                    padding: "0.5rem 1.5rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid",
                    borderColor: gender === g ? "var(--color-primary)" : "var(--color-border)",
                    backgroundColor: gender === g ? "var(--color-primary-bg)" : "var(--color-surface)",
                    color: gender === g ? "var(--color-primary)" : "var(--color-text)",
                    fontWeight: 600,
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    transition: "all 0.2s",
                  }}
                >
                  {g === "male" ? "Male" : "Female"}
                </button>
              ))}
            </div>
          </div>

          {/* Age */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label" htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              className="input-field"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              min="1"
              max="120"
              style={{ maxWidth: "200px" }}
            />
          </div>

          {/* Weight */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label">{unit === "metric" ? "Weight (kg)" : "Weight (lbs)"}</label>
            {unit === "metric" ? (
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 70"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                min="1"
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 154"
                value={weightLbs}
                onChange={(e) => setWeightLbs(e.target.value)}
                min="1"
                style={{ maxWidth: "200px" }}
              />
            )}
          </div>

          {/* Height */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label">{unit === "metric" ? "Height (cm)" : "Height"}</label>
            {unit === "metric" ? (
              <input
                type="number"
                className="input-field"
                placeholder="e.g. 175"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                min="1"
                style={{ maxWidth: "200px" }}
              />
            ) : (
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                <input
                  type="number"
                  className="input-field"
                  placeholder="ft"
                  value={heightFt}
                  onChange={(e) => setHeightFt(e.target.value)}
                  min="0"
                  style={{ maxWidth: "100px" }}
                />
                <span style={{ color: "var(--color-text-muted)" }}>ft</span>
                <input
                  type="number"
                  className="input-field"
                  placeholder="in"
                  value={heightIn}
                  onChange={(e) => setHeightIn(e.target.value)}
                  min="0"
                  max="11"
                  style={{ maxWidth: "100px" }}
                />
                <span style={{ color: "var(--color-text-muted)" }}>in</span>
              </div>
            )}
          </div>

          {/* Activity Level */}
          <div style={{ marginBottom: "1.25rem" }}>
            <label className="label" htmlFor="activity">Activity Level</label>
            <select
              id="activity"
              className="select-field"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            >
              {ACTIVITY_LEVELS.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label} — {a.description}
                </option>
              ))}
            </select>
          </div>

          {/* Goal */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="label" htmlFor="goal">Goal</label>
            <select
              id="goal"
              className="select-field"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              {GOALS.map((g) => (
                <option key={g.key} value={g.key}>
                  {g.label}
                </option>
              ))}
            </select>
          </div>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={calculate}>
              Calculate Calories
            </button>
            <button className="btn-secondary" onClick={reset}>
              Clear / Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {calculated && results && (
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)" }}>Your Results</h2>
              <CopyButton text={getResultsText()} />
            </div>

            {/* Key metrics */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
              <div style={{ padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>BMR (Mifflin-St Jeor)</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.bmrMSJ.toLocaleString()}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>cal/day</div>
              </div>
              <div style={{ padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Maintenance (TDEE)</div>
                <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.tdee.toLocaleString()}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>cal/day</div>
              </div>
              <div style={{ padding: "1rem", backgroundColor: "var(--color-primary-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-primary)", textAlign: "center" }}>
                <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>Goal Calories</div>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.goalCalories.toLocaleString()}</div>
                <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>cal/day</div>
              </div>
            </div>

            {/* Formula comparison */}
            <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.75rem" }}>Formula Comparison</h3>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid var(--color-border-light)" }}>
                <span style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>Mifflin-St Jeor BMR</span>
                <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{results.bmrMSJ} cal/day</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0" }}>
                <span style={{ color: "var(--color-text-secondary)", fontSize: "0.875rem" }}>Harris-Benedict BMR</span>
                <span style={{ fontWeight: 600, color: "var(--color-text)" }}>{results.bmrHB} cal/day</span>
              </div>
            </div>

            {/* Macro breakdown bar chart */}
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.75rem" }}>Macronutrient Breakdown (30/40/30)</h3>
              {[
                { label: "Protein", grams: results.macros.proteinGrams, cals: results.macros.proteinCals, color: "#3B82F6" },
                { label: "Carbs", grams: results.macros.carbsGrams, cals: results.macros.carbsCals, color: "#F59E0B" },
                { label: "Fat", grams: results.macros.fatGrams, cals: results.macros.fatCals, color: "#EF4444" },
              ].map((m) => (
                <div key={m.label} style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text)" }}>{m.label}</span>
                    <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>{m.grams}g ({m.cals} cal)</span>
                  </div>
                  <div style={{ height: "1.25rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-sm)", overflow: "hidden", border: "1px solid var(--color-border-light)" }}>
                    <div style={{ height: "100%", width: `${(m.cals / maxMacro) * 100}%`, backgroundColor: m.color, borderRadius: "var(--radius-sm)", transition: "width 0.5s ease" }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly budget */}
            <div style={{ padding: "0.75rem 1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)" }}>
              <span style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>Weekly Calorie Budget: </span>
              <span style={{ fontWeight: 700, color: "var(--color-primary)" }}>{(results.goalCalories * 7).toLocaleString()} calories</span>
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
            How to Calculate Your Daily Calorie Needs
          </h2>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "1rem" }}>
              Calculating your daily calorie needs is the foundation of any successful nutrition plan. Whether you want to lose weight, build muscle, or simply maintain your current physique, knowing your calorie requirements gives you a clear target to work toward. Our calculator uses the Mifflin-St Jeor equation, which research has shown to be the most accurate formula for estimating Basal Metabolic Rate (BMR) in the general population.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 1: Determine Your BMR.</strong> Your Basal Metabolic Rate is the number of calories your body needs at complete rest to maintain vital functions like breathing, circulation, and cell production. The Mifflin-St Jeor equation calculates this based on your weight, height, age, and gender. For men, the formula is: BMR = (10 x weight in kg) + (6.25 x height in cm) - (5 x age) + 5. For women, it is the same but subtracts 161 instead of adding 5.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 2: Factor in Activity Level.</strong> Your BMR only accounts for calories burned at rest. To find your Total Daily Energy Expenditure (TDEE), multiply your BMR by an activity factor. Sedentary individuals (desk jobs, no exercise) multiply by 1.2, while very active people (intense daily exercise) multiply by 1.725. Be honest about your activity level — overestimating is one of the most common mistakes people make.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 3: Adjust for Your Goal.</strong> Once you know your TDEE, adjust based on your goal. To lose weight, subtract 250-1000 calories per day (a 500-calorie deficit produces roughly 0.5 kg or 1 lb of fat loss per week). To gain weight, add 250-500 calories. For maintenance, eat at your TDEE level. Gradual changes are more sustainable and healthier than extreme deficits or surpluses.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 4: Consider Your Macros.</strong> Calories tell you how much to eat, but macronutrients tell you what to eat. A balanced approach of 30% protein, 40% carbohydrates, and 30% fat works well for most people. Protein is especially important during weight loss to preserve muscle mass — aim for at least 1.6g per kg of body weight if you are active.
            </p>
            <p>
              <strong>Important Notes:</strong> These calculations provide estimates based on population averages. Individual metabolism can vary by 10-15% due to genetics, muscle mass, hormonal factors, and other variables. Track your progress over 2-3 weeks and adjust your intake by 100-200 calories if you are not seeing expected results. Always consult a healthcare professional before making significant dietary changes, especially if you have medical conditions.
            </p>
          </div>
        </div>

        <AdSlot slot="in-content" />

        {/* FAQ */}
        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>
            Frequently Asked Questions
          </h2>
          <FAQ items={faqs} />
        </div>

        <RelatedTools current="/calorie-calculator" />

        <AdSlot slot="footer" />
      </div>
    </>
  );
}
