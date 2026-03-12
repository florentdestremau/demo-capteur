import type { ParameterConfig } from '../types';

export const PARAM_CONFIGS: Record<string, ParameterConfig> = {
  // Geometry & Magnetics
  airGap: {
    min: 0.5,
    max: 5,
    default: 2,
    unit: 'mm',
    step: 0.1,
  },
  rotorRadius: {
    min: 5,
    max: 50,
    default: 20,
    unit: 'mm',
    step: 1,
  },
  magnetThickness: {
    min: 1,
    max: 10,
    default: 4,
    unit: 'mm',
    step: 0.5,
  },
  fieldStrength: {
    min: 10,
    max: 200,
    default: 80,
    unit: 'mT',
    step: 5,
  },
  polarizationAngle: {
    min: 0,
    max: 90,
    default: 45,
    unit: '°',
    step: 1,
  },

  // Electrical & Rotation
  supplyVoltage: {
    min: 3.3,
    max: 5.0,
    default: 5.0,
    unit: 'V',
    step: 0.1,
  },
  outputOffset: {
    min: -200,
    max: 200,
    default: 0,
    unit: 'mV',
    step: 10,
  },
  rpm: {
    min: 100,
    max: 10000,
    default: 1000,
    unit: 'RPM',
    step: 100,
  },
  targetAngle: {
    min: 0,
    max: 360,
    default: 180,
    unit: '°',
    step: 1,
  },
};

export function useModelConfig(paramName: keyof typeof PARAM_CONFIGS) {
  return PARAM_CONFIGS[paramName];
}
