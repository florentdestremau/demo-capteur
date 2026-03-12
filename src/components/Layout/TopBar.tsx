import { useAppContext } from '../../AppContext';

export function TopBar() {
  const { selectedModel, setSelectedModel } = useAppContext();

  return (
    <div className="border-b border-slate-200 bg-white shadow-sm">
      <div className="px-8 py-4 flex justify-between items-center max-w-full">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">MagSense Analyzer</h1>
          <p className="text-xs text-slate-500 mt-1">Magnetic Angle Sensor Simulation</p>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex gap-2 bg-slate-50 rounded-xl p-1.5 border border-slate-200">
            {(['A', 'B', 'C'] as const).map((model) => (
              <button
                key={model}
                onClick={() => setSelectedModel(model)}
                className={`px-4 py-1.5 rounded-lg font-semibold transition-all duration-200 text-sm ${
                  selectedModel === model
                    ? 'bg-slate-700 border border-slate-700 text-white shadow-md'
                    : 'border border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100'
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
