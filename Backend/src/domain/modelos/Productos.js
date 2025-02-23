const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');
const { CategoriaModel } = require('./Categoria');
const { ProductoDTO } = require('../DTO/ProductoDTO');

class Productos {
    constructor(nombre, descripcion, precio, stock, lote, fechaVencimiento, categoriaId) {
        this._nombre = nombre;
        this._descripcion = descripcion;
        this._precio = precio;
        this._stock = stock;
        this._fechaEntrada = new Date();  
        this._lote = lote;
        this._fechaVencimiento = fechaVencimiento;
        this._categoriaId = categoriaId;
        this._sku = this.generarSKU();  
    }

    generarSKU() {
        return `SKU-${Math.random().toString(36).substr(2, 9).toUpperCase()}`; 
    }

    toDTO(categoriaNombre) {
        return new ProductoDTO(
            this._nombre,
            this._descripcion,
            this._precio,
            this._stock,
            this._lote,
            this._fechaVencimiento,
            categoriaNombre
        );
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(newNombre) {
        this._nombre = newNombre;
    }

    get descripcion() {
        return this._descripcion;
    }

    set descripcion(newDescripcion) {
        this._descripcion = newDescripcion;
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

    get fechaEntrada() {
        return this._fechaEntrada;
    }

    set fechaEntrada(newFechaEntrada) {
        this._fechaEntrada = newFechaEntrada;
    }

    get lote() {
        return this._lote;
    }

    set lote(newLote) {
        this._lote = newLote;
    }

    get fechaVencimiento() {
        return this._fechaVencimiento;
    }

    set fechaVencimiento(newFechaVencimiento) {
        this._fechaVencimiento = newFechaVencimiento;
    }

    get categoriaId() {
        return this._categoriaId;
    }

    set categoriaId(newCategoriaId) {
        this._categoriaId = newCategoriaId;
    }

    get sku() {
        return this._sku;
    }

    set sku(newSku) {
        this._sku = newSku;
    }

    static async createFromData(productoData) {
        const producto = new Productos(
            productoData.nombre,
            productoData.descripcion,
            productoData.precio,
            productoData.stock,
            productoData.lote,
            productoData.fechaVencimiento,
            productoData.categoriaId
        );

        return await ProductoModel.create({
            nombre: producto.nombre,
            descripcion: producto.descripcion,
            precio: producto.precio,
            stock: producto.stock,
            fechaEntrada: producto.fechaEntrada,
            lote: producto.lote,
            fechaVencimiento: producto.fechaVencimiento,
            categoriaId: producto.categoriaId,
            sku: producto.sku 
        });
    }
}

const ProductoModel = sequelize.define('Productos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaEntrada: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lote: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaVencimiento: {
        type: DataTypes.DATE,
        allowNull: true
    },
    categoriaId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    sku: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true  
    }
},
{
    timestamps: false 
});

ProductoModel.belongsTo(CategoriaModel, { foreignKey: 'categoriaId' });

module.exports = { Productos, ProductoModel };
