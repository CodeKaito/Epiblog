// Importa il modulo mongoose per la gestione del database MongoDB
const mongoose = require('mongoose');

// Definisce lo schema del blog utilizzando il modulo mongoose
const blogSchema = new mongoose.Schema({
    // Definisce il campo 'category' di tipo String e richiesto
    category: {
        type: String,
        required: true,
    },
    // Definisce il campo 'title' di tipo String e richiesto
    title: {
        type: String,
        required: true,
    },
    // Definisce il campo 'cover' di tipo String e richiesto
    cover: {
        type: String,
    },
    // Definisce il campo 'readTime' di tipo String e richiesto
    readTime: {
        value: {
            type: Number,
            required: true,
        },
        unit: {
            type: String,
            required: true,
        }
    },
    author: {
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            required: true,
        }
    },
    content: {
        type: String,
        required: true,
    } 
})

// Esporta il modello mongoose associato allo schema definito sopra
module.exports = mongoose.model("Blog", blogSchema);
