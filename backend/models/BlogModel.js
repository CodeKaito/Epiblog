const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    cognome: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    data_nascita: {
        type: String,
    },
    avatar: {
        type: String,
    },

})

module.exports = mongoose.model("Blog", blogSchema);