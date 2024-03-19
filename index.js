const express = require("express");
const app = express();
const path = require('path');
const axios = require('axios');
const https = require('https');
import teste from 'node-fetch';

// Configuração para servir arquivos estáticos (como o index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal ('/')
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(express.json());

const gamesRouter = require('./routes/games.router')

app.use("/api/lottery-results/", gamesRouter);

const cron = require('./routes/jobs.router');

app.use("/api/cron", cron);


app.get('/testeAPICAIXA', async (_req, res) => {
    try {
        const response = await teste('https://servicebus2.caixa.gov.br/portaldeloterias/api/quina/3049');
        if (!response.ok) {
          throw new Error('Erro ao acessar a API');
        }
        const data = await response.json();
        res.json(data);
      } catch (error) {
        console.error('Erro ao acessar a API:', error);
        res.status(500).json({ error: 'Erro ao acessar a API' });
      }
  });



app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

