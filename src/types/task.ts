export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Category = 'Personal' | 'Work' | 'School' | 'Health' | 'Finance' | 'Shopping' | 'Other';
export type RecurringInterval = 'None' | 'Daily' | 'Weekdays' | 'Weekends' | 'Weekly' | 'Biweekly' | 'Monthly' | 'Yearly';

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
  recurringInterval: RecurringInterval;
  dependencies: string[];
  isTemplate: boolean;
  pomodoroSessions: number;
  actualDuration?: number;
}

export type SortOption = 'Newest' | 'Oldest' | 'Alphabetical' | 'Due Date' | 'Priority' | 'Custom';
export type FilterOption = 'All' | 'Today' | 'Upcoming' | 'Completed' | 'Archived' | 'Pinned' | 'Important' | 'Overdue';

export interface AppSettings {
  animationsEnabled: boolean;
  remindersEnabled: boolean;
  defaultFilter: FilterOption;
  defaultSort: SortOption;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}