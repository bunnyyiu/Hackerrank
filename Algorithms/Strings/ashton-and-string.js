"use strict";

var Tuple = function (start, end, firstHalf, secondHalf, str) {
  this.start = start;
  this.end = end;
  this.firstHalf = firstHalf;
  this.secondHalf = secondHalf;
  this.str = str;
};


var compare = function (a, b) {
  if (a.firstHalf === b.firstHalf) {
    return a.secondHalf - b.secondHalf;
  } else {
    return a.firstHalf - b.firstHalf;
  }
};

var substringSort = function (s) {
  var suffixRank = [];
  var N = s.length;

  suffixRank[0] = {};
  for (var i = 0; i < N; i++) {
    for (var j = i; j < N; j++) {
      suffixRank[0][i + "_" + j] = s.charCodeAt(i) - 'a'.charCodeAt(0);
    }
  }
  var tuples = [];
  for (var len = 1, cur = 1; len < N; len *= 2, cur++) {
    suffixRank[cur] = {};
    for (var end = 0, k = 0; end < N; end++) {
      for (var start = 0; start <= end; start++) {
        var firstHalf = suffixRank[cur - 1][start + "_" + end];
        var secondHalf = start + len <= end ? suffixRank[cur - 1][(start + len) + "_" + end] : -1;
        var tuple = new Tuple(start, end, firstHalf, secondHalf, s.substring(start, end + 1));
        tuples[k++] = tuple;
      }
    }
    tuples.sort(compare);

    suffixRank[cur][tuples[0].start + "_" + tuples[0].end] = 0;

    for (var i = 1, rank = 0; i < tuples.length; i++) {
      var curTuple = tuples[i];
      var lastTuple = tuples[i - 1];
      if (curTuple.firstHalf !== lastTuple.firstHalf || 
          curTuple.secondHalf !== lastTuple.secondHalf) {
        rank++;
      }
      suffixRank[cur][tuples[i].start + "_" + tuples[i].end] = rank;
    }
  }
  return tuples.map(function (t) {
    return {
      start: t.start,
      end: t.end
    };
  });
};

function processData(input) {
    var lines = input.split('\n');
    var N = parseInt(lines[0]);
    for (var i = 0; i < N; i++) {
        var s = lines[i * 2 + 1];
        var pos = parseInt(lines[i * 2 + 2]) - 1;
        var suffixs = substringSort(s);
        
        var concated = "";
        var hash = {};
        for (var j = 0; j < suffixs.length; j++) {
            var tuple = suffixs[j];
            var str = s.substring(tuple.start, tuple.end+1);
            if (hash[str]) {
                continue;
            }
            concated += str;
            hash[str] = true;
            if (pos < concated.length) {
                console.log(concated[pos]);
                break;
            }
        }
    }
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
var _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});