const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  serveClient: true,
  origins: "*:*",
  transports: ["polling"],
  pingInterval: 60000,
  pingTimeout: 25000,
  cookie: true,
  cors: {
    origin: "http://localhost:300",
    methods: ["GET", "POST"],
    allowedHeaders: ["vanikthaiapp"],
    credentials: true,
  },
});
const layout = require("express-ejs-layouts");
const part = require("path");
app.set("view engine", "ejs");
app.use(layout);
app.use(express.static(part.join(__dirname, "public")));
app.use(require("./routes"));

io.on("connection", (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
    io.emit("message", msg);
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("http://localhost:3000");
});
