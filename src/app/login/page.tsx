'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both email and password.",
      });
      return;
    }
    // In a real application, you would verify the email and password here.
    // For this prototype, we'll just redirect to the dashboard.
    router.push("/dashboard");
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <form onSubmit={handleLogin}>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-headline font-bold text-primary">Login or Sign Up</CardTitle>
            <CardDescription>Enter your email and password to access your account.</CardDescription>
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
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              Login
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
