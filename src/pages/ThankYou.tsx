"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const ThankYou = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <div className="text-6xl font-black text-blue-500 mb-2">✓</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t('common.thankYou')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {t('common.thankYouDescription')}
          </p>
          <Button
            onClick={() => navigate('/')}
            className="rounded-xl gap-1 bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Home size={16} />
            {t('common.goHome')}
          </Button>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default ThankYou;