"use client";
import { useState } from "react";
import AdSlot from "@/components/ui/AdSlot";
import CopyButton from "@/components/ui/CopyButton";
import FAQ from "@/components/ui/FAQ";
import RelatedTools from "@/components/ui/RelatedTools";
import FaqSchema from "@/components/seo/FaqSchema";

const DIET_PRESETS = [
  { name: "Balanced", carbs: 40, protein: 30, fat: 30, description: "General health & fitness" },
  { name: "Low Carb", carbs: 25, protein: 40, fat: 35, description: "Reduced carbohydrate intake" },
  { name: "High Protein", carbs: 30, protein: 40, fat: 30, description: "Muscle building & recovery" },
  { name: "Keto", carbs: 5, protein: 25, fat: 70, description: "Very low carb, high fat" },
  { name: "Zone (40/30/30)", carbs: 40, protein: 30, fat: 30, description: "Zone diet balance" },
  { name: "Custom", carbs: 0, protein: 0, fat: 0, description: "Set your own ratios" },
];

const faqs = [
  {
    question: "What are macronutrients and why do they matter?",
    answer:
      "Macronutrients are the three main nutrients your body needs in large amounts: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g). Each plays a unique role — protein builds and repairs tissue, carbs provide energy, and fats support hormones and cell function. The ratio you eat them in affects body composition, energy levels, and overall health.",
  },
  {
    question: "How do I choose the right macro ratio?",
    answer:
      "Your ideal macro ratio depends on your goals. For general health, a balanced 40/30/30 (carbs/protein/fat) works well. For muscle building, increase protein to 35-40%. For fat loss, moderate carbs (25-35%) with higher protein helps preserve muscle. For keto, drastically reduce carbs to 5-10%. Start with a preset and adjust based on how you feel and your results.",
  },
  {
    question: "How many meals should I split my macros into?",
    answer:
      "Research shows meal frequency has minimal impact on body composition when total daily intake is the same. However, 3-5 meals per day is practical for most people. If building muscle, spreading protein across 4-5 meals (20-40g per meal) may optimize muscle protein synthesis. Choose a meal frequency that fits your lifestyle and helps you hit your daily targets.",
  },
  {
    question: "Should I track macros or just calories?",
    answer:
      "Tracking macros is more precise than tracking calories alone. Two diets with the same calories but different macro ratios can produce very different results. Adequate protein preserves muscle during fat loss, sufficient fat supports hormones, and appropriate carbs fuel performance. If you only track one thing, prioritize protein intake, then adjust carbs and fat to preference.",
  },
];

