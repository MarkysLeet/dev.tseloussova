'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextType {
  isPreloaderDone: boolean;
  setPreloaderDone: (value: boolean) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isPreloaderDone, setPreloaderDone] = useState(false);

  return (
    <PreloaderContext.Provider value={{ isPreloaderDone, setPreloaderDone }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (context === undefined) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
}
