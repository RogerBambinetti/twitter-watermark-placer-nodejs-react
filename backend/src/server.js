require('dotenv').config();
const cors = require('cors');
const express = require('express');

async function init() {
    try {
        const app = express();
        const server = require('http').Server(app);
        const routes = require('./routes');

        app.use('/outputs', express.static(__dirname + '/outputs'));
        app.use(express.json());
        app.use(cors());

        app.use(routes);

        const port = process.env.HTTP_SERVER_PORT || 3333;
        server.listen(port);

        console.log(`Server running on port ${port}`);
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}

init();