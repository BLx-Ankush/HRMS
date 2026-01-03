# Dayflow - Modern HR Management Platform

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-cyan.svg)](https://tailwindcss.com/)

Dayflow is a comprehensive Human Resource Management System (HRMS) built with modern web technologies. It streamlines HR operations with comprehensive employee management, attendance tracking, leave management, and payroll visibility—all in one platform.

## 🚀 Features

### Core Functionality
- **📊 Dashboard** - Comprehensive overview with key metrics and analytics
- **👥 Employee Management** - Complete employee database with profiles and information
- **⏰ Attendance Tracking** - Real-time attendance monitoring and reporting
- **🏖️ Leave Management** - Leave requests, approvals, and balance tracking
- **💰 Payroll System** - Salary information and payroll management
- **⏱️ Time Off Management** - Vacation and time-off request handling

### User Experience
- **🎨 Modern UI/UX** - Clean, intuitive interface built with shadcn/ui components
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **🔐 Authentication System** - Secure login and user management
- **✏️ Profile Management** - Comprehensive user profiles with editing capabilities
- **🌙 Dark Mode Support** - Modern theming system
- **⚡ Fast Performance** - Built with Vite for lightning-fast development and build times

### Technical Features
- **🔧 Component Library** - Reusable UI components with shadcn/ui
- **📋 Form Handling** - Advanced form management with validation
- **🎯 State Management** - Efficient state handling with React Context
- **🔄 Real-time Updates** - Dynamic data updates without page refreshes
- **📊 Data Visualization** - Charts and analytics for HR insights

## 🛠️ Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui, Radix UI
- **Icons:** Lucide React
- **Form Handling:** React Hook Form
- **State Management:** React Context API
- **Date Handling:** date-fns
- **Package Manager:** npm/bun

## 📦 Installation

### Prerequisites
- Node.js 18+ or Bun runtime
- npm, yarn, or bun package manager

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/BLx-Ankush/HRMS.git
   cd HRMS
   ```

2. **Install dependencies**
   ```bash
   # Using npm
   npm install
   
   # Using bun (recommended)
   bun install
   ```

3. **Start the development server**
   ```bash
   # Using npm
   npm run dev
   
   # Using bun
   bun run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:8080` to view the application

## 🌐 Live Demo

### Deployment
The application is deployed and live on **Vercel** for easy access and testing.

**🔗 Live URL:** [https://hrms-one-phi.vercel.app/](https://hrms-one-phi.vercel.app/)

### Demo Accounts
We've created demo accounts for you to explore all features without setting up your own data:

#### 👨‍💼 Admin Access
- **Role:** Administrator
- **Access:** Full system access including employee management, payroll, and admin settings
- **Features:** Complete HR dashboard, analytics, and administrative controls

#### 👤 Employee Access  
- **Role:** Employee
- **Access:** Personal dashboard, attendance tracking, leave requests, and profile management
- **Features:** Employee self-service portal and personal HR tools

*Demo credentials are available on the sign-in page*

### 🚀 Future Enhancements
This project is under active development! Upcoming features and improvements include:
- Advanced analytics and reporting
- Mobile app development  
- Integration with third-party HR tools
- Enhanced security features
- Multi-language support
- Advanced workflow automation

*Stay tuned for exciting updates and new features!*


## 🎯 Usage

### Getting Started
1. **Landing Page:** Visit the home page to learn about Dayflow's features
2. **Authentication:** Sign in with demo credentials or create a new account
3. **Dashboard:** Access the main dashboard for an overview of HR metrics
4. **Navigation:** Use the sidebar to navigate between different modules

### Key Modules

#### Employee Management
- Add new employees with complete information
- View employee directory with search and filter options
- Manage employee profiles and personal details

#### Attendance System
- Clock in/out functionality
- View attendance history and reports
- Track working hours and overtime

#### Leave Management
- Submit leave requests
- Manager approval workflow
- Leave balance tracking
- Calendar view of team availability

#### Payroll & Salary
- View salary information
- Download pay slips
- Tax and benefits information
- Payroll processing tools

#### Profile Management
- Edit personal information (mobile, location)
- Manage private information (emergency contacts, etc.)
- Update skills and about section
- Upload resume and documents

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── layout/         # Layout components (sidebar, navigation)
│   └── NavLink.tsx     # Navigation components
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
│   ├── use-mobile.tsx  # Mobile detection hook
│   └── use-toast.ts    # Toast notification hook
├── lib/                # Utility functions
│   └── utils.ts        # Common utilities
├── pages/              # Main application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Employees.tsx   # Employee management
│   ├── Attendance.tsx  # Attendance tracking
│   ├── Leave.tsx       # Leave management
│   ├── Payroll.tsx     # Payroll system
│   ├── Profile.tsx     # User profile
│   ├── TimeOff.tsx     # Time off management
│   ├── SalaryInfo.tsx  # Salary information
│   ├── SignIn.tsx      # Login page
│   ├── SignUp.tsx      # Registration page
│   └── Index.tsx       # Landing page
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Quality
- **TypeScript** - Full type safety
- **ESLint** - Code linting and formatting
- **Component Structure** - Modular, reusable components
- **Responsive Design** - Mobile-first approach

## 🎨 Customization

### Theming
The application uses Tailwind CSS with a custom design system. You can customize:
- Color schemes in `tailwind.config.ts`
- Component styles in individual component files
- Global styles in `src/index.css`

### Components
All UI components are built with shadcn/ui and can be customized:
- Modify existing components in `src/components/ui/`
- Add new components using the shadcn CLI
- Customize styling with Tailwind utilities

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write descriptive commit messages
- Add proper documentation for new features
- Ensure responsive design compatibility
- Test on multiple browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the icon set
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ by the Team: " THE HONOURED ONES"**
