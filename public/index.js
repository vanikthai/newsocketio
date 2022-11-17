// import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
// const socket = io();
// window.send = (medthod, data) => {
//   try {
//     socket.emit(medthod, data);
//   } catch (e) {
//     console.log("can't send");
//   }
// };

import io from "./socket.js";
const socket = io;

socket.on("message", (msg) => {
  console.log(msg);
});

const sendmsg = document.getElementById("sendmsg");
sendmsg.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("pwd").value;

  let payload = {
    email,
    password,
  };

  socket("message", payload);
  console.log(payload);
  sendmsg.reset();
});
