const gamesModel = require('./../models/games.model');

const gamesController = {
    getAllGames: async(req, res) => {
        try {            
            const { data } = await gamesModel.getAllGames();            
            res.json({msg: "OK", data: data})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },

    getAllGameDraws: async(req, res) => {
        try {            
            const { data } = await gamesModel.getAllGameDraws(req.params.game);
            res.json({msg: "OK", data: data})
        } catch (error) {
            res.json({msg: error.msg})
        }
    },

    //insertPreData
    insertPreDataGame: async () => {
        try {
            const data = require('./../pre-data/games.json');
            let rowsInserts = 0;
    
            if (data && data.length > 0) {
                await Promise.all(data.map(async value => {
                    const insertRow = await gamesModel.insertDataGame(value);                    
                    if (insertRow && insertRow.msg === "OK") {
                        rowsInserts++;
                    }
                }));
            }    
            return { msg: "OK", data: [rowsInserts] };
        } catch (error) {
            console.error(error);
        }
    },

    insertPreDataGameDraw: async (nmFileDraws, GAME_ID) => {
        try {
            const data = require(`./../pre-data/${nmFileDraws}.json`);
            let rowsInserts = 0;
            if (data && data.length > 0) {
                await Promise.all(data.map(async value => {
                    const insertRow = await gamesModel.insertDataGameDraw(value, GAME_ID);
                    console.log(insertRow);                    
                    if (insertRow && insertRow.msg === "OK") {
                        rowsInserts++;
                    }
                }));
            }    
            return { msg: "OK", data: [rowsInserts] };
        } catch (error) {
            console.error(error);
        }
    }

}

module.exports = gamesController