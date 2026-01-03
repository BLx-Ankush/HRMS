import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Clock, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  CheckCircle2,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const adminStats = {
  totalEmployees: 156,
  presentToday: 142,
  onLeave: 8,
  pendingLeaveRequests: 12,
  totalPayroll: 485000,
};

const employeeStats = {
  attendanceRate: 96,
  leaveBalance: 12,
  pendingRequests: 1,
  nextPayday: "Jan 31, 2026",
};

const recentActivities = [
  { id: 1, type: "leave", user: "John Smith", action: "requested sick leave", time: "2 hours ago" },
  { id: 2, type: "attendance", user: "Sarah Johnson", action: "checked in", time: "3 hours ago" },
  { id: 3, type: "leave", user: "Mike Brown", action: "leave approved", time: "5 hours ago" },
  { id: 4, type: "employee", user: "Emily Davis", action: "joined the team", time: "1 day ago" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">
              Welcome back, {user?.name?.split(" ")[0]}!
            </h2>
            <p className="text-muted-foreground">
              {isAdmin
                ? "Here's what's happening with your team today."
                : "Here's your work summary for today."}
            </p>
          </div>
          {!isAdmin && (
            <Button asChild className="gradient-primary border-0">
              <Link to="/attendance">
                <Clock className="mr-2 h-4 w-4" />
                Check In
              </Link>
            </Button>
          )}
        </div>

        {/* Stats Grid */}
        {isAdmin ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">{adminStats.totalEmployees}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-success">+3</span> from last month
                </p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Present Today</CardTitle>
                <CheckCircle2 className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">{adminStats.presentToday}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((adminStats.presentToday / adminStats.totalEmployees) * 100)}% attendance rate
                </p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <AlertCircle className="h-4 w-4 text-warning" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">{adminStats.pendingLeaveRequests}</div>
                <p className="text-xs text-muted-foreground">Leave requests awaiting approval</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Monthly Payroll</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">${adminStats.totalPayroll.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Total for January 2026</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                <TrendingUp className="h-4 w-4 text-success" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">{employeeStats.attendanceRate}%</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leave Balance</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">{employeeStats.leaveBalance} days</div>
                <p className="text-xs text-muted-foreground">Available paid leave</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">{employeeStats.pendingRequests}</div>
                <p className="text-xs text-muted-foreground">Awaiting approval</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Payday</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-display font-bold">{employeeStats.nextPayday}</div>
                <p className="text-xs text-muted-foreground">28 days away</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions & Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Quick Actions */}
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="font-display">Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {isAdmin ? (
                <>
                  <Button variant="outline" className="justify-between h-auto py-3" asChild>
                    <Link to="/employees">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">Manage Employees</p>
                          <p className="text-xs text-muted-foreground">View and edit employee records</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-3" asChild>
                    <Link to="/leave">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">Leave Approvals</p>
                          <p className="text-xs text-muted-foreground">{adminStats.pendingLeaveRequests} pending requests</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-3" asChild>
                    <Link to="/attendance">
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">View Attendance</p>
                          <p className="text-xs text-muted-foreground">Daily attendance records</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="justify-between h-auto py-3" asChild>
                    <Link to="/profile">
                      <div className="flex items-center gap-3">
                        <Users className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">View Profile</p>
                          <p className="text-xs text-muted-foreground">View and update your details</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-3" asChild>
                    <Link to="/leave">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">Request Leave</p>
                          <p className="text-xs text-muted-foreground">Submit a new leave request</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="justify-between h-auto py-3" asChild>
                    <Link to="/payroll">
                      <div className="flex items-center gap-3">
                        <DollarSign className="h-5 w-5 text-primary" />
                        <div className="text-left">
                          <p className="font-medium">View Payroll</p>
                          <p className="text-xs text-muted-foreground">Check your salary details</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="font-display">Recent Activity</CardTitle>
              <CardDescription>Latest updates and actions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`mt-0.5 h-2 w-2 rounded-full ${
                      activity.type === "leave" 
                        ? "bg-warning" 
                        : activity.type === "attendance" 
                          ? "bg-primary" 
                          : "bg-success"
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}
                      </p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
