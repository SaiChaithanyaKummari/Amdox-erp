import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronLeft, FiChevronRight, FiX, FiSearch } from "react-icons/fi";
import logo from "../../assets/logo.png";

const CATEGORY_ORDER = [
  "DASHBOARDS",
  "WORK MANAGEMENT",
  "FINANCE & PAYROLL",
  "PEOPLE & HR",
  "SUPPLY CHAIN",
  "SETTINGS",
  "OTHER"
];

const getCategory = (item) => {
  const label = item.label.toLowerCase();

  if (label === "dashboard" || label === "overview") return "DASHBOARDS";
  if (label === "projects" || label === "tasks" || label === "my tasks") return "WORK MANAGEMENT";
  
  if (label === "general ledger" || 
      label === "accounts payable" || 
      label === "accounts receivable" || 
      label === "financial reports" || 
      label === "payroll") return "FINANCE & PAYROLL";
      
  if (label === "employees" || 
      label === "attendance" || 
      label === "leave management" || 
      label === "leave requests" || 
      label === "team members" || 
      label === "apply leave" || 
      label === "profile" ||
      label === "register user") return "PEOPLE & HR";
      
  if (label === "purchase orders" || 
      label === "vendors" || 
      label === "inventory") return "SUPPLY CHAIN";
      
  if (label === "settings") return "SETTINGS";
  
  return "OTHER";
};

export default function Sidebar({
  isCollapsed,
  isMobileOpen,
  items,
  onCloseMobile,
  onToggleCollapse,
  roleLabel,
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredItems = items.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groupedItems = CATEGORY_ORDER.map(catName => ({
    categoryName: catName,
    items: filteredItems.filter(item => getCategory(item) === catName)
  })).filter(g => g.items.length > 0);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm transition-opacity lg:hidden ${
          isMobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
        aria-hidden="true"
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-800/40 bg-[#0c1921] transition-all duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "lg:w-20" : "lg:w-72"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-800/40 px-4">
          <NavLink to="/" className="flex min-w-0 items-center gap-3" onClick={onCloseMobile}>
            <img src={logo} alt="AMDOX ERP" className="h-10 w-10 shrink-0 rounded-xl object-cover shadow-md border border-white/10" />
            <span
              className={`min-w-0 transition-opacity duration-200 ${
                isCollapsed ? "lg:hidden" : ""
              }`}
            >
              <span className="block truncate text-sm font-extrabold text-white">
                AMDOX ERP
              </span>
              <span className="block truncate text-xs font-medium text-slate-400">
                {roleLabel} Portal
              </span>
            </span>
          </NavLink>

          <button
            type="button"
            onClick={onCloseMobile}
            className="erp-focus inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
            aria-label="Close navigation"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Search menu options */}
        {!isCollapsed && (
          <div className="px-3 pt-4">
            <div className="relative">
              <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 w-full rounded-lg border border-slate-850 bg-white/5 pl-9 pr-3 text-xs text-white placeholder:text-slate-500 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </div>
          </div>
        )}

        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
          {groupedItems.map((group, groupIdx) => (
            <div key={group.categoryName} className="space-y-1">
              {!isCollapsed ? (
                <div className="px-3 mb-2">
                  <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                    {group.categoryName}
                  </span>
                </div>
              ) : (
                groupIdx > 0 && <hr className="border-slate-800/40 my-3" />
              )}
              {group.items.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.path}
                    onClick={onCloseMobile}
                    title={isCollapsed ? item.label : undefined}
                    className={({ isActive }) =>
                      [
                        "group flex min-h-[40px] items-center gap-3 rounded-lg px-3 text-sm font-semibold transition",
                        isCollapsed ? "lg:justify-center" : "",
                        isActive
                          ? "bg-primary text-white shadow-md shadow-primary/10"
                          : "text-slate-400 hover:bg-white/5 hover:text-white",
                      ].join(" ")
                    }
                  >
                    <Icon className="h-4.5 w-4.5 shrink-0" />
                    <span className={`truncate ${isCollapsed ? "lg:hidden" : ""}`}>
                      {item.label}
                    </span>
                  </NavLink>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="border-t border-slate-800/40 p-3">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="erp-focus hidden min-h-[40px] w-full items-center justify-center gap-3 rounded-lg border border-slate-800/50 bg-[#10222d] px-3 text-sm font-semibold text-slate-400 transition hover:border-primary/40 hover:text-white lg:flex"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <FiChevronRight className="h-5 w-5" />
            ) : (
              <>
                <FiChevronLeft className="h-5 w-5" />
                <span>Collapse</span>
              </>
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
