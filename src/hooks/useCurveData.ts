import { useState, useEffect } from 'react';
import type { Parameters, Model } from '../types';

export interface CurvePoint {
  angle: number;
  voltage: number;
}

/**
 * Seeded random generator for stable noise across re-renders
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Generate voltage curve data based on parameters and model
 * Debounced to 250ms to avoid excessive recalculations
 */
export function useCurveData(params: Parameters, model: Model): CurvePoint[] {
  const [curveData, setCurveData] = useState<CurvePoint[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const data: CurvePoint[] = [];

      // Convert parameters to consistent units
      const vccMv = params.supplyVoltage * 1000; // Supply voltage in mV
      const sensitivity = (params.fieldStrength / 200) * 0.45; // Normalized 0→0.45
      const phaseShift = (params.polarizationAngle * Math.PI) / 180; // Convert to radians

      // Generate 360 points (one per degree)
      for (let angle = 0; angle < 360; angle++) {
        const angleRad = (angle * Math.PI) / 180;

        // Base formula: (Vcc/2) + (Vcc * sensitivity * sin(angle + phaseShift)) + offset
        let voltage =
          vccMv / 2 +
          vccMv * sensitivity * Math.sin(angleRad + phaseShift) +
          params.outputOffset;

        // Apply per-model variations (increasingly distorted)
        if (model === 'B') {
          // 2nd harmonic distortion - moderate
          voltage +=
            Math.sin(2 * angleRad) * params.fieldStrength * 0.25;
        } else if (model === 'C') {
          // 2nd + 3rd + 4th harmonics + significant noise - high distortion
          voltage +=
            Math.sin(2 * angleRad) * params.fieldStrength * 0.35 +
            Math.sin(3 * angleRad) * 40 +
            Math.sin(4 * angleRad) * 15;

          // Seeded noise (±15mV for more variation)
          const noise = (seededRandom(model.charCodeAt(0) + angle) - 0.5) * 30;
          voltage += noise;
        }

        data.push({ angle, voltage });
      }

      setCurveData(data);
    }, 250);

    return () => clearTimeout(timeout);
  }, [params, model]);

  return curveData;
}
