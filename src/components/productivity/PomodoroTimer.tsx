"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, Pause, RotateCcw, Coffee, Zap, 
  Settings2, SkipForward, Trophy
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocalStorage } from '@/utils/local-storage';

// Define timer modes
type TimerMode = 'work' | 'shortBreak' | 'longBreak';

// Preset definitions
const PRESETS = [
  { id: 'pomodoro', name: 'Pomodoro', work: 25, shortBreak: 5, longBreak: 15, sessionsBeforeLong: 4 },
  { id: 'deep', name: 'Deep Work', work: 50, shortBreak: 10, longBreak: 30, sessionsBeforeLong: 2 },
  { id: 'study', name: 'Study Session', work: 45, shortBreak: 15, longBreak: 20, sessionsBeforeLong: 3 },
  { id: 'quick', name: 'Quick Focus', work: 15, shortBreak: 3, longBreak: 10, sessionsBeforeLong: 4 },
];

interface TimerSettings {
  id: string;
  name: string;
  work: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLong: number;
  presetId?: string;
}

const PomodoroTimer = () => {
  // Load and persist settings & presets using the custom hook
  const [savedSettings, setSavedSettings] = useLocalStorage('timerSettings', {
    id: 'pomodoro',
    name: 'Pomodoro',
    work: 25,
    shortBreak: 5,
    longBreak: 15,
    sessionsBeforeLong: 4,
    presetId: 'pomodoro',
  });

  const [savedPresets, setSavedPresets] = useLocalStorage('timerPresets', PRESETS);

  const [settings, setSettings] = useState<TimerSettings>(savedSettings);
  const [presets, setPresets] = useState<TimerSettings[]>(savedPresets);
  const [currentPreset, setCurrentPreset] = useState<TimerSettings | null>(null);

  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Sync state changes back to localStorage
  useEffect(() => {
    setSavedSettings(settings);
  }, [settings, setSavedSettings]);

  useEffect(() => {
    setSavedPresets(presets);
  }, [presets, setSavedPresets]);

  // When component mounts, set current preset if saved
  useEffect(() => {
    if (settings.presetId) {
      const preset = presets.find(p => p.id === settings.presetId) || null;
      setCurrentPreset(preset);
    }
  }, [settings.presetId, presets]);

  // Timer calculations
  const totalTime = mode === 'work' ? settings.work * 60 :
                    mode === 'shortBreak' ? settings.shortBreak * 60 :
                    settings.longBreak * 60;

  const progress = (timeLeft / totalTime) * 100;

  const switchMode = useCallback((nextMode: TimerMode) => {
    setIsActive(false);
    setMode(nextMode);
    if (nextMode === 'work') setTimeLeft(settings.work * 60);
    else if (nextMode === 'shortBreak') setTimeLeft(settings.shortBreak * 60);
    else setTimeLeft(settings.longBreak * 60);
  }, [settings]);

  // Main timer interval
  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (!isMuted) {
        // optional sound
      }

      if (mode === 'work') {
        const newCount = sessionsCompleted + 1;
        setSessionsCompleted(newCount);
        showSuccess('Focus session complete! Time for a break.');
        if (newCount % settings.sessionsBeforeLong === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        showSuccess('Break over! Ready to focus?');
        switchMode('work');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, sessionsCompleted, settings, isMuted, switchMode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  // Control handlers
  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(totalTime);
  };
  const handlePause = () => setIsActive(false);
  const handleResume = () => setIsActive(true);
  const handleRestart = () => {
    setIsActive(false);
    setTimeLeft(totalTime);
  };
  const handleSkip = () => {
    if (mode === 'work') switchMode('shortBreak');
    else switchMode('work');
  };

  // Preset management (add/delete)
  const addPreset = (preset: TimerSettings) => {
    setPresets(prev => [...prev, preset]);
    setCurrentPreset(preset);
    setSettings(preset);
  };

  const deletePreset = (id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
    if (currentPreset?.id === id) {
      setCurrentPreset(null);
      setSettings(prev => ({ ...prev, presetId: undefined }));
    }
  };

  return (
    <Card className="p-8 border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
      {/* Background glow */}
      <div className={cn(
        "absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-colors duration-700",
        mode === 'work' ? "bg-blue-500" : "bg-emerald-500"
      )} />

      <div className="relative z-10">
        {/* Preset selector */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPreset(null)}
              className="rounded-full gap-2 text-slate-500"
            >
              <Settings2 size={16} /> Custom
            </Button>
            {currentPreset && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setCurrentPreset(currentPreset);
                  setSettings(currentPreset);
                }}
                className="rounded-full gap-2 text-slate-500"
              >
                <Trophy size={16} /> {currentPreset.name}
              </Button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            <Button
              onClick={handleStart}
              className={cn(
                "flex-[2] h-16 rounded-2xl text-lg font-black transition-all shadow-xl active:scale-95",
                isActive
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                  : mode === 'work'
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
                    : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
              )}
            >
              {isActive ? <Pause className="mr-2 fill-current" /> : <Play className="mr-2 fill-current" />}
              {isActive ? 'Pause' : 'Start Session'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePause}
              className="w-16 h-16 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
            >
              <Pause size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleResume}
              className="w-16 h-16 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
            >
              <Play size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleRestart}
              className="w-16 h-16 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
            >
              <RotateCcw size={24} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSkip}
              className="w-16 h-16 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
            >
              <SkipForward size={24} />
            </Button>
          </div>
        </div>

        {/* Countdown display */}
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="relative w-64 h-64 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform">
              <circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                className="text-slate-100 dark:text-slate-800"
              />
              <motion.circle
                cx="128"
                cy="128"
                r="120"
                stroke="currentColor"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray="753.98"
                initial={{ strokeDashoffset: 753.98 }}
                animate={{ strokeDashoffset: 753.98 * (progress / 100) }}
                transition={{ duration: 1, ease: "linear" }}
                className={cn(
                  "transition-colors duration-500",
                  mode === 'work' ? "text-blue-600" : "text-emerald-500"
                )}
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={cn(
                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-2",
                    mode === 'work' ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30"
                  )}
                >
                  {mode === 'work' ? <Zap size={12} /> : <Coffee size={12} />}
                  {mode === 'work' ? 'Focus' : 'Break'}
                </motion.div>
              </AnimatePresence>
              <h2 className="text-6xl font-black tracking-tighter tabular-nums">
                {formatTime(timeLeft)}
              </h2>
            </div>
          </div>
        </div>

        {/* Session indicators */}
        <div className="flex gap-3">
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sessions</span>
            <div className="flex gap-1.5">
              {Array.from({ length: settings.sessionsBeforeLong }).map((_, i) => (
                <div
                  key={i}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all duration-500",
                    i < (sessionsCompleted % settings.sessionsBeforeLong)
                      ? "bg-blue-600 scale-110"
                      : "bg-slate-200 dark:bg-slate-800"
                  )}
                />
              ))}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total</span>
            <div className="flex items-center gap-1 text-slate-900 dark:text-white font-black">
              <Trophy size={14} className="text-amber-500" />
              {sessionsCompleted}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PomodoroTimer;