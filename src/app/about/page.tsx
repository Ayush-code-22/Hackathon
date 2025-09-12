import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bot, Languages, ShieldCheck, HeartPulse } from "lucide-react";

const features = [
  {
    icon: <Bot className="h-8 w-8 text-primary" />,
    title: "AI-Driven Health Info",
    description: "Access information on preventive healthcare, disease symptoms, and vaccination schedules.",
  },
  {
    icon: <Languages className="h-8 w-8 text-primary" />,
    title: "Multilingual Support",
    description: "Interact with our chatbot in multiple languages for your convenience.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Symptom Checker",
    description: "Assess your symptoms with our AI tool and get preliminary health advice.",
  },
  {
    icon: <HeartPulse className="h-8 w-8 text-primary" />,
    title: "Emergency Information",
    description: "Quickly find critical contact numbers for emergency medical services.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">About MedLax</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your trusted AI health assistant for reliable information and support.
        </p>
      </div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Our Mission</h2>
        <p className="text-center text-muted-foreground mb-12">
          MedLax is dedicated to making healthcare information accessible and understandable for everyone. We leverage cutting-edge AI to provide a reliable resource for public health awareness, symptom checking, and finding local medical services. Our goal is to empower users to make informed decisions about their health and well-being.
        </p>
        <h2 className="text-2xl font-bold text-center mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center gap-4">
                {feature.icon}
                <CardTitle className="font-headline text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
