import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function FinanceOverview() {
  const data = [
    { month: 'Jan', revenue: 4200000, expense: 1200000 },
    { month: 'Feb', revenue: 4800000, expense: 1400000 },
    { month: 'Mar', revenue: 4500000, expense: 1300000 },
    { month: 'Apr', revenue: 5200000, expense: 1500000 },
    { month: 'May', revenue: 4850000, expense: 1240000 },
    { month: 'Jun', revenue: 5100000, expense: 1350000 },
  ];

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalExpense = data.reduce((sum, d) => sum + d.expense, 0);

  return (
    <article className="erp-panel rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-600">Financial Overview</h3>
      <p className="mt-1 text-xs text-slate-400">Revenue vs Expense (Last 6 months)</p>

      <div className="mt-4 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#64748b" />
            <YAxis tick={{ fontSize: 12 }} stroke="#64748b" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '12px',
              }}
              formatter={(value) => `₹${(value / 100000).toFixed(1)}L`}
            />
            <Legend />
            <Bar dataKey="revenue" fill="#ff7a00" name="Revenue" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#ec4899" name="Expense" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-orange-50 p-3 dark:bg-orange-950/30">
          <p className="text-xs text-orange-600 dark:text-orange-400">Total Revenue</p>
          <p className="mt-1 text-lg font-bold text-orange-700 dark:text-orange-300">
            ₹{(totalRevenue / 100000).toFixed(1)}L
          </p>
        </div>
        <div className="rounded-lg bg-fuchsia-50 p-3 dark:bg-fuchsia-950/30">
          <p className="text-xs text-fuchsia-600 dark:text-fuchsia-400">Total Expense</p>
          <p className="mt-1 text-lg font-bold text-fuchsia-700 dark:text-fuchsia-300">
            ₹{(totalExpense / 100000).toFixed(1)}L
          </p>
        </div>
      </div>
    </article>
  );
}
