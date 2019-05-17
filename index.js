'use strict'

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.get('/', (req, res) => {
    return res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chat message', msg => {
        io.emit('chat message', msg)
    })

    socket.on('disconnect', () =>{
        console.log('user disconnected')
    })
})

http.listen('8080', () => {
    console.log('server is up and listen port 8080')
})