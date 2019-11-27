const express = require('express');
const socket = require('socket.io');
const path = require('path');

const app = express();
app.use(express.static('public'))


const server = app.listen(3000, ()=>{
    console.log('server started on port 3000')
})

io = socket(server)

io.on('connection', ()=>{
    console.log('socket connected')    
    io.on('create', room=>{
        socket.join(room)
        console.log('created room: '+room)
    })

})

// io.sockets.in(room).emit('event', data);