import { useState, useEffect } from 'react';
import { FiDollarSign, FiDownload, FiFilter, FiPlus, FiSearch, FiCheck, FiClock } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader.jsx';
import GenerateInvoiceModal from '../../components/modals/GenerateInvoiceModal.jsx';
import api from '../../lib/api.js';
import { exportToCSV } from '../../lib/utils.js';

export default function AccountsReceivable() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchInvoices = () => {
    setLoading(true);
    setInvoices([
      { id: 1, invoiceNumber: 'AR-001', customer: 'Acme Corp', poNumber: 'PO-1001', issueDate: '2024-01-01', dueDate: '2024-01-15', amount: 85000, paidAmount: 0, status: 'pending' },
      { id: 2, invoiceNumber: 'AR-002', customer: 'Beta Industries', poNumber: 'PO-1002', issueDate: '2024-01-05', dueDate: '2024-01-20', amount: 42000, paidAmount: 42000, status: 'paid' },
      { id: 3, invoiceNumber: 'AR-003', customer: 'Gamma Solutions', poNumber: 'PO-1003', issueDate: '2024-01-10', dueDate: '2024-01-25', amount: 67000, paidAmount: 0, status: 'pending' },
      { id: 4, invoiceNumber: 'AR-004', customer: 'Delta Services', poNumber: 'PO-1004', issueDate: '2024-01-12', dueDate: '2024-01-30', amount: 34000, paidAmount: 34000, status: 'paid' },
      { id: 5, invoiceNumber: 'AR-005', customer: 'Epsilon Tech', poNumber: 'PO-1005', issueDate: '2024-01-15', dueDate: '2024-02-05', amount: 56000, paidAmount: 10000, status: 'partial' },
    ]);
    setLoading(false);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleNewInvoice = () => {
    setIsModalOpen(true);
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchText.toLowerCase()) ||
                          invoice.customer.toLowerCase().includes(searchText.toLowerCase()) ||
                          (invoice.poNumber && invoice.poNumber.toLowerCase().includes(searchText.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    exportToCSV(filteredInvoices, 'accounts_receivable.csv');
  };

  const getStatusBadge = (status) => {
    const styles = {
      draft: 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
      sent: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
      partial: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      overdue: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
    };
    return styles[status] || styles.draft;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Finance"
        title="Accounts Receivable"
        description="Manage customer invoices, payments, and aging reports"
        actions={
          <button onClick={handleNewInvoice} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            <FiPlus className="h-4 w-4" />
            New Invoice
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Receivable</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">₹28,75,000</p>
            </div>
            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <FiDollarSign className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Overdue</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">₹4,32,000</p>
            </div>
            <div className="rounded-xl bg-rose-100 p-3 dark:bg-rose-900/30">
              <FiClock className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Collected This Month</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">₹15,20,000</p>
            </div>
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/30">
              <FiCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">DSO (Days)</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">32</p>
            </div>
            <div className="rounded-xl bg-cyan-100 p-3 dark:bg-cyan-900/30">
              <FiClock className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
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
                placeholder="Search invoices..."
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
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
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
            <div className="text-sm text-slate-500">Loading invoices...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Invoice #</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Customer</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Issue Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Due Date</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Amount</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Paid</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Status</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="px-4 py-12 text-center text-slate-500">
                      No invoices found
                    </td>
                  </tr>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{invoice.invoiceNumber}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{invoice.customer}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{invoice.issueDate}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{invoice.dueDate}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">₹{invoice.amount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right text-emerald-600 dark:text-emerald-400">₹{invoice.paidAmount.toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusBadge(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button className="erp-focus inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                          <FiCheck className="h-4 w-4" />
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

      <GenerateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          fetchInvoices();
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
