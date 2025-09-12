
'use client';

import { useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Hospital, MapPin, Stethoscope, LocateFixed, Loader2, AlertTriangle, Route } from "lucide-react";
import type { Clinic } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { findNearbyClinics } from "@/lib/actions";
import 'leaflet/dist/leaflet.css';


export default function ClinicsPage() {
  const { toast } = useToast();
  const [locating, setLocating] = useState(false);
  const [fetchingClinics, setFetchingClinics] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number, longitude: number } | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Default to India
  const [mapZoom, setMapZoom] = useState(4);

  const Map = useMemo(() => dynamic(() => import('@/components/map'), { 
    loading: () => <div className="h-full w-full flex items-center justify-center bg-muted"><p className="text-muted-foreground">Loading Map...</p></div>,
    ssr: false 
  }), []);

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
      async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setMapCenter([latitude, longitude]);
        setMapZoom(13);
        setLocating(false);
        setFetchingClinics(true);

        try {
          const result = await findNearbyClinics({ latitude, longitude });

          if (result.success && result.data) {
            setClinics(result.data);
            if (result.data.length > 0) {
              toast({
                title: "Clinics Found!",
                description: "Showing nearby medical facilities.",
              });
            } else {
              toast({
                title: "No Clinics Found",
                description: "No clinics were found within a 5km radius.",
              });
            }
          } else {
            setError(result.error || "Could not fetch clinics.");
          }
        } catch (err) {
          setError("An unexpected error occurred while fetching clinics.");
        } finally {
          setFetchingClinics(false);
        }
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

  const isLoading = locating || fetchingClinics;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Find a Clinic or Hospital</h1>
        <p className="mt-2 text-lg text-muted-foreground">Find real medical facilities near you.</p>
        <Button onClick={handleFindNearby} disabled={isLoading} className="mt-4">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LocateFixed className="mr-2 h-4 w-4" />
          )}
          {locating && "Locating..."}
          {fetchingClinics && "Finding Clinics..."}
          {!isLoading && "Find Clinics Near Me"}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive" className="max-w-xl mx-auto mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6 max-h-[600px] overflow-y-auto">
         {clinics.length === 0 && !isLoading && !error && (
            <div className="text-center text-muted-foreground pt-10">
              <p>Click the button to find clinics near your location.</p>
            </div>
          )}
          {clinics.map((clinic) => (
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
              <CardContent className="flex-grow space-y-2">
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
        <div className="lg:col-span-2">
           <div className="w-full h-[600px] rounded-lg bg-muted flex items-center justify-center overflow-hidden shadow-2xl">
              <Map
                  mapCenter={mapCenter}
                  mapZoom={mapZoom}
                  userLocation={userLocation}
                  clinics={clinics}
                />
           </div>
        </div>
      </div>
    </div>
  );
}
