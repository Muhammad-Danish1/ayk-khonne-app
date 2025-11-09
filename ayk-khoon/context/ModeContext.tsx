import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserMode = 'user' | 'bloodbank';

interface ModeContextType {
  mode: UserMode;
  switchMode: (newMode: UserMode) => void;
  isBloodBank: boolean;
  bloodbankStatus: 'none' | 'pending' | 'approved';
  setBloodbankStatus: (status: 'none' | 'pending' | 'approved') => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<UserMode>('user');
  const [bloodbankStatus, setBloodbankStatus] = useState<'none' | 'pending' | 'approved'>('none');

  const switchMode = (newMode: UserMode) => {
    setMode(newMode);
  };

  return (
    <ModeContext.Provider
      value={{
        mode,
        switchMode,
        isBloodBank: mode === 'bloodbank',
        bloodbankStatus,
        setBloodbankStatus,
      }}
    >
      {children}
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within ModeProvider');
  }
  return context;
};
