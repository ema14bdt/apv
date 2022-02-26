import express from 'express';
import dotenv from 'dotenv';
import conectDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json()); // for parsing application/json
dotenv.config();
conectDB();

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
