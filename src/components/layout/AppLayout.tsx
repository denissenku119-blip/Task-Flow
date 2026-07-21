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
 X,
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
   <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 sticky top-0 h-screen z-30">
    <div className="flex items-center gap-2 mb-6 px-1">
     <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-md shadow-blue-500/20">
      <CheckSquare size={20} />
     </motion.div>
     <h1 className="text-lg font-black tracking-tight">TaskFlow <span className="text-blue-600">Pro</span></h1>
    </div>
    <nav className="flex-1 space-y-1">
     {navItems.map((item) => (
      <Link key={item.path} to={item.path}>
       <Button variant="ghost" className={cn("w-full justify-start gap-2 h-10 rounded-lg transition-all duration-200 group relative overflow-hidden", location.pathname === item.path ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 font-medium" : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400")}>
        {location.pathname === item.path && (<motion.div layoutId="activeNav" className="absolute left-0 w-1 h-5 bg-blue-600 rounded-r-full" />)}
        <item.icon size={18} className={cn("transition-transform duration-200 group-hover:scale-110", location.pathname === item.path && "text-blue-600 dark:text-blue-400")} />
        {item.label}
       </Button>
      </Link>
     ))}
    </nav>
    <div className="mt-auto pt-4 space-y-3 border-t border-slate-100 dark:border-slate-800">
     <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="w-full justify-start gap-2 h-10 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <span className="font-medium text-sm">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
     </Button>
    </div>
   </aside>

   <header className="md:hidden flex items-center justify-between p-3 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-50">
    <div className="flex items-center gap-2">
     {!isHome && (<Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="mr-1"><ArrowLeft size={18} /></Button>)}
     <div className="flex items-center gap-1.5">
      <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white"><CheckSquare size={16} /></div>
      <span className="font-black tracking-tight text-lg">TaskFlow</span>
     </div>
    </div>
    <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="rounded-full">
     {isMobileMenuOpen ? <X /> : <Menu />}
    </Button>
   </header>

   <AnimatePresence>
    {isMobileMenuOpen && (
     <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="md:hidden fixed inset-0 top-[56px] bg-white dark:bg-slate-900 z-40 p-4 flex flex-col">
      <nav className="space-y-2">
       {navItems.map((item) => (
        <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
         <Button variant="ghost" className={cn("w-full justify-start gap-3 h-12 text-base rounded-xl font-medium", location.pathname === item.path ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-500 dark:text-slate-400")}>
          <item.icon size={20} />{item.label}
         </Button>
        </Link>
       ))}
      </nav>
      <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
       <Button variant="outline" className="w-full h-12 rounded-xl gap-2 font-medium border-slate-200 dark:border-slate-800" onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark'); setIsMobileMenuOpen(false); }}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />} Toggle Theme
       </Button>
      </div>
     </motion.div>
    )}
   </AnimatePresence>

   <main className="flex-1 p-3 md:p-6 lg:p-8 max-w-7xl mx-auto w-full overflow-x-hidden">
    <div className="mb-4 flex items-center gap-3">
     {!isHome && (
      <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="hidden md:block">
       <Button variant="ghost" onClick={() => navigate(-1)} className="rounded-lg gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-slate-100">
        <ArrowLeft size={16} /> Back
       </Button>
      </motion.div>
     )}
    </div>
    <motion.div key={location.pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2, ease: "easeOut" }}>
     {children}
    </motion.div>
   </main>
  </div>
 );
};

export default AppLayout;