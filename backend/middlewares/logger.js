const logger = (req, res, next) => { // Creazione di un middleware con nome e corpo dei parametri
	// Stampare in console le richieste effettuate sugli endpoint, se ha fatto una chiamata
	console.log(
		`[${new Date().toLocaleString()}] ${req.method} ${req.originalUrl}`
	);
    
    // Stampare anche l'header "User-Agent" che fornisce informazioni sul browser o sul client che ha effettuato la richiesta
	console.log(`User-Agent: ${req.headers['user-agent']}`);
	
	// Se ci sono parametri nella query string, stamparli
	if (Object.keys(req.query).length > 0) {
		console.log('Query parameters:', req.query);
	}
	
	// Se ci sono dati inviati nel corpo della richiesta (ad esempio, in caso di richieste POST), stamparli
	if (Object.keys(req.body).length > 0) {
		console.log('Request body:', req.body);
	}
	
	next(); // Continua anche se trovi errori
}

module.exports = logger;