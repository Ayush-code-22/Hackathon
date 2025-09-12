'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, LogIn, Menu, LayoutDashboard, Bell, Home, Bot, Hospital, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home', icon: <Home /> },
  { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard /> },
  { href: '/chatbot', label: 'Chatbot', icon: <Bot /> },
  { href: '/clinics', label: 'Find a Clinic', icon: <Hospital /> },
  { href: '/alerts', label: 'Alerts', icon: <Bell /> },
  { href: '/about', label: 'About', icon: <Info /> },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, icon }: { href: string; label: string, icon: React.ReactNode }) => (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-muted-foreground'
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span>MedLax</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === link.href ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
           <Button asChild>
             <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
               Login
             </Link>
           </Button>
        </div>
        
        {/* Mobile Navigation */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
             <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold mb-8">
              <HeartPulse className="h-6 w-6 text-primary" />
              <span>MedLax</span>
            </Link>
            <nav className="grid gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
               <Button asChild size="lg" className="mt-4">
                 <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                   Login / Sign Up
                 </Link>
               </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
