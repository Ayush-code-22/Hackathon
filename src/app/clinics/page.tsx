'use client';

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Stethoscope, LocateFixed, Loader2, AlertTriangle } from "lucide-react";
import { nearbyClinics } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Location = {
  latitude: number;
  longitude: number;
};

export default function ClinicsPage() {
  const { toast } = useToast();
  const [locating, setLocating] = useState(false);
  const [location, setLocation] = useState<Location | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFindNearby = () => {
    setLocating(true);
    setLocation(null);
    setError(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setLocating(false);
        toast({
          title: "Location Found!",
          description: "In a real app, we would now search for clinics near you.",
        });
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("You denied the request for Geolocation. Please enable it in your browser settings to find nearby clinics.");
            break;
          case err.POSITION_UNAVAILABLE:
            setError("Location information is unavailable.");
            break;
          case err.TIMEOUT:
            setError("The request to get user location timed out.");
            break;
          default:
            setError("An unknown error occurred.");
            break;
        }
        setLocating(false);
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Find a Clinic or Hospital</h1>
        <p className="mt-2 text-lg text-muted-foreground">Nearby medical facilities for your convenience.</p>
        <Button onClick={handleFindNearby} disabled={locating} className="mt-4">
          {locating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LocateFixed className="mr-2 h-4 w-4" />
          )}
          {locating ? "Locating..." : "Find Clinics Near Me"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="max-w-xl mx-auto mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {location && (
        <div className="text-center mb-8 p-4 bg-primary/10 rounded-md max-w-xl mx-auto">
          <p className="font-semibold">Your Location:</p>
          <p className="text-sm text-muted-foreground">
            Latitude: {location.latitude.toFixed(4)}, Longitude: {location.longitude.toFixed(4)}
          </p>
        </div>
      )}

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
