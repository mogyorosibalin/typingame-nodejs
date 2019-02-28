const socketIO = require('socket.io');
const { ObjectID } = require('mongodb');

module.exports.listen = function(app) {
    const io = socketIO.listen(app);
    console.log('started io connection');

    io.on('connection', (socket) => {
        console.log('New user connected');

        socket.on('createRoom', (user, callback) => {
            const roomId = new ObjectID().toHexString();
            socket.join(roomId);
            callback(roomId);
        });

        socket.on('joinRoom', ({ roomId, user }) => {
            console.log(roomId);
        });
    });

    return io;
}