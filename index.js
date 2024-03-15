const express = require("express");
const app = express();
const path = require('path');

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

app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));

//teste
// Definindo a URL da API
const apiUrl = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/3050';

// Fazendo a solicitação GET usando o método fetch
fetch(apiUrl)
  .then(response => {
    // Verificando se a resposta da solicitação é bem-sucedida (status 200)
    if (response.ok) {
      // Convertendo a resposta para JSON
      return response.json();
    }
    // Caso contrário, lançando um erro
    throw new Error('Erro ao fazer a solicitação GET');
  })
  .then(data => {
    // Manipulando os dados obtidos da API
    console.log('Dados recebidos:', data);
  })
  .catch(error => {
    // Capturando e tratando erros
    console.error('Ocorreu um erro:', error);
  });



