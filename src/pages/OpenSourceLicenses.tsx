"use client";

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart, Code, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { APP_VERSION } from '@/lib/appVersion';

const OpenSourceLicenses = () => {
  const navigate = useNavigate();
  const licenses = [
    { name: "React", version: "19.2.3", license: "MIT", url: "https://react.dev" },
    { name: "Vite", version: "8.0.0", license: "MIT", url: "https://vitejs.dev" },
    { name: "TypeScript", version: "5.9.3", license: "Apache-2.0", url: "https://www.typescriptlang.org" },
    { name: "Tailwind CSS", version: "3.4.19", license: "MIT", url: "https://tailwindcss.com" },
    { name: "Framer Motion", version: "12.42.2", license: "MIT", url: "https://www.framer.com/motion" },
    { name: "Lucide React", version: "0.462.0", license: "ISC", url: "https://lucide.dev" },
    { name: "Next Themes", version: "0.3.0", license: "MIT", url: "https://github.com/pacocoursey/next-themes" },
    { name: "React Router DOM", version: "6.30.4", license: "MIT", url: "https://reactrouter.com" },
    { name: "TanStack Query", version: "5.56.2", license: "MIT", url: "https://tanstack.com/query" },
    { name: "Radix UI", version: "Multiple", license: "MIT", url: "https://www.radix-ui.com" },
    { name: "Capacitor", version: "8.4.1", license: "MIT", url: "https://capacitorjs.com" },
    { name: "Sonner", version: "1.5.0", license: "MIT", url: "https://sonner.emilkowal.ski" },
  ];

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
              <Code size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Open Source Licenses</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">TaskFlow v{APP_VERSION}</p>
          </div>

          <Card className="p-6 border-slate-200 dark:border-slate-800 rounded-2xl">
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                TaskFlow is built with open source software. We are grateful to the open source community for making this app possible.
              </p>

              <div className="space-y-3">
                {licenses.map((lib) => (
                  <div key={lib.name} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-800 last:border-0">
                    <div>
                      <h3 className="font-medium text-slate-900 dark:text-slate-100">{lib.name}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">v{lib.version} • {lib.license}</p>
                    </div>
                    <a
                      href={lib.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  All libraries are used under their respective open source licenses. For full license texts, please visit the project websites.
                </p>
              </div>
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

export default OpenSourceLicenses;