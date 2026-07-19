"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Shield, Target, Code, Mail, Github } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_VERSION } from '@/lib/appVersion';

const About = () => {
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
            <p className="text-slate-500 dark:text-slate-400 mt-2">Version {APP_VERSION}</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Target size={20} className="text-blue-500" />
                Our Mission
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                TaskFlow exists to help people organize their lives beautifully and privately. We believe productivity tools should respect your privacy, work offline, and never lock your data behind paywalls. Our mission is to provide a free, powerful, and privacy-first task management experience for everyone.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Code size={20} className="text-blue-500" />
                Developer
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                TaskFlow is developed by an independent developer passionate about privacy-focused productivity tools. The app is built with modern web technologies and is available on Android through the Google Play Store.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <Shield size={20} className="text-blue-500" />
                Privacy First
              </h2>
              <p className="text-slate-600 dark:text-slate-300">
                All your data stays on your device. We don't collect analytics, don't track you, and don't require accounts. TaskFlow is free and will always provide a generous free experience.
              </p>
            </section>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <Button
                onClick={() => navigate('/support')}
                className="w-full h-12 rounded-xl text-base font-medium bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white shadow-lg shadow-pink-500/25 transition-all duration-200"
              >
                <Heart size={18} className="mr-2" />
                Support TaskFlow
              </Button>
              <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
                Support options will become available after the Play Store release.
              </p>
            </div>
          </Card>

          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-slate-400">
              TaskFlow v{APP_VERSION} • All rights reserved
            </p>
            <div className="flex justify-center gap-4">
              <a href="mailto:hello@taskflow.app" className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1">
                <Mail size={14} />
                Contact
              </a>
              <a href="https://github.com/taskflow" className="text-blue-600 dark:text-blue-400 text-sm flex items-center gap-1">
                <Github size={14} />
                Source
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default About;