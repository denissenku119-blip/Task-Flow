"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Database, Globe, Bell, BarChart3, Bug, Heart, UserCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { APP_VERSION } from '@/lib/appVersion';

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const dateLocale = i18n.language === 'es' ? 'es-ES' : 'en-US';
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t('privacy.title')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {t('common.effectiveDate')}: {new Date().toLocaleDateString(dateLocale)}
            </p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Database size={20} className="text-blue-500" />
                  {t('privacy.whatDataStored')}
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>{t('privacy.dataStored')}</li>
                  <li>{t('privacy.taskPreferences')}</li>
                  <li>{t('privacy.appPreferences')}</li>
                  <li>{t('privacy.supporterStatus')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Globe size={20} className="text-blue-500" />
                  {t('privacy.whatNeverLeaves')}
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>{t('privacy.localStorage')}</li>
                  <li>{t('privacy.noSync')}</li>
                  <li>{t('privacy.noPersonalInfo')}</li>
                  <li>{t('privacy.noAnalytics')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <UserCheck size={20} className="text-blue-500" />
                  {t('privacy.authentication')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-2">
                  {t('privacy.noAuthRequired')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 size={20} className="text-blue-500" />
                  {t('privacy.analytics')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('privacy.noAnalyticsDescription')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Bug size={20} className="text-blue-500" />
                  {t('privacy.crashReporting')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('privacy.noCrashReporting')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-pink-500" />
                  {t('privacy.supportDonations')}
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>{t('privacy.donationsBilling')}</li>
                  <li>{t('privacy.noPaymentStorage')}</li>
                  <li>{t('privacy.supporterFlag')}</li>
                  <li>{t('privacy.noFinancialInfo')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Bell size={20} className="text-blue-500" />
                  {t('privacy.notifications')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('privacy.noPushNotifications')}
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <UserCheck size={20} className="text-blue-500" />
                  {t('privacy.yourRights')}
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>{t('privacy.ownData')}</li>
                  <li>{t('privacy.deleteData')}</li>
                  <li>{t('privacy.deviceOnly')}</li>
                  <li>{t('privacy.uninstallRemove')}</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Mail size={20} className="text-blue-500" />
                  {t('privacy.contact')}
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {t('privacy.contactText')}{' '}
                  <a
                    href={`mailto:${t('privacy.privacyEmail')}`}
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {t('privacy.privacyEmail')}
                  </a>
                </p>
              </section>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                TaskFlow v{APP_VERSION} • {t('common.allRightsReserved')}
              </p>
            </div>
          </Card>

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

export default PrivacyPolicy;