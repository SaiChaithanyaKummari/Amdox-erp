import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function AIForecast() {
  const data = [
    { month: 'Jan', sales: 180, predicted: null },
    { month: 'Feb', sales: 210, predicted: null },
    { month: 'Mar', sales: 195, predicted: null },
    { month: 'Apr', sales: 230, predicted: null },
    { month: 'May', sales: 250, predicted: null },
    { month: 'Jun', sales: 280, predicted: 340 },
  ];

  return (
    <article className="erp-panel rounded-xl p-5">
      <header className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-sm font-semibold text-slate-600">AI Forecast</h3>
          <p className="mt-1 text-xs text-slate-400">Next Month Inventory Demand</p>
        </div>
        <div className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
          Confidence: 92%
        </div>
      </header>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
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
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#ff7a00"
              strokeWidth={2}
              name="Actual Sales"
              dot={{ fill: '#ff7a00', strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="#ec4899"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="AI Prediction"
              dot={{ fill: '#ec4899', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-purple-50 p-3 dark:bg-purple-900/20">
        <div>
          <p className="text-xs text-purple-600 dark:text-purple-400">Laptop Demand Forecast</p>
          <p className="mt-1 text-sm font-bold text-purple-700 dark:text-purple-300">
            Current: 250 → Predicted: 340 (+36%)
          </p>
        </div>
      </div>
    </article>
  );
}
