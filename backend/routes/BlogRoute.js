// Importa il modulo Router da Express per gestire le route
const { Router } = require('express');

// Importa i controller necessari per gestire le richieste relative ai blog
const { getBlogs, detailBlogs, updateBlogs, saveBlogs, deleteBlogs } = require('../controllers/BlogControllers');

// Crea un'istanza di Router di Express
const router = Router();

// Definisci le route utilizzando il metodo corrispondente del router e associa ciascuna a una funzione del controller
router
    .get("/get", getBlogs)         // Route per ottenere tutti i blog
    .get("/get/:id", detailBlogs)   // Route per ottenere i dettagli di un blog specifico in base all'ID
    .post("/save", saveBlogs)       // Route per salvare un nuovo blog
    .put("/update/:id", updateBlogs) // Route per aggiornare un blog esistente in base all'ID
    .delete("/delete/:id", deleteBlogs); // Route per eliminare un blog esistente in base all'ID

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
