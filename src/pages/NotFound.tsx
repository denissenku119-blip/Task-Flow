"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
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
          <div className="text-8xl font-black text-slate-200 dark:text-slate-800 mb-2">404</div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t('errors.notFound')}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            {t('errors.notFoundDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button onClick={() => navigate(-1)} variant="outline" className="rounded-xl gap-1">
              <ArrowLeft size={16} />
              {t('common.back')}
            </Button>
            <Button onClick={() => navigate('/')} className="rounded-xl gap-1 bg-blue-600 hover:bg-blue-700">
              <Home size={16} />
              {t('common.goHome')}
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default NotFound;