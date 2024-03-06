const axios = require('axios');
const https = require('https');
const Games = require('./games');

const calculeStatistica = require('./statisticalData');
const apiURL = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/';

class StatisticalGame {

    constructor(name) {
        this.name = name
    }

    getStatistical() {
        const data = this.getDataGame();
        const games = new Games();        
        return calculeStatistica.calculateStatisticalData(data, games.getGame(this.name));
    }

    getDataGame() {
        if (this.name == 'lotoFacil') {
            return require('./data-files/lotoFacil.json');
        }
        if (this.name == 'megaSena') {
            return require('./data-files/megaSena.json');
        }

        if (this.name == 'quina') {
            return require('./data-files/quina.json');
        }
        return {};
    }

    setDataGame(data) {
        let scores = [];
        data.listaDezenas.forEach((numero) => {
            scores.push(Number(numero));
        });

        const newGame = {
            "drawn": data.numero,
            "date": data.dataApuracao,
            "scores": scores
        };

        this.writeFile(newGame);
        //update datas games
        //call setGame
        const games = new Games();
        const game = games.getGame(this.name);
        game.date = data.dataApuracao;
        game.lastDraw = data.numero;
        game.nextDraw = data.numeroConcursoProximo;
        game.dateNextDraw = data.dataProximoConcurso;
        games.setGame(this.name, game);
    }

    async getApiData() {
        let gameAPIUrl = `${apiURL}${this.name.toLowerCase()}/`;
        const games = new Games();
        const game = games.getGame(this.name);
        if (this.compareDate(game.dateNextDraw)) {
            gameAPIUrl += `${game.nextDraw}`;            
            const data = await this.madeRequest(gameAPIUrl);
            if (data) {
                this.setDataGame(data);
            }
            return true;
        }
        return false;
    }

    async madeRequest(url) {
        try {
            const agent = new https.Agent({
                rejectUnauthorized: false, // Configuração para aceitar certificados não confiáveis
            });
            const resposta = await axios.get(url, { httpsAgent: agent });
            return resposta.data;
        } catch (erro) {
            console.error('Error in the made request:', `${erro.message} ${url}`);
            return false;
        }
    }

    compareDate(data) {
        if (data && data != '') {
            // Convertendo as strings de data para objetos Date
            const dataConcurso = new Date(this.formateDate(data));
            const dataAtual = new Date(this.getDate());            
            return dataAtual > dataConcurso;
        }
        return true;
    }

    getDate() {
        const dataAtual = new Date();
        const dia = dataAtual.getDate();
        const mes = dataAtual.getMonth() + 1; // Lembrando que os meses são indexados de 0 a 11
        const ano = dataAtual.getFullYear();

        // Formatando para o formato "YYYY-MM-DD"
        const dataFormatada = `${ano}-${mes}-${dia}`;
        return dataFormatada;
    }

    formateDate(date){
        const partsDate = date.split("/");
        return partsDate[2] + "-" + partsDate[1] + "-" + partsDate[0];
    }

    writeFile(newGame) {
        //reescrever o arquivo json 
        const fs = require("fs");
        let data = this.getDataGame();
        if (data) {
            data.unshift(newGame);
            fs.writeFile(`./data-files/${this.name}.json`, JSON.stringify(data), err => {
                // Checking for errors
                if (err) throw err;
                console.log(`Done writing in the games of ${this.name}`); // Success
            });
        }
    }

}

// Export the object
module.exports = StatisticalGame;