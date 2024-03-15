const axios = require('axios');

function getApiURL(apiUrl) {
    return new Promise((resolve, reject) => {
        axios.get(apiUrl, {
              cache: 'force-cache'
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = { getApiURL };
