"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Task, Priority, Category } from '@/types/task';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from 'react-i18next';

const taskSchema = z.object({
  title: z.string().min(1, "Title is required").max(100),
  description: z.string().max(500).optional(),
  dueDate: z.string().min(1, "Due date is required"),
  priority: z.enum(['Low', 'Medium', 'High', 'Urgent']),
  category: z.enum(['Personal', 'Work', 'School', 'Health', 'Finance', 'Shopping', 'Other']),
  isPinned: z.boolean().default(false),
  isImportant: z.boolean().default(false),
  reminderEnabled: z.boolean().default(false),
  estimatedDuration: z.string().optional(),
});

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Task | null;
}

const TaskForm = ({ isOpen, onClose, onSubmit, initialData }: TaskFormProps) => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: initialData ? {
      title: initialData.title,
      description: initialData.description,
      dueDate: initialData.dueDate.split('T')[0],
      priority: initialData.priority,
      category: initialData.category,
      isPinned: initialData.isPinned,
      isImportant: initialData.isImportant,
      reminderEnabled: initialData.reminderEnabled,
      estimatedDuration: initialData.estimatedDuration,
    } : {
      title: '',
      description: '',
      dueDate: new Date().toISOString().split('T')[0],
      priority: 'Medium',
      category: 'Personal',
      isPinned: false,
      isImportant: false,
      reminderEnabled: false,
      estimatedDuration: '',
    },
  });

  React.useEffect(() => {
    if (isOpen) {
      if (initialData) {
        form.reset({
          title: initialData.title,
          description: initialData.description,
          dueDate: initialData.dueDate.split('T')[0],
          priority: initialData.priority,
          category: initialData.category,
          isPinned: initialData.isPinned,
          isImportant: initialData.isImportant,
          reminderEnabled: initialData.reminderEnabled,
          estimatedDuration: initialData.estimatedDuration,
        });
      } else {
        form.reset({
          title: '',
          description: '',
          dueDate: new Date().toISOString().split('T')[0],
          priority: 'Medium',
          category: 'Personal',
          isPinned: false,
          isImportant: false,
          reminderEnabled: false,
          estimatedDuration: '',
        });
      }
    }
  }, [isOpen, initialData, form]);

  const handleFormSubmit = (values: z.infer<typeof taskSchema>) => {
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {initialData ? t('tasks.editTask') : t('tasks.createTask')}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tasks.title')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('tasks.addDetails')} {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('tasks.descriptionOptional')}</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder={t('tasks.addDetails')} 
                      className="resize-none rounded-xl min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('tasks.dueDate')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} className="rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="estimatedDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('tasks.durationExample')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('tasks.durationExample')} {...field} className="rounded-xl" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('tasks.priority')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder={t('tasks.selectPriority')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Low">{t('tasks.low')}</SelectItem>
                        <SelectItem value="Medium">{t('tasks.medium')}</SelectItem>
                        <SelectItem value="High">{t('tasks.high')}</SelectItem>
                        <SelectItem value="Urgent">{t('tasks.urgent')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('tasks.category')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder={t('tasks.selectCategory')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="Personal">{t('tasks.personal')}</SelectItem>
                        <SelectItem value="Work">{t('tasks.work')}</SelectItem>
                        <SelectItem value="School">{t('tasks.school')}</SelectItem>
                        <SelectItem value="Health">{t('tasks.health')}</SelectItem>
                        <SelectItem value="Finance">{t('tasks.finance')}</SelectItem>
                        <SelectItem value="Shopping">{t('tasks.shopping')}</SelectItem>
                        <SelectItem value="Other">{t('tasks.other')}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              <FormField
                control={form.control}
                name="isPinned"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="cursor-pointer">{t('tasks.pinTask')}</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isImportant"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 space-y-0">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="cursor-pointer">{t('tasks.important')}</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="pt-4">
              <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl">
                {t('common.cancel')}
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8">
                {initialData ? t('tasks.saveChanges') : t('tasks.createTask')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;