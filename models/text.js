const { Schema, model } = require('mongoose');

const TextSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }
});

module.exports = { 
    Text: model('Text', TextSchema) 
};