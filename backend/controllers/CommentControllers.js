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
module.exports.getCommentDetails = async (req, res, next) => {
  const { id, commentId } = req.params;
  try {
    // Esegui la query al database per trovare il commento specifico utilizzando l'ID del post e l'ID del commento
    const comment = await CommentModel.findOne({
      _id: commentId,
      postId: id,
    }).populate("author");

    if (!comment) {
      // Se il commento non è stato trovato, restituisci uno stato 404
      return res.status(404).json({ error: "Comment not found" });
    }

    // Invia i dettagli del commento come risposta
    res.json(comment);
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).json({ error: "Something went wrong" });
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
  const { id, commentId } = req.params; // Ottieni l'ID del post e l'ID del commento dai parametri della richiesta
  const newData = req.body; // Nuovi dati del commento da aggiornare

  try {
    // Aggiorna il commento nel database utilizzando l'ID fornito e i nuovi dati del commento
    const updatedComment = await CommentModel.findOneAndUpdate(
      { _id: commentId, postId: id }, // Filtra il commento per ID del post e ID del commento
      newData, // Nuovi dati da aggiornare
      { new: true } // Opzione per restituire il documento aggiornato
    );

    if (!updatedComment) {
      // Se il commento non è stato trovato, restituisci uno stato 404
      return res.status(404).json({ error: "Comment not found" });
    }

    // Invia il commento aggiornato come risposta
    res.json(updatedComment);
  } catch (error) {
    // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
    console.error(error.message);
    res.status(500).json({ error: "Something went wrong" });
    // Passa l'errore al middleware successivo
    next(error);
  }
};

// Funzione per eliminare un commento esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteComment = async (req, res, next) => {
  const { id, commentId } = req.params;
  try {
    // Elimina il commento dal database utilizzando l'ID del post e l'ID del commento forniti
    const deletedComment = await CommentModel.findOneAndDelete({
      _id: commentId,
      postId: id,
    });

    if (!deletedComment) {
      // Se il commento non è stato trovato, restituisci uno stato 404
      return res.status(404).json({ error: "Comment not found" });
    }

    // Invia una conferma di eliminazione come risposta
    res.send(`Comment with id ${commentId} deleted successfully.`);
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
