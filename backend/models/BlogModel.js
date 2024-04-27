// Importa il modulo mongoose per la gestione del database MongoDB
const mongoose = require("mongoose");

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
  // Definisce il campo 'cover' di tipo String
  cover: {
    type: String,
    required: true,
  },
  // Definisce il campo 'readTime' di tipo String e richiesto
  readTime: {
    value: {
      type: Number,
      required: false,
    },
    unit: {
      type: String,
      required: false,
    },
  },
  // author: {
  //   id: {
  //     type: String,
  //     required: true,
  //   },
  //   name: {
  //     type: String,
  //     required: true,
  //   },
  //   avatar: {
  //     type: String,
  //     required: true,
  //   },
  // },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Esporta il modello mongoose associato allo schema definito sopra
module.exports = mongoose.model("Blog", blogSchema);
