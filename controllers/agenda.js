const agendaRouter = require('express').Router();
const User = require('../models/user');
const Cita = require('../models/cita');

agendaRouter.get('/', async (request, response) => {
    const user = request.user;
    const usuarios = await User.find(user);
    return response.status(200).json(usuarios);
});


module.exports = agendaRouter;