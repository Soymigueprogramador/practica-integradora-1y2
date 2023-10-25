import { Router } from "express";
import passport from 'passport';
import {usuariosModel} from "../models/usuarios.model.js";  
export const router = Router();

router.get('/registro', (req, res) => {
    const error = req.query.error || false;
    res.status(200).render('registrar', { error });
});

router.get('/login', (req, res) => {
    const error = req.query.error || false;
    const mensaje = req.query.mensaje || false;
    res.status(200).render('login', { error, mensaje });
});

router.get('/perfil', passport.authenticate('jwt', { sessions: false }), async (req, res) => {
    const pagina = req.query.pagina || 1;
    const usuarios = await usuariosModel.paginate({}, { lean: true, limit: 5, page: pagina });
    const { hasPrevPage, hasNextPage, nextPage, prevPage, totalPage, page } = usuarios;
    res.status(200).render('perfil', {
        usuarios: usuarios.docs,
        hasPrevPage,
        hasNextPage,
        nextPage,
        prevPage,
        totalPage,
        page
    });
});
export default router;