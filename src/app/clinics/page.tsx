import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Stethoscope } from "lucide-react";
import { nearbyClinics } from "@/lib/data";

export default function ClinicsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Find a Clinic or Hospital</h1>
        <p className="mt-2 text-lg text-muted-foreground">Nearby medical facilities for your convenience.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {nearbyClinics.map((clinic) => (
          <Card key={clinic.id} className="flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex-row items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-full">
                {clinic.type === 'Hospital' ? 
                  <Hospital className="h-8 w-8 text-primary" /> : 
                  <Stethoscope className="h-8 w-8 text-primary" />
                }
              </div>
              <div>
                <CardTitle className="font-headline text-xl">{clinic.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{clinic.type}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 mt-1 shrink-0" />
                <p>{clinic.address}</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get Directions
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
