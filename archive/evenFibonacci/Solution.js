process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

function fibonacci(cache, i) {
    if (cache[i]) {
        return cache[i];
    }
    return fibonacci(cache, i - 2) + fibonacci(cache, i - 1);
}

function evenCount(cache, i) {
    if (cache[i]) {
        return cache[i];
    }
    var result = (evenCount(cache, i - 1).mul(4)).add(evenCount(cache, i - 2));
    cache[i] = result;
    return result;
}


var BigNumber = require('bignumber.js');

function main() {
    var t = parseInt(readLine());
    var cache = [new BigNumber(2), new BigNumber(8)];
    for(var a0 = 0; a0 < t; a0++){
        var n = parseInt(readLine());
        var sum = new BigNumber(0);
        var i = 0;
        while (true) {
            var tmp = evenCount(cache, i);
            if (tmp >= n) {
                break;
            }
            sum = sum.add(tmp);
            i++;
        }
        console.log(sum.toString());
    }
}
