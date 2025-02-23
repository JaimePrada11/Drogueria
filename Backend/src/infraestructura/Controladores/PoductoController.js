const ProductoService = require('../../application/Servicios/ProductoService');

class ProductoController {
    constructor() {
        this.productoService = ProductoService;
    }

    getAll = async (req, res) => {
        try {
            const productos = await this.productoService.getAll();
            return res.status(200).json(productos);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    getById = async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await this.productoService.getOne(id);
            return res.status(200).json(producto);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }
}

module.exports = new ProductoController();