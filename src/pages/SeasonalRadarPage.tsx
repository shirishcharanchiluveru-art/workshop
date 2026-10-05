import React, { useEffect, useState } from 'react';
import { 
  Calendar, 
  Search, 
  DollarSign, 
  TrendingUp, 
  Sparkles, 
  Filter, 
  Leaf, 
  Award,
  ShieldCheck
} from 'lucide-react';
import { fetchSeasonalProduce } from '../api/client';
import { SeasonalProduceItem } from '../types/produce';
import { SeasonalityGauge } from '../components/SeasonalityGauge';

export const SeasonalRadarPage: React.FC = () => {
  const [items, setItems] = useState<SeasonalProduceItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Solanaceae (Nightshades)',
    'Brassicas',
    'Root Vegetables',
    'Leafy Greens',
    'Cucurbits'
  ];

  useEffect(() => {
    async function loadSeasonal() {
      try {
        const data = await fetchSeasonalProduce();
        setItems(data);
      } catch (err) {
        console.error('Failed to load seasonal produce:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSeasonal();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.selectionTip.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Seasonal Harvest Intelligence</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-2">
            <Calendar className="w-7 h-7 text-amber-400" />
            Produce Seasonality Radar & Flavor Index
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Current Active Month: <strong className="text-lime-400">{currentMonthName} Harvest Window</strong>. Track peak flavors and bargain prices.
          </p>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vegetables..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <Filter className="w-4 h-4 text-slate-500 shrink-0 mr-1" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-amber-500 text-slate-950 shadow-glow-amber'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Seasonality Gauges */}
      {loading ? (
        <div className="p-12 text-center text-slate-400">Loading seasonal produce matrix...</div>
      ) : filteredItems.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-slate-400 space-y-2">
          <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
          <p className="text-sm font-semibold">No seasonal produce found for selected filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <SeasonalityGauge key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
