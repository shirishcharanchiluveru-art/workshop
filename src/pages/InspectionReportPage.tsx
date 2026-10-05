import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FileText, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Thermometer, 
  DollarSign, 
  Share2, 
  Printer, 
  ArrowLeft, 
  Sparkles,
  Bot,
  PieChart
} from 'lucide-react';
import { fetchInspectionById, addShoppingItem } from '../api/client';
import { ProduceInspection } from '../types/produce';
import { FreshBotWidget } from '../components/FreshBotWidget';

export const InspectionReportPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [inspection, setInspection] = useState<ProduceInspection | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedToList, setAddedToList] = useState(false);

  useEffect(() => {
    async function loadReport() {
      if (!id) return;
      try {
        const data = await fetchInspectionById(id);
        setInspection(data);
      } catch (err: any) {
        setError(err.message || 'Report not found');
      } finally {
        setLoading(false);
      }
    }
    loadReport();
  }, [id]);

  const handleSaveToShoppingList = async () => {
    if (!inspection) return;
    try {
      await addShoppingItem({
        vegetableName: inspection.vegetableName,
        variety: inspection.aiAnalysis.recommendedVarieties[0]?.varietyName || 'Peak Strain',
        quantity: '2 lbs / standard batch',
        targetRecipe: inspection.intendedRecipe,
        qualityNote: inspection.aiAnalysis.summaryVerdict.slice(0, 80) + '...',
        estimatedCost: inspection.maxBudgetUsd
      });
      setAddedToList(true);
    } catch (err) {
      console.error('Failed to save to shopping list:', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <Sparkles className="w-8 h-8 text-lime-400 animate-spin" />
        <p className="text-sm font-semibold text-slate-300">Retrieving Produce Selection Audit...</p>
      </div>
    );
  }

  if (error || !inspection) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-white">Produce Audit Not Found</h2>
        <p className="text-xs text-slate-400">{error || 'The requested produce report ID does not exist.'}</p>
        <Link to="/dashboard" className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-lime-500 text-slate-950 font-bold text-xs">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
    );
  }

  const { aiAnalysis } = inspection;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 print:p-0 print:bg-white print:text-black">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4 print:hidden">
        <Link to="/dashboard" className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSaveToShoppingList}
            disabled={addedToList}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-300 font-semibold text-xs hover:bg-amber-500/30 transition-colors"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{addedToList ? 'Added to Shopping List' : 'Save to Shopping List'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors"
          >
            <Printer className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Main Report Banner */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-lime-500/10 border border-lime-500/30 text-lime-400 uppercase tracking-wider">
                Official Selection Audit #{inspection.id.slice(-6)}
              </span>
              <span className="text-xs text-slate-400">
                {new Date(inspection.createdAt).toLocaleDateString()}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{inspection.vegetableName}</h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Recipe Target: <strong className="text-lime-400">{inspection.intendedRecipe}</strong> ({inspection.cookingTechnique})
            </p>
          </div>

          {/* Score Badge */}
          <div className="flex items-center gap-5 bg-slate-950/90 p-5 rounded-2xl border border-slate-800">
            <div className="relative w-20 h-20 flex items-center justify-center rounded-full border-4 border-lime-500 shadow-glow-lime bg-slate-900 text-2xl font-extrabold text-lime-400">
              {aiAnalysis.suitabilityScore}%
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">Quality Tier</span>
              <span className="text-xl font-bold text-white block">{aiAnalysis.qualityTier}</span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified Agronomic Logic
              </span>
            </div>
          </div>
        </div>

        {/* Verdict Box */}
        <div className="p-4 rounded-xl bg-lime-950/20 border border-lime-800/40 text-xs sm:text-sm text-slate-200 leading-relaxed">
          <strong className="text-lime-400 block mb-1 text-xs uppercase font-bold">Agronomic Verdict & Culinary Fit:</strong>
          {aiAnalysis.summaryVerdict}
        </div>

        {/* Disqualifiers / Red Flags */}
        {aiAnalysis.disqualifyingFactors.length > 0 && (
          <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-800/50 text-xs text-rose-300 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-rose-400">
              <AlertTriangle className="w-4 h-4" />
              <span>Disqualifying Factors & Red Flags Detected:</span>
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-300">
              {aiAnalysis.disqualifyingFactors.map((df, idx) => (
                <li key={idx}>{df}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Varietal Suitability Rankings */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-lime-400" />
            Varietal Recommendation & Suitability Rankings
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiAnalysis.recommendedVarieties.map((v, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{v.varietyName}</span>
                  <span className="text-xs font-bold text-lime-400 bg-lime-500/10 px-2 py-0.5 rounded border border-lime-500/30">
                    {v.suitabilityPct}% Match
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-tight">{v.reason}</p>
                <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400">
                  Best Culinary Use: <span className="text-slate-200 font-semibold">{v.bestCulinaryUse}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sensory Diagnostic & Storage Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sensory Diagnostic */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Sensory Quality Diagnostics
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Freshness Index:</span>
                <span className="font-bold text-lime-400">{aiAnalysis.sensoryDiagnostic.freshnessIndex}/100</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Moisture Level:</span>
                <span className="font-semibold text-slate-200">{aiAnalysis.sensoryDiagnostic.moistureLevel}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Sugar-Acid Balance:</span>
                <span className="font-semibold text-slate-200">{aiAnalysis.sensoryDiagnostic.sugarAcidBalance}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Decay Warning:</span>
                <span className="font-semibold text-emerald-400">{aiAnalysis.sensoryDiagnostic.decayWarning || 'None'}</span>
              </div>
            </div>
          </div>

          {/* Storage Protocol */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-400" />
              Storage & Preservation Guide
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Shelf Life Remaining:</span>
                <span className="font-bold text-amber-400">{aiAnalysis.storageGuide.shelfLifeDays} Days</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Optimal Location:</span>
                <span className="font-semibold text-slate-200">{aiAnalysis.storageGuide.optimalLocation}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Ethylene Sensitivity:</span>
                <span className="font-semibold text-slate-200">{aiAnalysis.storageGuide.ethyleneSensitivity}</span>
              </div>
              <div className="pt-1 text-[11px] text-slate-300">
                <strong className="text-lime-400 block">Quick Salvage Tip:</strong>
                {aiAnalysis.storageGuide.quickSalvageTip}
              </div>
            </div>
          </div>
        </div>

        {/* Cost ROI breakdown */}
        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <PieChart className="w-6 h-6 text-lime-400" />
            <div>
              <span className="font-bold text-white block">Financial & Edible Yield Rating</span>
              <span className="text-slate-400">
                Edible Portion: <strong className="text-lime-400">{aiAnalysis.costRoi.edibleYieldPct}%</strong> • Cost/Usable Lb: <strong className="text-amber-400">${aiAnalysis.costRoi.costPerUsablePortion}</strong>
              </span>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">
            {aiAnalysis.costRoi.financialRating}
          </span>
        </div>
      </div>

      {/* Embedded In-Aisle FreshBot Sommelier Chat */}
      <div className="print:hidden space-y-3">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Bot className="w-5 h-5 text-lime-400" />
          Ask FreshBot In-Aisle Produce Sommelier
        </h3>
        <FreshBotWidget contextProduce={inspection.vegetableName} embedded={true} />
      </div>
    </div>
  );
};
