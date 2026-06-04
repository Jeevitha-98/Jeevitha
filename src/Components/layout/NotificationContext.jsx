import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';

export const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const currentRole = useMemo(() => {
    return String(localStorage.getItem('role') || '').trim().toLowerCase();
  }, []);

  const fetchNotifications = useCallback(async () => {
    try {
      const currentToken = localStorage.getItem('token');
      if (!currentToken) {
        setLoading(false);
        return;
      }

      let targetEndpoint = 'http://localhost:8085/supplier/vendor-requests';
      if (currentRole === 'vendor') {
        targetEndpoint = 'http://localhost:8085/vendor/product-requests';
      }

      const response = await fetch(targetEndpoint, {
        method: "GET",
        headers: { 
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json'
        }
      });
      const result = await response.json();

      let generatedAlerts = [];
      const rawDataList = Array.isArray(result) ? result : (result.data || []);

      if (rawDataList.length > 0) {
        rawDataList.forEach((order, idx) => {
          const status = String(order.status || '').toLowerCase();
          const pName = order.product_name || order.product || 'Components';
          const vName = order.vendor_name || 'Vendor Partner';

          // 📥 REQUIREMENT 1: New Vendor Requests
          if (status === 'pending') {
            generatedAlerts.push({
              id: `new-${idx}-${order.id || idx}`,
              message: `📥 New Vendor Request: ${vName} submitted an order for ${order.quantity} units of ${pName}.`,
              unread: true,
              time: 'Just Now',
              type: 'NEW_REQUEST'
            });
          }

          // ✅ REQUIREMENT 2: Supplier Approvals
          if (status === 'completed' || status === 'accepted' || status === 'approved') {
            generatedAlerts.push({
              id: `approval-${idx}-${order.id || idx}`,
              message: `✅ Supplier Approval: Request line for ${pName} has been approved and marked as [${order.status}].`,
              unread: false,
              time: '1 hour ago',
              type: 'SUPPLIER_APPROVAL'
            });
          }

          // ❌ REQUIREMENT 3: Order Status Changes
          if (status === 'cancelled' || status === 'rejected' || status === 'declined') {
            generatedAlerts.push({
              id: `status-change-${idx}-${order.id || idx}`,
              message: `❌ Order Status Change: Procurement order line for ${pName} was declined or cancelled.`,
              unread: true,
              time: '2 hours ago',
              type: 'STATUS_CHANGE'
            });
          }
        });
      }

      // ✅ FIXED: Changed the Python style comment '#' to a proper JavaScript single line comment '//'
      // ⚠️ REQUIREMENT 4: Automated Low Stock Alerts (Unlocked globally for all roles to see warnings)
      try {
        const stockResponse = await fetch('http://localhost:8085/supplier/stock', {
          method: "GET",
          headers: { 'Authorization': `Bearer ${currentToken}` }
        });
        if (stockResponse.ok) {
          const stockList = await stockResponse.json();
          if (Array.isArray(stockList)) {
            stockList.forEach((item, idx) => {
              const currentStock = item.stock !== undefined ? Number(item.stock) : 0;
              if (currentStock < 50) {
                generatedAlerts.push({
                  id: `low-stock-${idx}-${item.id || idx}`,
                  message: `⚠️ Low Stock Alert: '${item.name}' inventory level dropped to ${currentStock} units! Reorder soon.`,
                  unread: true,
                  time: 'System Warning',
                  type: 'LOW_STOCK'
                });
              }
            });
          }
        }
      } catch (e) {
        print("Stock tracking fallback bypass.");
      }

      setNotifications(generatedAlerts);
    } catch (err) {
      console.error("Notification loop exception caught:", err);
    } finally {
      setLoading(false);
    }
  }, [currentRole]);

  useEffect(() => {
    fetchNotifications();
    const pollInterval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(pollInterval);
  }, [fetchNotifications]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <NotificationContext.Provider value={{ notifications, unreadCount, markAllAsRead, markAsRead, loading, refresh: fetchNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
}
