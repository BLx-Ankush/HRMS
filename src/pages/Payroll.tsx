import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Calendar, Download } from "lucide-react";
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
];

const allEmployeesPayroll = [
  { id: "EMP001", name: "Sarah Johnson", department: "HR", basicSalary: 6500, netSalary: 5985, status: "paid" },
  { id: "EMP002", name: "John Smith", department: "Engineering", basicSalary: 5000, netSalary: 5220, status: "pending" },
  { id: "EMP003", name: "Mike Brown", department: "Engineering", basicSalary: 5500, netSalary: 5060, status: "pending" },
  { id: "EMP004", name: "Emily Davis", department: "Design", basicSalary: 4800, netSalary: 4416, status: "pending" },
  { id: "EMP005", name: "Alex Wilson", department: "Marketing", basicSalary: 4500, netSalary: 4140, status: "paid" },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  paid: { label: "paid", className: "bg-success/10 text-success border-success/20" },
  pending: { label: "pending", className: "bg-warning/10 text-warning border-warning/20" },
  processing: { label: "processing", className: "bg-primary/10 text-primary border-primary/20" },
};

export default function Payroll() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [selectedMonth, setSelectedMonth] = useState("december-2025");

  const currentPayroll = employeePayrollHistory[0];
  const totalEarnings = currentPayroll.basicSalary + currentPayroll.allowances;

  // Admin Stats
  const totalPayroll = 485000;
  const employeesPaid = 142;
  const totalEmployees = 156;
  const pendingPayments = 14;

  return (
    <DashboardLayout title="Payroll">
      <div className="space-y-6">
        {/* Summary Cards */}
        {isAdmin ? (
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-[hsl(var(--card-accent))] border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Total Payroll</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-foreground">${totalPayroll.toLocaleString()}</p>
                <p className="text-[11px] text-muted-foreground">January 2026</p>
              </CardContent>
            </Card>
            <Card className="bg-[hsl(var(--card-accent))] border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Employees Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-success">{employeesPaid} / {totalEmployees}</p>
                <p className="text-[11px] text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card className="bg-[hsl(var(--card-accent))] border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-display font-bold text-foreground">{pendingPayments}</p>
                <p className="text-[11px] text-muted-foreground">Processing</p>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                  <DollarSign className="h-3.5 w-3.5" />
                  Basic Salary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-display font-bold text-foreground">
                  ${currentPayroll.basicSalary.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground">Per month</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Allowances</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-display font-bold text-success">
                  +${currentPayroll.allowances.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Deductions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-display font-bold text-destructive">
                  -${currentPayroll.deductions.toLocaleString()}
                </p>
                <p className="text-[11px] text-muted-foreground">Taxes & benefits</p>
              </CardContent>
            </Card>
            <Card className="border-border shadow-sm bg-primary/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium text-muted-foreground">Net Salary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xl font-display font-bold text-primary">
                  ${currentPayroll.netSalary.toLocaleString()}
                </p>
                <Badge variant="outline" className={statusConfig[currentPayroll.status].className}>
                  {statusConfig[currentPayroll.status].label}
                </Badge>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Payroll Details */}
        <Card className="border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center">
                <Calendar className="h-4 w-4 text-foreground" />
              </div>
              <div>
                <CardTitle className="text-base font-display">
                  {isAdmin ? "Employee Payroll" : "Payroll History"}
                </CardTitle>
                <CardDescription className="text-xs">
                  {isAdmin ? "Manage employee salary and payments" : "View your salary breakdown and history"}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="w-[150px] h-8 text-sm">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="december-2025">December 2025</SelectItem>
                  <SelectItem value="november-2025">November 2025</SelectItem>
                  <SelectItem value="october-2025">October 2025</SelectItem>
                </SelectContent>
              </Select>
              {!isAdmin && (
                <Button variant="outline" size="sm" className="h-8">
                  <Download className="mr-1.5 h-3.5 w-3.5" />
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
                    <TableRow className="bg-secondary/30">
                      <TableHead className="text-xs font-medium">Employee ID</TableHead>
                      <TableHead className="text-xs font-medium">Name</TableHead>
                      <TableHead className="text-xs font-medium">Department</TableHead>
                      <TableHead className="text-xs font-medium">Basic Salary</TableHead>
                      <TableHead className="text-xs font-medium">Net Salary</TableHead>
                      <TableHead className="text-xs font-medium">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {allEmployeesPayroll.map((emp) => (
                      <TableRow key={emp.id}>
                        <TableCell className="text-sm font-medium">{emp.id}</TableCell>
                        <TableCell className="text-sm">{emp.name}</TableCell>
                        <TableCell className="text-sm text-muted-foreground">{emp.department}</TableCell>
                        <TableCell className="text-sm">${emp.basicSalary.toLocaleString()}</TableCell>
                        <TableCell className="text-sm font-medium">${emp.netSalary.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={`text-[10px] ${statusConfig[emp.status].className}`}>
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
                <TabsList className="h-8">
                  <TabsTrigger value="history" className="text-xs h-7">History</TabsTrigger>
                  <TabsTrigger value="breakdown" className="text-xs h-7">Current Breakdown</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="mt-4">
                  <div className="rounded-lg border border-border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow className="bg-secondary/30">
                          <TableHead className="text-xs font-medium">Month</TableHead>
                          <TableHead className="text-xs font-medium">Basic Salary</TableHead>
                          <TableHead className="text-xs font-medium">Allowances</TableHead>
                          <TableHead className="text-xs font-medium">Deductions</TableHead>
                          <TableHead className="text-xs font-medium">Net Salary</TableHead>
                          <TableHead className="text-xs font-medium">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {employeePayrollHistory.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell className="text-sm font-medium">{record.month}</TableCell>
                            <TableCell className="text-sm">${record.basicSalary.toLocaleString()}</TableCell>
                            <TableCell className="text-sm text-success">
                              +${record.allowances.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-sm text-destructive">
                              -${record.deductions.toLocaleString()}
                            </TableCell>
                            <TableCell className="text-sm font-medium">
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
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-display">Earnings</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Basic Salary</span>
                          <span className="font-medium">${currentPayroll.basicSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Allowances</span>
                          <span className="font-medium">${currentPayroll.allowances.toLocaleString()}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-medium">
                          <span>Total Earnings</span>
                          <span className="text-success">${totalEarnings.toLocaleString()}</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-border">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-display">Deductions</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm">
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
                        <div className="border-t pt-2 flex justify-between font-medium">
                          <span>Total Deductions</span>
                          <span className="text-destructive">-${currentPayroll.deductions.toLocaleString()}</span>
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
