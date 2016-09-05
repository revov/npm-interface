const {ipcMain} = require('electron');
const ipcResponse = require('../ipc-response');
const exec = require('child_process').exec;
const esc = require('../escapeshellarg');
const kill = require('tree-kill');

ipcMain.on('run-script', function(event, eventId, packagePath, script) {
    const command = `npm explore ${esc(packagePath)} -- npm --color always run ${esc(script)}`;
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

    // Handle script interrupts by user
    const stopScriptListener = function(innerEvent, innerEventId, innerPackagePath, innerScript) {
        if(innerPackagePath != packagePath || innerScript != script) {
            return;
        }

        // Simulate Ctrl^C in terminal
        ipcResponse.respond(event, eventId, `^C\n$ `);
        kill(child.pid, 'SIGINT', killError => {
            if(killError) {
                ipcResponse.error(innerEvent, innerEventId, killError);
            } else {
                ipcResponse.complete(innerEvent, innerEventId);
            }

            ipcMain.removeListener('stop-script', stopScriptListener);
        });
        
    }

    ipcMain.on('stop-script', stopScriptListener);
});
