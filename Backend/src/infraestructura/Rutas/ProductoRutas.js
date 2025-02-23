const express = require('express');
const router = express.Router();

const productoController  = require('../Controladores/PoductoController');


router.get('/', productoController.getAll);

router.get('/:id', productoController.getById);

router.get('/nombre/:nombre', productoController.getProductosByNombre);

router.get('/categoria/:categoria', productoController.getProductosCategoria);

router.get('/vencidos', productoController.getProductoVencidos);

router.get('/precio', productoController.getProductosByPrecio);

router.get('/fechaEntrada', productoController.getProductosByFechaEntrada);

router.post('/', productoController.createProducto);

router.put('/:id', productoController.updateProducto);

router.delete('/:id', productoController.deleteProducto);



module.exports = router;