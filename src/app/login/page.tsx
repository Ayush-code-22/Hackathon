import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-background px-4">
      <Card className="w-full max-w-md shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-headline font-bold text-primary">Login or Sign Up</CardTitle>
          <CardDescription>Enter your mobile number to receive a one-time password (OTP).</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <div className="flex items-center gap-2">
              <span className="rounded-md border border-input bg-background px-3 py-2 text-muted-foreground">+91</span>
              <Input id="mobile" type="tel" placeholder="98765 43210" required className="flex-1" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="otp">One-Time Password (OTP)</Label>
            <Input id="otp" type="text" placeholder="Enter your 6-digit OTP" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Verify OTP & Login
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            By continuing, you agree to our{" "}
            <Link href="/terms" className="underline underline-offset-2 hover:text-primary">
              Terms of Service
            </Link>
            .
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
