const express = require('express');
const { TypingResult } = require('./../models/typing-result');

const typingResultRouter = express.Router();

const compare = (a, b) => {
    if (a.finishedTime < b.finishedTime) return 1;
    if (a.finishedTime > b.finishedTime) return -1;
    return 0;
};

// Typing Result API
typingResultRouter.get('/typing-results/:user', (req, res) => {
    const user = req.params.user;
    TypingResult
        .find({ user })
        .populate('text')
        .exec((err, typingResults) => {
            if (err) res.status(400).send(err);
            else res.status(200).send(typingResults.sort(compare));
        });
});

typingResultRouter.post('/typing-results', (req, res) => {
    new TypingResult({
        text: req.body.textId,
        user: req.body.userHash,
        chars: req.body.chars,
        timeMiliSec: req.body.time,
        finishedTime: new Date().getTime(),
        points: req.body.points
    }).save()
        .then((typingResult) => {
            TypingResult
                .find({ user: typingResult.user })
                .populate('text')
                .exec((err, typingResults) => {
                    if (err) res.status(400).send(err);
                    else res.status(200).send(typingResults.sort(compare));
                })
        })
        .catch(err => res.status(400).send(err));
});

module.exports = { typingResultRouter };