import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  FiBarChart2,
  FiBriefcase,
  FiCalendar,
  FiCheckSquare,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiEdit3,
  FiGrid,
  FiPackage,
  FiSettings,
  FiUser,
  FiUserCheck,
  FiUsers,
} from "react-icons/fi";
import Footer from "../components/common/Footer.jsx";
import Navbar from "../components/common/Navbar.jsx";
import Sidebar from "../components/common/Sidebar.jsx";
import { roleConfigs } from "../data/dashboardData.js";

const iconMap = {
  attendance: FiClock,
  dashboard: FiGrid,
  employees: FiUsers,
  expenses: FiCreditCard,
  inventory: FiPackage,
  leave: FiCalendar,
  payroll: FiCreditCard,
  profile: FiUser,
  projects: FiBriefcase,
  reports: FiBarChart2,
  revenue: FiDollarSign,
  settings: FiSettings,
  tasks: FiCheckSquare,
  team: FiUserCheck,
  vendors: FiUsers,
  edit: FiEdit3,
};

export default function RoleLayout({ role }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const config = roleConfigs[role] || roleConfigs.admin;

  const items = useMemo(
    () =>
      config?.navItems?.map((item) => ({
        ...item,
        icon: iconMap[item.icon] ?? FiGrid,
      })) || [],
    [config?.navItems],
  );

  return (
    <div className="min-h-screen bg-background text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <Sidebar
        isCollapsed={isCollapsed}
        isMobileOpen={isMobileOpen}
        items={items}
        onCloseMobile={() => setIsMobileOpen(false)}
        onToggleCollapse={() => setIsCollapsed((current) => !current)}
        roleLabel={config.label}
      />

      <div className={`min-h-screen transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <Navbar
          user={config.user}
          workspace={config.workspace}
          onOpenSidebar={() => setIsMobileOpen(true)}
        />
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet context={{ role, roleConfig: config }} />
          <Footer />
        </main>
      </div>
    </div>
  );
}
