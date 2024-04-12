---test

# Blog API

## Introduzione

L'API del Blog è un servizio RESTful che consente di gestire operazioni CRUD (Create, Read, Update, Delete) su blog.

## Requisiti

- Express
- Mongoose
- Cors
- Nodemon
- Dotenv

## Installazione

1. Clonare il repository:

   ```bash
   git clone https://github.com/CodeKaito/epicode-api.git
   ```

2. Installare le dipendenze:

   ```bash
   cd backend
   npm install
   ```

3. Creare un file `.env` nella root del progetto e specificare le variabili d'ambiente:

   ```plaintext
   PORT=5000
   MONGO_URI=<URI_del_database_MongoDB>
   ```

4. Avviare il server:

   ```bash
   npm run dev
   ```

## Utilizzo

L'API fornisce le seguenti route:

- `GET /api/authors`: Ottiene tutti gli authors.
- `GET /api/authors/:id`: Ottiene i dettagli di un author specifico in base all'ID.
- `POST /api/authors`: Salva un nuovo author.
- `PUT /api/authors/:id`: Aggiorna un author esistente in base all'ID.
- `DELETE /api/authors/:id`: Elimina un author esistente in base all'ID.

- `GET /api/blogPosts`: Ottiene tutti gli authors.
- `GET /api/blogPosts/:id`: Ottiene i dettagli di un author specifico in base all'ID.
- `POST /api/blogPosts`: Salva un nuovo author.
- `PUT /api/blogPosts/:id`: Aggiorna un author esistente in base all'ID.
- `DELETE /api/blogPosts/:id`: Elimina un author esistente in base all'ID.

### Ottieni tutti i blog

```bash
curl http://localhost:5000/api/blogPosts
```

### Ottieni i dettagli di un blog specifico

```bash
curl http://localhost:5000/api/blogPosts/<id_del_blog>
```

### Salva un nuovo blog

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"John","surname":"Doe","email":"john@example.com","birth":"1990-01-01","avatar":"avatar.jpg"}' http://localhost:5000/api/authors
```

### Aggiorna un blog esistente

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name":"John","surname":"Doe","email":"john.doe@example.com","birth":"1990-01-01","avatar":"avatar.jpg"}' http://localhost:5000/api/authors/<id_del_autore>
```

### Elimina un blog esistente

```bash
curl -X DELETE http://localhost:5000/api/authors/<id_del_autore>
```

## Contribuire

Le pull request sono benvenute. Per modifiche importanti, si prega di aprire prima un'issue per discutere delle modifiche proposte.

## Licenza

Questo progetto è distribuito sotto la licenza MIT. Consultare il file [LICENSE](LICENSE) per ulteriori informazioni.

---