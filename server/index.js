const PORT = process.env.PORT || 3003;

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

io.on('connection', (socket) => {
    console.log(`new user is connected with id ${socket.id}`);

    socket.on('disconnect', () => {
        socketDisconnectHandler(socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
});

const socketDisconnectHandler = (socketId) => {
    console.log(`user by disconnected by id :  ${socketId}`)
}
