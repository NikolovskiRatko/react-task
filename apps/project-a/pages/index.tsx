import React, { useState, useEffect } from "react";
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
  // Existing market logic
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null);

  const handleMarketChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const market = brandConfig.markets.find((m) => m.id === event.target.value);
    if (market) {
      setSelectedMarket(market);
    }
  };

  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:1234");
    setWs(socket);

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    socket.onopen = () => {
      console.log("WebSocket connected to ws://localhost:1234");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSendWS = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send("Hello from Project A!");
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

      <section style={{ marginTop: 40 }}>
        <h2>WebSocket Demo</h2>
        <Button
          label="Send WS Message"
          onClick={handleSendWS}
          style={{ backgroundColor: "#444", color: "#fff", marginBottom: 10 }}
        />

        <div>
          <strong>Server Messages:</strong>
          <ul style={{ marginTop: 10 }}>
            {messages.map((msg, index) => (
              <li key={index}>{msg}</li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
