"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Play, Pause, RotateCcw, Coffee, Zap, 
  Settings2, SkipForward, Volume2, VolumeX,
  Trophy, Timer
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTasks } from '@/hooks/use-tasks';

type TimerMode = 'work' | 'shortBreak' | 'longBreak' | 'custom';

interface TimerPreset {
  id: string;
  name: string;
  work: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLong: number;
}

const PRESETS: TimerPreset[] = [
  { id: 'pomodoro', name: 'Pomodoro', work: 25, shortBreak: 5, longBreak: 15, sessionsBeforeLong: 4 },
  { id: 'deep', name: 'Deep Work', work: 50, shortBreak: 10, longBreak: 30, sessionsBeforeLong: 2 },
  { id: 'study', name: 'Study Session', work: 45, shortBreak: 15, longBreak: 20, sessionsBeforeLong: 3 },
  { id: 'quick', name: 'Quick Focus', work: 15, shortBreak: 3, longBreak: 10, sessionsBeforeLong: 4 },
];

const PomodoroTimer = () => {
  const { settings } = useTasks();
  const [preset, setPreset] = useState<TimerPreset>(PRESETS[0]);
  const [mode, setMode] = useState<TimerMode>('work');
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(25);
  const [customSeconds, setCustomSeconds] = useState(0);
  const [showCustomInputs, setShowCustomInputs] = useState(false);

  // Load saved custom duration on mount
  useEffect(() => {
    const saved = localStorage.getItem('customTimerDuration');
    if (saved) {
      const { hours, minutes, seconds } = JSON.parse(saved);
      setCustomHours(hours);
      setCustomMinutes(minutes);
      setCustomSeconds(seconds);
    }
  }, []);

  const workDuration = settings.workDuration || 25;
  
  const getCustomTotalSeconds = () => {
    return (customHours * 3600) + (customMinutes * 60) + customSeconds;
  };

  const totalTime = mode === 'work' 
    ? workDuration * 60 
    : mode === 'shortBreak' 
      ? preset.shortBreak * 60 
      : mode === 'longBreak' 
        ? preset.longBreak * 60 
        : getCustomTotalSeconds();
  
  const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;

  const switchMode = useCallback((nextMode: TimerMode) => {
    setIsActive(false);
    setMode(nextMode);
    if (nextMode === 'work') setTimeLeft(workDuration * 60);
    else if (nextMode === 'shortBreak') setTimeLeft(preset.shortBreak * 60);
    else if (nextMode === 'longBreak') setTimeLeft(preset.longBreak * 60);
    else setTimeLeft(getCustomTotalSeconds());
  }, [workDuration, preset, customHours, customMinutes, customSeconds]);

  useEffect(() => {
    let totalTime = 0;
    if (mode === 'work') totalTime = workDuration * 60;
    else if (mode === 'shortBreak') totalTime = preset.shortBreak * 60;
    else if (mode === 'longBreak') totalTime = preset.longBreak * 60;
    else totalTime = getCustomTotalSeconds();
    setTimeLeft(totalTime);
  }, [mode, workDuration, preset.shortBreak, preset.longBreak, customHours, customMinutes, customSeconds]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      if (mode === 'work') {
        const newCount = sessionsCompleted + 1;
        setSessionsCompleted(newCount);
        showSuccess("Focus session complete! Time for a break.");
        if (newCount % preset.sessionsBeforeLong === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else if (mode === 'shortBreak' || mode === 'longBreak') {
        showSuccess("Break over! Ready to focus?");
        switchMode('work');
      } else if (mode === 'custom') {
        showSuccess("Custom timer complete!");
        switchMode('work');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, sessionsCompleted, preset, workDuration, switchMode]);

  const handleReset = () => {
    setIsActive(false);
    if (mode === 'work') setTimeLeft(workDuration * 60);
    else if (mode === 'shortBreak') setTimeLeft(preset.shortBreak * 60);
    else if (mode === 'longBreak') setTimeLeft(preset.longBreak * 60);
    else setTimeLeft(getCustomTotalSeconds());
  };

  const handleSkip = () => {
    if (mode === 'work') {
      switchMode('shortBreak');
    } else if (mode === 'shortBreak' || mode === 'longBreak') {
      switchMode('work');
    } else {
      switchMode('work');
    }
  };

  const handleCustomStart = () => {
    // Save custom duration
    localStorage.setItem('customTimerDuration', JSON.stringify({
      hours: customHours,
      minutes: customMinutes,
      seconds: customSeconds
    }));
    setMode('custom');
    setTimeLeft(getCustomTotalSeconds());
    setIsActive(true);
    setShowCustomInputs(false);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-3xl bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="rounded-full gap-2 font-bold text-slate-500">
                <Settings2 size={16} />
                {preset.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-2xl w-56">
              <DropdownMenuLabel>Timer Presets</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {PRESETS.map(p => (
                <DropdownMenuItem 
                  key={p.id} 
                  onClick={() => {
                    setPreset(p);
                    setMode('work');
                    setTimeLeft(p.work * 60);
                    setIsActive(false);
                    setShowCustomInputs(false);
                  }}
                  className={cn("rounded-xl", preset.id === p.id && "bg-blue-50 text-blue-600 dark:bg-blue-900/20")}
                >
                  {p.name} ({p.work}/{p.shortBreak})
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => {
                  setShowCustomInputs(true);
                  setMode('custom');
                  setTimeLeft(getCustomTotalSeconds());
                  setIsActive(false);
                }}
                className="rounded-xl"
              >
                <Timer size={14} className="mr-2" />
                Custom Timer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="rounded-full text-slate-400">
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset} className="rounded-full text-slate-400">
              <RotateCcw size={18} />
            </Button>
          </div>
        </div>

        {showCustomInputs ? (
          <div className="mb-6 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor="hours" className="text-xs text-slate-500">Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  min="0"
                  max="23"
                  value={customHours}
                  onChange={(e) => setCustomHours(Math.min(23, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="h-9 rounded-xl text-center"
                />
              </div>
              <div>
                <Label htmlFor="minutes" className="text-xs text-slate-500">Minutes</Label>
                <Input
                  id="minutes"
                  type="number"
                  min="0"
                  max="59"
                  value={customMinutes}
                  onChange={(e) => setCustomMinutes(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="h-9 rounded-xl text-center"
                />
              </div>
              <div>
                <Label htmlFor="seconds" className="text-xs text-slate-500">Seconds</Label>
                <Input
                  id="seconds"
                  type="number"
                  min="0"
                  max="59"
                  value={customSeconds}
                  onChange={(e) => setCustomSeconds(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
                  className="h-9 rounded-xl text-center"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={handleCustomStart}
                className="flex-1 h-10 rounded-xl font-bold"
                disabled={getCustomTotalSeconds() === 0}
              >
                Start Custom
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCustomInputs(false)}
                className="h-10 rounded-xl"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform">
                <circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  className="text-slate-100 dark:text-slate-800"
                />
                <motion.circle
                  cx="128"
                  cy="128"
                  r="112"
                  stroke="currentColor"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="703.72"
                  initial={{ strokeDashoffset: 703.72 }}
                  animate={{ strokeDashoffset: 703.72 * (progress / 100) }}
                  transition={{ duration: 1, ease: "linear" }}
                  className={cn(
                    "transition-colors duration-500",
                    mode === 'work' ? "text-blue-600" : mode === 'custom' ? "text-indigo-600" : "text-emerald-500"
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
                    transition={{ duration: 0.2 }}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2",
                      mode === 'work' 
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30" 
                        : mode === 'custom'
                          ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30"
                          : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30"
                    )}
                  >
                    {mode === 'work' ? <Zap size={12} /> : mode === 'custom' ? <Timer size={12} /> : <Coffee size={12} />}
                    {mode === 'work' ? 'Focus' : mode === 'custom' ? 'Custom' : 'Break'}
                  </motion.div>
                </AnimatePresence>
                <h2 className="text-5xl font-black tracking-tighter tabular-nums">
                  {formatTime(timeLeft)}
                </h2>
              </div>
            </div>

            <div className="flex gap-3 mt-4">
              <Button 
                onClick={() => setIsActive(!isActive)}
                className={cn(
                  "flex-[2] h-12 rounded-xl font-bold transition-all shadow-xl active:scale-95",
                  isActive 
                    ? "bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700" 
                    : mode === 'work' 
                      ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20" 
                      : mode === 'custom'
                        ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-500/20"
                )}
              >
                {isActive ? <Pause className="mr-2 fill-current" /> : <Play className="mr-2 fill-current" />}
                {isActive ? 'Pause' : 'Start Session'}
              </Button>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleSkip}
                className="w-12 h-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
              >
                <SkipForward size={20} />
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-center gap-6">
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Sessions</span>
                <div className="flex gap-1.5">
                  {Array.from({ length: preset.sessionsBeforeLong }).map((_, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "w-2 h-2 rounded-full transition-all duration-500",
                        i < (sessionsCompleted % preset.sessionsBeforeLong) 
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
        )}
      </div>
    </Card>
  );
};

export default PomodoroTimer;