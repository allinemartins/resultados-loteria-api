const postgre = require('../database');
const Commons = require('../commons');
const functionCommons = new Commons();

const gamesModel = {
    getAllGames: async() => {
        try {
            const { rows } = await postgre.query("select * from games");
            return { msg: "OK", data: rows };
        } catch (error) {
            throw new Error(error.msg);
        }
    },

    getGame: async(nmGame) => {
        try {            
            const { rows } = await postgre.query("select * from games where name = $1", [nmGame]); 
            return { msg: "OK", data: rows };
        } catch (error) {
            throw new Error(error);
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
            SELECT $1::text, $2::integer, $3::integer, $4::timestamp, $5::timestamp, $6::integer, $7::integer 
            WHERE NOT EXISTS (SELECT 1 FROM GAMES WHERE name = $1)
            RETURNING *`;

            const { rows } = await postgre.query(sql, [name, last_draw, next_draw, functionCommons.getDate(functionCommons.formateDate(date_last_draw)), functionCommons.getDate(functionCommons.formateDate(date_next_draw)), number_min, number_max]);

            return { msg: "OK", data: (rows[0]) ? rows[0] : 'Not insert, already exists' };
        } catch (error) {
            throw new Error(error);
        }
    },

    insertDataGameDraw: async (data, idGame) => {
        try {
            const { drawn, date, scores } = data;
            const sql = `INSERT INTO GAME_DRAW(GAME_ID, DRAW, DATE_DRAW, SCORES) 
            SELECT $1::integer, $2::integer, $3::date, $4::text
            WHERE NOT EXISTS (SELECT 1 FROM GAME_DRAW WHERE GAME_ID = $1 AND DRAW = $2 AND DATE_DRAW = $3 AND SCORES = $4)
            RETURNING *`;

            const { rows } = await postgre.query(sql, [idGame, drawn, functionCommons.getDate(functionCommons.formateDate(date)), scores]);

            return { msg: "OK", data: (rows[0]) ? rows[0] : 'Not insert, already exists' };
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = gamesModel