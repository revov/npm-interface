const {ipcMain} = require('electron');
const ipcResponse = require('../ipc-response');
const exec = require('child_process').exec;
const esc = require('../escapeshellarg');

function validatePackage(packagePath, packageToValidate, version) {
    const filteredVersion = version != '' ? `@${version}` : '';

    return new Promise((resolve, reject) => {
        exec(
            `npm explore ${esc(packagePath)} -- npm view ${esc(packageToValidate + filteredVersion)}`,
            {maxBuffer: 1024 * 100000},
            (error, stdout, stderr) => {
                if(error) {
                    console.log(error);
                    return reject({
                        error: {
                            package: `Package ${packageToValidate} does not exist.`
                        }
                    });
                }

                if(stdout.trim() == 'undefined') {
                    return reject({
                        error: {
                            version: `Package ${packageToValidate} does not have version ${version}`
                        }
                    });
                }

                return resolve({});
            }
        );
    });
}

ipcMain.on('validate-package', function(event, eventId, packagePath, packageToValidate, version) {
    validatePackage(packagePath, packageToValidate, version)
        .then(value => ipcResponse.respondAndComplete(event, eventId, value))
        .catch(err => ipcResponse.error(event, eventId, err));
});

module.exports = validatePackage;