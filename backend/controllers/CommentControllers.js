const CommentModel = require("../models/CommentModel");

// Funzione asincrona per ottenere tutti i commenti dal database e inviarli come risposta
module.exports.getComments = async (req, res, next) => {
  const { id } = req.params; // Ottieni l'ID del post dai parametri della richiesta

  try {
    // Esegui la query al database per trovare tutti i commenti con postId uguale all'ID del post
    const comments = await CommentModel.find({ postId: id }).populate("author");

    // Invia la lista dei commenti come risposta
    res.send(comments);
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
  }
};

// Funzione asincrona per ottenere tutti i commenti relativi a un post specifico e inviarli come risposta
module.exports.getCommentsByPostId = async (req, res, next) => {
  const { postId, commentId } = req.params;
  try {
    // Esegui la query al database per trovare tutti i commenti relativi a un post specifico
    const comments = await CommentModel.find({
      postId,
      _id: commentId,
    }).populate("author");

    // Invia la lista dei commenti come risposta
    res.send(comments);
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
  }
};

// Funzione asincrona per salvare un nuovo commento nel database e inviarlo come risposta
module.exports.saveComment = async (req, res, next) => {
  try {
    const commentData = req.body;
    // Crea un nuovo commento nel database utilizzando i dati forniti
    const comment = await CommentModel.create(commentData);
    // Invia il nuovo commento creato come risposta con stato 201
    res.status(201).send({
      message: "Comment created successfully",
      commentId: comment._id,
    });
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
  }
};

// Funzione per aggiornare un commento esistente nel database e inviare il risultato dell'aggiornamento come risposta
module.exports.updateComment = async (req, res, next) => {
  const { id } = req.params;
  const newData = req.body;
  try {
    // Aggiorna il commento nel database utilizzando l'ID fornito e i nuovi dati del commento
    const updatedComment = await CommentModel.findByIdAndUpdate(id, newData, {
      new: true,
    });
    if (!updatedComment) {
      // Se il commento non è stato trovato, restituisci un messaggio di errore
      return res.status(404).send("Comment not found");
    }
    // Invia una conferma di aggiornamento come risposta
    res.send(updatedComment);
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
  }
};

// Funzione per eliminare un commento esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteComment = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Elimina il commento dal database utilizzando l'ID fornito
    await CommentModel.findByIdAndDelete(id);
    // Invia una conferma di eliminazione come risposta
    res.send(`Comment with id ${id} deleted successfully.`);
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
  }
};
