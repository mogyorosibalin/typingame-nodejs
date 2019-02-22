const express = require('express');
const { ProductType } = require('./../models/product-type');

const productTypeRouter = express.Router();

// Product Type API
productTypeRouter.get('/product-types', (req, res) => {
    ProductType
        .find()
        .then((productTypes) => {
            res.status(200).send({ productTypes });
        })
        .catch(err => res.status(400).send(err));
});

productTypeRouter.get('/product-types/:id', (req, res) => {
    const _id = req.params.id;
    ProductType
        .findOne({ _id })
        .then((productType) => {
            if (!productType) return res.status(404).send(`No product-type found with this id: ${_id}`);
            Product
                .find({ _productTypeId: productType._id })
                .then((products) => {
                    res.status(200).send({ productType, products });
                });
        })
        .catch(err => res.status(400).send(err));
});

productTypeRouter.post('/product-types', (req, res) => {});

productTypeRouter.put('/product-types', (req, res) => {});

productTypeRouter.delete('/product-types', (req, res) => {});

module.exports = { productTypeRouter };