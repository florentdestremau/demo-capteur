import { useAppContext } from '../../AppContext';
import { Slider } from '../ui/Slider';
import { GlassCard } from '../ui/GlassCard';
import { PARAM_CONFIGS } from '../../hooks/useModelConfig';

interface SidebarProps {
  position: 'left' | 'right';
}

const PARAM_LABELS: Record<string, string> = {
  airGap: 'Air Gap',
  rotorRadius: 'Rotor Radius',
  magnetThickness: 'Magnet Thickness',
  fieldStrength: 'Field Strength',
  polarizationAngle: 'Polarization Angle',
  supplyVoltage: 'Supply Voltage',
  outputOffset: 'Output Offset',
  rpm: 'RPM',
  targetAngle: 'Target Angle',
};

export function Sidebar({ position }: SidebarProps) {
  const { params, setParams } = useAppContext();

  // Organize parameters by category
  const paramGroups = position === 'left'
    ? [
        {
          category: 'Geometry',
          params: ['airGap', 'rotorRadius', 'magnetThickness'] as const,
        },
        {
          category: 'Magnetics',
          params: ['fieldStrength', 'polarizationAngle'] as const,
        },
      ]
    : [
        {
          category: 'Electrical',
          params: ['supplyVoltage', 'outputOffset'] as const,
        },
        {
          category: 'Rotation',
          params: ['rpm', 'targetAngle'] as const,
        },
      ];

  const handleParamChange = (paramName: string, value: number) => {
    setParams({
      ...params,
      [paramName]: value,
    });
  };

  return (
    <div
      className={`w-72 border-slate-200 bg-slate-50 p-6 space-y-6 overflow-y-auto ${
        position === 'left' ? 'border-r' : 'border-l'
      }`}
    >
      <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">
        {position === 'left' ? 'Geometry & Magnetics' : 'Electrical & Rotation'}
      </h2>

      {paramGroups.map((group) => (
        <div key={group.category} className="space-y-3">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wide">
            {group.category}
          </h3>
          <GlassCard className="!bg-white/5 space-y-5">
            {(group.params as readonly string[]).map((paramName) => (
              <div key={paramName} className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-sm font-medium text-slate-300">
                    {PARAM_LABELS[paramName]}
                  </label>
                  <span className="text-sm font-mono text-slate-700">
                    {params[paramName as keyof typeof params].toFixed(
                      PARAM_CONFIGS[paramName].step < 1 ? 1 : 0
                    )}{' '}
                    <span className="text-xs text-slate-500">
                      {PARAM_CONFIGS[paramName].unit}
                    </span>
                  </span>
                </div>
                <Slider
                  label=""
                  value={params[paramName as keyof typeof params]}
                  config={PARAM_CONFIGS[paramName]}
                  onChange={(value) => handleParamChange(paramName, value)}
                />
              </div>
            ))}
          </GlassCard>
        </div>
      ))}
    </div>
  );
}
