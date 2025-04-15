import Link from "next/link";
import { CSSProperties } from "react";

interface HeaderProps {
  market: string;
}

export function Header({ market }: HeaderProps) {
  return (
    <header style={headerStyle}>
      <nav style={navStyle}>
        <Link href={`/${market}`} style={navLinkStyle}>Home</Link>
        <Link href={`/${market}/products`} style={navLinkStyle}>Products</Link>
        <Link href={`/${market}/login`} style={navLinkStyle}>Login</Link>
      </nav>
    </header>
  );
}

const headerStyle: CSSProperties = {
  backgroundColor: "#444",
  padding: "10px 20px"
};

const navStyle: CSSProperties = {
  display: "flex",
  gap: "16px"
};

const navLinkStyle: CSSProperties = {
  color: "#fff",
  textDecoration: "none",
  fontWeight: "bold"
};
