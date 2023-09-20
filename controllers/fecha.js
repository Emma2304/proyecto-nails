const fechaRouter = require('express').Router();
const User = require('../models/user');
const Cita = require('../models/cita');

fechaRouter.get('/', async (request, response) => {
    const fecha = request.query.fecha;
    const citas = await Cita.find({ fecha });
    return response.status(200).json(citas)
});


module.exports = fechaRouter;