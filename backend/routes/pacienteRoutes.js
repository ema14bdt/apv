import express from 'express';
const router = express.Router();
import checkAuth from "../middleware/authMiddleware.js"
import { agregarPaciente, obtenerPacientes, obtenerPaciente, editarPaciente, eliminarPaciente } from '../controllers/pacienteController.js';

// /api/pacientes 
router.route('/')
    .post(checkAuth, agregarPaciente)
    .get(checkAuth, obtenerPacientes);

router.route('/:id')
    .get(checkAuth, obtenerPaciente)
    .put(checkAuth, editarPaciente)
    .delete(checkAuth, eliminarPaciente)

export default router;