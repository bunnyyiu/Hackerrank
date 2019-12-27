var nodes = {};


function inorder(root) {
    var items = [];
    
    var inorderR = function (cur) {
        if (cur.left !== -1) {
            inorderR(nodes[cur.left]);
        }
        items.push(cur.value);
        if (cur.right !== -1) {
            inorderR(nodes[cur.right]);
        }
    } ;
    
    
    inorderR(root);
    
    return items.join(' ');
};


function postOrderSwap(root, d) {
    
    var postOrderSwapR = function (cur, i) {
        
        if (i % d === 0) {
            // do the swap
            var tmp = cur.left;
            cur.left = cur.right;
            cur.right = tmp;
        }
        
        if (cur.left !== -1) {
            postOrderSwapR(nodes[cur.left], i + 1);
        }
        if (cur.right !== -1) {
            postOrderSwapR(nodes[cur.right], i + 1);
        }
    };
    
    postOrderSwapR(root, 1);    
};

function processData(input) {
    var lines = input.split('\n');
    
    var numOfNodes = parseInt(lines[0], 10);
    
    for (var i = 1; i <= numOfNodes; i++) {
        nodes[i] = {
            left: -1,
            right: -1,
            value: i
        };
    }
    
    for (var i = 0; i < numOfNodes; i++) {
        var childs = lines[i + 1].split(' ');
        
        var left = parseInt(childs[0], 10);
        var right = parseInt(childs[1], 10);
        
        nodes[i + 1].left = left;
        nodes[i + 1].right = right;
    }    
    var root = nodes[1];
    var numOfQuery = parseInt(lines[1 + numOfNodes], 10);
    
    for (var j = 0; j < numOfQuery; j++) {
        var k = parseInt(lines[2 + numOfNodes + j], 10);
        
        postOrderSwap(root, k);
        console.log(inorder(root));
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
