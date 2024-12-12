const express = require('express');
const bodyParser = require('body-parser');
const {createEvent}  = require('./controllers/eventController');

const app = express();
app.use(bodyParser.json());

app.post('/initialize', createEvent);

module.exports = app;