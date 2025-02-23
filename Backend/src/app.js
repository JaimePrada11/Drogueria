const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const CategoriaRutas = require('./infraestructura/Rutas/CategoriaRuta')
const ProductoRutas = require('./infraestructura/Rutas/ProductoRutas')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/categorias', CategoriaRutas);
app.use('/api/productos', ProductoRutas);


module.exports = app;
