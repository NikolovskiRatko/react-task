import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../pages/index";
import "@testing-library/jest-dom";
import { brandConfig } from "../brand.config";

describe("Home Page (/index)", () => {
  it('shows "No market selected." if brandConfig.markets is non-empty but user hasn’t picked one', () => {
    // Save original array to restore it after test
    const origMarkets = brandConfig.markets;

    // Provide multiple markets
    brandConfig.markets = [
      {
        id: "en",
        name: "English",
        brandName: "Project A – English",
        buttonColor: "green",
        alertMessage: "Hello EN!",
      },
      {
        id: "ca",
        name: "Canada",
        brandName: "Project A – CA",
        buttonColor: "blue",
        alertMessage: "Hello CA!",
      },
    ];

    // Render the component
    render(<Home />);

    // Since selectedMarket = null by default, we see "No market selected."
    expect(screen.getByText("No market selected.")).toBeInTheDocument();

    // The user hasn't chosen a market yet, so the "Click me!" button won't appear
    expect(screen.queryByText("Click me!")).not.toBeInTheDocument();

    // Cleanup: restore brandConfig to avoid affecting other tests
    brandConfig.markets = origMarkets;
  });

  it("lets user pick a market from the dropdown", () => {
    const origMarkets = brandConfig.markets;
    brandConfig.markets = [
      {
        id: "en",
        name: "English",
        brandName: "Project A – English",
        buttonColor: "green",
        alertMessage: "Hello EN!",
      },
      {
        id: "ca",
        name: "Canada",
        brandName: "Project A – CA",
        buttonColor: "blue",
        alertMessage: "Hello CA!",
      },
    ];

    render(<Home />);

    // Initially "No market selected."
    expect(screen.getByText("No market selected.")).toBeInTheDocument();

    // Grab the select
    const select = screen.getByLabelText("Choose Market:") as HTMLSelectElement;
    expect(select.value).toBe(""); // Because selectedMarket is null

    // Switch to "en"
    fireEvent.change(select, { target: { value: "en" } });

    // The text changes
    expect(screen.getByText(/Project A – English/)).toBeInTheDocument();
    expect(screen.queryByText("No market selected.")).not.toBeInTheDocument();

    // "Click me!" button is now visible
    expect(screen.getByText("Click me!")).toBeInTheDocument();

    // Cleanup
    brandConfig.markets = origMarkets;
  });

  it("doesn’t show the dropdown if there's only one market", () => {
    const origMarkets = brandConfig.markets;
    brandConfig.markets = [
      {
        id: "en",
        name: "English",
        brandName: "Project A – Single",
        buttonColor: "green",
        alertMessage: "Hello Single!",
      },
    ];

    render(<Home />);

    // With only 1 market, brandConfig.markets?.length > 1 is false => no dropdown
    expect(screen.queryByLabelText("Choose Market:")).not.toBeInTheDocument();

    // selectedMarket is still null, so "No market selected."
    expect(screen.getByText("No market selected.")).toBeInTheDocument();

    brandConfig.markets = origMarkets;
  });
});
