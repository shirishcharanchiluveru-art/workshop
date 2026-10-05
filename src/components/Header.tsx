import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ScanLine, 
  Search, 
  Calendar, 
  LayoutDashboard, 
  Settings as SettingsIcon, 
  ShoppingBag, 
  Menu, 
  X,
  Leaf
} from 'lucide-react';

export const Header: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/', icon: Leaf },
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Produce Inspector', path: '/inspector/new', icon: Search },
    { label: 'Visual Scanner', path: '/scanner', icon: ScanLine },
    { label: 'Seasonal Radar', path: '/seasonal-radar', icon: Calendar },
    { label: 'Settings', path: '/settings', icon: SettingsIcon },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-lime-600 to-emerald-600 flex items-center justify-center text-white shadow-glow-lime group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold font-sans tracking-tight text-white flex items-center gap-1.5">
                FreshMatch <span className="text-gradient-lime font-extrabold">AI</span>
              </span>
              <span className="hidden sm:block text-[10px] text-slate-400 tracking-wider uppercase font-semibold">
                Produce Selection Assistant
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    active
                      ? 'bg-lime-500/10 text-lime-400 border border-lime-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-lime-400' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick CTA */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              to="/inspector/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-lime-600 to-emerald-700 hover:from-lime-500 hover:to-emerald-600 text-slate-950 font-semibold text-sm shadow-glow-lime transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Search className="w-4 h-4" />
              <span>Inspect Produce</span>
            </Link>
          </div>

          {/* Mobile menu toggle button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-base font-medium ${
                  active
                    ? 'bg-lime-500/10 text-lime-400 border border-lime-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-lime-400' : 'text-slate-400'}`} />
                {item.label}
              </Link>
            );
          })}
          <div className="pt-2">
            <Link
              to="/inspector/new"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-lime-600 to-emerald-700 text-slate-950 font-semibold text-sm shadow-glow-lime"
            >
              <Search className="w-4 h-4" />
              <span>Inspect Produce Now</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
