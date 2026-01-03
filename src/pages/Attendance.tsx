import { useState, useMemo } from "react";
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

interface AttendanceRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string; // YYYY-MM-DD format
  checkIn: string | null;
  checkOut: string | null;
  workHours: string | null;
  extraHours: string | null;
  status: "present" | "absent" | "late" | "half-day";
}

// Helper to generate date string
const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// Helper to calculate work hours
const calculateWorkHours = (checkIn: string, checkOut: string): string => {
  const [inHours, inMins] = checkIn.split(':').map(Number);
  const [outHours, outMins] = checkOut.split(':').map(Number);
  const totalMins = (outHours * 60 + outMins) - (inHours * 60 + inMins);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  return `${hours}h ${mins}m`;
};

// Helper to calculate extra hours (over 8 hours)
const calculateExtraHours = (checkIn: string, checkOut: string): string | null => {
  const [inHours, inMins] = checkIn.split(':').map(Number);
  const [outHours, outMins] = checkOut.split(':').map(Number);
  const totalMins = (outHours * 60 + outMins) - (inHours * 60 + inMins);
  const extraMins = totalMins - (8 * 60); // 8 hours is standard
  if (extraMins <= 0) return null;
  const hours = Math.floor(extraMins / 60);
  const mins = extraMins % 60;
  return `+${hours}h ${mins}m`;
};

// Generate mock attendance data for multiple days
const generateMockAttendanceData = (): Record<string, AttendanceRecord[]> => {
  const employees = [
    { id: "EMP001", name: "Sarah Johnson" },
    { id: "EMP002", name: "John Smith" },
    { id: "EMP003", name: "Mike Brown" },
    { id: "EMP004", name: "Emily Davis" },
    { id: "EMP005", name: "Alex Wilson" },
    { id: "EMP006", name: "Lisa Chen" },
  ];

  const data: Record<string, AttendanceRecord[]> = {};
  const today = new Date();

  // Generate data for the past 30 days
  for (let i = 30; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateKey = formatDateKey(date);
    
    // Skip weekends
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      data[dateKey] = employees.map(emp => ({
        id: `${emp.id}-${dateKey}`,
        employeeId: emp.id,
        employeeName: emp.name,
        date: dateKey,
        checkIn: null,
        checkOut: null,
        workHours: null,
        extraHours: null,
        status: "absent" as const,
      }));
      continue;
    }

    data[dateKey] = employees.map(emp => {
      // Random attendance simulation
      const isPresent = Math.random() > 0.1; // 90% attendance rate
      const isLate = Math.random() > 0.7; // 30% late if present
      
      if (!isPresent) {
        return {
          id: `${emp.id}-${dateKey}`,
          employeeId: emp.id,
          employeeName: emp.name,
          date: dateKey,
          checkIn: null,
          checkOut: null,
          workHours: null,
          extraHours: null,
          status: "absent" as const,
        };
      }

      const checkInHour = isLate ? 9 + Math.floor(Math.random() * 2) : 8 + Math.floor(Math.random() * 1);
      const checkInMin = Math.floor(Math.random() * 60);
      const checkOutHour = 17 + Math.floor(Math.random() * 3);
      const checkOutMin = Math.floor(Math.random() * 60);
      
      const checkIn = `${checkInHour.toString().padStart(2, '0')}:${checkInMin.toString().padStart(2, '0')}`;
      const checkOut = `${checkOutHour.toString().padStart(2, '0')}:${checkOutMin.toString().padStart(2, '0')}`;
      
      return {
        id: `${emp.id}-${dateKey}`,
        employeeId: emp.id,
        employeeName: emp.name,
        date: dateKey,
        checkIn,
        checkOut,
        workHours: calculateWorkHours(checkIn, checkOut),
        extraHours: calculateExtraHours(checkIn, checkOut),
        status: isLate ? "late" as const : "present" as const,
      };
    });
  }

  return data;
};

// Initialize mock data
const mockAttendanceData = generateMockAttendanceData();

