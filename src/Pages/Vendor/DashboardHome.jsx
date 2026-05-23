import React, { useEffect, useState } from "react";
import PageContainer from "../../components/layout/PageContainer";
import { useVendor } from "../../Context/Vendorcontext";

export default function DashboardHome() {
  const {
    availableProducts,
    myOrders,
    pendingRequests,
    acceptedRequests,
    activityLogs,
    loading,
    refreshVendorData
  } = useVendor();

  const [activeTab, setActiveTab] = useState("available_products");

  useEffect(() => {
    if (refreshVendorData) refreshVendorData();
  }, []);

  const safeProducts = availableProducts || [];
  const safeOrders = myOrders || [];
  const safePending = pendingRequests || [];
  const safeAccepted = acceptedRequests || [];
  const safeLogs = activityLogs || [];

  const stats = [
    { id: "available_products", title: "Products", value: safeProducts.length, color: "#2563eb", icon: "📦" },
    { id: "my_orders", title: "Orders", value: safeOrders.length, color: "#16a34a", icon: "🛒" },
    { id: "pending_requests", title: "Pending", value: safePending.length, color: "#ea580c", icon: "⏳" },
    { id: "accepted_requests", title: "Accepted", value: safeAccepted.length, color: "#8b5cf6", icon: "✅" }
  ];

  const cardStyle = (active, color) => ({
    padding: "18px",
    borderRadius: "14px",
    cursor: "pointer",
    border: active ? `2px solid ${color}` : "1px solid #e2e8f0",
    background: "#fff",
    boxShadow: active ? `0 10px 25px ${color}20` : "0 1px 3px rgba(0,0,0,0.05)"
  });

  const itemCard = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px",
    borderRadius: "14px",
    border: "1px solid #e2e8f0",
    background: "#fff",
    marginBottom: "12px"
  };

  const imgStyle = {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    objectFit: "cover",
    border: "1px solid #e2e8f0"
  };

  const badge = (text, color) => ({
    fontSize: "11px",
    fontWeight: "600",
    padding: "4px 8px",
    borderRadius: "8px",
    background: color,
    color: "#fff"
  });

  const activityCard = (act) => ({
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
    background: act?.urgent ? "#fff5f5" : "#f8fafc",
    marginBottom: "10px"
  });

  const renderContent = () => {
    const empty = (msg) => (
      <div style={{ padding: "30px", textAlign: "center", color: "#94a3b8" }}>
        {msg}
      </div>
    );

    switch (activeTab) {
      case "available_products":
        return safeProducts.length === 0
          ? empty("No products available")
          : safeProducts.map((p, i) => (
              <div key={i} style={itemCard}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img src={p.image || "https://via.placeholder.com/60"} style={imgStyle} />
                  <div>
                    <div style={{ fontWeight: "600" }}>{p.name}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      SKU: {p.sku || "N/A"}
                    </div>
                  </div>
                </div>
                <div style={{ fontWeight: "700", color: "#2563eb" }}>
                  ₹{p.price}
                </div>
              </div>
            ));

      case "my_orders":
        return safeOrders.length === 0
          ? empty("No orders found")
          : safeOrders.map((o, i) => (
              <div key={i} style={itemCard}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img src={o.image || "https://via.placeholder.com/60"} style={imgStyle} />
                  <div>
                    <div style={{ fontWeight: "600" }}>{o.product}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      Qty: {o.quantity}
                    </div>
                  </div>
                </div>

                <span style={badge(o.status || "Approved", "#16a34a")}>
                  {o.status || "Approved"}
                </span>
              </div>
            ));

      case "pending_requests":
        return safePending.length === 0
          ? empty("No pending requests")
          : safePending.map((r, i) => (
              <div key={i} style={itemCard}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img src={r.image || "https://via.placeholder.com/60"} style={imgStyle} />
                  <div>
                    <div style={{ fontWeight: "600" }}>{r.product}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      Qty: {r.quantity}
                    </div>
                  </div>
                </div>

                <span style={badge("Pending", "#ea580c")}>Pending</span>
              </div>
            ));

      case "accepted_requests":
        return safeAccepted.length === 0
          ? empty("No accepted requests")
          : safeAccepted.map((r, i) => (
              <div key={i} style={itemCard}>
                <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <img src={r.image || "https://via.placeholder.com/60"} style={imgStyle} />
                  <div>
                    <div style={{ fontWeight: "600" }}>{r.product}</div>
                    <div style={{ fontSize: "12px", color: "#64748b" }}>
                      Supplier: {r.supplier_name || "N/A"}
                    </div>
                  </div>
                </div>

                <span style={badge("Accepted", "#8b5cf6")}>Accepted</span>
              </div>
            ));

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <PageContainer>
        <div style={{ textAlign: "center", padding: "60px" }}>
          Loading dashboard...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>

      {/* HEADER */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Vendor Dashboard</h2>
        <p style={{ color: "#64748b" }}>Manage inventory & orders</p>
      </div>

      {/* STATS */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "16px",
        marginBottom: "24px"
      }}>
        {stats.map((s) => (
          <div
            key={s.id}
            onClick={() => setActiveTab(s.id)}
            style={cardStyle(activeTab === s.id, s.color)}
          >
            <div style={{ fontSize: "22px" }}>{s.icon}</div>
            <div style={{ fontSize: "14px", color: "#64748b" }}>{s.title}</div>
            <div style={{ fontSize: "22px", fontWeight: "700" }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* MAIN + ACTIVITY */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px"
      }}>

        {/* LEFT CONTENT */}
        <div>
          {renderContent()}
        </div>

        {/* RIGHT ACTIVITY PANEL (RESTORED + IMPROVED) */}
        <div>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px"
          }}>
            <h3 style={{ margin: 0 }}>Recent Activity</h3>

            {safeLogs.length > 0 && (
              <button
                onClick={() => {
                  localStorage.removeItem("vendor_activity_logs");
                  window.location.reload();
                }}
                style={{
                  fontSize: "11px",
                  border: "none",
                  background: "transparent",
                  color: "#ef4444",
                  cursor: "pointer",
                  fontWeight: "600"
                }}
              >
                Clear
              </button>
            )}
          </div>

          {safeLogs.length === 0 ? (
            <div style={{ color: "#94a3b8", fontSize: "13px" }}>
              No activity logs found
            </div>
          ) : (
            safeLogs.map((log, i) => (
              <div key={i} style={activityCard(log)}>
                <div style={{ fontSize: "13px", color: "#1e293b" }}>
                  {log.text}
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                  {log.time}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </PageContainer>
  );
}