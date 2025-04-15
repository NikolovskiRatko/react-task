import React, { useEffect, useState } from "react";

export default function WebsocketDemo() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:1234");
    setWs(socket);

    socket.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSend = () => {
    if (ws) {
      ws.send("Hello from Client!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>WebSocket Demo</h1>
      <button onClick={handleSend} data-testid="send-btn">Send Message</button>

      <h2>Messages from Server:</h2>
      <ul data-testid="messages-list">
        {messages.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
