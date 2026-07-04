import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, SortOption, FilterOption, Category, Priority, RecurringInterval, Subtask } from '@/types/task';
import { 
  isToday, isAfter, isBefore, parseISO, startOfDay, subDays, 
  isSameDay, addDays, addWeeks, addMonths, addYears, format 
} from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';

const STORAGE_KEY = 'taskflow_tasks_v2';
const SETTINGS_KEY = 'taskflow_settings_v2';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [history, setHistory] = useState<Task[][]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('All');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('Newest');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const saveToHistory = useCallback(() => {
    setHistory(prev => [tasks, ...prev].slice(0, 20));
  }, [tasks]);

  const undo = useCallback(() => {
    if (history.length > 0) {
      const previous = history[0];
      setTasks(previous);
      setHistory(prev => prev.slice(1));
      showSuccess("Action undone");
    }
  }, [history]);

  const addTask = (taskData: Partial<Task>) => {
    saveToHistory();
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: taskData.title || 'New Task',
      description: taskData.description || '',
      dueDate: taskData.dueDate || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
      priority: taskData.priority || 'Medium',
      category: taskData.category || 'Personal',
      isCompleted: false,
      isPinned: taskData.isPinned || false,
      isImportant: taskData.isImportant || false,
      isArchived: false,
      reminderEnabled: taskData.reminderEnabled || false,
      estimatedDuration: taskData.estimatedDuration || '',
      subtasks: taskData.subtasks || [],
      recurringInterval: taskData.recurringInterval || 'None',
      dependencies: taskData.dependencies || [],
      isTemplate: taskData.isTemplate || false,
      pomodoroSessions: 0,
      ...taskData
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    saveToHistory();
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates, lastEdited: new Date().toISOString() } : task
    ));
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    // Check dependencies
    const incompleteDeps = tasks.filter(t => task.dependencies.includes(t.id) && !t.isCompleted);
    if (incompleteDeps.length > 0 && !task.isCompleted) {
      showError(`Complete dependencies first: ${incompleteDeps.map(d => d.title).join(', ')}`);
      return;
    }

    saveToHistory();
    const isCompleting = !task.isCompleted;
    
    if (isCompleting && task.recurringInterval !== 'None') {
      // Create next occurrence
      const nextDate = calculateNextOccurrence(parseISO(task.dueDate), task.recurringInterval);
      addTask({
        ...task,
        dueDate: nextDate.toISOString(),
        isCompleted: false,
        subtasks: task.subtasks.map(s => ({ ...s, isCompleted: false }))
      });
    }

    updateTask(id, { isCompleted: isCompleting });
  };

  const calculateNextOccurrence = (date: Date, interval: RecurringInterval): Date => {
    switch (interval) {
      case 'Daily': return addDays(date, 1);
      case 'Weekly': return addWeeks(date, 1);
      case 'Biweekly': return addWeeks(date, 2);
      case 'Monthly': return addMonths(date, 1);
      case 'Yearly': return addYears(date, 1);
      case 'Weekdays': {
        let next = addDays(date, 1);
        while (next.getDay() === 0 || next.getDay() === 6) next = addDays(next, 1);
        return next;
      }
      case 'Weekends': {
        let next = addDays(date, 1);
        while (next.getDay() !== 0 && next.getDay() !== 6) next = addDays(next, 1);
        return next;
      }
      default: return date;
    }
  };

  const deleteTask = (id: string) => {
    saveToHistory();
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const stats = useMemo(() => {
    const active = tasks.filter(t => !t.isArchived);
    const completed = active.filter(t => t.isCompleted).length;
    const total = active.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const today = startOfDay(new Date());
    const todayTasks = active.filter(t => isSameDay(parseISO(t.dueDate), today));
    const overdueTasks = active.filter(t => !t.isCompleted && isBefore(parseISO(t.dueDate), today));

    return { total, completed, pending: total - completed, percentage, todayTasks, overdueTasks };
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleComplete,
    undo,
    stats,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter
  };
};