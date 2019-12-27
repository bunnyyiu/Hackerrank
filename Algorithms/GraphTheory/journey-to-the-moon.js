function dfs(member, vertices, visited) {
    if (visited[member]) {
        return 0;
    }
    let count = 1;
    visited[member] = true;

    const edges = vertices[member];
    for (let i = 0; i < edges.length; i++) {
        count += dfs(edges[i], vertices, visited);
    }

    return count;
}

function processData(input) {
    const lines = input.split('\n');
    let cols = lines[0].split(' ');
    const n = cols[0];
    const p = cols[1];

    const vertices = [];
    vertices.length = n;
    for (let i = 0; i < n; i++) {
        vertices[i] = [];
    }

    for (let j = 0; j < p; j++) {
        cols = lines[j + 1].split(' ');
        let x = cols[0];
        let y = cols[1];
        vertices[x].push(y);
        vertices[y].push(x);
    }

    const visited = {};

    const groupSizes = [];
    for (let k = 0; k < n; k++) {
        if (visited[k]) {
            continue;
        }
        groupSizes.push(dfs(k, vertices, visited));
    }

    let currentSize = 0;
    let count = 0;

    for (let g = 0; g < groupSizes.length; g++) {
        count += currentSize * groupSizes[g];
        currentSize += groupSizes[g];
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
