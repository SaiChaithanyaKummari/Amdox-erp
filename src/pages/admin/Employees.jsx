import { useState, useEffect } from 'react';
import { FiUsers, FiDownload, FiFilter, FiPlus, FiSearch, FiEdit, FiTrash2, FiMail, FiPhone, FiRefreshCw } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader.jsx';
import AddEmployeeModal from '../../components/modals/AddEmployeeModal.jsx';
import api from '../../lib/api.js';
import { exportToCSV } from '../../lib/utils.js';
import useAuthStore from '../../stores/useAuthStore.js';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = useAuthStore((state) => state.user);
  const userRole = currentUser?.role?.toLowerCase() || 'admin';
  const isHRorAdmin = userRole === 'hr' || userRole === 'admin';

  // Dummy employee data for demo purposes
  const dummyEmployees = [
    { id: 1, employeeId: 'EMP001', name: 'Maya Williams', initials: 'MW', email: 'maya.williams@amdox.com', phone: '+91 98765 43210', department: 'Engineering', role: 'Senior Developer', joinDate: '2023-01-15', status: 'active' },
    { id: 2, employeeId: 'EMP002', name: 'John Smith', initials: 'JS', email: 'john.smith@amdox.com', phone: '+91 98765 43211', department: 'Sales', role: 'Sales Manager', joinDate: '2023-02-20', status: 'active' },
    { id: 3, employeeId: 'EMP003', name: 'Sarah Johnson', initials: 'SJ', email: 'sarah.johnson@amdox.com', phone: '+91 98765 43212', department: 'Marketing', role: 'Marketing Lead', joinDate: '2023-03-10', status: 'active' },
    { id: 4, employeeId: 'EMP004', name: 'Michael Brown', initials: 'MB', email: 'michael.brown@amdox.com', phone: '+91 98765 43213', department: 'HR', role: 'HR Manager', joinDate: '2023-04-05', status: 'active' },
    { id: 5, employeeId: 'EMP005', name: 'Emily Davis', initials: 'ED', email: 'emily.davis@amdox.com', phone: '+91 98765 43214', department: 'Finance', role: 'Financial Analyst', joinDate: '2023-05-12', status: 'active' },
    { id: 6, employeeId: 'EMP006', name: 'David Wilson', initials: 'DW', email: 'david.wilson@amdox.com', phone: '+91 98765 43215', department: 'Engineering', role: 'DevOps Engineer', joinDate: '2023-06-18', status: 'on_leave' },
    { id: 7, employeeId: 'EMP007', name: 'Lisa Anderson', initials: 'LA', email: 'lisa.anderson@amdox.com', phone: '+91 98765 43216', department: 'Sales', role: 'Sales Executive', joinDate: '2023-07-22', status: 'active' },
    { id: 8, employeeId: 'EMP008', name: 'Robert Taylor', initials: 'RT', email: 'robert.taylor@amdox.com', phone: '+91 98765 43217', department: 'Marketing', role: 'Content Writer', joinDate: '2023-08-30', status: 'inactive' },
    { id: 9, employeeId: 'EMP009', name: 'Jennifer Martinez', initials: 'JM', email: 'jennifer.martinez@amdox.com', phone: '+91 98765 43218', department: 'Engineering', role: 'QA Engineer', joinDate: '2023-09-14', status: 'active' },
    { id: 10, employeeId: 'EMP010', name: 'Christopher Lee', initials: 'CL', email: 'christopher.lee@amdox.com', phone: '+91 98765 43219', department: 'Finance', role: 'Accountant', joinDate: '2023-10-25', status: 'active' },
  ];

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const response = await api.get('/hr/employees', {
        params: {
          search: searchTerm,
          department: departmentFilter,
          status: statusFilter
        }
      });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setEmployees(response.data);
      } else {
        setEmployees(dummyEmployees);
      }
    } catch (error) {
      console.error('Failed to fetch employees:', error);
      // Use dummy data when API fails
      setEmployees(dummyEmployees);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    let successCount = 0;
    let failCount = 0;
    for (const emp of employees) {
      try {
        await api.post('/hr/employees', {
          firstName: emp.name.split(' ')[0] || '',
          lastName: emp.name.split(' ').slice(1).join(' ') || '',
          email: emp.email,
          phone: emp.phone,
          department: emp.department,
          position: emp.role,
          salary: 50000,
          joinDate: emp.joinDate,
        });
        successCount++;
      } catch (err) {
        failCount++;
      }
    }
    setLoading(false);
    if (failCount > 0) {
      alert(`Sync process complete. ${successCount} employees synced, ${failCount} failed (backend offline or employees already exist).`);
    } else {
      alert(`Successfully synced all ${successCount} employees to the backend database!`);
    }
    fetchEmployees();
  };

  const handleAddEmployee = () => {
    setIsModalOpen(true);
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'all' || employee.department.toLowerCase() === departmentFilter.toLowerCase();
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleExport = () => {
    exportToCSV(filteredEmployees, 'employees.csv');
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
      on_leave: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      terminated: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    };
    return styles[status] || styles.active;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="HR"
        title="Employees"
        description="Manage employee records, contracts, and organizational structure"
        actions={
          isHRorAdmin && (
            <div className="flex gap-2">
              <button onClick={handleSync} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <FiRefreshCw className="h-4 w-4" />
                Sync to DB
              </button>
              <button onClick={handleAddEmployee} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
                <FiPlus className="h-4 w-4" />
                Add Employee
              </button>
            </div>
          )
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Employees</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">1,284</p>
            </div>
            <div className="rounded-xl bg-orange-100/60 p-3 dark:bg-blue-900/30">
              <FiUsers className="h-6 w-6 text-orange-500 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Active</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">1,112</p>
            </div>
            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <FiUsers className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">On Leave</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">48</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
              <FiUsers className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">New This Month</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">24</p>
            </div>
            <div className="rounded-xl bg-cyan-100 p-3 dark:bg-cyan-900/30">
              <FiUsers className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search employees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="erp-focus h-11 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
              />
            </div>
          </div>
          <select 
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="erp-focus h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <option value="all">All Departments</option>
            <option value="engineering">Engineering</option>
            <option value="sales">Sales</option>
            <option value="marketing">Marketing</option>
            <option value="hr">HR</option>
            <option value="finance">Finance</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="erp-focus h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="on_leave">On Leave</option>
            <option value="terminated">Terminated</option>
          </select>
          <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <FiFilter className="h-4 w-4" />
            Filters
          </button>
          <button onClick={handleExport} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-sm text-slate-500">Loading employees...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Employee</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Department</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Role</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Join Date</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Status</th>
                  {isHRorAdmin && <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan={isHRorAdmin ? 7 : 6} className="px-4 py-12 text-center text-slate-500">
                      No employees found
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((employee) => (
                    <tr key={employee.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                            {employee.initials}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{employee.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{employee.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{employee.department}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{employee.role}</td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <FiMail className="h-3 w-3" />
                            <span className="text-xs">{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <FiPhone className="h-3 w-3" />
                            <span className="text-xs">{employee.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{employee.joinDate}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(employee.status)}`}>
                          {employee.status}
                        </span>
                      </td>
                      {isHRorAdmin && (
                        <td className="px-4 py-3 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button className="erp-focus inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                              <FiEdit className="h-4 w-4" />
                            </button>
                            <button className="erp-focus inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-600 shadow-sm transition hover:border-rose-400 hover:text-rose-600 dark:border-slate-800 dark:bg-slate-900 dark:text-rose-400">
                              <FiTrash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddEmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newEmployee) => {
          if (newEmployee) {
            setEmployees([newEmployee, ...employees]);
          } else {
            fetchEmployees();
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
