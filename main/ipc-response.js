function respond(event, eventId, response) {
    event.sender.send('__ipcResponse', eventId, response);
}

function error(event, eventId, error) {
    event.sender.send('__ipcError', eventId, error);
}

function complete(event, eventId) {
    event.sender.send('__ipcComplete', eventId);
}

function respondAndComplete(event, eventId, response) {
    respond(event, eventId, response);
    complete(event, eventId);
}

module.exports = {
    respond: respond,
    error: error,
    complete: complete,
    respondAndComplete: respondAndComplete
}