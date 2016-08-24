const {ipcMain} = require('electron');
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
        .then(value => event.sender.send('__ipcResponse', eventId, null, value))
        .catch(err => event.sender.send('__ipcResponse', eventId, err));
});

module.exports = getReadme;