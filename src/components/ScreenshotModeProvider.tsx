"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface ScreenshotModeContextType {
  screenshotMode: boolean;
  setScreenshotMode: (v: boolean) => void;
}

const ScreenshotModeContext = createContext<ScreenshotModeContextType>({
  screenshotMode: false,
  setScreenshotMode: () => {},
});

export const useScreenshotMode = () => useContext(ScreenshotModeContext);

export const ScreenshotModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [screenshotMode, setScreenshotMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('taskflow_screenshot_mode');
    if (saved === 'true') setScreenshotMode(true);
  }, []);

  const update = (v: boolean) => {
    setScreenshotMode(v);
    localStorage.setItem('taskflow_screenshot_mode', String(v));
  };

  return (
    <ScreenshotModeContext.Provider value={{ screenshotMode, setScreenshotMode: update }}>
      {children}
    </ScreenshotModeContext.Provider>
  );
};