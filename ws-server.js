const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 1234 });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.send("Hello from the server!");

  socket.on("message", (msg) => {
    console.log("Received:", msg);
    socket.send(`Server echo: ${msg}`);
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:1234");