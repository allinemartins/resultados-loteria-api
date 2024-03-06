const nmFile = 'informations';
const commons = require('./commons');
const info = require(`./data-files/${nmFile}.json`);
class Informations {

    setInformations(lastScriptCron) {
        const info = {
            "lastScript": lastScriptCron,
            "lastDatetime": new Date()
        }
        commons.writeFile(info, nmFile);
    }

    getInformations() {
        return info;
    }
    
}

// Exportar o objeto
module.exports = Informations;
