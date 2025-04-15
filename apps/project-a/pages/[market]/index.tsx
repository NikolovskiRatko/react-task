import { GetStaticPaths, GetStaticProps } from "next";
import { Header } from "../../components/Header";

const allowedMarkets = ["en", "ca"] as const;
type Market = (typeof allowedMarkets)[number];

interface MarketHomeProps {
  market: Market;
}

export default function MarketHomePage({ market }: MarketHomeProps) {
  let message: string;

  switch (market) {
    case "en":
      message = "Welcome, English user!";
      break;
    case "ca":
      message = "Bienvenue, utilisateur canadien!";
      break;
  }

  return (
    <div style={pageStyle}>
      <Header market={market} />
      <main style={mainStyle}>
        <h1 style={titleStyle}>Project A – {market.toUpperCase()} Market</h1>
        <p style={paragraphStyle}>{message}</p>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: allowedMarkets.map((m) => ({ params: { market: m } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<MarketHomeProps> = ({ params }) => {
  const marketParam = params?.market as string;
  if (!allowedMarkets.includes(marketParam as Market)) {
    throw new Error(`Unsupported market: ${marketParam}`);
  }
  return { props: { market: marketParam as Market } };
};


const pageStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f0f0f0",
  minHeight: "100vh"
};

const mainStyle: React.CSSProperties = {
  padding: "20px"
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "10px"
};

const paragraphStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  color: "#333"
};
