import React from "react";

/* SECTION DIVIDER COMPONENT */

const SectionDivider = ({ icon, title }: any) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      marginTop: "32px",
      marginBottom: "6px",
    }}
  >
    <div
      style={{
        flex: 1,
        height: "1px",
        background: "#d6a96d",
      }}
    />

    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "0 12px",
        color: "#d6a96d",
        letterSpacing: "0.25em",
        fontSize: "15px",
        fontWeight: 600,
      }}
    >
      {icon}
      {title}
    </div>

    <div
      style={{
        flex: 1,
        height: "1px",
        background: "#d6a96d",
      }}
    />
  </div>
);

/* ICONS */

const iconStyle = {
  width: "18px",
  height: "18px",
  fill: "#d6a96d",
};

const AppetizerIcon = () => (
  <svg viewBox="0 0 24 24" style={iconStyle}>
    <path d="M7 3v8M4 3v8M1 3v8M15 3v18" stroke="#d6a96d" strokeWidth="2" />
  </svg>
);

const MainIcon = () => (
  <svg viewBox="0 0 24 24" style={iconStyle}>
    <circle cx="12" cy="12" r="7" stroke="#d6a96d" strokeWidth="2" fill="none" />
  </svg>
);

const DessertIcon = () => (
  <svg viewBox="0 0 24 24" style={iconStyle}>
    <path d="M12 3l3 6h-6zM9 9h6v10H9z" fill="#d6a96d" />
  </svg>
);

const DrinkIcon = () => (
  <svg viewBox="0 0 24 24" style={iconStyle}>
    <path d="M4 3h16l-6 8v8h-4v-8z" fill="#d6a96d" />
  </svg>
);

export default function Menu() {
  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "white",
  };

  const cardWrapper: React.CSSProperties = {
    width: "520px",
    position: "relative",
  };

  const outerRectangle: React.CSSProperties = {
    border: "2px solid #d6a96d",
    borderRadius: "30px",
    padding: "25px",
  };

  const innerRectangle: React.CSSProperties = {
    border: "1px solid #d6a96d",
    borderRadius: "25px",
    padding: "40px 30px",
    background:
      "linear-gradient(180deg,#4a0f1f 0%,#6a1830 45%,#2a0711 100%)",
    color: "#fff3de",
  };

  const titleScript: React.CSSProperties = {
    fontFamily: "'Great Vibes', cursive",
    fontSize: "48px",
    textAlign: "center",
    color: "#e7c38f",
  };

  const menuTitle: React.CSSProperties = {
    textAlign: "center",
    letterSpacing: "0.25em",
    color: "#efd3a3",
    fontSize: "30px",
  };

  const item: React.CSSProperties = {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "6px",
  };

  const footer: React.CSSProperties = {
    textAlign: "center",
    marginTop: "40px",
    letterSpacing: "0.2em",
  };

  return (
    <div style={pageStyle}>
      <div style={cardWrapper}>
        <div style={outerRectangle}>
          <div style={innerRectangle}>
            <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "baseline",
              gap: "12px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                letterSpacing: "0.12em",
              }}
            >
              
            </span>

            <h1
              style={{
                fontFamily: "'Great Vibes', cursive",
                fontSize: "48px",
                color: "#e7c38f",
                margin: 0,
              }}
            >
              Naomie’s Birthday
            </h1>
          </div>

            <h2 style={menuTitle}>MENU</h2>

            <SectionDivider icon={<AppetizerIcon />} title="APPETIZERS" />

            <p style={item}>Pain Perdu au Thon </p>

            <SectionDivider icon={<MainIcon />} title="MAIN COURSE" />

            <p style={item}>Brochette de boeuf</p>
            <p style={item}>Tilapia</p>
            <p style={item}>Poulet Mayo</p>
            <p style={item}>Banane</p>
            <p style={item}>Chikwang</p>
            <p style={item}>Jalof Rice</p>
            <p style={item}>Congolese Turkey</p>
            <SectionDivider icon={<DessertIcon />} title="DESSERTS" />

            <p style={item}>Boule De Neige</p>
            <p style={item}>Fruit Cup</p>


            <SectionDivider icon={<DrinkIcon />} title="Mocktail" />

            <p style={item}>Kadosh</p>
            <p style={item}>Kiana</p>
            <p style={item}>Yehoyadha </p>
            <p style={item}>Nyaraby</p>


            <div style={footer}>
              <p>10 April 2026</p>
              <p style={{ color: "#d6a96d" }}>Bon Appétit</p>
              <p>ATLANTA, GA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}