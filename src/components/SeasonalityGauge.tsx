import React from 'react';
import { Calendar, TrendingUp, DollarSign, Award, AlertCircle } from 'lucide-react';
import { SeasonalProduceItem } from '../types/produce';

interface SeasonalityGaugeProps {
  item: SeasonalProduceItem;
}

export const SeasonalityGauge: React.FC<SeasonalityGaugeProps> = ({ item }) => {
  const currentMonth = new Date().getMonth() + 1; // 1-12
  const isPeakMonth = item.peakMonths.includes(currentMonth);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{item.icon}</span>
          <div>
            <h4 className="text-sm font-bold text-white">{item.name}</h4>
            <span className="text-[11px] text-slate-400">{item.category}</span>
          </div>
        </div>
        <div className={`px-2.5 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 ${
          item.priceTrend === 'Bargain'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : item.priceTrend === 'Fair Market'
            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
            : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
        }`}>
          <DollarSign className="w-3 h-3" />
          <span>{item.priceTrend}</span>
        </div>
      </div>

      {/* Flavor Peak Index */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-slate-400 flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-lime-400" />
            Flavor & Sugar Peak Index:
          </span>
          <span className="font-bold text-lime-400">{item.flavorPeakIndex} / 100</span>
        </div>
        <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-lime-600 via-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
            style={{ width: `${item.flavorPeakIndex}%` }}
          />
        </div>
      </div>

      {/* Monthly Harvest Ribbon */}
      <div>
        <span className="text-[10px] text-slate-400 uppercase font-semibold block mb-1.5">
          Annual Harvest Window (Highlighted = Peak Season)
        </span>
        <div className="grid grid-cols-12 gap-1 text-[10px] text-center font-mono">
          {months.map((m, idx) => {
            const monthNum = idx + 1;
            const isPeak = item.peakMonths.includes(monthNum);
            const isCurrent = monthNum === currentMonth;

            return (
              <div
                key={m}
                className={`py-1 rounded border transition-colors ${
                  isPeak
                    ? 'bg-lime-500/20 text-lime-300 border-lime-500/40 font-bold'
                    : 'bg-slate-950 text-slate-600 border-slate-900'
                } ${isCurrent ? 'ring-1 ring-emerald-400' : ''}`}
                title={`${m}: ${isPeak ? 'Peak Harvest' : 'Off Season'}`}
              >
                {m.slice(0, 1)}
              </div>
            );
          })}
        </div>
      </div>

      {/* Regional Origin Insights */}
      <div className="pt-2 border-t border-slate-800/60 text-xs text-slate-300 space-y-1">
        <p className="text-slate-400 text-[11px] leading-tight">
          <strong className="text-slate-200">Origin Insight:</strong> {item.originInsights}
        </p>
        <p className="text-lime-400 text-[11px] leading-tight flex items-center gap-1">
          <AlertCircle className="w-3 h-3 shrink-0" />
          <span>{item.selectionTip}</span>
        </p>
      </div>
    </div>
  );
};
