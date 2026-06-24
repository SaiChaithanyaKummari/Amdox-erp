import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function InventoryIntelligence() {
  const data = [
    { month: 'Jan', stock: 4500, turnover: 3200 },
    { month: 'Feb', stock: 4800, turnover: 3500 },
    { month: 'Mar', stock: 4200, turnover: 3800 },
    { month: 'Apr', stock: 5100, turnover: 4100 },
    { month: 'May', stock: 4900, turnover: 3900 },
    { month: 'Jun', stock: 5300, turnover: 4300 },
  ];

  return (
    <article className="erp-panel rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-600">Inventory Intelligence</h3>
      <p className="mt-1 text-xs text-slate-400">Stock levels and turnover</p>

      <div className="mt-4 h-40">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
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
            />
            <Area type="monotone" dataKey="stock" stroke="#ff7a00" fill="#ff7a00" fillOpacity={0.3} name="Stock" />
            <Area type="monotone" dataKey="turnover" stroke="#ec4899" fill="#ec4899" fillOpacity={0.3} name="Turnover" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
          <p className="text-xs text-amber-600 dark:text-amber-400">Low Stock</p>
          <p className="mt-1 text-lg font-bold text-amber-700 dark:text-amber-300">32</p>
        </div>
        <div className="rounded-lg bg-rose-50 p-3 dark:bg-rose-900/20">
          <p className="text-xs text-rose-600 dark:text-rose-400">Out of Stock</p>
          <p className="mt-1 text-lg font-bold text-rose-700 dark:text-rose-300">5</p>
        </div>
        <div className="rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
          <p className="text-xs text-emerald-600 dark:text-emerald-400">Healthy</p>
          <p className="mt-1 text-lg font-bold text-emerald-700 dark:text-emerald-300">156</p>
        </div>
      </div>
    </article>
  );
}
