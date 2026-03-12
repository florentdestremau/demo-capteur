import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type { CurvePoint } from '../../hooks/useCurveData';

interface AngleChartProps {
  data: CurvePoint[];
}

export function AngleChart({ data }: AngleChartProps) {
  // Calculate Y-axis domain with 10% padding
  const voltages = data.map((d) => d.voltage);
  const minVoltage = Math.min(...voltages);
  const maxVoltage = Math.max(...voltages);
  const padding = (maxVoltage - minVoltage) * 0.1;
  const yMin = minVoltage - padding;
  const yMax = maxVoltage + padding;

  return (
    <div className="w-full h-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 60, bottom: 60 }}
        >
          {/* Dark background */}
          <defs>
            <linearGradient id="chartBg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(15, 23, 42, 0.4)" />
              <stop offset="100%" stopColor="rgba(15, 23, 42, 0.2)" />
            </linearGradient>
          </defs>

          {/* Grid with subtle gray lines */}
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(148, 163, 184, 0.2)"
            vertical={true}
            horizontalPoints={[yMin, (yMin + yMax) / 2, yMax]}
          />

          {/* Axes */}
          <XAxis
            dataKey="angle"
            type="number"
            domain={[0, 359]}
            label={{
              value: 'Angle (°)',
              position: 'insideBottomRight',
              offset: -10,
              fill: 'rgb(226, 232, 240)',
            }}
            tick={{ fill: 'rgb(148, 163, 184)' }}
            axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
          />

          <YAxis
            domain={[yMin, yMax]}
            label={{
              value: 'Voltage (mV)',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
              fill: 'rgb(226, 232, 240)',
            }}
            tick={{ fill: 'rgb(148, 163, 184)' }}
            axisLine={{ stroke: 'rgba(148, 163, 184, 0.3)' }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(34, 211, 238, 0.3)',
              borderRadius: '8px',
              color: 'rgb(226, 232, 240)',
            }}
            formatter={(value) => [
              typeof value === 'number' ? value.toFixed(2) : value,
              'Voltage (mV)',
            ]}
            labelFormatter={(label) => `Angle: ${label}°`}
          />

          {/* Curve line */}
          <Line
            type="monotone"
            dataKey="voltage"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
