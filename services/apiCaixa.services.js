class ApiCaixa {

    constructor(game, draw) {
        this.apiRequest = `${process.env.APICAIXA}${game.toLowerCase()}/${draw}`;
    }

    async getData() {
        try {
            const response = await fetch(this.apiRequest);
            // Verificando se a resposta da solicitação é bem-sucedida (status 200)
            if (!response.ok) {
                throw new Error('Erro ao fazer a solicitação GET');
            }
            // Convertendo a resposta para JSON
            const data = await response.json();
            console.log('Dados recebidos:', data);
            return data;
        } catch (error) {
            // Capturando e tratando erros
            console.error('Ocorreu um erro:', error);
            return false;
        }
    }
}

// Export the object
module.exports = ApiCaixa;
