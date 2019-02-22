const { Schema, model } = require('mongoose');

const ProductTypeSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    }
});

module.exports = {
    ProductType: model('ProductType', ProductTypeSchema)
};