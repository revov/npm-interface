const {ipcMain} = require('electron');
const exec = require('child_process').exec;

function install(packagePath, packageToInstall, isDev = false) {
    return new Promise((resolve, reject) => {
        exec(
            `npm explore ${packagePath} -- npm install ${isDev ? '--save-dev' : '--save'} --json ${packageToInstall}`,
            (error, stdout, stderr) => {
                if(error) {
                    console.log(error);
                    return reject(stderr);
                }

                return resolve();
            }
        );
    });
}

ipcMain.on('install', function(event, eventId, packagePath, packageToInstall, isDev = false) {
    install(packagePath, packageToInstall, isDev)
        .then(value => {event.sender.send('__ipcResponse', eventId);})
        .catch(err => {event.sender.send('__ipcResponse', eventId, err);});
});

module.exports = install;