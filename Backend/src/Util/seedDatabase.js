const { sequelize } = require('../../config/database');
const fs = require('fs');
const path = require('path');

async function seedDatabase() {
    try {
        console.log('🔍 Conectando a la base de datos...');
        await sequelize.authenticate();

        const seedFilePath = path.join(__dirname, 'database.sql');
        if (!fs.existsSync(seedFilePath)) throw new Error('Archivo SQL no encontrado');

        const seedSQL = fs.readFileSync(seedFilePath, 'utf8').trim();
        if (!seedSQL) throw new Error('El archivo SQL está vacío');

        await sequelize.query(seedSQL, { raw: true, multipleStatements: true });

        console.log('Datos insertados correctamente.');
    } catch (error) {
        console.error(' Error ejecutando el seed:', error);
    } finally {
        if (require.main === module) {
            await sequelize.close();
            console.log('🔌 Conexión cerrada.');
        }
    }
}

if (require.main === module) {
    seedDatabase();
}

module.exports = seedDatabase;
