import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar({ isOpen }) {
  const navigate = useNavigate();

  const menu = [
    { name: "Dashboard", path: "/supplier/dashboard" },
    { name: "Stock List", path: "/supplier/dashboard/stock-list" },
    { name: "Add Product", path: "/supplier/dashboard/add-product" },
    { name: "Vendor Request", path: "/supplier/dashboard/vendor-request" },
    { name: "Profile", path: "/supplier/dashboard/profile" },
  ];

  const sidebarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100vh",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    zIndex: 100,
    width: isOpen ? "240px" : "0px",
    padding: isOpen ? "24px 16px" : "24px 0px",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRight: isOpen ? "1px solid #1e293b" : "none",
  };

  const logoStyle = {
    fontSize: "25px",
    fontWeight: "700",
    color: "#f1f3f6",
    letterSpacing: "0.05em",
    margin: "0 0 32px 8px",
    whiteSpace: "nowrap",
  };

  const navContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  };

  const baseLinkStyle = {
    display: "flex",
    alignItems: "center",
    padding: "12px 16px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    whiteSpace: "nowrap",
    transition: "all 0.2s ease-in-out",
  };

  const logoutButtonStyle = {
    width: "100%",
    padding: "12px 16px",
    backgroundColor: "transparent",
    color: "#f87171",
    border: "1px solid transparent",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    whiteSpace: "nowrap",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div style={sidebarStyle}>
      <h2 style={logoStyle}>Supplier Portal</h2>

      <nav style={navContainerStyle}>
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            style={({ isActive }) => ({
              ...baseLinkStyle,
              color: isActive ? "#ffffff" : "#94a3b8",
              backgroundColor: isActive ? "#1d4ed8" : "transparent",
              boxShadow: isActive ? "0 4px 12px rgba(29, 78, 216, 0.3)" : "none",
            })}
            onMouseOver={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.color = "#f1f5f9";
                e.currentTarget.style.backgroundColor = "#1e293b";
              }
            }}
            onMouseOut={(e) => {
              if (!e.currentTarget.classList.contains("active")) {
                e.currentTarget.style.color = "#94a3b8";
                e.currentTarget.style.backgroundColor = "transparent";
              }
            }}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: "auto", pt: "16px", borderTop: "1px solid #1e293b" }}>
        <button
          style={logoutButtonStyle}
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
            e.currentTarget.style.borderColor = "rgba(239, 68, 68, 0.2)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.borderColor = "transparent";
          }}
        >
          Logout System
        </button>
      </div>
    </div>
  );
}


