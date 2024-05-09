// Importa il modulo Router da Express per gestire le route
const { Router } = require("express");
const passport = require("passport");
const { authMiddleware } = require("../middlewares/authentication");

// Importa i controller necessari per gestire le richieste relative ai blog
const {
  getAuthors,
  login,
  getMyProfile,
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
  .post("/login", login) // Route per ottenere il token di accesso
  .get("/me", authMiddleware, getMyProfile) // Route per ottenere il mio profilo
  .get("/authors/pagination/", getAuthorsPaginations) // Route per ottenere la paginazione dei blog
  .get("/authors/pagination/:order", getAuthorsPaginationOrders) // Route per ottenere la paginazione dei blog
  .get("/authors/:id", detailAuthor) // Route per ottenere i dettagli di un blog specifico in base all'ID
  .get(
    "/googleLogin",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  ) // Route per effettuare il signup e login con Google
  .get(
    "/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
      try {
        res.redirect(
          `http://localhost:3000/?accessToken=${req.user.accessToken}`
        );
      } catch (error) {
        // Gestisci eventuali errori qui
        console.error(error);
        res.status(500).send("Internal Server Error");
      }
    }
  ) // Route per la callback di Google Authentication
  .post("/authors", saveAuthor) // Route per salvare un nuovo blog
  .put("/authors/:id", authMiddleware, updateAuthor) // Route per aggiornare un blog esistente in base all'ID
  // .patch("/authors/:id/avatar", updateAuthorAvatar) // Route per aggiornare l'avatar dell'utente
  .delete("/authors/:id", deleteAuthor); // Route per eliminare un blog esistente in base all'ID

// Esporta il router per renderlo disponibile ad altri moduli
module.exports = router;
