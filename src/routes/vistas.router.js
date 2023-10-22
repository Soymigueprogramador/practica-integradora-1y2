import { Router } from "express"; 
import passport from 'passport';
import { usuariosModel } from '../models/usuarios.model';
export const router = Router();

router.get('/registro', (req, res) => {
    let error = false;
    if (req.query.error) {
        error = req.query.error;
    }
    res.status(200).render('registrar', { error });
});

router.get('/login', (req, res) => {
    let error = false;
    if (req.query.error) {
        error = req.query.error;
    }
    let mensaje = false;
    if (req.query.mensaje) {
        mensaje = req.query.mensaje;
    }
    res.status(200).render('login', { error, mensaje });
});

router.get('/perfil', passport.authenticate('jwt', { sessions: false }), async (req, res) => {
    let pagina = 1;
    if (req.query.pagina) {
        pagina = req.query.pagina;
    }
    let usuarios = await usuariosModel.paginate({}, { lean: true, limit: 5, page: pagina });
    console.log(usuarios);
    let { hasPrevPage, hasNextPage, nextPage, prevPage, totalPage, page } = usuarios;
    res.status(200).render('perfil', {
        usuarios: usuarios.docs, hasPrevPage, hasNextPage, nextPage, prevPage, totalPage, page
    });
});