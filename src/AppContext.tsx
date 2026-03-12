import { createContext, useContext, useState } from 'react';
import type { Model, Parameters, ActiveTab, AppContextType } from './types';

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_PARAMS: Parameters = {
  airGap: 2,
  rotorRadius: 20,
  magnetThickness: 4,
  fieldStrength: 80,
  polarizationAngle: 45,
  supplyVoltage: 5.0,
  outputOffset: 0,
  rpm: 1000,
  targetAngle: 180,
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [selectedModel, setSelectedModel] = useState<Model>('A');
  const [params, setParams] = useState<Parameters>(DEFAULT_PARAMS);
  const [activeTab, setActiveTab] = useState<ActiveTab>('rotor');

  return (
    <AppContext.Provider
      value={{
        selectedModel,
        setSelectedModel,
        params,
        setParams,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
}
