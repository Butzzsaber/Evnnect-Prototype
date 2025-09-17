const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { users } = require('./data.js');
const cors = require('cors');
app.use(cors());


const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5174', 
    methods: ['GET', 'POST']
  }
});


app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
  console.log(`✅ User connected: ${socket.id}`);

  socket.on('send-location', (data) => {
    console.log(`📍 Location from ${socket.id}:`, data);
    
    // Broadcast to others (not the sender)
    socket.emit('receive-location', {
      id: socket.id,
      ...data
    });
  });

  socket.on('disconnect', () => {
    console.log(`❌ User disconnected: ${socket.id}`);
    
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

const PORT = 5000; // 🔁 Changed to match React frontend's expectations
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
