const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

class Informations {

    setInformations(lastScriptCron) {
        const info = {
            "lastScript": lastScriptCron,
            "lastDatetime": new Date()
        }

        // Criar um arquivo temporário de forma segura
        const tempFileInfo = tmp.fileSync({ postfix: '.json' });
        const tempFilePath = tempFileInfo.name;

        this.writeFile(tempFilePath, info);

        // Copiar o conteúdo do arquivo temporário para o destino
        const finalFilePath = path.join(__dirname, 'data-files', 'informations.json');

        const readStream = fs.createReadStream(tempFilePath);
        const writeStream = fs.createWriteStream(finalFilePath);

        readStream.pipe(writeStream);

        writeStream.on('finish', () => {
            // Limpar o arquivo temporário se necessário
            tempFileInfo.removeCallback();

            console.log(`Done writing in the informations`);
        });
    }

    getInformations() {
        const info = require('./data-files/informations.json');
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
