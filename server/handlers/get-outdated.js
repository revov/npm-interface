const {ipcMain} = require('electron');
const exec = require('child_process').exec;

function getOutdated(packagePath) {
    return new Promise((resolve, reject) => {
        exec(
            `npm explore ${packagePath} -- npm outdated --json --depth 0`,
            {maxBuffer: 1024 * 100000},
            (error, stdout, stderr) => {
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
        .then(value => {event.sender.send('__ipcResponse', eventId, null, value);})
        .catch(err => {event.sender.send('__ipcResponse', eventId, err);});
});

module.exports = getOutdated;