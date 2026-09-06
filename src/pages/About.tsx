"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Target, Code, Mail, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_VERSION } from '@/lib/appVersion';
import { useTranslation } from 'react-i18next';

const About = () => {
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-2xl mb-4 shadow-lg">
              <Shield size={36} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">TaskFlow</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{t('about.version')} {APP_VERSION}</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Target size={20} className="text-blue-500" />
                {t('about.mission')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('about.missionDescription')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Code size={20} className="text-blue-500" />
                {t('about.developer')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {t('about.developerDescription')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Shield size={20} className="text-blue-500" />
                {t('about.privacyFirst')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {t('about.privacyDescription')}
              </p>
            </section>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                onClick={() => navigate('/support')}
                className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg shadow-pink-500/25 transition-all duration-200"
              >
                <Heart size={18} className="mr-2" />
                {t('support.supportButton')}
              </Button>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                {t('support.comingSoon')}
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-slate-400">
              TaskFlow v{APP_VERSION} • {t('common.allRightsReserved')}
            </p>
            <div className="flex justify-center gap-4">
              <a href="mailto:hello@taskflow.app" className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1">
                <Mail size={14} />
                {t('common.contact')}
              </a>
              <a href="https://github.com/taskflow" className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1">
                <Github size={14} />
                {t('common.source')}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default About;