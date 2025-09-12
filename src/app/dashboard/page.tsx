
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Bell, MapPin, BarChart2, Hospital } from "lucide-react";
import Link from "next/link";

const dashboardCards = [
  {
    title: "Recent Chats",
    icon: <MessageSquare className="h-8 w-8 text-primary" />,
    description: "Review your past conversations and symptom checks.",
    href: "/chatbot",
    cta: "View History"
  },
  {
    title: "Health Alerts",
    icon: <Bell className="h-8 w-8 text-primary" />,
    description: "Stay updated on health advisories and local alerts.",
    href: "/alerts",
    cta: "Check Alerts"
  },
  {
    title: "Nearby Clinics",
    icon: <MapPin className="h-8 w-8 text-primary" />,
    description: "Find medical facilities and clinics near your location.",
    href: "/clinics",
    cta: "Find Clinics"
  },
  {
    title: "Health Centers Data",
    icon: <Hospital className="h-8 w-8 text-primary" />,
    description: "View data on health centers across different states.",
    href: "/health-centers",
    cta: "View Data"
  },
  {
    title: "Usage Analytics",
    icon: <BarChart2 className="h-8 w-8 text-primary" />,
    description: "See your interaction history and usage statistics.",
    href: "/analytics",
    cta: "View Stats"
  }
]

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Welcome to your Dashboard</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your personal health hub.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {dashboardCards.map(card => (
          <Card key={card.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
            <CardHeader className="flex flex-row items-center gap-4">
              {card.icon}
              <CardTitle className="font-headline text-xl">{card.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-muted-foreground">{card.description}</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href={card.href}>{card.cta}</Link>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
