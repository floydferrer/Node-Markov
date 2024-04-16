/** Command-line tool to generate Markov text. */
const fs = require('fs');
const process = require('process');
const axios = require('axios');
let type = process.argv[2];
let path = process.argv[3];

function handleOutput(text){
    fs.writeFile('markov.txt', text, 'utf8', err => {
        if (err) {
            console.error(err);
            process.exit(1);
        } else{
            console.log('Write successful')
        }
    });
}

function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.log('Error: ', err);
            process.exit(1);
        } else{
            handleOutput(data)
        }
    })
}

async function webCat(path) {
    try{
        let res = await axios.get(path);
        handleOutput(res.data);
    }
    catch(err){
        console.log(`Error: ${err}`)
    }
}

// if (process.argv[2] === '--out'){
//     out = process.argv[3];
//     type = process.argv[4];
// } else {
//     type = process.argv[2];
// }

if (type === 'url') {
    webCat(path);
} else if (type === 'file'){
    cat(path);
} else {
    console.log('Error: Please input file or url')
}


