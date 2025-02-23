const { DataTypes } = require('sequelize');
const sequelize = require('../../infrastructure/database/database');
const { AutorModel } = require('./Autor');
const { CategoriaModel } = require('./Categoria');

class Libro {
    constructor(titulo, isbn, precio, stock, anioPublicacion, autorId, categoriaId) {
        this._titulo = titulo;
        this._isbn = isbn;
        this._precio = precio;
        this._stock = stock;
        this._anioPublicacion = anioPublicacion;
        this._autorId = autorId; 
        this._categoriaId = categoriaId;
    }

    get titulo() {
        return this._titulo;
    }

    set titulo(newTitulo) {
        this._titulo = newTitulo;
    }

    get isbn() {
        return this._isbn;
    }

    set isbn(newIsbn) {
        this._isbn = newIsbn;
    }

    get precio() {
        return this._precio;
    }

    set precio(newPrecio) {
        this._precio = newPrecio;
    }

    get stock() {
        return this._stock;
    }

    set stock(newStock) {
        this._stock = newStock;
    }

    get anioPublicacion() {
        return this._anioPublicacion;
    }

    set anioPublicacion(newAnioPublicacion) {
        this._anioPublicacion = newAnioPublicacion;
    }

    get autorId() {
        return this._autorId;
    }

    get categoriaId() {
        return this._categoriaId;
    }

    static async createFromData(libroData) {
        const libro = new Libro(
            libroData.titulo,
            libroData.isbn,
            libroData.precio,
            libroData.stock,
            libroData.anioPublicacion,
            libroData.autorId, 
            libroData.categoriaId 
        );

        return await LibroModel.create({
            titulo: libro.titulo,
            isbn: libro.isbn,
            precio: libro.precio,
            stock: libro.stock,
            anioPublicacion: libro.anioPublicacion,
            autorId: libro.autorId, 
            categoriaId: libro.categoriaId 
        });
    }
}

const LibroModel = sequelize.define('Libros', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isbn: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    anioPublicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

LibroModel.belongsTo(AutorModel, { foreignKey: 'autorId' });
LibroModel.belongsTo(CategoriaModel, { foreignKey: 'categoriaId' });

module.exports = { Libro, LibroModel };
