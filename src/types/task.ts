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
  // Advanced Features
  subtasks: Subtask[];
  recurringInterval: RecurringInterval;
  dependencies: string[]; // IDs of tasks this task depends on
  isTemplate: boolean;
  pomodoroSessions: number;
  actualDuration?: number; // in minutes
}

export type SortOption = 'Newest' | 'Oldest' | 'Alphabetical' | 'Due Date' | 'Priority' | 'Custom';
export type FilterOption = 'All' | 'Today' | 'Upcoming' | 'Completed' | 'Archived' | 'Pinned' | 'Important' | 'Overdue';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}