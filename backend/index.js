import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import conectDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

const app = express();
app.use(express.json()); // for parsing application/json
dotenv.config();
conectDB();

const dominiosPermitidos = [
    'http://localhost:3000',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
