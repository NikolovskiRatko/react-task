import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { Header } from "../../../components/Header";

const allowedMarkets = ["en", "ca"] as const;
type Market = typeof allowedMarkets[number];

interface ProductDetailProps {
  market: Market;
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    brand: string;
    category: string;
    thumbnail: string;
  };
}

export default function ProductDetailPage({
  market,
  product,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!product) return <div>Product not found.</div>;

  return (
    <div style={pageStyle}>
      <Header market={market} />

      <main style={mainStyle}>
        <h1 style={titleStyle}>Product Detail - {market.toUpperCase()}</h1>
        <div style={detailContainerStyle}>
          <img src={product.thumbnail} alt={product.title} style={thumbnailStyle} />
          <div style={infoStyle}>
            <h2 style={productTitleStyle}>{product.title}</h2>
            <p style={descriptionStyle}>{product.description}</p>
            <p style={priceStyle}>Price: ${product.price}</p>
            <p>Brand: {product.brand}</p>
            <p>Category: {product.category}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=20");
  const data = await res.json();

  const paths: { params: { market: string; id: string } }[] = [];

  for (const market of allowedMarkets) {
    for (const p of data.products) {
      paths.push({ params: { market, id: String(p.id) } });
    }
  }

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<ProductDetailProps> = async ({
  params,
}) => {
  const marketParam = params?.market as Market;
  const idParam = params?.id as string;

  if (!allowedMarkets.includes(marketParam)) {
    throw new Error(`Unsupported market: ${marketParam}`);
  }

  const res = await fetch(`https://dummyjson.com/products/${idParam}`);
  const product = await res.json();

  if (!product || product?.id == null) {
    return { notFound: true };
  }

  return {
    props: {
      market: marketParam,
      product,
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
  maxWidth: "600px",
  margin: "0 auto",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.6rem",
  marginBottom: "20px",
  color: "#000",
};

const detailContainerStyle: React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  padding: "20px",
};

const thumbnailStyle: React.CSSProperties = {
  width: "100%",
  height: "auto",
  objectFit: "cover",
  borderRadius: "4px",
  marginBottom: "16px",
};

const infoStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const productTitleStyle: React.CSSProperties = {
  margin: 0,
  fontSize: "1.3rem",
};

const descriptionStyle: React.CSSProperties = {
  fontSize: "1rem",
  color: "#444",
};

const priceStyle: React.CSSProperties = {
  fontWeight: "bold",
  marginBottom: "8px",
};
