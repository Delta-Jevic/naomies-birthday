import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRsvp } from "../api/rsvpApi";

type FormData = {
  name: string;
  phone: string;
  email: string;
};

export default function Invitation() {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // This state stores the RSVP form values
  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
  });

  // Updates the input field that the user is typing in
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // For now this only validates and shows the success screen.
  // Later, this is where we will send the data to the backend API.
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.name || !formData.phone || !formData.email) return;

  try {
    await createRsvp(formData.name, formData.phone, formData.email);
    setSubmitted(true);
  } catch (error) {
    console.error("Error sending RSVP:", error);
    alert("Could not connect to the server.");
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

  const invitationCard: React.CSSProperties = {
    width: "100%",
    minHeight: "740px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 24px 55px rgba(0,0,0,0.28)",
    background:
      "linear-gradient(180deg, #3a0d18 0%, #5b1326 45%, #2b0711 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: "34px 26px 28px 26px",
    boxSizing: "border-box",
    color: "#efd3a3",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const formCard: React.CSSProperties = {
    width: "100%",
    minHeight: "740px",
    borderRadius: "28px",
    overflow: "hidden",
    boxShadow: "0 24px 55px rgba(0,0,0,0.28)",
    background:
      "linear-gradient(180deg, #3a0d18 0%, #5b1326 45%, #2b0711 100%)",
    backgroundSize: "cover",
    backgroundPosition: "center",
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

  const backButton: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "999px",
    border: "1px solid rgba(237,208,164,0.35)",
    background: "rgba(255,255,255,0.05)",
    color: "#fff1df",
    fontSize: "13px",
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    cursor: "pointer",
    marginTop: "12px",
  };

  return (
    <div style={pageStyle}>
      <div style={cardWrap}>
        {!showForm ? (
          <div style={invitationCard}>
            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "14px",
                  letterSpacing: "0.42em",
                  textTransform: "uppercase",
                  color: "#f2ddb8",
                  marginTop: "6px",
                }}
              >
                Join Us For A
              </div>

              {/* Clicking this title opens the menu page */}
              <div
                onClick={() => navigate("/menu")}
                style={{
                  marginTop: "28px",
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: "68px",
                  lineHeight: 1,
                  color: "#e8c58e",
                  cursor: "pointer",
                }}
              >
                Birthday Party
              </div>

              <div
                style={{
                  marginTop: "28px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#f4e0be",
                  lineHeight: 1.5,
                }}
              >
                Celebrating Naomie's Birthday
              </div>
            </div>

            <div>
              <div
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#f0d8b2",
                  marginBottom: "16px",
                }}
              >
                April
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  gap: "14px",
                  alignItems: "end",
                }}
              >
                <div>
                  <div
                    style={{
                      height: "1px",
                      background: "#d4a46f",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "#f4e0be",
                    }}
                  >
                    Saturday
                  </div>
                </div>

                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "74px",
                    lineHeight: 1,
                    color: "#f0d2a6",
                    fontWeight: 400,
                  }}
                >
                  10
                </div>

                <div>
                  <div
                    style={{
                      height: "1px",
                      background: "#d4a46f",
                      marginBottom: "10px",
                    }}
                  />
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "14px",
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "#f4e0be",
                    }}
                  >
                    3:00 PM
                  </div>
                </div>
              </div>

              <div
                style={{
                  marginTop: "16px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "18px",
                  letterSpacing: "0.30em",
                  textTransform: "uppercase",
                  color: "#f0d8b2",
                }}
              >
                2026
              </div>

              <div
                style={{
                  marginTop: "34px",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "17px",
                  fontWeight: 500,
                  letterSpacing: "0.10em",
                  textTransform: "uppercase",
                  color: "#f2dfc2",
                  lineHeight: 1.7,
                }}
              >
                720 Hank Aaron Drive SE, Atlanta (GA)
              </div>

              <div style={{ marginTop: "28px" }}>
                <div
                  style={{
                    marginTop: "8px",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "19px",
                    letterSpacing: "0.14em",
                    color: "#f6e4c8",
                  }}
                >
                  You are Welcome
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowForm(true)}
              style={{
                alignSelf: "center",
                marginTop: "28px",
                padding: "14px 24px",
                borderRadius: "999px",
                border: "1px solid rgba(239,209,169,0.42)",
                background: "rgba(239,209,169,0.10)",
                color: "#fff0df",
                fontSize: "13px",
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontFamily: "'Cormorant Garamond', serif",
              }}
            >
              Click to RSVP
            </button>
          </div>
        ) : (
          <div style={formCard}>
            <div style={glassBox}>
              {!submitted ? (
                <>
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "34px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "#efd1a9",
                      }}
                    >
                      RSVP
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
                      We can’t wait to celebrate this special day with you.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} style={{ marginTop: "28px" }}>
                    <label style={labelStyle}>
                      Name
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        style={inputStyle}
                      />
                    </label>

                    <label style={labelStyle}>
                      Phone number
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        style={inputStyle}
                      />
                    </label>

                    <label style={labelStyle}>
                      Email
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                        style={inputStyle}
                      />
                    </label>

                    <button type="submit" style={goldButton}>
                      Submit RSVP
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      style={backButton}
                    >
                      Back to invitation
                    </button>
                  </form>
                </>
              ) : (
                <div
                  style={{
                    minHeight: "620px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    padding: "0 10px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "34px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#efd1a9",
                    }}
                  >
                    Thank you
                  </div>

                  <p
                    style={{
                      marginTop: "24px",
                      fontSize: "22px",
                      lineHeight: 1.8,
                      color: "#fff3e8",
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    Thanks, {formData.name}. You are welcome.
                  </p>

                  <p
                    style={{
                      marginTop: "10px",
                      fontSize: "15px",
                      color: "#f6dfcf",
                      fontFamily: "'Cormorant Garamond', serif",
                    }}
                  >
                    We have received your RSVP.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setShowForm(false);
                      setFormData({
                        name: "",
                        phone: "",
                        email: "",
                      });
                    }}
                    style={{
                      ...goldButton,
                      maxWidth: "180px",
                    }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}