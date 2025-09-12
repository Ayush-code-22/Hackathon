
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Hospital, AlertTriangle } from "lucide-react";

type HealthCenterData = {
  state_uts: string;
  no_of_chcs_functional_against_norm: string;
  no_of_phcs_functional_against_norm: string;
};

async function getHealthCenterData(): Promise<HealthCenterData[]> {
  const apiKey = "579b464db66ec23bdd000001cdd3946e44ce4aad7209ff7b23ac571b";
  const url = "https://api.data.gov.in/resource/b51adc87-c097-464e-8758-e81560b8e03c?api-key=" + apiKey + "&format=json&limit=50";

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 } // Revalidate data every hour
    });

    if (!response.ok) {
      console.error("API request failed with status:", response.status);
      return [];
    }

    const data = await response.json();
    return data.records;
  } catch (error) {
    console.error("Failed to fetch health center data:", error);
    return [];
  }
}

export default async function HealthCentersPage() {
  const healthCenterData = await getHealthCenterData();

  const sortedData = healthCenterData.sort((a, b) => a.state_uts.localeCompare(b.state_uts));

  const formatCenterData = (data: string) => {
    if (!data || !data.includes('/')) return data || 'N/A';
    return data.split('/')[0];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-headline font-bold text-primary">Health Centers in India</h1>
        <p className="mt-2 text-lg text-muted-foreground">State/UT-wise count of functional Primary and Community Health Centers.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hospital className="h-6 w-6 text-primary" />
            PHC & CHC Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          {sortedData.length > 0 ? (
            <div className="overflow-x-auto">
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead className="font-bold">State/UT</TableHead>
                    <TableHead className="text-right font-bold">Primary Health Centers (PHCs)</TableHead>
                    <TableHead className="text-right font-bold">Community Health Centers (CHCs)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedData.map((record) => (
                    <TableRow key={record.state_uts}>
                        <TableCell className="font-medium">{record.state_uts}</TableCell>
                        <TableCell className="text-right">{formatCenterData(record.no_of_phcs_functional_against_norm)}</TableCell>
                        <TableCell className="text-right">{formatCenterData(record.no_of_chcs_functional_against_norm)}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </div>
          ) : (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                Could not load the health center data. The API might be temporarily unavailable. Please try again later.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
