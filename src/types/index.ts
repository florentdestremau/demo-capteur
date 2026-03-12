export type Model = 'A' | 'B' | 'C';
export type ActiveTab = 'rotor' | 'chart';

export interface Parameters {
  // Geometry & Magnetics (left sidebar)
  airGap: number;
  rotorRadius: number;
  magnetThickness: number;
  fieldStrength: number;
  polarizationAngle: number;

  // Electrical & Rotation (right sidebar)
  supplyVoltage: number;
  outputOffset: number;
  rpm: number;
  targetAngle: number;
}

export interface ParameterConfig {
  min: number;
  max: number;
  default: number;
  unit: string;
  step: number;
}

export interface AppContextType {
  selectedModel: Model;
  setSelectedModel: (model: Model) => void;
  params: Parameters;
  setParams: (params: Parameters) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}
