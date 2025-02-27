const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('railway', 'root', 'AGXjoTeUHFtuoWmpNgaohouKgmjZOCgg', {
    host: process.env.DB_HOST || 'yamabiko.proxy.rlwy.net',
    port: process.env.DB_PORT || 15839,
    dialect: 'mysql',
    logging: false,
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión exitosa.');
    } catch (error) {
        console.error('❌ Error de conexión:', error);
        process.exit(1);
    }
}

module.exports = { sequelize, connectDB };
