import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { brandConfig } from "../brand.config";
import Home from "../pages/index";

describe("Project B - / (top-level page)", () => {
  it("renders the brand name and no button if showClickMeButton=false", () => {
    const orig = brandConfig.featureFlags.showClickMeButton;
    brandConfig.featureFlags.showClickMeButton = false;

    render(<Home />);
    expect(screen.getByText("Project B – Minimal Monorepo")).toBeInTheDocument();
    expect(screen.queryByText("Click me!")).not.toBeInTheDocument();

    brandConfig.featureFlags.showClickMeButton = orig;
  });

  it("renders the brand name AND the button if showClickMeButton=true", () => {
    const orig = brandConfig.featureFlags.showClickMeButton;
    brandConfig.featureFlags.showClickMeButton = true;

    render(<Home />);
    expect(screen.getByText("Project B – Minimal Monorepo")).toBeInTheDocument();
    expect(screen.getByText("Click me!")).toBeInTheDocument();

    brandConfig.featureFlags.showClickMeButton = orig;
  });
});
