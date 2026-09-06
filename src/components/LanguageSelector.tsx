"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setLanguageSelected } from '@/i18n';

interface LanguageSelectorProps {
  onLanguageSelect: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  const handleSelect = (lang: string) => {
    setLanguageSelected(lang);
    onLanguageSelect(lang);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4 shadow-lg shadow-blue-500/20"
          >
            <CheckSquare size={32} className="text-white" />
          </motion.div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-slate-100">
            TaskFlow <span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            Choose your language
          </p>
        </div>

        <div className="space-y-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
          >
            <Button
              onClick={() => handleSelect('en')}
              className="w-full h-16 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-left px-5 gap-3 text-base font-medium transition-all duration-200 group"
            >
              <span className="text-2xl">🇬🇧</span>
              <span className="flex-1">English</span>
              <Globe size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          >
            <Button
              onClick={() => handleSelect('es')}
              className="w-full h-16 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-left px-5 gap-3 text-base font-medium transition-all duration-200 group"
            >
              <span className="text-2xl">🇪🇸</span>
              <span className="flex-1">Español</span>
              <Globe size={16} className="text-slate-400 group-hover:text-blue-600 transition-colors" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-slate-400">
            You can change this later in Settings
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LanguageSelector;
