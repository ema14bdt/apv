import express from 'express';
import dotenv from 'dotenv';
import conectDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';

const app = express();
app.use(express.json()); // for parsing application/json
dotenv.config();
conectDB();

app.use('/api/veterinarios', veterinarioRoutes);

const PORT = process.env.PORT || 4000;

app.listen(4000, () => {
    console.log(`Server is running on port ${PORT}`);
});
