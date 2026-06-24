import { useState } from "react";
import {
  FiBriefcase,
  FiCheckSquare,
  FiDownload,
  FiPackage,
  FiUsers,
  FiDollarSign,
  FiCreditCard,
  FiUserCheck,
  FiShoppingCart,
} from "react-icons/fi";
import AttendanceChart from "../../components/dashboard/AttendanceChart.jsx";
import ProjectChart from "../../components/dashboard/ProjectChart.jsx";
import RecentEmployees from "../../components/dashboard/RecentEmployees.jsx";
import RecentTasks from "../../components/dashboard/RecentTasks.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import TaskChart from "../../components/dashboard/TaskChart.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import RunForecastModal from "../../components/modals/RunForecastModal.jsx";
import { statCards } from "../../data/dashboardData.js";
// new dashboard widgets (scaffolded)
import AIForecast from "../../components/dashboard/AIForecast.jsx";
import FinanceOverview from "../../components/dashboard/FinanceOverview.jsx";
import InventoryIntelligence from "../../components/dashboard/InventoryIntelligence.jsx";
import EmployeeAnalytics from "../../components/dashboard/EmployeeAnalytics.jsx";
import RecentActivities from "../../components/dashboard/RecentActivities.jsx";
import PendingApprovals from "../../components/dashboard/PendingApprovals.jsx";
import NotificationsPanel from "../../components/dashboard/NotificationsPanel.jsx";
import QuickActions from "../../components/dashboard/QuickActions.jsx";
import SystemStatus from "../../components/dashboard/SystemStatus.jsx";

const iconMap = {
  employees: FiUsers,
  inventory: FiPackage,
  projects: FiBriefcase,
  tasks: FiCheckSquare,
  revenue: FiDollarSign,
  expenses: FiCreditCard,
  payroll: FiUserCheck,
  purchaseOrders: FiShoppingCart,
};

export default function AdminDashboard() {
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Admin Dashboard"
        title="Enterprise Operations Overview"
        description="Monitor people, delivery, inventory, and operational workload across AMDOX ERP."
        actions={
          <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.admin.map((card) => (
          <StatCard key={card.label} {...card} icon={iconMap[card.icon]} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <AIForecast />
        <FinanceOverview />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <AttendanceChart />
        <TaskChart />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <ProjectChart />
        <RecentTasks />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <InventoryIntelligence />
        <PendingApprovals />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <EmployeeAnalytics />
        <RecentActivities />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.45fr]">
        <RecentEmployees />
        <div className="space-y-4">
          <NotificationsPanel />
          <QuickActions />
          <SystemStatus />
        </div>
      </section>

      <RunForecastModal
        isOpen={isForecastModalOpen}
        onClose={() => setIsForecastModalOpen(false)}
        onSuccess={() => setIsForecastModalOpen(false)}
      />
    </div>
  );
}
