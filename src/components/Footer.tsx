import React from 'react';
import { Leaf, ShieldCheck, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-lime-600 to-emerald-600 flex items-center justify-center text-white">
              <Leaf className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              FreshMatch <span className="text-lime-400">AI</span>
            </span>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Enterprise-grade AI vegetable & produce selection assistant empowering shoppers with deterministic sensory scoring, visual ripeness diagnostics, and culinary ROI optimization.
          </p>
          <div className="flex items-center gap-2 text-xs text-lime-400/90 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Powered by Google Gemini 2.5 Engine</span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Produce Tools</h4>
          <ul className="space-y-2 text-xs">
            <li><a href="/inspector/new" className="hover:text-lime-400 transition-colors">5-Step Sensory Inspector</a></li>
            <li><a href="/scanner" className="hover:text-lime-400 transition-colors">Visual Ripeness Scanner</a></li>
            <li><a href="/seasonal-radar" className="hover:text-lime-400 transition-colors">Monthly Seasonal Radar</a></li>
            <li><a href="/dashboard" className="hover:text-lime-400 transition-colors">Produce History & Shopping List</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">Culinary Agronomy</h4>
          <ul className="space-y-2 text-xs">
            <li className="text-slate-400">Brix Sugar & Acid Balance Diagnostic</li>
            <li className="text-slate-400">Edible Yield & Waste Minimizer</li>
            <li className="text-slate-400">Ethylene Sensitivity Matrix</li>
            <li className="text-slate-400">Store-to-Fridge Storage Protocols</li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">FreshMatch System</h4>
          <p className="text-xs text-slate-400 mb-3">
            Real-time point-of-sale vegetable assistant. Built with React, Express, PostgreSQL / SQLite, and Gemini Multimodal AI.
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
            <Sparkles className="w-3.5 h-3.5 text-lime-400" />
            <span>System Status: <strong className="text-emerald-400">Operational</strong></span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
        <p>© {new Date().getFullYear()} FreshMatch AI Inc. All rights reserved.</p>
        <p className="flex items-center gap-1 mt-2 sm:mt-0">
          Crafted for peak freshness & zero food waste <Heart className="w-3.5 h-3.5 text-lime-500 fill-lime-500 inline" />
        </p>
      </div>
    </footer>
  );
};
