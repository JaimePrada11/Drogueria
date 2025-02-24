const ProductoService = require('../../application/Servicios/ProductoService');

class ProductoController {
    constructor() {
        this.productoService = ProductoService;
    }

    createProducto = async (req, res) => {
        try {
            const producto = req.body;
            const productoCreado = await this.productoService.create(producto);
            res.json(productoCreado);
        } catch (error) {
            res.status(500).json({ message: 'Error al crear producto', error });
        }
    }

    updateProducto = async (req, res) => {
        try {
            const { sku } = req.params; 
            if (!sku) {
                return res.status(400).json({ message: 'El SKU es obligatorio' });
            }
            const producto = req.body;
            const productoActualizado = await this.productoService.update(sku, producto);
            res.json(productoActualizado);
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar producto', error });
        }
    }

    deleteProducto = async (req, res) => {
        try {
            const { sku } = req.params; 
            if (!sku) {
                return res.status(400).json({ message: 'El SKU es obligatorio' });
            }
            await this.productoService.delete(sku);
            return res.status(204).json({ message: 'Producto eliminado con éxito' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }


    getAll = async (req, res) => {
        try {
            const productos = await this.productoService.getAll();
            return res.status(200).json(productos);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    getProductosByNombre = async (req, res) => {
        try {
            const nombre = req.params.nombre;
            const productos = await this.productoService.getProductosByNombre(nombre);
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos por nombre', error });
        }
    }

    getProductosByFechaEntrada = async (req, res) => {
        try {
            const { fechaInicio, fechaFin } = req.query;
            const productos = await this.productoService.getProductosByFechaEntrada(fechaInicio, fechaFin);
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos por fecha de entrada', error });
        }
    }

    getById = async (req, res) => {
        try {
            const id = req.params.id;
            const producto = await this.productoService.getById(id);
            return res.status(200).json(producto);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    getProductosCategoria = async (req, res) => {
        try {
            const categoria = req.params.categoria;
            const productos = await this.productoService.getProductosByCategoria(categoria);
            return res.status(200).json(productos);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

    }

    getProductoVencidos = async (req, res) => {
        try {
            const productos = await this.productoService.getProductosVencidos();
            return res.status(200).json(productos);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

    }

    getProductosByPrecio = async (req, res) => {
        try {
            const { min, max } = req.query;
            const productos = await this.productoService.getProductosByPrecio(min, max);
            res.status(200).json(productos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener productos por rango de precio', error });
        }
    }
}

module.exports = new ProductoController();