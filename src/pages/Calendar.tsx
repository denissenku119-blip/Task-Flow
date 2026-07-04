"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Calendar as CalendarUI } from '@/components/ui/calendar';
import { useTasks } from '@/hooks/use-tasks';
import { Card } from '@/components/ui/card';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import { format, parseISO, isSameDay } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { Task } from '@/types/task';

const Calendar = () => {
  const { 
    tasks, 
    addTask, 
    updateTask, 
    deleteTask, 
    duplicateTask, 
    toggleComplete, 
    togglePin, 
    toggleImportant, 
    toggleArchive 
  } = useTasks();

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  const selectedDateTasks = React.useMemo(() => {
    if (!date) return [];
    return tasks.filter(task => !task.isArchived && isSameDay(parseISO(task.dueDate), date));
  }, [tasks, date]);

  const taskDates = React.useMemo(() => {
    return tasks.filter(t => !t.isArchived).map(t => parseISO(t.dueDate));
  }, [tasks]);

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

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 xl:col-span-4">
            <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm">
              <CalendarUI
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-none"
                modifiers={{ hasTask: taskDates }}
                modifiersStyles={{
                  hasTask: { fontWeight: 'bold', textDecoration: 'underline', color: '#2563EB' }
                }}
              />
            </Card>
          </div>

          <div className="lg:col-span-7 xl:col-span-8">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-1">
                {date ? format(date, 'MMMM d, yyyy') : 'Select a date'}
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                {selectedDateTasks.length} {selectedDateTasks.length === 1 ? 'task' : 'tasks'} scheduled
              </p>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {selectedDateTasks.length > 0 ? (
                  selectedDateTasks.map(task => (
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
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl"
                  >
                    <p className="text-slate-400">No tasks for this day.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
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

export default Calendar;