const axios = require('axios');
//const https = require('https');

class ApiCaixa {

    constructor(game, draw) {
        this.apiRequest = `${process.env.APICAIXA}${game.toLowerCase()}/${draw}`;
    }

    async getData() {
        try {
            /*const agent = new https.Agent({
                rejectUnauthorized: false, // Configuration to accept untrusted certificates
            });*/
            const resposta = await axios.get(this.apiRequest);
            return resposta.data;
        } catch (erro) {
            console.error('Error in the made request:', `${erro.message} ${this.apiRequest}`);
            return false;
        }
    }
}

// Export the object
module.exports = ApiCaixa;