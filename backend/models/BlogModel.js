const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
    },
    email: {
        type: String,
    },
    birth: {
        type: String,
    },
    avatar: {
        type: String,
    }
})

module.exports = mongoose.model("Blog", blogSchema);