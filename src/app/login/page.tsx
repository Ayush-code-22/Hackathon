'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { auth } from '@/lib/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (email.trim() === "" || password.trim() === "") {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both email and password.",
      });
      setLoading(false);
      return;
    }

    try {
      if (isSignUp) {
        // Sign up a new user
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Account Created",
          description: "You have successfully signed up! Please log in.",
        });
        setIsSignUp(false); // Switch to login view after successful sign up
      } else {
        // Log in an existing user
        await signInWithEmailAndPassword(auth, email, password);
        toast({
          title: "Login Successful",
          description: "Welcome back!",
        });
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleSubmit}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline font-bold text-primary">{isSignUp ? 'Create an Account' : 'Login'}</CardTitle>
            <CardDescription>Enter your email and password to {isSignUp ? 'get started' : 'access your account'}.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="name@example.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Enter your password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={loading}>
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Login')}
            </Button>
            <Button variant="link" type="button" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our{" "}
              <Link href="/terms" className="underline underline-offset-2 hover:text-primary">
                Terms of Service
              </Link>
              .
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
