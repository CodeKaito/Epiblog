const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: false,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    birth: {
      type: Date,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Esporta il modello mongoose associato allo schema definito sopra
module.exports = mongoose.model("Author", authorSchema);
