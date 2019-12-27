function processData(input) {
    var lines = input.split("\n");
    var cols = lines[1].split(" ");
    var count = 0
    for (var i = 0; i < cols.length; i++) {
        count += parseInt(cols[i], 10);
    }
    console.log(count);
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
