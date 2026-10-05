import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Search, 
  ScanLine, 
  ShoppingBag, 
  Trash2, 
  CheckSquare, 
  Square, 
  Plus, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  AlertCircle,
  FileText
} from 'lucide-react';
import { 
  fetchInspections, 
  fetchVisualScans, 
  fetchShoppingList, 
  addShoppingItem, 
  toggleShoppingItem, 
  deleteShoppingItem,
  deleteInspection 
} from '../api/client';
import { ProduceInspection, VisualScanResult, ShoppingListItem } from '../types/produce';

export const DashboardPage: React.FC = () => {
  const [inspections, setInspections] = useState<ProduceInspection[]>([]);
  const [scans, setScans] = useState<VisualScanResult[]>([]);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  const [loading, setLoading] = useState(true);

  // New item form states
  const [newVegName, setNewVegName] = useState('');
  const [newRecipe, setNewRecipe] = useState('');
  const [newQty, setNewQty] = useState('');

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [inspData, scanData, shopData] = await Promise.all([
        fetchInspections(),
        fetchVisualScans(),
        fetchShoppingList()
      ]);
      setInspections(inspData);
      setScans(scanData);
      setShoppingList(shopData);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVegName.trim()) return;
    try {
      const added = await addShoppingItem({
        vegetableName: newVegName,
        targetRecipe: newRecipe || 'General Cooking',
        quantity: newQty || '1 lb / 1 item',
        variety: 'Selected Variety',
        qualityNote: 'Check taut skin & firmness',
        estimatedCost: 3.50
      });
      setShoppingList((prev) => [added, ...prev]);
      setNewVegName('');
      setNewRecipe('');
      setNewQty('');
    } catch (err) {
      console.error('Failed to add item:', err);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const updated = await toggleShoppingItem(id);
      setShoppingList((prev) => prev.map((item) => (item.id === id ? updated : item)));
    } catch (err) {
      console.error('Failed to toggle item:', err);
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteShoppingItem(id);
      setShoppingList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  const handleDeleteInspectionReport = async (id: string) => {
    try {
      await deleteInspection(id);
      setInspections((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error('Failed to delete inspection:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <LayoutDashboard className="w-7 h-7 text-lime-400" />
            Produce Selection Dashboard
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Track saved grocery produce assessments, camera diagnostics, and active shopping lists.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/inspector/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-lime-600 to-emerald-600 text-slate-950 font-bold text-xs shadow-glow-lime hover:scale-105 transition-all"
          >
            <Search className="w-4 h-4" />
            <span>New Produce Inspection</span>
          </Link>
          <Link
            to="/scanner"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-xs hover:bg-slate-800 transition-all"
          >
            <ScanLine className="w-4 h-4 text-lime-400" />
            <span>Scan Camera Photo</span>
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Audits Conducted</span>
            <div className="w-8 h-8 rounded-lg bg-lime-500/10 text-lime-400 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-white mt-2 block">{inspections.length}</span>
          <span className="text-[11px] text-lime-400 block mt-1">Saved produce analyses</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Camera Visual Scans</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <ScanLine className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-white mt-2 block">{scans.length}</span>
          <span className="text-[11px] text-emerald-400 block mt-1">Ripeness diagnostics</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Active Shopping Items</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-white mt-2 block">
            {shoppingList.filter((i) => !i.completed).length}
          </span>
          <span className="text-[11px] text-amber-400 block mt-1">Remaining on checklist</span>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-800">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Avg Quality Score</span>
            <div className="w-8 h-8 rounded-lg bg-lime-500/10 text-lime-400 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <span className="text-3xl font-bold text-lime-400 mt-2 block">
            {inspections.length > 0
              ? Math.round(inspections.reduce((acc, i) => acc + i.aiAnalysis.suitabilityScore, 0) / inspections.length)
              : 92}
            %
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">High freshness precision</span>
        </div>
      </div>

      {/* Main Grid: Saved Inspections & Smart Shopping List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Recent Produce Inspections */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-lime-400" />
              Saved Produce Quality Audits
            </h2>
            <Link to="/inspector/new" className="text-xs text-lime-400 font-semibold hover:underline">
              + Add Audit
            </Link>
          </div>

          {inspections.length === 0 ? (
            <div className="glass-card rounded-2xl p-8 text-center text-slate-400 space-y-3">
              <Search className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm">No produce audits performed yet.</p>
              <Link
                to="/inspector/new"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-lime-500 text-slate-950 font-bold text-xs"
              >
                Inspect Produce Now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {inspections.map((insp) => (
                <div
                  key={insp.id}
                  className="glass-card rounded-xl p-5 border border-slate-800 hover:border-lime-500/40 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white">{insp.vegetableName}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        insp.aiAnalysis.suitabilityScore >= 85
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : insp.aiAnalysis.suitabilityScore >= 70
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}>
                        {insp.aiAnalysis.qualityTier} ({insp.aiAnalysis.suitabilityScore}%)
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Recipe: <span className="text-slate-200">{insp.intendedRecipe}</span> • {insp.cookingTechnique}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {new Date(insp.createdAt).toLocaleDateString()} at {new Date(insp.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                    <Link
                      to={`/inspection/${insp.id}`}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-lime-400 font-semibold text-xs flex items-center gap-1"
                    >
                      <span>Report</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDeleteInspectionReport(insp.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Report"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scans section */}
          <div className="pt-4 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <ScanLine className="w-4 h-4 text-emerald-400" />
              Camera Ripeness Scans
            </h3>
            {scans.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
                No camera scans taken. Try the camera scanner in the aisle!
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scans.map((scan) => (
                  <div key={scan.id} className="bg-slate-900 border border-slate-800 p-3 rounded-xl flex items-center gap-3">
                    <img
                      src={scan.imageUrl}
                      alt={scan.vegetableIdentified}
                      className="w-12 h-12 rounded-lg object-cover bg-slate-950 border border-slate-800"
                    />
                    <div className="space-y-0.5">
                      <span className="text-xs font-bold text-white block">{scan.vegetableIdentified}</span>
                      <span className="text-[10px] text-emerald-400 font-semibold block">Grade: {scan.freshnessGrade} ({scan.ripenessStage})</span>
                      <span className="text-[10px] text-slate-500 block">{scan.storageRecommendation.slice(0, 40)}...</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Smart In-Store Shopping List */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-400" />
                Smart Produce Shopping List
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {shoppingList.filter((i) => i.completed).length} / {shoppingList.length} Done
              </span>
            </div>

            {/* Quick Add Form */}
            <form onSubmit={handleAddItem} className="space-y-3">
              <input
                type="text"
                value={newVegName}
                onChange={(e) => setNewVegName(e.target.value)}
                placeholder="Vegetable name (e.g. Heirloom Tomato)"
                className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={newRecipe}
                  onChange={(e) => setNewRecipe(e.target.value)}
                  placeholder="Target recipe (e.g. Salsa)"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
                <input
                  type="text"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                  placeholder="Quantity (e.g. 2 lbs)"
                  className="w-full bg-slate-950 border border-slate-800 focus:border-lime-500 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={!newVegName.trim()}
                className="w-full py-2 rounded-lg bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Produce to List</span>
              </button>
            </form>

            {/* Shopping List Items */}
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
              {shoppingList.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-4">Shopping list is empty.</p>
              ) : (
                shoppingList.map((item) => (
                  <div
                    key={item.id}
                    className={`p-3 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                      item.completed
                        ? 'bg-slate-950/40 border-slate-900 text-slate-500 line-through'
                        : 'bg-slate-900/90 border-slate-800 text-slate-200'
                    }`}
                  >
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="flex items-center gap-3 text-left flex-1"
                    >
                      {item.completed ? (
                        <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-slate-500 shrink-0" />
                      )}
                      <div>
                        <span className="text-xs font-bold block">{item.vegetableName}</span>
                        <span className="text-[10px] text-slate-400 block font-normal">
                          {item.quantity} • {item.targetRecipe}
                        </span>
                      </div>
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
