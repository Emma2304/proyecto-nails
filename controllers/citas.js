const citasRouter = require('express').Router();
const User = require('../models/user');
const Cita = require('../models/cita');

citasRouter.get('/', async (request, response) => {
    const user = request.user;
    const usuario = await User.find(user);
    const citas = await Cita.find({ user: user.id });
    return response.status(200).json({ citas, usuario });
});

citasRouter.get('/all', async (request, response) => {
    const user = request.user;

    if (!user) {
        return response.sendStatus(401);
    }

    const citas = await Cita.find({});
    return response.status(200).json(citas);
});

citasRouter.post('/', async (request, response) => {
    const user = request.user;
    const { cliente } = request.body;
    const { fecha } = request.body;
    const { horario } = request.body;
    const { servicio } = request.body;
    const newCita = new Cita({
        cliente,
        fecha,
        horario,
        servicio,
        user: user._id
    });
    const savedCita = await newCita.save();
    user.citas = user.citas.concat(savedCita._id);
    await user.save();

    return response.status(201).json(savedCita);
});

module.exports = citasRouter;