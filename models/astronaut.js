const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AstronautSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    superpower: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('Astronaut', AstronautSchema);