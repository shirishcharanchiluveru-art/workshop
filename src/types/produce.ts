export interface StoreProfile {
  storeType: 'Farmers Market' | 'Supermarket' | 'Organic Co-op' | 'Wholesale Club' | 'Specialty Grocer';
  locationRegion: string;
  isOrganicPreferred: boolean;
}

export interface SensoryInputs {
  skinTautness: number; // 1-10
  colorIntensity: number; // 1-10
  blemishCount: number; // count
  firmnessScore: number; // 1-10
  scentProfile: 'Weak/None' | 'Subtle' | 'Aromatic/Peak' | 'Fermented/Off';
  weightDensity: 'Light/Hollow' | 'Average' | 'Heavy for Size';
}

export interface VarietalRecommendation {
  varietyName: string;
  suitabilityPct: number;
  reason: string;
  bestCulinaryUse: string;
}

export interface SensoryDiagnostic {
  freshnessIndex: number; // 0-100
  moistureLevel: string;
  sugarAcidBalance: string;
  decayWarning?: string;
  waxOrTreatmentDetected?: boolean;
}

export interface StorageGuide {
  shelfLifeDays: number;
  optimalLocation: 'Countertop (Room Temp)' | 'Refrigerator Crisper Drawer' | 'Cool Dark Pantry' | 'Water Jar Bath';
  ethyleneSensitivity: 'Ethylene Producer' | 'Ethylene Sensitive' | 'Neutral';
  quickSalvageTip: string;
}

export interface CostRoi {
  edibleYieldPct: number; // e.g. 85%
  costPerUsablePortion: number; // e.g. $2.15 / lb
  financialRating: 'Great Value' | 'Fair Price' | 'Overpriced Out-of-Season';
  wasteSavedUsd: number;
}

export interface AIAnalysisReport {
  suitabilityScore: number; // 0-100
  qualityTier: 'Peak Quality' | 'Good Choice' | 'Acceptable with Caution' | 'Reject / Do Not Buy';
  summaryVerdict: string;
  recommendedVarieties: VarietalRecommendation[];
  disqualifyingFactors: string[];
  sensoryDiagnostic: SensoryDiagnostic;
  storageGuide: StorageGuide;
  costRoi: CostRoi;
}

export interface ProduceInspection {
  id: string;
  createdAt: string;
  vegetableName: string;
  intendedRecipe: string;
  cookingTechnique: string;
  maxBudgetUsd: number;
  storeProfile: StoreProfile;
  sensoryInputs: SensoryInputs;
  imageUrl?: string;
  aiAnalysis: AIAnalysisReport;
}

export interface DetectedDefect {
  type: string;
  severity: 'Low' | 'Moderate' | 'High';
  description: string;
}

export interface VisualScanResult {
  id: string;
  timestamp: string;
  vegetableIdentified: string;
  ripenessStage: 'Unripe' | 'Peak Ripeness' | 'Overripe' | 'Spoiling';
  confidenceScore: number; // 0-100
  freshnessGrade: 'A+' | 'A' | 'B' | 'C' | 'F';
  detectedDefects: DetectedDefect[];
  storageRecommendation: string;
  recommendedRecipes: string[];
  imageUrl: string;
  nutritionalHighlights: string[];
}

export interface SeasonalProduceItem {
  id: string;
  name: string;
  category: 'Solanaceae (Nightshades)' | 'Brassicas' | 'Root Vegetables' | 'Leafy Greens' | 'Cucurbits' | 'Alliums' | 'Legumes';
  peakMonths: number[]; // 1-12
  currentSeasonStatus: 'Peak Harvest' | 'Early Season' | 'Late Season' | 'Out of Season (Imported)';
  priceTrend: 'Bargain' | 'Fair Market' | 'Premium Import';
  flavorPeakIndex: number; // 0-100
  originInsights: string;
  selectionTip: string;
  icon: string;
  avgPricePerLbUsd: number;
}

export interface ShoppingListItem {
  id: string;
  vegetableName: string;
  variety: string;
  quantity: string;
  targetRecipe: string;
  qualityNote: string;
  completed: boolean;
  estimatedCost: number;
}

export interface UserPreferences {
  unitSystem: 'Imperial (lbs, °F)' | 'Metric (kg, °C)';
  defaultStore: string;
  dietaryFocus: 'General' | 'Vegan' | 'Low-FODMAP' | 'Organic Only' | 'Local Farm First';
  preferredModel: 'gemini-2.5-flash' | 'gemini-2.5-pro';
  apiKeyStatus: 'Configured' | 'Missing';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
