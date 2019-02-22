const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    productType: {
        type: Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true
    }
});

module.exports = { 
    Product: model('Product', ProductSchema)
};