process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////


var root = {
    childs:{}
};

function addContact(contact) {
    let node = root;
    let i = 0;
    
    let chars = contact.split("");
    while (i < chars.length) {
        let c = chars[i];
        if (!node.childs[c]) {
            node.childs[c] = {
                childs: {},
                count: 0
            };
        }
        node.childs[c].count++;
        node = node.childs[c];
        i++;
    }
}

function searchPrefix(prefix) {
    let chars = prefix.split("");
    let node = root;
    let i = 0;
    
    while (i < chars.length && node != null) {
        let c = chars[i];
        node = node.childs[c];
        i++;
    }
    
    if (node != null) {
        return node.count;
    }
    return 0;
}

function main() {
    var n = parseInt(readLine());
    for(var a0 = 0; a0 < n; a0++){
        var op_temp = readLine().split(' ');
        var op = op_temp[0];
        var contact = op_temp[1];
        
        if (op == "add") {
            addContact(contact);
        } else {
            console.log(searchPrefix(contact));
        }
    }

}
