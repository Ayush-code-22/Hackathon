import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle } from "lucide-react";
import { healthAlerts } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function AlertsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Health Alerts</h1>
        <p className="mt-2 text-lg text-muted-foreground">Stay informed about important health updates in your area.</p>
      </div>
      <div className="max-w-3xl mx-auto space-y-6">
        {healthAlerts.map((alert) => (
          <Card key={alert.id} className={cn("shadow-lg", { "border-destructive/50 bg-destructive/5": alert.type === "High Priority" })}>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className={cn("p-3 rounded-full", alert.type === "High Priority" ? "bg-destructive/10" : "bg-primary/10")}>
                {alert.type === 'High Priority' ? (
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                ) : (
                  <Bell className="h-6 w-6 text-primary" />
                )}
              </div>
              <div>
                <CardTitle className="font-headline text-xl">{alert.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{new Date(alert.date).toLocaleDateString()}</p>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{alert.message}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
