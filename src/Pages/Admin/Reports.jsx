import React, { useState, useEffect, useMemo } from 'react';
import OrderTable from '../../Components/feature/OrderTable';

export default function Reports() {
  const [reportData, setReportData] = useState(null);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    const fetchReportMetrics = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('http://localhost:8085/admin/orders', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        });
        const result = await response.json();

        if (response.ok && result.status === 'success') {
          const orders = result.data;
          setAllOrders(orders);
          computeMetrics(orders, setReportData);
        } else {
          setError(result.detail || 'Failed to load report data.');
        }
      } catch (err) {
        setError('Cannot connect to report server.');
      } finally {
        setLoading(false);
      }
    };
    fetchReportMetrics();
  }, []);

  function computeMetrics(orders, setter) {
    const completedOrders = orders.filter(o => o.status === 'Completed');
    const pendingOrders = orders.filter(o => o.status === 'Pending');
    const revenue = completedOrders.reduce((sum, o) => sum + (o.quantity * 120), 0);
    const totalItems = orders.reduce((sum, o) => sum + o.quantity, 0);

    const productMap = {};
    orders.forEach(o => {
      productMap[o.product_name] = (productMap[o.product_name] || 0) + o.quantity;
    });
    const topProducts = Object.entries(productMap)
      .map(([name, units]) => ({ name, units }))
      .sort((a, b) => b.units - a.units)
      .slice(0, 5);

    setter({
      totalOrders: orders.length,
      completedOrders: completedOrders.length,
      pendingOrders: pendingOrders.length,
      cancelledOrders: orders.filter(o => o.status === 'Cancelled').length,
      revenue,
      totalItems,
      topProducts: topProducts.length ? topProducts : [{ name: 'N/A', units: 0 }]
    });
  }

  const filteredOrders = useMemo(() => {
    return allOrders.filter(order => {
      const matchSearch =
        !searchQuery ||
        order.product_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.id?.toString().includes(searchQuery) ||
        order.customer_name?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'All' || order.status === statusFilter;

      const orderDate = order.created_at ? new Date(order.created_at) : null;
      const matchFrom = !dateFrom || (orderDate && orderDate >= new Date(dateFrom));
      const matchTo = !dateTo || (orderDate && orderDate <= new Date(dateTo + 'T23:59:59'));

      return matchSearch && matchStatus && matchFrom && matchTo;
    });
  }, [allOrders, searchQuery, statusFilter, dateFrom, dateTo]);

  const filteredMetrics = useMemo(() => {
    if (!filteredOrders.length) return null;
    const completed = filteredOrders.filter(o => o.status === 'Completed');
    const pending = filteredOrders.filter(o => o.status === 'Pending');
    const revenue = completed.reduce((sum, o) => sum + (o.quantity * 120), 0);
    const totalItems = filteredOrders.reduce((sum, o) => sum + o.quantity, 0);
    const productMap = {};
    filteredOrders.forEach(o => {
      productMap[o.product_name] = (productMap[o.product_name] || 0) + o.quantity;
    });
    const topProducts = Object.entries(productMap)
      .map(([name, units]) => ({ name, units }))
      .sort((a, b) => b.units - a.units)
      .slice(0, 5);
    return {
      totalOrders: filteredOrders.length,
      completedOrders: completed.length,
      pendingOrders: pending.length,
      cancelledOrders: filteredOrders.filter(o => o.status === 'Cancelled').length,
      revenue,
      totalItems,
      topProducts
    };
  }, [filteredOrders]);

  const displayMetrics = filteredMetrics || reportData;

  const exportCSV = () => {
    setExportLoading(true);
    try {
      const headers = ['Order ID', 'Product', 'Customer', 'Quantity', 'Status', 'Date', 'Amount (₹)'];
      const rows = filteredOrders.map(o => [
        o.id,
        o.product_name,
        o.customer_name || 'N/A',
        o.quantity,
        o.status,
        o.created_at ? new Date(o.created_at).toLocaleDateString() : 'N/A',
        o.status === 'Completed' ? o.quantity * 120 : 0
      ]);
      const csv = [headers, ...rows].map(r => r.map(v => `"${v}"`).join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orders_report_${new Date().toISOString().slice(0, 10)}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExportLoading(false);
    }
  };

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filteredOrders, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_report_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const S = styles;

  if (loading) return (
    <div style={S.loadWrap}>
      <div style={S.spinner} />
      <p style={S.loadText}>Compiling report data…</p>
    </div>
  );

  if (error) return (
    <div style={S.errorWrap}>
      <span style={S.errorIcon}>⚠</span>
      <span>{error}</span>
    </div>
  );

  return (
    <div style={S.page}>

      {/* ── Header ── */}
      <div style={S.header}>
        <div>
          <h1 style={S.title}>Reports & Analytics</h1>
          <p style={S.subtitle}>Track orders, revenue, and product performance</p>
        </div>
        <div style={S.exportGroup}>
          <button style={S.btnSecondary} onClick={exportJSON}>⬇ JSON</button>
          <button style={{ ...S.btnPrimary, opacity: exportLoading ? 0.7 : 1 }} onClick={exportCSV} disabled={exportLoading}>
            {exportLoading ? 'Exporting…' : '⬇ Export CSV'}
          </button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div style={S.filterBar}>
        <div style={S.searchWrap}>
          <span style={S.searchIcon}>🔍</span>
          <input
            style={S.searchInput}
            placeholder="Search by product, customer, order ID…"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button style={S.clearBtn} onClick={() => setSearchQuery('')}>✕</button>
          )}
        </div>

        <select style={S.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          {['All', 'Pending', 'Completed', 'Cancelled'].map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div style={S.dateGroup}>
          <label style={S.dateLabel}>From</label>
          <input type="date" style={S.dateInput} value={dateFrom} onChange={e => setDateFrom(e.target.value)} />
        </div>
        <div style={S.dateGroup}>
          <label style={S.dateLabel}>To</label>
          <input type="date" style={S.dateInput} value={dateTo} onChange={e => setDateTo(e.target.value)} />
        </div>

        {(searchQuery || statusFilter !== 'All' || dateFrom || dateTo) && (
          <button style={S.resetBtn} onClick={() => {
            setSearchQuery(''); setStatusFilter('All'); setDateFrom(''); setDateTo('');
          }}>Reset Filters</button>
        )}
      </div>

      {/* ── KPI Cards ── */}
      {displayMetrics && (
        <div style={S.kpiGrid}>
          {[
            { label: 'Total Orders', value: displayMetrics.totalOrders, icon: '📦', color: '#2563eb', bg: '#eff6ff' },
            { label: 'Completed', value: displayMetrics.completedOrders, icon: '✅', color: '#059669', bg: '#ecfdf5' },
            { label: 'Pending', value: displayMetrics.pendingOrders, icon: '⏳', color: '#d97706', bg: '#fffbeb' },
            { label: 'Cancelled', value: displayMetrics.cancelledOrders, icon: '❌', color: '#dc2626', bg: '#fef2f2' },
            { label: 'Gross Revenue', value: `₹${displayMetrics.revenue.toLocaleString()}`, icon: '💰', color: '#059669', bg: '#ecfdf5' },
            { label: 'Units Sold', value: `${displayMetrics.totalItems.toLocaleString()}`, icon: '📊', color: '#4f46e5', bg: '#eef2ff' },
            {
              label: 'Completion Rate',
              value: displayMetrics.totalOrders
                ? `${((displayMetrics.completedOrders / displayMetrics.totalOrders) * 100).toFixed(1)}%`
                : '0%',
              icon: '📈',
              color: '#0891b2',
              bg: '#ecfeff'
            },
            { label: 'Avg Order Value', value: displayMetrics.completedOrders ? `₹${Math.round(displayMetrics.revenue / displayMetrics.completedOrders).toLocaleString()}` : '₹0', icon: '🧾', color: '#7c3aed', bg: '#f5f3ff' },
          ].map((kpi, i) => (
            <div key={i} style={{ ...S.kpiCard, backgroundColor: kpi.bg, borderColor: kpi.color + '25' }}>
              <div style={S.kpiIcon}>{kpi.icon}</div>
              <div>
                <div style={{ ...S.kpiValue, color: kpi.color }}>{kpi.value}</div>
                <div style={S.kpiLabel}>{kpi.label}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── Bottom grid: Top Products + Order Table ── */}
      <div style={S.bottomGrid}>

        {/* Top Products */}
        {displayMetrics && (
          <div style={S.card}>
            <h3 style={S.cardTitle}>🏆 Top Products by Volume</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {displayMetrics.topProducts.map((prod, i) => {
                const pct = displayMetrics.totalItems ? (prod.units / displayMetrics.totalItems) * 100 : 0;
                const colors = ['#2563eb', '#4f46e5', '#0891b2', '#059669', '#d97706'];
                return (
                  <div key={i}>
                    <div style={S.prodRow}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ ...S.rankBadge, backgroundColor: colors[i] + '18', color: colors[i] }}>#{i + 1}</span>
                        <span style={S.prodName}>{prod.name}</span>
                      </div>
                      <span style={{ ...S.prodUnits, color: colors[i] }}>{prod.units} units</span>
                    </div>
                    <div style={S.barBg}>
                      <div style={{ ...S.barFill, width: `${pct}%`, backgroundColor: colors[i] }} />
                    </div>
                    <div style={S.barPct}>{pct.toFixed(1)}% of total volume</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Sales Summary */}
        {displayMetrics && (
          <div style={S.card}>
            <h3 style={S.cardTitle}>💹 Sales Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Total Revenue Generated', value: `₹${displayMetrics.revenue.toLocaleString()}`, highlight: true },
                { label: 'Orders Completed', value: displayMetrics.completedOrders },
                { label: 'Orders Pending', value: displayMetrics.pendingOrders },
                { label: 'Orders Cancelled', value: displayMetrics.cancelledOrders },
                { label: 'Total Units Processed', value: `${displayMetrics.totalItems.toLocaleString()} units` },
                { label: 'Average Revenue / Order', value: displayMetrics.completedOrders ? `₹${Math.round(displayMetrics.revenue / displayMetrics.completedOrders).toLocaleString()}` : '₹0' },
                { label: 'Completion Rate', value: displayMetrics.totalOrders ? `${((displayMetrics.completedOrders / displayMetrics.totalOrders) * 100).toFixed(1)}%` : '0%' },
              ].map((row, i) => (
                <div key={i} style={{ ...S.summaryRow, backgroundColor: row.highlight ? '#ecfdf5' : '#f8fafc', borderColor: row.highlight ? '#059669' : '#e2e8f0' }}>
                  <span style={{ fontSize: '13px', color: '#475569', fontWeight: '500' }}>{row.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: row.highlight ? '#059669' : '#0f172a' }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Orders Table ── */}
      <div style={{ ...S.card, marginTop: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ ...S.cardTitle, margin: 0 }}>📋 Order Details</h3>
          <span style={S.countBadge}>{filteredOrders.length} orders</span>
        </div>

        <OrderTable
          orders={filteredOrders}
          renderActions={() => null}
        />
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────
const styles = {
  page: { padding: '32px', fontFamily: "'DM Sans', 'Segoe UI', sans-serif", backgroundColor: '#f1f5f9', minHeight: '100vh', boxSizing: 'border-box' },
  loadWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: '16px' },
  spinner: { width: '36px', height: '36px', border: '3px solid #e2e8f0', borderTop: '3px solid #2563eb', borderRadius: '50%', animation: 'spin 0.8s linear infinite' },
  loadText: { color: '#64748b', fontWeight: '600', fontFamily: 'sans-serif' },
  errorWrap: { display: 'flex', gap: '10px', alignItems: 'center', padding: '20px 24px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '12px', margin: '32px', fontFamily: 'sans-serif', fontWeight: '600' },
  errorIcon: { fontSize: '20px' },

  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  title: { fontSize: '26px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0', letterSpacing: '-0.5px' },
  subtitle: { fontSize: '14px', color: '#64748b', margin: 0 },

  exportGroup: { display: 'flex', gap: '10px', alignItems: 'center' },
  btnPrimary: { padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '13px', cursor: 'pointer', letterSpacing: '0.2px' },
  btnSecondary: { padding: '10px 18px', backgroundColor: '#fff', color: '#334155', border: '1.5px solid #e2e8f0', borderRadius: '10px', fontWeight: '600', fontSize: '13px', cursor: 'pointer' },

  filterBar: { display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '28px', padding: '18px 20px', backgroundColor: '#fff', borderRadius: '14px', border: '1px solid #e2e8f0' },
  searchWrap: { position: 'relative', flex: '1', minWidth: '220px' },
  searchIcon: { position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '14px', pointerEvents: 'none' },
  searchInput: { width: '100%', padding: '9px 34px 9px 34px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: 'inherit', backgroundColor: '#f8fafc', outline: 'none', boxSizing: 'border-box', color: '#0f172a' },
  clearBtn: { position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', fontSize: '13px', fontWeight: '700' },
  select: { padding: '9px 14px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: 'inherit', backgroundColor: '#f8fafc', color: '#334155', fontWeight: '600', cursor: 'pointer', outline: 'none' },
  dateGroup: { display: 'flex', alignItems: 'center', gap: '6px' },
  dateLabel: { fontSize: '12px', fontWeight: '600', color: '#64748b', whiteSpace: 'nowrap' },
  dateInput: { padding: '8px 12px', border: '1.5px solid #e2e8f0', borderRadius: '9px', fontSize: '13px', fontFamily: 'inherit', backgroundColor: '#f8fafc', color: '#334155', outline: 'none' },
  resetBtn: { padding: '9px 16px', backgroundColor: '#fef2f2', color: '#dc2626', border: '1.5px solid #fecaca', borderRadius: '9px', fontWeight: '600', fontSize: '12px', cursor: 'pointer' },

  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '24px' },
  kpiCard: { display: 'flex', alignItems: 'center', gap: '14px', padding: '18px 20px', borderRadius: '14px', border: '1px solid', transition: 'transform 0.15s' },
  kpiIcon: { fontSize: '24px' },
  kpiValue: { fontSize: '22px', fontWeight: '800', letterSpacing: '-0.5px', lineHeight: '1' },
  kpiLabel: { fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px', marginTop: '3px' },

  bottomGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' },
  card: { backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0' },
  cardTitle: { fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '18px' },

  prodRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' },
  rankBadge: { fontSize: '11px', fontWeight: '700', padding: '2px 7px', borderRadius: '6px' },
  prodName: { fontSize: '13px', fontWeight: '600', color: '#334155' },
  prodUnits: { fontSize: '13px', fontWeight: '700' },
  barBg: { width: '100%', height: '7px', backgroundColor: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' },
  barFill: { height: '100%', borderRadius: '4px', transition: 'width 0.5s ease' },
  barPct: { fontSize: '11px', color: '#94a3b8', marginTop: '3px', textAlign: 'right' },

  summaryRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderRadius: '8px', border: '1px solid' },

  countBadge: { padding: '4px 12px', backgroundColor: '#eff6ff', color: '#2563eb', borderRadius: '20px', fontSize: '12px', fontWeight: '700' },
};
