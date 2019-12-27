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


function isOpen(operator) {
    return ["{", "[", "("].indexOf(operator) >= 0;
}

function isMatch(operatorClose, operatorOpen) {
    var match = {
        ')' : '(',
        ']' : '[',
        '}' : '{'
    };
    
    return match[operatorClose] === operatorOpen;
}

/////////////// ignore above this line ////////////////////

function main() {
    var t = parseInt(readLine());
    for(var a0 = 0; a0 < t; a0++){
        var expression = readLine();
        var operators = expression.split('');
        
        var stack = [];
        
        var result = true;
        for (var i = 0; i < operators.length && result; i++) {
            let operator = operators[i];
            if (isOpen(operator)) {
                stack.push(operator);
            } else {
                let lastOperator = stack.pop();
                if (!isMatch(operator, lastOperator)) {
                    result = false;
                }
            }
        }
        
        
        console.log(result && stack.length == 0 ? "YES" : "NO");
    }

}
