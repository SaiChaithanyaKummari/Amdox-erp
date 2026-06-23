import { useState } from 'react';
import { FiDownload, FiFilter, FiCalendar, FiBarChart2, FiPieChart, FiFileText } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader.jsx';

export default function FinancialReports() {
  const [reportType, setReportType] = useState('balance-sheet');
  const [dateRange, setDateRange] = useState('this-month');

  const handleExportPDF = () => {
    alert('Export PDF functionality will download the report as PDF. This will integrate with the backend API.');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Finance"
        title="Financial Reports"
        description="Generate balance sheet, P&L, cash flow, and custom reports"
        actions={
          <button onClick={handleExportPDF} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700">
            <FiDownload className="h-4 w-4" />
            Export PDF
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button 
          onClick={() => setReportType('balance-sheet')}
          className={`rounded-xl border p-6 text-left transition hover:border-primary/40 ${
            reportType === 'balance-sheet' 
              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-white/70 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-3 ${reportType === 'balance-sheet' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
              <FiBarChart2 className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Balance Sheet</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Assets, liabilities & equity</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setReportType('profit-loss')}
          className={`rounded-xl border p-6 text-left transition hover:border-primary/40 ${
            reportType === 'profit-loss' 
              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-white/70 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-3 ${reportType === 'profit-loss' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
              <FiPieChart className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Profit & Loss</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Income statement</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setReportType('cash-flow')}
          className={`rounded-xl border p-6 text-left transition hover:border-primary/40 ${
            reportType === 'cash-flow' 
              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-white/70 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-3 ${reportType === 'cash-flow' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
              <FiFileText className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Cash Flow</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Operating, investing, financing</p>
            </div>
          </div>
        </button>

        <button 
          onClick={() => setReportType('aging')}
          className={`rounded-xl border p-6 text-left transition hover:border-primary/40 ${
            reportType === 'aging' 
              ? 'border-primary bg-primary/5 dark:bg-primary/10' 
              : 'border-white/70 bg-white/85 dark:border-slate-800 dark:bg-slate-900/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`rounded-xl p-3 ${reportType === 'aging' ? 'bg-primary text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
              <FiCalendar className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-slate-100">Aging Report</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">AR/AP aging buckets</p>
            </div>
          </div>
        </button>
      </div>

      <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="erp-focus h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
            >
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
            <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <FiFilter className="h-4 w-4" />
              More Filters
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <FiDownload className="h-4 w-4" />
              Excel
            </button>
            <button className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <FiDownload className="h-4 w-4" />
              CSV
            </button>
          </div>
        </div>

        {reportType === 'balance-sheet' && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Assets</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Current Assets</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹45,20,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Cash & Equivalents</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹18,50,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Accounts Receivable</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹15,20,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Inventory</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹11,50,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Total Current Assets</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">₹45,20,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Fixed Assets</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹32,80,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total Assets</span>
                  <span className="font-bold text-lg text-primary">₹78,00,000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Liabilities</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Current Liabilities</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹22,40,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Accounts Payable</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹12,45,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Short-term Debt</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹9,95,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2 dark:border-slate-800">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">Total Current Liabilities</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">₹22,40,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Long-term Debt</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹18,60,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total Liabilities</span>
                  <span className="font-bold text-lg text-rose-600 dark:text-rose-400">₹41,00,000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Equity</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Share Capital</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹25,00,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Retained Earnings</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹12,00,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total Equity</span>
                  <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">₹37,00,000</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {reportType === 'profit-loss' && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Revenue</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Sales Revenue</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹85,20,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Service Revenue</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹24,80,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Other Income</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹3,50,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total Revenue</span>
                  <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">₹1,13,50,000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Cost of Goods Sold</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Direct Materials</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹32,40,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Direct Labor</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹18,60,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Manufacturing Overhead</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹8,20,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total COGS</span>
                  <span className="font-bold text-lg text-rose-600 dark:text-rose-400">₹59,20,000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Operating Expenses</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Salaries & Wages</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹22,40,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Rent & Utilities</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹6,80,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Marketing & Advertising</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹4,50,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Depreciation</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹3,20,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Total Operating Expenses</span>
                  <span className="font-bold text-lg text-rose-600 dark:text-rose-400">₹36,90,000</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-primary/5 p-6 dark:bg-primary/10">
              <div className="flex justify-between">
                <span className="font-bold text-lg text-slate-900 dark:text-slate-100">Net Profit</span>
                <span className="font-bold text-2xl text-primary">₹17,40,000</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Gross Profit Margin: 47.8%</p>
            </div>
          </div>
        )}

        {reportType === 'cash-flow' && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Operating Activities</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Net Income</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">₹17,40,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Depreciation</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹3,20,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Accounts Receivable (Decrease)</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹8,50,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Accounts Payable (Increase)</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹5,20,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Inventory (Increase)</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">-₹4,80,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Net Cash from Operations</span>
                  <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">₹30,10,000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Investing Activities</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Purchase of Equipment</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">-₹12,40,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Sale of Investments</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹3,80,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Net Cash from Investing</span>
                  <span className="font-bold text-lg text-rose-600 dark:text-rose-400">-₹8,60,000</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Financing Activities</h3>
              <div className="space-y-2">
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Loan Repayment</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">-₹5,00,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">Dividends Paid</span>
                  <span className="font-semibold text-rose-600 dark:text-rose-400">-₹2,50,000</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2 dark:border-slate-800/50">
                  <span className="text-slate-600 dark:text-slate-300">New Debt Issued</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+₹8,00,000</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="font-bold text-slate-900 dark:text-slate-100">Net Cash from Financing</span>
                  <span className="font-bold text-lg text-emerald-600 dark:text-emerald-400">+₹50,000</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-primary/5 p-6 dark:bg-primary/10">
              <div className="flex justify-between">
                <span className="font-bold text-lg text-slate-900 dark:text-slate-100">Net Change in Cash</span>
                <span className="font-bold text-2xl text-primary">₹21,55,000</span>
              </div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Beginning Cash: ₹18,50,000 | Ending Cash: ₹40,05,000</p>
            </div>
          </div>
        )}

        {reportType === 'aging' && (
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Accounts Receivable Aging</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Customer</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">0-30 Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">31-60 Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">61-90 Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">90+ Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">ABC Corp</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹4,50,000</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹2,20,000</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹1,80,000</td>
                      <td className="px-4 py-3 text-right text-rose-600 dark:text-rose-400">₹0</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100">₹8,50,000</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">XYZ Ltd</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹3,20,000</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹0</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹0</td>
                      <td className="px-4 py-3 text-right text-rose-600 dark:text-rose-400">₹0</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100">₹3,20,000</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Tech Solutions</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹1,80,000</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹1,50,000</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹0</td>
                      <td className="px-4 py-3 text-right text-rose-600 dark:text-rose-400">₹2,20,000</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100">₹5,50,000</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">Total AR</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">₹9,50,000</td>
                      <td className="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">₹3,70,000</td>
                      <td className="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">₹1,80,000</td>
                      <td className="px-4 py-3 text-right font-bold text-rose-600 dark:text-rose-400">₹2,20,000</td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-primary">₹17,20,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-slate-900 dark:text-slate-100">Accounts Payable Aging</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Vendor</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">0-30 Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">31-60 Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">61-90 Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">90+ Days</th>
                      <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Office Supplies Co</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹2,80,000</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹1,20,000</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹0</td>
                      <td className="px-4 py-3 text-right text-rose-600 dark:text-rose-400">₹0</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100">₹4,00,000</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Industrial Equipment</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹3,50,000</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹0</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹0</td>
                      <td className="px-4 py-3 text-right text-rose-600 dark:text-rose-400">₹0</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100">₹3,50,000</td>
                    </tr>
                    <tr className="border-b border-slate-100 dark:border-slate-800/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">Global Logistics</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹1,80,000</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹2,20,000</td>
                      <td className="px-4 py-3 text-right text-amber-600 dark:text-amber-400">₹0</td>
                      <td className="px-4 py-3 text-right text-rose-600 dark:text-rose-400">₹1,50,000</td>
                      <td className="px-4 py-3 text-right font-bold text-slate-900 dark:text-slate-100">₹5,50,000</td>
                    </tr>
                    <tr className="border-b border-slate-200 dark:border-slate-800">
                      <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">Total AP</td>
                      <td className="px-4 py-3 text-right font-bold text-emerald-600 dark:text-emerald-400">₹8,10,000</td>
                      <td className="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">₹3,40,000</td>
                      <td className="px-4 py-3 text-right font-bold text-amber-600 dark:text-amber-400">₹0</td>
                      <td className="px-4 py-3 text-right font-bold text-rose-600 dark:text-rose-400">₹1,50,000</td>
                      <td className="px-4 py-3 text-right font-bold text-lg text-primary">₹13,00,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-emerald-50 p-4 dark:bg-emerald-900/20">
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Current AR (0-30 days)</p>
                <p className="mt-1 text-2xl font-bold text-emerald-900 dark:text-emerald-100">₹9,50,000</p>
                <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-300">55.2% of total AR</p>
              </div>
              <div className="rounded-xl bg-rose-50 p-4 dark:bg-rose-900/20">
                <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">Overdue AR (90+ days)</p>
                <p className="mt-1 text-2xl font-bold text-rose-900 dark:text-rose-100">₹2,20,000</p>
                <p className="mt-1 text-xs text-rose-600 dark:text-rose-300">12.8% of total AR</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
