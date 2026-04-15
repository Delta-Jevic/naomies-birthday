import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLogin } from "../api/adminApi";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await adminLogin(formData.email, formData.password);

      // Save email so the OTP page knows where to verify
      localStorage.setItem("adminEmail", formData.email);

      // Save the OTP code so the verify page can display it (email sending is disabled)
      if (result.code) {
        localStorage.setItem("adminOtpCode", result.code);
      }

      navigate("/admin/verify-otp");
    } catch (err: any) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f3efea",
    padding: "20px",
  };

  const cardWrap: React.CSSProperties = {
    width: "100%",
    maxWidth: "390px",
  };

  const formCard: React.CSSProperties = {
    width: "100%",
    minHeight: "740px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 24px 55px rgba(0,0,0,0.28)",
    background:
      "linear-gradient(180deg, #3a0d18 0%, #5b1326 45%, #2b0711 100%)",
    padding: "24px",
    boxSizing: "border-box",
    color: "#fff4e9",
  };

  const glassBox: React.CSSProperties = {
    minHeight: "692px",
    borderRadius: "22px",
    background: "rgba(0,0,0,0.18)",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(2px)",
    WebkitBackdropFilter: "blur(2px)",
    padding: "24px 18px",
    boxSizing: "border-box",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(255,248,243,0.96)",
    color: "#42101c",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    marginTop: "8px",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "14px",
    color: "#f8e6d2",
    textAlign: "left",
    marginTop: "18px",
    fontFamily: "'Cormorant Garamond', serif",
    letterSpacing: "0.04em",
  };

  const goldButton: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "999px",
    border: "none",
    background: "#edd0a4",
    color: "#5b1221",
    fontWeight: 700,
    fontSize: "13px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: "24px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardWrap}>
        <div style={formCard}>
          <div style={glassBox}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "52px",
                  lineHeight: 1,
                  color: "#e8c58e",
                }}
              >
                Admin Login
              </div>

              <div
                style={{
                  width: "96px",
                  height: "1px",
                  background: "#d3a16d",
                  margin: "14px auto 0",
                }}
              />

              <p
                style={{
                  marginTop: "22px",
                  fontSize: "16px",
                  lineHeight: 1.8,
                  color: "#fff1e3",
                  fontFamily: "'Cormorant Garamond', serif",
                }}
              >
                Sign in to access the RSVP dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: "28px" }}>
              <label style={labelStyle}>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter admin email"
                  required
                  style={inputStyle}
                />
              </label>

              <label style={labelStyle}>
                Password
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                  style={inputStyle}
                />
              </label>

              {error && (
                <p style={{ color: "#ffd3d3", marginTop: "16px" }}>{error}</p>
              )}

              <button type="submit" style={goldButton} disabled={loading}>
                {loading ? "Signing In..." : "Sign In"}
              </button>

              <p
                style={{
                  marginTop: "18px",
                  textAlign: "center",
                  color: "#f6e4c8",
                }}
              >
                Don’t have an account?{" "}
                <Link to="/admin/signup" style={{ color: "#edd0a4" }}>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}