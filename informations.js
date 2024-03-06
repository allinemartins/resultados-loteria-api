let info = require('./data-files/informations.json');
const path = require('path');
const fs = require('fs');
const tmp = require('tmp');

class Informations {

    setInformations(lastScriptCron) {
        info.lastScript = lastScriptCron;
        info.lastDatetime = new Date();

        // Criar um arquivo temporário de forma segura
        const tempFileInfo = tmp.fileSync({ postfix: '.json' });
        const tempFilePath = tempFileInfo.name;

        this.writeFile(tempFilePath, info);

        // Mover o arquivo temporário para o local desejado
        const finalFilePath = path.join(__dirname, 'data-files', 'informations.json');
        fs.rename(tempFilePath, finalFilePath, err => {
            if (err) throw err;

            // Limpar o arquivo temporário se necessário
            tempFileInfo.removeCallback();

            console.log(`Done writing in the informations`);
        });
    }

    getInformations() {
        return info;
    }

    writeFile(filePath, newObject) {
        // Escrever no arquivo temporário
        fs.writeFileSync(filePath, JSON.stringify(newObject));
        console.log(`Done writing in the temporary file`);
    }

}

// Exportar o objeto
module.exports = Informations;
