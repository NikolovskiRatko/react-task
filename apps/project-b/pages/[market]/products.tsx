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
        <ul style={productListStyle}>
          {products.map((p) => (
            <li key={p.id} style={productItemStyle}>
              <Link href={`/${market}/product/${p.id}`}>
                <span style={linkStyle}>
                  <img src={p.thumbnail} alt={p.title} style={thumbnailStyle} />
                  <div style={infoStyle}>
                    <h2 style={titleStyle}>{p.title}</h2>
                    <p style={descriptionStyle}>{p.description}</p>
                    <div style={priceStyle}>${p.price}</div>
                  </div>
                </span>
              </Link>
            </li>
          ))}
        </ul>
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
  fontFamily: "'Trebuchet MS', sans-serif",
  backgroundColor: "#eee",
  minHeight: "100vh",
};

const mainStyle: React.CSSProperties = {
  padding: "20px",
  maxWidth: "800px",
  margin: "0 auto",
};

const headingStyle: React.CSSProperties = {
  fontSize: "1.8rem",
  marginBottom: "20px",
  color: "#222",
};

const productListStyle: React.CSSProperties = {
  listStyle: "none",
  margin: 0,
  padding: 0,
};

const productItemStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  backgroundColor: "#fff",
  marginBottom: "16px",
  borderRadius: "8px",
  overflow: "hidden",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
};

const linkStyle: React.CSSProperties = {
  display: "flex",
  flex: 1,
  textDecoration: "none",
  color: "#000",
};

const thumbnailStyle: React.CSSProperties = {
  width: "180px",
  height: "180px",
  objectFit: "cover",
  flexShrink: 0,
};

const infoStyle: React.CSSProperties = {
  padding: "16px",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.2rem",
  margin: "0 0 8px",
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
