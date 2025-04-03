import React from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const isDarkTheme = useSelector((state) => state.theme.isDarkTheme);

  return (
    <div style={{ width: "100%" }}>
      <section
        style={{
          position: "relative",
          height: "100vh",
          width: "100%",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "800px",
            padding: "0 20px",
          }}
        >
          <h1
            style={{
              fontSize: "3.5rem",
              marginBottom: "var(--spacing-lg)",
              fontWeight: "var(--font-weight-bold)",
              color: "#ffffff",
              textShadow: isDarkTheme ? "2px 2px 4px rgba(0,0,0,0.5)" : "none",
            }}
          >
            Welcome to Our Platform
          </h1>
          <p
            style={{
              fontSize: "1.2rem",
              marginBottom: "var(--spacing-xl)",
              lineHeight: 1.6,
              color: isDarkTheme ? "#e0e0e0" : "#757575",
              textShadow: isDarkTheme ? "1px 1px 2px rgba(0,0,0,0.5)" : "none",
            }}
          >
            Discover amazing features and possibilities with our innovative
            solution
          </p>
          <button
            className="btn-primary"
            style={{
              padding: "var(--spacing-md) var(--spacing-xl)",
              fontSize: "1.1rem",
              borderRadius: "var(--radius-lg)",
              boxShadow: isDarkTheme
                ? "0 4px 6px rgba(0,0,0,0.3)"
                : "var(--shadow-md)",
            }}
          >
            Get Started
          </button>
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: isDarkTheme
              ? "rgba(0, 0, 0, 0.7)"
              : "rgba(0, 0, 0, 0.4)",
            zIndex: 1,
          }}
        />
      </section>
    </div>
  );
};

export default Home;
