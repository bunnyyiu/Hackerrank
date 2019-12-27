function getTextLength(a, b) {
    var matched = 0;
    for (var i = 0; i < a.length && i < b.length; i++) {
        if (a[i] === b[i]) {
            matched++;
        } else {
            break;
        }
    }
    return matched;
}

function processData(input) {
    var lines = input.split("\n");
    var count = parseInt(lines[0])
    for (var i = 1; i <= count; i++) {
        var total = 0;
        var line = lines[i];
        for (var j = 0; j < line.length; j++) {
          var cur = line.substring(j);
          var match = getTextLength(line, cur);
          total += match;
        }
        console.log(total);
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

