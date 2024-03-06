const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

module.exports.writeFile = function(newObject, nmFile) {
    // Criar um arquivo temporário de forma segura na pasta temporária
    const tempFileInfo = tmp.fileSync({ postfix: '.json', dir: '/tmp' });
    const tempFilePath = tempFileInfo.name;

    // Escrever no arquivo temporário
    fs.writeFileSync(tempFilePath, JSON.stringify(newObject));
    console.log(`Done writing in the temporary file`);

    // Mover o arquivo temporário para a pasta original
    const finalFilePath = path.join(__dirname, 'data-files', `${nmFile}.json`);
    fs.renameSync(tempFilePath, finalFilePath);

    // Limpar o arquivo temporário
    tempFileInfo.removeCallback();
    console.log(`Done writing in the ${nmFile}`);
}
