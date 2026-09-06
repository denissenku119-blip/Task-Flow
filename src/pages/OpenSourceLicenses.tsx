"use client";

import React from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const licenses = [
  {
    name: "React",
    version: "18.2.0",
    license: "MIT",
    url: "https://reactjs.org/",
    description: "A JavaScript library for building user interfaces"
  },
  {
    name: "TypeScript",
    version: "5.3.3",
    license: "Apache-2.0",
    url: "https://www.typescriptlang.org/",
    description: "TypeScript is a language for application-scale JavaScript"
  },
  {
    name: "Vite",
    version: "5.0.0",
    license: "MIT",
    url: "https://vitejs.dev/",
    description: "Next generation frontend tooling"
  },
  {
    name: "Tailwind CSS",
    version: "3.4.0",
    license: "MIT",
    url: "https://tailwindcss.com/",
    description: "A utility-first CSS framework"
  },
  {
    name: "Radix UI",
    version: "1.0.0",
    license: "MIT",
    url: "https://www.radix-ui.com/",
    description: "Unstyled, accessible UI component library"
  },
  {
    name: "Framer Motion",
    version: "10.16.0",
    license: "MIT",
    url: "https://www.framer.com/motion/",
    description: "Production-ready motion library for React"
  },
  {
    name: "Zod",
    version: "3.22.0",
    license: "MIT",
    url: "https://zod.dev/",
    description: "TypeScript-first schema validation"
  },
  {
    name: "React Hook Form",
    version: "7.49.0",
    license: "MIT",
    url: "https://react-hook-form.com/",
    description: "Performant, flexible and extensible forms"
  },
  {
    name: "@tanstack/react-query",
    version: "5.14.0",
    license: "MIT",
    url: "https://tanstack.com/query",
    description: "Powerful asynchronous state management"
  },
  {
    name: "Lucide React",
    version: "0.294.0",
    license: "ISC",
    url: "https://lucide.dev/",
    description: "Beautiful & consistent icon toolkit"
  },
  {
    name: "date-fns",
    version: "2.30.0",
    license: "MIT",
    url: "https://date-fns.org/",
    description: "Modern JavaScript date utility library"
  },
  {
    name: "Recharts",
    version: "2.10.0",
    license: "MIT",
    url: "https://recharts.org/",
    description: "Redefined chart library built with React and D3"
  },
  {
    name: "next-themes",
    version: "0.2.1",
    license: "MIT",
    url: "https://github.com/pacocoursey/next-themes",
    description: "Perfect dark mode in Next.js"
  },
  {
    name: "i18next",
    version: "23.7.0",
    license: "MIT",
    url: "https://www.i18next.com/",
    description: "Internationalization framework"
  },
  {
    name: "react-i18next",
    version: "14.0.0",
    license: "MIT",
    url: "https://react.i18next.com/",
    description: "Internationalization for React"
  },
  {
    name: "sonner",
    version: "1.2.0",
    license: "MIT",
    url: "https://sonner.emilkowal.ski/",
    description: "An opinionated toast component"
  }
];

const OpenSourceLicenses = () => {
  const { t } = useTranslation();
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
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">{t('settings.openSourceLicenses')}</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">
              {licenses.length} open source packages used in TaskFlow
            </p>
          </div>

          <div className="space-y-3">
            {licenses.map((lib, index) => (
              <motion.div
                key={lib.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
              >
                <Card className="p-4 border-slate-200 dark:border-slate-800 rounded-xl hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">{lib.name}</h3>
                        <Badge variant="secondary" className="text-xs px-1.5 py-0 rounded-md font-mono">
                          v{lib.version}
                        </Badge>
                        <Badge className="text-xs px-1.5 py-0 rounded-md bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                          {lib.license}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{lib.description}</p>
                    </div>
                    <a
                      href={lib.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline flex-shrink-0"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
            <p className="text-sm text-slate-600 dark:text-slate-300 text-center">
              TaskFlow is built with ❤️ using these amazing open source projects.
              Thank you to all the maintainers and contributors!
            </p>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
};

export default OpenSourceLicenses;