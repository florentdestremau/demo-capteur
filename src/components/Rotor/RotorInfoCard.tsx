import type { CurvePoint } from '../../hooks/useCurveData';
import type { Parameters, Model } from '../../types';

interface RotorInfoCardProps {
  curveData: CurvePoint[];
  params: Parameters;
  model: Model;
}

/**
 * Calculate standard deviation for linearity error
 */
function calculateStdDev(values: number[]): number {
  if (values.length === 0) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const squaredDiffs = values.map((v) => Math.pow(v - mean, 2));
  const variance = squaredDiffs.reduce((a, b) => a + b, 0) / values.length;
  return Math.sqrt(variance);
}

/**
 * Calculate linearity error as std deviation of deviation from ideal sinusoid
 */
function calculateLinearityError(
  data: CurvePoint[],
  params: Parameters
): number {
  const vccMv = params.supplyVoltage * 1000;
  const sensitivity = (params.fieldStrength / 200) * 0.45;
  const phaseShift = (params.polarizationAngle * Math.PI) / 180;

  const errors = data.map((point) => {
    const angleRad = (point.angle * Math.PI) / 180;
    const idealVoltage =
      vccMv / 2 +
      vccMv * sensitivity * Math.sin(angleRad + phaseShift) +
      params.outputOffset;

    const deviation = point.voltage - idealVoltage;
    return (deviation / vccMv) * 100;
  });

  return calculateStdDev(errors);
}

export function RotorInfoCard({
  curveData,
  params,
  model,
}: RotorInfoCardProps) {
  if (curveData.length === 0) {
    return null;
  }

  // Calculate sensitivity from curve data
  const voltages = curveData.map((d) => d.voltage);
  const peakToPeak =
    Math.max(...voltages) - Math.min(...voltages);
  const sensitivity = (peakToPeak / 360).toFixed(2);

  // Calculate linearity error
  const linearityError = calculateLinearityError(curveData, params).toFixed(2);

  // Model descriptions
  const modelDescriptions: Record<Model, string> = {
    A: 'Ideal Linear',
    B: '2nd Harmonic',
    C: 'Multi-Harmonic + Noise',
  };

  return (
    <div className="mt-6 glass-card">
      <div className="flex flex-col gap-6">
        {/* Header with Model Badge */}
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-200">
            Model Characteristics
          </h3>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-slate-100 border border-slate-300 text-cyan-300 text-sm font-semibold">
              Model {model}
            </span>
            <span className="text-xs text-slate-400">
              {modelDescriptions[model]}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          {/* Sensitivity */}
          <div className="space-y-2 bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Sensitivity
            </p>
            <p className="text-2xl font-bold text-slate-900">{sensitivity}</p>
            <p className="text-xs text-slate-500">mV/°</p>
          </div>

          {/* Linearity Error */}
          <div className="space-y-2 bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Linearity Error
            </p>
            <p className="text-2xl font-bold text-slate-900">
              {linearityError}
            </p>
            <p className="text-xs text-slate-500">%</p>
          </div>

          {/* Angular Range */}
          <div className="space-y-2 bg-white/5 rounded-lg p-4 border border-white/10">
            <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">
              Angular Range
            </p>
            <p className="text-2xl font-bold text-slate-900">0° – 360°</p>
            <p className="text-xs text-slate-500">full rotation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
