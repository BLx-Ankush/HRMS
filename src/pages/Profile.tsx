import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Save, X, Mail, Phone, MapPin, Briefcase, Calendar, Building, Plus } from "lucide-react";

interface Skill {
  id: string;
  name: string;
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

const initialSkills: Skill[] = [
  { id: "1", name: "HR Management" },
  { id: "2", name: "Recruitment" },
  { id: "3", name: "Employee Relations" },
  { id: "4", name: "Performance Management" },
  { id: "5", name: "HRIS Systems" },
];

const initialCertifications: Certification[] = [
  { id: "1", name: "SHRM-SCP", issuer: "SHRM", year: "2021" },
  { id: "2", name: "PHR", issuer: "HRCI", year: "2019" },
];

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    phone: user?.phone || "",
    address: user?.address || "",
  });
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [certifications, setCertifications] = useState<Certification[]>(initialCertifications);
  const [about, setAbout] = useState(
    "Experienced HR professional with over 8 years of experience in human resources management, employee relations, and organizational development. Passionate about creating positive workplace cultures and driving employee engagement initiatives."
  );
  const [jobLove, setJobLove] = useState(
    "I love the opportunity to make a real difference in people's work lives. Whether it's helping someone navigate a career transition, resolving workplace conflicts, or implementing policies that improve work-life balance."
  );
  const [interests, setInterests] = useState(
    "Outside of work, I enjoy hiking, photography, and volunteering at local community centers. I'm also an avid reader and enjoy staying up-to-date with the latest trends in HR technology and organizational development."
  );

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

  const removeSkill = (id: string) => {
    setSkills(skills.filter(s => s.id !== id));
  };

  const removeCertification = (id: string) => {
    setCertifications(certifications.filter(c => c.id !== id));
  };

  return (
    <DashboardLayout title="My Profile">
      <div className="space-y-6">
        {/* Profile Header */}
        <Card className="border-border shadow-sm overflow-hidden">
          <div className="h-20 bg-primary" />
          <CardContent className="relative pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10">
              <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl font-semibold">
                  {user?.name ? getInitials(user.name) : "U"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-display font-bold text-foreground">{user?.name}</h2>
                  <Badge variant="outline" className="capitalize bg-primary/10 text-primary border-primary/20 text-[10px]">
                    {user?.role}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user?.position}</p>
                <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                  <span>{user?.email}</span>
                  <span>{user?.phone}</span>
                </div>
              </div>
              <div className="sm:pb-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancel} className="h-8 text-xs">
                      <X className="h-3 w-3 mr-1" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSave} className="h-8 text-xs bg-primary hover:bg-primary/90">
                      <Save className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="h-8 text-xs">
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left Column - About Sections */}
          <div className="lg:col-span-3 space-y-6">
            {/* About Section */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display">About</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="text-sm min-h-[80px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">{about}</p>
                )}
              </CardContent>
            </Card>

            {/* What I love about my job */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display">What I love about my job</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={jobLove}
                    onChange={(e) => setJobLove(e.target.value)}
                    className="text-sm min-h-[60px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">{jobLove}</p>
                )}
              </CardContent>
            </Card>

            {/* My interests and hobbies */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display">My interests and hobbies</CardTitle>
              </CardHeader>
              <CardContent>
                {isEditing ? (
                  <Textarea
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    className="text-sm min-h-[60px]"
                  />
                ) : (
                  <p className="text-sm text-muted-foreground leading-relaxed">{interests}</p>
                )}
              </CardContent>
            </Card>

            {/* Contact Info Card */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display">Contact & Employment</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                    {isEditing ? (
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="Phone number"
                        className="h-7 text-sm"
                      />
                    ) : (
                      <span className="text-muted-foreground">{user?.phone || "Not provided"}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Building className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.department}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground">{user?.employeeId}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Skills & Certifications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display">Skills</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill.id}
                      variant="secondary"
                      className="text-xs py-1 px-2 bg-[hsl(var(--card-accent))] hover:bg-[hsl(var(--card-accent))]"
                    >
                      {skill.name}
                      {isEditing && (
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="ml-1.5 text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <Button variant="ghost" size="sm" className="mt-3 h-7 text-xs text-muted-foreground">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Skills
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="border-border shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-display">Certification</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-start justify-between p-2 rounded-lg bg-[hsl(var(--card-accent))]">
                    <div>
                      <p className="text-sm font-medium">{cert.name}</p>
                      <p className="text-[11px] text-muted-foreground">{cert.issuer} • {cert.year}</p>
                    </div>
                    {isEditing && (
                      <button
                        onClick={() => removeCertification(cert.id)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {isEditing && (
                  <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
                    <Plus className="h-3 w-3 mr-1" />
                    Add Certification
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
