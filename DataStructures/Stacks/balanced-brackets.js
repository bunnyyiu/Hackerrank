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

function isBalanced(s) {
    var stack = [];
    
    var startBrackets = ['(', '[', '{'];
    var endBrackets = [')', ']', '}'];
    
    for (var i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if (startBrackets.indexOf(c) >= 0) {
            stack.push(c);
        } else {
            var last = stack.pop();
            if (startBrackets.indexOf(last) !== endBrackets.indexOf(c)) {
                return "NO";
            }
        }
    }
    return stack.length === 0 ? "YES" : "NO";
    // Complete this function
}

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var s = readLine();
        var result = isBalanced(s);
        process.stdout.write("" + result + "\n");
    }

}
