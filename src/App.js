import React from "react";
import Home from "./components/Home"
import Login from "./components/Login";
import {Route, Routes} from "react-router-dom"
import io from "socket.io-client";


function App() {
  


  console.log("new client")
  
  const socket = io("http://localhost:3000", {
         transports : ['websocket'] 
    })
    socket.on("connect", () => {
      console.log("connected on " + socket.id)
  })

  const users = []
  return (
    <div>
    <Routes>
    <Route path="/" element={<Login users={users} socket={socket} />} />
    <Route path="/home" element={<Home socket={socket}/>}/>
    </Routes>
    </div>
  );
}

export default App;
