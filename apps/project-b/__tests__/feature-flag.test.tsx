import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { brandConfig } from "../brand.config";
import Home from "../pages/index";

describe("Project B Feature Flag", () => {
  it("hides the 'Click me!' button if showClickMeButton=false", () => {
    const origValue = brandConfig.featureFlags.showClickMeButton;
    brandConfig.featureFlags.showClickMeButton = false;

    render(<Home />);
    expect(screen.queryByText("Click me!")).not.toBeInTheDocument();

    brandConfig.featureFlags.showClickMeButton = origValue;
  });

  it("shows the 'Click me!' button if showClickMeButton=true", () => {
    const origValue = brandConfig.featureFlags.showClickMeButton;
   brandConfig.featureFlags.showClickMeButton = true;

    render(<Home />);

    expect(screen.getByText("Click me!")).toBeInTheDocument();

    brandConfig.featureFlags.showClickMeButton = origValue;
  });
});
