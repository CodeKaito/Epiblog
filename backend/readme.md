---

# Blog API

## Introduzione

L'API del Blog è un servizio RESTful che consente di gestire operazioni CRUD (Create, Read, Update, Delete) su blog.

## Requisiti

- Node.js
- MongoDB
- Axios

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

- `GET /api/get`: Ottiene tutti i blog.
- `GET /api/get/:id`: Ottiene i dettagli di un blog specifico in base all'ID.
- `POST /api/save`: Salva un nuovo blog.
- `PUT /api/update/:id`: Aggiorna un blog esistente in base all'ID.
- `DELETE /api/delete/:id`: Elimina un blog esistente in base all'ID.

## Esempi

### Ottieni tutti i blog

```bash
curl http://localhost:5000/api/get
```

### Ottieni i dettagli di un blog specifico

```bash
curl http://localhost:5000/api/get/<id_del_blog>
```

### Salva un nuovo blog

```bash
curl -X POST -H "Content-Type: application/json" -d '{"name":"John","surname":"Doe","email":"john@example.com","birth":"1990-01-01","avatar":"avatar.jpg"}' http://localhost:5000/api/save
```

### Aggiorna un blog esistente

```bash
curl -X PUT -H "Content-Type: application/json" -d '{"name":"John","surname":"Doe","email":"john.doe@example.com","birth":"1990-01-01","avatar":"avatar.jpg"}' http://localhost:5000/api/update/<id_del_blog>
```

### Elimina un blog esistente

```bash
curl -X DELETE http://localhost:5000/api/delete/<id_del_blog>
```

## Contribuire

Le pull request sono benvenute. Per modifiche importanti, si prega di aprire prima un'issue per discutere delle modifiche proposte.

## Licenza

Questo progetto è distribuito sotto la licenza MIT. Consultare il file [LICENSE](LICENSE) per ulteriori informazioni.

---