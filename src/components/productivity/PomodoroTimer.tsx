"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
 Play, Pause, RotateCcw, Zap,
 Settings2, Volume2, VolumeX,
} from 'lucide-react';
import { showSuccess } from '@/utils/toast';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';

const TIMER_STORAGE_KEY = 'taskflow_timer_duration_v2';

interface SavedDuration {
 hours: number;
 minutes: number;
 seconds: number;
}

const loadSavedDuration = (): SavedDuration => {
 try {
  const saved = localStorage.getItem(TIMER_STORAGE_KEY);
  if (saved) {
   const parsed = JSON.parse(saved);
   if (typeof parsed.hours === 'number' && typeof parsed.minutes === 'number' && typeof parsed.seconds === 'number') {
    return parsed;
   }
  }
 } catch {
  // ignore
 }
 return { hours: 0, minutes: 25, seconds: 0 };
};

const toSeconds = (d: SavedDuration) => d.hours * 3600 + d.minutes * 60 + d.seconds;

const playChime = () => {
 try {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return;
  const ctx = new AudioCtx();
  const beep = (freq: number, start: number, dur: number) => {
   const osc = ctx.createOscillator();
   const gain = ctx.createGain();
   osc.type = 'sine';
   osc.frequency.value = freq;
   osc.connect(gain);
   gain.connect(ctx.destination);
   const t = ctx.currentTime + start;
   gain.gain.setValueAtTime(0.0001, t);
   gain.gain.exponentialRampToValueAtTime(0.3, t + 0.02);
   gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
   osc.start(t);
   osc.stop(t + dur);
  };
  beep(880, 0, 0.25);
  beep(1108, 0.18, 0.25);
  beep(1318, 0.36, 0.4);
 } catch {
  // ignore
 }
};

