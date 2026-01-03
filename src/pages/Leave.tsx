import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Plus, Check, X, Clock } from "lucide-react";

interface LeaveRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  type: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  appliedOn: string;
}

const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "1",
    employeeId: "EMP002",
    employeeName: "John Smith",
    type: "Paid Leave",
    startDate: "2026-01-10",
    endDate: "2026-01-12",
    days: 3,
    reason: "Family vacation",
    status: "pending",
    appliedOn: "2026-01-03",
  },
  {
    id: "2",
    employeeId: "EMP003",
    employeeName: "Mike Brown",
    type: "Sick Leave",
    startDate: "2026-01-05",
    endDate: "2026-01-05",
    days: 1,
    reason: "Doctor appointment",
    status: "pending",
    appliedOn: "2026-01-02",
  },
  {
    id: "3",
    employeeId: "EMP004",
    employeeName: "Emily Davis",
    type: "Unpaid Leave",
    startDate: "2025-12-20",
    endDate: "2025-12-24",
    days: 5,
    reason: "Personal matters",
    status: "approved",
    appliedOn: "2025-12-15",
  },
  {
    id: "4",
    employeeId: "EMP002",
    employeeName: "John Smith",
    type: "Sick Leave",
    startDate: "2025-12-01",
    endDate: "2025-12-01",
    days: 1,
    reason: "Not feeling well",
    status: "approved",
    appliedOn: "2025-12-01",
  },
];

