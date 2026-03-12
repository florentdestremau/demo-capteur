import type { CurvePoint } from '../../hooks/useCurveData';
import type { Parameters } from '../../types';

interface StatsPanelProps {
  data: CurvePoint[];
  params: Parameters;
}

/**
 * Calculate standard deviation
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
    // Ideal sinusoid (without model-specific distortions)
    const idealVoltage =
      vccMv / 2 +
      vccMv * sensitivity * Math.sin(angleRad + phaseShift) +
      params.outputOffset;

    const deviation = point.voltage - idealVoltage;
    return (deviation / vccMv) * 100; // Convert to percentage
  });

  return calculateStdDev(errors);
}

export function StatsPanel({ data, params }: StatsPanelProps) {
  if (data.length === 0) {
    return null;
  }

  // Calculate statistics
  const voltages = data.map((d) => d.voltage);
  const maxVoltage = Math.max(...voltages);
  const minVoltage = Math.min(...voltages);
  const peakToPeak = maxVoltage - minVoltage;
  const sensitivity = (peakToPeak / 360).toFixed(2);
  const linearityError = calculateLinearityError(data, params).toFixed(2);

  return (
    <div className="mt-6 glass-card">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {/* Peak Voltage */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">Peak Voltage</p>
          <p className="text-2xl font-bold text-blue-300">
            {maxVoltage.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500">mV</p>
        </div>

        {/* Min Voltage */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">Min Voltage</p>
          <p className="text-2xl font-bold text-blue-300">
            {minVoltage.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500">mV</p>
        </div>

        {/* Peak-to-Peak */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">
            Peak-to-Peak
          </p>
          <p className="text-2xl font-bold text-blue-300">
            {peakToPeak.toFixed(2)}
          </p>
          <p className="text-xs text-slate-500">mV</p>
        </div>

        {/* Sensitivity */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">Sensitivity</p>
          <p className="text-2xl font-bold text-blue-300">{sensitivity}</p>
          <p className="text-xs text-slate-500">mV/°</p>
        </div>

        {/* Linearity Error */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-400">Linearity Error</p>
          <p className="text-2xl font-bold text-blue-300">
            {linearityError}
          </p>
          <p className="text-xs text-slate-500">%</p>
        </div>
      </div>
    </div>
  );
}
