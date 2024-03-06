const express = require('express');
const cron = require('./controllers/cron.js');
const bodyParser = require('body-parser');

// Importa a classe Games
const Games = require('./games');
const StatisticalGame = require('./statisticalGame');
const Informations = require('./informations');

const app = express();
const port = 8000;

// Middleware para analisar o corpo das requisições como JSON
app.use(bodyParser.json());

// Main Route
app.get('/', (_req, res) => {  
  res.status(200).json('Welcome, your app is working well');
});

//Info Route
app.get('/info', (_req, res) => {
  const info = new Informations();
  const data = info.getInformations();
  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Informations not found' });
  }  
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

// Games's Route
app.get('/games', (req, res) => {
  const games = new Games().getAllGames();
  if (games) {
    res.json(games);
  } else {
    res.status(404).json({ error: 'Games not found' });
  }
});

// Games's Route
app.get('/games/:name', (req, res) => {
  const games = new Games();
  const game = games.getGame(req.params.name);
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
});

app.get('/statisticalData', (req, res) => {  
  res.status(200).json('The statistical data, your app is working well');
});

// Statistical Data Route
app.get('/statisticalData/:name', (req, res) => {  
  const statistica = new StatisticalGame(req.params.name);
  const statisticaDataGame = statistica.getStatistical();

  if (statisticaDataGame) {
    res.json(statisticaDataGame);
  } else {
    res.status(404).json({ error: 'Statistica Data Game not found' });
  }

});

///job
app.use('/cron/:name', cron);
