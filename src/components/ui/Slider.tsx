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
        <label className="text-sm font-medium text-slate-300">{label}</label>
        <div className="text-sm text-cyan-400 font-semibold">
          {value.toFixed(config.step < 1 ? 1 : 0)} {config.unit}
        </div>
      </div>
      <div className="relative pt-1">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="slider"
          style={{
            background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${percentage}%, rgba(255, 255, 255, 0.1) ${percentage}%, rgba(255, 255, 255, 0.1) 100%)`,
          }}
        />
      </div>
    </div>
  );
}
