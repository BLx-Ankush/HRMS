import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface PayrollRecord {
  month: string;
  basicSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: "paid" | "pending" | "processing";
  paidOn?: string;
}

const employeePayrollHistory: PayrollRecord[] = [
  {
    month: "January 2026",
    basicSalary: 5000,
    allowances: 800,
    deductions: 580,
    netSalary: 5220,
    status: "pending",
  },
  {
    month: "December 2025",
    basicSalary: 5000,
    allowances: 800,
    deductions: 580,
    netSalary: 5220,
    status: "paid",
    paidOn: "2025-12-31",
  },
  {
    month: "November 2025",
    basicSalary: 5000,
    allowances: 750,
    deductions: 575,
    netSalary: 5175,
    status: "paid",
    paidOn: "2025-11-30",
  },
  {
    month: "October 2025",
    basicSalary: 5000,
    allowances: 750,
    deductions: 575,
    netSalary: 5175,
    status: "paid",
    paidOn: "2025-10-31",
  },
];

const allEmployeesPayroll = [
  { id: "EMP001", name: "Sarah Johnson", department: "HR", basicSalary: 6500, netSalary: 5985, status: "paid" },
  { id: "EMP002", name: "John Smith", department: "Engineering", basicSalary: 5000, netSalary: 5220, status: "pending" },
  { id: "EMP003", name: "Mike Brown", department: "Engineering", basicSalary: 5500, netSalary: 5060, status: "pending" },
  { id: "EMP004", name: "Emily Davis", department: "Design", basicSalary: 4800, netSalary: 4416, status: "pending" },
  { id: "EMP005", name: "Alex Wilson", department: "Marketing", basicSalary: 4500, netSalary: 4140, status: "paid" },
  { id: "EMP006", name: "Lisa Chen", department: "Finance", basicSalary: 5200, netSalary: 4784, status: "processing" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  paid: { label: "Paid", className: "bg-success/10 text-success border-success/20" },
  pending: { label: "Pending", className: "bg-warning/10 text-warning border-warning/20" },
  processing: { label: "Processing", className: "bg-primary/10 text-primary border-primary/20" },
};

export default function Payroll() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [selectedMonth, setSelectedMonth] = useState("january-2026");

  const currentPayroll = employeePayrollHistory[0];
  const totalEarnings = currentPayroll.basicSalary + currentPayroll.allowances;

  return (
    <DashboardLayout title="Payroll">
      <div className="space-y-6">
        {/* Summary Cards */}
        {!isAdmin ? (
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Basic Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-foreground">
                  ${currentPayroll.basicSalary.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Per month</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Allowances
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-success">
                  +${currentPayroll.allowances.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  Deductions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-destructive">
                  -${currentPayroll.deductions.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Taxes & benefits</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  Net Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-primary">
                  ${currentPayroll.netSalary.toLocaleString()}
                </p>
                <Badge variant="outline" className={statusConfig[currentPayroll.status].className}>
                  {statusConfig[currentPayroll.status].label}
                </Badge>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Payroll</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-foreground">$485,000</p>
                <p className="text-xs text-muted-foreground">January 2026</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Employees Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-success">142 / 156</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-soft">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-warning">14</p>
                <p className="text-xs text-muted-foreground">Processing</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payroll Details */}
        <Card className="border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-display">
                <Calendar className="h-5 w-5" />
                {isAdmin ? "Employee Payroll" : "Payroll History"}
              </CardTitle>
              <CardDescription>
                {isAdmin ? "Manage employee salary and payments" : "View your salary breakdown and history"}
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="january-2026">January 2026</SelectItem>
                  <SelectItem value="december-2025">December 2025</SelectItem>
                  <SelectItem value="november-2025">November 2025</SelectItem>
                  <SelectItem value="october-2025">October 2025</SelectItem>
                </SelectContent>
              </Select>
              {!isAdmin && (
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {isAdmin ? (
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead>Employee ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Basic Salary</TableHead>
                      <TableHead>Net Salary</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allEmployeesPayroll.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell className="font-medium">{emp.id}</TableCell>
                        <TableCell>{emp.name}</TableCell>
                        <TableCell>{emp.department}</TableCell>
                        <TableCell>${emp.basicSalary.toLocaleString()}</TableCell>
                        <TableCell className="font-semibold">${emp.netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusConfig[emp.status].className}>
                            {statusConfig[emp.status].label}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <Tabs defaultValue="history">
                <TabsList>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="breakdown">Current Breakdown</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="mt-4">
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/50">
                          <TableHead>Month</TableHead>
                          <TableHead>Basic Salary</TableHead>
                          <TableHead>Allowances</TableHead>
                          <TableHead>Deductions</TableHead>
                          <TableHead>Net Salary</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employeePayrollHistory.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell className="font-medium">{record.month}</TableCell>
                            <TableCell>${record.basicSalary.toLocaleString()}</TableCell>
                            <TableCell className="text-success">
                              +${record.allowances.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-destructive">
                              -${record.deductions.toLocaleString()}
                            </TableCell>
                            <TableCell className="font-semibold">
                              ${record.netSalary.toLocaleString()}
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
                <TabsContent value="breakdown" className="mt-4">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-base font-display">Earnings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Basic Salary</span>
                            <span className="font-medium">${currentPayroll.basicSalary.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Housing Allowance</span>
                            <span className="font-medium">$500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Transport Allowance</span>
                            <span className="font-medium">$200</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Other Allowances</span>
                            <span className="font-medium">$100</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between font-semibold">
                            <span>Total Earnings</span>
                            <span className="text-success">${totalEarnings.toLocaleString()}</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-border">
                        <CardHeader>
                          <CardTitle className="text-base font-display">Deductions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Income Tax</span>
                            <span className="font-medium">$350</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Social Security</span>
                            <span className="font-medium">$150</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Health Insurance</span>
                            <span className="font-medium">$80</span>
                          </div>
                          <div className="border-t pt-3 flex justify-between font-semibold">
                            <span>Total Deductions</span>
                            <span className="text-destructive">
                              -${currentPayroll.deductions.toLocaleString()}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Card className="border-border bg-primary/5">
                      <CardContent className="py-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm text-muted-foreground">Net Salary for January 2026</p>
                            <p className="text-3xl font-display font-bold text-primary">
                              ${currentPayroll.netSalary.toLocaleString()}
                            </p>
                          </div>
                          <Badge variant="outline" className={statusConfig[currentPayroll.status].className}>
                            {statusConfig[currentPayroll.status].label}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
