import React, { useState } from 'react';
import { DollarSign, Scale, Utensils, TrendingDown, PieChart, Sparkles } from 'lucide-react';

export const YieldCalculator: React.FC = () => {
  const [purchasePriceUsd, setPurchasePriceUsd] = useState<number>(3.49);
  const [purchaseWeightLbs, setPurchaseWeightLbs] = useState<number>(2.5);
  const [wasteType, setWasteType] = useState<'Standard Peel & Stem' | 'Heavy Seed & Thick Skin' | 'Leafy Green Trim' | 'Clean Minimal Waste'>('Standard Peel & Stem');
  const [portionsNeeded, setPortionsNeeded] = useState<number>(4);

  // Waste percentages based on agronomic waste benchmarks
  const wasteMap = {
    'Standard Peel & Stem': 18, // 82% yield
    'Heavy Seed & Thick Skin': 32, // 68% yield
    'Leafy Green Trim': 12, // 88% yield
    'Clean Minimal Waste': 6, // 94% yield
  };

  const wastePct = wasteMap[wasteType];
  const yieldPct = 100 - wastePct;
  const grossUsableLbs = (purchaseWeightLbs * (yieldPct / 100)).toFixed(2);
  const costPerUsableLb = (purchasePriceUsd / Number(grossUsableLbs)).toFixed(2);
  const costPerPortion = (purchasePriceUsd / portionsNeeded).toFixed(2);
  const wasteDollars = (purchasePriceUsd * (wastePct / 100)).toFixed(2);

  return (
    <div className="glass-card rounded-2xl p-6 border border-slate-800">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <PieChart className="w-5 h-5 text-lime-400" />
            Cost-per-Yield & Culinary ROI Predictor
          </h3>
          <p className="text-xs text-slate-400">Calculate actual usable edible portion costs after removing stems, peels, and seeds.</p>
        </div>
        <div className="px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-semibold">
          Financial Agronomy
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Store Purchase Price ($ USD)
            </label>
            <div className="relative">
              <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={purchasePriceUsd}
                onChange={(e) => setPurchasePriceUsd(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-lime-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Total Purchased Weight (lbs / kg)
            </label>
            <div className="relative">
              <Scale className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={purchaseWeightLbs}
                onChange={(e) => setPurchaseWeightLbs(parseFloat(e.target.value) || 0)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-lime-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Vegetable Trim Category
            </label>
            <select
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-lime-500"
            >
              <option value="Standard Peel & Stem">Standard Peel & Stem (Tomatoes, Peppers, Zucchini - ~18% waste)</option>
              <option value="Heavy Seed & Thick Skin">Heavy Seed & Thick Skin (Squash, Melon, Cauliflower Stalk - ~32% waste)</option>
              <option value="Leafy Green Trim">Leafy Green Trim (Kale, Spinach, Lettuce - ~12% waste)</option>
              <option value="Clean Minimal Waste">Clean Minimal Waste (Microgreens, Baby Carrots - ~6% waste)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Recipe Portions (People)
            </label>
            <div className="relative">
              <Utensils className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="number"
                step="1"
                min="1"
                value={portionsNeeded}
                onChange={(e) => setPortionsNeeded(parseInt(e.target.value) || 1)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-100 focus:outline-none focus:border-lime-500"
              />
            </div>
          </div>
        </div>

        {/* Output Metrics */}
        <div className="bg-slate-950/80 rounded-xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Edible Yield</span>
              <span className="text-xl font-bold text-lime-400">{yieldPct}%</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{grossUsableLbs} lbs usable</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">True Cost / Usable Lb</span>
              <span className="text-xl font-bold text-amber-400">${costPerUsableLb}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">${(purchasePriceUsd / purchaseWeightLbs).toFixed(2)} raw tag</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Cost Per Portion</span>
              <span className="text-xl font-bold text-emerald-400">${costPerPortion}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">For {portionsNeeded} servings</span>
            </div>

            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase font-semibold">Trim Waste Value</span>
              <span className="text-xl font-bold text-rose-400">${wasteDollars}</span>
              <span className="text-[10px] text-slate-500 block mt-0.5">{wastePct}% peel & stem loss</span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-lime-950/30 border border-lime-800/40 text-xs text-slate-300">
            <div className="flex items-center gap-1.5 font-semibold text-lime-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Smart Agronomist Tip:</span>
            </div>
            Do not discard stems and peels! Simmer cauliflower stalks and carrot peels with onion skins to make a rich zero-waste vegetable stock (saving up to ~${wasteDollars} per recipe).
          </div>
        </div>
      </div>
    </div>
  );
};
