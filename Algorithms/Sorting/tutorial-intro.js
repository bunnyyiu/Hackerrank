"use strict";
function processData(input) {
    var lines = input.split("\n");
    var target = parseInt(lines[0], 10);
    var count = parseInt(lines[1], 10);
    var cols = lines[2].split(" ");
    var a = [];
    for (var i = 0; i < count; i++) {
        var tmp = parseInt(cols[i], 10);
        if (tmp === target) {
            console.log(i);
        }
    }
    
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
