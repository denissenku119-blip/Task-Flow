"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Check, List, Clock, ShieldCheck, DollarSign, Heart, Mail, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_VERSION } from '@/lib/appVersion';

const TermsOfService = () => {
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Terms of Service</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Effective Date: {new Date().toLocaleDateString()}</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Check size={20} className="text-green-500" />
                  Acceptance of Terms
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-2">
                  By downloading, installing, or using TaskFlow (the "App"), you agree to be bound by these Terms of Service ("Terms").
                </p>
                <p className="text-slate-600 dark:text-slate-300">
                  If you do not agree to these Terms, do not use the App.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <List size={20} className="text-blue-500" />
                  Description of Service
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  TaskFlow is a task management application designed to help users organize their tasks, notes, and schedules. The App provides features for creating, editing, and managing tasks, with optional features such as calendar views, reminders, and productivity tools.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Clock size={20} className="text-blue-500" />
                  License
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to install and use the App solely for your personal, non-commercial purposes on devices you own or control.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-blue-500" />
                  User Responsibilities
                </h2>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>You are responsible for maintaining the confidentiality of your device and any passwords or security measures</li>
                  <li>You agree to use the App only for lawful purposes</li>
                  <li>You will not attempt to reverse engineer, decompile, or disassemble the App</li>
                  <li>You will not remove or alter any proprietary notices in the App</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <DollarSign size={20} className="text-green-500" />
                  Payments and Donations
                </h2>
                <p className="text-slate-600 dark:text-slate-300 mb-2">
                  TaskFlow is free to use. Optional donations are available through Google Play Billing to support ongoing development.
                </p>
                <ul className="list-disc list-inside text-slate-600 dark:text-slate-300 space-y-2 ml-4">
                  <li>All donations are processed through Google Play Billing</li>
                  <li>TaskFlow does not collect or store any payment information</li>
                  <li>Donations are voluntary and non-refundable (subject to Google Play's refund policies)</li>
                  <li>Making a donation does not grant any special rights or privileges beyond supporting development</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Heart size={20} className="text-pink-500" />
                  Supporter Badge
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  Users who make a donation through Google Play Billing may receive a cosmetic "Supporter" badge displayed in the Settings screen. This badge provides no functional benefits and is purely for recognition.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Trash2 size={20} className="text-red-500" />
                  Termination
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  We may terminate or suspend your access to the App immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  Upon termination, your right to use the App will cease immediately. If you wish to terminate your use of the App, you may simply uninstall it from your device.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Shield size={20} className="text-blue-500" />
                  Disclaimer of Warranty
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  THE APP IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTY OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
                </p>
                <p className="text-slate-600 dark:text-slate-300 mt-2">
                  WE MAKE NO WARRANTY THAT THE APP WILL MEET YOUR REQUIREMENTS OR THAT THE APP WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <DollarSign size={20} className="text-red-500" />
                  Limitation of Liability
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES, WHETHER INCURRED DIRECTLY OR INDIRECTLY, OR ANY LOSS OF DATA, USE, GOOD-WILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF THE APP.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  <Mail size={20} className="text-blue-500" />
                  Contact
                </h2>
                <p className="text-slate-600 dark:text-slate-300">
                  If you have any questions about these Terms, please contact us at: <span className="text-blue-600 dark:text-blue-400">terms@taskflow.app</span>
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
              onClick={() => window.location.href = '/support'}
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

export default TermsOfService;