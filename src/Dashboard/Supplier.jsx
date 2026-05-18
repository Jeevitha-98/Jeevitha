import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SupplierDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role || role !== "supplier") {
      navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={styles.page}>
      
      {/* HEADER */}
      <div style={styles.header}>
        <h2>Supplier Dashboard</h2>
        <button onClick={handleLogout} style={styles.logoutBtn}>
          Logout
        </button>
      </div>

      {/* CARDS */}
      <div style={styles.cardContainer}>

        <div style={styles.card}>
          <h3>Total Orders</h3>
          <p>120</p>
        </div>

        <div style={styles.card}>
          <h3>Pending Orders</h3>
          <p>35</p>
        </div>

        <div style={styles.card}>
          <h3>Completed</h3>
          <p>85</p>
        </div>

      </div>

    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#f3f4f6",
    padding: "20px",
    fontFamily: "Arial",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#4f46e5",
    color: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    marginBottom: "20px",
  },

  logoutBtn: {
    background: "#ef4444",
    border: "none",
    padding: "8px 12px",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
  },

  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
};