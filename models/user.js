const mongoose = require('mongoose');

const rolesValidos = {
    values: ["ADMIN", "USER"]
}

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    passwordHash: String,
    verified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: rolesValidos,
        default: 'USER',
    },
    citas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cita'
    }]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;