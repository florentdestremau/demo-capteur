import type { Parameters } from '../../types';
import './RotorSVG.css';

interface RotorSVGProps {
  params: Parameters;
}

export function RotorSVG({ params }: RotorSVGProps) {
  // Calculate air gap visual representation
  const airGapPixels = (params.airGap / 5) * 20; // Scale for visualization

  return (
    <div className="flex items-center justify-center h-full w-full overflow-hidden">
      <svg
        viewBox="0 0 500 500"
        className="rotor-svg"
        style={{ width: '100%', height: '100%' }}
      >
        <defs>
          {/* Gradient for rotor disc */}
          <radialGradient id="rotorGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="100%" stopColor="#9ca3af" />
          </radialGradient>

          {/* Gradient for magnetic pole pair */}
          <linearGradient id="poleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9ca3af" />
            <stop offset="100%" stopColor="#6b7280" />
          </linearGradient>

          {/* Arrow markers for wires */}
          <marker
            id="arrowRed"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#ef4444" />
          </marker>
          <marker
            id="arrowGray"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#374151" />
          </marker>
          <marker
            id="arrowBlue"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#6b7280" />
          </marker>
          <marker
            id="arrowGray2"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" fill="#9ca3af" />
          </marker>
        </defs>

        {/* Background */}
        <rect width="500" height="500" fill="white" />

        {/* Full rotation path (360° arc) */}
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="none"
          stroke="#4b5563"
          strokeWidth="1"
          strokeDasharray="2,4"
          opacity="0.2"
        />

        {/* Rotor disc and pole pair at targetAngle */}
        <g transform={`translate(250, 250) rotate(${params.targetAngle})`}>
          {/* Outer rotor disc */}
          <circle
            cx="0"
            cy="0"
            r="140"
            fill="url(#rotorGradient)"
            stroke="#6b7280"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Magnetic pole pair - rotated ellipse */}
          <g transform={`rotate(${params.polarizationAngle})`}>
            <ellipse
              cx="0"
              cy="0"
              rx="80"
              ry="45"
              fill="url(#poleGradient)"
              opacity="0.8"
            />
            {/* Pole pair accent lines */}
            <line
              x1="-70"
              y1="0"
              x2="-40"
              y2="0"
              stroke="#e5e7eb"
              strokeWidth="2"
              opacity="0.6"
            />
            <line
              x1="40"
              y1="0"
              x2="70"
              y2="0"
              stroke="#e5e7eb"
              strokeWidth="2"
              opacity="0.6"
            />
          </g>

          {/* Center point indicator */}
          <circle cx="0" cy="0" r="4" fill="#4b5563" opacity="0.8" />
        </g>

        {/* Rotation indicator arc at targetAngle */}
        <g>
          {(() => {
            const angleRad = (params.targetAngle * Math.PI) / 180;
            const startX = 250 + 155 * Math.cos(angleRad - 0.3);
            const startY = 250 + 155 * Math.sin(angleRad - 0.3);
            const endX = 250 + 155 * Math.cos(angleRad + 0.3);
            const endY = 250 + 155 * Math.sin(angleRad + 0.3);
            const arrowX = 250 + 175 * Math.cos(angleRad);
            const arrowY = 250 + 175 * Math.sin(angleRad);

            return (
              <>
                <path
                  d={`M ${startX},${startY} A 25,25 0 0,1 ${endX},${endY}`}
                  fill="none"
                  stroke="#4b5563"
                  strokeWidth="2"
                  opacity="0.7"
                />
                <polygon
                  points={`${arrowX},${arrowY} ${
                    arrowX - 8 * Math.cos(angleRad + 0.3)
                  },${arrowY - 8 * Math.sin(angleRad + 0.3)} ${
                    arrowX - 8 * Math.cos(angleRad - 0.3)
                  },${arrowY - 8 * Math.sin(angleRad - 0.3)}`}
                  fill="#4b5563"
                  opacity="0.7"
                />
              </>
            );
          })()}
        </g>

        {/* Sensor IC chip */}
        <g transform={`translate(${250 + 145 + airGapPixels}, 250)`}>
          <rect
            x="-10"
            y="-6"
            width="20"
            height="12"
            fill="#475569"
            stroke="#6b7280"
            strokeWidth="1.5"
          />
          <text
            x="0"
            y="2"
            textAnchor="middle"
            fontSize="6"
            fill="#374151"
            fontWeight="bold"
            letterSpacing="0.5"
          >
            IC
          </text>
        </g>

        {/* Wire connections */}
        <g>
          {(() => {
            const chipX = 250 + 145 + airGapPixels;
            const wireStartX = chipX + 10;
            const wireBendX = chipX + 40;

            return (
              <>
                {/* VCC (Red) */}
                <path
                  d={`M ${wireStartX},244 L ${wireBendX},244 L ${wireBendX},200`}
                  stroke="#ef4444"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowRed)"
                />
                <text
                  x={wireBendX + 20}
                  y={204}
                  fontSize="10"
                  fill="#ef4444"
                  fontWeight="bold"
                >
                  VCC
                </text>

                {/* GND (Dark) */}
                <path
                  d={`M ${wireStartX},250 L ${wireBendX},250 L ${wireBendX},270`}
                  stroke="#374151"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowGray)"
                />
                <text
                  x={wireBendX + 20}
                  y={280}
                  fontSize="10"
                  fill="#374151"
                  fontWeight="bold"
                >
                  GND
                </text>

                {/* OUT (Blue) */}
                <path
                  d={`M ${wireStartX},256 L ${wireBendX},256 L ${wireBendX},320`}
                  stroke="#6b7280"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowBlue)"
                />
                <text
                  x={wireBendX + 20}
                  y={330}
                  fontSize="10"
                  fill="#6b7280"
                  fontWeight="bold"
                >
                  OUT
                </text>

                {/* REF (Gray) */}
                <path
                  d={`M ${wireStartX},262 L ${wireBendX},262 L ${wireBendX},380`}
                  stroke="#9ca3af"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#arrowGray2)"
                />
                <text
                  x={wireBendX + 20}
                  y={390}
                  fontSize="10"
                  fill="#9ca3af"
                  fontWeight="bold"
                >
                  REF
                </text>
              </>
            );
          })()}
        </g>

        {/* Dimension annotations */}
        <g>
          {/* Air Gap annotation */}
          <line
            x1={250 + 140}
            y1={250}
            x2={250 + 140 + airGapPixels}
            y2={250}
            stroke="#4b5563"
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity="0.6"
          />
          <line
            x1={250 + 140}
            y1={235}
            x2={250 + 140}
            y2={265}
            stroke="#4b5563"
            strokeWidth="1"
            opacity="0.6"
          />
          <line
            x1={250 + 140 + airGapPixels}
            y1={235}
            x2={250 + 140 + airGapPixels}
            y2={265}
            stroke="#4b5563"
            strokeWidth="1"
            opacity="0.6"
          />
          <text
            x={250 + 140 + airGapPixels / 2}
            y={225}
            textAnchor="middle"
            fontSize="9"
            fill="#4b5563"
            fontWeight="bold"
          >
            Air Gap {params.airGap.toFixed(1)}mm
          </text>

          {/* Radius annotation */}
          <line
            x1={250}
            y1={250}
            x2={250 + 120}
            y2={250 - 70}
            stroke="#6b7280"
            strokeWidth="1.5"
            strokeDasharray="4,4"
            opacity="0.5"
          />
          <text
            x={320}
            y={160}
            fontSize="10"
            fill="#6b7280"
            fontWeight="bold"
          >
            R = {params.rotorRadius}mm
          </text>

          {/* Field Strength annotation */}
          <text
            x={250}
            y={100}
            textAnchor="middle"
            fontSize="10"
            fill="#6b7280"
            fontWeight="bold"
          >
            B = {params.fieldStrength}mT
          </text>

          {/* Rotation indicator */}
          <text
            x={400}
            y={100}
            textAnchor="middle"
            fontSize="9"
            fill="#6b7280"
            fontWeight="bold"
          >
            {params.rpm} RPM
          </text>
        </g>

        {/* Border frame */}
        <rect
          x="5"
          y="5"
          width="490"
          height="490"
          fill="none"
          stroke="#475569"
          strokeWidth="1"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
