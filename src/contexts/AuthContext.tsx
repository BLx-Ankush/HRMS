import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "admin" | "employee";

export interface User {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  role: UserRole;
  department: string;
  position: string;
  phone?: string;
  address?: string;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (data: SignupData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

interface SignupData {
  email: string;
  password: string;
  name: string;
  employeeId: string;
  role: UserRole;
}

const mockUsers: Record<string, { password: string; user: User }> = {
  "admin@dayflow.com": {
    password: "admin123",
    user: {
      id: "1",
      name: "Sarah Johnson",
      email: "admin@dayflow.com",
      employeeId: "EMP001",
      role: "admin",
      department: "Human Resources",
      position: "HR Manager",
      phone: "+1 (555) 123-4567",
      address: "123 Corporate Blvd, Suite 100",
      joinDate: "2021-03-15",
    },
  },
  "employee@dayflow.com": {
    password: "employee123",
    user: {
      id: "2",
      name: "John Smith",
      email: "employee@dayflow.com",
      employeeId: "EMP002",
      role: "employee",
      department: "Engineering",
      position: "Software Developer",
      phone: "+1 (555) 987-6543",
      address: "456 Tech Avenue, Apt 12",
      joinDate: "2022-06-01",
    },
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("dayflow_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = async (email: string, password: string): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const mockUser = mockUsers[email.toLowerCase()];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem("dayflow_user", JSON.stringify(mockUser.user));
      return true;
    }
    return false;
  };

  const signup = async (data: SignupData): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      employeeId: data.employeeId,
      role: data.role,
      department: data.role === "admin" ? "Human Resources" : "General",
      position: data.role === "admin" ? "HR Officer" : "Employee",
      joinDate: new Date().toISOString().split("T")[0],
    };
    
    setUser(newUser);
    localStorage.setItem("dayflow_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dayflow_user");
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem("dayflow_user", JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
