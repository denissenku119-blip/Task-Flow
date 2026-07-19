import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, SortOption, FilterOption, Category, Priority, AppSettings } from '@/types/task';
import { 
  isToday, isAfter, isBefore, parseISO, startOfDay, 
  isSameDay, format 
} from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';
import { useScreenshotMode } from '@/components/ScreenshotModeProvider';
import { SCREENSHOT_TASKS, SCREENSHOT_SETTINGS, SCREENSHOT_STREAK, SCREENSHOT_COMPLETION } from '@/lib/screenshotData';

const STORAGE_KEY = 'taskflow_tasks_v2';
const SETTINGS_KEY = 'taskflow_settings_v2';

const DEFAULT_SETTINGS: AppSettings = {
  animationsEnabled: true,
  remindersEnabled: true,
  defaultFilter: 'All',
  defaultSort: 'Newest',
  workDuration: 25,
  soundEnabled: true,
  volume: 100,
  workSound: 'Classic Bell',
  shortBreakSound: 'Digital Beep',
  longBreakSound: 'Soft Chime',
};

export const useTasks = () => {
  const { screenshotMode } = useScreenshotMode();
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (screenshotMode) return SCREENSHOT_TASKS;
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    if (screenshotMode) return SCREENSHOT_SETTINGS;
    const saved = localStorage.getItem(SETTINGS_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
  });

  const [history, setHistory] = useState<Task[][]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>(settings.defaultFilter);
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>(settings.defaultSort);

  useEffect(() => {
    if (screenshotMode) {
      setTasks(SCREENSHOT_TASKS);
      setSettings(SCREENSHOT_SETTINGS);
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks, screenshotMode]);

  useEffect(() => {
    if (screenshotMode) return;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  }, [settings, screenshotMode]);

  const saveToHistory = useCallback(() => {
    setHistory(prev => [tasks, ...prev].slice(0, 20));
  }, [tasks]);

  const updateSettings = (updates: Partial<AppSettings>) => {
    if (screenshotMode) return;
    setSettings(prev => ({ ...prev, ...updates }));
    showSuccess("Settings updated");
  };

  const resetData = () => {
    if (screenshotMode) return;
    setTasks([]);
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    showSuccess("All data has been reset");
    window.location.reload();
  };

  const exportData = () => {
    if (screenshotMode) return;
    const data = { tasks, settings };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `taskflow_backup_${format(new Date(), 'yyyy-MM-dd')}.json`;
    link.click();
    showSuccess("Data exported successfully");
  };

  const importData = (jsonString: string) => {
    if (screenshotMode) return;
    try {
      const data = JSON.parse(jsonString);
      if (data.tasks) setTasks(data.tasks);
      if (data.settings) setSettings(data.settings);
      showSuccess("Data imported successfully");
    } catch (e) {
      showError("Invalid backup file");
    }
  };

  const addTask = (taskData: Partial<Task>) => {
    if (screenshotMode) return;
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
      isTemplate: false,
      pomodoroSessions: 0,
      ...taskData
    };
    setTasks(prev => [newTask, ...prev]);
    showSuccess("Task created");
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    if (screenshotMode) return;
    saveToHistory();
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates, lastEdited: new Date().toISOString() } : task
    ));
  };

  const deleteTask = (id: string) => {
    if (screenshotMode) return;
    saveToHistory();
    setTasks(prev => prev.filter(task => task.id !== id));
    showSuccess("Task deleted");
  };

  const duplicateTask = (id: string) => {
    if (screenshotMode) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    saveToHistory();
    const newTask = {
      ...task,
      id: crypto.randomUUID(),
      title: `${task.title} (Copy)`,
      createdAt: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
      isCompleted: false
    };
    setTasks(prev => [newTask, ...prev]);
    showSuccess("Task duplicated");
  };

  const toggleComplete = (id: string) => {
    if (screenshotMode) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isCompleted: !task.isCompleted });
    if (!task.isCompleted) showSuccess("Task completed!");
  };

  const togglePin = (id: string) => {
    if (screenshotMode) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isPinned: !task.isPinned });
  };

  const toggleImportant = (id: string) => {
    if (screenshotMode) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isImportant: !task.isImportant });
  };

  const toggleArchive = (id: string) => {
    if (screenshotMode) return;
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isArchived: !task.isArchived });
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    if (filter !== 'All') {
      const today = startOfDay(new Date());
      switch (filter) {
        case 'Today':
          result = result.filter(t => isSameDay(parseISO(t.dueDate), today) && !t.isArchived);
          break;
        case 'Upcoming':
          result = result.filter(t => isAfter(parseISO(t.dueDate), today) && !t.isArchived);
          break;
        case 'Completed':
          result = result.filter(t => t.isCompleted && !t.isArchived);
          break;
        case 'Pinned':
          result = result.filter(t => t.isPinned && !t.isArchived);
          break;
        case 'Important':
          result = result.filter(t => t.isImportant && !t.isArchived);
          break;
        case 'Archived':
          result = result.filter(t => t.isArchived);
          break;
        case 'Overdue':
          result = result.filter(t => !t.isCompleted && isBefore(parseISO(t.dueDate), today) && !t.isArchived);
          break;
      }
    } else {
      result = result.filter(t => !t.isArchived);
    }

    if (categoryFilter !== 'All') {
      result = result.filter(t => t.category === categoryFilter);
    }

    if (priorityFilter !== 'All') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'Newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'Oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'Alphabetical':
          return a.title.localeCompare(b.title);
        case 'Due Date':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'Priority': {
          const weights = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return weights[b.priority] - weights[a.priority];
        }
        default:
          return 0;
      }
    });

    return result;
  }, [tasks, searchQuery, filter, categoryFilter, priorityFilter, sortBy]);

  const stats = useMemo(() => {
    if (screenshotMode) {
      return {
        total: SCREENSHOT_TASKS.length,
        completed: 18,
        pending: 5,
        percentage: SCREENSHOT_COMPLETION,
        todayTasks: SCREENSHOT_TASKS.filter(t => isSameDay(parseISO(t.dueDate), startOfDay(new Date()))),
        overdueTasks: [],
        streak: SCREENSHOT_STREAK,
      } as any;
    }
    const active = tasks.filter(t => !t.isArchived);
    const completed = active.filter(t => t.isCompleted).length;
    const total = active.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const today = startOfDay(new Date());
    const todayTasks = active.filter(t => isSameDay(parseISO(t.dueDate), today));
    const overdueTasks = active.filter(t => !t.isCompleted && isBefore(parseISO(t.dueDate), today));

    return { total, completed, pending: total - completed, percentage, todayTasks, overdueTasks };
  }, [tasks, screenshotMode]);

  return {
    tasks,
    filteredTasks,
    settings,
    updateSettings,
    resetData,
    exportData,
    importData,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    toggleComplete,
    togglePin,
    toggleImportant,
    toggleArchive,
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