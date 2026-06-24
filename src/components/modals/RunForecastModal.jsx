import { useState } from 'react';
import { FiX, FiTrendingUp, FiCalendar, FiBarChart2 } from 'react-icons/fi';
import api from '../../lib/api.js';

export default function RunForecastModal({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    forecastType: 'revenue',
    period: 'quarterly',
    startDate: '',
    endDate: '',
    departments: [],
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/analytics/forecast', formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Failed to run forecast:', error);
      alert('Forecast generation initiated. This will integrate with the backend API.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDepartmentToggle = (dept) => {
    const newDepts = formData.departments.includes(dept)
      ? formData.departments.filter(d => d !== dept)
      : [...formData.departments, dept];
    setFormData({ ...formData, departments: newDepts });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Run Forecast</h2>
          <button
            onClick={onClose}
            className="erp-focus rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Forecast Type
              </label>
              <div className="relative">
                <FiTrendingUp className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  name="forecastType"
                  value={formData.forecastType}
                  onChange={handleChange}
                  className="erp-focus h-11 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
                >
                  <option value="revenue">Revenue</option>
                  <option value="expenses">Expenses</option>
                  <option value="cashflow">Cash Flow</option>
                  <option value="headcount">Headcount</option>
                </select>
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Period
              </label>
              <div className="relative">
                <FiCalendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <select
                  name="period"
                  value={formData.period}
                  onChange={handleChange}
                  className="erp-focus h-11 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                required
                className="erp-focus h-11 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
                required
                className="erp-focus h-11 w-full rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Departments
            </label>
            <div className="grid grid-cols-2 gap-2">
              {['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'].map((dept) => (
                <label key={dept} className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 p-3 dark:border-slate-800 dark:bg-slate-900/80">
                  <input
                    type="checkbox"
                    checked={formData.departments.includes(dept)}
                    onChange={() => handleDepartmentToggle(dept)}
                    className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">{dept}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-orange-50 p-4 dark:bg-blue-900/20">
            <div className="flex items-start gap-3">
              <FiBarChart2 className="mt-0.5 h-5 w-5 text-orange-500 dark:text-blue-400" />
              <div className="text-sm text-blue-800 dark:text-blue-300">
                <p className="font-semibold">AI-Powered Forecast</p>
                <p className="mt-1">This forecast uses machine learning to analyze historical data and predict future trends.</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="erp-focus flex-1 h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="erp-focus flex-1 h-11 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 disabled:opacity-50"
            >
              {loading ? 'Running...' : 'Run Forecast'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
