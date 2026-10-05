import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Utensils, 
  Store, 
  DollarSign, 
  Sliders, 
  Camera, 
  Upload, 
  CheckCircle2, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { createInspection } from '../api/client';

export const ProduceInspectorWizardPage: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [vegetableName, setVegetableName] = useState('Roma Tomato');
  const [intendedRecipe, setIntendedRecipe] = useState('Authentic Slow Italian Marinara Sauce');
  const [cookingTechnique, setCookingTechnique] = useState('Slow Simmering');
  const [storeType, setStoreType] = useState<'Farmers Market' | 'Supermarket' | 'Organic Co-op' | 'Wholesale Club' | 'Specialty Grocer'>('Farmers Market');
  const [locationRegion, setLocationRegion] = useState('California Central Valley');
  const [isOrganicPreferred, setIsOrganicPreferred] = useState(true);
  const [maxBudgetUsd, setMaxBudgetUsd] = useState<number>(5.00);

  // Sensory State
  const [skinTautness, setSkinTautness] = useState<number>(9);
  const [colorIntensity, setColorIntensity] = useState<number>(9);
  const [blemishCount, setBlemishCount] = useState<number>(1);
  const [firmnessScore, setFirmnessScore] = useState<number>(8);
  const [scentProfile, setScentProfile] = useState<'Weak/None' | 'Subtle' | 'Aromatic/Peak' | 'Fermented/Off'>('Aromatic/Peak');
  const [weightDensity, setWeightDensity] = useState<'Light/Hollow' | 'Average' | 'Heavy for Size'>('Heavy for Size');

  // Photo Scan State
  const [imageBase64, setImageBase64] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const commonVegetables = [
    'Roma Tomato', 'Heirloom Tomato', 'Red Bell Pepper', 'Yellow Bell Pepper', 
    'Hass Avocado', 'Globe Eggplant', 'Zucchini', 'Tuscan Kale', 
    'Broccoli Crown', 'Rainbow Carrot', 'Spinach', 'Sweet Potato'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImagePreview(result);
        setImageBase64(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setErrorMsg('');
    try {
      const result = await createInspection({
        vegetableName,
        intendedRecipe,
        cookingTechnique,
        maxBudgetUsd,
        storeProfile: {
          storeType,
          locationRegion,
          isOrganicPreferred
        },
        sensoryInputs: {
          skinTautness,
          colorIntensity,
          blemishCount,
          firmnessScore,
          scentProfile,
          weightDensity
        },
        imageBase64: imageBase64 || undefined
      });

      navigate(`/inspection/${result.id}`);
    } catch (err: any) {
      console.error('Inspection failed:', err);
      setErrorMsg(err.message || 'Failed to analyze produce assessment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Wizard Header & Progress Bar */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Produce Quality Wizard</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">5-Step Vegetable Selection Inspector</h1>
        <p className="text-xs text-slate-400 max-w-lg mx-auto">
          Assess target recipes, store profiles, firmness scores, skin tautness, and scent metrics for real-time Gemini AI agronomic evaluation.
        </p>

        {/* Stepper Progress */}
        <div className="flex items-center justify-between max-w-xl mx-auto pt-4 text-xs font-semibold">
          {[
            { num: 1, label: 'Recipe' },
            { num: 2, label: 'Store' },
            { num: 3, label: 'Budget' },
            { num: 4, label: 'Sensory' },
            { num: 5, label: 'Photo' },
          ].map((s) => (
            <div key={s.num} className="flex items-center gap-1.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                  step === s.num
                    ? 'bg-lime-500 text-slate-950 shadow-glow-lime'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-900 border border-slate-800 text-slate-500'
                }`}
              >
                {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
              </div>
              <span className={`hidden sm:inline ${step === s.num ? 'text-lime-400' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {errorMsg && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Step Content Cards */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        {/* Step 1: Culinary Intent */}
        {step === 1 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Utensils className="w-5 h-5 text-lime-400" />
              <h2 className="text-lg font-bold text-white">Step 1: Culinary Intent & Recipe Goal</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Select Target Vegetable</label>
              <input
                type="text"
                value={vegetableName}
                onChange={(e) => setVegetableName(e.target.value)}
                placeholder="e.g. Roma Tomato, Bell Pepper, Hass Avocado"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-lime-500 mb-3"
              />
              <div className="flex flex-wrap gap-2">
                {commonVegetables.map((v) => (
                  <button
                    key={v}
                    type="button"
                    onClick={() => setVegetableName(v)}
                    className={`text-xs px-3 py-1 rounded-full border transition-all ${
                      vegetableName === v
                        ? 'bg-lime-500/20 text-lime-300 border-lime-500/40 font-bold'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {v}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Intended Recipe / Dish</label>
              <input
                type="text"
                value={intendedRecipe}
                onChange={(e) => setIntendedRecipe(e.target.value)}
                placeholder="e.g. Authentic Slow-Simmered Italian Marinara"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-lime-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Cooking Technique</label>
              <select
                value={cookingTechnique}
                onChange={(e) => setCookingTechnique(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-lime-500"
              >
                <option value="Slow Simmering">Slow Simmering (Sauces & Soups)</option>
                <option value="High-Heat Roasting">High-Heat Pan/Oven Roasting</option>
                <option value="Raw Slicing">Raw Slicing (Salads, Sandwiches, Salsa)</option>
                <option value="Quick Stir-fry">Quick Wok Stir-fry (Crisp Texture)</option>
                <option value="Grilling / Charring">Grilling & Open Charring</option>
                <option value="Steaming & Pureeing">Steaming & Pureeing (Baby food / Mash)</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Store Profile */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Store className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Step 2: Store & Sourcing Environment</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Store Channel / Venue</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  'Farmers Market',
                  'Supermarket',
                  'Organic Co-op',
                  'Wholesale Club',
                  'Specialty Grocer'
                ].map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStoreType(st as any)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      storeType === st
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Region / Location</label>
              <input
                type="text"
                value={locationRegion}
                onChange={(e) => setLocationRegion(e.target.value)}
                placeholder="e.g. California Central Valley"
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-950 rounded-xl border border-slate-800">
              <input
                type="checkbox"
                id="org"
                checked={isOrganicPreferred}
                onChange={(e) => setIsOrganicPreferred(e.target.checked)}
                className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900"
              />
              <label htmlFor="org" className="text-xs text-slate-300 cursor-pointer">
                Prioritize Organic & Certified Pesticide-Free Batches
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Budget & Constraints */}
        {step === 3 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold text-white">Step 3: Budget & Value Thresholds</h2>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Max Budget Cap ($ USD)
              </label>
              <input
                type="number"
                step="0.5"
                value={maxBudgetUsd}
                onChange={(e) => setMaxBudgetUsd(parseFloat(e.target.value) || 1)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-800/40 text-xs text-slate-300 space-y-1">
              <span className="font-bold text-amber-400 block">Seasonality ROI Check:</span>
              <p>Buying produce in peak harvest window typically saves 25% to 40% per pound compared to off-season imports!</p>
            </div>
          </div>
        )}

        {/* Step 4: In-Store Sensory Metrics */}
        {step === 4 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Sliders className="w-5 h-5 text-lime-400" />
              <h2 className="text-lg font-bold text-white">Step 4: In-Store Sensory Metrics</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Skin Tautness & Cell Turgor: <strong className="text-lime-400">{skinTautness}/10</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={skinTautness}
                  onChange={(e) => setSkinTautness(parseInt(e.target.value))}
                  className="w-full accent-lime-500 bg-slate-950 h-2 rounded-lg"
                />
                <span className="text-[10px] text-slate-500 block mt-1">1 = Wrinkled/Wilted • 10 = Smooth Tight Cell Walls</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Color Intensity & Pigment Depth: <strong className="text-lime-400">{colorIntensity}/10</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={colorIntensity}
                  onChange={(e) => setColorIntensity(parseInt(e.target.value))}
                  className="w-full accent-lime-500 bg-slate-950 h-2 rounded-lg"
                />
                <span className="text-[10px] text-slate-500 block mt-1">1 = Pale/Dull • 10 = Deep Vibrant Ripeness</span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Visible Blemish / Bruise Count: <strong className="text-amber-400">{blemishCount}</strong>
                </label>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={blemishCount}
                  onChange={(e) => setBlemishCount(parseInt(e.target.value))}
                  className="w-full accent-amber-500 bg-slate-950 h-2 rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Firmness & Rebound Score: <strong className="text-emerald-400">{firmnessScore}/10</strong>
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={firmnessScore}
                  onChange={(e) => setFirmnessScore(parseInt(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-950 h-2 rounded-lg"
                />
                <span className="text-[10px] text-slate-500 block mt-1">1 = Mushy • 5 = Gentle Dent • 10 = Rock Solid</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Scent Profile (Stem End)</label>
                <select
                  value={scentProfile}
                  onChange={(e) => setScentProfile(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-lime-500"
                >
                  <option value="Weak/None">Weak / Odorless</option>
                  <option value="Subtle">Subtle Fresh Grass</option>
                  <option value="Aromatic/Peak">Aromatic / Sweet Peak Fragrance</option>
                  <option value="Fermented/Off">Sour / Fermented Off Odor</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Weight Density Ratio</label>
                <select
                  value={weightDensity}
                  onChange={(e) => setWeightDensity(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-xs text-slate-100 focus:outline-none focus:border-lime-500"
                >
                  <option value="Light/Hollow">Light / Hollow relative to volume</option>
                  <option value="Average">Average standard weight</option>
                  <option value="Heavy for Size">Heavy for Size (High hydro-density)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Visual Upload */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Camera className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold text-white">Step 5: Visual Photo Scan (Optional)</h2>
            </div>

            <div className="border-2 border-dashed border-slate-700 hover:border-lime-500/60 rounded-2xl p-6 text-center space-y-3 transition-colors bg-slate-950">
              {imagePreview ? (
                <div className="space-y-3">
                  <img
                    src={imagePreview}
                    alt="Produce scan preview"
                    className="max-h-56 mx-auto rounded-xl object-contain border border-slate-800"
                  />
                  <button
                    type="button"
                    onClick={() => { setImagePreview(''); setImageBase64(''); }}
                    className="text-xs text-rose-400 font-semibold hover:underline"
                  >
                    Remove Photo
                  </button>
                </div>
              ) : (
                <label className="cursor-pointer block space-y-2">
                  <Upload className="w-8 h-8 text-slate-500 mx-auto" />
                  <span className="text-xs font-bold text-slate-200 block">
                    Upload or Capture Produce Photo for Gemini Vision Multimodal Scan
                  </span>
                  <span className="text-[10px] text-slate-500 block">PNG, JPG, WEBP up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>
        )}

        {/* Navigation Control Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : <div />}

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-lime-600 to-emerald-600 text-slate-950 font-bold text-xs shadow-glow-lime hover:scale-105 transition-all flex items-center gap-1.5"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-lime-500 via-emerald-500 to-emerald-600 text-slate-950 font-bold text-sm shadow-glow-lime hover:scale-105 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              {submitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Gemini AI Agronomist Reasoning...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Produce Selection Audit</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
