const gamesModel = require('./../models/games.model');
const ApiCaixa = require('./apiCaixa.services');
const commons = require('./../commons');
const cm = new commons();

class GamesServices {

    async getDraws() {
        const { data } = await gamesModel.getAllGames();
        if (data && data.length > 0) {
            for (const game of data) {
                if (game.next_draw && cm.compareDate(game.date_next_draw)) {
                    const draw = await this.getDataApi(game);
                    if(draw){
                        const insert = await this.insertDraw(draw, game.game_id);
                        if (insert && insert.msg === "OK") {
                            console.log(`Insert draw: ${insert.msg}`);
                            const update = await this.updateGame(draw, game.game_id);
                            console.log(`Update game: ${update.msg}`);
                        }
                    }else{
                        console.log('Not do request');
                    }
                }
            }
        }
        return { msg: "OK" }
    }

    async getDataApi(game) {
        const api = new ApiCaixa(game.name, game.next_draw);
        return api.getData();
    }

    async insertDraw(data, idGame) {
        const draw = {
            "drawn": data.numero,
            "date": data.dataApuracao,
            "scores": data.listaDezenas
        }
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
}

module.exports = GamesServices;
