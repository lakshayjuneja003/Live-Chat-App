const http = require("http")
const express = require('express')
const { Server } = require("socket.io")
const app = express()
const server = http.createServer(app)
const io = new Server(server)

app.use(express.static("./public"))
io.on('connection',(socket)=>{
    console.log("a user connected ",socket.id);
    socket.on("user-message",(message)=>{
        console.log("A new user message", message);
        io.emit("message", message)
    })
})
app.get("/",(req,res)=>{
    return res.sendFile("/index.html")
})
server.listen(4000,(req,res)=>{
    console.log("server is runnning at http://localhost:4000");
})