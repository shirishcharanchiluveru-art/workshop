import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FreshBotWidget } from './components/FreshBotWidget';

import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ProduceInspectorWizardPage } from './pages/ProduceInspectorWizardPage';
import { InspectionReportPage } from './pages/InspectionReportPage';
import { VisualScannerPage } from './pages/VisualScannerPage';
import { SeasonalRadarPage } from './pages/SeasonalRadarPage';
import { SettingsPage } from './pages/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans">
        <Header />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/inspector/new" element={<ProduceInspectorWizardPage />} />
            <Route path="/inspection/:id" element={<InspectionReportPage />} />
            <Route path="/scanner" element={<VisualScannerPage />} />
            <Route path="/seasonal-radar" element={<SeasonalRadarPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>

        <Footer />
        <FreshBotWidget />
      </div>
    </BrowserRouter>
  );
};

export default App;
