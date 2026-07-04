"use client";

import React from 'react';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, 
  Calendar, 
  Clock, 
  Pin, 
  Star, 
  Archive, 
  Trash2, 
  Copy,
  Edit2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onTogglePin: (id: string) => void;
  onToggleImportant: (id: string) => void;
  onToggleArchive: (id: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
  onEdit: (task: Task) => void;
}

const TaskCard = ({ 
  task, 
  onToggleComplete, 
  onTogglePin, 
  onToggleImportant, 
  onToggleArchive,
  onDelete,
  onDuplicate,
  onEdit
}: TaskCardProps) => {
  const priorityColors = {
    Low: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    Medium: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    High: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    Urgent: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className={cn(
        "p-4 group relative transition-all duration-200 border-slate-200 dark:border-slate-800 hover:shadow-md",
        task.isCompleted && "opacity-60 grayscale-[0.5]",
        task.isPinned && "border-blue-200 dark:border-blue-900/50 bg-blue-50/30 dark:bg-blue-900/5"
      )}>
        <div className="flex items-start gap-4">
          <div className="pt-1">
            <Checkbox 
              checked={task.isCompleted} 
              onCheckedChange={() => onToggleComplete(task.id)}
              className="w-5 h-5 rounded-full border-2 border-slate-300 dark:border-slate-700 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "font-semibold text-slate-900 dark:text-slate-100 truncate",
                task.isCompleted && "line-through text-slate-400"
              )}>
                {task.title}
              </h3>
              {task.isPinned && <Pin size={14} className="text-blue-500 fill-blue-500" />}
              {task.isImportant && <Star size={14} className="text-amber-500 fill-amber-500" />}
            </div>
            
            {task.description && (
              <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                {task.description}
              </p>
            )}
            
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{format(parseISO(task.dueDate), 'MMM d, yyyy')}</span>
              </div>
              {task.estimatedDuration && (
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{task.estimatedDuration}</span>
                </div>
              )}
              <Badge variant="secondary" className={cn("px-2 py-0 h-5 font-medium", priorityColors[task.priority])}>
                {task.priority}
              </Badge>
              <Badge variant="outline" className="px-2 py-0 h-5 border-slate-200 dark:border-slate-800">
                {task.category}
              </Badge>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 rounded-xl">
                <DropdownMenuItem onClick={() => onEdit(task)} className="gap-2">
                  <Edit2 size={14} /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDuplicate(task.id)} className="gap-2">
                  <Copy size={14} /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onTogglePin(task.id)} className="gap-2">
                  <Pin size={14} /> {task.isPinned ? 'Unpin' : 'Pin'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleImportant(task.id)} className="gap-2">
                  <Star size={14} /> {task.isImportant ? 'Remove Important' : 'Mark Important'}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onToggleArchive(task.id)} className="gap-2">
                  <Archive size={14} /> {task.isArchived ? 'Restore' : 'Archive'}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onDelete(task.id)} className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/20">
                  <Trash2 size={14} /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;