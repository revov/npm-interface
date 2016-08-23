const path = require('path');
const {dialog} = require('electron');
const {ipcMain} = require('electron');

module.exports = function(window, directories) {
    if(!directories || !directories[0]) {
        return;
    }

    let packageMetadata = {
        packageJson: null,
        path: directories[0]
    };

    try {
        packageMetadata.packageJson = require(path.resolve(packageMetadata.path, 'package.json'));
    } catch (error) {
        dialog.showErrorBox('Invalid project', 'The folder you specified does not contain a valid Node.js project');
        console.log(error);
        return;
    }

    window.webContents.send('load-project', packageMetadata);
}