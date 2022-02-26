import express from 'express';
const router = express.Router();
import {registrar, confirmar, autenticar, perfil, olvidePassword, comprobarToken, nuevoPassword} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

// /api/veterinarios - Publico
router.post('/', registrar);
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token')
    .get(comprobarToken)
    .post(nuevoPassword);

// Privado
router.get('/perfil', checkAuth, perfil);

export default router;
