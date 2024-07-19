const axios = require('axios');
const inicializaModelo = require('./modelo.js');

class ApiCaixa {

  constructor(game, draw, nextDate) {
    this.game = game;
    this.draw = draw;
    this.nextDate = nextDate;
  }

  async getData() {
    try {
      // Fetch data from Caixa API
      return await this.getLotteryDataFromCaixa();

    } catch (error) {
      // Caixa API failed - fallback to Gemini
      console.error('Falha ao buscar dados da API da Caixa:', error.message);
      //console.warn('Tentando buscar dados do Gemini...');

      //return await this.getLotteryDataFromGemini(); 
    }
  }

  async getLotteryDataFromCaixa() {
    // Set headers if needed (from the "Request Headers" section of the provided information)
    const headers = {
      Accept: 'application/json' // Assuming this header is required by the API
    };

    const url = `https://servicebus2.caixa.gov.br/portaldeloterias/api/${this.game}/${this.draw}`;
    const response = await axios.get(url, { headers });
    
    if (!response || !response.data || !response.data.numero || !response.data.dataApuracao || !response.data.listaDezenas || !response.data.numeroConcursoProximo || !response.data.dataProximoConcurso) {
      throw new Error('Dados do sorteio não encontrados na API da Caixa.');
    }

    return {
      numero: response.data.numero,
      dataApuracao: response.data.dataApuracao,
      listaDezenas: response.data.listaDezenas,
      numeroConcursoProximo: response.data.numeroConcursoProximo,
      dataProximoConcurso: response.data.dataProximoConcurso
    };
  }

  /*async getLotteryDataFromGemini() {
    try {
            const parts = [
				{text: `Você é o chatbot de um site que fornece informações sobre os concursos da Loteria da Caixa Econômica, Brasil.
					Retorne um JSON com as seguintes informações: Concurso, Data, Números Sorteados, Próximo Concurso, Data Próximo Concurso. 
					Caso não ache uma resposta, retorne um JSON vazio. `},                
				{text: `Me dê um json válido com informações do sorteio da loteria da caixa economica do jogo ${this.game} do concurso ${this.draw} da data do dia ${this.nextDate}. 
					Formato da resposta: {"concurso": ..., "data": ..., "numeros_sorteados": [...], "proximo_concurso": ..., "data_proximo_concurso": ...}`},
			];          
            
            const model = await inicializaModelo("gemini-1.0-pro");            
            const result = await model.generateContent(
                {contents: [{ role: "user", parts }]}
            );
            
            const response = await result.response;                    
            const text = response.text();
                  
            // Verificação do JSON
            //let jsonData;
            //try {
            //    jsonData = JSON.parse(text);
            //} catch (error) {
            //    throw new Error("A resposta do Gemini Pro não é um JSON válido.");
            //}

            return text;             
        } catch (erro) {
            console.error('Error in the made request:', `${erro.message}`);
            return {}
        }
  }*/
}

// Exportar a classe ApiCaixa
module.exports = ApiCaixa;
