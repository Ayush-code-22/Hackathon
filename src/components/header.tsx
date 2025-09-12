'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Phone, Menu, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/chatbot', label: 'Chatbot' },
  { href: '/clinics', label: 'Find a Clinic' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      className={cn(
        'text-sm font-medium transition-colors hover:text-primary',
        pathname === href ? 'text-primary' : 'text-muted-foreground'
      )}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold">
          <HeartPulse className="h-6 w-6 text-primary" />
          <span>MediMate</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
           <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
             <a href="/chatbot">
              <MessageSquare className="mr-2 h-4 w-4" />
               Get Assistance
             </a>
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
              <span>MediMate</span>
            </Link>
            <nav className="grid gap-6 text-lg font-medium">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
               <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                 <a href="/chatbot">
                  <MessageSquare className="mr-2 h-4 w-4" />
                   Get Assistance
                 </a>
               </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
