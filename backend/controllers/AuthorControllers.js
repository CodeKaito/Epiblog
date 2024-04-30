const cloudinaryMiddleware = require("../middlewares/multer.js");
// Importa il modello del author per interagire con il database
const AuthorModel = require("../models/AuthorModel");

const sendEmail = require("../middlewares/sendMail.js");
const bcrypt = require("bcryptjs");

const {
  authMiddleware,
  generateJWT,
} = require("../middlewares/authentication.js");

// Funzione asincrona per ottenere tutti i author dal database e inviarli come risposta
module.exports.getAuthors = async (req, res, next) => {
  try {
    // Recupera tutti i author dal database utilizzando il modello author
    const author = await AuthorModel.find();
    // Invia la lista dei author come risposta
    res.send(author);
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    // Passa l'errore al middleware successivo
    next(error);
  } finally {
    // Stampa a console il completamento del processo di recupero dei author
    console.log("Authors retrieval process completed.");
  }
};

module.exports.login = async (req, res, next) => {
  try {
    let userFound = await User.findOne({
      username: req.body.username,
    });

    if (userFound) {
      const isPasswordMatching = await bcrypt.compare(
        req.body.password,
        userFound.password
      );

      if (isPasswordMatching) {
        const token = await generateJWT({
          username: userFound.username,
        });

        res.send({ user: userFound, token });
      } else {
        res.status(401).send("Wrong username or password");
      }
    } else {
      res.status(401).send("Wrong username or password");
    }
  } catch (err) {
    next(err);
  }
};

// Funzione asincrona per ottenere tutti i author dal database e inviarli come risposta
module.exports.getAuthorsPaginations = async (req, res, next) => {
  // http://localhost:3001/api/pagination?page=1
  const pageQuery = req.query.page || 0;

  // Quanti documenti vogliamo mostrare per ogni pagina
  const itemsPerPage = 2;
  try {
    // 1. Trovami tutti gli utenti
    // 2. Salta in base a (itemsPerPage * pageQuery)
    // 3. Limita i documenti ricevuti a itemsPerPage

    const author = await AuthorModel.find()
      .skip(itemsPerPage * pageQuery) // Skippa il primo se metti 1, skippa il primo e il secondo se metti 2
      .limit(itemsPerPage); // Ti mostra solo 2 oggetti

    // Invia la lista dei author come risposta
    res.send(author);
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    // Passa l'errore al middleware successivo
    next(error);
  } finally {
    // Stampa a console il completamento del processo di recupero dei author
    console.log("Authors retrieval process completed.");
  }
};

// Funzione asincrona per ottenere tutti i author dal database e inviarli come risposta
module.exports.getAuthorsPaginationOrders = async (req, res, next) => {
  let orderParam = parseInt(req.params.order);
  try {
    // Recupera tutti i author dal database utilizzando il modello author
    const author = await AuthorModel.find() // Effettua una ricerca
      .sort({
        // Effettua un sorting degli oggetti
        name: orderParam !== -1 && orderParam !== 1 ? 1 : orderParam,
      })
      .skip(1) // Skippa il primo se metti 1, skippa il primo e il secondo se metti 2
      .limit(2); // Ti mostra solo 2 oggetti

    // Invia la lista dei author come risposta
    res.send(author);
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    // Passa l'errore al middleware successivo
    next(error);
  } finally {
    // Stampa a console il completamento del processo di recupero dei author
    console.log("Authors retrieval process completed.");
  }
};

// Funzione asincrona per ottenere i dettagli di un author specifico in base all'ID e inviarli come risposta
module.exports.detailAuthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Cerca il author nel database utilizzando l'ID fornito
    const author = await AuthorModel.findById(id);
    // Invia i dettagli del author come risposta
    res.send(author);
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    // Passa l'errore al middleware successivo
    next(error);
  } finally {
    // Stampa a console il completamento del processo di recupero dei dettagli del author
    console.log(`Author with id: ${id} details retrieval process completed.`);
  }
};

// Funzione per salvare un nuovo author nel database e inviare il risultato della creazione come risposta
module.exports.saveAuthor = async (req, res, next) => {
  try {
    // Esegue il middleware di Cloudinary per caricare l'avatar + i dati dell'autore
    // Estrai i dati dell'autore dalla richiesta
    const { username, email, password } = req.body;

    // Password crittografata
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crea un nuovo autore nel database utilizzando i dati forniti
    const newAuthor = await AuthorModel.create({
      username,
      email,
      password: hashedPassword,
    });

    await sendEmail({ username, email });

    // Invia il nuovo autore creato come risposta con stato 201
    console.log("Saved successfully, author: " + JSON.stringify(newAuthor));
    res.status(201).send(newAuthor);
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    // Passa l'errore al middleware successivo
    next(error);
  } finally {
    // Stampa a console il completamento del processo di creazione del author
    console.log(`Author creation process completed.`);
  }
};

