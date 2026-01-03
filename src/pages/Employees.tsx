import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Users, Search, Plus, Mail, Phone, Building, Eye } from "lucide-react";

interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  status: "active" | "inactive" | "on_leave";
  joinDate: string;
}

const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    name: "Sarah Johnson",
    email: "sarah.johnson@dayflow.com",
    phone: "+1 (555) 123-4567",
    department: "Human Resources",
    position: "HR Manager",
    status: "active",
    joinDate: "2021-03-15",
  },
  {
    id: "EMP002",
    name: "John Smith",
    email: "john.smith@dayflow.com",
    phone: "+1 (555) 987-6543",
    department: "Engineering",
    position: "Software Developer",
    status: "active",
    joinDate: "2022-06-01",
  },
  {
    id: "EMP003",
    name: "Mike Brown",
    email: "mike.brown@dayflow.com",
    phone: "+1 (555) 456-7890",
    department: "Engineering",
    position: "Senior Developer",
    status: "active",
    joinDate: "2020-09-10",
  },
  {
    id: "EMP004",
    name: "Emily Davis",
    email: "emily.davis@dayflow.com",
    phone: "+1 (555) 321-0987",
    department: "Design",
    position: "UI/UX Designer",
    status: "on_leave",
    joinDate: "2023-01-20",
  },
  {
    id: "EMP005",
    name: "Alex Wilson",
    email: "alex.wilson@dayflow.com",
    phone: "+1 (555) 654-3210",
    department: "Marketing",
    position: "Marketing Manager",
    status: "active",
    joinDate: "2021-11-05",
  },
  {
    id: "EMP006",
    name: "Lisa Chen",
    email: "lisa.chen@dayflow.com",
    phone: "+1 (555) 789-0123",
    department: "Finance",
    position: "Financial Analyst",
    status: "inactive",
    joinDate: "2022-04-15",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-success/10 text-success border-success/20" },
  inactive: { label: "Inactive", className: "bg-muted text-muted-foreground border-muted" },
  on_leave: { label: "On Leave", className: "bg-warning/10 text-warning border-warning/20" },
};

export default function Employees() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const { toast } = useToast();

  const filteredEmployees = mockEmployees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const departments = [...new Set(mockEmployees.map((e) => e.department))];
  const activeCount = mockEmployees.filter((e) => e.status === "active").length;

  return (
    <DashboardLayout title="Employees">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-border shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Employees</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display font-bold text-foreground">{mockEmployees.length}</p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display font-bold text-success">{activeCount}</p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">On Leave</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display font-bold text-warning">
                {mockEmployees.filter((e) => e.status === "on_leave").length}
              </p>
            </CardContent>
          </Card>
          <Card className="border-border shadow-soft">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Departments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-display font-bold text-foreground">{departments.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Employee List */}
        <Card className="border-border shadow-soft">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 font-display">
                <Users className="h-5 w-5" />
                Employee Directory
              </CardTitle>
              <CardDescription>Manage and view all employee records</CardDescription>
            </div>
            <Button className="gradient-primary border-0">
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-4 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, department, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Table */}
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead>Employee</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No employees found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredEmployees.map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {getInitials(employee.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">{employee.name}</p>
                              <p className="text-sm text-muted-foreground">{employee.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{employee.department}</TableCell>
                        <TableCell>{employee.position}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusConfig[employee.status].className}>
                            {statusConfig[employee.status].label}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedEmployee(employee)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md">
                              <DialogHeader>
                                <DialogTitle className="font-display">Employee Details</DialogTitle>
                                <DialogDescription>View employee information</DialogDescription>
                              </DialogHeader>
                              {selectedEmployee && (
                                <div className="space-y-6">
                                  <div className="flex items-center gap-4">
                                    <Avatar className="h-16 w-16">
                                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                        {getInitials(selectedEmployee.name)}
                                      </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <h3 className="text-lg font-semibold">{selectedEmployee.name}</h3>
                                      <p className="text-sm text-muted-foreground">{selectedEmployee.id}</p>
                                      <Badge variant="outline" className={statusConfig[selectedEmployee.status].className}>
                                        {statusConfig[selectedEmployee.status].label}
                                      </Badge>
                                    </div>
                                  </div>

                                  <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                      <Mail className="h-4 w-4 text-muted-foreground" />
                                      <span>{selectedEmployee.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                      <Phone className="h-4 w-4 text-muted-foreground" />
                                      <span>{selectedEmployee.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                      <Building className="h-4 w-4 text-muted-foreground" />
                                      <span>{selectedEmployee.department} - {selectedEmployee.position}</span>
                                    </div>
                                  </div>

                                  <div className="pt-4 border-t">
                                    <p className="text-sm text-muted-foreground">
                                      Joined on {new Date(selectedEmployee.joinDate).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                      })}
                                    </p>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
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
