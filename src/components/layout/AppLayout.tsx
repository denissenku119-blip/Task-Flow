// Fix the syntax error in the navigation menu
<nav className="space-y-2"> // Changed from {nav to <nav
 {navItems.map((item) => (
  <Link key={item.path} to={item.path} onClick={() => setIsMobileMenuOpen(false)}>
   <Button variant="ghost" className={cn("w-full justify-start gap-3 h-12 text-base rounded-xl font-medium", location.pathname === item.path ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400" : "text-slate-500 dark:text-slate-400")}>
    <item.icon size={20} />{item.label}
   </Button>
  </Link>
 ))}
</nav> // Added closing </nav>
</div>
</aside>
</div>
</div>
</AppLayout>