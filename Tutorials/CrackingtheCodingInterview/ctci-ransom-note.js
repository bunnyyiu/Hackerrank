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

function main() {
    var m_temp = readLine().split(' ');
    var m = parseInt(m_temp[0]);
    var n = parseInt(m_temp[1]);
    magazine = readLine().split(' ');
    ransom = readLine().split(' ');
    
    var mHash = {};
    magazine.forEach(function (w) {
        if (!mHash[w]) {
            mHash[w] = 1;
        } else {
            mHash[w]++;
        }
    });
    
    var result = "Yes";
    for (var i = 0; i < n; i++) {
        let w = ransom[i];
        if (!mHash[w] || mHash[w] === 0) {
            result = "No";
            break;
        }
        mHash[w]--;
    }
    console.log(result)
}
