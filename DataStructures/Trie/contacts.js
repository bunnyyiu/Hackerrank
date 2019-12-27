var trie = {
    childs:{},
    count: 0
};

function processData(input) {
    var lines = input.split("\n");
    var numQuery = parseInt(input[0], 10);
    
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        var cols = line.split(' ');
        
        if (cols[0] === 'add') {
            var name = cols[1];
            
            var cur = trie;
            for (var j = 0; j < name.length; j++) {
                var c = name.charAt(j);
                if (!cur.childs[c]) {
                    cur.childs[c] = {
                        childs: {},
                        count: 1
                    };
                } else {
                    cur.childs[c].count++;
                }
                cur = cur.childs[c];
            }
            cur.leaf = true;
        } else {            
            //var find = null;
            var partial = cols[1];
            var cur = trie;
            for (var k = 0; k < partial.length; k++) {
                var c = partial.charAt(k);
                if (!cur.childs[c]) {
                    cur = null;
                    break;
                }
                cur = cur.childs[c];
            }
            
            if (!cur) {
                console.log(0);
                continue;
            }
            
            console.log(cur.count);
        }
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

