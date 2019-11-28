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

rooms = {}


io.on('connection', (socket)=>{
    
    //create room 
    socket.on('create', room=>{
        if(!Object.keys(rooms).includes(room)   ){
            // rooms.push(room)
            rooms[room] = {}
            rooms[room].players = {}
            socket.join(room)
            console.log('created room: '+room)
            rooms[room].players['true'] = socket.id
            console.log(rooms[room].players)
            io.sockets.in(room).emit('wait', true)
        }
        else{
            socket.emit('wait', false)
            console.log('room already exists')
        }
    })

    socket.on('join', room=>{
        if(Object.keys(rooms).includes(room) && !rooms[room].players['false']){
            socket.join(room)
            rooms[room].players['false'] = socket.id
            io.sockets.in(room).emit('gameStart', {room, success: true});
            console.log(rooms[room].players)
            // io.to(players['p1'].emit('turn', true))
        }
        else{
            socket.emit('gameStart',false)
            console.log('room is full')
        }
    })

    // socket.on("disconnect", room=> {
    //     delete rooms[room]
    //     console.log('disconnected')
    // })

    socket.on('turn', (data)=>{
        console.log('team : ', data.team)
        console.log('click: ', data.click.x)
        socket.to(rooms[room].players[data.team]).emit('turn', {click: {x: data.click.x, y:data.click.y}})
        // console.log()
    })
    
})

// making a multiplayer game with socket 

// So, Im making this game we all have played and heard about which is, the good old "tictactoe". 
