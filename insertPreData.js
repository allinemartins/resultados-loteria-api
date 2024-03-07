//dotenv config - database
require('dotenv').config();

// Chame a função de inserção do modelo com os dados do arquivo JSON
const gamesController = require('./controllers/games.controller');

async function insertDataGame(){    
    try {
        const result = await gamesController.insertPreDataGame();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

//insertDataGame();

async function insertDataGameDraw(nmFile, gameId){    
    try {
        const result = await gamesController.insertPreDataGameDraw(nmFile, gameId);
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

//lotoFacil - the ID can change -- Run each function in turn
//insertDataGameDraw('lotoFacil', 5);
//insertDataGameDraw('megaSena', 6);
//insertDataGameDraw('quina', 4);