import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function VendorDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    // if not logged in
    if (!role) {
      navigate("/login");
      return;
    }

    // role protection
    if (role !== "vendor") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Vendor Dashboard</h1>
      <p>Welcome Vendor 👋</p>

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}