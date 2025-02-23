const ProductoRepository = require('../Repositories/ProductoRepositorio');
const CategoriaService = require('../Servicios/CategoriaService');
const { ProductoDTO } = require('../../domain/DTO/ProductoDTO');
const { Productos } = require('../../domain/modelos/Productos');

class ProductoService {
    constructor() {
        this.productoRepositorio = new ProductoRepository(); // Instancia del repositorio
        this.categoriaService =  CategoriaService; 
    }

    async getAll() {
        const productos = await this.productoRepositorio.getAllProductos();
        return productos.map(producto => {
            const categoriaNombre = producto.Categoria ? producto.Categoria.nombre : null;
            return new Productos(
                producto.nombre,
                producto.descripcion,
                producto.precio,
                producto.stock,
                producto.lote,
                producto.fechaVencimiento,
                producto.categoriaId
            ).toDTO(categoriaNombre);
        });
    }

    async getOne(id) {
        const producto = await this.productoRepositorio.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        const categoriaNombre = producto.Categoria ? producto.Categoria.nombre : null;
        return new Productos(
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.stock,
            producto.lote,
            producto.fechaVencimiento,
            producto.categoriaId
        ).toDTO(categoriaNombre);
    }

    async create(data) {
        let categoria = await this.categoriaService.getCategoriaByNombre(data.categoriaNombre);
        if (!categoria) {
            categoria = await this.categoriaService.createCategoria({ nombre: data.categoriaNombre });
        }
        
        const productoData = {
            nombre: data.nombre,
            descripcion: data.descripcion,
            precio: data.precio,
            stock: data.stock,
            lote: data.lote,
            fechaVencimiento: data.fechaVencimiento,
            categoriaId: categoria.id  // Asegúrate de que este ID sea válido
        };
        
        return await this.productoRepositorio.createProducto(productoData);
    }
    
    
    async update(id, newData) {
        let categoria = await this.categoriaService.getCategoriaByNombre(newData.categoriaNombre);

        if (!categoria) {
            categoria = await this.categoriaService.createCategoria({ nombre: newData.categoriaNombre });
        }

        const productoDTO = new ProductoDTO(
            newData.nombre,
            newData.descripcion,
            newData.precio,
            newData.stock,
            newData.lote,
            newData.fechaVencimiento,
            categoria.nombre
        );

        const producto = await this.productoRepositorio.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return await producto.update(productoDTO);
    }

    async delete(id) {
        const producto = await this.productoRepositorio.getProductoById(id);
        if (!producto) {
            throw new Error("Producto no encontrado");
        }
        return await this.productoRepositorio.deleteProducto(producto);
    }

    async getProductosByCategoria(categoriaNombre) {
        const categoria = await this.categoriaService.getCategoriaByNombre(categoriaNombre);
        if (!categoria) {
            throw new Error("Categoría no encontrada");
        }
        const productos = await this.productoRepositorio.getProductosByCategoria(categoria.id);
        return productos.map(producto => new ProductoDTO(
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.stock,
            producto.lote,
            producto.fechaVencimiento,
            categoria.nombre
        ));
    }

    async getProductosByPrecio(min, max) {
        const productos = await this.productoRepositorio.getProductosByPrecio(min, max);
        return productos.map(producto => new ProductoDTO(
            producto.nombre,
            producto.descripcion,
            producto.precio,
            producto.stock,
            producto.lote,
            producto.fechaVencimiento,
            producto.Categoria.nombre
        ));
    }
}

module.exports =  new ProductoService();
