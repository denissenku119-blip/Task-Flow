"use client";

import React from 'react';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';

const REAL_EMPTY = [
  { day: 'Mon', completed: 0, fill: '#E2E8F0' },
  { day: 'Tue', completed: 0, fill: '#E2E8F0' },
  { day: 'Wed', completed: 0, fill: '#E2E8F0' },
  { day: 'Thu', completed: 0, fill: '#E2E8F0' },
  { day: 'Fri', completed: 0, fill: '#E2E8F0' },
  { day: 'Sat', completed: 0, fill: '#E2E8F0' },
  { day: 'Sun', completed: 0, fill: '#E2E8F0' },
];

const WeeklyChart = () => {
  return (
    <Card className="p-5 border-slate-200 dark:border-slate-800 rounded-2xl">
      <h3 className="text-sm font-bold mb-4 text-slate-700 dark:text-slate-200">Weekly Productivity</h3>
      <div className="h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={REAL_EMPTY} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#94A3B8' }} allowDecimals={false} />
            <Tooltip cursor={{ fill: 'rgba(59,130,246,0.08)' }} contentStyle={{ borderRadius: 12, border: 'none', fontSize: 12 }} />
            <Bar dataKey="completed" radius={[6, 6, 0, 0]} maxBarSize={32}>
              {REAL_EMPTY.map((entry, index) => (
                <Cell key={index} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default WeeklyChart;