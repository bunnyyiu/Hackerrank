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
var BigNumber = require('bignumber.js');

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var n = parseInt(readLine()) - 1;
        var count3 = new BigNumber(n).div(3).floor();
        var count5 = new BigNumber(n).div(5).floor();
        var count15 = new BigNumber(n).div(15).floor();

        var times3Sum = ((count3.add(1)).mul(count3)).div(2);
        var times5Sum = ((count5.add(1)).mul(count5)).div(2);
        var times15Sum = ((count15.add(1)).mul(count15)).div(2);

        console.log(((times3Sum.mul(3)).add(times5Sum.mul(5)).sub(times15Sum.mul(15))).toString());
    }
}
