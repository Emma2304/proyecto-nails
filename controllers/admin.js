const adminRouter = require('express').Router();
const User = require('../models/user');
const Cita = require('../models/cita');

adminRouter.get('/', async (request, response) => {
    const user = request.user;
    const usuarios = await User.find(user);
    const citas = await Cita.find({ user: user.id });
    return response.status(200).json({ citas, usuarios });
});

module.exports = adminRouter;