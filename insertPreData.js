//dotenv config - database
require('dotenv').config();

// Chame a função de inserção do modelo com os dados do arquivo JSON
const gamesController = require('./controllers/games.controller');

async function insertDataGame() {    
    try {        
        const data = require('./pre-data/games.json');
        if (data && data.length > 0) {
            await Promise.all(data.map(async value => {
                const insertRow = await gamesController.insertPreDataGame(value);
                if (insertRow && insertRow.msg === "OK") {
                    console.log(`Insert game: ${insertRow.msg}`);
                }
            }));

            //insert draws for game
            //lotoFacil - the ID can change -- Run each function in turn
            await insertDataGameDraw('lotoFacil');
            await insertDataGameDraw('megaSena');
            await insertDataGameDraw('quina');

        }
        console.log('Finished');
    } catch (error) {
        console.error(error);
    } finally {
        process.exit(); // Exit the script
    }
}

async function insertDataGameDraw(nmFileDraws) {
    try {
        const dataJson = require(`./pre-data/${nmFileDraws}.json`);
        const { data } = await gamesController.getGame(nmFileDraws);
        if (!data) {
            throw new Error("Game not found");
        }        
        if (dataJson && dataJson.length > 0) {
            for (const value of dataJson) {                
                const insertRow = await gamesController.insertPreDataGameDraw(value, data.game_id);
                if (insertRow && insertRow.msg === "OK") {
                    console.log(`Insert draw: ${insertRow.msg}`);
                }else{
                    throw new Error("Not insert");
                }                
            }
        }
        console.log(`Finished insert in the ${nmFileDraws}`);
    } catch (error) {
        console.error(error);
    }
}

insertDataGame();