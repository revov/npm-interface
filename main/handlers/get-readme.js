const {ipcMain} = require('electron');
const ipcResponse = require('../ipc-response');
const path = require('path');
const fs = require('fs');

function getReadme(packagePath) {
    return new Promise((resolve, reject) => {
        const readmePath = path.resolve(packagePath, 'README.md');
        fs.readFile(readmePath, 'utf8', (err, data) => err ? reject(err) : resolve(data));
    });
}

ipcMain.on('get-readme', function(event, eventId, packagePath) {
    getReadme(packagePath)
        .then(value => ipcResponse.respondAndComplete(event, eventId, value))
        .catch(err => ipcResponse.error(event, eventId, err));
});

module.exports = getReadme;