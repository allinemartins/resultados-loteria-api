require('dotenv').config();

const postgre = require('../database');
const Commons = require('../commons');
const functionCommons = new Commons();

const gamesModel = {
    getAllGames: async() => {
        try {
            const { rows } = await postgre.query("select game_id, name, last_draw, next_draw, TO_CHAR(date_last_draw, 'YYYY-MM-DD') as date_last_draw, TO_CHAR(date_next_draw, 'YYYY-MM-DD') as date_next_draw, number_min, number_max, TO_CHAR(date_update - INTERVAL '3 hours', 'YYYY-MM-DD HH24:MI:SS') as date_update from games order by name asc");
            return { msg: "OK", data: rows };
        } catch (error) {
            throw new Error(error);
        }
    },

    getGame: async(nmGame) => {
        try {            
            const { rows } = await postgre.query("select game_id, name, last_draw, next_draw, TO_CHAR(date_last_draw, 'YYYY-MM-DD') as date_last_draw, TO_CHAR(date_next_draw, 'YYYY-MM-DD') as date_next_draw, number_min, number_max, TO_CHAR(date_update - INTERVAL '3 hours', 'YYYY-MM-DD HH24:MI:SS') as date_update from games where name = $1 order by name asc", [nmGame]); 
            return { msg: "OK", data: rows };
        } catch (error) {
            throw new Error(error);
        }
    },

    getAllGameDraws: async(param) => {
        try {
            const { rows } = await postgre.query("select gd.game_draw_id,gd.draw, gd.game_id, g.name, TO_CHAR(gd.date_draw, 'YYYY-MM-DD') as date_draw, TO_CHAR(gd.date_update - INTERVAL '3 hours', 'YYYY-MM-DD HH24:MI:SS') as date_update, gd.scores  from games g, game_draw gd where g.game_id = gd.game_id and g.name = $1 order by gd.draw desc", [param])
            return {msg: "OK", data: rows};
        } catch (error) {
            throw new Error(error);
        }
    },

    getStatisticalGame: async(param) => {
        try {
            const { rows } = await postgre.query("select gs.game_statistical_id, gs.game_id, g.name, TO_CHAR(gs.date_update - INTERVAL '3 hours', 'YYYY-MM-DD HH24:MI:SS') as date_update, gs.statistical from games g, game_statistical gs where g.game_id = gs.game_id and g.name = $1", [param])
            return {msg: "OK", data: rows};
        } catch (error) {
            throw new Error(error);
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
            const { draw, date, scores } = data;
            const sql = `INSERT INTO GAME_DRAW(GAME_ID, DRAW, DATE_DRAW, SCORES) 
            SELECT $1::integer, $2::integer, $3::date, $4::text
            WHERE NOT EXISTS (SELECT 1 FROM GAME_DRAW WHERE GAME_ID = $1 AND DRAW = $2 AND DATE_DRAW = $3 AND SCORES = $4)
            RETURNING *`;

            const { rows } = await postgre.query(sql, [idGame, draw, functionCommons.getDate(functionCommons.formateDate(date)), scores]);            
            return { msg: "OK", data: (rows[0]) ? rows[0] : 'Not insert, already exists' };
        } catch (error) {
            throw new Error(error);
        }
    },
    updateDataGame: async (data, idGame) => {
        try {
            const { last_draw, next_draw, date_last_draw, date_next_draw } = data;
            
            const sql = `UPDATE GAMES SET last_draw = $1::integer, next_draw = $2::integer, date_last_draw = $3::date, date_next_draw = $4::date
            WHERE GAME_ID = $5::integer RETURNING *`;

            const { rows } = await postgre.query(sql, [last_draw, next_draw, functionCommons.getDate(functionCommons.formateDate(date_last_draw)), functionCommons.getDate(functionCommons.formateDate(date_next_draw)), idGame]);

            return { msg: "OK", data: (rows[0]) ? rows[0] : 'Not update register' };
        } catch (error) {
            throw new Error(error);
        }
    },

    insertStatisticalGame: async (statistical, idGame) => {
        try {            
            const sql = `INSERT INTO GAME_STATISTICAL(GAME_ID, STATISTICAL) 
            SELECT $1::integer, $2::text
            WHERE NOT EXISTS (SELECT 1 FROM GAME_STATISTICAL WHERE GAME_ID = $1)
            RETURNING *`;

            const { rows } = await postgre.query(sql, [idGame, statistical]);
            if(rows && rows.length > 0){
                return { msg: "OK", data: rows[0] };
            }
            return { msg: false, data: 'Not insert, already exists' };
        } catch (error) {
            throw new Error(error);
        }
    },

    updateStatisticalGame: async (statistical, idGame) => {
        try {            
            const sql = `UPDATE GAME_STATISTICAL SET STATISTICAL = $1::text WHERE GAME_ID = $2::integer RETURNING *`;
            const { rows } = await postgre.query(sql, [statistical, idGame]);
            return { msg: "OK", data: (rows[0]) ? rows[0] : 'Not update register' };
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = gamesModel