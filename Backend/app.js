const app = require('./src/app');
const { connectDB } = require('./config/database');

// Conectar a la base de datos
connectDB();

// Iniciar servidor Express
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
