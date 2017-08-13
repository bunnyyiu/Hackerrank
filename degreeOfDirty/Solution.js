function buildHash(N) {
    var a = [];
    var head = true;
    for (var i = 0, j = 1, k = N; i < N; i++) {
        if (head === true) {
            a.push(j++);
        } else {
            a.push(k--);
        }
        head = !head;
    }
    if (N % 2 === 1) {
        a.push(N);
        N--;
        var head = true;
        for (var i = 0, j = 1, k = N; i < N; i++) {
            if (head === true) {
                a.push(j++);
            } else {
                a.push(k--);
            }
            head = !head;
        }
    }
    return a;
}

function processData(input) {
    var lines = input.split("\n");
    for (var i= 1; i < lines.length; i++) {
        var cols = lines[i].split(" ");
        var N = parseInt(cols[0], 10);
        var M = parseInt(cols[1], 10);
        var hash = buildHash(N);
        var m = ((M - 1) % hash.length);
        console.log(hash[m] + " " + Math.floor((M -1 )/N));
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
