const express = require("express");
const app = express();
const path = require('path');
const cronNode = require('node-cron');

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

cronNode.schedule('* 20 * * *', async () => {
    console.log('Tarefa cron sendo iniciada');
    const data = await getData();
    console.log(data);
    console.log(`Tarefa cron finalizada`);
});

async function getData() {
    const url = "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/3045";
    try {
        const resposta = await getApiURL(url);        
        return resposta;            
    } catch (erro) {
        console.error('Error in the made request:', `${erro.message} ${url}`);
        return false;
    }
}

const axios = require('axios');

function getApiURL(apiUrl) {
    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}
