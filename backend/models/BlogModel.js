// Importa il modulo mongoose per la gestione del database MongoDB
const mongoose = require('mongoose');

// Definisce lo schema del blog utilizzando il modulo mongoose
const blogSchema = new mongoose.Schema({
    // Definisce il campo 'name' di tipo String e richiesto
    name: {
        type: String,
        required: true,
    },
    // Definisce il campo 'surname' di tipo String e richiesto
    surname: {
        type: String,
        required: true,
    },
    // Definisce il campo 'email' di tipo String e richiesto
    email: {
        type: String,
        required: true,
    },
    // Definisce il campo 'birth' di tipo String e richiesto
    birth: {
        type: Date,
        required: true,
    },
    // Definisce il campo 'avatar' di tipo String e richiesto
    avatar: {
        type: String,
        required: true,
    }
})

// Esporta il modello mongoose associato allo schema definito sopra
module.exports = mongoose.model("Blog", blogSchema);
