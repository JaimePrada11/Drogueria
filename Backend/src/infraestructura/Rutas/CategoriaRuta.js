const express = require('express');
const router = express.Router();

const CategoriaController  = require('../Controladores/CategoriaController');


router.get('/', CategoriaController.getAll);

router.get('/:id', CategoriaController.getById);

router.post('/', CategoriaController.create);

router.delete('/:id', CategoriaController.delete)

module.exports = router;