"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Support = () => {
  const { t } = useTranslation();
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t('support.title')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{t('support.description')}</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <div className="space-y-4 text-center">
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('support.freeExperience')}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('support.donationDescription')}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('support.contributionDescription')}
              </p>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {t('support.thankYou')}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg shadow-pink-500/25 transition-all duration-200"
                disabled
              >
                <Heart size={18} className="mr-2" />
                {t('support.supportButton')}
              </Button>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                {t('support.comingSoon')}
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-400">
              {t('support.noPaymentInfo')}
            </p>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default Support;