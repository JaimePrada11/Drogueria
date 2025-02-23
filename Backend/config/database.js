const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    dialect: config.db.dialect,
    logging: config.db.logging,
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1);  // Terminar la ejecución si no se puede conectar a la base de datos
    }
}

module.exports = {
    sequelize,
    connectDB
};
