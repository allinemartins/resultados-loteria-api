const gamesModel = require('./../models/games.model');
const ApiCaixa = require('./apiCaixa.services');
const StatisticalData = require('./statistical.services');
const commons = require('./../commons');
const cm = new commons();

class GamesServices {

    async getDraws() {
        const { data } = await gamesModel.getAllGames();
        if (data && data.length > 0) {
            for (const game of data) {
                if (game.next_draw && cm.compareDate(game.date_next_draw)) {
                    const draw = await this.getDataApi(game);                       
                    if (draw) {
                        console.log(draw);
                        /*const insert = await this.insertDraw(draw, game.game_id);
                        if (insert && insert.msg === "OK") {
                            console.log(`Insert draw: ${insert.msg}`);
                            const update = await this.updateGame(draw, game.game_id);
                            console.log(`Update game: ${update.msg}`);
                        }*/
                    } else {
                        console.log('Not do request');
                    }
                }
            }
        }
        return { msg: "OK" }
    }

    async getDataApi(game) {
        const api = new ApiCaixa(game.name, game.next_draw, game.date_next_draw);
        return api.getData();
    }

    async insertDraw(data, idGame) {
        const draw = {
            "draw": data.numero,
            "date": data.dataApuracao,
            "scores": data.listaDezenas
        }
        console.log(draw);
        const insert = await gamesModel.insertDataGameDraw(draw, idGame);
        return insert;
    }

    async updateGame(data, idGame) {
        const draw = {
            "last_draw": data.numero,
            "next_draw": data.numeroConcursoProximo,
            "date_last_draw": data.dataApuracao,
            "date_next_draw": data.dataProximoConcurso
        }
        const update = await gamesModel.updateDataGame(draw, idGame);
        return update;
    }

    async getStatistical() {
        const { data } = await gamesModel.getAllGames();
        if (data && data.length > 0) {
            for (const game of data) {
                const draws = await gamesModel.getAllGameDraws(game.name);
                if (draws.data && draws.data.length > 0) {
                    const statistical = new StatisticalData(game, draws.data);
                    const statisticalData = statistical.calculateStatisticalData();
                    const insert = await this.insertStatistical(statisticalData, game.game_id);
                    if (insert && insert.msg === "OK") {
                        console.log(`Insert statistical: ${insert.msg}`);
                    }else{
                        const update = await this.updateStatistical(statisticalData, game.game_id);
                        console.log(`Update statistical: ${update.msg}`);
                    }
                }
            }
        }
        return { msg: "OK" }
    }

    async insertStatistical(statisticalData, idGame) {
        const insert = await gamesModel.insertStatisticalGame(statisticalData, idGame);
        return insert;
    }

    async updateStatistical(statisticalData, idGame) {
        const update = await gamesModel.updateStatisticalGame(statisticalData, idGame);
        return update;
    }
}

module.exports = GamesServices;
