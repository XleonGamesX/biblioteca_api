import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';

// 1. Cargar las variables de entorno lo antes posible
dotenv.config();

// 2. Conectar a la base de datos de Mongo Atlas
connectDB();

// 3. Definir el puerto de escucha (asigna el de tu .env o el 3000 por defecto)
const PORT = process.env.PORT || 3000;

// 4. Iniciar el servidor Express
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo con éxito en el puerto ${PORT}`);
});