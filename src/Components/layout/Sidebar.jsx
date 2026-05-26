import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, role = "supplier" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const supplierMenu = [
    { 
      name: "Dashboard", 
      path: "/supplier/dashboard", 
      endProp: true,
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      )
    },
    { 
      name: "Stock List", 
      path: "/supplier/dashboard/stock-list",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      )
    },
    { 
      name: "Add Product", 
      path: "/supplier/dashboard/add-product",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      )
    },
    { 
      name: "Vendor Request", 
      path: "/supplier/dashboard/vendor-request",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
    { 
      name: "Profile", 
      path: "/supplier/dashboard/profile",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
  ];

  const vendorMenu = [
    { 
      name: "Dashboard", 
      path: "/vendor/dashboard", 
      endProp: true,
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      )
    },
    { 
      name: "Browse Products", 
      path: "/vendor/dashboard/browse-products",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      )
    },
    { 
      name: "My Orders", 
      path: "/vendor/dashboard/my-orders",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      )
    },
    { 
      name: "Request Product", 
      path: "/vendor/dashboard/request-product",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      )
    },
    { 
      name: "Profile", 
      path: "/vendor/dashboard/profile",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    },
  ];

  const adminMenu = [
    { 
      name: "Dashboard", 
      path: "/admin/dashboard", 
      endProp: true,
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <rect x="3" y="3" width="7" height="9"></rect>
          <rect x="14" y="3" width="7" height="5"></rect>
          <rect x="14" y="12" width="7" height="9"></rect>
          <rect x="3" y="16" width="7" height="5"></rect>
        </svg>
      )
    },
    { 
      name: "Suppliers", 
      path: "/admin/dashboard/suppliers",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    { 
      name: "Vendors", 
      path: "/admin/dashboard/vendors",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      )
    },
    { 
      name: "Products", 
      path: "/admin/dashboard/products",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <polygon points="12 2 2 7 12 12 22 7 12 22"></polygon>
          <polyline points="2 17 12 22 22 17"></polyline>
        </svg>
      )
    },
    { 
      name: "Orders", 
      path: "/admin/dashboard/orders",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      )
    },
    { 
      name: "Stock Monitoring", 
      path: "/admin/dashboard/stock-monitoring",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      )
    },
    { 
      name: "Profile", 
      path: "/admin/dashboard/profile",
      icon: (isActive) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={isActive ? "#ffffff" : "#64748b"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      )
    }
  ];

  const storageRole = (localStorage.getItem("role") || role || "").trim().toLowerCase();
  const currentMenu = storageRole === "vendor" ? vendorMenu : storageRole === "admin" ? adminMenu : supplierMenu;
  const portalName = storageRole === "vendor" ? "Vendor Portal" : storageRole === "admin" ? "Admin Portal" : "Supplier Portal";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    zIndex: 200,
    width: "260px",
    padding: "28px 18px",
    overflowX: "hidden",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRight: "1px solid #1e293b",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
  };

  const logoStyle = {
    fontSize: "22px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "-0.03em",
    margin: "0 0 36px 0",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%"
  };

  const navContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    flex: 1,
  };

  const logoutButtonStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "transparent",
    color: "#f87171",
    border: "1px solid transparent",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "all 0.2s ease-in-out",
    boxSizing: "border-box"
  };

  return (
    <>
      <style>{`
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 10px;
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.2s ease;
          color: #94a3b8;
          background-color: transparent;
        }
        .sidebar-link:hover:not(.active) {
          color: #ffffff !important;
          background-color: #1e293b !important;
        }
        .sidebar-link.active {
          color: #ffffff !important;
          background-color: #3b82f6 !important;
          font-weight: 600;
        }
        .logout-btn-hover:hover {
          background-color: rgba(239, 68, 68, 0.1) !important;
          border-color: rgba(239, 68, 68, 0.2) !important;
        }
      `}</style>

      <div style={sidebarStyle}>
        <div style={logoStyle}>{portalName}</div>

        <div style={navContainerStyle}>
          {currentMenu.map((item, index) => {
            const isActive = item.endProp
              ? location.pathname === item.path
              : location.pathname.startsWith(item.path);

            return (
              <NavLink
                key={index}
                to={item.path}
                end={item.endProp}
                className={({ isActive: navActive }) =>
                  `sidebar-link ${navActive ? "active" : ""}`
                }
              >
                {item.icon(isActive)}
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <button
          onClick={handleLogout}
          className="logout-btn-hover"
          style={logoutButtonStyle}
        >
          Logout
        </button>
      </div>
    </>
  );
}