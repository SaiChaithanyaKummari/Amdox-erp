import { FiBarChart2, FiBriefcase, FiCheckSquare, FiDownload, FiUserCheck } from "react-icons/fi";
import ProjectChart from "../../components/dashboard/ProjectChart.jsx";
import RecentEmployees from "../../components/dashboard/RecentEmployees.jsx";
import RecentTasks from "../../components/dashboard/RecentTasks.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import TaskChart from "../../components/dashboard/TaskChart.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import { statCards } from "../../data/dashboardData.js";

const iconMap = {
  projects: FiBriefcase,
  reports: FiBarChart2,
  tasks: FiCheckSquare,
  team: FiUserCheck,
};

export default function ManagerDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Manager Dashboard"
        title="Delivery Command Center"
        description="Keep project progress, team capacity, and priority tasks aligned from one workspace."
        actions={
          <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.manager.map((card) => (
          <StatCard key={card.label} {...card} icon={iconMap[card.icon]} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.35fr]">
        <ProjectChart />
        <RecentTasks />
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <TaskChart />
        <RecentEmployees />
      </section>
    </div>
  );
}
