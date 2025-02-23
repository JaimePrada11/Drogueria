const { CategoriaRepository } = require('../Repositories/CategoriaRepositorio');

class CategoriaService {
    constructor() {
        this.categoriaRepository = CategoriaRepository;
    }

    async getAllCategorias() {
        try {
            return await this.categoriaRepository.getAllCategorias();
        } catch (error) {
            console.error("Error en el servicio obteniendo todas las categorías:", error);
            throw new Error("No se pudo obtener las categorías.");
        }
    }

    async getCategoriaById(id) {
        try {
            return await this.categoriaRepository.getCategoriaById(id);
        } catch (error) {
            console.error("Error en el servicio obteniendo la categoría por ID:", error);
            throw new Error("No se pudo obtener la categoría.");
        }
    }

    async getCategoriaByNombre(nombre) {
        try {
            return await this.categoriaRepository.getCategoriaByNombre(nombre);
        } catch (error) {
            console.error("Error en el servicio obteniendo la categoría por nombre:", error);
            throw new Error("No se pudo obtener la categoría por nombre.");
        }
    }

    async createCategoria(categoriaData) {
        try {
            return await this.categoriaRepository.createCategoria(categoriaData);
        } catch (error) {
            console.error("Error en el servicio creando la categoría:", error);
            throw new Error("No se pudo crear la categoría.");
        }
    }

    async updateCategoria(id, newData) {
        try {
            const categoria = await this.categoriaRepository.getCategoriaById(id);
            if (!categoria) {
                throw new Error("Categoría no encontrada.");
            }
            return await categoria.update(newData);
        } catch (error) {
            console.error("Error en el servicio actualizando la categoría:", error);
            throw new Error("No se pudo actualizar la categoría.");
        }
    }

    async deleteCategoria(id) {
        try {
            return await this.categoriaRepository.deleteCategoria(id);
        } catch (error) {
            console.error("Error en el servicio eliminando la categoría:", error);
            throw new Error("No se pudo eliminar la categoría.");
        }
    }
}

module.exports = new CategoriaService();
