const app = require("./src/app");
const { connectDB, sequelize } = require("./config/database");

require("./src/domain/modelos/Categoria");
require("./src/domain/modelos/Productos");

async function startServer() {
    try {
        await connectDB();

        console.log("⏳ Sincronizando base de datos...");
        await sequelize.sync({ alter: true });

        console.log("✅ Base de datos sincronizada.");

        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Error al iniciar el servidor:", error);
    }
}

startServer();
