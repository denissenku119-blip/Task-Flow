"use client";

import React from 'react';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
 MoreVertical, Calendar, Pin, Star, 
 Repeat, ListTree, Copy, Archive, Trash2, Edit2
} from 'lucide-react';
import {
 DropdownMenu,
 DropdownMenuContent,
 DropdownMenuItem,
 DropdownMenuSeparator,
 DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { format, parseISO, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from 'react-i18next';

interface TaskCardProps {
 task: Task;
 onToggleComplete: (id: string) => void;
 onEdit: (task: Task) => void;
 onDelete: (id: string) => void;
 onTogglePin: (id: string) => void;
 onToggleImportant: (id: string) => void;
 onToggleArchive: (id: string) => void;
 onDuplicate: (id: string) => void;
}

const TaskCard = ({ 
 task, 
 onToggleComplete, 
 onEdit, 
 onDelete, 
 onTogglePin, 
 onToggleImportant, 
 onToggleArchive, 
 onDuplicate
}: TaskCardProps) => {
 const { t, i18n } = useTranslation();
 const isOverdue = !task.isCompleted && isBefore(parseISO(task.dueDate), startOfDay(new Date()));
 
 const subtaskProgress = task.subtasks.length > 0
  ? (task.subtasks.filter(s => s.isCompleted).length / task.subtasks.length) * 100
  : 0;

 const priorityColors = {
  Low: 'bg-slate-100 text-slate-600',
  Medium: 'bg-blue-50 text-blue-600',
  High: 'bg-orange-50 text-orange-600',
  Urgent: 'bg-red-50 text-red-600',
 };

 return (
  <motion.div
   layout
   initial={{ opacity: 0, y: 10 }}
   animate={{ opacity: 1, y: 0 }}
   whileHover={{ y: -2 }}
   className="group"
  >
   <Card className={cn(
    "p-4 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5",
    task.isCompleted && "opacity-60 grayscale-[0.3]",
    task.isPinned && "border-blue-200 bg-blue-50/10"
   )}>
    <div className="flex items-start gap-3">
     <Checkbox 
      checked={task.isCompleted} 
      onCheckedChange={() => onToggleComplete(task.id)}
      className="mt-0.5 w-4 h-4 rounded-full border-2"
     />
     
     <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5 mb-1">
       <h3 className={cn(
        "font-medium text-base truncate",
        task.isCompleted && "line-through text-slate-400"
       )}>
        {task.title}
       </h3>
       {task.isPinned && <Pin size={12} className="text-blue-400 fill-blue-400" />}
       {task.isImportant && <Star size={12} className="text-amber-400 fill-amber-400" />}
       {task.recurringInterval !== 'None' && <Repeat size={12} className="text-slate-400" />}
      </div>

      {task.description && (
       <p className="text-sm text-slate-500 line-clamp-1 mb-2">{task.description}</p>
      )}

      <div className="flex flex-wrap items-center gap-2 mb-2">
       <Badge variant="secondary" className={cn("rounded-lg px-1.5 py-0", priorityColors[task.priority])}>
        {t(`tasks.${task.priority.toLowerCase()}`)}
       </Badge>
       <div className={cn(
        "flex items-center gap-1 text-xs",
        isOverdue ? "text-red-400" : "text-slate-400"
       )}>
        <Calendar size={12} />
        {format(parseISO(task.dueDate), i18n.language === 'es' ? 'MMM d' : 'MMM d')}
       </div>
       {task.subtasks.length > 0 && (
        <div className="flex items-center gap-1 text-xs text-slate-400">
         <ListTree size={12} />
         {task.subtasks.filter(s => s.isCompleted).length}/{task.subtasks.length}
        </div>
       )}
      </div>

      {task.subtasks.length > 0 && (
       <Progress value={subtaskProgress} className="h-0.5 bg-slate-100" />
      )}
     </div>

     <DropdownMenu>
      <DropdownMenuTrigger asChild>
       <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full">
        <MoreVertical size={14} />
       </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="rounded-md w-44">
       <DropdownMenuItem onClick={() => onEdit(task)} className="gap-1.5 px-2 py-1">
        <Edit2 size={12} /> {t('tasks.edit')}
       </DropdownMenuItem>
       <DropdownMenuItem onClick={() => onTogglePin(task.id)} className="gap-1.5 px-2 py-1">
        <Pin size={12} /> {task.isPinned ? t('tasks.unpin') : t('tasks.pin')}
       </DropdownMenuItem>
       <DropdownMenuItem onClick={() => onToggleImportant(task.id)} className="gap-1.5 px-2 py-1">
        <Star size={12} /> {task.isImportant ? t('tasks.unmarkImportant') : t('tasks.markImportant')}
       </DropdownMenuItem>
       <DropdownMenuItem onClick={() => onDuplicate(task.id)} className="gap-1.5 px-2 py-1">
        <Copy size={12} /> {t('tasks.duplicate')}
       </DropdownMenuItem>
       <DropdownMenuSeparator className="mx-1 my-0.5" />
       <DropdownMenuItem onClick={() => onToggleArchive(task.id)} className="gap-1.5 px-2 py-1">
        <Archive size={12} /> {task.isArchived ? t('tasks.unarchive') : t('tasks.archive')}
       </DropdownMenuItem>
       <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-500 gap-1.5 px-2 py-1">
        <Trash2 size={12} /> {t('tasks.delete')}
       </DropdownMenuItem>
      </DropdownMenuContent>
     </DropdownMenu>
    </div>
   </Card>
  </motion.div>
 );
};

export default TaskCard;