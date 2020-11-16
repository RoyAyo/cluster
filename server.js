const bodyParser = require("body-parser");
const express = require("express");
const cors = require('cors');

require('dotenv').config();

require('./database/database');

const PORT = process.env.PORT || 5000;

app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());


app.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});