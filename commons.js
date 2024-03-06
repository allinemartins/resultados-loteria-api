const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

module.exports.writeFile = function(newObject, nmFile){

    // Criar um arquivo temporário de forma segura
    const tempFileInfo = tmp.fileSync({ postfix: '.json' });
    const tempFilePath = tempFileInfo.name;

    // Escrever no arquivo temporário
    fs.writeFileSync(tempFilePath, JSON.stringify(newObject));
    console.log(`Done writing in the temporary file`);

    // Copiar o conteúdo do arquivo temporário para o destino
    const finalFilePath = path.join(__dirname, 'data-files', `${nmFile}.json`);

    const readStream = fs.createReadStream(tempFilePath);
    const writeStream = fs.createWriteStream(finalFilePath);

    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        // Limpar o arquivo temporário se necessário
        tempFileInfo.removeCallback();

        console.log(`Done writing in the ${nmFile}`);
    });
}