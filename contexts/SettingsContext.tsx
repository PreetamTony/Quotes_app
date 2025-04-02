import { createContext, ReactNode, useContext, useState } from 'react';

type SettingsContextType = {
  ttsEnabled: boolean;
  toggleTts: () => void;
};

const SettingsContext = createContext<SettingsContextType>({
  ttsEnabled: true,
  toggleTts: () => {},
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [ttsEnabled, setTtsEnabled] = useState(true);

  const toggleTts = () => {
    setTtsEnabled(prev => !prev);
  };

  return (
    <SettingsContext.Provider value={{ ttsEnabled, toggleTts }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
