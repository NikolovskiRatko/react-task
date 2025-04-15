import React from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "../../components/Header";
import { brandConfig } from "../../brand.config";

const allowedMarkets = ["en", "ca"] as const;
type Market = typeof allowedMarkets[number];

interface MarketHomeProps {
  market: Market;
}

export default function MarketHomePage({ market }: MarketHomeProps) {
  let message: string;
  switch (market) {
    case "en":
      message = "Welcome to Project B (English)!";
      break;
    case "ca":
      message = "Bienvenue sur le projet B (Canada)!";
      break;
    default:
      message = "Unsupported market.";
  }

  return (
    <div>
      <Header market={market} />

      <main style={containerStyle}>
        <aside style={sidebarStyle}>
          <h3 style={sidebarHeadingStyle}>{brandConfig.brandName}</h3>
        </aside>
        <section style={contentStyle}>
          <h2 style={titleStyle}>
            {brandConfig.brandName} – {market.toUpperCase()} Market
          </h2>
          <p style={paragraphStyle}>{message}</p>
          <p>Custom message: {brandConfig.customMessage}</p>
        </section>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: allowedMarkets.map((m) => ({ params: { market: m } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps<MarketHomeProps> = ({ params }) => {
  const marketParam = params?.market as string;
  if (!allowedMarkets.includes(marketParam as Market)) {
    throw new Error(`Unsupported market: ${marketParam}`);
  }
  return { props: { market: marketParam as Market } };
};

const containerStyle: React.CSSProperties = {
  display: "flex",
  minHeight: "100vh",
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f5f5f5",
};

const sidebarStyle: React.CSSProperties = {
  backgroundColor: "#222",
  color: "#fff",
  width: "220px",
  padding: "20px",
};

const sidebarHeadingStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  marginBottom: "10px",
};

const contentStyle: React.CSSProperties = {
  flex: 1,
  padding: "40px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "10px",
  color: "#dd2222",
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#333",
  marginBottom: "15px",
};
