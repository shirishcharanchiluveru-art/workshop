import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  ScanLine, 
  Calendar, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  ArrowRight,
  Leaf,
  Award,
  Zap,
  BookOpen
} from 'lucide-react';
import { fetchSeasonalProduce, fetchInspections } from '../api/client';
import { SeasonalProduceItem, ProduceInspection } from '../types/produce';
import { YieldCalculator } from '../components/YieldCalculator';

export const HomePage: React.FC = () => {
  const [seasonalProduce, setSeasonalProduce] = useState<SeasonalProduceItem[]>([]);
  const [recentInspections, setRecentInspections] = useState<ProduceInspection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [seasonal, inspections] = await Promise.all([
          fetchSeasonalProduce(),
          fetchInspections()
        ]);
        setSeasonalProduce(seasonal.slice(0, 4));
        setRecentInspections(inspections.slice(0, 3));
      } catch (err) {
        console.error('Error loading homepage data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-16 pb-12">
      {/* Market Trend Ticker Bar */}
      <div className="w-full bg-slate-900/90 border-y border-slate-800 py-2.5 px-4 overflow-x-auto no-scrollbar flex items-center gap-6 text-xs text-slate-300">
        <div className="flex items-center gap-2 font-bold text-lime-400 shrink-0 uppercase tracking-wider text-[11px]">
          <Zap className="w-3.5 h-3.5 fill-lime-400" />
          <span>Live Market Trend Ticker:</span>
        </div>
        <div className="flex items-center gap-8 shrink-0">
          <span className="flex items-center gap-1.5">
            <span className="text-white font-medium">Roma Tomatoes:</span>
            <span className="text-emerald-400 font-semibold">$2.49/lb (Peak Harvest Bargain)</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-white font-medium">Yellow Bell Peppers:</span>
            <span className="text-amber-400 font-semibold">High Sugar Saturation (Brix 8.4)</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-white font-medium">Hass Avocados:</span>
            <span className="text-emerald-400 font-semibold">Late Season Oil Peak (19%)</span>
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-1.5">
            <span className="text-white font-medium">Tuscan Kale:</span>
            <span className="text-lime-400 font-semibold">Frost-Cured Sweetness</span>
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-lime-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-500/10 border border-lime-500/30 text-lime-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Produce Selection Assistant</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none">
              Never Pick Overripe or Watery Produce <span className="text-gradient-lime">Ever Again.</span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              FreshMatch AI transforms sensory signals, skin tautness, firmness metrics, and recipe requirements into deterministic vegetable selection scores using <strong>Google Gemini 2.5</strong>.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/inspector/new"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-lime-600 via-lime-500 to-emerald-600 text-slate-950 font-bold text-base shadow-glow-lime hover:scale-[1.02] active:scale-95 transition-all duration-200"
              >
                <Search className="w-5 h-5" />
                <span>Start 5-Step Produce Inspector</span>
                <ArrowRight className="w-5 h-5" />
              </Link>

              <Link
                to="/scanner"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-base transition-all duration-200"
              >
                <ScanLine className="w-5 h-5 text-lime-400" />
                <span>Visual Camera Scanner</span>
              </Link>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs">
              <div>
                <span className="block text-2xl font-extrabold text-white">99.4%</span>
                <span className="text-slate-400">Varietal Accuracy</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-lime-400">0%</span>
                <span className="text-slate-400">Food Waste Goal</span>
              </div>
              <div>
                <span className="block text-2xl font-extrabold text-emerald-400">2-Sec</span>
                <span className="text-slate-400">In-Aisle Diagnosis</span>
              </div>
            </div>
          </div>

          {/* Hero Visual Card / Interactive Score Preview */}
          <div className="lg:col-span-5">
            <div className="glass-card rounded-2xl p-6 border border-slate-800/90 shadow-2xl relative">
              <div className="absolute -top-3 -right-3 bg-gradient-to-r from-lime-500 to-emerald-500 text-slate-950 font-bold text-xs px-3 py-1 rounded-full shadow-lg">
                Live AI Report Card
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-lime-500/20 border border-lime-500/40 flex items-center justify-center text-2xl">
                  🍅
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">San Marzano Roma Tomato</h3>
                  <span className="text-xs text-slate-400">Target Recipe: Slow Italian Marinara</span>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-4 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 uppercase font-semibold block">Suitability Score</span>
                  <span className="text-3xl font-extrabold text-lime-400">94 / 100</span>
                  <span className="text-[10px] text-emerald-400 block font-medium">Peak Quality Choice</span>
                </div>
                <div className="w-16 h-16 rounded-full border-4 border-lime-500 flex items-center justify-center text-xs font-bold text-lime-400 shadow-glow-lime">
                  94%
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800">
                  <span className="text-slate-400">Skin Tautness & Hydration:</span>
                  <span className="font-semibold text-lime-400">9/10 (High Cell Turgor)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 py-1 border-b border-slate-800">
                  <span className="text-slate-400">Brix Sugar Acidity:</span>
                  <span className="font-semibold text-white">6.2 (Optimal Natural Sweetness)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300 py-1">
                  <span className="text-slate-400">Edible Yield Ratio:</span>
                  <span className="font-semibold text-emerald-400">92% Usable Portion</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-lime-400" />
                  Verified Agronomic Logic
                </span>
                <Link to="/inspection/insp-101" className="text-lime-400 font-semibold hover:underline">
                  View Full Report →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Enterprise Produce Selection Architecture
          </h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Combining sensory science, seasonal market intelligence, and Gemini vision models into your personal grocery co-pilot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-lime-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-lime-500/10 text-lime-400 flex items-center justify-center mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">5-Step Produce Inspector</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Guided multi-step wizard capturing recipe goals, store profiles, firmness scores, scent profiles, and skin metrics for tailored varietal matching.
            </p>
            <Link to="/inspector/new" className="text-xs font-semibold text-lime-400 flex items-center gap-1 hover:underline">
              Launch Wizard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <ScanLine className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Visual Camera Ripeness Scanner</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Instant camera upload using Gemini Vision to detect hidden bruises, artificial wax coatings, freshness grades, and storage recommendations.
            </p>
            <Link to="/scanner" className="text-xs font-semibold text-emerald-400 flex items-center gap-1 hover:underline">
              Open Camera Scanner <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-amber-500/50 transition-all duration-300">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Seasonal Produce Radar</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Monthly harvest matrix tracking flavor peak indices, origin insights, and price trends (Bargain vs Premium Import) to optimize your wallet.
            </p>
            <Link to="/seasonal-radar" className="text-xs font-semibold text-amber-400 flex items-center gap-1 hover:underline">
              View Seasonal Calendar <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Yield & ROI Calculator Tool Embedded */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <YieldCalculator />
      </section>

      {/* Seasonal Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Leaf className="w-5 h-5 text-lime-400" />
              Peak Season Vegetable Recommendations
            </h2>
            <p className="text-xs text-slate-400">Current top-ranked produce for optimal flavor and bargain pricing.</p>
          </div>
          <Link to="/seasonal-radar" className="text-xs text-lime-400 font-semibold hover:underline">
            View All Seasons →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {seasonalProduce.map((item) => (
            <div key={item.id} className="glass-card p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-3xl">{item.icon}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {item.priceTrend}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{item.name}</h4>
              <p className="text-[11px] text-slate-400 line-clamp-2">{item.selectionTip}</p>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                <span className="text-slate-500">Flavor Peak:</span>
                <span className="font-bold text-lime-400">{item.flavorPeakIndex}%</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
