"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Download, 
  Upload, 
  Trash2, 
  Moon, 
  Sun, 
  Monitor,
  Info,
  ShieldCheck,
  Settings2,
  Bell,
  Zap
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useTasks } from '@/hooks/use-tasks';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { showSuccess, showError } from '@/utils/toast';
import { SortOption, FilterOption } from '@/types/task';
import { Input } from "@/components/ui/input";
import { cn } from '@/lib/utils';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings, resetData, exportData, importData } = useTasks();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        importData(content);
        showSuccess("Data imported successfully!");
      };
      reader.onerror = () => showError("Failed to read file.");
      reader.readAsText(file);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Settings</h1>

        <div className="space-y-6">
          {/* Appearance */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sun size={20} className="text-blue-600" />
              Appearance
            </h2>
            <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Theme Mode</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Choose how TaskFlow looks to you.</p>
                </div>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <Button 
                    variant={theme === 'light' ? 'secondary' : 'ghost'} 
                    size="sm" 
                    onClick={() => setTheme('light')}
                    className="rounded-lg gap-2"
                  >
                    <Sun size={16} /> Light
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'secondary' : 'ghost'} 
                    size="sm" 
                    onClick={() => setTheme('dark')}
                    className="rounded-lg gap-2"
                  >
                    <Moon size={16} /> Dark
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'secondary' : 'ghost'} 
                    size="sm" 
                    onClick={() => setTheme('system')}
                    className="rounded-lg gap-2"
                  >
                    <Monitor size={16} /> System
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <Label className="text-base">Enable Animations</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Smooth transitions and micro-interactions.</p>
                </div>
                <Switch 
                  checked={settings.animationsEnabled} 
                  onCheckedChange={(val) => updateSettings({ animationsEnabled: val })} 
                />
              </div>
            </Card>
          </section>

          {/* Preferences */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Settings2 size={20} className="text-blue-600" />
              Preferences
            </h2>
            <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Default Filter</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">The view you see when opening the app.</p>
                </div>
                <Select 
                  value={settings.defaultFilter} 
                  onValueChange={(val) => updateSettings({ defaultFilter: val as FilterOption })}
                >
                  <SelectTrigger className="w-[180px] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="All">All Tasks</SelectItem>
                    <SelectItem value="Today">Today</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pinned">Pinned</SelectItem>
                    <SelectItem value="Important">Important</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <Label className="text-base">Default Sorting</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">How tasks are ordered by default.</p>
                </div>
                <Select 
                  value={settings.defaultSort} 
                  onValueChange={(val) => updateSettings({ defaultSort: val as SortOption })}
                >
                  <SelectTrigger className="w-[180px] rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Newest">Newest First</SelectItem>
                    <SelectItem value="Oldest">Oldest First</SelectItem>
                    <SelectItem value="Alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="Due Date">Due Date</SelectItem>
                    <SelectItem value="Priority">Priority</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Work Session Duration */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-0.5">
                  <Label className="text-base">Work Session Duration (minutes)</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Set the length of your work session.</p>
                </div>
                <div className="flex items-center">
                  <Input 
                    type="number" 
                    min={1} 
                    max={999} 
                    value={settings.workDuration} 
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      if (!Number.isNaN(val)) {
                        updateSettings({ workDuration: val });
                      }
                    }} 
                    className="rounded-xl border-slate-200 dark:border-slate-800 focus:ring-slate-500"
                  />
                </div>
              </div>

              {/* Timer Sounds */}
              <div className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">Timer Sounds</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Configure sounds for timer notifications.</p>
                  </div>
                  <Switch checked={settings.soundEnabled} onCheckedChange={(val) => updateSettings({ soundEnabled: val })} className="w-16 h-8" />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="space-y-0.5">
                    <Label className="text-base">Volume</Label>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Adjust notification volume.</p>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="range" 
                      min={0} 
                      max={100} 
                      value={settings.volume} 
                      onChange={(e) => updateSettings({ volume: Number(e.target.value) })} 
                      className="w-32 h-2 rounded-full appearance-none accent-blue-500 dark:accent-blue-400 focus:ring-2 focus:ring-blue-300"
                    />
                    <span className="ml-2 text-xs font-medium text-slate-500 dark:text-slate-400">{settings.volume}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center">
                    <Label className="text-base">Work Sound</Label>
                    <Select 
                      value={settings.workSound} 
                      onValueChange={(val) => updateSettings({ workSound: val as string })}
                    >
                      <SelectTrigger className="w-48 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Classic Bell">Classic Bell</SelectItem>
                        <SelectItem value="Digital Beep">Digital Beep</SelectItem>
                        <SelectItem value="Soft Chime">Soft Chime</SelectItem>
                        <SelectItem value="Gentle Piano">Gentle Piano</SelectItem>
                        <SelectItem value="Zen Gong">Zen Gong</SelectItem>
                        <SelectItem value="Notification Ding">Notification Ding</SelectItem>
                        <SelectItem value="No Sound">No Sound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-base">Short Break Sound</Label>
                    <Select 
                      value={settings.shortBreakSound} 
                      onValueChange={(val) => updateSettings({ shortBreakSound: val as string })}
                    >
                      <SelectTrigger className="w-48 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Classic Bell">Classic Bell</SelectItem>
                        <SelectItem value="Digital Beep">Digital Beep</SelectItem>
                        <SelectItem value="Soft Chime">Soft Chime</SelectItem>
                        <SelectItem value="Gentle Piano">Gentle Piano</SelectItem>
                        <SelectItem value="Zen Gong">Zen Gong</SelectItem>
                        <SelectItem value="Notification Ding">Notification Ding</SelectItem>
                        <SelectItem value="No Sound">No Sound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col items-center">
                    <Label className="text-base">Long Break Sound</Label>
                    <Select 
                      value={settings.longBreakSound} 
                      onValueChange={(val) => updateSettings({ longBreakSound: val as string })}
                    >
                      <SelectTrigger className="w-48 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Classic Bell">Classic Bell</SelectItem>
                        <SelectItem value="Digital Beep">Digital Beep</SelectItem>
                        <SelectItem value="Soft Chime">Soft Chime</SelectItem>
                        <SelectItem value="Gentle Piano">Gentle Piano</SelectItem>
                        <SelectItem value="Zen Gong">Zen Gong</SelectItem>
                        <SelectItem value="Notification Ding">Notification Ding</SelectItem>
                        <SelectItem value="No Sound">No Sound</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </Card>
          </section>

          {/* Data Management */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShieldCheck size={20} className="text-blue-600" />
              Data & Privacy
            </h2>
            <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Export Data</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Download a backup of all your tasks and settings.</p>
                </div>
                <Button variant="outline" onClick={exportData} className="rounded-xl gap-2">
                  <Download size={18} /> Export JSON
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Import Data</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Restore tasks from a backup file.</p>
                </div>
                <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="rounded-xl gap-2">
                  <Upload size={18} /> Import JSON
                </Button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImport} 
                  accept=".json" 
                  className="hidden" 
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base text-red-600">Reset All Data</Label>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete all tasks and reset the application to its default state.</p>
                </div>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="rounded-xl gap-2">
                      <Trash2 size={18} /> Reset App
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete all your tasks and reset the application to its default state.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={resetData} className="bg-red-600 hover:bg-red-700 rounded-xl">
                        Yes, Reset Everything
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </Card>
          </section>

          {/* About */}
          <section>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info size={20} className="text-blue-600" />
              About
            </h2>
            <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold">TaskFlow v1.0.0</h3>
                    <p className="text-sm text-slate-500">Organize your life beautifully.</p>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed">
                  TaskFlow is a modern, privacy-focused task management application. All your data is stored locally on your device and never leaves your browser.
                </p>
              </div>
            </Card>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export default Settings;