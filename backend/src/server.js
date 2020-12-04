const cors = require('cors');
const express = require('express');

const app = express();
const server = require('http').Server(app);
const routes = require('./routes');

app.use('/outputs', express.static(__dirname + '/outputs'));
app.use(express.json());
app.use(cors());

app.use(routes);

server.listen(process.env.PORT || 3333);