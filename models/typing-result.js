const { Schema, model } = require('mongoose');

const TypingResultSchema = new Schema({
    text: {
        type: Schema.Types.ObjectId,
        ref: 'Text',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chars: [{
        type: String
    }],
    timeMiliSec: {
        type: Number,
        required: true
    },
    finishedTime: {
        type: Number,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

module.exports = { 
    TypingResult: model('TypingResult', TypingResultSchema) 
};