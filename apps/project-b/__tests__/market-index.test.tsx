// apps/project-b/pages/[market]/__tests__/market-index.test.tsx
import { render, screen } from "@testing-library/react";
import MarketHomePage from "../pages/[market]/index";
import "@testing-library/jest-dom";
import { brandConfig } from "../brand.config";

describe("Project B - [market]/index", () => {
  it('renders the market page for "en"', () => {
    // e.g. brandConfig might have brandName="Project B"
    render(<MarketHomePage market="en" />);
    // Header
    expect(screen.getByText("Home")).toBeInTheDocument();
    // Page content
    expect(screen.getByText("Project B – EN Market")).toBeInTheDocument();
    // The message
    expect(screen.getByText("Welcome to Project B (English)!")).toBeInTheDocument();
  });

  it('renders the market page for "ca"', () => {
    render(<MarketHomePage market="ca" />);
    expect(screen.getByText("Project B – CA Market")).toBeInTheDocument();
    expect(
      screen.getByText("Bienvenue sur le projet B (Canada)!")
    ).toBeInTheDocument();
  });

  it("displays brandConfig.customMessage if set", () => {
    const originalMessage = brandConfig.customMessage;
    brandConfig.customMessage = "Hello from Project B brand config!";

    render(<MarketHomePage market="en" />);
    expect(
      screen.getByText("Custom message: Hello from Project B brand config!")
    ).toBeInTheDocument();

    brandConfig.customMessage = originalMessage;
  });
});
