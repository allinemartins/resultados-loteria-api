const axios = require('axios');
const https = require('https');

// Criar um agente HTTPS com a opção rejectUnauthorized definida como true
const agent = new https.Agent({
    rejectUnauthorized: true
});

function getApiURL(apiUrl) {
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
            cache: 'force-cache',
            httpsAgent: agent // Passar o agente HTTPS para a configuração Axios
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {
                // Retornar uma nova promise rejeitada com o código de erro 403
                console.log(error);
                reject(new Error("Acesso não autorizado"));
            } else {
                // Se não for um erro 403, repassar o erro original
                console.log(error);
                reject(error);
            }
        });
    });
}

module.exports = { getApiURL };
