const PORT = process.env.PORT || 3003;

const express = require('express');
const http = require('http');
const cors = require('cors');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello world ');
});

server.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`);
});




