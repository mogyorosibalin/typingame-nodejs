require('./config/config');
// require('./init/init');

const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db/mongoose');

const { userRouter } = require('./router/users');
const { productTypeRouter } = require('./router/product-type');
const { productRouter } = require('./router/product');
const { textRouter } = require('./router/text');
const { typingResultRouter } = require('./router/typing-result');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.use(userRouter);
app.use(productTypeRouter);
app.use(productRouter);
app.use(textRouter);
app.use(typingResultRouter);

server.listen(3000, () => {
    console.log('Server started on port 3000');
});