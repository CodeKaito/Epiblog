const express = require('express');

const mongoose = require('mongoose');
require('dotenv').config();

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to Mongodb'))
    .catch((err) => console.log(err));

const routes = require('./routes/BlogRoute');

app.use("/", routes);

app.get("/codekaito", (req, res) => {
    res.send('Hello from Codekaito!');
})

app.get("/test", (req, res) => {
    res.send('If you get this message, your API ENDPOINT is working!');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});