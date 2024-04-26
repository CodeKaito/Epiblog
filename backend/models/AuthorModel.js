const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  birth: {
    type: Date,
    required: true,
  },
  avatar: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
  },
});

// Esporta il modello mongoose associato allo schema definito sopra
module.exports = mongoose.model("Author", authorSchema);
