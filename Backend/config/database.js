const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    logging: config.db.logging,
    dialectOptions: {
        multipleStatements: true,
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    }
});


async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a la base de datos exitosa.');
    } catch (error) {
        console.error('❌ Error al conectar con la base de datos:', error);
        process.exit(1);
    }
}

module.exports = {
    sequelize,
    connectDB
};
