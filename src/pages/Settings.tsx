"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
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
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useTasks } from "@/hooks/use-tasks";
import { showSuccess, showError } from "@/utils/toast";
import { FilterOption, SortOption } from "@/types/task";
import {
 Sun, Moon, Monitor, Settings2, ShieldCheck, Download, Upload, Trash2, Timer, Info
} from 'lucide-react';

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
   <div className="max-w-2xl mx-auto px-4 py-4">
    <h1 className="text-2xl font-bold tracking-tight mb-6">Settings</h1>

    <div className="space-y-5">
      {/* Appearance */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Sun size={18} className="text-blue-500" />
        Appearance
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm">Theme Mode</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">Choose how TaskFlow looks to you.</p>
         </div>
         <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
          <Button
           variant={theme === 'light' ? 'secondary' : 'ghost'}
           size="sm"
           onClick={() => setTheme('light')}
           className="rounded-md gap-1 text-xs"
          >
           <Sun size={12} />
           Light
          </Button>
          <Button
           variant={theme === 'dark' ? 'secondary' : 'ghost'}
           size="sm"
           onClick={() => setTheme('dark')}
           className="rounded-md gap-1 text-xs"
          >
           <Moon size={12} />
           Dark
          </Button>
          <Button
           variant={theme === 'system' ? 'secondary' : 'ghost'}
           size="sm"
           onClick={() => setTheme('system')}
           className="rounded-md gap-1 text-xs"
          >
           <Monitor size={12} />
           System
          </Button>
         </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
         <div className="space-y-0.5">
          <Label className="text-sm">Enable Animations</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">Smooth transitions and micro-interactions.</p>
         </div>
         <Switch checked={settings.animationsEnabled} onCheckedChange={(val) => updateSettings({ animationsEnabled: val })} />
        </div>
       </Card>
      </section>

      {/* Preferences */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Settings2 size={18} className="text-blue-500" />
        Preferences
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm">Default Filter</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">The view you see when opening the app.</p>
         </div>
         <Select
          value={settings.defaultFilter}
          onValueChange={(val) => updateSettings({ defaultFilter: val as FilterOption })}
         >
          <SelectTrigger className="w-[120px] rounded-md h-9">
           <SelectValue className="text-sm" />
          </SelectTrigger>
          <SelectContent className="rounded-md">
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

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
         <div className="space-y-0.5">
          <Label className="text-sm">Default Sorting</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">How tasks are ordered by default.</p>
         </div>
         <Select
          value={settings.defaultSort}
          onValueChange={(val) => updateSettings({ defaultSort: val as SortOption })}
         >
          <SelectTrigger className="w-[120px] rounded-md h-9">
           <SelectValue className="text-sm" />
          </SelectTrigger>
          <SelectContent className="rounded-md">
           <SelectItem value="Newest">Newest</SelectItem>
           <SelectItem value="Oldest">Oldest</SelectItem>
           <SelectItem value="Alphabetical">Alphabetical</SelectItem>
           <SelectItem value="Due Date">Due Date</SelectItem>
           <SelectItem value="Priority">Priority</SelectItem>
          </SelectContent>
         </Select>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
         <div className="space-y-0.5">
          <Label className="text-sm">Work Session Duration (min)</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">Set the length of your work session.</p>
         </div>
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
          className="rounded-md border border-slate-200 dark:border-slate-800 w-[60px] h-9 text-sm px-2"
         />
        </div>
       </Card>
      </section>

      {/* Timer Settings */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Timer size={18} className="text-blue-500" />
        Timer Settings
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm">Timer Sounds</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">Configure sounds for timer notifications.</p>
         </div>
         <Switch checked={settings.soundEnabled} onCheckedChange={(val) => updateSettings({ soundEnabled: val })} />
        </div>

        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
         <div className="flex flex-col items-center">
          <Label className="text-xs">Work Sound</Label>
          <Select>
           <SelectTrigger className="w-[100px] rounded-md h-8">
            <SelectValue className="text-xs" />
           </SelectTrigger>
           <SelectContent className="rounded-md">
            <SelectItem value="Classic Bell" className="text-xs">Classic Bell</SelectItem>
            <SelectItem value="Digital Beep" className="text-xs">Digital Beep</SelectItem>
            <SelectItem value="Soft Chime" className="text-xs">Soft Chime</SelectItem>
            <SelectItem value="Gentle Piano" className="text-xs">Gentle Piano</SelectItem>
            <SelectItem value="Zen Gong" className="text-xs">Zen Gong</SelectItem>
            <SelectItem value="No Sound" className="text-xs">No Sound</SelectItem>
           </SelectContent>
          </Select>
         </div>
         <div className="flex flex-col items-center">
          <Label className="text-xs">Short Break Sound</Label>
          <Select>
           <SelectTrigger className="w-[100px] rounded-md h-8">
            <SelectValue className="text-xs" />
           </SelectTrigger>
           <SelectContent className="rounded-md">
            <SelectItem value="Classic Bell" className="text-xs">Classic Bell</SelectItem>
            <SelectItem value="Digital Beep" className="text-xs">Digital Beep</SelectItem>
            <SelectItem value="Soft Chime" className="text-xs">Soft Chime</SelectItem>
            <SelectItem value="Gentle Piano" className="text-xs">Gentle Piano</SelectItem>
            <SelectItem value="Zen Gong" className="text-xs">Zen Gong</SelectItem>
            <SelectItem value="No Sound" className="text-xs">No Sound</SelectItem>
           </SelectContent>
          </Select>
         </div>
         <div className="flex flex-col items-center">
          <Label className="text-xs">Long Break Sound</Label>
          <Select>
           <SelectTrigger className="w-[100px] rounded-md h-8">
            <SelectValue className="text-xs" />
           </SelectTrigger>
           <SelectContent className="rounded-md">
            <SelectItem value="Classic Bell" className="text-xs">Classic Bell</SelectItem>
            <SelectItem value="Digital Beep" className="text-xs">Digital Beep</SelectItem>
            <SelectItem value="Soft Chime" className="text-xs">Soft Chime</SelectItem>
            <SelectItem value="Gentle Piano" className="text-xs">Gentle Piano</SelectItem>
            <SelectItem value="Zen Gong" className="text-xs">Zen Gong</SelectItem>
            <SelectItem value="No Sound" className="text-xs">No Sound</SelectItem>
           </SelectContent>
          </Select>
         </div>
        </div>
       </Card>
      </section>

      {/* Data Management */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <ShieldCheck size={18} className="text-blue-500" />
        Data & Privacy
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm">Export Data</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">Download a backup of all your tasks and settings.</p>
         </div>
         <Button variant="outline" onClick={exportData} className="rounded-md gap-1 text-sm">
          <Download size={14} />
          Export JSON
         </Button>
        </div>

        <div className="flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm">Import Data</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">Restore tasks from a backup file.</p>
         </div>
         <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="rounded-md gap-1 text-sm">
          <Upload size={14} />
          Import JSON
         </Button>
         <input
          type="file"
          ref={fileInputRef}
          onChange={handleImport}
          accept=".json"
          className="hidden"
         />
        </div>

        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm text-red-600">Reset All Data</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">Permanently delete all tasks and reset the application to its default state.</p>
         </div>
         <AlertDialog>
          <AlertDialogTrigger asChild>
           <Button variant="destructive" className="rounded-md gap-1 text-sm">
            <Trash2 size={14} />
            Reset App
           </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-lg">
           <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
             This action cannot be undone. This will permanently delete all your tasks and reset the application to its default state.
            </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={resetData} className="bg-red-600 hover:bg-red-700 rounded-md">
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
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Info size={18} className="text-blue-500" />
        About
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-2">
         <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-md">
           <ShieldCheck size={20} />
          </div>
          <div>
           <h3 className="text-sm font-medium">TaskFlow v1.0.0</h3>
           <p className="text-xs text-slate-500">Organize your life beautifully.</p>
          </div>
         </div>
         <p className="text-xs text-slate-500 leading-relaxed">
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