import type { ParameterConfig } from '../../types';

interface SliderProps {
  label: string;
  value: number;
  config: ParameterConfig;
  onChange: (value: number) => void;
}

export function Slider({ label, value, config, onChange }: SliderProps) {
  const percentage = ((value - config.min) / (config.max - config.min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <div className="text-sm text-slate-600 font-semibold">
          {value.toFixed(config.step < 1 ? 1 : 0)} {config.unit}
        </div>
      </div>
      <div className="relative flex items-center">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="slider w-full"
          style={{
            background: `linear-gradient(to right, #9ca3af 0%, #9ca3af ${percentage}%, #e2e8f0 ${percentage}%, #e2e8f0 100%)`,
          }}
        />
      </div>
    </div>
  );
}
