import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInventory } from "../../Context/Inventorycontext";
import { useVendor } from "../../Context/Vendorcontext";
import profileIconImage from "../../Assests/Profileicon Image.jpg";

export default function Navbar({ role = "supplier", toggleSidebar, isOpen }) {
  const navigate = useNavigate();
  const isVendor = role.toLowerCase() === "vendor";

  const supplierContext = !isVendor ? useInventory() : {};
  const vendorContext = isVendor ? useVendor() : {};

  const currentContext = isVendor ? vendorContext : supplierContext;
  const { profile, activityLogs, systemActivities, pendingRequests, vendorRequests } = currentContext;

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
    navigate(isVendor ? "/vendor/dashboard/profile" : "/supplier/dashboard/profile");
  };

  const getRecentActivities = () => {
    const list = [];
    const logs = isVendor ? activityLogs : systemActivities;
    const requests = isVendor ? pendingRequests : vendorRequests;

    if (logs?.length) {
      logs.forEach((act, index) => {
        list.push({
          id: act.id || `log-${index}`,
          text: act.text || act.message,
          time: act.time || "Just now",
          urgent: act.urgent || false
        });
      });
    }

    if (requests?.length) {
      requests.forEach((req, index) => {
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
    }

    return list.slice(0, 4);
  };

  const recentActivities = getRecentActivities();
  const unreadCount = recentActivities.filter(a => a.urgent).length;

  return (
    <div className="professional-navbar">
      <style>{`
        .professional-navbar {
          height: 64px;
          background-color: #ffffff;
          border-bottom: 1px solid #f1f5f9;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          box-sizing: border-box;
          position: relative;
          z-index: 40;
          font-family: 'Inter', -apple-system, sans-serif;
          width: 100%;
        }

        .nav-action-btn {
          background: transparent;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          color: #64748b;
          transition: all 0.2s ease;
          position: relative;
          outline: none;
        }

        .nav-action-btn:hover {
          background-color: #f8fafc;
          color: #0f172a;
        }

        .notification-dot {
          width: 8px;
          height: 8px;
          background-color: #ef4444;
          border-radius: 50%;
          position: absolute;
          top: 10px;
          right: 10px;
          border: 2px solid #ffffff;
        }

        .notification-dropdown {
          position: absolute;
          right: 0;
          top: 50px;
          width: 320px;
          background-color: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          animation: navDropdownFade 0.2s ease;
        }

        @keyframes navDropdownFade {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-header {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
          background-color: #f8fafc;
          font-size: 13px;
          font-weight: 600;
          color: #0f172a;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .activity-row {
          padding: 12px 16px;
          border-bottom: 1px solid #f1f5f9;
          transition: background-color 0.15s ease;
          text-align: left;
        }

        .activity-row:hover {
          background-color: #f8fafc;
        }

        .activity-text {
          font-size: 12px;
          color: #334155;
          margin: 0 0 4px 0;
          line-height: 1.5;
        }

        .activity-time {
          font-size: 10px;
          color: #94a3b8;
          font-weight: 500;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          padding: 6px 12px;
          border-radius: 12px;
          transition: background-color 0.2s ease;
          user-select: none;
        }

        .profile-trigger:hover {
          background-color: #f8fafc;
        }

        .user-name-text {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin: 0;
          line-height: 1.3;
        }

        .user-id-badge {
          font-size: 11px;
          color: #64748b;
          font-weight: 500;
          margin: 0;
        }

        .avatar-image {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #e2e8f0;
          background-color: #f8fafc;
        }

        @media (max-width: 1024px) {
          .professional-navbar {
            padding: 0 16px;
          }
          .user-name-text, .user-id-badge {
            display: none; /* Safely collapses names on mobile devices */
          }
        }
      `}</style>

      {/* Dynamic Sidebar Hamburger Controller */}
      <button className="nav-action-btn" onClick={toggleSidebar} aria-label="Toggle navigation menu">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          {isOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="4" y1="12" x2="20" y2="12"></line>
              <line x1="4" y1="6" x2="20" y2="6"></line>
              <line x1="4" y1="18" x2="20" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginLeft: "auto" }}>
        
        {/* Dynamic Activity Dropdown Block */}
        <div ref={notificationRef} style={{ position: "relative" }}>
          <button className="nav-action-btn" onClick={() => setShowNotifications(!showNotifications)} aria-label="View alerts">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            {unreadCount > 0 && <span className="notification-dot" />}
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="dropdown-header">
                <span>Recent Notifications</span>
                {unreadCount > 0 && (
                  <span style={{ fontSize: "11px", backgroundColor: "#fee2e2", color: "#ef4444", padding: "2px 8px", borderRadius: "20px" }}>
                    {unreadCount} New
                  </span>
                )}
              </div>
              <div style={{ maxHeight: "280px", overflowY: "auto" }}>
                {recentActivities.length === 0 ? (
                  <div style={{ padding: "24px", textAlign: "center", color: "#94a3b8", fontSize: "13px" }}>
                    No recent activities recorded.
                  </div>
                ) : (
                  recentActivities.map((a) => (
                    <div key={a.id} className="activity-row">
                      <p className="activity-text">{a.text}</p>
                      <span className="activity-time">{a.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Corporate Profile Metadata Token Wrapper */}
        <div onClick={goProfile} className="profile-trigger">
          <div style={{ textAlign: "right" }}>
            <p className="user-name-text">
              {profile?.businessName || profile?.name || (isVendor ? "Vendor Traders" : "Yazh Traders")}
            </p>
            <p className="user-id-badge">
              {/* FIXED: Dynamically switches layout fallback defaults based on the contextual portal runtime */}
              {profile?.uid || profile?.id || (isVendor ? "VEN001" : "SUP003")}
            </p>
          </div>
          <img
            src={profile?.profileImg || profileIconImage}
            alt="User profile capsule avatar"
            className="avatar-image"
            onError={(e) => { e.target.src = profileIconImage; }}
          />
        </div>

      </div>
    </div>
  );}
      
