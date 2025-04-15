// apps/project-a/pages/__tests__/market-index.test.tsx
import { render, screen } from "@testing-library/react";
import MarketHomePage, { getStaticProps } from "../pages/[market]/index";
import "@testing-library/jest-dom";

describe("[market]/index.tsx", () => {
  it("renders English message when market='en'", () => {
    render(<MarketHomePage market="en" />);

    expect(screen.getByText("Project A – EN Market")).toBeInTheDocument();
    expect(screen.getByText("Welcome, English user!")).toBeInTheDocument();
  });

  it("renders French message when market='ca'", () => {
    render(<MarketHomePage market="ca" />);

    expect(screen.getByText("Project A – CA Market")).toBeInTheDocument();
    expect(screen.getByText("Bienvenue, utilisateur canadien!")).toBeInTheDocument();
  });

  it("throws error if market is invalid (testing getStaticProps logic)", () => {
    // The function getStaticProps throws an error if the param isn't "en" or "ca"
    expect(() => {
      getStaticProps({ params: { market: "xx" } } as any);
    }).toThrow("Unsupported market: xx");
  });
});
