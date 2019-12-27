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
 * Complete the timeConversion function below.
 */
function timeConversion(s) {
    /*
     * Write your code here.
     */
    
    //00:00:00AM
    let hour = s.substring(0, 2);
    let minute = s.substring(3, 5);
    let second = s.substring(6, 8);
    let period = s.substring(s.length - 2);
    if (period === 'PM' && hour !== '12') {
        hour = parseInt(hour) + 12;
    } else if (period === 'AM' && hour === '12') {
        hour = '00';
    }
    
    return [hour, minute, second].join(":");
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    let result = timeConversion(s);

    ws.write(result + "\n");

    ws.end();
}
