const socketIO = require('socket.io');
const { ObjectID } = require('mongodb');

const { List } = require('./../util/List');
const { Room } = require('./../models/room');
const { User } = require('./../models/user');

const roomList = new List();

module.exports.listen = function(app) {
    const io = socketIO.listen(app);
    // console.log('started io connection');

    io.on('connection', (socket) => {
        // console.log('New user connected');

        socket.on('getRoom', ( _id ) => {
            if (_id) {
                emitRoom(io, socket, _id);
            }
        });

        socket.on('createRoom', (user, callback) => {
            const _authHash = user._authHash;
            // console.log(_authHash);
            User
                .findOne({ _authHash })
                .then((user) => {
                    if (!user) Promise.reject();
                    const newRoom = new Room({
                        minMembers: 2,
                        maxMembers: 6,
                        members: [ user._id ],
                        createdAd: new Date().getTime()
                    });
                    roomList.add(newRoom);
                    emitRoom(io, socket, newRoom._id, callback);
                });
        });

        socket.on('joinRoom', ({ roomId, _authHash }, callback) => {
            const room = roomList.get(roomId);
            if (room) {
                User
                    .findOne({ _authHash })
                    .then((user) => {
                        if (user && room.members.filter(member => member._authHash === _authHash).length === 0) {
                            room.members.push(user);
                            roomList.update(room._id, room);
                            socket.join(room._id);
                            emitRoom(io, socket, room._id, callback);
                        }
                    });
            }
        });

        socket.on('leaveRoom', ({ roomId, _authHash }) => {
            const room = roomList.get(roomId);
            if (room) {
                room.members = room.members.filter(member => member._authHash !== _authHash);
                roomList.update(room._id, room);
                socket.leave(room._id);
                emitRoom(io, socket, room._id);
            }
        });
    });

    return io;
}

// Callback gets only called if the user is connecting to the game
const emitRoom = (io, socket, _id, callback) => {
    const idString = typeof _id === 'object' ? _id.toHexString() : _id;
    roomList.get(idString)
        .populate({
            path: 'members',
            model: 'User'
        }, (err, room) => {
            if (!err && room) {
                if (callback) socket.join(room._id);
                io.to(room._id).emit('room', room);
                if (callback) callback(room);
            }
        });
};