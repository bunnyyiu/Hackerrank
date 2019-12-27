function solve(N) {
    var results = new Array(N);
    var tail = true;
    for (var i = N - 1, k = N, j = 1; i >=0; i--) {
        if (tail === true) {
            results[i] = k--;
            tail = false;
        } else {
            results[i] = j++;
            tail = true;
        }
    }
    return results;
}

function processData(input) {
    var lines = input.split("\n");
    for (var i = 1; i < lines.length; i++) {
        var N = lines[i];
        var results = solve(N);
        console.log(results.join(" "));
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
