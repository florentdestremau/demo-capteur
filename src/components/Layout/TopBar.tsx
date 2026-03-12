import { useAppContext } from '../../AppContext';

export function TopBar() {
  const { selectedModel, setSelectedModel } = useAppContext();

  return (
    <div className="border-b border-white/10 bg-white/5 backdrop-blur-md">
      <div className="px-8 py-4 flex justify-between items-center max-w-full">
        <div>
          <h1 className="text-2xl font-bold text-blue-300">MagSense Analyzer</h1>
          <p className="text-xs text-slate-400 mt-1">Magnetic Angle Sensor Simulation</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-2 bg-white/5 backdrop-blur-md rounded-xl p-1.5 border border-white/10">
            {(['A', 'B', 'C'] as const).map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-4 py-1.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
                  selectedModel === model
                    ? 'bg-blue-500/20 border border-blue-400 text-blue-200 shadow-md shadow-blue-400/30'
                    : 'border border-transparent text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                Model {model}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
