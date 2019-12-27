'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the minimumDistances function below.
function minimumDistances(a) {
    let positions = {};
    for (var i = 0; i < a.length; i++) {
        const tmp = a[i];
        if (positions[tmp]) {
            positions[tmp].last = i;
        } else {
            positions[tmp] = {
              first: i  
            };
        }
    }
    
    //console.log(positions);
    let min = -1;
    for (var key in positions) {
        if (positions.hasOwnProperty(key) && positions[key].last) {
            const tmp = positions[key].last - positions[key].first;
            if (tmp < min || min === -1) {
                min = tmp;
            }
        }
    }
    
    return min;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine(), 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    let result = minimumDistances(a);

    ws.write(result + "\n");

    ws.end();
}
