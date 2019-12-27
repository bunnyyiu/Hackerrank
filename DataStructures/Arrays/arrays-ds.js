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
    inputString = inputString.trim().split('\n').map(str => str.trim());

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the reverseArray function below.
 */
function reverseArray(a) {
    /*
     * Write your code here.
     */
    var results = [];
    for (var i = a.length -1; i >= 0; i--) {
        results.push(a[i]);
    }
    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine(), 10);

    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    let res = reverseArray(arr);

    ws.write(res.join(" ") + "\n");

    ws.end();
}
