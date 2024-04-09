// Importa il modello del blog per interagire con il database
const BlogModel = require("../models/BlogModel");

// Funzione asincrona per ottenere tutti i blog dal database e inviarli come risposta
module.exports.getBlogs = async (req, res) => {
    try {
        // Utilizza il metodo `find` del modello Blog per recuperare tutti i blog dal database
        const blog = await BlogModel.find();
        // Invia la lista dei blog come risposta
        res.send(blog);
    } catch (error) {
        // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
        console.error(error.message);
        res.status(500).send({ error: error.message, msg: "Something went wrong!" });
    }
}

// Funzione asincrona per ottenere i dettagli di un blog specifico in base all'ID e inviarli come risposta
module.exports.detailBlogs = async (req, res) => {
    const { id } = req.params;
    try {
        // Utilizza il metodo `findById` del modello Blog per recuperare un blog specifico dal database
        const blog = await BlogModel.findById(id);
        // Invia i dettagli del blog come risposta
        res.send(blog);
    } catch (error) {
        // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
        console.error(error.message);
        res.status(500).send({ error: error.message, msg: "Something went wrong!" });
    }
};

// Funzione per salvare un nuovo blog nel database e inviare il risultato della creazione come risposta
module.exports.saveBlogs = (req, res) => {
    const blog = req.body;
    // Utilizza il metodo `create` del modello Blog per salvare un nuovo blog nel database
    BlogModel.create(blog)
        .then((data) => {
            // Invia il risultato della creazione come risposta con stato 201
            console.log("Saved successfully");
            res.status(201).send(data);
        })
        .catch((error) => {
            // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
            console.error(error.message);
            res.status(500).send({ error: error.message, msg: "Something went wrong!" });
        });
}

// Funzione per aggiornare un blog esistente nel database e inviare il risultato dell'aggiornamento come risposta
module.exports.updateBlogs = (req, res) => {
    const { id } = req.params;
    const { blog } = req.body;
    // Utilizza il metodo `findByIdAndUpdate` del modello Blog per aggiornare un blog esistente nel database
    BlogModel.findByIdAndUpdate(id, {blog})
        .then(() => res.send("Updated successfully"))
        .catch((error) => {
            // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
            console.error(error.message);
            res.status(500).send({ error: error.message, msg: "Something went wrong!" });
        });
}

// Funzione per eliminare un blog esistente dal database e inviare il risultato dell'eliminazione come risposta
module.exports.deleteBlogs = (req, res) => {
    const { id } = req.params;
    // Utilizza il metodo `findByIdAndDelete` del modello Blog per eliminare un blog esistente nel database
    BlogModel.findByIdAndDelete(id)
        .then(() => res.send("Deleted successfully"))
        .catch((error) => {
            // Gestisce gli errori inviando un messaggio di errore e uno stato 500 al client
            console.error(error.message);
            res.status(500).send({ error: error.message, msg: "Something went wrong!" });
        });
}
