require('dotenv').config(); 

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        host: process.env.DB_HOST || 'localhost',
        username: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'drogueria',
        dialect: process.env.DB_DIALECT || 'mysql', 
        logging: process.env.DB_LOGGING === 'true',
    }
};

module.exports = config;
