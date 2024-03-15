const { getApiURL } = require('./../public/src/api');

class ApiCaixa {

    constructor(game, draw) {
        this.apiRequest = `${process.env.APICAIXA}${game.toLowerCase()}/${draw}`;
    }

    async getData() {
        try {            
            const resposta = await getApiURL(this.apiRequest);
            return resposta;            
        } catch (erro) {
            console.error('Error in the made request:', `${erro.message} ${this.apiRequest}`);
            return false;
        }
    }
}

// Export the object
module.exports = ApiCaixa;
