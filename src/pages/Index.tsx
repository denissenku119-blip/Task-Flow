"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import StatsGrid from '@/components/dashboard/StatsGrid';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import PomodoroTimer from '@/components/productivity/PomodoroTimer';
import { useTasks } from '@/hooks/use-tasks';
import { Button } from '@/components/ui/button';
import { Plus, ArrowRight, Sparkles, Flame, Target, LayoutGrid, List } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Task } from '@/types/task';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';

const Index = () => {
  const { 
    stats, 
    addTask, 
    updateTask, 
    deleteTask, 
    toggleComplete,
    tasks
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  const pinnedTasks = tasks.filter(t => t.isPinned && !t.isArchived).slice(0, 3);
  const todayTasks = stats.todayTasks.slice(0, 3);

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-2">Dashboard Overview</p>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight">
              Make today <span className="text-blue-600">count.</span>
            </h1>
          </div>
          <Button 
            onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl px-8 h-14 text-lg font-bold shadow-xl shadow-blue-500/20 transition-all hover:scale-105"
          >
            <Plus size={24} className="mr-2" />
            Create Task
          </Button>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Stats & Focus */}
          <div className="lg:col-span-8 space-y-8">
            <StatsGrid stats={stats} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Pin size={20} className="text-blue-600" />
                    Pinned
                  </h2>
                  <Link to="/tasks?filter=Pinned" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                  {pinnedTasks.length > 0 ? (
                    pinnedTasks.map(task => (
                      <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} onEdit={setEditingTask} onDelete={deleteTask} />
                    ))
                  ) : (
                    <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400">
                      No pinned tasks
                    </div>
                  )}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Target size={20} className="text-blue-600" />
                    Today
                  </h2>
                  <Link to="/tasks?filter=Today" className="text-sm font-bold text-blue-600 hover:underline">View All</Link>
                </div>
                <div className="space-y-4">
                  {todayTasks.length > 0 ? (
                    todayTasks.map(task => (
                      <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} onEdit={setEditingTask} onDelete={deleteTask} />
                    ))
                  ) : (
                    <div className="p-10 border-2 border-dashed border-slate-200 rounded-3xl text-center text-slate-400">
                      Clear for today!
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Productivity Tools */}
          <div className="lg:col-span-4 space-y-8">
            <PomodoroTimer />
            
            <Card className="p-8 border-slate-200 rounded-3xl bg-blue-600 text-white shadow-2xl shadow-blue-500/20">
              <h3 className="text-xl font-bold mb-4">Productivity Insight</h3>
              <p className="text-blue-100 leading-relaxed mb-6">
                You're most productive on <strong>Mondays</strong>. You've completed 12 tasks this week, which is 20% higher than last week!
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>Weekly Goal</span>
                  <span>{stats.percentage}%</span>
                </div>
                <Progress value={stats.percentage} className="h-2 bg-white/20" />
              </div>
            </Card>
          </div>
        </div>
      </div>

      <TaskForm 
        isOpen={isFormOpen || !!editingTask} 
        onClose={() => { setIsFormOpen(false); setEditingTask(null); }}
        onSubmit={(data) => editingTask ? updateTask(editingTask.id, data) : addTask(data)}
        initialData={editingTask}
      />
    </AppLayout>
  );
};

export default Index;