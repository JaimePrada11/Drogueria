const { CategoriaModel } = require('../../domain/modelos/Categoria');

class CategoriaRepository {
    async getAllCategorias() {
        try {
            return await CategoriaModel.findAll();
        } catch (error) {
            console.error("Error obteniendo todas las categorías:", error);
            throw new Error("No se pudo obtener las categorías.");
        }
    }

    async getCategoriaById(id) {
        try {
            return await CategoriaModel.findByPk(id);
        } catch (error) {
            console.error("Error obteniendo la categoría por ID:", error);
            throw new Error("No se pudo obtener la categoría.");
        }
    }

    async getCategoriaByNombre(nombre) {
        try {
            const categoria = await CategoriaModel.findOne({ where: { nombre } });
            return categoria;
        } catch (error) {
            console.error("Error obteniendo la categoría por nombre:", error);
            throw new Error("No se pudo obtener la categoría por nombre.");
        }
    }

    async createCategoria(categoriaData) {
        try {
            if (!categoriaData.nombre || typeof categoriaData.nombre !== 'string') {
                throw new Error("El nombre de la categoría es inválido.");
            }
            return await CategoriaModel.create(categoriaData);
        } catch (error) {
            console.error("Error creando la categoría:", error);
            throw new Error("No se pudo crear la categoría.");
        }
    }

    async deleteCategoria(id) {
        try {
            const categoria = await this.getCategoriaById(id);
            if (categoria) {
                await categoria.destroy();
                return categoria;
            }
            return null;
        } catch (error) {
            console.error("Error eliminando la categoría:", error);
            throw new Error("No se pudo eliminar la categoría.");
        }
    }
}

module.exports = CategoriaRepository; 