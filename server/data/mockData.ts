import { SeasonalProduceItem, ProduceInspection, VisualScanResult, ShoppingListItem } from '../../src/types/produce';

export const INITIAL_SEASONAL_PRODUCE: SeasonalProduceItem[] = [
  {
    id: 'prod-1',
    name: 'Tomato (Heirloom & Roma)',
    category: 'Solanaceae (Nightshades)',
    peakMonths: [6, 7, 8, 9, 10], // June - October
    currentSeasonStatus: 'Peak Harvest',
    priceTrend: 'Bargain',
    flavorPeakIndex: 96,
    originInsights: 'Local vine-ripened crops from regional organic farms',
    selectionTip: 'Look for heavy density, aromatic blossom end, and firm shoulder with skin tautness.',
    icon: '🍅',
    avgPricePerLbUsd: 2.49
  },
  {
    id: 'prod-2',
    name: 'Bell Pepper (Red & Yellow)',
    category: 'Solanaceae (Nightshades)',
    peakMonths: [7, 8, 9, 10, 11], // July - November
    currentSeasonStatus: 'Peak Harvest',
    priceTrend: 'Fair Market',
    flavorPeakIndex: 92,
    originInsights: 'Field-grown bell peppers with high natural sugar concentration',
    selectionTip: 'Choose firm 4-lobed peppers for raw slicing, 3-lobed for cooking/stuffing.',
    icon: '🫑',
    avgPricePerLbUsd: 2.99
  },
  {
    id: 'prod-3',
    name: 'Hass Avocado',
    category: 'Solanaceae (Nightshades)',
    peakMonths: [4, 5, 6, 7, 8, 9], // April - September
    currentSeasonStatus: 'Late Season',
    priceTrend: 'Fair Market',
    flavorPeakIndex: 88,
    originInsights: 'Rich oil content (18%+), ideal creamy texture for guacamole and salads',
    selectionTip: 'Check button stem under cap: emerald green indicates perfect ripeness; brown indicates overripe.',
    icon: '🥑',
    avgPricePerLbUsd: 1.89
  },
  {
    id: 'prod-4',
    name: 'Eggplant (Globe & Japanese)',
    category: 'Solanaceae (Nightshades)',
    peakMonths: [7, 8, 9, 10], // July - October
    currentSeasonStatus: 'Peak Harvest',
    priceTrend: 'Bargain',
    flavorPeakIndex: 94,
    originInsights: 'Low seed bitterness in peak harvest batches',
    selectionTip: 'Smooth glossy skin with slight rebound thumb dent. Dull skin signals spongy bitter flesh.',
    icon: '🍆',
    avgPricePerLbUsd: 1.99
  },
  {
    id: 'prod-5',
    name: 'Zucchini & Summer Squash',
    category: 'Cucurbits',
    peakMonths: [6, 7, 8, 9], // June - September
    currentSeasonStatus: 'Peak Harvest',
    priceTrend: 'Bargain',
    flavorPeakIndex: 95,
    originInsights: 'Abundant local small-to-medium harvests with tight seed cavity',
    selectionTip: 'Select small (6-8 inches) with vibrant green skin. Large oversized squashes are watery and seedy.',
    icon: '🥒',
    avgPricePerLbUsd: 1.49
  },
  {
    id: 'prod-6',
    name: 'Fresh Spinach & Tuscan Kale',
    category: 'Leafy Greens',
    peakMonths: [3, 4, 5, 10, 11, 12], // Spring & Autumn
    currentSeasonStatus: 'Peak Harvest',
    priceTrend: 'Bargain',
    flavorPeakIndex: 91,
    originInsights: 'Cool weather yields sweet, crisp leaves without stem bitterness',
    selectionTip: 'Look for deep emerald leaves without yellowing edges or slimy stems.',
    icon: '🥬',
    avgPricePerLbUsd: 2.79
  },
  {
    id: 'prod-7',
    name: 'Broccoli & Crown Cauliflower',
    category: 'Brassicas',
    peakMonths: [10, 11, 12, 1, 2, 3, 4], // Autumn to Spring
    currentSeasonStatus: 'Early Season',
    priceTrend: 'Fair Market',
    flavorPeakIndex: 89,
    originInsights: 'Tight florets with high sulforaphane density and sweet stalk core',
    selectionTip: 'Choose tight blue-green curd buds. Yellowing florets signal bitter overripe brassicas.',
    icon: '🥦',
    avgPricePerLbUsd: 2.19
  },
  {
    id: 'prod-8',
    name: 'Rainbow Carrots & Parsnips',
    category: 'Root Vegetables',
    peakMonths: [9, 10, 11, 12, 1, 2], // Autumn & Winter
    currentSeasonStatus: 'Peak Harvest',
    priceTrend: 'Bargain',
    flavorPeakIndex: 97,
    originInsights: 'Post-frost soil curing converts root starches to rich natural sugars',
    selectionTip: 'Firm smooth skin with vibrant orange/purple hues. Avoid limp or rubbery roots.',
    icon: '🥕',
    avgPricePerLbUsd: 1.69
  }
];

