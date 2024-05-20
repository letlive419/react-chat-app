const express = require("express");
const {createServer} = require("http");
const {Server} = require("socket.io");

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

let userArray = []
let msgArray = []

//connection established
io.on("connection", (socket) => {
  console.log(`Connected client on ${socket.id}`);

  //listening for user
  socket.on("user", (user) => {
  userArray.push(user)
    //emitting the user
  io.emit("user", userArray);

  })

  //listening for user, message
  socket.on("message", (msg) => {
    
    
    

    //emitting the message
  io.emit("message" , msg)
  })

 

  socket.on('disconnect', (reason) => {
  console.log(`user disconnected on ${socket.id} due to ${reason}`);

 })});


const PORT = 3000

httpServer.listen(PORT,() => {
  console.log(`listening on port ${PORT}`)
});
