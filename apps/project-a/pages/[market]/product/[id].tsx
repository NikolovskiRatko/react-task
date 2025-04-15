import React from "react";
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";

const allowedMarkets = ["en", "ca"] as const;
type Market = (typeof allowedMarkets)[number];

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
      <h1 style={titleStyle}>Product Detail - {market.toUpperCase()}</h1>
      <div style={detailContainerStyle}>
        <img src={product.thumbnail} alt={product.title} style={thumbnailStyle} />
        <div style={infoStyle}>
          <h2 style={{ margin: 0 }}>{product.title}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
        </div>
      </div>
    </div>
  );
}

export const getStaticPaths = async () => {
  const res = await fetch("https://dummyjson.com/products?limit=20");
  const data = await res.json();

  const paths = [];

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
  fontFamily: "Arial, sans-serif",
  padding: "20px",
  backgroundColor: "#f0f0f0",
  minHeight: "100vh",
};

const titleStyle: React.CSSProperties = {
  fontSize: "1.4rem",
  marginBottom: "16px",
};

const detailContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "20px",
  backgroundColor: "#fff",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  padding: "16px",
};

const thumbnailStyle: React.CSSProperties = {
  width: "300px",
  objectFit: "cover",
  borderRadius: "4px",
};

const infoStyle: React.CSSProperties = {
  flex: 1,
};
