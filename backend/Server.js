const express = require('express'); // Importa il framework Express per gestire le richieste HTTP
const mongoose = require('mongoose'); // Importa il modulo mongoose per interagire con il database MongoDB
const cors = require('cors'); // Importa il modulo cors per interagire con il frontend
const fs = require('fs'); // Importa il modulo fs per la lettura dei file

require('dotenv').config(); // Configurazione dotenv per caricare le variabili d'ambiente

const AuthorRoutes = require('./routes/AuthorRoute'); // Importa le route necessarie per le chiamate HTTP degli autori
const BlogRoutes = require('./routes/BlogRoute'); // Importa le route necessarie per le chiamate HTTP dei post blog

const PORT = process.env.PORT || 5001; // Imposta la porta del server di default a 5000, se la 5000non é disponibile allora utilizza la 5001
const db = process.env.MONGO_URI; // Imposto una costante dove inserisco l'endpoint del mongodb

const app = express(); // Crea un'app Express
app.use(express.json()); // Middleware per il parsing del corpo della richiesta come JSON
app.use(cors()); // Middleware per abilitare le richieste da diversi domini

// Connessione al database MongoDB utilizzando la variabile d'ambiente MONGO_URI di .env
// mongoose
//     .connect(process.env.MONGO_URI)
//     .then(() => console.log('Connected to Mongodb')) // Messaggio di connessione riuscita
//     .catch((err) => console.log(err)); // Gestione degli errori di connessione al database

const startServer = async() => {
    try {
        await mongoose.connect(db); // Connessione con il database
        // Avvio del server sulla porta specificata
        app.listen(PORT, () => {
            console.log(`Connected to MongoDB & listening on port ${PORT}`); // Consollogga la porta del server per il quale é in ascolto,
        });
        
    } catch (error) {
        console.error('Error connecting to MongoDB:', error); // Gestione degli errori di connessione al database
    }
}

startServer();

app.use("/api", AuthorRoutes); // Utilizza le route definite nel file AuthorRoute per gli endpoint API
app.use("/api", BlogRoutes); // Utilizza le route definite nel file BlogRoute per gli endpoint API dei post del blog

// Route di base per controllare se il server è attivo
app.get("/", (req, res) => {
    // Leggi il file HTML e invialo come risposta
    fs.readFile('./pages/Server.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data); // Invia il contenuto del file HTML come risposta
        }
    });
});

app.get("/*", (req, res) => {
    // Leggi il file HTML e invialo come risposta
    fs.readFile('./pages/Error.html', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data); // Invia il contenuto del file HTML come risposta
        }
    });
});
