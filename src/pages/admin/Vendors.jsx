import { useState, useEffect } from 'react';
import { FiBriefcase, FiDownload, FiFilter, FiPlus, FiSearch, FiEdit, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader.jsx';
import { exportToCSV } from '../../lib/utils.js';

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');

  const fetchVendors = () => {
    setLoading(true);
    setVendors([
      { id: 1, name: 'Tech Solutions Inc', code: 'V001', category: 'IT Equipment', email: 'contact@techsolutions.com', phone: '+91 98765 43210', location: 'Mumbai', totalOrders: 45, totalSpend: 1250000, status: 'active' },
      { id: 2, name: 'Office Supplies Co', code: 'V002', category: 'Office Supplies', email: 'orders@officesupplies.com', phone: '+91 98765 43211', location: 'Delhi', totalOrders: 120, totalSpend: 850000, status: 'active' },
      { id: 3, name: 'Industrial Equipment Ltd', code: 'V003', category: 'Manufacturing', email: 'sales@industrial.com', phone: '+91 98765 43212', location: 'Chennai', totalOrders: 32, totalSpend: 2100000, status: 'active' },
      { id: 4, name: 'Global Logistics', code: 'V004', category: 'Logistics', email: 'info@globallogistics.com', phone: '+91 98765 43213', location: 'Bangalore', totalOrders: 67, totalSpend: 540000, status: 'pending' },
      { id: 5, name: 'Safety First Supplies', code: 'V005', category: 'Safety Equipment', email: 'orders@safetyfirst.com', phone: '+91 98765 43214', location: 'Pune', totalOrders: 28, totalSpend: 320000, status: 'active' },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          vendor.code.toLowerCase().includes(searchText.toLowerCase()) ||
                          vendor.category.toLowerCase().includes(searchText.toLowerCase()) ||
                          vendor.location.toLowerCase().includes(searchText.toLowerCase());
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    exportToCSV(filteredVendors, 'vendors.csv');
  };

  const getStatusBadge = (status) => {
    const styles = {
      active: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
      blocked: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
      pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
    };
    return styles[status] || styles.active;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Supply Chain"
        title="Vendors"
        description="Manage vendor master data, contracts, and performance"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Vendors</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">84</p>
            </div>
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
              <FiBriefcase className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Active</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">72</p>
            </div>
            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <FiBriefcase className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Pending Approval</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">8</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
              <FiBriefcase className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Top Rated</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">24</p>
            </div>
            <div className="rounded-xl bg-cyan-100 p-3 dark:bg-cyan-900/30">
              <FiBriefcase className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
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
                placeholder="Search vendors..."
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
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="blocked">Blocked</option>
            <option value="pending">Pending</option>
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
            <div className="text-sm text-slate-500">Loading vendors...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Vendor</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Location</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Total Orders</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Total Spend</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-slate-500">
                      No vendors found
                    </td>
                  </tr>
                ) : (
                  filteredVendors.map((vendor) => (
                    <tr key={vendor.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-3">
                        <div>
                          <p className="font-medium text-slate-900 dark:text-slate-100">{vendor.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">{vendor.code}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{vendor.category}</td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <FiMail className="h-3 w-3" />
                            <span className="text-xs">{vendor.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                            <FiPhone className="h-3 w-3" />
                            <span className="text-xs">{vendor.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                          <FiMapPin className="h-3 w-3" />
                          <span className="text-xs">{vendor.location}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">{vendor.totalOrders}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">₹{vendor.totalSpend.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(vendor.status)}`}>
                          {vendor.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="erp-focus inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                          <FiEdit className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
