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
    totalCompleted: number;
    totalActive: number;
    percentage: number;
    todayCompleted: number;
    todayActive: number;
    overdueTasks: number;
  };
}

const StatsGrid = ({ stats }: StatsGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <motion.div
        key="total"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        <Card className="p-6 border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <ListTodo size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Completed Tasks</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.totalCompleted}</h3>
          </div>
          {stats.totalActive > 0 && (
            <div className="mt-4">
              <Progress value={stats.percentage} className="h-2 bg-slate-100 dark:bg-slate-800" />
            </div>
          )}
        </Card>
      </motion.div>

      <motion.div
        key="today"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-blue-50 text-blue-600">
              <CheckCircle2 size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Today's Progress</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.todayCompleted}</h3>
          </div>
          {stats.todayActive > 0 && (
            <div className="mt-4">
              <Progress value={stats.todayCompleted / stats.todayActive * 100} className="h-2 bg-slate-100 dark:bg-slate-800" />
            </div>
          )}
        </Card>
      </motion.div>

      <motion.div
        key="overdue"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-red-50 text-red-600">
              <Clock size={24} />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Overdue Tasks</p>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{stats.overdueTasks}</h3>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default StatsGrid;