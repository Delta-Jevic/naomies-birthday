import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyAdminOtp } from "../api/adminApi";

export default function AdminVerifyOtp() {
  const navigate = useNavigate();
  const adminEmail = localStorage.getItem("adminEmail") || "";

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await verifyAdminOtp(adminEmail, code);

      if (result.isAuthenticated) {
        localStorage.setItem("adminAuthenticated", "true");
        navigate("/admin/rsvps");
      }
    } catch (err: any) {
      setError(err.message || "Verification failed.");
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
                Verify Code
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
                Enter the code sent to:
              </p>

              <p style={{ color: "#edd0a4", marginTop: "8px" }}>{adminEmail}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ marginTop: "28px" }}>
              <label style={labelStyle}>
                Verification Code
                <input
                  type="text"
                  name="code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  required
                  style={inputStyle}
                />
              </label>

              {error && (
                <p style={{ color: "#ffd3d3", marginTop: "16px" }}>{error}</p>
              )}

              <button type="submit" style={goldButton} disabled={loading}>
                {loading ? "Verifying..." : "Verify"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}