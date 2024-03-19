const axios = require('axios');
const https = require('https');

// Criar um agente HTTPS com a opção rejectUnauthorized definida como true
const agent = new https.Agent({
    rejectUnauthorized: true
});

function getApiURL(apiUrl) {
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {            
            httpsAgent: agent
        })
        .then(response => {
            resolve(response.data);
        })
        .catch(error => {
            if (error.response && error.response.status === 403) {                
                console.log(error.response);                
            } else {
                console.log('Error made the request');    
            }
            reject(error);
        });
    });
}

module.exports = { getApiURL };
