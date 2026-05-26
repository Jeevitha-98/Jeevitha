import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../../Context/Inventorycontext";
import { useVendor } from "../../Context/Vendorcontext";
import { useAdmin } from "../../Context/AdminContext";
import profileIconImage from "../../Assests/Profileicon Image.jpg";

export default function Navbar({ role = "supplier", toggleSidebar, isOpen }) {
  const navigate = useNavigate();

  const storageRole = (localStorage.getItem("role") || role || "").trim().toLowerCase();
  const isVendor = storageRole === "vendor";
  const isAdmin = storageRole === "admin";

  const supplierContext = (!isVendor && !isAdmin) ? useInventory() : {};
  const vendorContext = isVendor ? useVendor() : {};
  const adminContext = isAdmin ? useAdmin() : {};

  const currentContext = isAdmin ? adminContext : (isVendor ? vendorContext : supplierContext);

  const {
    profile,
    activityLogs,
    systemActivities,
    pendingRequests,
    vendorRequests,
    adminNotifications
  } = currentContext;

  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const goProfile = () => {
    if (isAdmin) navigate("/admin/dashboard/profile");
    else if (isVendor) navigate("/vendor/dashboard/profile");
    else navigate("/supplier/dashboard/profile");
  };

  const getRecentActivities = () => {
    const list = [];

    if (isAdmin) {
      (adminNotifications || []).forEach((act, index) => {
        list.push({
          id: act.id || `admin-log-${index}`,
          text: act.text || act.message || "System log alert updated",
          time: act.time || "Just now",
          urgent: act.urgent || act.status === "pending"
        });
      });
      return list.slice(0, 4);
    }

    const logs = isVendor ? activityLogs : systemActivities;
    const requests = isVendor ? pendingRequests : vendorRequests;

    (logs || []).forEach((act, index) => {
      list.push({
        id: act.id || `log-${index}`,
        text: act.text || act.message,
        time: act.time || "Just now",
        urgent: act.urgent || false
      });
    });

    (requests || []).forEach((req, index) => {
      const isPending = req.status?.toLowerCase() === "pending";

      list.push({
        id: req.id || `req-${index}`,
        text: isVendor
          ? isPending
            ? `Your product request for ${req.product} is pending.`
            : `Request updated: ${req.status}`
          : isPending
            ? `New order from ${req.vendorName} for ${req.product}`
            : `Order ${req.product} updated to ${req.status}`,
        time: isPending ? "Action required" : "Completed",
        urgent: isPending
      });
    });

    return list.slice(0, 4);
  };

  const recentActivities = getRecentActivities();
  const unreadCount = recentActivities.filter(a => a.urgent).length;

  return (
    <div className="professional-navbar">
      <style>{`
        .professional-navbar {
          height: 70px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          position: sticky;
          top: 0;
          z-index: 100;
          font-family: 'Inter', -apple-system, system-ui, sans-serif;
          width: 100%;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }

        .nav-action-btn {
          background: transparent;
          border: 1px solid #f1f5f9;
          width: 42px;
          height: 42px;
          border-radius: 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          color: #64748b;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }

        .nav-action-btn:hover {
          background-color: #f8fafc;
          border-color: #e2e8f0;
          color: #0f172a;
          transform: translateY(-1px);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
        }

        .nav-action-btn:active {
          transform: translateY(0);
        }

        .notification-dot {
          width: 9px;
          height: 9px;
          background-color: #ef4444;
          border-radius: 50%;
          position: absolute;
          top: 8px;
          right: 8px;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }

        .notification-dropdown {
          position: absolute;
          right: 0;
          top: 54px;
          width: 350px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          box-shadow: 0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.04);
          overflow: hidden;
          transform-origin: top right;
          animation: navDropdownFade 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes navDropdownFade {
          from { opacity: 0; transform: scale(0.95) translateY(-10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .dropdown-header {
          padding: 16px 20px;
          border-bottom: 1px solid #f1f5f9;
          background-color: #f8fafc;
          font-size: 14px;
          font-weight: 600;
          color: #1e293b;
          display: flex;
          justify-content: space-between;
          align-items: center;
          text-align: left;
        }

        .dropdown-badge {
          background-color: #f1f5f9;
          color: #475569;
          padding: 3px 8px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: -0.01em;
          border: 1px solid #e2e8f0;
        }

        .activity-scroll-area {
          max-height: 320px;
          overflow-y: auto;
        }

        .activity-scroll-area::-webkit-scrollbar {
          width: 5px;
        }

        .activity-scroll-area::-webkit-scrollbar-track {
          background: transparent;
        }

        .activity-scroll-area::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .activity-row {
          padding: 14px 20px;
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.2s ease;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .activity-row:last-child {
          border-bottom: none;
        }

        .activity-row:hover {
          background-color: #f8fafc;
        }

        .activity-text {
          font-size: 13px;
          color: #334155;
          margin: 0;
          line-height: 1.5;
        }

        .activity-time-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 2px;
        }

        .activity-time {
          font-size: 11px;
          color: #94a3b8;
          font-weight: 500;
        }

        .activity-status-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 14px;
          cursor: pointer;
          padding: 6px 14px 6px 8px;
          border-radius: 14px;
          border: 1px solid transparent;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          user-select: none;
        }

        .profile-trigger:hover {
          background-color: #ffffff;
          border-color: #f1f5f9;
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.04);
        }

        .profile-text-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .user-name-text {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          line-height: 1.4;
          letter-spacing: -0.01em;
        }

        .user-id-badge {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
          margin: 0;
          line-height: 1.2;
          text-transform: uppercase;
        }

        .avatar-image {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 0 0 2px #e2e8f0;
          background-color: #f8fafc;
          transition: transform 0.2s ease;
        }

        .profile-trigger:hover .avatar-image {
          transform: scale(1.04);
          box-shadow: 0 0 0 2px #3b82f6;
        }

        @media (max-width: 1024px) {
          .professional-navbar {
            padding: 0 24px;
            height: 64px;
          }
          .profile-text-group {
            display: none; 
          }
          .profile-trigger {
            padding: 4px;
          }
        }
      `}</style>

      {/* Sidebar Toggle Button */}
      <button className="nav-action-btn" onClick={toggleSidebar} aria-label="Toggle navigation menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              {/* menu icon */}
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginLeft: "auto" }}>
        <div ref={notificationRef} style={{ position: "relative" }}>
          <button
            className="nav-action-btn bell-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View alerts"
          >
            🔔
            {unreadCount > 0 && <span className="notification-dot"></span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                Notifications
                {unreadCount > 0 && (
                  <span className="dropdown-badge">{unreadCount} New</span>
                )}
              </div>

              <div className="activity-scroll-area">
                {recentActivities.length > 0 ? (
                  recentActivities.map((a) => (
                    <div key={a.id} className="activity-row">
                      <p className="activity-text">{a.text}</p>
                      <div className="activity-time-wrapper">
                        <span className="activity-time">{a.time}</span>
                        <span
                          className="activity-status-dot"
                          style={{
                            backgroundColor: a.urgent ? "#ef4444" : "#3b82f6"
                          }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "32px 20px", color: "#94a3b8", fontSize: "13px", textAlign: "center", fontWeight: "500" }}>
                    No recent notifications
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="profile-trigger" onClick={goProfile}>
          <img
            src={profile?.avatar || profileIconImage}
            className="avatar-image"
            alt="profile"
          />
          <div className="profile-text-group">
            <p className="user-name-text">
              {profile?.business_name || profile?.name || (isAdmin ? "System Admin" : "User Account")}
            </p>
            <p className="user-id-badge">
              {profile?.user_id || profile?.uid || "ID: admin-01"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}