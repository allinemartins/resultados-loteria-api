const nmFile = 'games';
const commons = require('./commons');
let games = require(`./data-files/${nmFile}.json`);

class Games {

    setGame(name, game) {
        games[name] = game;
        commons.writeFile(games, nmFile);
    }

    getGame(name) {
        return games[name];
    }

    getAllGames() {
        return games;
    }
}

// Export the object
module.exports = Games;