const path = require("path");
const baseURL = path.resolve(__dirname, '../browser');
// For whatever reason the builder is not looking for node_modules in the correct place, so we need to chdir to the baseUrl
require('process').chdir(baseURL);

const Builder = require('systemjs-builder');

// optional constructor options
// sets the baseURL and loads the configuration file
var builder = new Builder(baseURL, path.resolve(baseURL, 'systemjs.config.js'));

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