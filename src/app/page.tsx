import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Bot, Languages, ShieldCheck, MapPin } from 'lucide-react';

const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "AI Symptom Checker",
    description: "Describe your symptoms and get instant, AI-powered analysis and recommendations.",
    href: "/chatbot"
  },
  {
    icon: <Languages className="h-10 w-10 text-primary" />,
    title: "Multilingual Support",
    description: "Interact with our chatbot in multiple languages for your convenience.",
    href: "/chatbot"
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Health Alerts",
    description: "Stay informed about important public health alerts and advisories in your area.",
    href: "/alerts"
  },
  {
    icon: <MapPin className="h-10 w-10 text-primary" />,
    title: "Find Clinics",
    description: "Quickly locate nearby hospitals and clinics based on your current location.",
    href: "/clinics"
  },
];


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-white">
        <Image
          src="https://picsum.photos/seed/doctor/1200/800"
          alt="A doctor in a hospital setting"
          fill
          style={{ objectFit: 'cover' }}
          className="absolute inset-0 z-0"
          priority
          data-ai-hint="doctor hospital"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
              AI-Powered Health Awareness
            </h1>
            <p className="text-lg md:text-xl text-white/90">
              Get instant, reliable health information and symptom analysis. Your personal health assistant is here to help, anytime.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/chatbot">Try the Chatbot</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Key Features</h2>
              <p className="mt-2 text-lg text-muted-foreground">Everything you need for better health awareness.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                  <Card key={feature.title} className="text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-transform duration-300">
                      <CardHeader className="items-center">
                          <div className="p-4 bg-primary/10 rounded-full mb-4">
                              {feature.icon}
                          </div>
                          <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                  </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
