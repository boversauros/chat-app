'use strict'

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    io.emit('user_state', 1);

    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    });

    socket.on('disconnect', () =>{
        io.emit('user_state', 0);
    })
})

http.listen('8080', () => {
    console.log('server is up and listen port 8080')
})