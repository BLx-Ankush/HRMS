import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, LogIn, LogOut, ChevronLeft, ChevronRight, Search } from "lucide-react";

interface EmployeeAttendance {
  id: string;
  name: string;
  checkIn: string | null;
  checkOut: string | null;
  workHours: string | null;
  extraHours: string | null;
}

const mockAttendance: EmployeeAttendance[] = [
  { id: "EMP001", name: "Sarah Johnson", checkIn: null, checkOut: null, workHours: null, extraHours: null },
  { id: "EMP002", name: "John Smith", checkIn: null, checkOut: null, workHours: null, extraHours: null },
  { id: "EMP003", name: "Mike Brown", checkIn: null, checkOut: null, workHours: null, extraHours: null },
  { id: "EMP004", name: "Emily Davis", checkIn: null, checkOut: null, workHours: null, extraHours: null },
  { id: "EMP005", name: "Alex Wilson", checkIn: null, checkOut: null, workHours: null, extraHours: null },
  { id: "EMP006", name: "Lisa Chen", checkIn: null, checkOut: null, workHours: null, extraHours: null },
];

export default function Attendance() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState("day");
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleCheckIn = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    setCheckInTime(time);
    setIsCheckedIn(true);
    toast({
      title: "Checked In",
      description: `You checked in at ${time}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });
    setIsCheckedIn(false);
    toast({
      title: "Checked Out",
      description: `You checked out at ${time}`,
    });
  };

  const filteredAttendance = mockAttendance.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

  const goToPreviousDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 1);
    setCurrentDate(newDate);
  };

  const goToNextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 1);
    setCurrentDate(newDate);
  };

  // Employee view
  if (!isAdmin) {
    return (
      <DashboardLayout title="Attendance">
        <div className="space-y-6">
          <Card className="border-border shadow-sm overflow-hidden">
            <div className="bg-primary p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-display font-semibold text-primary-foreground">Today's Attendance</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div className="flex gap-3">
                  {!isCheckedIn ? (
                    <Button onClick={handleCheckIn} variant="secondary">
                      <LogIn className="mr-2 h-4 w-4" />
                      Check In
                    </Button>
                  ) : (
                    <Button onClick={handleCheckOut} variant="secondary">
                      <LogOut className="mr-2 h-4 w-4" />
                      Check Out
                    </Button>
                  )}
                </div>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Check In</p>
                  <p className="text-2xl font-display font-bold text-foreground">{checkInTime || "--:--"}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Check Out</p>
                  <p className="text-2xl font-display font-bold text-foreground">--:--</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={isCheckedIn ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"}>
                    {isCheckedIn ? "Present" : "Not Checked In"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

  // Admin view
  return (
    <DashboardLayout title="Attendance">
      <div className="space-y-6">
        <Card className="border-border shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-display">Attendance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search employees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-sm"
              />
            </div>

            {/* Date Navigation */}
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPreviousDay}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNextDay}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Select value="today">
                <SelectTrigger className="w-[140px] h-8 text-sm">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="yesterday">Yesterday</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex rounded-lg border border-border overflow-hidden">
                <Button
                  variant={viewType === "day" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none h-8 px-3 text-xs"
                  onClick={() => setViewType("day")}
                >
                  Day
                </Button>
                <Button
                  variant={viewType === "week" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-none h-8 px-3 text-xs border-l"
                  onClick={() => setViewType("week")}
                >
                  Week
                </Button>
              </div>
            </div>

            {/* Current Date Display */}
            <p className="text-sm font-medium text-foreground">{formatDate(currentDate)}</p>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30">
                    <TableHead className="text-xs font-medium">Emp</TableHead>
                    <TableHead className="text-xs font-medium">Check In</TableHead>
                    <TableHead className="text-xs font-medium">Check Out</TableHead>
                    <TableHead className="text-xs font-medium">Work Hours</TableHead>
                    <TableHead className="text-xs font-medium">Extra Hours</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="text-sm font-medium">{record.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.checkIn || "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.checkOut || "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.workHours || "-"}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {record.extraHours || "-"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
