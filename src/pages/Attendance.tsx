import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle2, XCircle, LogIn, LogOut, Calendar } from "lucide-react";

interface AttendanceRecord {
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "present" | "absent" | "late" | "half_day";
  hoursWorked: number;
}

interface EmployeeAttendance {
  id: string;
  name: string;
  department: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "present" | "absent" | "late" | "not_checked_in";
}

const myAttendanceRecords: AttendanceRecord[] = [
  { date: "2026-01-03", checkIn: "09:02", checkOut: null, status: "present", hoursWorked: 0 },
  { date: "2026-01-02", checkIn: "08:58", checkOut: "18:05", status: "present", hoursWorked: 9.1 },
  { date: "2026-01-01", checkIn: null, checkOut: null, status: "absent", hoursWorked: 0 },
  { date: "2025-12-31", checkIn: "09:30", checkOut: "18:00", status: "late", hoursWorked: 8.5 },
  { date: "2025-12-30", checkIn: "08:55", checkOut: "17:55", status: "present", hoursWorked: 9 },
];

const allEmployeesAttendance: EmployeeAttendance[] = [
  { id: "EMP001", name: "Sarah Johnson", department: "HR", checkIn: "08:45", checkOut: null, status: "present" },
  { id: "EMP002", name: "John Smith", department: "Engineering", checkIn: "09:02", checkOut: null, status: "present" },
  { id: "EMP003", name: "Mike Brown", department: "Engineering", checkIn: "09:15", checkOut: null, status: "late" },
  { id: "EMP004", name: "Emily Davis", department: "Design", checkIn: null, checkOut: null, status: "absent" },
  { id: "EMP005", name: "Alex Wilson", department: "Marketing", checkIn: "08:50", checkOut: null, status: "present" },
  { id: "EMP006", name: "Lisa Chen", department: "Finance", checkIn: null, checkOut: null, status: "not_checked_in" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  present: { label: "Present", className: "bg-success/10 text-success border-success/20" },
  absent: { label: "Absent", className: "bg-destructive/10 text-destructive border-destructive/20" },
  late: { label: "Late", className: "bg-warning/10 text-warning border-warning/20" },
  half_day: { label: "Half Day", className: "bg-secondary text-secondary-foreground border-secondary" },
  not_checked_in: { label: "Not Checked In", className: "bg-muted text-muted-foreground border-muted" },
};

export default function Attendance() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";
  const [isCheckedIn, setIsCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState("09:02");

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

  const presentToday = allEmployeesAttendance.filter((e) => e.status === "present" || e.status === "late").length;
  const absentToday = allEmployeesAttendance.filter((e) => e.status === "absent").length;

  return (
    <DashboardLayout title="Attendance">
      <div className="space-y-6">
        {/* Stats / Check-in Card */}
        {!isAdmin ? (
          <Card className="border-border shadow-soft overflow-hidden">
            <div className="gradient-primary p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-display font-semibold text-primary-foreground">Today's Attendance</h3>
                  <p className="text-primary-foreground/80 text-sm">
                    {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </p>
                </div>
                <div className="flex gap-3">
                  {!isCheckedIn ? (
                    <Button onClick={handleCheckIn} variant="secondary" className="shadow-soft">
                      <LogIn className="mr-2 h-4 w-4" />
                      Check In
                    </Button>
                  ) : (
                    <Button onClick={handleCheckOut} variant="secondary" className="shadow-soft">
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
                  <p className="text-2xl font-display font-bold text-foreground">{isCheckedIn ? checkInTime : "--:--"}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Check Out</p>
                  <p className="text-2xl font-display font-bold text-foreground">{!isCheckedIn ? "18:05" : "--:--"}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-secondary/50">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={isCheckedIn ? statusConfig.present.className : statusConfig.absent.className}>
                    {isCheckedIn ? "Present" : "Checked Out"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Present Today</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-success">{presentToday}</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Absent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-destructive">{absentToday}</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Late Arrivals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-warning">
                  {allEmployeesAttendance.filter((e) => e.status === "late").length}
                </p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-foreground">
                  {Math.round((presentToday / allEmployeesAttendance.length) * 100)}%
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Attendance Records */}
        <Card className="border-border shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display">
              <Clock className="h-5 w-5" />
              {isAdmin ? "Today's Attendance" : "My Attendance History"}
            </CardTitle>
            <CardDescription>
              {isAdmin ? "View and manage employee attendance" : "Your attendance records for the current month"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <Tabs defaultValue="today">
                <TabsList>
                  <TabsTrigger value="today">Today</TabsTrigger>
                  <TabsTrigger value="weekly">This Week</TabsTrigger>
                </TabsList>
                <TabsContent value="today" className="mt-4">
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/50">
                          <TableHead>Employee</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Check In</TableHead>
                          <TableHead>Check Out</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {allEmployeesAttendance.map((record) => (
                          <TableRow key={record.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{record.name}</p>
                                <p className="text-sm text-muted-foreground">{record.id}</p>
                              </div>
                            </TableCell>
                            <TableCell>{record.department}</TableCell>
                            <TableCell>
                              {record.checkIn ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                  {record.checkIn}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <XCircle className="h-4 w-4" />
                                  --:--
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              {record.checkOut ? (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="h-4 w-4 text-success" />
                                  {record.checkOut}
                                </div>
                              ) : (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <XCircle className="h-4 w-4" />
                                  --:--
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={statusConfig[record.status].className}>
                                {statusConfig[record.status].label}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="weekly" className="mt-4">
                  <div className="text-center py-8 text-muted-foreground">
                    Weekly attendance summary will be available here
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead>Date</TableHead>
                      <TableHead>Check In</TableHead>
                      <TableHead>Check Out</TableHead>
                      <TableHead>Hours Worked</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myAttendanceRecords.map((record) => (
                      <TableRow key={record.date}>
                        <TableCell className="font-medium">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </TableCell>
                        <TableCell>
                          {record.checkIn ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              {record.checkIn}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <XCircle className="h-4 w-4" />
                              --:--
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          {record.checkOut ? (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-success" />
                              {record.checkOut}
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <XCircle className="h-4 w-4" />
                              --:--
                            </div>
                          )}
                        </TableCell>
                        <TableCell>{record.hoursWorked > 0 ? `${record.hoursWorked}h` : "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusConfig[record.status].className}>
                            {statusConfig[record.status].label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
