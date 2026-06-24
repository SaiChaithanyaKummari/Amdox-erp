import { FiBell, FiAlertTriangle, FiCheckCircle, FiInfo, FiDollarSign, FiUser, FiPackage } from 'react-icons/fi';
import { useState } from 'react';

export default function NotificationsPanel() {
  const [notifications] = useState([
    { id: 1, type: 'warning', message: 'Inventory below threshold for Laptops', time: '5 min ago', icon: FiPackage },
    { id: 2, type: 'success', message: 'Payroll processing completed', time: '15 min ago', icon: FiCheckCircle },
    { id: 3, type: 'info', message: 'New leave request from John Smith', time: '1 hour ago', icon: FiUser },
    { id: 4, type: 'error', message: 'Invoice #INV-001 is overdue', time: '2 hours ago', icon: FiDollarSign },
    { id: 5, type: 'info', message: 'System maintenance scheduled', time: '3 hours ago', icon: FiInfo },
  ]);

  const getNotificationStyles = (type) => {
    const styles = {
      warning: { bg: 'bg-amber-50 dark:bg-amber-900/20', icon: 'text-amber-600 dark:text-amber-400', dot: 'bg-amber-500' },
      success: { bg: 'bg-emerald-50 dark:bg-emerald-900/20', icon: 'text-emerald-600 dark:text-emerald-400', dot: 'bg-emerald-500' },
      info: { bg: 'bg-orange-50 dark:bg-blue-900/20', icon: 'text-orange-500 dark:text-blue-400', dot: 'bg-orange-500' },
      error: { bg: 'bg-rose-50 dark:bg-rose-900/20', icon: 'text-rose-600 dark:text-rose-400', dot: 'bg-rose-500' },
    };
    return styles[type] || styles.info;
  };

  const getIcon = (type) => {
    const icons = {
      warning: FiAlertTriangle,
      success: FiCheckCircle,
      info: FiInfo,
      error: FiAlertTriangle,
    };
    return icons[type] || FiInfo;
  };

  return (
    <article className="erp-panel rounded-xl p-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-slate-600">Notifications</h4>
        <div className="relative">
          <FiBell className="h-4 w-4 text-slate-400" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-rose-500" />
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {notifications.map((notification) => {
          const styles = getNotificationStyles(notification.type);
          const Icon = notification.icon || getIcon(notification.type);

          return (
            <div
              key={notification.id}
              className={`flex items-start gap-3 rounded-lg p-3 transition hover:opacity-80 ${styles.bg}`}
            >
              <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${styles.icon}`} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">{notification.message}</p>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{notification.time}</p>
              </div>
              <span className={`h-2 w-2 shrink-0 rounded-full ${styles.dot}`} />
            </div>
          );
        })}
      </div>

      <button className="mt-3 w-full rounded-lg border border-slate-200 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:text-slate-300">
        View All Notifications
      </button>
    </article>
  );
}
