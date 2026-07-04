"use client";

import React from 'react';
import { Task } from '@/types/task';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  MoreVertical, Calendar, Clock, Pin, Star, 
  Repeat, ListTree, AlertCircle, ChevronRight 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { format, parseISO, isBefore, startOfDay } from 'date-fns';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';

interface TaskCardProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

const TaskCard = ({ task, onToggleComplete, onEdit, onDelete }: TaskCardProps) => {
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
      whileHover={{ y: -4 }}
      className="group"
    >
      <Card className={cn(
        "p-5 border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/5",
        task.isCompleted && "opacity-60 grayscale-[0.3]",
        task.isPinned && "border-blue-200 bg-blue-50/10"
      )}>
        <div className="flex items-start gap-4">
          <Checkbox 
            checked={task.isCompleted} 
            onCheckedChange={() => onToggleComplete(task.id)}
            className="mt-1 w-5 h-5 rounded-full border-2"
          />
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={cn(
                "font-bold text-lg truncate",
                task.isCompleted && "line-through text-slate-400"
              )}>
                {task.title}
              </h3>
              {task.isPinned && <Pin size={14} className="text-blue-500 fill-blue-500" />}
              {task.recurringInterval !== 'None' && <Repeat size={14} className="text-slate-400" />}
            </div>

            {task.description && (
              <p className="text-sm text-slate-500 line-clamp-1 mb-3">{task.description}</p>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="secondary" className={cn("rounded-lg px-2 py-0.5", priorityColors[task.priority])}>
                {task.priority}
              </Badge>
              <div className={cn(
                "flex items-center gap-1.5 text-xs font-medium",
                isOverdue ? "text-red-500" : "text-slate-400"
              )}>
                <Calendar size={14} />
                {format(parseISO(task.dueDate), 'MMM d')}
              </div>
              {task.subtasks.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <ListTree size={14} />
                  {task.subtasks.filter(s => s.isCompleted).length}/{task.subtasks.length}
                </div>
              )}
            </div>

            {task.subtasks.length > 0 && (
              <Progress value={subtaskProgress} className="h-1 bg-slate-100" />
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                <MoreVertical size={16} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-xl w-40">
              <DropdownMenuItem onClick={() => onEdit(task)}>Edit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(task.id)} className="text-red-600">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
    </motion.div>
  );
};

export default TaskCard;