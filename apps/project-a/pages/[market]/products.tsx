import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Header } from "../../components/Header";

const allowedMarkets = ["en", "ca"] as const;
type Market = (typeof allowedMarkets)[number];

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

interface ProductsPageProps {
  market: Market;
  products: Product[];
}

export default function ProductsPage({ market, products }: ProductsPageProps) {
  return (
    <div style={pageStyle}>
      <Header market={market} />
      <main style={mainStyle}>
        <h1 style={headingStyle}>Products – {market.toUpperCase()}</h1>
        <div style={gridContainerStyle}>
          {products.map((p) => (
            <div key={p.id} style={productCardStyle}>
              <Link href={`/${market}/product/${p.id}`}>
                <span style={{ textDecoration: "none", color: "inherit" }}>
                  <img src={p.thumbnail} alt={p.title} style={thumbnailStyle} />
                  <div style={infoContainerStyle}>
                    <h2 style={titleStyle}>{p.title}</h2>
                    <p style={descriptionStyle}>{p.description}</p>
                    <div style={priceStyle}>${p.price}</div>
                  </div>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = () => {
  const paths = allowedMarkets.map((m) => ({ params: { market: m } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ProductsPageProps> = async (ctx) => {
  const market = ctx.params!.market as Market;

  const res = await fetch("https://dummyjson.com/products?limit=20");
  const data = await res.json();

  data.products.slice(0, 10).sort(() => 0.5 - Math.random());

  console.log(
    `[${new Date().toISOString()}] Revalidating products for market=${market}`
  );

  return {
    props: {
      market,
      products: data.products,
    },
    revalidate: 300,
  };
};

const pageStyle: React.CSSProperties = {
  fontFamily: "Arial, sans-serif",
  backgroundColor: "#f0f0f0",
  minHeight: "100vh",
};

const mainStyle: React.CSSProperties = {
  padding: "20px",
};

const headingStyle: React.CSSProperties = {
  fontSize: "1.5rem",
  marginBottom: "20px",
};

const gridContainerStyle: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
  gap: "20px",
};

const productCardStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
};

const thumbnailStyle: React.CSSProperties = {
  width: "100%",
  height: "180px",
  objectFit: "cover",
};

const infoContainerStyle: React.CSSProperties = {
  padding: "10px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.1rem",
  margin: "0 0 8px",
  lineHeight: 1.3,
  color: "#333",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "0.9rem",
  color: "#555",
  marginBottom: "8px",
};

const priceStyle: React.CSSProperties = {
  fontWeight: "bold",
  color: "#222",
};
