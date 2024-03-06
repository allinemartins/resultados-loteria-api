let info = require('./data-files/informations.json');

class Informations {

    setInformations(lastScriptCron) {
        info.lastScript = lastScriptCron;
        info.lastDatetime = new Date();
        this.writeFile(info);        
    }

    getInformations() {
        return info;
    }

    writeFile(newObject) {
        //reescrever o arquivo json 
        const path = require('path');
        const fs = require('fs');

        const filePath = path.join(__dirname, 'data-files', 'informations.json');

        fs.writeFile(filePath, JSON.stringify(newObject), err => {
            // Checking for errors
            if (err) throw err;
            console.log(`Done writing in the informations`); // Success
        });
    }

}

// Export the object
module.exports = Informations;
