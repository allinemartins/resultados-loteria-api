let info = require('./informations.json');

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
        const fs = require("fs");
        fs.writeFile(`informations.json`, JSON.stringify(newObject), err => {
            // Checking for errors
            if (err) throw err;
            console.log(`Done writing in the informations`); // Success
        });
    }

}

// Export the object
module.exports = Informations;