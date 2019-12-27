function roateMatrix(matrics, M, N, R) {
    var maxLayer = Math.min(M, N) /2;
    //console.log('roateMatrix', maxLayer);
    for (var l = 0; l < maxLayer; l++) {
        // construct the list for rotation
        
        var pos = [];
        
        var r = -1;
        var c = -1;
        
        c = l + 1;
        r = l;
        pos.push(matrics[r][c - 1]);
        for (; c <= N - l - 1 - 1; c++) {
          pos.push(matrics[r][c]);
        }
        pos.push(matrics[r][c]);
        
        c = N - 1 - l;
        r = l + 1;
        for (; r <= M - l - 1 - 1; r++) {
            pos.push(matrics[r][c]);
        }
        
        pos.push(matrics[r][c]);
        
        r = M - 1 - l;
        c = N - l - 1 - 1;
        for (; c >= l + 1; c--) {
            pos.push(matrics[r][c]);
        }
        
        pos.push(matrics[r][c]);
        
        r = M - l - 1 - 1;
        c = l;
        
        for (; r > l; r--) {
            pos.push(matrics[r][c]);
        }
        
        
        // rotate using the list
        
        var effectiveRotation = R % pos.length;
        for (var k = 0; k < effectiveRotation; k++) {
            pos.push(pos.shift());
        }
        
        // assign to new position
        r = -1;
        c = -1;
        
        c = l + 1;
        r = l;
        matrics[r][c - 1] = pos.shift();
        for (; c <= N - l - 1 - 1; c++) {
            matrics[r][c] = pos.shift();
        }
        matrics[r][c] = pos.shift();
        
        c = N - 1 - l;
        r = l + 1;
        for (; r <= M - l - 1 - 1; r++) {
            matrics[r][c] = pos.shift();
        }
        
        matrics[r][c] = pos.shift();
        
        r = M - 1 - l;
        c = N - l - 1 - 1;
        for (; c >= l + 1; c--) {
            matrics[r][c] = pos.shift();
        }
        
        matrics[r][c] = pos.shift();
        
        r = M - l - 1 - 1;
        c = l;
        
        for (; r > l; r--) {
            matrics[r][c] = pos.shift();
        }
        
    }
    
    return matrics;
}

function processData(input) {
    var lines = input.split('\n');
    var cols = lines[0].split(' ');
    var M = parseInt(cols[0], 10);
    var N = parseInt(cols[1], 10);
    var R = parseInt(cols[2], 10);
    
    var matrics = [];
    matrics.length = M;
    for (var r = 0; r < M; r++) {
        cols = lines[1 + r].split(' ');
        matrics[r] = [];
        matrics[r].length = N;
        for (var c = 0; c < N; c++) {
            matrics[r][c] = parseInt(cols[c], 10);
        }
    }
    
    var result = roateMatrix(matrics, M, N, R);
    
    for (var r = 0; r < M; r++) {
        console.log(matrics[r].join(' '));
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