export const INITIAL_INSPECTIONS: ProduceInspection[] = [
  {
    id: 'insp-101',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    vegetableName: 'Roma Tomato',
    intendedRecipe: 'Authentic Slow-Simmered Italian Marinara',
    cookingTechnique: 'Slow Simmering',
    maxBudgetUsd: 5.00,
    storeProfile: {
      storeType: 'Farmers Market',
      locationRegion: 'California Central Valley',
      isOrganicPreferred: true
    },
    sensoryInputs: {
      skinTautness: 9,
      colorIntensity: 9,
      blemishCount: 1,
      firmnessScore: 8,
      scentProfile: 'Aromatic/Peak',
      weightDensity: 'Heavy for Size'
    },
    imageUrl: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=600&auto=format&fit=crop',
    aiAnalysis: {
      suitabilityScore: 94,
      qualityTier: 'Peak Quality',
      summaryVerdict: 'Exceptional candidate for slow-simmered marinara. High pectin-to-water ratio will yield a thick, rich sauce without excessive reduction time.',
      recommendedVarieties: [
        { varietyName: 'San Marzano Roma', suitabilityPct: 98, reason: 'Low seed cavity density, thick flesh wall, naturally sweet acidity.', bestCulinaryUse: 'Passata & Pasta Sauce' },
        { varietyName: 'Roma Plum', suitabilityPct: 92, reason: 'Dense paste tomato with low water content.', bestCulinaryUse: 'Canned & Slow Cooked Sauce' },
        { varietyName: 'Beefsteak (Alternative)', suitabilityPct: 65, reason: 'Too watery; requires 45 mins additional reduction.', bestCulinaryUse: 'Raw Sandwich Slices' }
      ],
      disqualifyingFactors: [],
      sensoryDiagnostic: {
        freshnessIndex: 95,
        moistureLevel: 'Optimal Low Moisture (86%)',
        sugarAcidBalance: 'Brix 6.2 (High Natural Sweetness)',
        decayWarning: 'None detected'
      },
      storageGuide: {
        shelfLifeDays: 6,
        optimalLocation: 'Countertop (Room Temp)',
        ethyleneSensitivity: 'Ethylene Producer',
        quickSalvageTip: 'If skin starts softening after 5 days, roast with garlic & olive oil then freeze in airtight jar.'
      },
      costRoi: {
        edibleYieldPct: 92,
        costPerUsablePortion: 2.16,
        financialRating: 'Great Value',
        wasteSavedUsd: 1.40
      }
    }
  },
  {
    id: 'insp-102',
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(),
    vegetableName: 'Bell Pepper (Green)',
    intendedRecipe: 'Crispy High-Heat Vegetable Stir-fry',
    cookingTechnique: 'Quick Stir-fry',
    maxBudgetUsd: 3.50,
    storeProfile: {
      storeType: 'Supermarket',
      locationRegion: 'Midwest US',
      isOrganicPreferred: false
    },
    sensoryInputs: {
      skinTautness: 6,
      colorIntensity: 7,
      blemishCount: 3,
      firmnessScore: 5,
      scentProfile: 'Subtle',
      weightDensity: 'Light/Hollow'
    },
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop',
    aiAnalysis: {
      suitabilityScore: 68,
      qualityTier: 'Acceptable with Caution',
      summaryVerdict: 'Slight loss of skin tautness indicates reduced cell wall turgor pressure. Will soften quickly in stir-fry instead of keeping signature crunch.',
      recommendedVarieties: [
        { varietyName: 'Red Bell Pepper (Peak)', suitabilityPct: 91, reason: 'Higher sugar content caramelizes better in high heat stir-fry.', bestCulinaryUse: 'Stir-fry & Fajitas' },
        { varietyName: 'Green Bell Pepper', suitabilityPct: 68, reason: 'Slightly wilted, will release excess moisture into wok.', bestCulinaryUse: 'Soups & Stews' }
      ],
      disqualifyingFactors: [
        'Reduced cellular turgor pressure will result in soggy wok texture',
        'Light weight density signals dry inner wall'
      ],
      sensoryDiagnostic: {
        freshnessIndex: 65,
        moistureLevel: 'Uneven cellular water loss',
        sugarAcidBalance: 'Low Sugars (Grassiness predominant)',
        decayWarning: 'Minor surface softening near stem'
      },
      storageGuide: {
        shelfLifeDays: 3,
        optimalLocation: 'Refrigerator Crisper Drawer',
        ethyleneSensitivity: 'Ethylene Sensitive',
        quickSalvageTip: 'Slice into thin strips and sauté immediately into a fajita base.'
      },
      costRoi: {
        edibleYieldPct: 78,
        costPerUsablePortion: 3.10,
        financialRating: 'Fair Price',
        wasteSavedUsd: 0.75
      }
    }
  }
];

