export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type Category = 'Personal' | 'Work' | 'School' | 'Health' | 'Finance' | 'Shopping' | 'Other';

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
  estimatedDuration: string; // e.g., "30m", "1h"
}

export type SortOption = 'Newest' | 'Oldest' | 'Alphabetical' | 'Due Date' | 'Priority';
export type FilterOption = 'All' | 'Today' | 'Upcoming' | 'Completed' | 'Archived' | 'Pinned' | 'Important';