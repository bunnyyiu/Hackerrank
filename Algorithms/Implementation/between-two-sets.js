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

function verify1(a, test) {
    
    for (var i = 0; i < a.length; i++) {
        if (test % a[i] !== 0) {
            return false;
        }
    }
    return true;
}

function verify2(b, test) {
    
    for (var i = 0; i < b.length; i++) {
        if (b[i] % test !== 0) {
            return false;
        }
    }
    return true;
}

/*
 * Complete the getTotalX function below.
 */
function getTotalX(a, b) {
    /*
     * Write your code here.
     */
    
    var result = [];
    for (var i = a[a.length -1]; i <= b[0]; i++) {
        var test = i;
        if (verify1(a, test) && verify2(b, test)) {
            result.push(test);
        }
    }
    
    return result.length;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const a = readLine().split(' ').map(aTemp => parseInt(aTemp, 10));

    const b = readLine().split(' ').map(bTemp => parseInt(bTemp, 10));

    let total = getTotalX(a, b);

    ws.write(total + "\n");

    ws.end();
}
