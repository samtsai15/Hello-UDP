const dgram = require('dgram');

// Create a UDP server with IPv4.
const server = dgram.createSocket('udp4');

// Set Server Port , Default use 8080
const port = process.env.PORT || 8080;

// Server have 4 event handle.

// 1. Listening: Start server finished.
server.on('listening', () => {
    const address = server.address();
    console.log('Start UDP server on %s:%d', address.address, address.port);
});

// 2. Error: Get error
server.on('error', (err) => {
    console.log(`Error:${err}`);
    server.close();
});

// 3. Message: Get Message from Client
server.on('message', (msg, info) => {
    console.log(`Data received from client : ${msg.toString()}`);
    console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
});

// 4. Close: Stop server already.
server.on('close', () => {
    console.log('Server stop already, see you next time.');
});

// Binding port
server.bind(port);
