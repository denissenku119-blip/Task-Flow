"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

const Support = () => {
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl mb-4 shadow-lg shadow-pink-500/25">
              <Heart size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Support TaskFlow</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Optional donations to help TaskFlow grow</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <div className="space-y-4 text-center">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                TaskFlow is free and will always provide a generous free experience.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                If TaskFlow has helped you stay productive, you can support its continued development with a completely optional donation.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                Every contribution helps fund new features, bug fixes, performance improvements and future updates.
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Thank you for helping TaskFlow grow. ❤️
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg shadow-pink-500/25 transition-all duration-200"
                disabled
              >
                <Heart size={18} className="mr-2" />
                Support TaskFlow
              </Button>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                Support options will become available after the Play Store release.
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              No payment information is collected by TaskFlow. All donations are processed securely through Google Play Billing.
            </p>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Support;