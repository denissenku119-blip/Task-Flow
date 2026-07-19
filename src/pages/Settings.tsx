"use client";

import React, { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useTasks } from "@/hooks/use-tasks";
import { showSuccess, showError } from "@/utils/toast";
import { FilterOption, SortOption } from "@/types/task";
import {
 Sun, Moon, Monitor, Settings2, ShieldCheck, Trash2, Info, MessageSquare, Heart, FileText, BookOpen, Code, Shield
} from 'lucide-react';
import { APP_VERSION } from '@/lib/appVersion';

const Settings = () => {
 const { theme, setTheme } = useTheme();
 const { settings, updateSettings, resetData } = useTasks();
 const fileInputRef = React.useRef<HTMLInputElement>(null);

 // Feedback form state
 const [feedbackType, setFeedbackType] = useState('');
 const [subject, setSubject] = useState('');
 const [message, setMessage] = useState('');
 const [rating, setRating] = useState(0);
 const [screenshot, setScreenshot] = useState<File | null>(null);
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [lastSubmissionTime, setLastSubmissionTime] = useState(0);

 const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
   if (!file.type.startsWith('image/')) {
    showError('Please upload an image file');
    return;
   }
   if (file.size > 5 * 1024 * 1024) {
    showError('Image must be less than 5MB');
    return;
   }
   setScreenshot(file);
  }
 };

 const handleSubmitFeedback = async () => {
  const now = Date.now();
  if (now - lastSubmissionTime < 5000) {
   showError('Please wait before submitting again');
   return;
  }

  if (!feedbackType || !subject || !message) {
   showError('Please fill in all required fields');
   return;
  }

  if (subject.length > 100) {
   showError('Subject must be 100 characters or less');
   return;
  }

  if (message.length > 2000) {
   showError('Message must be 2000 characters or less');
   return;
  }

  setIsSubmitting(true);

  try {
   // Simulate API call
   await new Promise(resolve => setTimeout(resolve, 1000));

   showSuccess('Feedback submitted successfully!');
   setFeedbackType('');
   setSubject('');
   setMessage('');
   setRating(0);
   setScreenshot(null);
   setLastSubmissionTime(now);
  } catch (error) {
   showError('Failed to submit feedback');
  } finally {
   setIsSubmitting(false);
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
       </Card>
      </section>

      {/* Feedback & Suggestions */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <MessageSquare size={18} className="text-blue-500" />
        Feedback & Suggestions
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
        <div className="space-y-1">
         <Label className="text-sm">Help Improve TaskFlow</Label>
         <p className="text-xs text-slate-500 dark:text-slate-400">We'd love to hear your ideas, bug reports and feature requests.</p>
        </div>

        <div className="space-y-2">
         <Label className="text-sm">Feedback Type *</Label>
         <Select value={feedbackType} onValueChange={setFeedbackType}>
          <SelectTrigger className="rounded-md h-9">
           <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent className="rounded-md">
           <SelectItem value="Feature Request">Feature Request</SelectItem>
           <SelectItem value="Bug Report">Bug Report</SelectItem>
           <SelectItem value="General Feedback">General Feedback</SelectItem>
           <SelectItem value="UI/Design Suggestion">UI/Design Suggestion</SelectItem>
           <SelectItem value="Performance Issue">Performance Issue</SelectItem>
           <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
         </Select>
        </div>

        <div className="space-y-2">
         <Label className="text-sm">Subject (max 100 chars) *</Label>
         <Input
          placeholder="Brief title for your feedback"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          maxLength={100}
          className="rounded-md"
         />
         <p className="text-xs text-slate-400 text-right">{subject.length}/100</p>
        </div>

        <div className="space-y-2">
         <Label className="text-sm">Message (max 2000 chars) *</Label>
         <Textarea
          placeholder="Tell us what you love, what should be improved, or what new feature you'd like to see."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={2000}
          className="rounded-md min-h-[100px] resize-none"
         />
         <p className="text-xs text-slate-400 text-right">{message.length}/2000</p>
        </div>

        <div className="space-y-2">
         <Label className="text-sm">Rating (Optional)</Label>
         <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
           <button
            key={star}
            onClick={() => setRating(star)}
            className={cn(
             "w-8 h-8 rounded-full transition-colors",
             star <= rating ? "text-yellow-500" : "text-slate-300"
            )}
           >
            ★
           </button>
          ))}
         </div>
        </div>

        <div className="space-y-2">
         <Label className="text-sm">Screenshot (Optional, max 5MB)</Label>
         <div className="flex items-center gap-2">
          <Button
           variant="outline"
           onClick={() => fileInputRef.current?.click()}
           className="rounded-md text-sm"
          >
           Attach Screenshot
          </Button>
          {screenshot && (
           <span className="text-xs text-slate-500">{screenshot.name}</span>
          )}
          <input
           type="file"
           ref={fileInputRef}
           onChange={handleScreenshotChange}
           accept="image/*"
           className="hidden"
          />
         </div>
        </div>

        <Button
         onClick={handleSubmitFeedback}
         disabled={isSubmitting || !feedbackType || !subject || !message}
         className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md"
        >
         {isSubmitting ? 'Submitting...' : 'Send Feedback'}
        </Button>
       </Card>
      </section>

      {/* Data Management */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <ShieldCheck size={18} className="text-blue-500" />
        Data & Privacy
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
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

      {/* Support TaskFlow */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Heart size={18} className="text-pink-500" />
        Support TaskFlow
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-2">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
           <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white shadow-md">
            <Heart size={20} />
           </div>
           <div>
            <h3 className="text-sm font-medium">Support TaskFlow</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Optional donations to help TaskFlow grow</p>
           </div>
          </div>
          <Button
           variant="outline"
           size="sm"
           onClick={() => window.location.href = '/support'}
           className="rounded-md gap-1 text-sm"
          >
           View Support
          </Button>
         </div>
        </div>
       </Card>
      </section>

      {/* Supporter Badge */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Heart size={18} className="text-pink-500" />
        Supporter
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-2">
         <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-500 shadow-md">
           <Heart size={20} />
          </div>
          <div>
           <h3 className="text-sm font-medium">❤️ Supporter</h3>
           <p className="text-xs text-slate-500 dark:text-slate-400">This badge will only appear after Google Play confirms a successful donation.</p>
          </div>
         </div>
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
           <h3 className="text-sm font-medium">TaskFlow v{APP_VERSION}</h3>
           <p className="text-xs text-slate-500">Organize your life beautifully.</p>
          </div>
         </div>
         <p className="text-xs text-slate-500 leading-relaxed">
          TaskFlow is a modern, privacy-focused task management application. All your data is stored locally on your device and never leaves your browser.
         </p>
        </div>
       </Card>
      </section>

      {/* Privacy Policy */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <FileText size={18} className="text-blue-500" />
        Privacy Policy
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-2">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
           <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
            <Shield size={20} />
           </div>
           <div>
            <h3 className="text-sm font-medium">Privacy Policy</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">How we protect your data</p>
           </div>
          </div>
          <Button
           variant="outline"
           size="sm"
           onClick={() => window.location.href = '/privacy-policy'}
           className="rounded-md gap-1 text-sm"
          >
           View
          </Button>
         </div>
        </div>
       </Card>
      </section>

      {/* Terms of Service */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <BookOpen size={18} className="text-blue-500" />
        Terms of Service
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-2">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
           <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
            <BookOpen size={20} />
           </div>
           <div>
            <h3 className="text-sm font-medium">Terms of Service</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Usage terms and conditions</p>
           </div>
          </div>
          <Button
           variant="outline"
           size="sm"
           onClick={() => window.location.href = '/terms-of-service'}
           className="rounded-md gap-1 text-sm"
          >
           View
          </Button>
         </div>
        </div>
       </Card>
      </section>

      {/* App Version */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Info size={18} className="text-blue-500" />
        App Version
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-2">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
           <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
            <Info size={20} />
           </div>
           <div>
            <h3 className="text-sm font-medium">TaskFlow v{APP_VERSION}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Current version</p>
           </div>
          </div>
         </div>
        </div>
       </Card>
      </section>

      {/* Open Source Licenses */}
      <section>
       <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
        <Code size={18} className="text-blue-500" />
        Open Source Licenses
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="space-y-2">
         <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
           <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
            <Code size={20} />
           </div>
           <div>
            <h3 className="text-sm font-medium">Open Source Licenses</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Third-party libraries used</p>
           </div>
          </div>
          <Button
           variant="outline"
           size="sm"
           onClick={() => window.location.href = '/open-source-licenses'}
           className="rounded-md gap-1 text-sm"
          >
           View
          </Button>
         </div>
        </div>
       </Card>
      </section>
     </div>
    </div>
   </AppLayout>
  );
};

export default Settings;