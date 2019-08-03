const mongoose = require('mongoose');
const UserSchema = mongoose.Schema({
    id: {type: String, required: false},
    name: {type: String, required: false},
    email: {type: String, required: false},
    telefono: {type: String, required: false},
    sugerencia: {type: String, required: false},
},{
    timestamps:true
});

module.exports = mongoose.model('User',UserSchema);