"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import TaskCard from '@/components/tasks/TaskCard';
import TaskForm from '@/components/tasks/TaskForm';
import { useTasks } from '@/hooks/use-tasks';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Plus, 
  Filter, 
  ArrowUpDown,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from '@/components/ui/badge';
import { FilterOption, SortOption, Category, Priority, Task } from '@/types/task';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Tasks = () => {
  const [searchParams] = useSearchParams();
  const initialFilter = (searchParams.get('filter') as FilterOption) || 'All';

  const { 
    filteredTasks, 
    searchQuery, 
    setSearchQuery,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    categoryFilter,
    setCategoryFilter,
    priorityFilter,
    setPriorityFilter,
    addTask,
    updateTask,
    deleteTask,
    duplicateTask,
    toggleComplete,
    togglePin,
    toggleImportant,
    toggleArchive
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingTask, setEditingTask] = React.useState<Task | null>(null);

  React.useEffect(() => {
    if (initialFilter) setFilter(initialFilter);
  }, [initialFilter, setFilter]);

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

  const clearFilters = () => {
    setFilter('All');
    setCategoryFilter('All');
    setPriorityFilter('All');
    setSearchQuery('');
  };

  const activeFiltersCount = [
    filter !== 'All',
    categoryFilter !== 'All',
    priorityFilter !== 'All',
    searchQuery !== ''
  ].filter(Boolean).length;

  return (
    <AppLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
          <Button 
            onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl px-6 h-12 gap-2"
          >
            <Plus size={20} />
            New Task
          </Button>
        </div>

        {/* Search and Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <Input 
              placeholder="Search tasks, descriptions, categories..." 
              className="pl-10 h-12 rounded-xl border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {/* Main Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-xl gap-2 border-slate-200 dark:border-slate-800">
                  <Filter size={18} />
                  {filter}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl w-48">
                <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={filter} onValueChange={(v) => setFilter(v as FilterOption)}>
                  <DropdownMenuRadioItem value="All">All Tasks</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Today">Today</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Upcoming">Upcoming</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Completed">Completed</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Pinned">Pinned</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Important">Important</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Archived">Archived</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sort */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="h-12 rounded-xl gap-2 border-slate-200 dark:border-slate-800">
                  <ArrowUpDown size={18} />
                  Sort: {sortBy}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="rounded-xl w-48">
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <DropdownMenuRadioItem value="Newest">Newest First</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Oldest">Oldest First</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Alphabetical">Alphabetical</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Due Date">Due Date</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="Priority">Priority</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {activeFiltersCount > 0 && (
              <Button variant="ghost" onClick={clearFilters} className="h-12 rounded-xl gap-2 text-slate-500">
                <X size={18} />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Active Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {categoryFilter !== 'All' && (
            <Badge variant="secondary" className="px-3 py-1 rounded-full gap-1">
              Category: {categoryFilter}
              <X size={12} className="cursor-pointer" onClick={() => setCategoryFilter('All')} />
            </Badge>
          )}
          {priorityFilter !== 'All' && (
            <Badge variant="secondary" className="px-3 py-1 rounded-full gap-1">
              Priority: {priorityFilter}
              <X size={12} className="cursor-pointer" onClick={() => setPriorityFilter('All')} />
            </Badge>
          )}
        </div>

        {/* Tasks List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredTasks.length > 0 ? (
              filteredTasks.map(task => (
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
                className="col-span-full py-20 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">No tasks found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search query.</p>
              </motion.div>
            )}
          </AnimatePresence>
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

export default Tasks;