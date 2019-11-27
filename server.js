const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static('public'))


const server = app.listen(3000, ()=>{
    console.log('server started on port 3000')
})

io = socket(server)

players = {

}

rooms = []

io.on('connection', (socket)=>{
    console.log('socket connected') 
    
    //create room 
    socket.on('create', room=>{
        if(!rooms.includes(room)){
            rooms.push(room)
            socket.join(room)
            console.log('created room: '+room)
            players['p1'] = socket.id
            console.log(players)
            socket.emit('wait', true)
        }
        else{
            socket.emit('wait', false)
            console.log('room already exists')
        }
    })

    socket.on('join', room=>{
        if(rooms.includes(room) && !players['p2']){
            socket.join(room)
            players['p2'] = socket.id
            io.sockets.in(room).emit('gameStart', true);
            console.log(players)
        }
        else{
            socket.emit('gameStart', false)
            console.log('room is full')
        }
    })
    
})

