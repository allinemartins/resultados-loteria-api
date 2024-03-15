const jsonExemple = document.querySelectorAll('.json-example');
if (jsonExemple.length > 0) {
    jsonExemple.forEach(element => {
        element.addEventListener('click', setExemploJson);
    });
}

function setExemploJson() {
    this.classList.toggle('show');
}


function redirectWithBaseUrl(path) {
    var baseUrl = window.location.origin; // Obtém automaticamente o URL base
    var fullUrl = baseUrl + path;
    window.location.href = fullUrl;
}

//teste
// Definindo a URL da API
const apiUrl = 'https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil/3050';

// Fazendo a solicitação GET usando o método fetch
fetch(apiUrl)
  .then(response => {
    // Verificando se a resposta da solicitação é bem-sucedida (status 200)
    if (response.ok) {
      // Convertendo a resposta para JSON
      return response.json();
    }
    // Caso contrário, lançando um erro
    throw new Error('Erro ao fazer a solicitação GET');
  })
  .then(data => {
    // Manipulando os dados obtidos da API
    console.log('Dados recebidos:', data);
  })
  .catch(error => {
    // Capturando e tratando erros
    console.error('Ocorreu um erro:', error);
  });



