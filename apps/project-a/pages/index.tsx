import { useState } from "react";
import { Button } from "@acme/ui";
import { brandConfig } from "../brand.config";

interface Market {
  id: string;
  name: string;
  brandName: string;
  buttonColor: string;
  alertMessage: string;
}

export default function Home() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const handleMarketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const market = brandConfig.markets.find((m) => m.id === event.target.value);
    if (market) {
      setSelectedMarket(market);
    }
  };

  return (
    <main style={{ margin: 40 }}>
      <h1>Project A – Minimal Monorepo</h1>

      {selectedMarket ? (
        <>
          <p>Brand Name: {selectedMarket.brandName}</p>
          <p>
            Below is a shared button from <code>@acme/ui</code>:
          </p>
          {brandConfig.featureFlags.showClickMeButton && (
            <Button
              style={{ backgroundColor: selectedMarket.buttonColor }}
              onClick={() => alert(selectedMarket.alertMessage)}
              label="Click me!"
            />
          )}
        </>
      ) : (
        <p>No market selected.</p>
      )}

      {brandConfig.markets?.length > 1 && (
        <div style={{ marginTop: 20 }}>
          <label htmlFor="market-select" style={{ marginRight: 8 }}>
            Choose Market:
          </label>
          <select
            id="market-select"
            onChange={handleMarketChange}
            value={selectedMarket?.id || ""}
          >
            <option value="">(No market selected)</option>
            {brandConfig.markets.map((market) => (
              <option key={market.id} value={market.id}>
                {market.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </main>
  );
}
