const pendientesRouter = require('express').Router();
const User = require('../models/user');
const Cita = require('../models/cita');

pendientesRouter.get('/', async (request, response) => {
    const user = request.user;
    const citas = await Cita.find({ user: user.id });
    return response.status(200).json(citas);
});

pendientesRouter.delete('/:id', async (request, response) => {
    const user = request.user;

    await Cita.findByIdAndDelete(request.params.id);

    user.citas = user.citas.filter(id => id.toString() !== request.params.id);

    await user.save();
    return response.sendStatus(204);
});


module.exports = pendientesRouter;