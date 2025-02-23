const categoriaService = require('../../application/Servicios/CategoriaService');

class CategoriaController {
    constructor() {
        this.categoriaService = categoriaService;
        }

    async create(req, res) {
        try {
            const categoriaData = req.body;
            const categoria = await categoriaService.create(categoriaData);
            return res.status(201).json(categoria);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const categorias = await categoriaService.getAllCategorias();
            return res.status(200).json(categorias);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const id = req.params.id;
            const categoria = await categoriaService.getCategoriaById(id);
            return res.status(200).json(categoria);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

    }

    async delete(req, res) {
        try {
            const id = req.params.id;
            await categoriaService.delete(id);
            return res.status(204).json({ message: 'Categoria eliminada con éxito' });
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }
    }

}

module.exports = new CategoriaController();