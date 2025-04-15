import React from "react";
import { Button } from "@acme/ui";
import { Header } from "../components/Header";
import { brandConfig } from "../brand.config";

export default function Home() {
  return (
    <div>
      {}
      <Header market="en" />

      <main style={containerStyle}>
        <div style={cardStyle}>
          <h1 style={headingStyle}>Project B – Minimal Monorepo</h1>
          <p style={brandTextStyle}>Brand Name: {brandConfig.brandName}</p>

          <p style={paragraphStyle}>
            Below is a shared button from <code>@acme/ui</code>:
          </p>
          {brandConfig.featureFlags.showClickMeButton && (
            <Button
              style={{ backgroundColor: brandConfig.buttonColor, color: "#fff" }}
              onClick={() => alert(brandConfig.alertMessage)}
              label="Click me!"
            />
          )}
        </div>
      </main>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "100vh",
  backgroundColor: "#e0e0e0",
  fontFamily: "Arial, sans-serif",
};

const cardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  padding: "40px",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
  textAlign: "center",
  maxWidth: "500px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "2rem",
  marginBottom: "16px",
  color: "#dd2222",
};

const brandTextStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  marginBottom: "16px",
};

const paragraphStyle: React.CSSProperties = {
  marginBottom: "16px",
  color: "#333",
};
