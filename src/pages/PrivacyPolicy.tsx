"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Database, Globe, Bell, BarChart3, Bug, Heart, UserCheck, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_VERSION } from '@/lib/appVersion';

const PrivacyPolicy = () => {
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Privacy Policy</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Effective Date: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Database size={20} className="text-blue-500" />
                  What Data TaskFlow Stores
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>Your tasks, notes, and task-related data</li>
                  <li>Task preferences and settings</li>
                  <li>App usage preferences (theme, sort order, etc.)</li>
                  <li>Supporter status (if you make a donation)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Globe size={20} className="text-blue-500" />
                  What Data Never Leaves Your Device
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>All your task data is stored locally in your browser</li>
                  <li>Your data is not synced to any server or cloud service</li>
                  <li>No personal information is collected or stored</li>
                  <li>No analytics or tracking is performed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <UserCheck size={20} className="text-blue-500" />
                  Authentication Data
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-2">
                  TaskFlow does not require an account or authentication. All data is stored locally on your device.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <BarChart3 size={20} className="text-blue-500" />
                  Analytics
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  TaskFlow does not collect any analytics or usage data. We respect your privacy and do not track your activity.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Bug size={20} className="text-blue-500" />
                  Crash Reporting
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  TaskFlow does not include crash reporting or error logging. Any errors are handled locally without sending data anywhere.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-pink-500" />
                  Support & Donations
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>Donations are processed through Google Play Billing only</li>
                  <li>No payment information is stored by TaskFlow</li>
                  <li>Only a boolean flag (is_supporter = true) is stored locally after a successful donation</li>
                  <li>No personal financial information is collected or transmitted</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Bell size={20} className="text-blue-500" />
                  Notifications
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  TaskFlow does not use push notifications or any notification system that requires device permissions or data transmission.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <UserCheck size={20} className="text-blue-500" />
                  Your Rights
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>You own your data completely</li>
                  <li>You can delete all your data at any time through Settings → Data & Privacy → Reset All Data</li>
                  <li>Your data remains on your device only</li>
                  <li>You can uninstall the app to remove all data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Mail size={20} className="text-blue-500" />
                  Contact
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  For privacy questions or concerns, please contact: <span className="text-blue-600 dark:text-blue-400">privacy@taskflow.app</span>
                </p>
              </section>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
              <p className="text-xs text-slate-400">
                TaskFlow v{APP_VERSION} • All rights reserved
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center">
            <Button
              onClick={() => navigate('/support')}
              className="rounded-xl gap-2 bg-pink-500 hover:bg-pink-600 text-white"
            >
              <Heart size={18} />
              Support TaskFlow
            </Button>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default PrivacyPolicy;