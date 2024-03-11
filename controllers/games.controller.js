const gamesModel = require('./../models/games.model');

const gamesController = {
    getAllGames: async (req, res) => {
        try {
            const { data } = await gamesModel.getAllGames();
            res.json({ msg: "OK", data: data })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },

    getGame: async(param) => {
        try {
            const { data } = await gamesModel.getGame(param);
            return { msg: "OK", data: (data) ? data[0] : 'Not found' };
        } catch (error) {
            return { msg: error };
        }
    },

    getAllGameDraws: async (req, res) => {
        try {
            const { data } = await gamesModel.getAllGameDraws(req.params.game);
            res.json({ msg: "OK", data: data })
        } catch (error) {
            res.json({ msg: error.msg })
        }
    },

    //insertPreData
    insertPreDataGame: async (data) => {
        try {
            const insertRow = await gamesModel.insertDataGame(data);
            return { msg: "OK", data: insertRow };
        } catch (error) {
            console.error(error);
        }
    },

    insertPreDataGameDraw: async (data, idGame) => {
        try {            
            const insertRow = await gamesModel.insertDataGameDraw(data, idGame);
            return { msg: "OK", data: insertRow };
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = gamesController