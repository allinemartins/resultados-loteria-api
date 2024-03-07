const postgre = require('../database');

const gamesModel = {
    getAllGames: async() => {
        try {
            const { rows } = await postgre.query("select * from games");
            return { msg: "OK", data: rows };
        } catch (error) {
            throw new Error(error.msg);
        }
    },

    getAllGameDraws: async(param) => {
        try {
            const { rows } = await postgre.query("select gd.* from games g, game_draw gd where g.game_id = gd.game_id and g.name = $1", [param])
            return {msg: "OK", data: rows};
        } catch (error) {
            return {msg: error.msg};
        }
    },

    insertDataGame: async (data) => {
        try {
            const { name, last_draw, next_draw, date_last_draw, date_next_draw, number_min, number_max } = data;

            const sql = `INSERT INTO GAMES(name, last_draw, next_draw, date_last_draw, date_next_draw, number_min, number_max) 
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;

            const { rows } = await postgre.query(sql, [name, last_draw, next_draw, date_last_draw, date_next_draw, number_min, number_max]);

            return { msg: "OK", data: rows[0] };
        } catch (error) {
            throw new Error(error.msg);
        }
    },

    insertDataGameDraw: async (data, GAME_ID) => {
        try {
            const { drawn, date, scores } = data;            

            const sql = `INSERT INTO GAME_DRAW(GAME_ID, DRAW, DATE_DRAW, SCORES) 
            VALUES($1, $2, $3, $4) RETURNING *`;

            const { rows } = await postgre.query(sql, [GAME_ID, drawn, date, scores]);

            return { msg: "OK", data: rows.length };
        } catch (error) {
            throw new Error(error.msg);
        }
    }

}

module.exports = gamesModel