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
 * Complete the array2D function below.
 */
function array2D(arr) {
    /*
     * Write your code here.
     */    
    let max = Number.MIN_SAFE_INTEGER;
    
    let newArr = arr.map(function (row) {
        return row.map(function (col){
            return parseInt(col, 10);
        })
    });
    
    for (let r = 0 ; r <= 3; r++) {
        for (let c = 0; c <= 3; c++) {
            let sum = 0;
            
            sum += newArr[r][c];
            sum += newArr[r][c+1];
            sum += newArr[r][c+2];
            
            sum += newArr[r+1][c+1];
            
            sum += newArr[r+2][c];
            sum += newArr[r+2][c+1];
            sum += newArr[r+2][c+2];
            
            if (sum > max) {
                max = sum;
            }
        }
        
        
    }
    return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let arr = Array(6);

    for (let arrRowItr = 0; arrRowItr < 6; arrRowItr++) {
        arr[arrRowItr] = readLine().split(' ').map(arrTemp => parseInt(arrTemp, 10));
    }

    let result = array2D(arr);

    ws.write(result + "\n");

    ws.end();
}
