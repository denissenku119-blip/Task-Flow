"use client";

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
 Sun, Moon, Monitor, Settings2, ShieldCheck, Trash2, Info, MessageSquare, Heart, FileText, BookOpen, Code, Shield, Camera
} from 'lucide-react';
import { APP_VERSION } from '@/lib/appVersion';
import { useTranslation } from 'react-i18next';
import { changeLanguage, SUPPORTED_LANGUAGES } from '@/i18n';

const Settings = () => {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();
  const { settings, updateSettings, resetData } = useTasks();
  const navigate = useNavigate();
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
      showError(t('settings.imageUploadError'));
      return;
   }
   if (file.size > 5 * 1024 * 1024) {
    showError(t('settings.imageSizeError'));
    return;
   }
   setScreenshot(file);
  }
 };

 const handleSubmitFeedback = async () => {
  const now = Date.now();
  if (now - lastSubmissionTime < 5000) {
   showError(t('settings.waitBeforeSubmit'));
   return;
  }

  if (!feedbackType || !subject || !message) {
   showError(t('settings.fillAllFields'));
   return;
  }

  if (subject.length > 100) {
   showError(t('settings.subjectMax'));
   return;
  }

  if (message.length > 2000) {
   showError(t('settings.messageMax'));
   return;
  }

  setIsSubmitting(true);

  try {
   await new Promise(resolve => setTimeout(resolve, 1000));
   showSuccess(t('settings.feedbackSubmitted'));
   setFeedbackType('');
   setSubject('');
   setMessage('');
   setRating(0);
   setScreenshot(null);
   setLastSubmissionTime(now);
  } catch (error) {
   showError(t('settings.feedbackFailed'));
  } finally {
   setIsSubmitting(false);
  }
 };

 const handleLanguageChange = (lang: string) => {
  changeLanguage(lang);
 };

 return (
  <AppLayout>
   <div className="max-w-2xl mx-auto px-4 py-4">
    <h1 className="text-2xl font-bold tracking-tight mb-6">{t('settings.title')}</h1>

    <div className="space-y-5">
      {/* Language */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <span className="text-2xl">🌐</span>
         {t('settings.language')}
        </h2>
        <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
         <div className="flex items-center justify-between">
          <div className="space-y-0.5">
           <Label className="text-sm">{t('settings.language')}</Label>
           <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.languageDescription')}</p>
          </div>
          <Select onValueChange={handleLanguageChange} defaultValue={localStorage.getItem('taskflow_language') || 'en'}>
           <SelectTrigger className="w-[200px] rounded-md h-9">
            <SelectValue className="text-sm" />
           </SelectTrigger>
           <SelectContent className="rounded-md max-h-[60vh]">
            {SUPPORTED_LANGUAGES.map((lang) => (
             <SelectItem key={lang.code} value={lang.code}>
              <span className="mr-2">{lang.flag}</span>{lang.nativeName}
             </SelectItem>
            ))}
           </SelectContent>
          </Select>
         </div>
        </Card>
      </section>

      {/* Appearance */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <Sun size={18} className="text-blue-500" />
         {t('settings.appearance')}
        </h2>
        <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
         <div className="flex items-center justify-between">
          <div className="space-y-0.5">
           <Label className="text-sm">{t('settings.themeMode')}</Label>
           <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.themeDescription')}</p>
          </div>
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
           <Button variant={theme === 'light' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTheme('light')} className="rounded-md gap-1 text-xs">
            <Sun size={12} /> {t('settings.light')}
           </Button>
           <Button variant={theme === 'dark' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTheme('dark')} className="rounded-md gap-1 text-xs">
            <Moon size={12} /> {t('settings.dark')}
           </Button>
           <Button variant={theme === 'system' ? 'secondary' : 'ghost'} size="sm" onClick={() => setTheme('system')} className="rounded-md gap-1 text-xs">
            <Monitor size={12} /> {t('settings.systemTheme')}
           </Button>
          </div>
         </div>
         <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-0.5">
           <Label className="text-sm">{t('settings.animations')}</Label>
           <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.animationsDescription')}</p>
          </div>
          <Switch checked={settings.animationsEnabled} onCheckedChange={(val) => updateSettings({ animationsEnabled: val })} />
         </div>
        </Card>
      </section>

      {/* Preferences */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <Settings2 size={18} className="text-blue-500" />
         {t('settings.preferences')}
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm">{t('settings.defaultFilter')}</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.defaultFilterDescription')}</p>
         </div>
         <Select value={settings.defaultFilter} onValueChange={(val) => updateSettings({ defaultFilter: val as FilterOption })}>
          <SelectTrigger className="w-[120px] rounded-md h-9">
           <SelectValue className="text-sm" />
          </SelectTrigger>
          <SelectContent className="rounded-md">
           <SelectItem value="All">{t('tasks.allTasks')}</SelectItem>
           <SelectItem value="Today">{t('common.today')}</SelectItem>
           <SelectItem value="Upcoming">{t('tasks.upcoming')}</SelectItem>
           <SelectItem value="Completed">{t('tasks.completed')}</SelectItem>
           <SelectItem value="Pinned">{t('dashboard.pinned')}</SelectItem>
           <SelectItem value="Important">{t('tasks.important')}</SelectItem>
           <SelectItem value="Archived">{t('tasks.archived')}</SelectItem>
          </SelectContent>
         </Select>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
         <div className="space-y-0.5">
          <Label className="text-sm">{t('settings.defaultSort')}</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.defaultSortDescription')}</p>
         </div>
         <Select value={settings.defaultSort} onValueChange={(val) => updateSettings({ defaultSort: val as SortOption })}>
          <SelectTrigger className="w-[120px] rounded-md h-9">
           <SelectValue className="text-sm" />
          </SelectTrigger>
          <SelectContent className="rounded-md">
           <SelectItem value="Newest">{t('tasks.newest')}</SelectItem>
           <SelectItem value="Oldest">{t('tasks.oldest')}</SelectItem>
           <SelectItem value="Alphabetical">{t('tasks.alphabetical')}</SelectItem>
           <SelectItem value="Due Date">{t('tasks.dueDate')}</SelectItem>
           <SelectItem value="Priority">{t('tasks.priority')}</SelectItem>
          </SelectContent>
         </Select>
        </div>
       </Card>
      </section>

      {/* Feedback */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <MessageSquare size={18} className="text-blue-500" />
         {t('settings.feedback')}
        </h2>
        <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
         <div className="space-y-1">
          <Label className="text-sm">{t('settings.helpImprove')}</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.feedbackDescription')}</p>
         </div>
        <div className="space-y-2">
         <Label className="text-sm">{t('settings.feedbackType')} *</Label>
         <Select value={feedbackType} onValueChange={setFeedbackType}>
          <SelectTrigger className="rounded-md h-9">
           <SelectValue placeholder={t('settings.selectType')} />
          </SelectTrigger>
          <SelectContent className="rounded-md">
           <SelectItem value="Feature Request">{t('settings.featureRequest')}</SelectItem>
           <SelectItem value="Bug Report">{t('settings.bugReport')}</SelectItem>
           <SelectItem value="General Feedback">{t('settings.generalFeedback')}</SelectItem>
           <SelectItem value="UI/Design Suggestion">{t('settings.uiDesignSuggestion')}</SelectItem>
           <SelectItem value="Performance Issue">{t('settings.performanceIssue')}</SelectItem>
           <SelectItem value="Other">{t('settings.other')}</SelectItem>
          </SelectContent>
         </Select>
        </div>
        <div className="space-y-2">
         <Label className="text-sm">{t('settings.subject')} (max 100 chars) *</Label>
         <Input placeholder={t('settings.subjectPlaceholder')} value={subject} onChange={(e) => setSubject(e.target.value)} maxLength={100} className="rounded-md" />
         <p className="text-xs text-slate-400 text-right">{subject.length}/100</p>
        </div>
        <div className="space-y-2">
         <Label className="text-sm">{t('settings.message')} (max 2000 chars) *</Label>
         <Textarea placeholder={t('settings.messagePlaceholder')} value={message} onChange={(e) => setMessage(e.target.value)} maxLength={2000} className="rounded-md min-h-[100px] resize-none" />
         <p className="text-xs text-slate-400 text-right">{message.length}/2000</p>
        </div>
        <div className="space-y-2">
         <Label className="text-sm">{t('settings.rating')}</Label>
         <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
           <button key={star} onClick={() => setRating(star)} className={cn("w-8 h-8 rounded-full transition-colors", star <= rating ? "text-yellow-500" : "text-slate-300")}>
            ★
           </button>
          ))}
         </div>
        </div>
        <div className="space-y-2">
         <Label className="text-sm">{t('settings.screenshot')}</Label>
         <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="rounded-md text-sm">
           {t('settings.attachScreenshot')}
          </Button>
          {screenshot && <span className="text-xs text-slate-500">{screenshot.name}</span>}
          <input type="file" ref={fileInputRef} onChange={handleScreenshotChange} accept="image/*" className="hidden" />
         </div>
        </div>
        <Button onClick={handleSubmitFeedback} disabled={isSubmitting || !feedbackType || !subject || !message} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md">
         {isSubmitting ? t('settings.submitting') : t('settings.sendFeedback')}
        </Button>
       </Card>
      </section>

      {/* Data Management */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <ShieldCheck size={18} className="text-blue-500" />
        {t('settings.privacy')}
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl space-y-3">
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
         <div className="space-y-0.5">
          <Label className="text-sm text-red-600">{t('settings.resetAllData')}</Label>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.resetDescription')}</p>
         </div>
         <AlertDialog>
          <AlertDialogTrigger asChild>
           <Button variant="destructive" className="rounded-md gap-1 text-sm">
            <Trash2 size={14} /> {t('settings.resetApp')}
           </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="rounded-lg">
           <AlertDialogHeader>
            <AlertDialogTitle>{t('settings.resetConfirm')}</AlertDialogTitle>
            <AlertDialogDescription>
             {t('settings.resetDescription')}
            </AlertDialogDescription>
           </AlertDialogHeader>
           <AlertDialogFooter>
            <AlertDialogCancel className="rounded-md">{t('settings.resetCancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={resetData} className="bg-red-600 hover:bg-red-700 rounded-md">
             {t('settings.resetConfirmButton')}
            </AlertDialogAction>
           </AlertDialogFooter>
          </AlertDialogContent>
         </AlertDialog>
        </div>
       </Card>
      </section>

      {/* Support */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <Heart size={18} className="text-pink-500" />
        {t('settings.support')}
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center text-white shadow-md">
           <Heart size={20} />
          </div>
          <div>
           <h3 className="text-sm font-medium">{t('settings.support')}</h3>
           <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.supportDescription')}</p>
          </div>
         </div>
         <Button variant="outline" size="sm" onClick={() => navigate('/support')} className="rounded-md gap-1 text-sm">
          {t('common.view')}
         </Button>
        </div>
       </Card>
      </section>

      {/* Supporter */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <Heart size={18} className="text-pink-500" />
         {t('settings.supporter')}
        </h2>
        <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
         <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center text-pink-500 shadow-md">
           <Heart size={20} />
          </div>
          <div>
           <h3 className="text-sm font-medium">❤️ {t('settings.supporter')}</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.supporterDescription')}</p>
         </div>
        </div>
       </Card>
      </section>

      {/* About */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <Info size={18} className="text-blue-500" />
        {t('settings.about')}
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center gap-2.5">
         <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-md">
          <ShieldCheck size={20} />
         </div>
         <div>
          <h3 className="text-sm font-medium">TaskFlow v{APP_VERSION}</h3>
          <p className="text-xs text-slate-500">{t('about.missionDescription')}</p>
         </div>
        </div>
        <p className="text-xs text-slate-500 leading-relaxed mt-2">
         {t('about.privacyDescription')}
        </p>
       </Card>
      </section>

      {/* Privacy */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <FileText size={18} className="text-blue-500" />
        {t('settings.privacyPolicy')}
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
           <Shield size={20} />
          </div>
          <div>
           <h3 className="text-sm font-medium">{t('settings.privacyPolicy')}</h3>
           <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.privacyDescription')}</p>
          </div>
         </div>
         <Button variant="outline" size="sm" onClick={() => navigate('/privacy')} className="rounded-md gap-1 text-sm">
          {t('common.view')}
         </Button>
        </div>
       </Card>
      </section>

      {/* Terms */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <BookOpen size={18} className="text-blue-500" />
        {t('settings.termsOfService')}
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
           <BookOpen size={20} />
          </div>
          <div>
           <h3 className="text-sm font-medium">{t('settings.termsOfService')}</h3>
           <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.termsDescription')}</p>
          </div>
         </div>
         <Button variant="outline" size="sm" onClick={() => navigate('/terms')} className="rounded-md gap-1 text-sm">
          {t('common.view')}
         </Button>
        </div>
       </Card>
      </section>

      {/* Licenses */}
      <section>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
         <Code size={18} className="text-blue-500" />
        {t('settings.openSourceLicenses')}
       </h2>
       <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl">
        <div className="flex items-center justify-between">
         <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500">
           <Code size={20} />
          </div>
          <div>
           <h3 className="text-sm font-medium">{t('settings.openSourceLicenses')}</h3>
           <p className="text-xs text-slate-500 dark:text-slate-400">{t('settings.openSourceDescription')}</p>
          </div>
         </div>
         <Button variant="outline" size="sm" onClick={() => navigate('/licenses')} className="rounded-md gap-1 text-sm">
          {t('common.view')}
         </Button>
        </div>
       </Card>
      </section>
     </div>
    </div>
   </AppLayout>
  );
};

export default Settings;