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
import { useTranslation } from 'react-i18next';

const Tasks = () => {
 const { t } = useTranslation();
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
   <div className="flex flex-col gap-4">
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
     <h1 className="text-2xl font-bold tracking-tight">{t('tasks.title')}</h1>
     <Button 
      onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-5 h-10 gap-1.5"
     >
      <Plus size={18} />
      {t('tasks.newTask')}
     </Button>
    </div>

    {/* Search and Filters Bar */}
    <div className="flex flex-col lg:flex-row gap-3">
     <div className="relative flex-1">
      <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
      <Input 
       placeholder={t('tasks.searchPlaceholder')} 
       className="pl-8 h-10 rounded-lg border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
       value={searchQuery}
       onChange={(e) => setSearchQuery(e.target.value)}
      />
     </div>
     
     <div className="flex flex-wrap gap-1.5">
      {/* Main Filter */}
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 rounded-lg gap-1.5 border-slate-200 dark:border-slate-800">
         <Filter size={16} />
         {filter}
        </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent className="rounded-lg w-40">
        <DropdownMenuLabel className="text-xs font-medium mb-1">{t('tasks.filterByStatus')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filter} onValueChange={(v) => setFilter(v as FilterOption)}>
         <DropdownMenuRadioItem value="All">{t('tasks.allTasks')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Today">{t('common.today')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Upcoming">{t('tasks.upcoming')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Completed">{t('tasks.completed')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Pinned">{t('dashboard.pinned')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Important">{t('tasks.important')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Archived">{t('tasks.archived')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
       </DropdownMenuContent>
      </DropdownMenu>

      {/* Sort */}
      <DropdownMenu>
       <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-10 rounded-lg gap-1.5 border-slate-200 dark:border-slate-800">
         <ArrowUpDown size={16} />
         {t('tasks.sortBy')}: {sortBy}
        </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent className="rounded-lg w-40">
        <DropdownMenuLabel className="text-xs font-medium mb-1">{t('tasks.sortBy')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
         <DropdownMenuRadioItem value="Newest">{t('tasks.newest')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Oldest">{t('tasks.oldest')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Alphabetical">{t('tasks.alphabetical')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Due Date">{t('tasks.dueDate')}</DropdownMenuRadioItem>
         <DropdownMenuRadioItem value="Priority">{t('tasks.priority')}</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
       </DropdownMenuContent>
      </DropdownMenu>

      {activeFiltersCount > 0 && (
       <Button variant="ghost" onClick={clearFilters} className="h-10 rounded-lg gap-1.5 text-slate-500">
        <X size={16} />
        {t('tasks.clearFilters')}
       </Button>
      )}
     </div>
    </div>

    {/* Active Filter Badges */}
    <div className="flex flex-wrap gap-1.5">
     {categoryFilter !== 'All' && (
      <Badge variant="secondary" className="px-2 py-0.5 rounded-full gap-0.5 text-xs">
       {t('tasks.category')}: {categoryFilter}
       <X size={10} className="cursor-pointer" onClick={() => setCategoryFilter('All')} />
      </Badge>
     )}
     {priorityFilter !== 'All' && (
      <Badge variant="secondary" className="px-2 py-0.5 rounded-full gap-0.5 text-xs">
       {t('tasks.priority')}: {priorityFilter}
       <X size={10} className="cursor-pointer" onClick={() => setPriorityFilter('All')} />
      </Badge>
     )}
    </div>

    {/* Tasks List */}
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
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
        className="col-span-full py-12 text-center"
       >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-400 mb-3">
         <Search size={28} />
        </div>
        <h3 className="text-lg font-semibold mb-1.5">{t('tasks.noTasks')}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{t('tasks.noTasksDescription')}</p>
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