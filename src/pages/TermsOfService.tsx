"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, BookOpen, Mail, Trash2, Code, Heart, User, CheckCircle, Clock, AlertTriangle, Link, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { APP_VERSION } from '@/lib/appVersion';

const TermsOfService = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto px-4 py-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-2xl mb-4 shadow-lg">
              <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t('terms.title')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">{t('common.effectiveDate')}: {new Date().toLocaleDateString(i18n.language === 'es' ? 'es-ES' : 'en-US')}</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <BookOpen size={20} className="text-blue-500" />
                {t('terms.acceptance')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                {t('terms.acceptanceDescription')}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <span>{t('terms.disagree')}</span>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <FileText size={20} className="text-blue-500" />
                {t('terms.description')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('terms.descriptionText')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <CheckCircle size={20} className="text-blue-500" />
                {t('terms.license')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('terms.licenseText')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <User size={20} className="text-blue-500" />
                {t('terms.userResponsibilities')}
              </h2>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1.5 ml-4">
                <li>{t('terms.responsibilities')[0]}</li>
                <li>{t('terms.responsibilities')[1]}</li>
                <li>{t('terms.responsibilities')[2]}</li>
                <li>{t('terms.responsibilities')[3]}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Code size={20} className="text-blue-500" />
                {t('terms.payments')}
              </h2>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1.5 ml-4">
                <li>{t('terms.paymentsDescription')}</li>
                <li>{t('terms.donationsBilling')}</li>
                <li>{t('terms.noPaymentStorage')}</li>
                <li>{t('terms.donationsVoluntary')}</li>
                <li>{t('terms.noSpecialRights')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Heart size={20} className="text-pink-500" />
                {t('terms.supporterBadge')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('terms.supporterDescription')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Clock size={20} className="text-blue-500" />
                {t('terms.termination')}
              </h2>
              <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-1.5 ml-4">
                <li>{t('terms.terminationDescription')}</li>
                <li>{t('terms.terminationUninstall')}</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500" />
                {t('terms.disclaimer')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('terms.disclaimerText')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Link size={20} className="text-blue-500" />
                {t('terms.liability')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {t('terms.liabilityText')}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Mail size={20} className="text-blue-500" />
                {t('terms.contact')}
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                {t('terms.contactText')}
              </p>
            </section>
          </Card>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400">
              TaskFlow v{APP_VERSION} • {t('common.allRightsReserved')}
            </p>
          </div>

          <div className="mt-6 text-center">
            <Button
              onClick={() => navigate('/support')}
              className="rounded-xl gap-2 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Heart size={18} />
              {t('support.supportButton')}
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default TermsOfService;