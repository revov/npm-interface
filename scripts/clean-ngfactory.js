const glob = require("glob");
const fs = require("fs");
const path = require("path");

// Find files
glob("**/*ngfactory.ts", {cwd: path.resolve(__dirname, '../browser')}, function(err,files){
    if (err) throw err;
    // Delete files
    files.forEach(function(item,index,array){
        fs.unlink(path.resolve(__dirname, '../browser', item), function(err){
            if (err) throw err;
            console.log(item + " deleted");
        });
    });
});