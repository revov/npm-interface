const {ipcMain} = require('electron');
const ipcResponse = require('../ipc-response');
const licenseChecker = require('license-checker');

function getLicenses(packagePath) {
    return new Promise((resolve, reject) => {
        licenseChecker.init({
            start: packagePath,
        }, (error, json) => {
            if(error) {
                reject(error);
            } else {
                resolve(json);
            }
        });
    });
}

ipcMain.on('get-licenses', function(event, eventId, packagePath) {
    getLicenses(packagePath)
        .then(value => ipcResponse.respondAndComplete(event, eventId, value))
        .catch(err => ipcResponse.error(event, eventId, err));
});

module.exports = getLicenses;