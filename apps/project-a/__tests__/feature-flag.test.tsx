import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { brandConfig } from "../brand.config";
import Home from "../pages/index";

describe("Project A Feature Flag", () => {
  it("shows the 'Click me!' button if showClickMeButton=true AND user picks a market", () => {
    const origValue = brandConfig.featureFlags.showClickMeButton;
    brandConfig.featureFlags.showClickMeButton = true;

    brandConfig.markets = [
     {
       id: "en",
       name: "English",
       brandName: "Project A – English",
       buttonColor: "#008000",
       alertMessage: "Welcome, English user!",
     },
     {
       id: "ca",
       name: "Canada",
       brandName: "Project A – Canada",
       buttonColor: "#800080",
       alertMessage: "Bienvenue, utilisateur canadien!",
     },
   ];

    render(<Home />);
    expect(screen.queryByText("Click me!")).not.toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Choose Market:"), {
      target: { value: "en" },
    });

    expect(screen.getByText("Click me!")).toBeInTheDocument();

    brandConfig.featureFlags.showClickMeButton = origValue;
  });
});
