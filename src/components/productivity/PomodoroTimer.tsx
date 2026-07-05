"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Play, Pause, RotateCcw, Coffee, Zap, 
  Settings2, SkipForward, Volume2, VolumeX,
  Trophy
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

type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface TimerPreset {
  id: string;
  name: string;
  work: number;
  shortBreak: number;
  longBreak: number;
  sessionsBeforeLong: number;
}

const PRESETS: TimerPreset[] = [
  { id: 'pomodoro', name: 'Classic Pomodoro', work: 25, shortBreak: 5, longBreak: 15, sessionsBeforeLong: 4 },
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

  const workDuration = settings.workDuration || 25;
  const totalTime = mode === 'work' ? workDuration * 60 : mode === 'shortBreak' ? preset.shortBreak * 60 : preset.longBreak * 60;
  const progress = (timeLeft / totalTime) * 100;

  const playSound = (sound: string) => {
    if (!settings.soundEnabled) return;
    const context = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gainNode = context.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    gainNode.gain.value = settings.volume / 100;
    oscillator.type = 'sine';
    switch (sound) {
      case 'Classic Bell':
        oscillator.frequency.value = 880;
        break;
      case 'Digital Beep':
        oscillator.frequency.value = 1000;
        break;
      case 'Soft Chime':
        oscillator.frequency.value = 523;
        break;
      case 'Gentle Piano':
        oscillator.frequency.value = 392;
        break;
      case 'Zen Gong':
        oscillator.frequency.value = 261;
        break;
      case 'Notification Ding':
        oscillator.frequency.value = 1568;
        break;
      case 'No Sound':
        return;
    }
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
  };

  const switchMode = useCallback((nextMode: TimerMode) => {
    setIsActive(false);
    setMode(nextMode);
    if (nextMode === 'work') setTimeLeft(workDuration * 60);
    else if (nextMode === 'shortBreak') setTimeLeft(preset.shortBreak * 60);
    else setTimeLeft(preset.longBreak * 60);
  }, [workDuration, preset]);

  useEffect(() => {
    const totalTime = mode === 'work' ? workDuration * 60 : mode === 'shortBreak' ? preset.shortBreak * 60 : preset.longBreak * 60;
    setTimeLeft(totalTime);
  }, [mode, workDuration, preset.shortBreak, preset.longBreak]);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (settings.soundEnabled) {
        let soundToPlay: string = 'workSound';
        if (mode === 'work') {
          soundToPlay = settings.workSound;
        } else if (mode === 'shortBreak') {
          soundToPlay = settings.shortBreakSound;
        } else if (mode === 'longBreak') {
          soundToPlay = settings.longBreakSound;
        }
        playSound(soundToPlay);
      }
      if (mode === 'work') {
        const newCount = sessionsCompleted + 1;
        setSessionsCompleted(newCount);
        showSuccess("Focus session complete! Time for a break.");
        if (newCount % preset.sessionsBeforeLong === 0) {
          switchMode('longBreak');
        } else {
          switchMode('shortBreak');
        }
      } else {
        showSuccess("Break over! Ready to focus?");
        switchMode('work');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, sessionsCompleted, preset, settings.soundEnabled, workDuration, switchMode]);

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(workDuration * 60);
  };

  const handleSkip = () => {
    if (mode === 'work') {
      switchMode('shortBreak');
    } else {
      switchMode('work');
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-8 border-slate-200 dark:border-slate-800 rounded-[2.5rem] bg-white dark:bg-slate-900 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
      {/* Background Glow */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
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
                  }}
                  className={cn("rounded-xl", preset.id === p.id && "bg-blue-50 text-blue-600 dark:bg-blue-900/20")}
                >
                  {p.name} ({p.work}/{p.shortBreak})
                </DropdownMenuItem>
              ))}
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

        <div className="flex flex-col items-center mb-10">
          {/* Circular Progress */}
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
                    "flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2",
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

          <div className="flex gap-3">
            <Button 
              onClick={() => setIsActive(!isActive)}
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
              variant="outline" 
              size="icon" 
              onClick={handleSkip}
              className="w-16 h-16 rounded-2xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
            >
              <SkipForward size={24} />
            </Button>
          </div>

          <div className="mt-8 flex items-center justify-center gap-6">
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
      </div>
    </Card>
  );
};

export default PomodoroTimer;