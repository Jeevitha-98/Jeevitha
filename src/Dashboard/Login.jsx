// src/pages/auth/Login.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from "../Services/api";

export default function LoginPage() {
  const navigate = useNavigate();

  // ================= LOGIN STATES =================
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // ================= REGISTER STATES =================
  const [showRegister, setShowRegister] = useState(false);

  const [registerMobile, setRegisterMobile] = useState("");
  const [location, setLocation] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [role, setRole] = useState("");

  // ================= COMMON STATES =================
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =================================================
  // LOGIN
  // =================================================
  const handleLogin = async () => {
    setError("");

    if (!mobile || mobile.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    if (!password.trim()) {
      setError("Enter password (User ID)");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        mobile,
        password,
      });

      const data = response.data;

// store session
localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);
localStorage.setItem("user_id", data.user_id);

// role-based redirect
if (data.role === "supplier") {
  navigate("/supplier/dashboard");
} 
else if (data.role === "vendor") {
  navigate("/vendor/dashboard");
} 
else if (data.role === "admin") {
  navigate("/admin/dashboard");
} 
else {
  setError("Invalid role");
}

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // =================================================
  // REGISTER
  // =================================================
  const handleRegister = async (e) => {
    if (e) e.preventDefault();
    setError("");

    if (!registerMobile || registerMobile.length !== 10) {
      setError("Enter valid 10-digit mobile number");
      return;
    }

    if (!location.trim() || !businessName.trim() || !businessType.trim()) {
      setError("All fields are required");
      return;
    }

    if (!role) {
      setError("Select role");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/register", {
        mobile: registerMobile,
        location,
        business_name: businessName,
        business_type: businessType,
        role,
      });

      const data = response.data;

      // IMPORTANT: backend must return user_id like SUP001 / VEN001
      alert(`Account created successfully\nUser ID: ${data.user_id}`);

      // reset form
      setRegisterMobile("");
      setLocation("");
      setBusinessName("");
      setBusinessType("");
      setRole("");

      setShowRegister(false);
      setError("");

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        err.response?.data?.message ||
        "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* LEFT */}
      <div className="login-container">
        <div className="login-left">
          <h1 className="login-title">
            Supplier & Vendor Platform
          </h1>
          <p className="login-subtext">
            Manage suppliers, vendors, and admin workflows efficiently
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="login-right">

        <div className="login-form">

          {/* LOGIN */}
          {!showRegister && (
            <>
              <h2>Login</h2>

              <input
                className="login-input"
                type="tel"
                maxLength={10}
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, ""))
                }
              />

              <input
                className="login-input"
                type="password"
                placeholder="Password (User ID)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />

              <button
                className="login-button"
                onClick={handleLogin}
                disabled={loading}
              >
                {loading ? "Please wait..." : "Login"}
              </button>

              {error && <p className="error-text">{error}</p>}
            </>
          )}

          {/* REGISTER */}
          {showRegister && (
            <>
              <h2>Register</h2>

              <input
                className="login-input"
                type="tel"
                maxLength={10}
                placeholder="Mobile Number"
                value={registerMobile}
                onChange={(e) =>
                  setRegisterMobile(e.target.value.replace(/\D/g, ""))
                }
              />

              <input
                className="login-input"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input
                className="login-input"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />

              <input
                className="login-input"
                placeholder="Business Type"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
              />

              <select
                className="login-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Select Role</option>
                <option value="supplier">Supplier</option>
                <option value="vendor">Vendor</option>
              </select>

              <button
                className="login-button"
                onClick={handleRegister}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Account"}
              </button>

              {error && <p className="error-text">{error}</p>}
            </>
          )}

          {/* TOGGLE */}
          <div className="login-link">
            {!showRegister ? (
              <p>
                Don't have an account?{" "}
                <span
                  onClick={() => {
                    setError("");
                    setShowRegister(true);
                  }}
                >
                  Register here
                </span>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <span
                  onClick={() => {
                    setError("");
                    setShowRegister(false);
                  }}
                >
                  Login here
                </span>
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}