const { ipcMain } = require('electron');
const exec = require('child_process').exec;

function getFullInfo(packagePath, depth = -1) {
    return new Promise((resolve, reject) => {
        exec(
            `npm explore ${packagePath} -- npm ls --json --long` + (depth !== -1 ? ` --depth ${depth}` : ''),
            {maxBuffer: 1024 * 100000},
            (error, stdout, stderr) => {
                if(error) {
                    console.log(error);
                    reject(error);
                    return;
                }

                const response = JSON.parse(stdout);

                if(response.error.errno) {
                    console.log(response.error);
                    reject(error);
                    return;
                }

                resolve(response);
            }
        );
    });
}

ipcMain.on('get-full-info', function(event, eventId, packagePath, depth = -1) {
    getFullInfo(packagePath, depth)
        .then(value => event.sender.send('__ipcResponse', eventId, null, value))
        .catch(err => event.sender.send('__ipcResponse', eventId, err));
});

module.exports = getFullInfo;