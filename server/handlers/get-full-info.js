const { ipcMain } = require('electron');
const ipcResponse = require('../ipc-response');
const exec = require('child_process').exec;

function getFullInfo(packagePath, depth = -1) {
    return new Promise((resolve, reject) => {
        exec(
            `npm explore ${packagePath} -- npm ls --json --long` + (depth !== -1 ? ` --depth ${depth}` : ''),
            {maxBuffer: 1024 * 100000},
            (error, stdout, stderr) => {
                if(error) {
                    console.log(error);
                    return reject(stderr);
                }

                const response = JSON.parse(stdout);

                if(response.error.errno) {
                    console.log(response.error);
                    return reject(response.error);
                }

                resolve(response);
            }
        );
    });
}

ipcMain.on('get-full-info', function(event, eventId, packagePath, depth = -1) {
    getFullInfo(packagePath, depth)
        .then(value => ipcResponse.respondAndComplete(event, eventId, value))
        .catch(err => ipcResponse.error(event, eventId, err));
});

module.exports = getFullInfo;