const dotenv = require('dotenv');
dotenv.config();
const express = require ('express');
const app = express();
const cors = require('cors');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const {users}= require('./data.js');
connectToDB();
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(express.json());
app.use('/users', userRoutes);
module.exports = app;
app.get("/data",req,res =>{
res.json(users);
console.log(users);
});