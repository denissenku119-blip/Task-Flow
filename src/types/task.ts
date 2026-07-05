export type FilterOption = 'All' | 'Today' | 'Upcoming' | 'Completed' | 'Pinned' | 'Important' | 'Archived' | 'Overdue';
export type SortOption = 'Newest' | 'Oldest' | 'Alphabetical' | 'Due Date' | 'Priority';
export type Category = 'Personal' | 'Work' | 'School' | 'Health' | 'Finance' | 'Shopping' | 'Other';
export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface Subtask {
  id: string;
  title: string;
  isCompleted: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  createdAt: string;
  lastEdited: string;
  priority: Priority;
  category: Category;
  isCompleted: boolean;
  isPinned: boolean;
  isImportant: boolean;
  isArchived: boolean;
  reminderEnabled: boolean;
  estimatedDuration: string;
  subtasks: Subtask[];
  recurringInterval: string;
  dependencies: string[];
  isTemplate: boolean;
  pomodoroSessions: number;
}

export interface AppSettings {
  animationsEnabled: boolean;
  remindersEnabled: boolean;
  defaultFilter: FilterOption;
  defaultSort: SortOption;
  workDuration: number;
  soundEnabled: boolean;
  volume: number;
  workSound: string;
  shortBreakSound: string;
  longBreakSound: string;
}