export default function MacroCalculatorPage() {
  const [calories, setCalories] = useState("");
  const [selectedPreset, setSelectedPreset] = useState(0);
  const [customCarbs, setCustomCarbs] = useState(40);
  const [customProtein, setCustomProtein] = useState(30);
  const [customFat, setCustomFat] = useState(30);
  const [meals, setMeals] = useState(3);
  const [calculated, setCalculated] = useState(false);
  const [results, setResults] = useState<{
    totalCal: number;
    carbs: { pct: number; grams: number; cal: number; perMeal: number };
    protein: { pct: number; grams: number; cal: number; perMeal: number };
    fat: { pct: number; grams: number; cal: number; perMeal: number };
    meals: number;
  } | null>(null);

  const isCustom = selectedPreset === DIET_PRESETS.length - 1;

  const getActiveRatios = () => {
    if (isCustom) return { carbs: customCarbs, protein: customProtein, fat: customFat };
    const p = DIET_PRESETS[selectedPreset];
    return { carbs: p.carbs, protein: p.protein, fat: p.fat };
  };

  const customTotal = customCarbs + customProtein + customFat;

  const calculate = () => {
    const cal = parseInt(calories);
    if (!cal || cal < 100) return;

    const ratios = getActiveRatios();
    const total = ratios.carbs + ratios.protein + ratios.fat;
    if (total !== 100) return;

    const carbsCal = Math.round(cal * ratios.carbs / 100);
    const proteinCal = Math.round(cal * ratios.protein / 100);
    const fatCal = Math.round(cal * ratios.fat / 100);

    setResults({
      totalCal: cal,
      carbs: { pct: ratios.carbs, grams: Math.round(carbsCal / 4), cal: carbsCal, perMeal: Math.round(carbsCal / 4 / meals) },
      protein: { pct: ratios.protein, grams: Math.round(proteinCal / 4), cal: proteinCal, perMeal: Math.round(proteinCal / 4 / meals) },
      fat: { pct: ratios.fat, grams: Math.round(fatCal / 9), cal: fatCal, perMeal: Math.round(fatCal / 9 / meals) },
      meals,
    });
    setCalculated(true);
  };

  const reset = () => {
    setCalories(""); setSelectedPreset(0); setCustomCarbs(40); setCustomProtein(30); setCustomFat(30);
    setMeals(3); setCalculated(false); setResults(null);
  };

  const getResultsText = () => {
    if (!results) return "";
    let text = "Macro Calculator Results\n\n";
    text += "Daily Calorie Target: " + results.totalCal + " cal\n\n";
    text += "Macronutrient Breakdown:\n";
    text += "  Protein: " + results.protein.grams + "g (" + results.protein.pct + "% - " + results.protein.cal + " cal)\n";
    text += "  Carbs: " + results.carbs.grams + "g (" + results.carbs.pct + "% - " + results.carbs.cal + " cal)\n";
    text += "  Fat: " + results.fat.grams + "g (" + results.fat.pct + "% - " + results.fat.cal + " cal)\n";
    text += "\nPer Meal (" + results.meals + " meals):\n";
    text += "  Protein: " + results.protein.perMeal + "g | Carbs: " + results.carbs.perMeal + "g | Fat: " + results.fat.perMeal + "g";
    return text;
  };

  return (
    <>
      <FaqSchema faqs={faqs} />

      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--color-text)", marginBottom: "0.5rem" }}>
          Macro Calculator
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "1.0625rem", marginBottom: "1.5rem", lineHeight: 1.6 }}>
          Calculate your daily macronutrient targets based on your calorie goal. Choose from preset diet plans or create custom ratios with meal distribution.
        </p>

        <AdSlot slot="leaderboard" />

        {/* Calculator Form */}
        <div className="card" style={{ marginBottom: "1.5rem" }}>
          {/* Calorie Target */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="label" htmlFor="calories">Daily Calorie Target</label>
            <input id="calories" type="number" className="input-field" placeholder="e.g. 2000" value={calories} onChange={(e) => setCalories(e.target.value)} min="100" style={{ maxWidth: "250px" }} />
            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>Use our <a href="/calorie-calculator" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>Calorie Calculator</a> or <a href="/tdee-calculator" style={{ color: "var(--color-primary)", textDecoration: "underline" }}>TDEE Calculator</a> to find your target.</p>
          </div>

          {/* Diet Presets */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="label">Diet Plan</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "0.5rem" }}>
              {DIET_PRESETS.map((preset, i) => (
                <button key={preset.name} onClick={() => setSelectedPreset(i)} style={{ padding: "0.75rem", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: selectedPreset === i ? "var(--color-primary)" : "var(--color-border)", backgroundColor: selectedPreset === i ? "var(--color-primary-bg)" : "var(--color-surface)", cursor: "pointer", textAlign: "left", transition: "all 0.2s" }}>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: selectedPreset === i ? "var(--color-primary)" : "var(--color-text)" }}>{preset.name}</div>
                  {preset.name !== "Custom" && (
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.125rem" }}>{preset.carbs}/{preset.protein}/{preset.fat}</div>
                  )}
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", marginTop: "0.125rem" }}>{preset.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Sliders */}
          {isCustom && (
            <div style={{ marginBottom: "1.5rem", padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--color-text)" }}>Custom Ratios</span>
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: customTotal === 100 ? "var(--color-primary)" : "#DC2626" }}>Total: {customTotal}%{customTotal !== 100 ? " (must be 100%)" : " ✓"}</span>
              </div>
              {[
                { label: "Carbs", value: customCarbs, setter: setCustomCarbs, color: "#3B82F6" },
                { label: "Protein", value: customProtein, setter: setCustomProtein, color: "#059669" },
                { label: "Fat", value: customFat, setter: setCustomFat, color: "#F59E0B" },
              ].map((s) => (
                <div key={s.label} style={{ marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.25rem" }}>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-secondary)" }}>{s.label}</span>
                    <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: s.color }}>{s.value}%</span>
                  </div>
                  <input type="range" min="0" max="100" value={s.value} onChange={(e) => s.setter(parseInt(e.target.value))} style={{ width: "100%", accentColor: s.color }} />
                </div>
              ))}
            </div>
          )}

          {/* Meal Distribution */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label className="label">Number of Meals</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              {[3, 4, 5, 6].map((m) => (
                <button key={m} onClick={() => setMeals(m)} style={{ padding: "0.5rem 1.25rem", borderRadius: "var(--radius-md)", border: "1px solid", borderColor: meals === m ? "var(--color-primary)" : "var(--color-border)", backgroundColor: meals === m ? "var(--color-primary-bg)" : "var(--color-surface)", color: meals === m ? "var(--color-primary)" : "var(--color-text)", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}>
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={calculate}>Calculate Macros</button>
            <button className="btn-secondary" onClick={reset}>Clear / Reset</button>
          </div>
        </div>

        {/* Results */}
        {calculated && results && (
          <div className="card" style={{ marginBottom: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.5rem" }}>
              <h2 style={{ fontSize: "1.25rem", fontWeight: 700, color: "var(--color-text)" }}>Your Macro Targets</h2>
              <CopyButton text={getResultsText()} />
            </div>

            {/* Calorie summary */}
            <div style={{ textAlign: "center", marginBottom: "1.5rem", padding: "1rem", backgroundColor: "var(--color-primary-bg)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-primary)" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--color-primary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Daily Calorie Target</div>
              <div style={{ fontSize: "2rem", fontWeight: 800, color: "var(--color-primary)" }}>{results.totalCal.toLocaleString()}</div>
              <div style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>calories per day</div>
            </div>

            {/* CSS Pie Chart */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "1.5rem" }}>
              <div style={{ position: "relative", width: "180px", height: "180px" }}>
                <div style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  background: `conic-gradient(
                    #3B82F6 0% ${results.carbs.pct}%,
                    #059669 ${results.carbs.pct}% ${results.carbs.pct + results.protein.pct}%,
                    #F59E0B ${results.carbs.pct + results.protein.pct}% 100%
                  )`,
                }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "100px", height: "100px", borderRadius: "50%", backgroundColor: "var(--color-surface)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontSize: "1.125rem", fontWeight: 800, color: "var(--color-text)" }}>{results.totalCal}</div>
                  <div style={{ fontSize: "0.625rem", color: "var(--color-text-muted)" }}>cal/day</div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
              {[
                { label: "Carbs", color: "#3B82F6", pct: results.carbs.pct },
                { label: "Protein", color: "#059669", pct: results.protein.pct },
                { label: "Fat", color: "#F59E0B", pct: results.fat.pct },
              ].map((l) => (
                <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
                  <div style={{ width: "0.75rem", height: "0.75rem", borderRadius: "2px", backgroundColor: l.color }} />
                  <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)", fontWeight: 500 }}>{l.label} ({l.pct}%)</span>
                </div>
              ))}
            </div>

            {/* Macro detail cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.75rem", marginBottom: "1.5rem" }}>
              {[
                { label: "Carbs", data: results.carbs, color: "#3B82F6", calPerG: 4 },
                { label: "Protein", data: results.protein, color: "#059669", calPerG: 4 },
                { label: "Fat", data: results.fat, color: "#F59E0B", calPerG: 9 },
              ].map((m) => (
                <div key={m.label} style={{ padding: "1rem", backgroundColor: "var(--color-surface-alt)", borderRadius: "var(--radius-md)", border: "1px solid var(--color-border-light)", textAlign: "center", borderTop: `3px solid ${m.color}` }}>
                  <div style={{ fontSize: "0.6875rem", fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.25rem" }}>{m.label}</div>
                  <div style={{ fontSize: "1.5rem", fontWeight: 800, color: m.color }}>{m.data.grams}g</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{m.data.cal} cal ({m.data.pct}%)</div>
                  <div style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>{m.calPerG} cal per gram</div>
                </div>
              ))}
            </div>

            {/* Meal Distribution */}
            <div style={{ marginBottom: "1rem" }}>
              <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "var(--color-text)", marginBottom: "0.75rem" }}>Meal Distribution ({results.meals} meals/day)</h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                      <th style={{ textAlign: "left", padding: "0.5rem", color: "var(--color-text)", fontWeight: 600 }}>Meal</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "#059669", fontWeight: 600 }}>Protein</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "#3B82F6", fontWeight: 600 }}>Carbs</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "#F59E0B", fontWeight: 600 }}>Fat</th>
                      <th style={{ textAlign: "right", padding: "0.5rem", color: "var(--color-text)", fontWeight: 600 }}>Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: results.meals }, (_, i) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--color-border-light)" }}>
                        <td style={{ padding: "0.5rem", fontWeight: 500, color: "var(--color-text)" }}>Meal {i + 1}</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--color-text-secondary)" }}>{results.protein.perMeal}g</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--color-text-secondary)" }}>{results.carbs.perMeal}g</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", color: "var(--color-text-secondary)" }}>{results.fat.perMeal}g</td>
                        <td style={{ textAlign: "right", padding: "0.5rem", fontWeight: 600, color: "var(--color-text)" }}>{Math.round(results.totalCal / results.meals)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
            How to Calculate Your Macros
          </h2>
          <div style={{ color: "var(--color-text-secondary)", fontSize: "0.9375rem", lineHeight: 1.8 }}>
            <p style={{ marginBottom: "1rem" }}>
              Macronutrient calculation is the process of determining how many grams of protein, carbohydrates, and fat you should eat each day to reach your health and fitness goals. Unlike simple calorie counting, tracking macros ensures you get the right balance of nutrients &mdash; not just the right amount of energy. This approach, often called &ldquo;flexible dieting&rdquo; or &ldquo;IIFYM&rdquo; (If It Fits Your Macros), has become one of the most popular and effective nutrition strategies.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 1 &mdash; Determine Your Calories:</strong> Before calculating macros, you need a daily calorie target. Use our Calorie Calculator or TDEE Calculator to find your maintenance calories, then adjust based on your goal. For fat loss, subtract 300-500 calories. For muscle gain, add 200-400 calories. For maintenance, use your TDEE directly.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 2 &mdash; Choose Your Ratio:</strong> The three macronutrients provide different amounts of energy: protein has 4 calories per gram, carbohydrates have 4 calories per gram, and fat has 9 calories per gram. A balanced diet typically uses a 40/30/30 split (carbs/protein/fat). For muscle building, increase protein to 35-40%. For keto, reduce carbs to 5-10% and increase fat to 65-75%.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 3 &mdash; Calculate Grams:</strong> Once you have your calorie target and ratio, the math is simple. Multiply your total calories by each percentage, then divide by the calories per gram. For example, on a 2,000-calorie diet with 30% protein: 2,000 x 0.30 = 600 calories from protein, divided by 4 = 150 grams of protein per day.
            </p>
            <p style={{ marginBottom: "1rem" }}>
              <strong>Step 4 &mdash; Distribute Across Meals:</strong> Divide your daily macro targets evenly across your meals. While total daily intake matters most, spreading protein across 3-5 meals may optimize muscle protein synthesis. Our calculator automatically divides your macros across your chosen number of meals.
            </p>
            <p>
              <strong>Practical Tips:</strong> Start by hitting your protein target first &mdash; it is the most important macro for body composition. Use a food tracking app for the first few weeks to build awareness. Allow flexibility &mdash; being within 5-10 grams of each target is perfectly fine. Reassess your macros every 4-6 weeks as your body and goals change.
            </p>
          </div>
        </div>

        <AdSlot slot="in-content" />

        <div style={{ marginBottom: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--color-text)", marginBottom: "1rem" }}>Frequently Asked Questions</h2>
          <FAQ items={faqs} />
        </div>

        <RelatedTools current="/macro-calculator" />
        <AdSlot slot="footer" />
      </div>
    </>
  );
}
