const { ProductoModel } = require('../../domain/modelos/Productos');
const { CategoriaModel } = require('../../domain/modelos/Categoria');
const { sequelize, Op } = require('sequelize');

class ProductoRepository {
    async getAllProductos() {
        try {
            return await ProductoModel.findAll({
                include: [{ model: CategoriaModel, as: 'Categoria', attributes: ['nombre'] }]
            });
        } catch (error) {
            console.error("Error obteniendo todos los productos:", error);
            throw new Error("No se pudo obtener los productos.");
        }
    }
    
    async getProductoById(id) {
        try {
            const producto = await ProductoModel.findByPk(id, {
                include: [{ model: CategoriaModel, as: 'Categoria', attributes: ['nombre'] }]
            });
            if (!producto) {
                throw new Error("Producto no encontrado");
            }
            return producto;
        } catch (error) {
            console.error("Error obteniendo producto por id:", error);
            throw new Error("No se pudo obtener el producto.");
        }
    }
    

    async createProducto(producto) {
        const transaction = await sequelize.transaction();
        try {
            const nuevoProducto = await ProductoModel.create(producto, { transaction });
            await transaction.commit();
            return nuevoProducto;
        } catch (error) {
            await transaction.rollback();
            console.error("Error creando producto:", error);
            throw new Error("No se pudo crear el producto.");
        }
    }

    async deleteProducto(producto) {
        const transaction = await sequelize.transaction();
        try {
            const resultado = await ProductoModel.destroy({ where: { id: producto.id }, transaction });
            await transaction.commit();
            return resultado;
        } catch (error) {
            await transaction.rollback();
            console.error("Error eliminando producto:", error);
            throw new Error("No se pudo eliminar el producto.");
        }
    }

    async getProductosByCategoria(categoriaId) {
        try {
            return await ProductoModel.findAll({ where: { categoriaId } });
        } catch (error) {
            console.error("Error obteniendo productos por categoría:", error);
            throw new Error("No se pudieron obtener los productos por categoría.");
        }
    }

    async getProductosByPrecio(min, max) {
        try {
            return await ProductoModel.findAll({
                where: {
                    precio: {
                        [Op.between]: [min, max]
                    }
                }
            });
        } catch (error) {
            console.error("Error obteniendo productos por rango de precio:", error);
            throw new Error("No se pudieron obtener los productos por rango de precio.");
        }
    }
}

module.exports = ProductoRepository; // Asegúrate de exportar la clase, no una instancia
