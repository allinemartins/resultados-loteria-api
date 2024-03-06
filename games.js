let games = require('./games.json');

class Games {

    setGame(name, game) {
        games[name] = game;
        this.writeFile(games);        
    }

    getGame(name) {
        return games[name];
    }

    getAllGames() {
        return games;
    }

    writeFile(newObject) {
        //reescrever o arquivo json 
        const fs = require("fs");
        fs.writeFile(`games.json`, JSON.stringify(newObject), err => {
            // Checking for errors
            if (err) throw err;
            console.log(`Done writing in the games`); // Success
        });
    }

}

// Export the object
module.exports = Games;