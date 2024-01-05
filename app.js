//importando o fetch
const fetch = require('node-fetch');
const https = require('https');

// Ignorar a validação do certificado (não recomendado para produção)
const insecureAgent = new https.Agent({ rejectUnauthorized: false });

const express = require('express');
const bodyParser = require('body-parser');
const porta = 8000;

const app = express();
app.use(bodyParser.json());

//reescrever o arquivo json 
const fs = require("fs");

//referencias jsons
let jogosLotoFacil = require('./lotofacil.json');
let jogos = require('./jogos.json');
let dadosEstatisticosLotoFacil = require('./estatisticas-lotofacil.json');

let calculoEstatisticos = require('./calculoEstatisticos.js');

app.get('/', (req, res) => {
  res.status(200).json('Welcome, your app is working well');
})

app.get('/jogos-lotofacil', function (req, res) {
  //implementar logica para verificar se a data atual condiz que ha outros jogos para serem verificados
  verificaDataUltimoSorteio();
  res.send(JSON.stringify(jogosLotoFacil));
});

app.get('/estatisticas-lotofacil', function (req, res) {
  //implementar logica para verificar se a data atual condiz que ha outros jogos para serem verificados
  //verificaDataUltimoSorteio();

  /*let recalculo = calculoEstatisticos.calcularDadosEstatisticos(jogosLotoFacil, dadosEstatisticosLotoFacil);
  fs.writeFile("estatisticas-lotofacil.json", JSON.stringify(recalculo), err => {
    // Checking for errors
    if (err) throw err;
    console.log("Done writing in the estatisticas"); // Success
  });*/

  res.send(JSON.stringify(dadosEstatisticosLotoFacil));
});

app.listen(porta, function () {
  console.log('Servidor rodando na porta 8000.');
});

function verificaDataUltimoSorteio() {
  let apiUrl = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/';
  let controle = true;

  while (controle) {
    const jogo = jogos['lotoFacil'];

    if (compararDatas(jogo.dataProximoConcurso)) {
      apiUrl += `${jogo.proximoConcurso}`;
      
      fetch(apiUrl, {
        agent: insecureAgent
      })
        .then(response => {
          // Verifica se a resposta da requisição está OK (código 200)
          if (!response.ok) {
            throw new Error('Erro ao acessar a API: ' + response.status);
          }
          // Converte a resposta para JSON
          return response.json();
        })
        .then(data => {
          // Manipula os dados recebidos da API          
          // Faça o que precisar com os dados aqui

          jogo.ultimoConcurso = data.numero;
          jogo.data = data.dataApuracao;
          jogo.proximoConcurso = data.numeroConcursoProximo;
          jogo.dataProximoConcurso = data.dataProximoConcurso;
          jogos['lotoFacil'] = jogo;

          let dezenas = [];
          data.listaDezenas.forEach((numero) => {
            dezenas.push(Number(numero));
          })

          const newJogo = {
            "concurso": jogo.ultimoConcurso,
            "data": jogo.data,
            "dezenas": dezenas
          };

          jogosLotoFacil.unshift(newJogo);
          
          fs.writeFile("lotofacil.json", JSON.stringify(jogosLotoFacil), err => {
            // Checking for errors
            if (err) throw err;
            console.log("Done writing in the games of lotofacil"); // Success
          });

          fs.writeFile("jogos.json", JSON.stringify(jogos), err => {
            // Checking for errors
            if (err) throw err;
            console.log("Done writing in the games"); // Success
          });
          console.log('Show na requisição:');

        })
        .catch(error => {
          // Caso ocorra algum erro na requisição
          console.error('Erro na requisição:', error);
        });
    }
    controle = false;
  }
}

function compararDatas(data) {  
  // Convertendo as strings de data para objetos Date
  const dataConcurso = new Date(data);
  const dataAtual = new Date(getDataAtual());
  return dataAtual > dataConcurso;

}

function getDataAtual() {
  const dataAtual = new Date();
  const dia = dataAtual.getDate();
  const mes = dataAtual.getMonth() + 1; // Lembrando que os meses são indexados de 0 a 11
  const ano = dataAtual.getFullYear();

  // Formatando para o formato 'DD/MM/AAAA'
  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}
