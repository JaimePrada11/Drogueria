const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');

class Autor {
    constructor(nombre) {
        this._nombre = nombre; 
    }

    get nombre() {
        return this._nombre; 
    }

    set nombre(newNombre) {
        this._nombre = newNombre; 
    }

    static async createFromData(autorData) {
        const autor = new Autor(autorData.nombre);
        return await AutorModel.create({
            nombre: autor.nombre
        });
    }
} 

const AutorModel = sequelize.define('Autor', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = { Autor, AutorModel };
