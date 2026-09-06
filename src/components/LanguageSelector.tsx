"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { setLanguageSelected, SUPPORTED_LANGUAGES } from '@/i18n';

interface LanguageSelectorProps {
  onLanguageSelect: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onLanguageSelect }) => {
  const handleSelect = async (lang: string) => {
    await setLanguageSelected(lang);
    onLanguageSelect(lang);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[60vh] overflow-y-auto px-1">
          {SUPPORTED_LANGUAGES.map((lang, index) => (
            <motion.div
              key={lang.code}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + index * 0.02, duration: 0.3, ease: "easeOut" }}
            >
              <Button
                onClick={() => handleSelect(lang.code)}
                variant="outline"
                className="w-full h-14 rounded-xl border-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-left px-4 gap-3 text-base font-medium transition-all duration-200"
              >
                <span className="text-2xl shrink-0">{lang.flag}</span>
                <span className="flex-1 truncate">{lang.nativeName}</span>
              </Button>
            </motion.div>
          ))}
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
