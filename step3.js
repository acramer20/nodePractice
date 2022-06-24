const fs = require('fs');
const process = require('process');
const axios = require('axios');

function doTheOutput(text, out) {
    if (out) {
        fs.writeFile(out, text, 'utf8', function(err) {
            if (err) {
                console.error(`Couldn't write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}

function cat(path, out) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Had trouble reading ${path}: ${err}`)
            process.kill(1);
        } else {
            doTheOutput(data, out)
        }
    });
}

async function webCat(url, out){
    try {
        let resp = await axios.get(url);
        doTheOutput(resp.data, out);
    }
    catch (err) {
        console.error(`Error retrieving ${url}: ${err}`);
        process.exit(1);
    }  
}

let path;
let out;

if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2];
}

if (path.slice(0, 4) === 'http') {
    webCat(path, out);
} else {
    cat(path, out);
}