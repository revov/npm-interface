const path = require('path');
const {dialog} = require('electron');
const {ipcMain} = require('electron');

const getFullInfo = require('../handlers/get-full-info');

module.exports = function(window, directories) {
    if(!directories || !directories[0]) {
        return;
    }

    getFullInfo(directories[0])
        .then(packageInfo => window.webContents.send('load-project', packageInfo))
        .catch(err => {
            dialog.showErrorBox('Invalid project', 'The folder you specified does not contain a valid Node.js project');
            console.log(err);
        });
}