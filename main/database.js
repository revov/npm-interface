const path = require('path');
const Datastore = require('nedb');

const homeDirectory = process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
const settingsDirectory = path.resolve(homeDirectory, '.config', 'npm-interface');

const recentFoldersDb = new Datastore({
    filename: path.resolve(settingsDirectory, 'recent-folders.db'),
    autoload: true,
    timestampData: true
});

module.exports = {
    recentFoldersDb: recentFoldersDb
};