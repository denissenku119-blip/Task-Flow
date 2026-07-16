"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Clock, 
  ListTodo, 
  TrendingUp 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsGridProps {
  stats: {
    total: number;
    completed: number;
    pending: number;
    percentage: number;
  };
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  const items = [
    { 
      label: 'Total Tasks', 
      value: stats.total, 
      icon: ListTodo, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50 dark:bg-blue-900/20' 
    },
    { 
      label: 'Completed', 
      value: stats.completed, 
      icon: CheckCircle2, 
      color: 'text-green-600', 
      bg: 'bg-green-50 dark:bg-green-900/20' 
    },
    { 
      label: 'Pending', 
      value: stats.pending, 
      icon: Clock, 
      color: 'text-orange-600', 
      bg: 'bg-orange-50 dark:bg-orange-900/20' 
    },
    { 
      label: 'Completion', 
      value: `${stats.percentage}%`, 
      icon: TrendingUp, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50 dark:bg-purple-900/20' 
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-4">
      {items.map((item, index) => (
        <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                >
                  <Card className="p-4 border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-2 rounded-xl ${item.bg} ${item.color}`}>
                        <item.icon size={20} />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.value}</h3>
                    </div>
                    {item.label === 'Completion' && (
                      <div className="mt-2">
                        <Progress value={stats.percentage} className="h-1.5 bg-slate-100 dark:bg-slate-800" />
                      </div>
                    )}
                  </Card>
                </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid;