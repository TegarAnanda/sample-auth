global.Config = require("./config/config.app");
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const mongoose = require('mongoose');
const uuid = require('uuid');

const config = require("./config/config.app");
const { logger } = require('./utils/logger.js');

const app = express();
app.set('config', config);
app.use(bodyParser.json());
app.use((req, res, next) => {
	req.identifier = uuid.v4();
	const logString = `a request has been made with the following uuid [${req.identifier}] ${req.url} ${req.headers['user-agent']} ${JSON.stringify(req.body)}`;
	logger.log({message: logString, level: 'info'});
	next();
});
const swagger = require('./utils/swagger');
app.use('/api/docs', swagger.router);
app.use('/health', require('./health'));
app.use('/', require('./router'));

// const swagger = require('../utils/swagger');

process.on('SIGINT', () => {
	logger.log({message: 'stopping the server', level: 'info'});
	process.exit();
});

// app.use('/api/docs', swagger.router);

const server = http.createServer(app);

function normalizePort(val) {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        return val;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

const port = normalizePort(global.Config.port || '8001');
app.set('port', port);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    switch (error.code) {
    case 'EACCES':
        logger.log({message: `${bind} requires elevated privileges`});
        process.exit(1);
        break;
    case 'EADDRINUSE':
        logger.log({message: `${bind} is already in use`});
        process.exit(1);
        break;
    default:
        throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;

    logger.log({message: `the server started listining on port ${bind}`, level: 'info'});
}
mongoose.connect(
    `mongodb://${global.Config.databases.mongodb.host}/sample`,
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(result => {
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}).catch(e => {
    logger.log({level: "error", message: e});
    throw new Error(e);
});