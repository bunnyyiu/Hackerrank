function dijkstra(adjList, source, target) {
    var d = [];
    var previous = [];
    
    var q = [];
    for (var i = 0; i < adjList.length; i++) {
        d[i] = Number.MAX_VALUE;
        previous[i] = null;
        q.push(i);
    }
    
    d[source] = 0;
    
    while (q.length > 0) {
        q.sort(function (a, b) {
            return d[a] - d[b];
        });
        
        var current = q.shift();
                
        var connectedVertexs = adjList[current];
        for (var v in connectedVertexs) {
            var altDis = d[current] + connectedVertexs[v];
            if (altDis < d[v]) {
                d[v] = altDis;
                previous[v] = current;
            }
        }
        
    }
    return {
        distance: d,
        previousNode: previous
    };
}


function processData(input) {
    var lines = input.split('\n');
    var cols = lines[0].split(' ');
    
    // number of city
    var N = parseInt(cols[0]);
    // number of edge
    var M = parseInt(cols[1]);
    
    var adjList = [];
    for (var n = 0; n < N; n++) {
        adjList[n] = {};
    }
    for (var m = 0; m < M; m++) {
        cols = lines[1 + m].split(' ');
        var u = parseInt(cols[0]);
        var v = parseInt(cols[1]);
        var d = parseInt(cols[2]);
        
        adjList[u][v] = d;
        adjList[v][u] = d;
    }
    
    cols = lines[M + 1].split(' ');
    var source = parseInt(cols[0]);
    var target = parseInt(cols[1]);
    
    var queryCount = parseInt(lines[M + 2]);
    for (var i = 0; i < queryCount; i++) {
        var block = lines[M + 3 + i].split(' ');
        var u = parseInt(block[0]);
        var v = parseInt(block[1]);
        var blockAdjList = JSON.parse(JSON.stringify(adjList));
        
        delete blockAdjList[u][v];
        delete blockAdjList[v][u];
        
        var result = dijkstra(blockAdjList, source, target);
        console.log(result.distance.pop())
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
