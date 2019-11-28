const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static('public'))


const server = app.listen(3000, ()=>{
    console.log('server started on port 3000')
})

io = socket(server)

// rooms = {
//     'name': {
//         'p1':
//         'p2':
//     }
// }

rooms = []

players ={}

io.on('connection', (socket)=>{
    
    //create room 
    socket.on('create', room=>{
        if(!rooms.includes(room)){
            rooms.push(room)
            socket.join(room)
            console.log('created room: '+room)
            players['true'] = socket.id
            console.log(players)
            io.sockets.in(room).emit('wait', true)
        }
        else{
            socket.emit('wait', false)
            console.log('room already exists')
        }
    })

    socket.on('join', room=>{
        console.log(!players['false'])
        if(rooms.includes(room) && !players['false']){
            socket.join(room)
            players['false'] = socket.id
            io.sockets.in(room).emit('gameStart', true);
            console.log(players)
            // io.to(players['p1'].emit('turn', true))
        }
        else{
            socket.emit('gameStart', false)
            console.log('room is full')
        }
    })

    socket.on("disconnect", room=> {
        rooms.pop(room)
        console.log('disconnected')
    })

    socket.on('turn', (data)=>{
        console.log('team : ', data.team)
        console.log('click: ', data.click)
        socket.to(players[data.team]).emit('turn', {click: data.click})
        // console.log()
    })
    
})

// making a multiplayer game with socket 

// So, Im making this game we all have played and heard about which is, the good old "tictactoe". 
