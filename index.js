const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const layout = require("express-ejs-layouts");
const part = require("path");
const { Socket } = require("dgram");
app.set("view engine", "ejs");
app.use(layout);
app.use(express.static(part.join(__dirname, "public")));
app.use(require("./routes"));

io.on("connection", require("./socketio.js"));
server.listen(process.env.PORT || 3000, () => {
  console.log("http://localhost:3000");
});
