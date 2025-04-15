import Link from "next/link";
import { CSSProperties } from "react";

interface HeaderProps {
  market: string;
}

export function Header({ market }: HeaderProps) {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href={`/${market}`} style={navLinkStyle}>
          Home
        </Link>
        <Link href={`/${market}/products`} style={navLinkStyle}>
          Products
        </Link>
        <Link href={`/${market}/login`} style={navLinkStyle}>
          Login
        </Link>
      </nav>
    </header>
  );
}

const headerStyle: CSSProperties = {
  backgroundColor: "#222",
  padding: "12px 24px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.5)",
};

const navStyle: CSSProperties = {
  display: "flex",
  gap: "24px",
  alignItems: "center",
  justifyContent: "flex-start",
};

const navLinkStyle: CSSProperties = {
  color: "#00e0b2", // a bright aqua color for contrast
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "1.1rem",
};
