const express = require('express');
const { ProductType } = require('./../models/product-type');
const { Product } = require('./../models/product');
const { Text } = require('./../models/text');

const productRouter = express.Router();

// Product API
productRouter.get('/products', (req, res) => {
    Product
        .find()
        .populate('productType')
        .exec((err, products) => {
            if (err) res.status(400).send(err);
            else res.status(200).send(products);
        });
});

productRouter.get('/products/:id', (req, res) => {
    const _id = req.params.id;
    Text
        .find({ product: _id })
        .populate({
            path: 'product',
            model: 'Product',
            populate: {
                path: 'productType',
                model: 'ProductType'
            }
        })
        .exec((err, texts) => {
            if (err) res.status(400).send(err);
            else res.status(200).send(texts);
        });
});

productRouter.post('/products', (req, res) => {
    const name = req.body.name;
    const author = req.body.author;
    const type = req.body.type;
    if (name && author && type) {
        ProductType
            .findOne({ name: type })
            .then((productType) => {
                if (!productType) {
                    return new ProductType({ name: type }).save();
                }
                return productType;
            })
            .then((productType) => {
                return new Product({ name, author, productType: productType._id }).save();
            })
            .then((product) => {
                Product
                    .find()
                    .populate('productType')
                    .exec((err, products) => {
                        if (err) res.status(400).send(err);
                        else res.status(200).send(products);
                    });
            })
            .catch(err => res.status(400).send(err));
    }
});

productRouter.put('/products', (req, res) => {});

productRouter.delete('/products', (req, res) => {});

module.exports = { productRouter };