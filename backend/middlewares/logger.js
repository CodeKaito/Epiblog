const logger = (req, res, next) => { // Creazione di un middleware con nome e corpo dei parametri
	// Stampare in console le richieste effettuate sugli endpoint, se ha fatto una chiamata
	console.log(
		`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`
	);
    
    // Stampare anche l'header "User-Agent" che fornisce informazioni sul browser o sul client che ha effettuato la richiesta
	console.log(`User-Agent: ${req.headers['user-agent']}`);
	
	next(); // Continua anche se trovi errori
}

module.exports = logger;