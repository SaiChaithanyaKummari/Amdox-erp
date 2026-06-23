import { useState, useEffect } from 'react';
import { FiCalendar, FiDownload, FiFilter, FiPlus, FiCheck, FiX, FiClock, FiRefreshCw, FiSearch } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader.jsx';
import ApplyLeaveModal from '../../components/modals/ApplyLeaveModal.jsx';
import api from '../../lib/api.js';
import { exportToCSV } from '../../lib/utils.js';

export default function LeaveManagement() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const dummyRequests = [
    { id: 1, initials: 'JD', name: 'John Doe', employeeId: 'EMP001', leaveType: 'Sick Leave', fromDate: '2024-01-15', toDate: '2024-01-17', days: 3, reason: 'Medical appointment', status: 'approved' },
    { id: 2, initials: 'JS', name: 'Jane Smith', employeeId: 'EMP002', leaveType: 'Annual Leave', fromDate: '2024-02-01', toDate: '2024-02-10', days: 8, reason: 'Family vacation', status: 'pending' },
    { id: 3, initials: 'BJ', name: 'Bob Johnson', employeeId: 'EMP003', leaveType: 'Personal Leave', fromDate: '2024-01-20', toDate: '2024-01-20', days: 1, reason: 'Personal matters', status: 'approved' },
    { id: 4, initials: 'AB', name: 'Alice Brown', employeeId: 'EMP004', leaveType: 'Sick Leave', fromDate: '2024-01-25', toDate: '2024-01-26', days: 2, reason: 'Flu', status: 'pending' },
    { id: 5, initials: 'CW', name: 'Charlie Wilson', employeeId: 'EMP005', leaveType: 'Annual Leave', fromDate: '2024-03-15', toDate: '2024-03-25', days: 9, reason: 'Travel', status: 'pending' },
  ];

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await api.get('/hr/leave-requests', {
        params: {
          status: statusFilter,
          type: typeFilter
        }
      });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setRequests(response.data);
      } else {
        setRequests(dummyRequests);
      }
    } catch (error) {
      console.error('Failed to fetch leave requests:', error);
      setRequests(dummyRequests);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    let successCount = 0;
    let failCount = 0;
    for (const req of requests) {
      try {
        await api.post('/hr/leave-requests', {
          leaveType: req.leaveType.toLowerCase().split(' ')[0],
          startDate: req.fromDate,
          endDate: req.toDate,
          reason: req.reason,
          totalDays: req.days
        });
        successCount++;
      } catch (err) {
        failCount++;
      }
    }
    setLoading(false);
    if (failCount > 0) {
      alert(`Sync process complete. ${successCount} leave requests synced, ${failCount} failed (backend offline or requests already exist).`);
    } else {
      alert(`Successfully synced all ${successCount} leave requests to the backend database!`);
    }
    fetchRequests();
  };

  const handleApplyLeave = () => {
    setIsModalOpen(true);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          request.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
                          (request.reason && request.reason.toLowerCase().includes(searchText.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesType = typeFilter === 'all' || request.leaveType.toLowerCase().includes(typeFilter.toLowerCase());
    return matchesSearch && matchesStatus && matchesType;
  });

  const handleExport = () => {
    exportToCSV(filteredRequests, 'leave_requests.csv');
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      approved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      rejected: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
      cancelled: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400'
    };
    return styles[status] || styles.pending;
  };

  const handleApprove = async (id) => {
    try {
      await api.post(`/hr/leave-requests/${id}/approve`);
      fetchRequests();
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      await api.post(`/hr/leave-requests/${id}/reject`);
      fetchRequests();
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="HR"
        title="Leave Management"
        description="Review and approve employee leave requests"
        actions={
          <div className="flex gap-2">
            <button onClick={handleSync} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <FiRefreshCw className="h-4 w-4" />
              Sync to DB
            </button>
            <button onClick={handleApplyLeave} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
              <FiPlus className="h-4 w-4" />
              Apply Leave
            </button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">27</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
              <FiClock className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Approved This Month</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">84</p>
            </div>
            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <FiCheck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Rejected</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">12</p>
            </div>
            <div className="rounded-xl bg-rose-100 p-3 dark:bg-rose-900/30">
              <FiX className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">On Leave Today</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">48</p>
            </div>
            <div className="rounded-xl bg-cyan-100 p-3 dark:bg-cyan-900/30">
              <FiCalendar className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
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
                placeholder="Search requests..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="erp-focus h-11 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
              />
            </div>
          </div>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="erp-focus h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="cancelled">Cancelled</option>
            <option value="all">All Status</option>
          </select>
          <select 
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="erp-focus h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <option value="all">All Types</option>
            <option value="sick">Sick Leave</option>
            <option value="casual">Casual Leave</option>
            <option value="earned">Earned Leave</option>
            <option value="maternity">Maternity Leave</option>
            <option value="paternity">Paternity Leave</option>
          </select>
          <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <FiFilter className="h-4 w-4" />
            More Filters
          </button>
          <button onClick={handleExport} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
            <FiDownload className="h-4 w-4" />
            Export
          </button>
        </div>

        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="text-sm text-slate-500">Loading requests...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Employee</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Leave Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">From</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">To</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Days</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Reason</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-slate-500">
                      No leave requests found
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((request) => (
                    <tr key={request.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                            {request.initials}
                          </div>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-slate-100">{request.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">{request.employeeId}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{request.leaveType}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{request.fromDate}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{request.toDate}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">{request.days}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300 max-w-xs truncate">{request.reason}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(request.status)}`}>
                          {request.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {request.status === 'pending' && (
                          <div className="flex items-center justify-center gap-2">
                            <button 
                              onClick={() => handleApprove(request.id)}
                              className="erp-focus inline-flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 shadow-sm transition hover:border-emerald-400 hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400"
                            >
                              <FiCheck className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleReject(request.id)}
                              className="erp-focus inline-flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 shadow-sm transition hover:border-rose-400 hover:bg-rose-100 dark:border-rose-800 dark:bg-rose-900/30 dark:text-rose-400"
                            >
                              <FiX className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ApplyLeaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newRequest) => {
          if (newRequest) {
            setRequests([newRequest, ...requests]);
          } else {
            fetchRequests();
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
