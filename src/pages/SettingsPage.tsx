import React, { useEffect, useState } from 'react';
import { 
  Settings as SettingsIcon, 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Store, 
  CheckCircle2, 
  AlertCircle, 
  Save, 
  RefreshCw,
  Sparkles
} from 'lucide-react';
import { fetchUserPreferences, updateUserPreferences, fetchHealthStatus } from '../api/client';
import { UserPreferences } from '../types/produce';

export const SettingsPage: React.FC = () => {
  const [prefs, setPrefs] = useState<UserPreferences>({
    unitSystem: 'Imperial (lbs, °F)',
    defaultStore: 'Farmers Market',
    dietaryFocus: 'General',
    preferredModel: 'gemini-2.5-flash',
    apiKeyStatus: 'Missing'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [apiHealth, setApiHealth] = useState<any>(null);

  useEffect(() => {
    async function loadSettings() {
      try {
        const [p, h] = await Promise.all([
          fetchUserPreferences(),
          fetchHealthStatus()
        ]);
        setPrefs(p);
        setApiHealth(h);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);
    try {
      const updated = await updateUserPreferences(prefs);
      setPrefs(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving preferences:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-2.5">
          <SettingsIcon className="w-7 h-7 text-lime-400" />
          FreshMatch AI System Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Configure measurement units, store defaults, dietary preferences, and Google Gemini API integration parameters.
        </p>
      </div>

      {saveSuccess && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>System preferences updated successfully!</span>
        </div>
      )}

      {/* Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Gemini API Status Console */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-lime-400" />
              Google Gemini Engine Status & Model Selection
            </h2>
            <div className={`px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 ${
              prefs.apiKeyStatus === 'Configured'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{prefs.apiKeyStatus === 'Configured' ? 'API Key Active' : 'Fallback Engine Active'}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Select Active Gemini Reasoning Engine</label>
              <select
                value={prefs.preferredModel}
                onChange={(e) => setPrefs({ ...prefs, preferredModel: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-lime-500"
              >
                <option value="gemini-2.5-flash">Gemini 2.5 Flash (Fast Real-Time Store Responses)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Deep Agronomic & Culinary Reasoning)</option>
              </select>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-[11px]">
              <span className="text-slate-400 font-bold block">Server Health Status:</span>
              <p className="text-slate-300">Backend Endpoint: <strong className="text-emerald-400">/api/health (200 OK)</strong></p>
              <p className="text-slate-300">Server Time: {apiHealth?.timestamp ? new Date(apiHealth.timestamp).toLocaleTimeString() : 'Active'}</p>
            </div>
          </div>
        </div>

        {/* User Preferences */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
            <Globe className="w-4 h-4 text-emerald-400" />
            Shopper Preferences & Measurement Defaults
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block text-slate-300 font-semibold mb-1">Measurement Unit System</label>
              <select
                value={prefs.unitSystem}
                onChange={(e) => setPrefs({ ...prefs, unitSystem: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Imperial (lbs, °F)">Imperial (Pounds, Ounces, °F)</option>
                <option value="Metric (kg, °C)">Metric (Kilograms, Grams, °C)</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Default Shopping Channel</label>
              <select
                value={prefs.defaultStore}
                onChange={(e) => setPrefs({ ...prefs, defaultStore: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="Farmers Market">Farmers Market / Local Co-op</option>
                <option value="Supermarket">Standard Supermarket</option>
                <option value="Organic Co-op">Organic Specialty Store</option>
                <option value="Wholesale Club">Wholesale Club</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1">Dietary Focus</label>
              <select
                value={prefs.dietaryFocus}
                onChange={(e) => setPrefs({ ...prefs, dietaryFocus: e.target.value as any })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
              >
                <option value="General">General Culinary</option>
                <option value="Vegan">Whole Food Plant-Based / Vegan</option>
                <option value="Low-FODMAP">Low-FODMAP Digestive Focus</option>
                <option value="Organic Only">Strict Organic Only</option>
                <option value="Local Farm First">Local Farm First</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-lime-600 to-emerald-600 text-slate-950 font-bold text-xs shadow-glow-lime hover:scale-105 transition-all flex items-center gap-2"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Preferences</span>
        </button>
      </form>
    </div>
  );
};
