import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBell,
  FiChevronDown,
  FiCheckSquare,
  FiDollarSign,
  FiFileText,
  FiLogOut,
  FiMenu,
  FiMoon,
  FiSearch,
  FiSettings,
  FiSun,
  FiUser,
  FiCalendar,
} from "react-icons/fi";
import useAuthStore from "../../stores/useAuthStore.js";

export default function Navbar({ user: propUser, workspace, onOpenSidebar }) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const authUser = useAuthStore((state) => state.user);

  // Compute dynamic user details based on logged-in user
  const user = authUser ? {
    ...propUser,
    name: authUser.name || propUser?.name || 'User',
    role: authUser.role ? authUser.role.charAt(0).toUpperCase() + authUser.role.slice(1) : propUser?.role || 'Member',
    initials: authUser.name ? authUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : propUser?.initials || 'U'
  } : propUser;

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false;
    const storedTheme = window.localStorage.getItem("amdox-theme");
    if (storedTheme) return storedTheme === "dark";
    return false; // Default to light mode
  });

  const handleSignOut = () => {
    logout();
    navigate("/login");
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    const role = authUser?.role?.toLowerCase() || 'admin';
    navigate(`/${role}/settings?tab=profile`);
    setIsProfileOpen(false);
  };

  const handleAccountSettingsClick = () => {
    const role = authUser?.role?.toLowerCase() || 'admin';
    navigate(`/${role}/settings?tab=account`);
    setIsProfileOpen(false);
  };

  const handleNotificationClick = (notification) => {
    setIsNotificationOpen(false);
    const role = authUser?.role?.toLowerCase() || 'admin';
    switch (notification.type) {
      case 'invoice':
        if (role === 'admin') navigate('/admin/accounts-payable');
        else if (role === 'hr') navigate('/hr/payroll');
        break;
      case 'leave':
        if (role === 'admin') navigate('/admin/leave-management');
        else if (role === 'hr') navigate('/hr/leave-requests');
        else if (role === 'employee') navigate('/employee/apply-leave');
        break;
      case 'task':
        if (role === 'admin') navigate('/admin/tasks');
        else if (role === 'manager') navigate('/manager/tasks');
        else if (role === 'employee') navigate('/employee/my-tasks');
        break;
      case 'expense':
        if (role === 'admin') navigate('/admin/general-ledger');
        break;
      case 'meeting':
        // For now, just close the notification
        break;
      default:
        break;
    }
  };

  const notifications = [
    { id: 1, type: 'invoice', title: 'New Invoice Received', message: 'Invoice #INV-001 from Tech Solutions', time: '5 minutes ago', unread: true },
    { id: 2, type: 'leave', title: 'Leave Request', message: 'John Doe requested leave for 3 days', time: '1 hour ago', unread: true },
    { id: 3, type: 'task', title: 'Task Assigned', message: 'You have been assigned to Project Alpha', time: '2 hours ago', unread: true },
    { id: 4, type: 'expense', title: 'Expense Approved', message: 'Your expense claim of ₹5,000 was approved', time: '3 hours ago', unread: false },
    { id: 5, type: 'meeting', title: 'Meeting Reminder', message: 'Team standup meeting in 30 minutes', time: '4 hours ago', unread: false },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem("amdox-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/50 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="erp-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary lg:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          aria-label="Open navigation"
        >
          <FiMenu className="h-5 w-5" />
        </button>

        <div className="hidden min-w-0 flex-col md:flex">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Workspace
          </span>
          <span className="truncate text-sm font-semibold text-slate-800 dark:text-slate-100">
            {workspace}
          </span>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search employees, projects, tasks..."
            className="erp-focus h-11 w-full rounded-xl border border-slate-200/60 bg-slate-100 pl-10 pr-4 text-sm text-slate-800 transition placeholder:text-slate-400 focus:bg-white dark:border-slate-850 dark:bg-slate-900 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsNotificationOpen((current) => !current)}
              className="erp-focus relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              aria-label="Notifications"
              title="Notifications"
            >
              <FiBell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-danger dark:border-slate-900" />
            </button>

            {isNotificationOpen ? (
              <div className="absolute right-0 mt-3 w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</p>
                    <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">3 New</span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => {
                    const getIcon = (type) => {
                      switch (type) {
                        case 'invoice': return FiFileText;
                        case 'leave': return FiCalendar;
                        case 'task': return FiCheckSquare;
                        case 'expense': return FiDollarSign;
                        case 'meeting': return FiCalendar;
                        default: return FiBell;
                      }
                    };
                    const Icon = getIcon(notification.type);
                    return (
                      <button
                        key={notification.id}
                        onClick={() => handleNotificationClick(notification)}
                        className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 ${notification.unread ? 'bg-orange-50/50 dark:bg-blue-900/10' : ''}`}
                      >
                        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${notification.unread ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${notification.unread ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>
                            {notification.title}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                            {notification.time}
                          </p>
                        </div>
                        {notification.unread && (
                          <div className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="border-t border-slate-100 px-4 py-2 dark:border-slate-800">
                  <button className="w-full rounded-lg px-3 py-2 text-center text-sm font-semibold text-primary transition hover:bg-orange-50 dark:hover:bg-blue-900/20">
                    Mark All as Read
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <button
            type="button"
            onClick={() => setIsDarkMode((current) => !current)}
            className="erp-focus inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Toggle dark mode"
            title="Toggle dark mode"
          >
            {isDarkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
          </button>

          <div className="relative">
            <button
              type="button"
              onClick={() => setIsProfileOpen((current) => !current)}
              className="erp-focus flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white pl-1.5 pr-2 shadow-sm transition hover:border-primary/40 dark:border-slate-800 dark:bg-slate-900"
              aria-expanded={isProfileOpen}
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">
                {user.initials}
              </span>
              <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-700 sm:inline dark:text-slate-200">
                {user.name}
              </span>
              <FiChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
            </button>

            {isProfileOpen ? (
              <div className="absolute right-0 mt-3 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-soft dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-100 px-3 py-3 dark:border-slate-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{user.role}</p>
                </div>
                <button onClick={handleProfileClick} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800">
                  <FiUser className="h-4 w-4" />
                  Profile
                </button>
                <button onClick={handleAccountSettingsClick} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-600 transition hover:bg-slate-50 hover:text-primary dark:text-slate-300 dark:hover:bg-slate-800">
                  <FiSettings className="h-4 w-4" />
                  Account Settings
                </button>
                <button 
                  onClick={handleSignOut}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-danger transition hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  <FiLogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
