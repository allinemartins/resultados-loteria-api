let info = require('./data-files/informations.json');
const path = require('path');
const fs = require('fs');

class Informations {

    setInformations(lastScriptCron) {
        info.lastScript = lastScriptCron;
        info.lastDatetime = new Date();

        // Criar um arquivo temporário
        const tempFilePath = path.join(__dirname, 'data-files', 'informations_temp.json');
        this.writeFile(tempFilePath, info);

        // Mover o arquivo temporário para o local desejado
        const finalFilePath = path.join(__dirname, 'data-files', 'informations.json');
        fs.rename(tempFilePath, finalFilePath, err => {
            if (err) throw err;
            console.log(`Done writing in the informations`);
        });
    }

    getInformations() {
        return info;
    }

    writeFile(filePath, newObject) {
        // Escrever no arquivo temporário
        fs.writeFile(filePath, JSON.stringify(newObject), err => {
            if (err) throw err;
            console.log(`Done writing in the temporary file`);
        });
    }

}

// Exportar o objeto
module.exports = Informations;
