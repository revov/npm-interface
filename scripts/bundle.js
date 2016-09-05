const path = require("path");
const fs = require('fs');

// https://github.com/nodejs/node/issues/7163#issuecomment-237297482
fs.writeFileSync(
    path.resolve(__dirname, '../node_modules/babel-runtime/core-js/get-iterator.js'),
    'module.exports = { __esModule: true, "default": require("core-js/library/fn/get-iterator") };'
);

fs.writeFileSync(
    path.resolve(__dirname, '../node_modules/babel-runtime/core-js/json/stringify.js'),
    'module.exports = { __esModule: true, "default": require("core-js/library/fn/json/stringify") };'
);

const baseURL = path.resolve(__dirname, '../renderer');
// For whatever reason the builder is not looking for node_modules in the correct place, so we need to chdir to the baseUrl
require('process').chdir(baseURL);

const Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder(baseURL, path.resolve(baseURL, 'systemjs.config.js'));

// Need to override the config when bundling due to https://github.com/systemjs/builder/issues/670
builder.config({
    map: {
        '@node/electron': '@empty'
    }
});

builder.bundle('npm-interface', 'out/all.bundle.js', { minify: false, sourceMaps: false })
    .then(function(output) {
        console.log('Build complete');
        output.modules.forEach(bundledModule => {
            console.log(bundledModule); 
        });
    })
    .catch(function(err) {
        console.log('Build error');
        console.log(err);
    });