const {addUser, removeUser, getUser, getUsersInRooms} = require('./users.js')

const express = require("express");
const socketio = require('socket.io');
const http = require('http');
const router = require("./router")

const PORT = process.env.PORT || 5000;
const app = express();
const server = http.createServer(app);
const io = socketio(server,{cors:{origin:"http://localhost:5173", methods:["GET","POST"], credentials: true}})


io.on('connection', (socket) => {
    console.log('a user connected.')

    socket.on("join",(arg, callback)=>{
        const {error, user} = addUser({id: socket.id, name: arg.name, room: arg.room})

        
        if(error){
            return callback(error)
        }

       socket.emit("message",{user:'admin', text: `${user.name}, Welcome to the room ${user.room}`})
       socket.broadcast.to(user.room).emit('message', {user:'admin', text:`${user.name}, has joined.`})
       socket.join(user.room);

       io.to(user.room).emit("roomData", {room:user.room, users: getUsersInRooms(user.room)})

       callback(`${arg.name} is connectd.`)
    });

    socket.on("sendMessage", (message, callback)=>{
        const user = getUser(socket.id);

        io.to(user.room).emit('message',{user:user.name, text:message})
        io.to(user.room).emit("roomData", {room: user.room, users:getUsersInRooms(user.room)})

        callback()
    });



    socket.on("disconnect", ()=> {
        const user = removeUser(socket.id)
        if(user){
            io.to(user.room).emit("message",{user:'admin', text:`${user.name} left the room.`})
        }
    });
});


app.use(router)
server.listen(PORT, () => console.log(`Server has started on port: ${PORT}`));