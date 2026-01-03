import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pencil, Building, Users } from "lucide-react";

interface SalaryComponent {
  name: string;
  amount: number;
  description: string;
  percentage?: string;
}

const companySalaryStructure = {
  monthWage: 50000,
  yearlyWage: 600000,
  workingDays: 5,
  breakTime: 1,
  components: [
    { name: "Basic Salary", amount: 25000, description: "Define basic salary from company cost, compute it based on monthly wages", percentage: "" },
    { name: "House Rent Allowance", amount: 12500, description: "HRA provided to employees 50% of the basic salary", percentage: "" },
    { name: "Standard Allowance", amount: 4167, description: "A standard allowance is a predetermined, fixed amount provided to employee as part of their salary", percentage: "16.67%" },
    { name: "Performance Bonus", amount: 2082.50, description: "Variable amount paid during payroll. The value defined by the company and calculated as a % of the basic salary", percentage: "8.33%" },
    { name: "Leave Travel Allowance", amount: 2082.50, description: "LTA is paid by the company to employees to cover their travel expenses, and calculated as a % of the basic salary", percentage: "8.33%" },
    { name: "Fixed Allowance", amount: 2918, description: "Fixed allowance portion of wages is determined after calculating all salary components", percentage: "11.67%" },
  ],
  pfContribution: {
    employee: { amount: 3000, percentage: "12.00%" },
    employer: { amount: 3000, percentage: "12.00%" },
  },
  taxDeductions: {
    professionalTax: 200,
  },
};

const mockEmployees = [
  { id: "EMP001", name: "Sarah Johnson" },
  { id: "EMP002", name: "John Smith" },
  { id: "EMP003", name: "Mike Brown" },
  { id: "EMP004", name: "Emily Davis" },
  { id: "EMP005", name: "Alex Wilson" },
];

export default function SalaryInfo() {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [activeTab, setActiveTab] = useState("company");

  if (!isAdmin) {
    return (
      <DashboardLayout title="Salary Structure">
        <Card className="border-border shadow-sm">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Please contact HR for salary structure information.</p>
          </CardContent>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Salary Structure">
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="h-9 bg-secondary/50">
            <TabsTrigger value="company" className="text-xs h-7 gap-1.5">
              <Building className="h-3.5 w-3.5" />
              Company Structure
            </TabsTrigger>
            <TabsTrigger value="employee" className="text-xs h-7 gap-1.5">
              <Users className="h-3.5 w-3.5" />
              Employee Salary
            </TabsTrigger>
          </TabsList>

          {/* Company Structure Tab */}
          <TabsContent value="company" className="mt-4 space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-base font-display">Company Salary Structure</CardTitle>
                </div>
                <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                  <Pencil className="h-3 w-3" />
                  Edit Structure
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Wage Summary */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Month Wage</p>
                    <p className="font-semibold">{companySalaryStructure.monthWage.toLocaleString()} <span className="text-muted-foreground font-normal">/ Month</span></p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Yearly wage</p>
                    <p className="font-semibold">{companySalaryStructure.yearlyWage.toLocaleString()} <span className="text-muted-foreground font-normal">/ Yearly</span></p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">No of working days in a week:</p>
                    <p className="font-semibold">{companySalaryStructure.workingDays}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Break Time:</p>
                    <p className="font-semibold">{companySalaryStructure.breakTime} <span className="text-muted-foreground font-normal">/hrs</span></p>
                  </div>
                </div>

                {/* Salary Components and PF */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Salary Components */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground">Salary Components</h4>
                    <div className="space-y-3">
                      {companySalaryStructure.components.map((component, index) => (
                        <div key={index} className="space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{component.name}</span>
                            <div className="text-right">
                              <span className="text-sm font-semibold">{component.amount.toLocaleString()}</span>
                              <span className="text-xs text-muted-foreground"> ₹/month</span>
                              {component.percentage && (
                                <span className="text-xs text-muted-foreground ml-1">{component.percentage}</span>
                              )}
                            </div>
                          </div>
                          <p className="text-[11px] text-muted-foreground leading-tight">{component.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PF and Tax */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-foreground">Provident Fund (PF) Contribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Employee Contribution</span>
                        <div className="text-right">
                          <span className="text-sm font-semibold">{companySalaryStructure.pfContribution.employee.amount.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground"> ₹/month {companySalaryStructure.pfContribution.employee.percentage}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Employer Contribution</span>
                        <div className="text-right">
                          <span className="text-sm font-semibold">{companySalaryStructure.pfContribution.employer.amount.toLocaleString()}</span>
                          <span className="text-xs text-muted-foreground"> ₹/month {companySalaryStructure.pfContribution.employer.percentage}</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-muted-foreground">PF is calculated based on the basic salary</p>
                    </div>

                    <h4 className="text-sm font-semibold text-foreground pt-4">Tax Deductions</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-sm">Professional Tax</span>
                          <p className="text-[11px] text-muted-foreground">Professional Tax deducted from the Gross salary</p>
                        </div>
                        <div className="text-right">
                          <span className="text-sm font-semibold">{companySalaryStructure.taxDeductions.professionalTax}</span>
                          <span className="text-xs text-muted-foreground"> ₹/month</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Employee Salary Tab */}
          <TabsContent value="employee" className="mt-4 space-y-6">
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base font-display">Employee Salary Structure</CardTitle>
                    <CardDescription className="text-xs">Select an employee to configure their salary</CardDescription>
                  </div>
                  <Select value={selectedEmployee} onValueChange={setSelectedEmployee}>
                    <SelectTrigger className="w-[180px] h-8 text-sm">
                      <SelectValue placeholder="Select an employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmployees.map((emp) => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                {!selectedEmployee ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
                    <p className="text-sm font-medium text-foreground">No Employee Selected</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Select an employee from the dropdown above to configure their salary structure.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Salary configuration for employee: <span className="font-medium text-foreground">{mockEmployees.find(e => e.id === selectedEmployee)?.name}</span>
                    </p>
                    <div className="grid md:grid-cols-2 gap-4">
                      {companySalaryStructure.components.slice(0, 4).map((component, index) => (
                        <div key={index} className="p-3 rounded-lg bg-secondary/30">
                          <p className="text-xs text-muted-foreground">{component.name}</p>
                          <p className="text-lg font-semibold">${(component.amount * 0.04).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
