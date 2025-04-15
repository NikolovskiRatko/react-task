import type { AppProps } from "next/app";
import { brandConfig } from "../brand.config";

function MyApp({ Component, pageProps }: AppProps) {
  const appStyle: React.CSSProperties = {
    backgroundColor: brandConfig.buttonColor,
    minHeight: "100vh",
  };

  return (
    <div style={appStyle}>
      <header style={{ padding: 16 }}>
        <h1>{brandConfig.brandName}</h1>
      </header>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
