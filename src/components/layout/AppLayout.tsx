"use client";

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar as CalendarIcon, 
  Settings as SettingsIcon,
  ArrowLeft,
  Moon,
  Sun,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const isHome = location.pathname === '/';

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: CalendarIcon, label: 'Calendar', path: '/calendar' },
    { icon: SettingsIcon, label: 'Settings', path: '/settings' },
  ];

  // Keyboard shortcut for back navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !isHome) {
        navigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isHome, navigate]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-6 sticky top-0 h-screen z-30">
        <div className="flex items-center gap-3 mb-10 px-2">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20"
          >
            <CheckSquare size={24} />
          </motion.div>
          <h1 className="text-xl font-black tracking-tight">TaskFlow <span className="text-blue-600">Pro</span></h1>
        </div>

        <nav className="flex-1 space-y-1.5">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 h-12 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  location.pathname === item.path 
                    ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-bold" 
                    : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                )}
              >
                {location.pathname === item.path && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute left-0 w-1 h-6 bg-blue-600 rounded-r-full"
                  />
                )}
                <item.icon size={20} className={cn(
                  "transition-transform duration-200 group-hover:scale-110",
                  location.pathname === item.path && "text-blue-600 dark:text-blue-400"
                )} />
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 space-y-4 border-t border-slate-100 dark:border-slate-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-full justify-start gap-3 h-12 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            <span className="font-medium">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
          </Button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          {!isHome && (
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-1">
              <ArrowLeft size={20} />
            </Button>
          )}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <CheckSquare size={18} />
            </div>
            <span className="font-black tracking-tight">TaskFlow</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-full">
          {isMobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="md:hidden fixed inset-0 top-[65px] bg-white dark:bg-slate-900 z-40 p-6 flex flex-col"
          >
            <nav className="space-y-3">
              {navItems.map((item) => (
                <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start gap-4 h-16 text-lg rounded-2xl font-bold",
                      location.pathname === item.path 
                        ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" 
                        : "text-slate-500 dark:text-slate-400"
                    )}
                  >
                    <item.icon size={24} />
                    {item.label}
                  </Button>
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                className="w-full h-14 rounded-2xl gap-3 font-bold border-slate-200 dark:border-slate-800"
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setIsMobileMenuOpen(false);
                }}
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                Toggle Theme
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full overflow-x-hidden">
        <div className="mb-8 flex items-center gap-4">
          {!isHome && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden md:block"
            >
              <Button 
                variant="ghost" 
                onClick={() => navigate(-1)} 
                className="rounded-xl gap-2 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100"
              >
                <ArrowLeft size={18} />
                Back
              </Button>
            </motion.div>
          )}
        </div>
        
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AppLayout;