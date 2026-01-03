import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Check } from "lucide-react";

interface TimeOffRequest {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  type: string;
  status: "approved" | "pending" | "rejected";
}

const mockTimeOffRequests: TimeOffRequest[] = [
  {
    id: "1",
    name: "John Smith",
    startDate: "28/10/2025",
    endDate: "28/10/2025",
    type: "Paid Time Off",
    status: "approved",
  },
  {
    id: "2",
    name: "Emily Davis",
    startDate: "05/11/2025",
    endDate: "07/11/2025",
    type: "Sick Leave",
    status: "approved",
  },
  {
    id: "3",
    name: "Mike Brown",
    startDate: "12/11/2025",
    endDate: "15/11/2025",
    type: "Unpaid Leave",
    status: "approved",
  },
];

const typeColors: Record<string, string> = {
  "Paid Time Off": "text-success",
  "Sick Leave": "text-destructive",
  "Unpaid Leave": "text-muted-foreground",
};

export default function TimeOff() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [searchQuery, setSearchQuery] = useState("");

  const filteredRequests = mockTimeOffRequests.filter(
    (req) => req.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isAdmin) {
    return (
      <DashboardLayout title="Time Off">
        <Card className="border-border shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Employee time off view coming soon.</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Time Off">
      <div className="space-y-6">
        <Card className="border-border shadow-sm">
          <CardContent className="pt-6 space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employee..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm max-w-md"
              />
            </div>

            {/* Section Title */}
            <div>
              <h3 className="text-base font-display font-semibold text-foreground">
                Employee Time Off Requests
              </h3>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30">
                    <TableHead className="text-xs font-medium">Name</TableHead>
                    <TableHead className="text-xs font-medium">Start Date</TableHead>
                    <TableHead className="text-xs font-medium">End Date</TableHead>
                    <TableHead className="text-xs font-medium">Time off Type</TableHead>
                    <TableHead className="text-xs font-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRequests.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground text-sm">
                        No time off requests found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="text-sm font-medium">{request.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{request.startDate}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{request.endDate}</TableCell>
                        <TableCell className={`text-sm ${typeColors[request.type] || ""}`}>
                          {request.type}
                        </TableCell>
                        <TableCell>
                          <Check className="h-4 w-4 text-muted-foreground" />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