// module.exports.saveAuthor = async (req, res, next) => {
//   try {
//     // Esegue il middleware di Cloudinary per caricare l'avatar + i dati dell'autore
//     cloudinaryMiddleware(req, res, async () => {
//       // Estrai i dati dell'autore dalla richiesta
//       const { name, surname, email, birth, bio, password } = req.body;

//       // Password crittografata
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Crea un nuovo autore nel database utilizzando i dati forniti
//       const newAuthor = await AuthorModel.create({
//         name,
//         surname,
//         email,
//         birth,
//         bio,
//         password: hashedPassword,
//         // Aggiunge il percorso dell'avatar dal req.file se è stato caricato correttamente
//         avatar: req.file ? req.file.path : null,
//       });

//       await sendEmail({ name, surname, email });

//       // Invia il nuovo autore creato come risposta con stato 201
//       console.log("Saved successfully, author: " + JSON.stringify(newAuthor));
//       res.status(201).send(newAuthor);
//     });
//   } catch (error) {
//     // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
//     console.error(error.message);
//     res.status(500).send({
//       error: error.message,
//       stack: error.stack,
//       msg: "Something went wrong!",
//     });
//     // Passa l'errore al middleware successivo
//     next(error);
//   } finally {
//     // Stampa a console il completamento del processo di creazione del author
//     console.log(`Author creation process completed.`);
//   }
// };

// Funzione per aggiornare un author esistente nel database e inviare il risultato dell'aggiornamento come risposta
module.exports.updateAuthor = async (req, res, next) => {
  const id = req.params.id;
  const author = req.body;
  try {
    // Aggiorna il author nel database utilizzando l'ID fornito e i dati del author
    const updatedAuthor = await AuthorModel.findByIdAndUpdate(id, author, {
      new: true, // Restituisce l'oggetto aggiornato
    });
    if (!updatedAuthor) {
      // Se l'autore non è stato trovato, restituisci un messaggio di errore
      return res.status(404).send("Author not found");
    }
    // Invia una conferma di aggiornamento come risposta
    res.send("Updated successfully, author: " + JSON.stringify(updatedAuthor));
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    // Passa l'errore al middleware successivo
    next(error);
  } finally {
    // Stampa a console il completamento del processo di aggiornamento del author
    console.log(`Author with id: ${id} update process completed.`);
  }
};

module.exports.updateAuthorAvatar = async (req, res, next) => {
  const id = req.params.id;
  try {
    // Esegui il middleware di Cloudinary per caricare l'avatar
    cloudinaryMiddleware(req, res, async () => {
      // Aggiorna l'URL dell'avatar dell'autore nel database
      const updatedAuthor = await AuthorModel.findByIdAndUpdate(
        id,
        { avatar: req.file.path },
        { new: true }
      );
      if (!updatedAuthor) {
        // Se l'autore non è stato trovato, restituisci un messaggio di errore
        return res.status(404).send("Author not found");
      }
      // Invia una conferma di aggiornamento con i dettagli dell'autore aggiornati
      res.send(
        "Updated successfully, author: " + JSON.stringify(updatedAuthor)
      );
    });
  } catch (error) {
    // Gestisci altri errori
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      msg: "Something went wrong!",
    });
    next(error);
  } finally {
    // Stampa a console il completamento del processo di aggiornamento dell'autore
    console.log(`Author with id: ${id} update process completed.`);
  }
};

// Funzione per eliminare un author esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteAuthor = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Elimina il author dal database utilizzando l'ID fornito
    await AuthorModel.findByIdAndDelete(id);
    // Invia una conferma di eliminazione come risposta
    res.send("Deleted successfully, author: " + JSON.stringify(id));
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).send({
      error: error.message,
      stack: error.stack,
      msg: "Something went wrong!",
    });
    // Passa l'errore al middleware successivo
    next(error);
  } finally {
    // Stampa a console il completamento del processo di eliminazione del author
    console.log(`Author with id: ${id} deletion process completed.`);
  }
};
