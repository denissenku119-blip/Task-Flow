"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import { useTasks } from '@/hooks/use-tasks';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Task } from '@/types/task';

const Index = () => {
  const { 
    stats, 
    addTask, 
    updateTask, 
    deleteTask, 
    duplicateTask, 
    toggleComplete, 
    togglePin, 
    toggleImportant, 
    toggleArchive 
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingTask) {
      updateTask(editingTask.id, data);
    } else {
      addTask(data);
    }
    setEditingTask(null);
  };

  const motivationalMessages = [
    "You're doing great! Keep it up.",
    "Focus on being productive, not busy.",
    "Small steps lead to big results.",
    "Your future self will thank you.",
    "Make today count!"
  ];

  const randomMessage = React.useMemo(() => 
    motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)], 
  []);

  return (
    <AppLayout>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Good Day!</h1>
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <Sparkles size={16} className="text-amber-500" />
            <p>{randomMessage}</p>
          </div>
        </div>
        <Button 
          onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-12 gap-2 shadow-lg shadow-blue-500/20"
        >
          <Plus size={20} />
          New Task
        </Button>
      </div>

      <StatsGrid stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pinned Tasks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Pinned Tasks</h2>
            <Link to="/tasks?filter=Pinned" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.pinnedTasks.length > 0 ? (
              stats.pinnedTasks.slice(0, 3).map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onToggleComplete={toggleComplete}
                  onTogglePin={togglePin}
                  onToggleImportant={toggleImportant}
                  onToggleArchive={toggleArchive}
                  onDelete={deleteTask}
                  onDuplicate={duplicateTask}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center text-slate-400">
                No pinned tasks yet.
              </div>
            )}
          </div>
        </section>

        {/* Today's Tasks */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Today's Schedule</h2>
            <Link to="/tasks?filter=Today" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {stats.todayTasks.length > 0 ? (
              stats.todayTasks.slice(0, 3).map(task => (
                <TaskCard 
                  key={task.id} 
                  task={task}
                  onToggleComplete={toggleComplete}
                  onTogglePin={togglePin}
                  onToggleImportant={toggleImportant}
                  onToggleArchive={toggleArchive}
                  onDelete={deleteTask}
                  onDuplicate={duplicateTask}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="p-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center text-slate-400">
                Nothing scheduled for today.
              </div>
            )}
          </div>
        </section>
      </div>

      <TaskForm 
        isOpen={isFormOpen} 
        onClose={() => { setIsFormOpen(false); setEditingTask(null); }}
        onSubmit={handleSubmit}
        initialData={editingTask}
      />
    </AppLayout>
  );
};

export default Index;