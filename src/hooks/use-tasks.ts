import { useState, useEffect, useMemo, useCallback } from 'react';
import { Task, SortOption, FilterOption, Category, Priority, RecurringInterval, Subtask } from '@/types/task';
import { 
  isToday, isAfter, isBefore, parseISO, startOfDay, subDays, 
  isSameDay, addDays, addWeeks, addMonths, addYears, format 
} from 'date-fns';
import { showSuccess, showError } from '@/utils/toast';

const STORAGE_KEY = 'taskflow_tasks_v2';

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

  const deleteTask = (id: string) => {
    saveToHistory();
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const duplicateTask = (task: Task) => {
    addTask({
      ...task,
      title: `${task.title} (Copy)`,
      id: undefined,
      createdAt: undefined,
      isCompleted: false
    });
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isCompleted: !task.isCompleted });
  };

  const togglePin = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isPinned: !task.isPinned });
  };

  const toggleImportant = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isImportant: !task.isImportant });
  };

  const toggleArchive = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    updateTask(id, { isArchived: !task.isArchived });
  };

  const filteredTasks = useMemo(() => {
    let result = [...tasks];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(t => 
        t.title.toLowerCase().includes(query) || 
        t.description.toLowerCase().includes(query) ||
        t.category.toLowerCase().includes(query)
      );
    }

    // Status Filter
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
      // By default, don't show archived tasks in "All"
      result = result.filter(t => !t.isArchived);
    }

    // Category Filter
    if (categoryFilter !== 'All') {
      result = result.filter(t => t.category === categoryFilter);
    }

    // Priority Filter
    if (priorityFilter !== 'All') {
      result = result.filter(t => t.priority === priorityFilter);
    }

    // Sorting
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
    filteredTasks,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    toggleComplete,
    togglePin,
    toggleImportant,
    toggleArchive,
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