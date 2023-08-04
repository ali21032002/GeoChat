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

let onlineUsers = [];

io.on('connection', (socket) => {
    console.log(`new user by id '${socket.id}' ready to connect.`);

    socket.on('user-login', (data) => loginEventHandler(socket, data));


    socket.on('disconnect', () => {
        socketDisconnectHandler(socket.id);
    });

});

server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
});

const socketDisconnectHandler = (socketId) => {
    console.log(`user by disconnected by id :  ${socketId}`);

    removeOnlineUser(socketId);
}

const removeOnlineUser = (socketId) => {

    if (onlineUsers[socketId]) {
        delete onlineUsers[socketId]
    }

    console.log(onlineUsers);
}

const loginEventHandler = (socket, data) => {
    onlineUsers[socket.id] = {
        username: data.username,
        coords: data.coords
    }
    console.log(`user with id: '${socket.id}' is : \n`, onlineUsers[socket.id]);
}
