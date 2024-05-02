// Importa il modulo Router da Express per gestire le route
const { Router } = require("express");

// Importa il middleware per l'autenticazione JWT
const { authMiddleware } = require("../middlewares/authentication");

// Importa i controller necessari per gestire le richieste relative ai blog
const {
  getBlogs,
  getBlogsPaginations,
  getBlogsPaginationOrders,
  detailBlog,
  getPostsByAuthorId,
  saveBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/BlogControllers");

// Crea un'istanza di Router di Express
const router = Router();

// Definisci le route utilizzando il metodo corrispondente del router e associa ciascuna a una funzione del controller
router
  .get("/blogPosts", getBlogs) // Route per ottenere tutti i blog
  .get("/blogPosts/pagination/", getBlogsPaginations) // Route per ottenere la paginazione dei blog
  .get("/blogPosts/pagination/:order", getBlogsPaginationOrders) // Route per ottenere la paginazione dei blog
  .get("/blogPosts/:id", detailBlog) // Route per ottenere i dettagli di un blog specifico in base all'ID
  .get("/blogPosts/author/:id", getPostsByAuthorId) // Route per ottenere tutti i post di un autore specifico
  .post("/blogPosts", authMiddleware, saveBlog) // Route per salvare un nuovo blog
  .put("/blogPosts/:id", authMiddleware, updateBlog) // Route per aggiornare un blog esistente in base all'ID
  .delete("/blogPosts/:id", authMiddleware, deleteBlog); // Route per eliminare un blog esistente in base all'ID

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
