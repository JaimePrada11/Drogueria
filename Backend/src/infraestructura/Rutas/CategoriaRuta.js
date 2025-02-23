const express = require('express');
const router = express.Router();

const CategoriaController  = require('../Controladores/CategoriaController');


router.get('/', CategoriaController.getAll);

router.get('/:id', CategoriaController.getById);

module.exports = router;