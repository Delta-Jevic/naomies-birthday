import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRsvps } from "../api/rsvpApi";

type Rsvp = {
  id: number;
  name: string;
  phone: string;
  email: string;
  created_at?: string;
  createdAt?: string;
};

export default function AdminRsvps() {
  const navigate = useNavigate();

  const [rsvps, setRsvps] = useState<Rsvp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    localStorage.removeItem("adminEmail");
    navigate("/admin/login");
  };

    useEffect(() => {
    let isMounted = true;

    async function loadRsvps() {
        try {
        const data = await getRsvps();

        if (isMounted) {
            setRsvps(data);
        }
        } catch (err) {
        console.error(err);

        if (isMounted) {
            setError("Could not connect to the server.");
        }
        } finally {
        if (isMounted) {
            setLoading(false);
        }
        }
    }

    // First load immediately
    loadRsvps();

    // Refresh every 5 seconds so new RSVP cards appear automatically
    const interval = setInterval(() => {
        loadRsvps();
    }, 5000);

    return () => {
        isMounted = false;
        clearInterval(interval);
    };
    }, []);

  const totalRsvps = rsvps.length;
  const latestRsvp = rsvps[0];
  const uniqueEmails = new Set(
    rsvps.map((r) => r.email?.trim().toLowerCase()).filter(Boolean)
  ).size;

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "#f3efea",
    padding: "24px",
    boxSizing: "border-box",
  };

  const shellStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const topBarStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "22px",
    gap: "16px",
    flexWrap: "wrap",
  };

  const titleStyle: React.CSSProperties = {
    margin: 0,
    fontFamily: "'Great Vibes', cursive",
    fontSize: "44px",
    color: "#5b1326",
    lineHeight: 1,
  };

  const subTitleStyle: React.CSSProperties = {
    margin: "6px 0 0 0",
    color: "#7a5a4b",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "20px",
  };

  const logoutButtonStyle: React.CSSProperties = {
    border: "none",
    borderRadius: "999px",
    padding: "12px 18px",
    background: "linear-gradient(180deg, #5b1326 0%, #3a0d18 100%)",
    color: "#f7e6d0",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
  };

  const heroStyle: React.CSSProperties = {
    background: "linear-gradient(135deg, #5b1326 0%, #7c2d46 50%, #8d4f2b 100%)",
    borderRadius: "24px",
    padding: "28px",
    color: "#fff4e9",
    boxShadow: "0 18px 40px rgba(59, 13, 24, 0.22)",
    marginBottom: "22px",
  };

  const heroHeadingStyle: React.CSSProperties = {
    margin: 0,
    fontSize: "42px",
    fontWeight: 800,
    color: "#f4dfc1",
  };

  const heroTextStyle: React.CSSProperties = {
    margin: "10px 0 0 0",
    fontSize: "18px",
    color: "#f7eadb",
    fontFamily: "'Cormorant Garamond', serif",
  };

  const badgeStyle: React.CSSProperties = {
    display: "inline-block",
    marginTop: "18px",
    padding: "10px 16px",
    borderRadius: "999px",
    background: "rgba(255,255,255,0.16)",
    color: "#fff3e4",
    fontWeight: 700,
    letterSpacing: "0.06em",
  };

  const statsGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "24px",
  };

  const statCardStyle: React.CSSProperties = {
    background: "rgba(255, 250, 245, 0.95)",
    borderRadius: "20px",
    padding: "22px",
    boxShadow: "0 10px 26px rgba(0,0,0,0.08)",
    border: "1px solid rgba(91, 19, 38, 0.08)",
  };

  const statLabelStyle: React.CSSProperties = {
    margin: 0,
    color: "#7a5a4b",
    fontSize: "15px",
    fontWeight: 600,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
  };

  const statValueStyle: React.CSSProperties = {
    margin: "12px 0 0 0",
    color: "#5b1326",
    fontSize: "38px",
    fontWeight: 800,
  };

  const mainGridStyle: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1.25fr 0.75fr",
    gap: "22px",
  };

  const panelStyle: React.CSSProperties = {
    background: "rgba(255, 250, 245, 0.97)",
    borderRadius: "22px",
    padding: "24px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.08)",
    border: "1px solid rgba(91, 19, 38, 0.08)",
  };

  const panelTitleStyle: React.CSSProperties = {
    margin: 0,
    color: "#5b1326",
    fontSize: "28px",
    fontWeight: 800,
  };

  const listStyle: React.CSSProperties = {
    marginTop: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  };

  const guestCardStyle: React.CSSProperties = {
    borderRadius: "18px",
    padding: "18px",
    background: "#fffdf9",
    border: "1px solid rgba(91, 19, 38, 0.08)",
  };

  const guestNameStyle: React.CSSProperties = {
    margin: 0,
    color: "#5b1326",
    fontSize: "22px",
    fontWeight: 800,
  };

  const guestMetaStyle: React.CSSProperties = {
    margin: "8px 0 0 0",
    color: "#6f5648",
    lineHeight: 1.7,
    fontSize: "15px",
  };

  const sideCardStyle: React.CSSProperties = {
    borderRadius: "18px",
    padding: "18px",
    background: "#fffdf9",
    border: "1px solid rgba(91, 19, 38, 0.08)",
    marginTop: "16px",
  };

  const smallLabelStyle: React.CSSProperties = {
    margin: 0,
    color: "#8a6b5b",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: "12px",
    fontWeight: 700,
  };

  const smallValueStyle: React.CSSProperties = {
    margin: "8px 0 0 0",
    color: "#5b1326",
    fontSize: "20px",
    fontWeight: 700,
  };

  if (loading) {
    return (
      <div style={pageStyle}>
        <div style={shellStyle}>
          <div style={heroStyle}>
            <h1 style={heroHeadingStyle}>Loading RSVPs...</h1>
            <p style={heroTextStyle}>Please wait while the dashboard loads.</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={pageStyle}>
        <div style={shellStyle}>
          <div style={heroStyle}>
            <h1 style={heroHeadingStyle}>Admin Dashboard</h1>
            <p style={{ ...heroTextStyle, color: "#ffd9d9" }}>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <div style={topBarStyle}>
          <div>
            <h1 style={titleStyle}>Admin Dashboard</h1>
            <p style={subTitleStyle}>Manage and review all RSVP submissions</p>
          </div>

          <button onClick={handleLogout} style={logoutButtonStyle}>
            Logout
          </button>
        </div>

        <div style={heroStyle}>
          <h2 style={heroHeadingStyle}>This App is For My Love</h2>
          <p style={heroTextStyle}>
            View guest responses, track recent entries, and manage attendance
            from one place.
          </p>
          <div style={badgeStyle}>Webapp Active</div>
        </div>

        <div style={statsGridStyle}>
          <div style={statCardStyle}>
            <p style={statLabelStyle}>Total RSVPs</p>
            <p style={statValueStyle}>{totalRsvps}</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Unique Emails</p>
            <p style={statValueStyle}>{uniqueEmails}</p>
          </div>

          <div style={statCardStyle}>
            <p style={statLabelStyle}>Latest Guest</p>
            <p style={{ ...statValueStyle, fontSize: "26px" }}>
              {latestRsvp ? latestRsvp.name : "None"}
            </p>
          </div>
        </div>

        <div style={mainGridStyle}>
          <div style={panelStyle}>
            <h3 style={panelTitleStyle}>Guest RSVP List</h3>

            {rsvps.length === 0 ? (
              <p style={{ color: "#7a5a4b", marginTop: "16px" }}>
                No RSVPs yet.
              </p>
            ) : (
              <div style={listStyle}>
                {rsvps.map((rsvp) => {
                  const createdDate =
                    rsvp.created_at || rsvp.createdAt || "";

                  return (
                    <div key={rsvp.id} style={guestCardStyle}>
                      <p style={smallLabelStyle}>User #{rsvp.id}</p>
                        <p style={guestNameStyle}>{rsvp.name}</p>
                      <div style={guestMetaStyle}>
                        <div>
                          <strong>Phone:</strong> {rsvp.phone}
                        </div>
                        <div>
                          <strong>Email:</strong> {rsvp.email}
                        </div>
                        <div>
                          <strong>Submitted:</strong>{" "}
                          {createdDate
                            ? new Date(createdDate).toLocaleString()
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div style={panelStyle}>
            <h3 style={panelTitleStyle}>Overview</h3>

            <div style={sideCardStyle}>
              <p style={smallLabelStyle}>Recent Status</p>
              <p style={smallValueStyle}>
                {totalRsvps > 0 ? "RSVPs Received" : "Waiting for Entries"}
              </p>
            </div>

            <div style={sideCardStyle}>
              <p style={smallLabelStyle}>Latest Email</p>
              <p style={smallValueStyle}>
                {latestRsvp ? latestRsvp.email : "No email yet"}
              </p>
            </div>

            <div style={sideCardStyle}>
              <p style={smallLabelStyle}>Latest Phone</p>
              <p style={smallValueStyle}>
                {latestRsvp ? latestRsvp.phone : "No phone yet"}
              </p>
            </div>

            <div style={sideCardStyle}>
              <p style={smallLabelStyle}>Dashboard Notes</p>
              <p
                style={{
                  margin: "10px 0 0 0",
                  color: "#6f5648",
                  lineHeight: 1.7,
                }}
              >
                This panel can later show attendance status, reminder tracking,
                message history, and admin actions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}