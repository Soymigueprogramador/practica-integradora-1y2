import path from 'path';
import mongoose from 'mongoose';
import express from 'express';
import expressHandlebars from 'express-handlebars'; 
import passport from 'passport';
import { router as vistasRouter } from './routes/vistas.router';
import { router as sessionsRouter } from './routes/sessions.router';
import { initPassport } from './config/passport.config';
import { config } from './config/config';

const port = config.port;
const app = express();

app.engine('handlebars', engine()); 
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());

app.use(express.static(path.join(__dirname, '/public')));
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
        console.log('Estás conectado a MongoDB');
    } catch (error) { 
        console.error('Error al conectar a MongoDB:', error.message); // Imprimir el mensaje de error
    }
};
conectadoConMongoDB();