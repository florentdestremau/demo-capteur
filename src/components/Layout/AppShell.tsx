import { useState } from 'react';
import { useAppContext } from '../../AppContext';
import { TopBar } from './TopBar';
import { Sidebar } from './Sidebar';
import { GlassCard } from '../ui/GlassCard';
import { AngleChart } from '../Chart/AngleChart';
import { StatsPanel } from '../Chart/StatsPanel';
import { RotorSVG } from '../Rotor/RotorSVG';
import { RotorInfoCard } from '../Rotor/RotorInfoCard';
import { useCurveData } from '../../hooks/useCurveData';

export function AppShell() {
  const { activeTab, setActiveTab, params, selectedModel } = useAppContext();
  const curveData = useCurveData(params, selectedModel);
  const [showParamsDrawer, setShowParamsDrawer] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Hidden on small screens */}
        <div className="hidden lg:block">
          <Sidebar position="left" />
        </div>

        <div className="flex-1 flex flex-col p-4 lg:p-6 gap-4 overflow-hidden">
          {/* Tab Switcher */}
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => setActiveTab('rotor')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'rotor'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Rotor View
            </button>
            <button
              onClick={() => setActiveTab('chart')}
              className={`px-6 py-2 rounded-lg font-semibold transition-all ${
                activeTab === 'chart'
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Angular Voltage
            </button>
          </div>

          {/* Main Content Area - No scrolling, fits on screen */}
          {activeTab === 'rotor' && (
            <div className="flex flex-col gap-4 flex-1 overflow-hidden">
              <GlassCard className="flex-1 min-h-0">
                <RotorSVG params={params} />
              </GlassCard>
              <div className="flex-shrink-0">
                <RotorInfoCard
                  curveData={curveData}
                  params={params}
                  model={selectedModel}
                />
              </div>
            </div>
          )}

          {activeTab === 'chart' && (
            <div className="flex flex-col gap-4 flex-1 overflow-hidden">
              <GlassCard
                key={`chart-${selectedModel}`}
                className="flex-1 min-h-0 transition-opacity duration-150"
              >
                <AngleChart data={curveData} />
              </GlassCard>
              <div className="flex-shrink-0 max-h-40 overflow-hidden">
                <StatsPanel data={curveData} params={params} />
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar - Hidden on small screens */}
        <div className="hidden lg:block">
          <Sidebar position="right" />
        </div>

        {/* Floating Parameters Button - Visible on small screens */}
        <div className="lg:hidden fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowParamsDrawer(!showParamsDrawer)}
            className="px-4 py-3 rounded-full bg-slate-900 text-white font-semibold shadow-lg hover:bg-slate-800 transition-all"
          >
            ⚙ Params
          </button>
        </div>

        {/* Parameters Drawer - Mobile only */}
        {showParamsDrawer && (
          <div className="lg:hidden fixed inset-0 z-30 bg-black/50 backdrop-blur-sm">
            <div className="absolute right-0 top-0 bottom-0 w-72 bg-slate-900 border-l border-white/10 overflow-y-auto shadow-2xl">
              <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-bold text-cyan-400">Parameters</h2>
                  <button
                    onClick={() => setShowParamsDrawer(false)}
                    className="text-slate-400 hover:text-slate-300 text-xl"
                  >
                    ✕
                  </button>
                </div>
                <Sidebar position="left" />
                <Sidebar position="right" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
