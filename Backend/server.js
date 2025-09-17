const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { users } = require('./data.js');
const cors = require('cors');
const fs = require("fs");
const dataPath = path.join(__dirname, "data.js");

app.use(cors());
app.use(express.json());


const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5174', 
    methods: ['GET', 'POST']
  }
});


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(` User connected: ${socket.id}`);

  socket.on('send-location', (data) => {
    console.log(` Location from ${socket.id}:`, data);
    
    // Broadcast to others (not the sender)
    socket.emit('receive-location', {
      id: socket.id,
      ...data
    });
  });

  socket.on('disconnect', () => {
    console.log(` User disconnected: ${socket.id}`);
    
    // Notify others that user left
    socket.broadcast.emit('user-disconnected', socket.id);
  });
});

// Default route (optional if you serve frontend separately)
app.get('/', (req, res) => {
  res.send('Server is running.');
});
app.get("/data",(req,res) =>{
res.json(users);
console.log(users);
});
app.post("/signup",(req,res) =>{
  const{name,email,password,ChargingType,evModel}=req.body;
  const existing= users.find((user)=>user.email===email);
  if(existing){
    return res.status(400).json({message:"User already exists"});
  }const newUser={
    id: String(users.length + 1),
    name,
    email,
    password,
    evModel,
    ChargingType,
    type: "user",
  };
  users.push(newUser);
  const fileContent = `const users = ${JSON.stringify(users, null, 2)};\n\nmodule.exports = { users };`;

  fs.writeFileSync(dataPath, fileContent, "utf-8");
   res.status(201).json(newUser); // ✅ return the new user directly
})

const PORT = 5000; 
server.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
});
