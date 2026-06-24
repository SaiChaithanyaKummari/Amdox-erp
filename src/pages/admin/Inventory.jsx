import { useState, useEffect } from 'react';
import { FiPackage, FiDownload, FiFilter, FiPlus, FiSearch, FiAlertTriangle, FiTrendingUp, FiRefreshCw } from 'react-icons/fi';
import PageHeader from '../../components/common/PageHeader.jsx';
import AddItemModal from '../../components/modals/AddItemModal.jsx';
import api from '../../lib/api.js';
import { exportToCSV } from '../../lib/utils.js';

export default function Inventory() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const dummyItems = [
    { id: 1, sku: 'SKU-001', name: 'Office Chair', category: 'Furniture', quantity: 45, unitPrice: 4500, warehouse: 'Warehouse A', reorderLevel: 10, stockStatus: 'in_stock' },
    { id: 2, sku: 'SKU-002', name: 'Laptop Stand', category: 'Electronics', quantity: 120, unitPrice: 1200, warehouse: 'Warehouse B', reorderLevel: 20, stockStatus: 'in_stock' },
    { id: 3, sku: 'SKU-003', name: 'Desk Lamp', category: 'Lighting', quantity: 8, unitPrice: 850, warehouse: 'Warehouse A', reorderLevel: 15, stockStatus: 'low_stock' },
    { id: 4, sku: 'SKU-004', name: 'Wireless Mouse', category: 'Electronics', quantity: 0, unitPrice: 650, warehouse: 'Warehouse B', reorderLevel: 30, stockStatus: 'out_of_stock' },
    { id: 5, sku: 'SKU-005', name: 'File Cabinet', category: 'Furniture', quantity: 32, unitPrice: 3500, warehouse: 'Warehouse A', reorderLevel: 10, stockStatus: 'in_stock' },
  ];

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await api.get('/supply-chain/inventory', {
        params: {
          category: categoryFilter,
          stock: stockFilter
        }
      });
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setItems(response.data);
      } else {
        setItems(dummyItems);
      }
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
      setItems(dummyItems);
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setLoading(true);
    let successCount = 0;
    let failCount = 0;
    for (const item of items) {
      try {
        await api.post('/supply-chain/inventory', {
          sku: item.sku,
          name: item.name,
          category: item.category.toLowerCase(),
          unit: 'pcs',
          costPrice: Math.round(item.unitPrice * 0.8),
          sellingPrice: item.unitPrice,
          reorderLevel: item.reorderLevel,
          warehouse: item.warehouse === 'Warehouse A' ? 'main' : 'north'
        });
        successCount++;
      } catch (err) {
        failCount++;
      }
    }
    setLoading(false);
    if (failCount > 0) {
      alert(`Sync process complete. ${successCount} items synced, ${failCount} failed (backend offline or items already exist).`);
    } else {
      alert(`Successfully synced all ${successCount} inventory items to the backend database!`);
    }
    fetchItems();
  };

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchText.toLowerCase()) ||
                          (item.category && item.category.toLowerCase().includes(searchText.toLowerCase())) ||
                          (item.warehouse && item.warehouse.toLowerCase().includes(searchText.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesStock = stockFilter === 'all' || item.stockStatus === stockFilter;
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleExport = () => {
    exportToCSV(filteredItems, 'inventory.csv');
  };

  const getStockBadge = (status) => {
    const styles = {
      in_stock: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
      low_stock: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
      out_of_stock: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
      overstocked: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400'
    };
    return styles[status] || styles.in_stock;
  };

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Supply Chain"
        title="Inventory"
        description="Track stock levels, manage warehouses, and automate reorders"
        actions={
          <div className="flex gap-2">
            <button onClick={handleSync} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-primary/40 hover:text-primary dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
              <FiRefreshCw className="h-4 w-4" />
              Sync to DB
            </button>
            <button onClick={handleAddItem} className="erp-focus inline-flex h-11 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
              <FiPlus className="h-4 w-4" />
              Add Item
            </button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Items</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">18,940</p>
            </div>
            <div className="rounded-xl bg-orange-100/60 p-3 dark:bg-blue-900/30">
              <FiPackage className="h-6 w-6 text-orange-500 dark:text-blue-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Low Stock</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">124</p>
            </div>
            <div className="rounded-xl bg-amber-100 p-3 dark:bg-amber-900/30">
              <FiAlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Out of Stock</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">18</p>
            </div>
            <div className="rounded-xl bg-rose-100 p-3 dark:bg-rose-900/30">
              <FiAlertTriangle className="h-6 w-6 text-rose-600 dark:text-rose-400" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">Total Value</p>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-100">₹2,45,00,000</p>
            </div>
            <div className="rounded-xl bg-emerald-100 p-3 dark:bg-emerald-900/30">
              <FiTrendingUp className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
                placeholder="Search items..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="erp-focus h-11 w-full rounded-xl border border-slate-200 bg-slate-50/80 pl-10 pr-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
              />
            </div>
          </div>
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="erp-focus h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="raw_materials">Raw Materials</option>
            <option value="packaging">Packaging</option>
            <option value="machinery">Machinery</option>
          </select>
          <select 
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="erp-focus h-11 rounded-xl border border-slate-200 bg-slate-50/80 px-4 text-sm dark:border-slate-800 dark:bg-slate-900/80"
          >
            <option value="all">All Stock Levels</option>
            <option value="in_stock">In Stock</option>
            <option value="low_stock">Low Stock</option>
            <option value="out_of_stock">Out of Stock</option>
            <option value="overstocked">Overstocked</option>
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
            <div className="text-sm text-slate-500">Loading inventory...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800">
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">SKU</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Item Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Category</th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 dark:text-slate-200">Warehouse</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Quantity</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Reorder Level</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Unit Price</th>
                  <th className="px-4 py-3 text-right font-semibold text-slate-700 dark:text-slate-200">Total Value</th>
                  <th className="px-4 py-3 text-center font-semibold text-slate-700 dark:text-slate-200">Stock Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="px-4 py-12 text-center text-slate-500">
                      No inventory items found
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 dark:border-slate-800/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-slate-100">{item.sku}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.name}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.category}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{item.warehouse}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">{item.quantity}</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">{item.reorderLevel}</td>
                      <td className="px-4 py-3 text-right text-slate-600 dark:text-slate-300">₹{item.unitPrice.toLocaleString()}</td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-900 dark:text-slate-100">₹{(item.quantity * item.unitPrice).toLocaleString()}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStockBadge(item.stockStatus)}`}>
                          {item.stockStatus.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(newItem) => {
          if (newItem) {
            setItems([newItem, ...items]);
          } else {
            fetchItems();
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}
