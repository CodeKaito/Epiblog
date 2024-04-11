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

// Funzione asincrona per ottenere tutti i blog dal database e inviarli come risposta
module.exports.getBlogsPaginations = async (req, res, next) => {

    // http://localhost:3001/api/pagination?page=1  
    const pageQuery = req.query.page || 0;

    // Quanti documenti vogliamo mostrare per ogni pagina
    const itemsPerPage = 2;
    try {
        // 1. Trovami tutti gli utenti
        // 2. Salta in base a (itemsPerPage * pageQuery)
        // 3. Limita i documenti ricevuti a itemsPerPage

        const blog = await BlogModel
        .find()
        .skip(itemsPerPage * pageQuery) // Skippa il primo se metti 1, skippa il primo e il secondo se metti 2
        .limit(itemsPerPage); // Ti mostra solo 2 oggetti

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

// Funzione asincrona per ottenere tutti i blog dal database e inviarli come risposta
module.exports.getBlogsPaginationOrders = async (req, res, next) => {
    let orderParam = parseInt(req.params.order);
    try {
        // Recupera tutti i blog dal database utilizzando il modello Blog
        const blog = await BlogModel
        .find() // Effettua una ricerca
        .sort({ // Effettua un sorting degli oggetti
            name: orderParam !== -1 && orderParam !== 1 ? 1 : orderParam,
        }) 
        .skip(1) // Skippa il primo se metti 1, skippa il primo e il secondo se metti 2
        .limit(2); // Ti mostra solo 2 oggetti

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
    try {
        // Estrai i dati aggiornati dalla richiesta
        const updatedBlogData = req.body;
        // Aggiorna il blog nel database utilizzando l'ID fornito e i dati del blog
        const updatedBlog = await BlogModel.findByIdAndUpdate(id, updatedBlogData, {
            new: true, // L'oggetto restituito deve essere quello aggiornato
        });
        // Invia una conferma di aggiornamento come risposta
        res.send("Updated successfully, item: " + JSON.stringify(updatedBlog));
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
