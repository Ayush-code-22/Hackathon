
'use client';

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Stethoscope, LocateFixed, Loader2, AlertTriangle, Route } from "lucide-react";
import type { Clinic } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { nearbyClinics } from "@/lib/data"; // Import dummy data

export default function ClinicsPage() {
  const { toast } = useToast();
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in km
  };

  const handleFindNearby = () => {
    setLocating(true);
    setError(null);
    setClinics([]);
    setUserLocation(null);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        
        const clinicsWithDistance = nearbyClinics.map(clinic => ({
            ...clinic,
            distance: getDistance(latitude, longitude, clinic.lat, clinic.lon)
        }));

        clinicsWithDistance.sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));

        setClinics(clinicsWithDistance);
        setLocating(false);
        toast({
            title: "Clinics Found!",
            description: "Showing nearby medical facilities from our list.",
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
        <p className="mt-2 text-lg text-muted-foreground">Find medical facilities near you from our curated list.</p>
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
      
      <div className="max-w-4xl mx-auto space-y-6">
         {clinics.length === 0 && !locating && !error && (
            <div className="text-center text-muted-foreground pt-10">
              <p>Click the button to find clinics near your location.</p>
            </div>
          )}
          {clinics.map((clinic) => (
            <Card key={clinic.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
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
              <CardContent className="space-y-2">
                <div className="flex items-start gap-2 text-muted-foreground">
                  <MapPin className="h-5 w-5 mt-1 shrink-0" />
                  <p>{clinic.address}</p>
                </div>
                {clinic.distance && (
                  <div className="flex items-center gap-2 text-sm text-primary font-medium pt-2">
                    <Route className="h-4 w-4" />
                    <p>{clinic.distance.toFixed(2)} km away</p>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.name)}&query_place_id=${clinic.id}`}
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
