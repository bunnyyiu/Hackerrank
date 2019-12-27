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

function main() {
    var a = readLine();
    var b = readLine();
    
    var count1 = {};
    
    a.split('').forEach(function (c) {
        if (!count1[c]) {
            count1[c] = 1;
        } else {
            count1[c]++;
        }
    });
    
    var count2 = {};
    b.split('').forEach(function (c) {
        if (!count2[c]) {
            count2[c] = 1;
        } else {
            count2[c]++;
        }
    });
    
    var diff = 0;
    Object.keys(count1).forEach(function (c) {
        if (!count2[c]) {
            diff += count1[c];
            return;
        }
        
        if (count1[c] !== count2[c]) {
            diff += Math.abs(count1[c] - count2[c]);
        }
        
        delete count2[c];
    });
    
    Object.keys(count2).forEach(function (c) {
       diff += count2[c];                         
    });
    
    console.log(diff);
}
