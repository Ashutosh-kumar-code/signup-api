const express = require('express')
const app = express();
const mongoose = require('mongoose')

const bodyParser = require('body-parser')
const userApi = require('./routes/user')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const http = require('http');

mongoose.connect('mongodb://127.0.0.1:27017/userDetails')
.then(()=>{
    console.log("database connected....")
})
.catch(()=>{
    console.log("error comming......")
})

app.use('/user', userApi)


const server = http.createServer(app);
server.listen(3000,console.log("server running on 3000"))

module.exports = app;