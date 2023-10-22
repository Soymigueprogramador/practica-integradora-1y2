import { Router } from "express"; 
import passport from 'passport';
import { JsonWebToken } from "jsonwebtoken";
import config from '../config/config';
export const router = Router();

router.post('/registro', function(req, res, next) {
    passport.authenticate('registro', function(error, user, info, status) {
        if (error) { return next(error) }
        if (!user) { return res.redirect('/registro?error=${info.menssage}?info.menssage:info.toString()') }
        res.user = user;
        return next(); 
    }) (req, res, next); 
}), (req, res) => {
    res.status(200).redirect('/login?menssage=usuario${req.user.nombre} Estas registrado. username: ${req.user.email}');
}

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user, info, status) => {
        if (error) { return next(error); }
        if (!user) { return res.redirect(`/login?error=${info.message}`); }
        req.user = user;
        return next();
    })(req, res, next);
}, (req, res) => {
    let token = jwt.sign({
        usuario: {
            nombre: req.user.nombre,
            email: req.user.email,
            rol: req.user.rol
        }
    }, config.SECRET, { expiresIn: '2h' }); 

    res.cookie('mg-lo-quiero-d3Cookie', token, { httpOnly: true });
    res.status(200).redirect('/perfil?message=Usuario ${req.user.nombre} Bienvenido. Rol: ${req.user.rol}'); 
});

router.get("/logout", (req, res) => {
    res.clearCookie('mg-lo-quiero-d3Cookie');
    res.status(200).redirect('/login?menssage= logeado!!');
});