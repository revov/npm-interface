const {ipcMain} = require('electron');
const ipcResponse = require('../ipc-response');
const exec = require('child_process').exec;

function getOutdated(packagePath) {
    return new Promise((resolve, reject) => {
        exec(
            `npm explore ${packagePath} -- npm outdated --json --depth 0`,
            {maxBuffer: 1024 * 100000},
            (error, stdout, stderr) => {
                console.log('DEBUG: Got outdated packages. This rarely takes over a minute');
                if(error) {
                    console.log(error);
                    return reject(stderr);
                }

                if(stdout == '') {
                    return resolve({});
                }

                const response = JSON.parse(stdout);

                return resolve(response);
            }
        );
    });
}

ipcMain.on('get-outdated', function(event, eventId, packagePath) {
    getOutdated(packagePath)
        .then(value => ipcResponse.respondAndComplete(event, eventId, value))
        .catch(err => ipcResponse.error(event, eventId, err));
});

module.exports = getOutdated;