import WS from "jest-websocket-mock";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import WebsocketDemo from "../pages/websocket-demo";

describe("WebSocket Demo", () => {
  let server: WS;

  beforeEach(() => {
    server = new WS("ws://localhost:1234");
  });

  afterEach(() => {
    WS.clean();
  });

  it("connects and receives server messages", async () => {
    render(<WebsocketDemo />);

    await server.connected;

    server.send("Hello from the server!");

    expect(await screen.findByText("Hello from the server!")).toBeInTheDocument();
  });

  it("sends a message to the server", async () => {
    render(<WebsocketDemo />);

    await server.connected;

    userEvent.click(screen.getByTestId("send-btn"));

    await expect(server).toReceiveMessage("Hello from Client!");
  });
});
