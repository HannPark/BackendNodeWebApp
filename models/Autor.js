const mongoose = require('mongoose');

const AuthorSchema =  new mongoose.Schema({
    nombre: String,
    apellido: String,
    gradoAcademico: String,
    nombreCompleto: String
});

module.exports = mongoose.model('Autor', AuthorSchema);