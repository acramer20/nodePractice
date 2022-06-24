const fs = require('fs');
const process = require('process');

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Had trouble reading ${path}: ${err}`)
            process.kill(1);
        } else {
            console.log(data);
        }
    });
}

cat(process.argv[2])