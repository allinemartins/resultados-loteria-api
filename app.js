const express = require('express');
const bodyParser = require('body-parser');
const porta = 8000;
const objetos = require('./objetos.js');

const app = express();
app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})


app.get('/numeros', function (req, res) {
    res.send(JSON.stringify(objetos.getObjetos()));
});

app.listen(porta, function () {
  console.log('Servidor rodando na porta 8000.');
});

