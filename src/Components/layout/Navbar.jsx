import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const goProfile = () => {
    navigate("/supplier/dashboard/profile");
  };

  const containerStyle = {
    height: "64px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    padding: "0 32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end", // Aligns all items cleanly to the right side
    boxSizing: "border-box",
    width: "100%",
  };

  const actionGroupStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px", // Clean horizontal spacing between the badge elements
  };

  const iconContainerStyle = {
    position: "relative",
    cursor: "pointer",
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    transition: "background-color 0.2s",
  };

  const notificationDotStyle = {
    position: "absolute",
    top: "4px",
    right: "4px",
    width: "9px",
    height: "9px",
    backgroundColor: "#dc2626", // Corporate crimson alert notification red
    borderRadius: "50%",
    border: "2px solid #ffffff", // Crisp contrast border line separation
  };

  const profileBadgeStyle = {
    cursor: "pointer",
    backgroundColor: "#eff6ff",
    width: "38px",
    height: "38px",
    minWidth: "38px",
    minHeight: "38px",
    borderRadius: "50%",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #dbeafe",
    fontSize: "18px",
    boxSizing: "border-box",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <div style={containerStyle}>
      <div style={actionGroupStyle}>
        
        {/* NOTIFICATION BELL WITH RED DOT */}
        <div 
          style={iconContainerStyle}
          title="Notifications"
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f1f5f9")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        >
          🔔
          <span style={notificationDotStyle} />
        </div>

        {/* PROFILE BADGE ICON */}
        <div
          onClick={goProfile}
          style={profileBadgeStyle}
          title="View Profile"
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
            e.currentTarget.style.color = "#ffffff";
            e.currentTarget.style.borderColor = "#2563eb";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#eff6ff";
            e.currentTarget.style.color = "#2563eb";
            e.currentTarget.style.borderColor = "#dbeafe";
          }}
        >
          👤
        </div>

      </div>
    </div>
  );
}