export default function Attendance() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewType, setViewType] = useState<"day" | "week">("day");
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
    setCheckOutTime(time);
    setIsCheckedIn(false);
    toast({
      title: "Checked Out",
      description: `You checked out at ${time}`,
    });
  };

  // Get attendance data for selected date(s)
  const attendanceData = useMemo(() => {
    const dateKey = formatDateKey(currentDate);
    
    if (viewType === "day") {
      return mockAttendanceData[dateKey] || [];
    } else {
      // Week view - get data for the whole week
      const weekStart = new Date(currentDate);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1); // Monday
      
      const weekData: AttendanceRecord[] = [];
      for (let i = 0; i < 7; i++) {
        const day = new Date(weekStart);
        day.setDate(day.getDate() + i);
        const dayKey = formatDateKey(day);
        const dayData = mockAttendanceData[dayKey] || [];
        weekData.push(...dayData);
      }
      return weekData;
    }
  }, [currentDate, viewType]);

  const filteredAttendance = attendanceData.filter(
    (record) =>
      record.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", { 
      day: "numeric", 
      month: "long", 
      year: "numeric" 
    });
  };

  const formatWeekRange = (date: Date) => {
    const weekStart = new Date(date);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay() + 1);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    
    return `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
  };

  const goToPrevious = () => {
    const newDate = new Date(currentDate);
    if (viewType === "day") {
      newDate.setDate(newDate.getDate() - 1);
    } else {
      newDate.setDate(newDate.getDate() - 7);
    }
    setCurrentDate(newDate);
  };

  const goToNext = () => {
    const newDate = new Date(currentDate);
    if (viewType === "day") {
      newDate.setDate(newDate.getDate() + 1);
    } else {
      newDate.setDate(newDate.getDate() + 7);
    }
    setCurrentDate(newDate);
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const getStatusBadge = (status: AttendanceRecord["status"]) => {
    switch (status) {
      case "present":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-[10px]">Present</Badge>;
      case "late":
        return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 text-[10px]">Late</Badge>;
      case "absent":
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 text-[10px]">Absent</Badge>;
      case "half-day":
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-[10px]">Half Day</Badge>;
      default:
        return null;
    }
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
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Check In</p>
                  <p className="text-2xl font-display font-bold text-foreground">{checkInTime || "--:--"}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Check Out</p>
                  <p className="text-2xl font-display font-bold text-foreground">{checkOutTime || "--:--"}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Work Hours</p>
                  <p className="text-2xl font-display font-bold text-foreground">
                    {checkInTime && checkOutTime ? calculateWorkHours(checkInTime, checkOutTime) : "--"}
                  </p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={isCheckedIn ? "bg-success/10 text-success" : checkOutTime ? "bg-blue-500/10 text-blue-600" : "bg-muted text-muted-foreground"}>
                    {isCheckedIn ? "Present" : checkOutTime ? "Completed" : "Not Checked In"}
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
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToPrevious}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={goToNext}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="h-8 text-xs" onClick={goToToday}>
                  Today
                </Button>
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
              
              {/* Attendance Summary */}
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">
                    Present: {filteredAttendance.filter(r => r.status === "present").length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-muted-foreground">
                    Late: {filteredAttendance.filter(r => r.status === "late").length}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span className="text-muted-foreground">
                    Absent: {filteredAttendance.filter(r => r.status === "absent").length}
                  </span>
                </div>
              </div>
            </div>

            {/* Current Date Display */}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                {viewType === "day" ? formatDate(currentDate) : formatWeekRange(currentDate)}
              </p>
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/30">
                    <TableHead className="text-xs font-medium">Employee</TableHead>
                    {viewType === "week" && <TableHead className="text-xs font-medium">Date</TableHead>}
                    <TableHead className="text-xs font-medium">Check In</TableHead>
                    <TableHead className="text-xs font-medium">Check Out</TableHead>
                    <TableHead className="text-xs font-medium">Work Hours</TableHead>
                    <TableHead className="text-xs font-medium">Extra Hours</TableHead>
                    <TableHead className="text-xs font-medium">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAttendance.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={viewType === "week" ? 7 : 6} className="text-center py-8 text-muted-foreground">
                        No attendance records found for this {viewType === "day" ? "date" : "week"}.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAttendance.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell className="text-sm font-medium">{record.employeeName}</TableCell>
                        {viewType === "week" && (
                          <TableCell className="text-xs text-muted-foreground">
                            {new Date(record.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                          </TableCell>
                        )}
                        <TableCell className="text-sm">
                          {record.checkIn ? (
                            <span className="font-mono text-foreground">{record.checkIn}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {record.checkOut ? (
                            <span className="font-mono text-foreground">{record.checkOut}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {record.workHours ? (
                            <span className="text-foreground">{record.workHours}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {record.extraHours ? (
                            <span className="text-green-600 font-medium">{record.extraHours}</span>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(record.status)}</TableCell>
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
