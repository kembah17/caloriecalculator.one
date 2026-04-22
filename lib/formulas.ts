// Unit conversion constants
export const LB_TO_KG = 0.453592;
export const IN_TO_CM = 2.54;
export const FT_TO_CM = 30.48;

// Activity multipliers
export const ACTIVITY_LEVELS = [
  { key: "sedentary", label: "Sedentary", description: "Little or no exercise, desk job", multiplier: 1.2 },
  { key: "light", label: "Lightly Active", description: "Light exercise 1-3 days/week", multiplier: 1.375 },
  { key: "moderate", label: "Moderately Active", description: "Moderate exercise 3-5 days/week", multiplier: 1.55 },
  { key: "active", label: "Very Active", description: "Hard exercise 6-7 days/week", multiplier: 1.725 },
  { key: "extra", label: "Extra Active", description: "Very hard exercise + physical job", multiplier: 1.9 },
] as const;

// Goal adjustments (calories per day)
export const GOALS = [
  { key: "lose-extreme", label: "Lose weight (1 kg/week)", adjustment: -1000 },
  { key: "lose-moderate", label: "Lose weight (0.5 kg/week)", adjustment: -500 },
  { key: "lose-mild", label: "Lose weight (0.25 kg/week)", adjustment: -250 },
  { key: "maintain", label: "Maintain weight", adjustment: 0 },
  { key: "gain-mild", label: "Gain weight (0.25 kg/week)", adjustment: 250 },
  { key: "gain-moderate", label: "Gain weight (0.5 kg/week)", adjustment: 500 },
] as const;

// Diet presets (protein%, carbs%, fat%)
export const DIET_PRESETS = [
  { key: "balanced", label: "Balanced", protein: 30, carbs: 40, fat: 30, description: "A well-rounded approach suitable for most people" },
  { key: "low-carb", label: "Low Carb", protein: 40, carbs: 25, fat: 35, description: "Reduced carbohydrates for fat loss" },
  { key: "high-protein", label: "High Protein", protein: 40, carbs: 30, fat: 30, description: "Extra protein for muscle building and recovery" },
  { key: "keto", label: "Ketogenic", protein: 25, carbs: 5, fat: 70, description: "Very low carb, high fat for ketosis" },
  { key: "zone", label: "Zone Diet (40/30/30)", protein: 30, carbs: 40, fat: 30, description: "The Zone Diet balanced macro approach" },
] as const;

export type Gender = "male" | "female";

/**
 * Convert imperial to metric
 */
export function lbsToKg(lbs: number): number {
  return lbs * LB_TO_KG;
}

export function feetInchesToCm(feet: number, inches: number): number {
  return feet * FT_TO_CM + inches * IN_TO_CM;
}

/**
 * Mifflin-St Jeor Equation (most accurate for most people)
 * Male: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) + 5
 * Female: BMR = (10 × weight_kg) + (6.25 × height_cm) - (5 × age) - 161
 */
export function mifflinStJeor(weightKg: number, heightCm: number, age: number, gender: Gender): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * age;
  return gender === "male" ? base + 5 : base - 161;
}

/**
 * Revised Harris-Benedict Equation
 * Male: BMR = (13.397 × weight_kg) + (4.799 × height_cm) - (5.677 × age) + 88.362
 * Female: BMR = (9.247 × weight_kg) + (3.098 × height_cm) - (4.330 × age) + 447.593
 */
export function harrisBenedict(weightKg: number, heightCm: number, age: number, gender: Gender): number {
  if (gender === "male") {
    return 13.397 * weightKg + 4.799 * heightCm - 5.677 * age + 88.362;
  }
  return 9.247 * weightKg + 3.098 * heightCm - 4.330 * age + 447.593;
}

/**
 * Katch-McArdle Formula (requires body fat percentage)
 * BMR = 370 + (21.6 × lean_body_mass_kg)
 */
export function katchMcArdle(weightKg: number, bodyFatPercent: number): number {
  const leanMass = weightKg * (1 - bodyFatPercent / 100);
  return 370 + 21.6 * leanMass;
}

/**
 * Calculate TDEE from BMR and activity level
 */
export function calculateTDEE(bmr: number, activityMultiplier: number): number {
  return bmr * activityMultiplier;
}

/**
 * Calculate macros from calories
 */
export function calculateMacros(
  calories: number,
  proteinPercent: number,
  carbsPercent: number,
  fatPercent: number
): { proteinGrams: number; carbsGrams: number; fatGrams: number; proteinCals: number; carbsCals: number; fatCals: number } {
  const proteinCals = calories * (proteinPercent / 100);
  const carbsCals = calories * (carbsPercent / 100);
  const fatCals = calories * (fatPercent / 100);

  return {
    proteinGrams: Math.round(proteinCals / 4),
    carbsGrams: Math.round(carbsCals / 4),
    fatGrams: Math.round(fatCals / 9),
    proteinCals: Math.round(proteinCals),
    carbsCals: Math.round(carbsCals),
    fatCals: Math.round(fatCals),
  };
}

/**
 * Distribute macros across meals
 */
export function distributeMeals(
  proteinGrams: number,
  carbsGrams: number,
  fatGrams: number,
  totalCalories: number,
  mealCount: number
): { protein: number; carbs: number; fat: number; calories: number }[] {
  return Array.from({ length: mealCount }, () => ({
    protein: Math.round(proteinGrams / mealCount),
    carbs: Math.round(carbsGrams / mealCount),
    fat: Math.round(fatGrams / mealCount),
    calories: Math.round(totalCalories / mealCount),
  }));
}
