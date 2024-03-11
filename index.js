const express = require("express");
const app = express();
const path = require('path');

require('dotenv').config();

// Configuração para servir arquivos estáticos (como o index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());

const gamesRouter = require('./routes/games.router')

app.use("/api/lottery-results/games", gamesRouter);

const cron = require('./api/cron/route');

app.use("api/cron", cron);

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));