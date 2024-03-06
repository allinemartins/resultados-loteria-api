//file name : controllers/cron.js
const Informations = require('./../informations');
const StatisticalGame = require('./../statisticalGame');

//this code will be triggered by the cron job
module.exports = async (req, res, next) => {
    //code for the automated task
    let tentativas = 0;
    while (tentativas < 3) {
        const statistica = new StatisticalGame(req.params.name);
        const dataApi = await statistica.getApiData();
        if (!dataApi) {
            tentativas++;
        }
    }

    setLastScript(`/updateData/${req.params.name}`);
    next();
};

function setLastScript(name) {
    const info = new Informations();
    info.setInformations(name);
}
