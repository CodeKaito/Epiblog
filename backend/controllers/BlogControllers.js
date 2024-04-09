// Importa il modello del blog per interagire con il database
const BlogModel = require("../models/BlogModel");

// Funzione asincrona per ottenere tutti i blog dal database e inviarli come risposta
module.exports.getBlogs = async (req, res, next) => {
    try {
        const blog = await BlogModel.find();
        res.send(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        next(error);
    } finally {
        console.log('Blogs retrieval process completed.');
    }
}

// Funzione asincrona per ottenere i dettagli di un blog specifico in base all'ID e inviarli come risposta
module.exports.detailBlogs = async (req, res, next) => {
    const { id } = req.params;
    try {
        const blog = await BlogModel.findById(id);
        res.send(blog);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        next(error);
    } finally {
        console.log('Blog details retrieval process completed.');
    }
};

// Funzione per salvare un nuovo blog nel database e inviare il risultato della creazione come risposta
module.exports.saveBlogs = async (req, res, next) => {
    try {
        const blog = req.body;
        const data = await BlogModel.create(blog);
        console.log("Saved successfully, item: " + JSON.stringify(data));
        res.status(201).send(data);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        next(error);
    } finally {
        console.log('Blog saving process completed.');
    }
}

// Funzione per aggiornare un blog esistente nel database e inviare il risultato dell'aggiornamento come risposta
module.exports.updateBlogs = async (req, res, next) => {
    const { id } = req.params;
    const { blog } = req.body;
    try {
        await BlogModel.findByIdAndUpdate(id, {blog});
        res.send("Updated successfully, item: " + JSON.stringify(id));
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        next(error);
    } finally {
        console.log('Blog update process completed.');
    }
}

// Funzione per eliminare un blog esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteBlogs = async (req, res, next) => {
    const { id } = req.params;
    try {
        await BlogModel.findByIdAndDelete(id);
        res.send("Deleted successfully, item: " + JSON.stringify(id));
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ error: error.message, stack: error.stack, msg: "Something went wrong!" });
        next(error);
    } finally {
        console.log('Blog deletion process completed.');
    }
}
