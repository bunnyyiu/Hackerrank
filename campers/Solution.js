function processData(input) {
    var lines = input.split("\n");
    var line = lines[0];
    var cols = line.split(" ");
    var N = parseInt(cols[0], 10);
    var K = parseInt(cols[1], 10);
    line = lines[1];
    cols = line.split(" ");
    var player = new Array(N);
    for (var i = 0; i < K; i++){
        var pos = parseInt(cols[i], 10) - 1;
        player[pos] = true;
        if (pos - 1 >= 0) {
            player[pos - 1] = true;
        }
        if (pos + 1 < N) {
            player[pos + 1] = true;
        }
    }
    var start = -1;
    var count = 0;
    var results = [];
    for (var i = 0; i < player.length; i++) {
        if (player[i] === true) {
            if (count > 0) {
              results.push(count);
            }
            start = -1;
            count = 0;
        } else {
            if (start === -1) {
                start = i;
                count = 1;
            } else {
                count++;
            }
        }
    }
    if (count > 0){
        results.push(count);
    }

    var playerCount = K;
    for (var i = 0; i < results.length; i++) {
        playerCount += Math.ceil(results[i] / 2);
    }
    console.log(playerCount);
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
