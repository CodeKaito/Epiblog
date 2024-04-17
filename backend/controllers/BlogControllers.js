// Importa il modello del author per interagire con il database
const BlogModel = require("../models/BlogModel");

// Funzione asincrona per ottenere tutti i author dal database e inviarli come risposta
module.exports.getBlogs = async (req, res, next) => {
  try {
    let filter = {}; // Inizializza il filtro come un oggetto vuoto

    // Controlla se la query di ricerca è presente e non è vuota
    if (req.query.searchTitle && req.query.searchTitle.trim() !== "") {
      // Utilizza una espressione regolare per trovare corrispondenze parziali nel titolo
      filter.title = { $regex: req.query.searchTitle, $options: "i" };
    }

    // Esegui la query al database utilizzando il filtro
    const blogs = await BlogModel.find(filter);

    // Invia la lista dei blog filtrata come risposta
    res.send(blogs);
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
    // Stampa a console il completamento del processo di recupero dei blog
    console.log("Blogs retrieval process completed.");
  }
};

// Funzione asincrona per ottenere tutti i author dal database e inviarli come risposta
module.exports.getBlogsPaginations = async (req, res, next) => {
  // http://localhost:3001/api/pagination?page=1
  const pageQuery = req.query.page || 0;

  // Quanti documenti vogliamo mostrare per ogni pagina
  const itemsPerPage = 2;
  try {
    // 1. Trovami tutti gli utenti
    // 2. Salta in base a (itemsPerPage * pageQuery)
    // 3. Limita i documenti ricevuti a itemsPerPage

    const blog = await AuthorModel.find()
      .skip(itemsPerPage * pageQuery) // Skippa il primo se metti 1, skippa il primo e il secondo se metti 2
      .limit(itemsPerPage); // Ti mostra solo 2 oggetti

    // Invia la lista dei author come risposta
    res.send(blog);
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
    console.log("Blogs retrieval process completed.");
  }
};

// Funzione asincrona per ottenere tutti i author dal database e inviarli come risposta
module.exports.getBlogsPaginationOrders = async (req, res, next) => {
  let orderParam = parseInt(req.params.order);
  try {
    // Recupera tutti i author dal database utilizzando il modello author
    const blog = await BlogModel.find() // Effettua una ricerca
      .sort({
        // Effettua un sorting degli oggetti
        name: orderParam !== -1 && orderParam !== 1 ? 1 : orderParam,
      })
      .skip(1) // Skippa il primo se metti 1, skippa il primo e il secondo se metti 2
      .limit(2); // Ti mostra solo 2 oggetti

    // Invia la lista dei author come risposta
    res.send(blog);
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
    console.log("Blog retrieval process completed.");
  }
};

// Funzione asincrona per ottenere i dettagli di un author specifico in base all'ID e inviarli come risposta
module.exports.detailBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Cerca il author nel database utilizzando l'ID fornito
    const blog = await BlogModel.findById(id);
    // Invia i dettagli del author come risposta
    res.send(blog);
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
    console.log(`Blog with id: ${id} details retrieval process completed.`);
  }
};

// Funzione asincrona per ottenere tutti i post con un autore specifico e inviarli come risposta// Funzione asincrona per ottenere tutti i post con un autore specifico e inviarli come risposta
module.exports.getPostsByAuthorName = async (req, res, next) => {
  const authorName = req.params.name; // Nome dell'autore fornito nella richiesta
  try {
    // Esegui la query al database per trovare tutti i post con il nome dell'autore specificato
    const posts = await BlogModel.find({ "author.name": authorName });

    // Invia la lista dei post come risposta
    res.send(posts);
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
    // Stampa a console il completamento del processo di recupero dei post dell'autore
    console.log("Post retrieval process completed.");
  }
};

// Funzione per salvare un nuovo author nel database e inviare il risultato della creazione come risposta
module.exports.saveBlog = async (req, res, next) => {
  try {
    const blog = req.body;
    // Crea un nuovo author nel database utilizzando i dati forniti
    const data = await BlogModel.create(blog);
    // Invia il nuovo author creato come risposta con stato 201
    console.log("Saved successfully, blog: " + JSON.stringify(data));
    res.status(201).send(data);
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
    console.log(`Blog creation process completed.`);
  }
};

// Funzione per aggiornare un author esistente nel database e inviare il risultato dell'aggiornamento come risposta
module.exports.updateBlog = async (req, res, next) => {
  const id = req.params;
  const blog = req.body;
  try {
    // Aggiorna il author nel database utilizzando l'ID fornito e i dati del author
    const updatedBlog = await BlogModel.findByIdAndUpdate(id, blog, {
      new: true,
    });
    if (!updatedBlog) {
      // Se l'autore non è stato trovato, restituisci un messaggio di errore
      return res.status(404).send("Author not found");
    }
    // Invia una conferma di aggiornamento come risposta
    res.send("Updated successfully, blog: " + JSON.stringify(updatedBlog));
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
    console.log(`Blog with id: ${id} update process completed.`);
  }
};

// Funzione per eliminare un author esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Elimina il author dal database utilizzando l'ID fornito
    await BlogModel.findByIdAndDelete(id);
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
    console.log(`Blog with id: ${id} deletion process completed.`);
  }
};
