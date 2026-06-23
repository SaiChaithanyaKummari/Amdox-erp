import { FiBriefcase, FiCalendar, FiCheckSquare, FiDownload, FiUserCheck } from "react-icons/fi";
import AttendanceChart from "../../components/dashboard/AttendanceChart.jsx";
import RecentTasks from "../../components/dashboard/RecentTasks.jsx";
import StatCard from "../../components/dashboard/StatCard.jsx";
import TaskChart from "../../components/dashboard/TaskChart.jsx";
import PageHeader from "../../components/common/PageHeader.jsx";
import { statCards } from "../../data/dashboardData.js";

const iconMap = {
  attendance: FiUserCheck,
  leave: FiCalendar,
  projects: FiBriefcase,
  tasks: FiCheckSquare,
};

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Employee Dashboard"
        title="My Work Hub"
        description="View assigned tasks, attendance, leave balance, and current project workload."
        actions={
          <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.employee.map((card) => (
          <StatCard key={card.label} {...card} icon={iconMap[card.icon]} />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.9fr]">
        <AttendanceChart />
        <TaskChart />
      </section>

      <RecentTasks />
    </div>
  );
}
