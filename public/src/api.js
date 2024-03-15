const axios = require('axios');

function getApiURL(apiUrl) {
    return new Promise((resolve, reject) => {
        axios.get(apiUrl)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = { getApiURL };