const PomodoroTimer = () => {
 const [inputValues, setInputValues] = useState<SavedDuration>(() => loadSavedDuration());
 const [timeLeft, setTimeLeft] = useState<number>(() => {
  const s = toSeconds(loadSavedDuration());
  return s > 0 ? s : 25 * 60;
 });
 const [isActive, setIsActive] = useState(false);
 const [isMuted, setIsMuted] = useState(false);
 const [isModalOpen, setIsModalOpen] = useState(false);
 const [draft, setDraft] = useState<SavedDuration>({ hours: 0, minutes: 0, seconds: 0 });
 const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

 const totalTime = toSeconds(inputValues) || 1;
 const progress = Math.max(0, Math.min(100, ((totalTime - timeLeft) / totalTime) * 100));

 useEffect(() => {
  if (isActive && timeLeft > 0) {
   intervalRef.current = setInterval(() => {
    setTimeLeft((t) => {
     if (t <= 1) return 0;
     return t - 1;
    });
   }, 1000);
  }
  return () => {
   if (intervalRef.current) clearInterval(intervalRef.current);
  };
 }, [isActive, timeLeft]);

 useEffect(() => {
  if (timeLeft === 0 && isActive) {
   setIsActive(false);
   if (!isMuted) playChime();
   showSuccess("Focus Session Complete");
  }
 }, [timeLeft, isActive, isMuted]);

 const handleStartPause = () => {
  if (timeLeft === 0) {
   const total = toSeconds(inputValues);
   setTimeLeft(total > 0 ? total : 25 * 60);
   setIsActive(true);
   return;
  }
  setIsActive((a) => !a);
 };

 const handleReset = () => {
  setIsActive(false);
  const total = toSeconds(inputValues);
  setTimeLeft(total > 0 ? total : 25 * 60);
 };

 const openModal = () => {
  setDraft(inputValues);
  setIsModalOpen(true);
 };

 const clampField = (v: string, max: number) => {
  const n = parseInt(v, 10);
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(n, max));
 };

 const applyDuration = () => {
  const next: SavedDuration = {
   hours: clampField(String(draft.hours), 99),
   minutes: clampField(String(draft.minutes), 59),
   seconds: clampField(String(draft.seconds), 59),
  };
  const total = toSeconds(next);
  setInputValues(next);
  localStorage.setItem(TIMER_STORAGE_KEY, JSON.stringify(next));
  setTimeLeft(total > 0 ? total : 25 * 60);
  setIsActive(false);
  setIsModalOpen(false);
 };

 const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
 };

 return (
  <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl bg-white dark:bg-slate-900 shadow-sm shadow-blue-500/5 relative overflow-hidden">
   <div className="relative z-10">
    <div className="flex items-center justify-between mb-6">
     <div className="flex items-center gap-2">
      <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600">
       <Zap size={16} />
      </div>
      <h3 className="text-base font-bold">Focus Timer</h3>
     </div>
     <div className="flex items-center gap-1">
      <Button variant="ghost" size="icon" onClick={() => setIsMuted(!isMuted)} className="rounded-full text-slate-400 h-9 w-9">
       {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </Button>
      <Button variant="ghost" size="icon" onClick={openModal} className="rounded-full text-slate-400 h-9 w-9">
       <Settings2 size={18} />
      </Button>
     </div>
    </div>

    <div className="flex flex-col items-center">
     <div className="relative w-56 h-56 flex items-center justify-center mb-6">
      <svg className="w-full h-full -rotate-90 transform">
       <circle cx="112" cy="112" r="104" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100 dark:text-slate-800" />
       <motion.circle cx="112" cy="112" r="104" stroke="currentColor" strokeWidth="8" fill="transparent" strokeLinecap="round" strokeDasharray="653.45" initial={{ strokeDashoffset: 653.45 }} animate={{ strokeDashoffset: 653.45 * (1 - progress / 100) }} transition={{ duration: 0.5, ease: "linear" }} className="text-blue-600" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">Remaining</span>
       <h2 className="text-5xl font-black tracking-tighter tabular-nums">{formatTime(timeLeft)}</h2>
      </div>
     </div>

     <div className="flex gap-3 w-full">
      <Button onClick={handleStartPause} className={cn("flex-1 h-12 rounded-xl text-base font-bold transition-all shadow-md active:scale-95", isActive ? "bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700" : "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20")}>
       {isActive ? <Pause className="mr-2 fill-current" /> : <Play className="mr-2 fill-current" />}
       {isActive ? 'Pause' : timeLeft === 0 ? 'Resume' : 'Start'}
      </Button>
      <Button variant="outline" size="icon" onClick={handleReset} className="h-12 w-12 rounded-xl border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95">
       <RotateCcw size={20} />
      </Button>
     </div>

     <button onClick={openModal} className="mt-4 text-xs font-medium text-slate-400 hover:text-blue-600 transition-colors">
      Set custom time (H : M : S)
     </button>
    </div>
   </div>

   <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
    <DialogContent className="rounded-2xl max-w-sm">
     <DialogHeader>
      <DialogTitle className="flex items-center gap-2">
       <Settings2 size={18} className="text-blue-600" />
       Set Timer Duration
      </DialogTitle>
     </DialogHeader>
     <div className="flex items-end justify-center gap-2 py-2">
      <div className="flex flex-col items-center">
       <Input type="number" min={0} max={99} value={draft.hours} onChange={(e) => setDraft((d) => ({ ...d, hours: clampField(e.target.value, 99) }))} className="w-20 text-center text-2xl font-bold h-14 rounded-xl tabular-nums" />
       <span className="text-xs text-slate-400 mt-1">Hours</span>
      </div>
      <span className="text-2xl font-black text-slate-300 pb-6">:</span>
      <div className="flex flex-col items-center">
       <Input type="number" min={0} max={59} value={draft.minutes} onChange={(e) => setDraft((d) => ({ ...d, minutes: clampField(e.target.value, 59) }))} className="w-20 text-center text-2xl font-bold h-14 rounded-xl tabular-nums" />
       <span className="text-xs text-slate-400 mt-1">Minutes</span>
      </div>
      <span className="text-2xl font-black text-slate-300 pb-6">:</span>
      <div className="flex flex-col items-center">
       <Input type="number" min={0} max={59} value={draft.seconds} onChange={(e) => setDraft((d) => ({ ...d, seconds: clampField(e.target.value, 59) }))} className="w-20 text-center text-2xl font-bold h-14 rounded-xl tabular-nums" />
       <span className="text-xs text-slate-400 mt-1">Seconds</span>
      </div>
     </div>
     <DialogFooter className="gap-2">
      <Button variant="ghost" onClick={() => setIsModalOpen(false)} className="rounded-xl">Cancel</Button>
      <Button onClick={applyDuration} className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6">Apply</Button>
     </DialogFooter>
    </DialogContent>
   </Dialog>
  </Card>
 );
};

export default PomodoroTimer;