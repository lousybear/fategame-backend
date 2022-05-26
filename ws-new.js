const PORT = process.env.PORT || 3000;
const express = require("express");
const { WebSocket } = require("ws");

const server = express();
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

const { Server } = require("ws");

const wss = new Server({ server });

wss.on("connection", (ws) => {
  console.log("Client connected");
  ws.on("close", () => console.log("Client disconnected"));
});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(new Date().toTimeString());
  });
}, 5000);

let ws = new WebSocket("ws://localhost:3000");

ws.onmessage = function (event) {
  console.log(event.data);
};
