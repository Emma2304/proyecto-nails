require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const { userExtractor } = require('./middleware/auth');
const agendaRouter = require('./controllers/agenda');
const citasRouter = require('./controllers/citas');
const pendientesRouter = require('./controllers/pendientes');
const logoutRouter = require('./controllers/logout');
const adminRouter = require('./controllers/admin');
const fechaRouter = require('./controllers/fecha');
const { MONGO_URI } = require('./config');

(async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Conectado a Mongo DB');
    } catch (error) {
        console.log(error);
    }
})();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Rutas frontend
app.use('/', express.static(path.resolve('views', 'home')));
app.use('/styles', express.static(path.resolve('views', 'styles')));
app.use('/signup', express.static(path.resolve('views', 'signup')));
app.use('/login', express.static(path.resolve('views', 'login')));
app.use('/citas', express.static(path.resolve('views', 'citas')));
app.use('/agenda', express.static(path.resolve('views', 'agenda')));
app.use('/clients', express.static(path.resolve('views', 'clients')));
app.use('/pendientes', express.static(path.resolve('views', 'pendientes')));
app.use('/admin', express.static(path.resolve('views', 'admin')));
app.use('/images', express.static(path.resolve('img')));
app.use('/components', express.static(path.resolve('views', 'components')));
app.use('/verify/:id/:token', express.static(path.resolve('views', 'verify')));

app.use(morgan('tiny'));

// Rutas backend
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/citas', userExtractor, citasRouter);
app.use('/api/fecha', fechaRouter);
app.use('/api/agenda', userExtractor, agendaRouter);
app.use('/api/pendientes', userExtractor, pendientesRouter);
app.use('/api/admin', userExtractor, adminRouter);


module.exports = app;