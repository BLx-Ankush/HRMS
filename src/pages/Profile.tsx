import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, X, Mail, Phone, MapPin, Briefcase, Calendar, Building } from "lucide-react";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handleCancel = () => {
    setFormData({
      phone: user?.phone || "",
      address: user?.address || "",
    });
    setIsEditing(false);
  };

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card className="border-border shadow-soft overflow-hidden">
          <div className="h-24 gradient-primary" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12">
              <Avatar className="h-24 w-24 border-4 border-background shadow-soft">
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-semibold">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-display font-bold text-foreground">{user?.name}</h2>
                  <Badge variant="outline" className="capitalize bg-primary/10 text-primary border-primary/20">
                    {user?.role}
                  </Badge>
                </div>
                <p className="text-muted-foreground">{user?.position}</p>
              </div>
              <div className="sm:pb-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave} className="gradient-primary border-0">
                      <Save className="h-4 w-4 mr-1" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Personal Information */}
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-display">Personal Information</CardTitle>
              <CardDescription>Your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium text-foreground">{user?.email}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-muted-foreground">Phone</p>
                  {isEditing ? (
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter phone number"
                      className="mt-1 h-9"
                    />
                  ) : (
                    <p className="font-medium text-foreground">
                      {user?.phone || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-muted-foreground">Address</p>
                  {isEditing ? (
                    <Input
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Enter address"
                      className="mt-1 h-9"
                    />
                  ) : (
                    <p className="font-medium text-foreground">
                      {user?.address || "Not provided"}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employment Details */}
          <Card className="border-border shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-display">Employment Details</CardTitle>
              <CardDescription>Your work-related information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Employee ID</p>
                  <p className="font-medium text-foreground">{user?.employeeId}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <Building className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Department</p>
                  <p className="font-medium text-foreground">{user?.department}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Position</p>
                  <p className="font-medium text-foreground">{user?.position}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-muted-foreground">Join Date</p>
                  <p className="font-medium text-foreground">
                    {user?.joinDate ? new Date(user.joinDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }) : "N/A"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
