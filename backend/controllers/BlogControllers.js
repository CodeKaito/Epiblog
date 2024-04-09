const axios = require('axios'); // Importa axios per la gestione delle fetch

// Importa il modello del blog per interagire con il database
const BlogModel = require("../models/BlogModel");

// Funzione asincrona per ottenere tutti i blog dal database e inviarli come risposta
module.exports.getBlogs = async (req, res) => {
    try {
        const response = await axios.get('http://localhost:5000/api/get');
        res.send(response.data);
    } catch (error) {
        handleAxiosError(error, res);
    }
}

// Funzione asincrona per ottenere i dettagli di un blog specifico in base all'ID e inviarli come risposta
module.exports.detailBlogs = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`http://localhost:5000/api/get/${id}`);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(error, res);
    }
};

// Funzione per salvare un nuovo blog nel database e inviare il risultato della creazione come risposta
module.exports.saveBlogs = async (req, res) => {
    const blog = req.body;
    try {
        const response = await axios.post('http://localhost:5000/api/save', blog);
        res.status(201).send(response.data);
    } catch (error) {
        handleAxiosError(error, res);
    }
}

// Funzione per aggiornare un blog esistente nel database e inviare il risultato dell'aggiornamento come risposta
module.exports.updateBlogs = async (req, res) => {
    const { id } = req.params;
    const { blog } = req.body;
    try {
        const response = await axios.put(`http://localhost:5000/api/update/${id}`, blog);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(error, res);
    }
}

// Funzione per eliminare un blog esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteBlogs = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.delete(`http://localhost:5000/api/delete/${id}`);
        res.send(response.data);
    } catch (error) {
        handleAxiosError(error, res);
    }
}
