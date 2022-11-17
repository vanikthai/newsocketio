module.exports = (socket) => {
  socket.on("message", (msg) => {
    console.log(msg);
  });
};
