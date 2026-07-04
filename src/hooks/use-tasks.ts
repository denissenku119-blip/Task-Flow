import { useState, useEffect, useMemo } from 'react';
import { Task, SortOption, FilterOption, Category, Priority } from '@/types/task';
import { isToday, isAfter, parseISO, startOfDay } from 'date-fns';

const STORAGE_KEY = 'taskflow_tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterOption>('All');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'All'>('All');
  const [priorityFilter, setPriorityFilter] = useState<Priority | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortOption>('Newest');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'lastEdited' | 'isCompleted' | 'isArchived'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      lastEdited: new Date().toISOString(),
      isCompleted: false,
      isArchived: false,
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id ? { ...task, ...updates, lastEdited: new Date().toISOString() } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const duplicateTask = (id: string) => {
    const taskToDuplicate = tasks.find(t => t.id === id);
    if (taskToDuplicate) {
      const duplicated: Task = {
        ...taskToDuplicate,
        id: crypto.randomUUID(),
        title: `${taskToDuplicate.title} (Copy)`,
        createdAt: new Date().toISOString(),
        lastEdited: new Date().toISOString(),
      };
      setTasks(prev => [duplicated, ...prev]);
    }
  };

  const toggleComplete = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { isCompleted: !task.isCompleted });
    }
  };

  const togglePin = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { isPinned: !task.isPinned });
    }
  };

  const toggleImportant = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { isImportant: !task.isImportant });
    }
  };

  const toggleArchive = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (task) {
      updateTask(id, { isArchived: !task.isArchived });
    }
  };

  const filteredTasks = useMemo(() => {
    let result = tasks.filter(task => {
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      if (!matchesSearch) return false;

      if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;
      if (priorityFilter !== 'All' && task.priority !== priorityFilter) return false;

      const taskDate = parseISO(task.dueDate);
      const today = startOfDay(new Date());

      switch (filter) {
        case 'Today':
          return isToday(taskDate) && !task.isArchived;
        case 'Upcoming':
          return isAfter(taskDate, today) && !task.isArchived && !task.isCompleted;
        case 'Completed':
          return task.isCompleted && !task.isArchived;
        case 'Archived':
          return task.isArchived;
        case 'Pinned':
          return task.isPinned && !task.isArchived;
        case 'Important':
          return task.isImportant && !task.isArchived;
        default:
          return !task.isArchived;
      }
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'Oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'Alphabetical':
          return a.title.localeCompare(b.title);
        case 'Due Date':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'Priority':
          const priorityMap = { Urgent: 0, High: 1, Medium: 2, Low: 3 };
          return priorityMap[a.priority] - priorityMap[b.priority];
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

    return result;
  }, [tasks, searchQuery, filter, categoryFilter, priorityFilter, sortBy]);

  const stats = useMemo(() => {
    const active = tasks.filter(t => !t.isArchived);
    const completed = active.filter(t => t.isCompleted).length;
    const total = active.length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    const todayTasks = tasks.filter(t => !t.isArchived && isToday(parseISO(t.dueDate)));
    const pinnedTasks = tasks.filter(t => !t.isArchived && t.isPinned);

    return { total, completed, pending, percentage, todayTasks, pinnedTasks };
  }, [tasks]);

  const resetData = () => {
    setTasks([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const exportData = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'taskflow_backup.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const importData = (jsonString: string) => {
    try {
      const imported = JSON.parse(jsonString);
      if (Array.isArray(imported)) {
        setTasks(imported);
      }
    } catch (e) {
      console.error("Failed to import data", e);
    }
  };

  return {
    tasks,
    filteredTasks,
    searchQuery,
    setSearchQuery,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    toggleComplete,
    togglePin,
    toggleImportant,
    toggleArchive,
    stats,
    resetData,
    exportData,
    importData
  };
};