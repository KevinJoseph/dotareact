const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = Schema(
    {
        id: {type: String, required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        telefono: {type: String, required: true},
        sugerencia: {type: String, required: true},
    }, 
    { timestamps: true }
);
const player = mongoose.model("Player", PlayerSchema);
module.exports = Note;

