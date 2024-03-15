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

const CronJob = require('cron').CronJob;

// Função para ser executada pelo cron job
function minhaFuncaoCron() {
    console.log('Esta função é executada pelo cron job.');
}

// Definindo o cron job para ser executado a cada minuto
const job = new CronJob('*/1 * * * *', minhaFuncaoCron);

// Iniciando o cron job
job.start();

console.log('Cron job iniciado.');

// Mantendo o processo em execução
setInterval(() => {
    console.log('O servidor está ativo.');
}, 60000); // Log a cada minuto para manter o servidor ativo
