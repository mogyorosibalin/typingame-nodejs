const { Schema, model } = require('mongoose');

const RoomSchema = new Schema({
    minMembers: {
        type: Number,
        required: true,
    },
    maxMembers: {
        type: Number,
        required: true,
    },
    members: {
        type: Array(Schema.Types.ObjectId),
        ref: 'User',
        default: []
    },
    createdAt: {
        type: Number,
        required: true
    }
});

module.exports = { 
    Room: model('Room', RoomSchema)
};