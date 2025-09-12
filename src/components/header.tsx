'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { HeartPulse, LogIn, Menu, LayoutDashboard, Bell, Home, Bot, Hospital, Info, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useAuth } from '@/components/firebase-auth-provider';
import { signOut } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";


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
  const router = useRouter();
  const { toast } = useToast();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth, user, loading } = useAuth();


  const handleLogout = async () => {
    try {
      if (auth) {
        await signOut(auth);
        toast({
          title: "Logged Out",
          description: "You have been successfully logged out.",
        });
        router.push('/login');
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "An error occurred while logging out. Please try again.",
      });
    }
  };


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
           {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">My Account</p>
                      {user.email &&
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      }
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
             <Button asChild>
               <Link href="/login">
                <LogIn className="mr-2 h-4 w-4" />
                 Login
               </Link>
             </Button>
            )
           )}
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
             <Link href="/" className="flex items-center gap-2 font-headline text-lg font-semibold mb-8" onClick={() => setIsMobileMenuOpen(false)}>
              <HeartPulse className="h-6 w-6 text-primary" />
              <span>MedLax</span>
            </Link>
            <nav className="grid gap-4 text-base font-medium">
              {navLinks.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
              {!loading && (
                user ? (
                  <Button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} size="lg" className="mt-4">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                ) : (
                  <Button asChild size="lg" className="mt-4">
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                     <LogIn className="mr-2 h-4 w-4" />
                      Login / Sign Up
                    </Link>
                  </Button>
                )
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
