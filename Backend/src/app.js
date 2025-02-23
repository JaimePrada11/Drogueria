const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('../config/database'); 
const config = require('../config/config');  // Importar las configuraciones


const app = express();

app.use(cors());

app.use(bodyParser.json());

connectDB();



module.exports = app;
