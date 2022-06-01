const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const userRoutes = require('./Routes/userRoutes');
const chatRoutes = require('./Routes/chatRoutes');
const messageRoutes = require('./Routes/messageRoutes');
var bodyParser = require('body-parser');
const { notFound ,errorHandler} = require("./Midlleware/errorMidlleware");
const path = require('path')

dotenv.config();

connectDB();
const app = express();

app.use(express.json());
app.use(bodyParser.json());

// app.get('/',(req,res)=>{
//     res.send("API is working")
// });



// ----------------------------Deployment-------------------------

const __dirname3 = path.resolve();
if(process.env.NODE_ENV === "production"){
      app.use(express.static(path.join(__dirname3,'frontend/build')));

      app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname3, "frontend/build/index.html"));
      })
} else{
  app.get('/',(req,res)=>{
    res.send("Production is not working")
}); 
}




// ----------------------------Deployment-------------------------



app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);
app.use('/api/message',messageRoutes);

app.use(notFound);
app.use(errorHandler);


const Port = process.env.PORT || 9000;

const server = app.listen(Port,console.log("Server Started--",Port));

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
      origin: "*",
      credentials: true,
    },
  });
  
  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
      socket.join(userData._id);
      socket.emit("connected");
    });
  
    socket.on("join chat", (room) => {
      socket.join(room);
      console.log("User Joined Room: " + room);
    });


    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
  
    socket.on("new message", (newMessageRecieved) => {
      var chat = newMessageRecieved.chat;
  
      if (!chat.users) return console.log("chat.users not defined");
  
      chat.users.forEach((user) => {
        if (user._id == newMessageRecieved.sender._id) return;
  
        socket.in(user._id).emit("message recieved", newMessageRecieved);
      });
    });
  
    socket.off("setup", () => {
      console.log("USER DISCONNECTED");
      socket.leave(userData._id);
    });

})   