const leaveBalance = {
  paid: 12,
  sick: 5,
  unpaid: "Unlimited",
};

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  approved: { label: "Approved", className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "Rejected", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function Leave() {
  const { user } = useAuth();
  const { toast } = useToast();
  const isAdmin = user?.role === "admin";
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests);
  const [newRequest, setNewRequest] = useState({
    type: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const myRequests = leaveRequests.filter((r) => r.employeeId === "EMP002");
  const pendingRequests = leaveRequests.filter((r) => r.status === "pending");

  const handleSubmitRequest = () => {
    if (!newRequest.type || !newRequest.startDate || !newRequest.endDate || !newRequest.reason) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(newRequest.startDate);
    const end = new Date(newRequest.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;

    const request: LeaveRequest = {
      id: Date.now().toString(),
      employeeId: user?.employeeId || "EMP002",
      employeeName: user?.name || "John Smith",
      type: newRequest.type,
      startDate: newRequest.startDate,
      endDate: newRequest.endDate,
      days,
      reason: newRequest.reason,
      status: "pending",
      appliedOn: new Date().toISOString().split("T")[0],
    };

    setLeaveRequests([request, ...leaveRequests]);
    setNewRequest({ type: "", startDate: "", endDate: "", reason: "" });
    setIsDialogOpen(false);
    
    toast({
      title: "Leave request submitted",
      description: "Your request has been submitted for approval.",
    });
  };

  const handleApprove = (id: string) => {
    setLeaveRequests(
      leaveRequests.map((r) => (r.id === id ? { ...r, status: "approved" as const } : r))
    );
    toast({
      title: "Leave approved",
      description: "The leave request has been approved.",
    });
  };

  const handleReject = (id: string) => {
    setLeaveRequests(
      leaveRequests.map((r) => (r.id === id ? { ...r, status: "rejected" as const } : r))
    );
    toast({
      title: "Leave rejected",
      description: "The leave request has been rejected.",
    });
  };

  return (
    <DashboardLayout title={isAdmin ? "Leave Approvals" : "Leave Requests"}>
      <div className="space-y-6">
        {/* Leave Balance (for employees) */}
        {!isAdmin && (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Paid Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-display font-bold text-foreground">{leaveBalance.paid} days</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Sick Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-display font-bold text-foreground">{leaveBalance.sick} days</p>
                <p className="text-xs text-muted-foreground">Available</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Unpaid Leave</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-display font-bold text-foreground">{leaveBalance.unpaid}</p>
                <p className="text-xs text-muted-foreground">As needed</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Content */}
        <Card className="border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-display">
                <Calendar className="h-5 w-5" />
                {isAdmin ? "Leave Requests" : "My Leave Requests"}
              </CardTitle>
              <CardDescription>
                {isAdmin
                  ? "Review and manage employee leave requests"
                  : "View and submit leave requests"}
              </CardDescription>
            </div>
            {!isAdmin && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="gradient-primary border-0">
                    <Plus className="mr-2 h-4 w-4" />
                    New Request
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="font-display">Submit Leave Request</DialogTitle>
                    <DialogDescription>
                      Fill in the details for your leave request
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Leave Type</Label>
                      <Select
                        value={newRequest.type}
                        onValueChange={(value) => setNewRequest({ ...newRequest, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select leave type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Paid Leave">Paid Leave</SelectItem>
                          <SelectItem value="Sick Leave">Sick Leave</SelectItem>
                          <SelectItem value="Unpaid Leave">Unpaid Leave</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={newRequest.startDate}
                          onChange={(e) => setNewRequest({ ...newRequest, startDate: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endDate">End Date</Label>
                        <Input
                          id="endDate"
                          type="date"
                          value={newRequest.endDate}
                          onChange={(e) => setNewRequest({ ...newRequest, endDate: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason</Label>
                      <Textarea
                        id="reason"
                        placeholder="Enter reason for leave..."
                        value={newRequest.reason}
                        onChange={(e) => setNewRequest({ ...newRequest, reason: e.target.value })}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitRequest} className="gradient-primary border-0">Submit Request</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <Tabs defaultValue="pending">
                <TabsList>
                  <TabsTrigger value="pending">
                    Pending ({pendingRequests.length})
                  </TabsTrigger>
                  <TabsTrigger value="all">All Requests</TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-4">
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/50">
                          <TableHead>Employee</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Reason</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {pendingRequests.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              No pending requests
                            </TableCell>
                          </TableRow>
                        ) : (
                          pendingRequests.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{request.employeeName}</p>
                                  <p className="text-sm text-muted-foreground">{request.employeeId}</p>
                                </div>
                              </TableCell>
                              <TableCell>{request.type}</TableCell>
                              <TableCell>
                                <div>
                                  <p className="font-medium">{request.days} day(s)</p>
                                  <p className="text-sm text-muted-foreground">
                                    {request.startDate} - {request.endDate}
                                  </p>
                                </div>
                              </TableCell>
                              <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-success hover:bg-success/10"
                                    onClick={() => handleApprove(request.id)}
                                  >
                                    <Check className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="text-destructive hover:bg-destructive/10"
                                    onClick={() => handleReject(request.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                <TabsContent value="all" className="mt-4">
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/50">
                          <TableHead>Employee</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Applied On</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {leaveRequests.map((request) => (
                          <TableRow key={request.id}>
                            <TableCell>
                              <div>
                                <p className="font-medium">{request.employeeName}</p>
                                <p className="text-sm text-muted-foreground">{request.employeeId}</p>
                              </div>
                            </TableCell>
                            <TableCell>{request.type}</TableCell>
                            <TableCell>
                              <div>
                                <p className="font-medium">{request.days} day(s)</p>
                                <p className="text-sm text-muted-foreground">
                                  {request.startDate} - {request.endDate}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline" className={statusConfig[request.status].className}>
                                {statusConfig[request.status].label}
                              </Badge>
                            </TableCell>
                            <TableCell>{request.appliedOn}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead>Type</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Reason</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Applied On</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {myRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No leave requests yet
                        </TableCell>
                      </TableRow>
                    ) : (
                      myRequests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell>{request.type}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{request.days} day(s)</p>
                              <p className="text-sm text-muted-foreground">
                                {request.startDate} - {request.endDate}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="max-w-[200px] truncate">{request.reason}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={statusConfig[request.status].className}>
                              <Clock className="mr-1 h-3 w-3" />
                              {statusConfig[request.status].label}
                            </Badge>
                          </TableCell>
                          <TableCell>{request.appliedOn}</TableCell>
                        </TableRow>
                      ))
                    )}
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
