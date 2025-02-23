const express = require('express');
const router = express.Router();

const productoController  = require('../Controladores/PoductoController');


router.get('/', productoController.getAll);

router.get('/:id', productoController.getById);

module.exports = router;