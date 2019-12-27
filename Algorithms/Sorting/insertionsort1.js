function processData(input) {
    var lines = input.split("\n");
    var count = parseInt(lines[0], 10);
    var cols = lines[1].split(" ");
    var a = [];
    for (var i = 0; i < count; i++) {
        a.push(parseInt(cols[i], 10));
    }
    var last = a[a.length - 1];
    for (var i = a.length - 2; i >= 0; i--) {
        if (a[i] > last) {
            a[i + 1] = a[i];
            console.log(a.join(" "));
        } else {
            a[i + 1] = last;
            console.log(a.join(" "));
            break;
        }
    }
    if (i === -1) {
        a[0] = last;
        console.log(a.join(" "));
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
