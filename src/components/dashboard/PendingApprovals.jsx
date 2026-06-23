export default function PendingApprovals() {
  const items = [
    { label: 'Leave Requests', value: 12 },
    { label: 'Purchase Orders', value: 8 },
    { label: 'Expense Claims', value: 6 },
    { label: 'Invoices', value: 15 },
  ];

  return (
    <article className="erp-panel rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-600">Pending Approvals</h3>
      <p className="mt-1 text-xs text-slate-400">Approve or reject items</p>

      <div className="mt-4 space-y-3">
        {items.map((it) => (
          <div key={it.label} className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">{it.label}</p>
              <p className="text-xs text-slate-400">{it.value} pending</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="text-sm text-primary">View</button>
              <button className="rounded-md bg-emerald-500 px-3 py-1 text-sm text-white">Approve</button>
              <button className="rounded-md bg-rose-500 px-3 py-1 text-sm text-white">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}
