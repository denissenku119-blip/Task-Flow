"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, Coffee, Zap } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { showSuccess } from '@/utils/toast';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const nextMode = mode === 'work' ? 'break' : 'work';
      setMode(nextMode);
      setTimeLeft(nextMode === 'work' ? 25 * 60 : 5 * 60);
      showSuccess(nextMode === 'work' ? "Break over! Time to focus." : "Great work! Take a break.");
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progress = (timeLeft / (mode === 'work' ? 25 * 60 : 5 * 60)) * 100;

  return (
    <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden relative">
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold uppercase tracking-wider">
            {mode === 'work' ? <Zap size={14} className="text-amber-400" /> : <Coffee size={14} className="text-blue-400" />}
            {mode} session
          </div>
          <Button variant="ghost" size="icon" onClick={() => { setIsActive(false); setTimeLeft(25 * 60); }} className="text-white/50 hover:text-white">
            <RotateCcw size={18} />
          </Button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-6xl font-black tracking-tighter mb-2">{formatTime(timeLeft)}</h2>
          <p className="text-white/40 text-sm">Stay focused on your current task</p>
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={() => setIsActive(!isActive)}
            className={cn(
              "flex-1 h-14 rounded-2xl text-lg font-bold transition-all",
              isActive ? "bg-white/10 hover:bg-white/20 text-white" : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
            )}
          >
            {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
            {isActive ? 'Pause' : 'Start Focus'}
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5">
        <motion.div 
          className="h-full bg-blue-500"
          initial={{ width: '100%' }}
          animate={{ width: `${progress}%` }}
        />
      </div>
    </Card>
  );
};

export default PomodoroTimer;