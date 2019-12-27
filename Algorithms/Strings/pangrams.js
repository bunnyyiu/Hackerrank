function processData(input) {
    //Enter your code here
    var hash = {}
    for (i = 0; i < input.length; i++) {
        var c = input[i].toUpperCase();
        if (c !== ' ') {
            hash[c] = true;
        }
    }
    if  (Object.keys(hash).length === 26) {
        console.log("pangram ");
    } else {
        console.log("not pangram ");

    }
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
