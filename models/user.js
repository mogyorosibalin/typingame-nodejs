const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    nickname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    _authHash: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = { 
    User: model('User', UserSchema)
};