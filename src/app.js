import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';

const app = express();

// ========================
// CONFIGURACIÓN BÁSICA
// ========================
app.use(cors());
app.use(express.json());

// ========================
// CONFIGURAR __dirname (ESM)
// ========================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================
// SERVIR FRONTEND (PUBLIC)
// ========================
app.use(express.static(path.join(__dirname, 'public')));

// ========================
// RUTAS API
// ========================
app.use('/api/auth', authRoutes);

// ========================
// RUTA PRINCIPAL (opcional)
// ========================
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;