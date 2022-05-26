const webSocketsServerPort = process.env.PORT || 8000;
const webSocketServer = require("websocket").server;
const http = require("http");
const { setInterval } = require("timers");
const { v4: uuidv4 } = require("uuid");
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server,
});
console.log(`Web Socket started on ${webSocketServer}`);
const clients = {};

const getUniqueID = () => {
  return uuidv4();
};

const sendMessage = (json) => {
  Object.keys(clients).map((client) => {
    console.log(client);
    clients[client].sendUTF(json);
  });
};

// setInterval(()=>{
//   var userID = getUniqueID();
//   console.log(userID);
//   sendMessage(userID)
// },1000)

wsServer.on("request", function (request) {
  var userID = getUniqueID();
  console.log(
    new Date() +
      " Recieved a new connection from origin " +
      request.origin +
      "."
  );
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log(
    "connected: " + userID + " in " + Object.getOwnPropertyNames(clients)
  );
  connection.on("message", function (message) {
    if (message.type === "utf8") {
      const dataFromClient = JSON.parse(message.utf8Data);
      //   const json = { type: dataFromClient.type };
      //   if (dataFromClient.type === typesDef.USER_EVENT) {
      //     users[userID] = dataFromClient;
      //     userActivity.push(
      //       `${dataFromClient.username} joined to edit the document`
      //     );
      //     json.data = { users, userActivity };
      //   } else if (dataFromClient.type === typesDef.CONTENT_CHANGE) {
      //     editorContent = dataFromClient.content;
      //     json.data = { editorContent, userActivity };
      //   }
      sendMessage(JSON.stringify(dataFromClient));
    }
  });
  // user disconnected
  connection.on("close", function (connection) {
    console.log(new Date() + " Peer " + userID + " disconnected.");
    const json = { type: typesDef.USER_EVENT };
    userActivity.push(`${users[userID].username} left the document`);
    json.data = { users, userActivity };
    delete clients[userID];
    delete users[userID];
    sendMessage(JSON.stringify(json));
  });
});
//$pass = "8NHCBwWlGeHv8p3R"
module.exports = { sendMessage };
