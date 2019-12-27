'use strict';

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

// Complete the miniMaxSum function below.
function miniMaxSum(arr) {
    let count = 0;
    for (let i = 0; i < arr.length; i++) {
        count += arr[i];
    }
    let min = count;
    let max = 0;
    
    for (let i = 0; i < arr.length; i++) {
        let tmp = count - arr[i];
        if (tmp > max) {
            max = tmp;
        }
        if (tmp < min) {
            min = tmp;
        }
    }
    
    console.log(min, max);
}

function main() {
    const arr = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));

    miniMaxSum(arr);
}
