// Importa il modello del blog per interagire con il database
const BlogModel = require("../models/BlogModel");

// Funzione asincrona per ottenere tutti i blog dal database e inviarli come risposta
module.exports.getBlogs = async (req, res, next) => {
    try {
        // Recupera tutti i blog dal database utilizzando il modello Blog
        const blog = await BlogModel.find();
        // Invia la lista dei blog come risposta
        res.send(blog);
    } catch (error) {
        // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        // Passa l'errore al middleware successivo
        next(error);
    } finally {
        // Stampa a console il completamento del processo di recupero dei blog
        console.log('Blogs retrieval process completed.');
    }
}

// Funzione asincrona per ottenere i dettagli di un blog specifico in base all'ID e inviarli come risposta
module.exports.detailBlogs = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Cerca il blog nel database utilizzando l'ID fornito
        const blog = await BlogModel.findById(id);
        // Invia i dettagli del blog come risposta
        res.send(blog);
    } catch (error) {
        // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        // Passa l'errore al middleware successivo
        next(error);
    } finally {
        // Stampa a console il completamento del processo di recupero dei dettagli del blog
        console.log(`Blog with id: ${id} details retrieval process completed.`);
    }
};

// Funzione per salvare un nuovo blog nel database e inviare il risultato della creazione come risposta
module.exports.saveBlogs = async (req, res, next) => {
    try {
        const blog = req.body;
        // Crea un nuovo blog nel database utilizzando i dati forniti
        const data = await BlogModel.create(blog);
        // Invia il nuovo blog creato come risposta con stato 201
        console.log("Saved successfully, item: " + JSON.stringify(data));
        res.status(201).send(data);
    } catch (error) {
        // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        // Passa l'errore al middleware successivo
        next(error);
    } finally {
        // Stampa a console il completamento del processo di creazione del blog
        console.log(`Blog creation process completed.`);
    }
}

// Funzione per aggiornare un blog esistente nel database e inviare il risultato dell'aggiornamento come risposta
module.exports.updateBlogs = async (req, res, next) => {
    const { id } = req.params;
    const { blog } = req.body;
    try {
        // Aggiorna il blog nel database utilizzando l'ID fornito e i dati del blog
        await BlogModel.findByIdAndUpdate(id, {blog});
        // Invia una conferma di aggiornamento come risposta
        res.send("Updated successfully, item: " + JSON.stringify(id));
    } catch (error) {
        // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        // Passa l'errore al middleware successivo
        next(error);
    } finally {
        // Stampa a console il completamento del processo di aggiornamento del blog
        console.log(`Blog with id: ${id} update process completed.`);
    }
}

// Funzione per eliminare un blog esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteBlogs = async (req, res, next) => {
    const { id } = req.params;
    try {
        // Elimina il blog dal database utilizzando l'ID fornito
        await BlogModel.findByIdAndDelete(id);
        // Invia una conferma di eliminazione come risposta
        res.send("Deleted successfully, item: " + JSON.stringify(id));
    } catch (error) {
        // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        // Passa l'errore al middleware successivo
        next(error);
    } finally {
        // Stampa a console il completamento del processo di eliminazione del blog
        console.log(`Blog with id: ${id} deletion process completed.`);
    }
}
