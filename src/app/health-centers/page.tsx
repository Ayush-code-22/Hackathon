
import { Construction } from "lucide-react";

export default function HealthCentersPage() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[calc(100vh-12rem)]">
      <div className="text-center">
        <Construction className="h-24 w-24 text-primary mx-auto mb-6 animate-pulse" />
        <h1 className="text-4xl font-headline font-bold text-primary">Coming Soon!</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          We are working hard to bring you detailed data on health centers.
        </p>
        <p className="mt-2 text-muted-foreground">Please check back later.</p>
      </div>
    </div>
  );
}
