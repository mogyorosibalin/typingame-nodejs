const express = require('express');
const { User } = require('./../models/user');

const userRouter = express.Router();

// User API
userRouter.get('/users/:id', (req, res) => {});

userRouter.post('/users', (req, res) => {
    const _authHash = req.body._authHash;
    const email = req.body.name;
    const nickname = req.body.nickname;
    User
        .findOne({ email, nickname })
        .then((user) => {
            if (!user && email && nickname && _authHash) {
                new User({ email, nickname, _authHash })
                    .save()
                    .then((user) => {
                        // console.log('User created', JSON.stringify(user, undefined, 2));
                    });
            } else {
                // console.log('User found', JSON.stringify(user, undefined, 2));
            }
        })
        .catch(err => res.status(400).send(err));
});

module.exports = { userRouter };