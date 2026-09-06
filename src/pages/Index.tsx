"use client";
import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import StatsGrid from '@/components/dashboard/StatsGrid';
import WeeklyChart from '@/components/dashboard/WeeklyChart';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import PomodoroTimer from '@/components/productivity/PomodoroTimer';
import LanguageSelector from '@/components/LanguageSelector';
import { useTasks } from '@/hooks/use-tasks';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Plus, Target, Pin, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const Index = () => {
 const { t, i18n } = useTranslation();
 const { stats, tasks, addTask, updateTask, deleteTask, toggleComplete, togglePin, toggleImportant, toggleArchive, duplicateTask } = useTasks();
 const [isFormOpen, setIsFormOpen] = React.useState(false);
 const [editingTask, setEditingTask] = React.useState<Task | null>(null);
 const [showLanguageSelector, setShowLanguageSelector] = React.useState(false);
 const [isInitializing, setIsInitializing] = React.useState(true);

 const completedTasks = tasks.filter(t => t.isCompleted);
 const dayCounts: Record<string, number> = {};
 completedTasks.forEach(t => {
 const date = new Date(t.dueDate);
 const dayName = date.toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US', { weekday: 'long' });
 dayCounts[dayName] = (dayCounts[dayName] || 0) + 1;
 });
 const mostProductiveDay = Object.entries(dayCounts).length > 0 ? Object.entries(dayCounts).reduce<[string, number]>( ([dayA, countA], [dayB, countB]) => (countA > countB ? [dayA, countA] : [dayB, countB]), [Object.keys(dayCounts)[0], 0]) : t('dashboard.mostProductive');
 const pinnedTasks = tasks.filter(t => t.isPinned && !t.isArchived).slice(0, 3);
 const todayTasks = stats.todayTasks.slice(0, 3);
 const handleEdit = (task: Task) => { setEditingTask(task); setIsFormOpen(true); };
 const handleSubmit = (data: any) => {
  if (editingTask) {
   updateTask(editingTask.id, data);
  } else {
   addTask(data);
  }
  setEditingTask(null);
  setIsFormOpen(false);
 };

 React.useEffect(() => {
  // Check if user has already selected a language
  const savedLang = localStorage.getItem('taskflow_language');
  if (!savedLang) {
   setShowLanguageSelector(true);
  }
  setIsInitializing(false);
 }, []);

 const handleLanguageSelect = (lang: string) => {
  setShowLanguageSelector(false);
 };

 if (isInitializing) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-slate-400">{t('common.loading')}</div>
   </div>
  );
 }

 if (showLanguageSelector) {
  return <LanguageSelector onLanguageSelect={handleLanguageSelect} />;
 }

 return (
  <AppLayout>
   <div className="max-w-7xl mx-auto space-y-6">
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
     <div>
      <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-1"> {t('dashboard.overview')} </p>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight"> {t('dashboard.makeTodayCount')} </h1>
     </div>
     <Button onClick={() => { setEditingTask(null); setIsFormOpen(true); }} className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-6 h-12 text-lg font-bold shadow-md shadow-blue-500/20 transition-all hover:scale-105">
      <Plus size={20} className="mr-1"/> {t('dashboard.createTask')}
     </Button>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
     <div className="lg:col-span-8 space-y-5">
      <StatsGrid stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
       <section>
        <div className="flex items-center justify-between mb-4">
         <h2 className="text-xl font-bold flex items-center gap-1"> <Pin size={16} className="text-blue-600"/> {t('dashboard.pinned')} </h2>
         <Link to="/tasks?filter=Pinned" className="text-sm font-bold text-blue-600 hover:underline"> {t('dashboard.viewAll')} </Link>
        </div>
        <div className="space-y-2">
         {pinnedTasks.length > 0 ? ( pinnedTasks.map(task => ( <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} onEdit={handleEdit} onDelete={deleteTask} onTogglePin={togglePin} onToggleImportant={toggleImportant} onToggleArchive={toggleArchive} onDuplicate={duplicateTask} /> )) ) : ( <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400"> {t('dashboard.emptyPinned')} </div> )} 
        </div>
       </section>
       <section>
        <div className="flex items-center justify-between mb-4">
         <h2 className="text-xl font-bold flex items-center gap-1"> <Target size={16} className="text-blue-600"/> {t('dashboard.today')} </h2>
         <Link to="/tasks?filter=Today" className="text-sm font-bold text-blue-600 hover:underline"> {t('dashboard.viewAll')} </Link>
        </div>
        <div className="space-y-2">
         {todayTasks.length > 0 ? ( todayTasks.map(task => ( <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} onEdit={handleEdit} onDelete={deleteTask} onTogglePin={togglePin} onToggleImportant={toggleImportant} onToggleArchive={toggleArchive} onDuplicate={duplicateTask} /> )) ) : ( <div className="p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400"> {t('dashboard.emptyToday')} </div> )} 
        </div>
       </section>
      </div>
     </div>
     <div className="lg:col-span-4 space-y-5">
      <PomodoroTimer />
      <WeeklyChart />
      <Card className="p-5 border-slate-200 dark:border-slate-800 rounded-2xl bg-blue-600 text-white shadow-sm shadow-blue-500/5">
       <h3 className="text-lg font-bold mb-2">{t('dashboard.quickStats')}</h3>
       <p className="mb-1 flex items-center gap-1.5"> <Flame size={16} className="text-orange-200"/> {stats.streak ? t('dashboard.dayStreak', { count: stats.streak }) : mostProductiveDay} </p>
       <p>{t('dashboard.mostProductive')}: {mostProductiveDay}</p>
       <p>{t('dashboard.totalTasks')}: {tasks.length}</p>
      </Card>
     </div>
    </div>
   </div>
   <TaskForm isOpen={isFormOpen || !!editingTask} onClose={() => { setIsFormOpen(false); setEditingTask(null); }} onSubmit={handleSubmit} initialData={editingTask} />
  </AppLayout>
 );
};
export default Index;