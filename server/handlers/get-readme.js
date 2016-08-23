const {ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');

ipcMain.on('get-readme', function(event, eventId, packagePath) {
    const readmePath = path.resolve(packagePath, 'README.md');
    fs.readFile(readmePath, 'utf8', (err, data) => {
        if(err) {
            event.sender.send('__ipcResponse', eventId, err);
        } else {
            event.sender.send('__ipcResponse', eventId, null, data);
        }
    });
});
