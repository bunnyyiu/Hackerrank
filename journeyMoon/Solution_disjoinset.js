function processData(input) {
    const lines = input.split('\n');
    let cols = lines[0].split(' ');
    const n = cols[0];
    const p = cols[1];
    let adjList = {};
    let singleMember = {};
    for (let i = 0; i < n; i++) {
        singleMember[i] = true;
    }
    for (let j = 0; j < p; j++) {
        let cols = lines[j + 1].split(' ');
        let m1 = cols[0];
        let m2 = cols[1];
        let set1Id = findSet(m1, adjList, singleMember);
        let set2Id = findSet(m2, adjList, singleMember);
        if (set1Id === set2Id) {
            continue;
        }
        mergeSetAndRemoveSmallSet(set1Id, set2Id, adjList);
    }
    console.log(findDisjoinGroups(adjList, singleMember));
}

function findSet(member, adjList, singleMember) {
    if (singleMember[member]) {
        let set = {
          size: 1
        };
        set[member] = true;
        adjList[member] = set;
        delete singleMember[member];
        return member;
    }
    if (adjList[member]) {
        return member;
    }
    for (let id in adjList) {
        let set = adjList[id];
        if (!set) {
            continue;
        }
        if (set[member]) {
            return id;
        }
    }
    // not found
    return -1;
}

function mergeSetAndRemoveSmallSet(set1Id, set2Id, adjList) {
    let set1 = adjList[set1Id];
    let set2 = adjList[set2Id];
    let newSize = set1.size + set2.size;
    if (set2.size < set1.size) {
        Object.assign(set1, set2);
        set1.size = newSize;
        delete adjList[set2Id];
    } else {
        Object.assign(set2, set1);
        set2.size = newSize;
        delete adjList[set1Id];
    }
}

function findDisjoinGroups(adjList, singleMember) {
    let count = 0;
    let keys = Object.keys(adjList);
    let keyLen = keys.length;
    let sizeCount = 0;
    for (let i = 0; i < keyLen - 1; i++) {
        sizeCount += adjList[keys[i]].size;
        for (let j = i + 1; j < keyLen; j++) {
            count += adjList[keys[i]].size * adjList[keys[j]].size;
        }
    }
    sizeCount += adjList[keys[keyLen - 1]].size;
    let singleCount = Object.keys(singleMember).length;
    for (let j = 0; j < singleCount; j++) {
        count += sizeCount++;
    }
    return count;
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
