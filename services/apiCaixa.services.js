const inicializaModelo = require('./modelo.js');

class ApiCaixa {

    constructor(game, draw) {        
        this.game = game;
        this.draw = draw;                      
    }

    async getData() {
        try {
            const parts = [
                {text: `Você é o chatbot de um site que fornece informações sobre dados estatísticos da Loteria Caixa.
                    Caso não ache uma resposta, voltar um JSON vazio`},
                {text: "input: Quais foram os números sorteados na MegaSena no concurso de 2745"},
                {text: `output: {     
                                    "numero": 2745,
                                    "dataApuracao": "04/07/2024",
                                    "listaDezenas": arrayDosNumerosSorteados,
                                    "numeroConcursoProximo": 2746,
                                    "dataProximoConcurso": "06/07/2024"
                                }`
                },
                {text: `input: Quais foram os números sorteados na ${this.game} no concurso ${this.draw}`},
                {text: "output: "},
            ];            
            const model = await inicializaModelo("gemini-1.0-pro");            
            const result = await model.generateContent(
                {contents: [{ role: "user", parts }]}
            );
            const response = await result.response;                    
            const text = response.text();                        
            return JSON.parse(text);             
        } catch (erro) {
            console.error('Error in the made request:', `${erro.message}`);
            return false;
        }
    }
}

// Export the object
module.exports = ApiCaixa;
