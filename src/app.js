import path from 'path';
import mongoose from 'mongoose';
import express from 'express';
import express from 'express-handlebars'; 
import passport from 'passport';
import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionsRouter } from './routes/sessions.router.js';
import { initPassport } from './config/passport.config.js';

const port = 8080;
const app = express();

app.engine('handlebars', express()); 
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views')); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public'))); 

initPassport();
app.use(passport.initialize());

app.use('/', vistasRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(port, () => {
    console.log(`¡Hola a todos! Estamos en el puerto ${port}`);
});

const conectadoConMongoDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/taller", { useNewUrlParser: true });
        console.log(' Estas conectado a mongoDB ');
    } catch {
        console.error('Error al conectar a MongoDB');
    }
};
conectadoConMongoDB();