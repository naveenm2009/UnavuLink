/**
 * GEMINI AI INTEGRATION SERVICE — UNAVULINK
 * Provides:
 * 1. AI-assisted Food Image Understanding & Field Extraction
 * 2. Food Waste Intelligence & Predictive Surplus Estimations
 * 3. Food Safety Allergen & Missing-Information Gate Check
 * 
 * Safety Rule: AI draft fields MUST be confirmed by the human donor.
 * AI never automatically certifies food safety.
 */

export interface FoodImageAnalysisResult {
  suggestedFoodName: string;
  suggestedCategory: 'cooked_meals' | 'bakery_items' | 'raw_produce' | 'dairy' | 'packaged_groceries' | 'buffet_spread';
  suggestedDietary: 'veg' | 'non_veg' | 'vegan' | 'halal' | 'jain';
  estimatedPortions: number;
  identifiedIngredients: string[];
  suggestedAllergens: string[];
  suggestedStorageCondition: 'ambient' | 'refrigerated' | 'hot_holding' | 'frozen';
  safetyConfidenceScore: number;
  aiNotes: string;
}

export async function analyzeFoodImageWithGemini(
  imageSource: string | File
): Promise<FoodImageAnalysisResult> {
  // Simulate AI model inference latency (1.2 seconds)
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Determine realistic simulated extraction based on context
  return {
    suggestedFoodName: 'Fresh South Indian Buffet Rice, Sambar & Vegetable Poriyal',
    suggestedCategory: 'cooked_meals',
    suggestedDietary: 'veg',
    estimatedPortions: 95,
    identifiedIngredients: [
      'Rice (Sona Masoori)',
      'Toor Dal',
      'Carrots',
      'Beans',
      'Potatoes',
      'Mustard seeds',
      'Curry leaves',
    ],
    suggestedAllergens: ['mustard'],
    suggestedStorageCondition: 'hot_holding',
    safetyConfidenceScore: 92,
    aiNotes:
      'Gemini Vision detected freshly cooked steamed rice and lentil stew in commercial stainless containers. No visible signs of discoloration or surface film. Hot-holding recommended above 60°C.',
  };
}

export interface SurplusPredictionResult {
  eventType: string;
  expectedAttendance: number;
  predictedSurplusKgRange: [number, number];
  predictedMealsRange: [number, number];
  spoilageRiskHours: number;
  recommendedRescueWindow: string;
  wastePreventionTips: string[];
}

export function predictEventSurplus(
  eventType: string,
  attendance: number,
  mealType: string
): SurplusPredictionResult {
  // Rule-based deterministic predictive model for Tamil Nadu event catering
  let surplusRatePerPerson = 0.08; // 80g surplus per person average in Indian weddings
  if (eventType.toLowerCase().includes('wedding') || eventType.toLowerCase().includes('reception')) {
    surplusRatePerPerson = 0.12;
  } else if (eventType.toLowerCase().includes('hostel') || eventType.toLowerCase().includes('mess')) {
    surplusRatePerPerson = 0.05;
  }

  const baselineKg = attendance * surplusRatePerPerson;
  const minKg = Number((baselineKg * 0.75).toFixed(1));
  const maxKg = Number((baselineKg * 1.35).toFixed(1));

  const minMeals = Math.round(minKg * 2.5);
  const maxMeals = Math.round(maxKg * 2.5);

  return {
    eventType,
    expectedAttendance: attendance,
    predictedSurplusKgRange: [minKg, maxKg],
    predictedMealsRange: [minMeals, maxMeals],
    spoilageRiskHours: mealType === 'cooked_meals' ? 4 : 24,
    recommendedRescueWindow: 'Within 2 hours of dining closure (21:30 - 23:30)',
    wastePreventionTips: [
      'Stagger second-batch preparation for late arrivals during reception.',
      'Pre-pack cooked surplus into sealed 10L thermal bins immediately upon buffet conclusion.',
      'Designate a volunteer coordinator before the event begins to expedite UnavuLink dispatch.',
    ],
  };
}
