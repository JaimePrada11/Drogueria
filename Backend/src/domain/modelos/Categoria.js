const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config/database');


class Categoria {
    constructor(nombre) {
        this._nombre = nombre;
    }

    get nombre() {
        return this._nombre;
    }

    set nombre(newNombre) {
        this._nombre = newNombre;
    }


    static async createFromData(categoryData) {
        return await CategoriaModel.create({
            nombre: categoryData.nombre
        });
    }
}

const CategoriaModel = sequelize.define('Categoria', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
},
{
    timestamps: false 
});
module.exports = { Categoria, CategoriaModel };
