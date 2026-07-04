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
  ShieldCheck
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
import { showSuccess, showError } from '@/utils/toast';

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { resetData, exportData, importData } = useTasks();
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
                  <p className="text-sm text-slate-500 dark:text-slate-400">Download a backup of all your tasks.</p>
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
                  <p className="text-sm text-slate-500 dark:text-slate-400">Permanently delete all tasks and settings.</p>
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