const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    cliente: String,
    fecha: String,
    horario: String,
    servicio: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

citaSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Cita = mongoose.model('Cita', citaSchema);

module.exports = Cita;