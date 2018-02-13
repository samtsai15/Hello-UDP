const dgram = require('dgram');

const clientSocket = dgram.createSocket('udp4');

clientSocket.on('message', (msg) => {
    console.log('recv %s(%d) from server\n', msg, msg.length);
});

clientSocket.on('error', (err) => {
    console.log('error, msg - %s, stack - %s\n', err.message, err.stack);
});

const sendtoServer = async (input) => {
    clientSocket.send(input, 0, input.length, 8080, 'localhost');
    // console.log(input);
};

const stdin = process.openStdin();
stdin.on('data', async (input) => {
    console.log(`Your input: ${input}`);

    // Ref https://nodejs.org/docs/latest-v8.x/api/dgram.html#dgram_socket_send_msg_offset_length_port_address_callback
    // socket.send(msg, [offset, length,] port [, address] [, callback])
    await sendtoServer(input);
});
