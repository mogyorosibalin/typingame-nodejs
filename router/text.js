const express = require('express');
const { Text } = require('./../models/text');

const textRouter = express.Router();

// Text API
textRouter.get('/texts', (req, res) => {
    Text
        .find()
        .then((texts) => {
            res.status(200).send({ texts });
        })
        .catch(err => req.status(400).send(err));
});

textRouter.get('/texts/random', (req, res) => {
    let text;
    Text
        .find()
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
            else res.status(200).send((texts[Math.floor(Math.random() * texts.length)]));
        });
});

textRouter.get('/texts/:id', (req, res) => {
    const _id = req.params.id;
    Text
        .findOne({ _id })
        .then((text) => {
            if (!text) return res.status(404).send(`There is no text found with this id: ${_id}`);
            res.status(200).send({ text });
        })
        .catch(err => res.status(400).send(err));
});

textRouter.post('/texts', (req, res) => {});

textRouter.put('/texts', (req, res) => {});

textRouter.delete('/texts', (req, res) => {});

module.exports = { textRouter };