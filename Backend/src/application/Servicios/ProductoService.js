const ProductoRepository = require('../Repositories/ProductoRepositorio');
const CategoriaService = require('../Servicios/CategoriaService');
const { ProductoDTO } = require('../../domain/DTO/ProductoDTO');
const { Productos } = require('../../domain/modelos/Productos');

class ProductoService {
    constructor() {
        this.productoRepositorio = new ProductoRepository();
        this.categoriaService = CategoriaService;
    }

    mapProducto(producto) {
        const categoriaNombre = producto.Categoria ? producto.Categoria.nombre : null;
        return new ProductoDTO(
            producto.imagen,
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.stock,
            producto.lote,
            producto.fechaVencimiento,
            categoriaNombre,
            producto.sku,
            producto.fechaEntrada
            
        );
    }

    // Todos los productos
    async getAll() {
        const productos = await this.productoRepositorio.getAllProductos();
        return productos.map(producto => this.mapProducto(producto));
    }

    // producto por su ID
    async getById(id) {
        const producto = await this.productoRepositorio.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return this.mapProducto(producto);
    }

    async create(data) {
        let categoria = await this.categoriaService.getCategoriaByNombre(data.categoriaNombre);
        if (!categoria) {
            categoria = await this.categoriaService.createCategoria({ nombre: data.categoriaNombre });
        }

        const productoData = {
            imagen: data.imagen,
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            stock: data.stock,
            lote: data.lote,
            fechaVencimiento: data.fechaVencimiento,
            categoriaId: categoria.id
        };
        return await Productos.createFromData(productoData);
    }


    async update(id, newData) {
        const producto = await this.productoRepositorio.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }

        let updateData = {};
        if (newData.imagen !== undefined) { updateData.imagen = newData.imagen; }
        if (newData.nombre !== undefined) updateData.nombre = newData.nombre;
        if (newData.descripcion !== undefined) updateData.descripcion = newData.descripcion;
        if (newData.precio !== undefined) updateData.precio = newData.precio;
        if (newData.stock !== undefined) updateData.stock = newData.stock;
        if (newData.lote !== undefined) updateData.lote = newData.lote;
        if (newData.fechaVencimiento !== undefined) updateData.fechaVencimiento = newData.fechaVencimiento;

        if (newData.categoriaNombre !== undefined) {
            let categoria = await this.categoriaService.getCategoriaByNombre(newData.categoriaNombre);
            if (!categoria) {
                categoria = await this.categoriaService.createCategoria({ nombre: newData.categoriaNombre });
            }
            updateData.categoriaId = categoria.id;
        }

        const productoActualizado = await producto.update(updateData);

        return this.mapProducto(productoActualizado);

    }

    // Eliminar Producto
    async delete(sku) {
        const producto = await this.productoRepositorio.getProductoBySku(sku);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return await this.productoRepositorio.deleteProducto(producto.sku);
    }

    // Los productos según la categoría 
    async getProductosByCategoria(categoriaNombre) {
        const categoria = await this.categoriaService.getCategoriaByNombre(categoriaNombre);
        if (!categoria) {
            throw new Error("Categoría no encontrada");
        }
        const productos = await this.productoRepositorio.getProductosByCategoria(categoria.id);
        return productos.map(producto => this.mapProducto(producto));
    }


    // Los productos por nombre 
    async getProductosByNombre(nombre) {
        const productos = await this.productoRepositorio.getProductosByNombre(nombre);
        return productos.map(producto => this.mapProducto(producto));
    }

    // productos ingresados entre dos fechas (rango en fechaEntrada)
    async getProductosByFechaEntrada(fechaInicio, fechaFin) {
        const productos = await this.productoRepositorio.getProductosByFechaEntrada(fechaInicio, fechaFin);
        return productos.map(producto => this.mapProducto(producto));
    }

    // los productos vencidos 
    async getProductosVencidos() {
        const productos = await this.productoRepositorio.getProductosVencidos();
        return productos.map(producto => this.mapProducto(producto));
    }

    // Los productos dentro de un rango de precios
    async getProductosByPrecio(min, max) {
        const productos = await this.productoRepositorio.getProductosByRangoPrecio(min, max);
        return productos.map(producto => this.mapProducto(producto));
    }
}
module.exports = new ProductoService();
