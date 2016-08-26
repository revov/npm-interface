const {ipcMain} = require('electron');
const ipcResponse = require('../ipc-response');
const exec = require('child_process').exec;

ipcMain.on('install', function(event, eventId, packagePath, packageToInstall, isDev = false) {
    const command = `npm explore ${packagePath} -- npm install --color always --progress false ${isDev ? '--save-dev' : '--save'} ${packageToInstall}`;
    ipcResponse.respond(event, eventId, `$ ${command}\n`);

    const child = exec(command);


    child.stdout.on('data', function(data) {
        ipcResponse.respond(event, eventId, data);
    });

    child.stderr.on('data', function(data) {
        ipcResponse.respond(event, eventId, data);
    });

    child.on('close', function(code) {
        if(code == 0) {
            ipcResponse.complete(event, eventId);
        } else {
            ipcResponse.error(event, eventId, code);
        }
    });
});
