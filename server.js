require("dotenv").config();
const express = require('express');
var cors = require('cors');
const { getPublicToken } = require('./services/aps.js');
// const { getSensors, getChannels, getSamples } = require('./services/iot.mocked.js');
const { PORT } = require('./config.js');

let app = express();
app.use(express.static('public'));
app.use(cors());

app.get('/auth/token', async function (req, res, next) {
    try {
        res.json(await getPublicToken());
    } catch (err) {
        next(err);
    }
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err.message);
});

// app.listen(PORT, function () { console.log(`Server listening on port ${PORT}...`); });
app.listen(3003);