export const INITIAL_VISUAL_SCANS: VisualScanResult[] = [
  {
    id: 'scan-201',
    timestamp: new Date().toISOString(),
    vegetableIdentified: 'Tuscan Kale (Lacinato)',
    ripenessStage: 'Peak Ripeness',
    confidenceScore: 97,
    freshnessGrade: 'A+',
    detectedDefects: [
      { type: 'Minor stem dryness', severity: 'Low', description: 'Cut end shows slight oxidation, leaf body is fully intact and turgid.' }
    ],
    storageRecommendation: 'Wrap in damp paper towel inside a perforated silicone bag in crisper drawer (7-9 days).',
    recommendedRecipes: ['Crispy Garlic Kale Chips', 'Tuscan White Bean & Kale Soup', 'Massaged Raw Kale Salad with Lemon'],
    imageUrl: 'https://images.unsplash.com/photo-1524179091864-5a21ff461284?w=600&auto=format&fit=crop',
    nutritionalHighlights: ['Rich in Sulforaphane', 'High Vitamin K & C', 'Potent Polyphenol Anti-oxidants']
  }
];

export const INITIAL_SHOPPING_LIST: ShoppingListItem[] = [
  {
    id: 'shop-1',
    vegetableName: 'San Marzano Roma Tomatoes',
    variety: 'Roma / Paste',
    quantity: '3 lbs',
    targetRecipe: 'Sunday Bolognese Sauce',
    qualityNote: 'Select heavy, deep red tomatoes with intact green stems.',
    completed: false,
    estimatedCost: 7.47
  },
  {
    id: 'shop-2',
    vegetableName: 'Baby Spinach',
    variety: 'Savoy Leaf',
    quantity: '1 container (16 oz)',
    targetRecipe: 'Green Smoothie & Omelet',
    qualityNote: 'Dry leaves without moisture accumulation at bottom of box.',
    completed: true,
    estimatedCost: 3.99
  },
  {
    id: 'shop-3',
    vegetableName: 'Yellow Bell Peppers',
    variety: 'Sweet Bell',
    quantity: '4 count',
    targetRecipe: 'Stuffed Roasted Peppers',
    qualityNote: '4-lobed firm base for stability while baking.',
    completed: false,
    estimatedCost: 5.00
  }
];
