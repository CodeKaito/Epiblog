// Importa il modulo Router da Express per gestire le route
const { Router } = require("express");

// Importa i controller necessari per gestire le richieste relative ai blog
const {
  getAuthors,
  getAuthorsPaginations,
  getAuthorsPaginationOrders,
  detailAuthor,
  updateAuthor,
  saveAuthor,
  deleteAuthor,
} = require("../controllers/AuthorControllers");

// Crea un'istanza di Router di Express
const router = Router();

// Definisci le route utilizzando il metodo corrispondente del router e associa ciascuna a una funzione del controller
router
  .get("/authors", getAuthors) // Route per ottenere tutti i blog
  .get("/authors/pagination/", getAuthorsPaginations) // Route per ottenere la paginazione dei blog
  .get("/authors/pagination/:order", getAuthorsPaginationOrders) // Route per ottenere la paginazione dei blog
  .get("/authors/:id", detailAuthor) // Route per ottenere i dettagli di un blog specifico in base all'ID
  .post("/authors", saveAuthor) // Route per salvare un nuovo blog
  .put("/authors/:id", updateAuthor) // Route per aggiornare un blog esistente in base all'ID
  .delete("/authors/:id", deleteAuthor); // Route per eliminare un blog esistente in base all'ID

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
