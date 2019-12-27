// use dfs

function calc(a, operator, b) {
    if (operator === "*") {
        return a * b;
    } else if (operator === "+") {
        return a + b;
    } else if (operator === '-') {
        return a - b;
    } else {
        return NaN;
    }
}

function dfs(numbers, i, operator, equation, lastResult) {
    var cur = numbers[i];
    var newEquation = equation + operator + cur;
    
    // call calc
    var newResult = calc(lastResult, operator, cur);
    if (i === numbers.length - 1) {
        if (newResult % 101 === 0) {
            return newEquation;
        }
        return null;
    }
    
    var result1 = dfs(numbers, i + 1, '*', newEquation, newResult);
    if (result1) {
        return result1;
    }
    var result2 = dfs(numbers, i + 1, '+', newEquation, newResult);
    if (result2) {
        return result2;
    }
    var result3 = dfs(numbers, i + 1, '-', newEquation, newResult);
    if (result3) {
        return result3;
    }
    return null;
}

function runner(numbers) {
    var i = 0;
    var cur = numbers[i];
    var newEquation = cur;
    var newResult = cur;
    
    var result1 = dfs(numbers, i + 1, '*', newEquation, newResult);
    if (result1) {
        return result1;
    }
    var result2 = dfs(numbers, i + 1, '+', newEquation, newResult);
    if (result2) {
        return result2;
    }
    var result3 = dfs(numbers, i + 1, '-', newEquation, newResult);
    if (result3) {
        return result3;
    }
    return null;
}

function runner2(numbers) {
    var stack = [];

    if (numbers[0] === 1) {
      stack.push({
          index: 1,
          operator: '+',
          equation: numbers[0],
          result: numbers[0]
      });
      
      stack.push({
          index: 1,
          operator: '-',
          equation: numbers[0],
          result: numbers[0]
      });
      
      stack.push({
          index: 1,
          operator: '*',
          equation: numbers[0],
          result: numbers[0]
      });
    } else {
      stack.push({
          index: 1,
          operator: '*',
          equation: numbers[0],
          result: numbers[0]
      });
      
      stack.push({
          index: 1,
          operator: '-',
          equation: numbers[0],
          result: numbers[0]
      });
      
      stack.push({
          index: 1,
          operator: '+',
          equation: numbers[0],
          result: numbers[0]
      });
    }

    while (stack.length > 0) {
        var node = stack.pop();
        var cur = numbers[node.index];
        //console.log(node.equation, node.operator, cur)
        var newEquation = node.equation + node.operator + cur;
        var newResult = calc(node.result, node.operator, cur);
        if (node.index === numbers.length - 1) {
            if (newResult % 101 === 0) {
                return newEquation;
            }

            continue;
        }

        if (numbers[node.index + 1] === 1) {
          stack.push({
              index: node.index + 1,
              operator: '+',
              equation: newEquation,
              result: newResult
          });
          
          stack.push({
              index: node.index + 1,
              operator: '-',
              equation: newEquation,
              result: newResult
          });
          
          stack.push({
              index: node.index + 1,
              operator: '*',
              equation: newEquation,
              result: newResult
          });
        } else {
          stack.push({
              index: node.index + 1,
              operator: '*',
              equation: newEquation,
              result: newResult
          });
          
          stack.push({
              index: node.index + 1,
              operator: '-',
              equation: newEquation,
              result: newResult
          });
          
          stack.push({
              index: node.index + 1,
              operator: '+',
              equation: newEquation,
              result: newResult
          });
        }
    }
}

function processData(input) {
    var lines = input.split('\n');
    var n = parseInt(lines[0], 10);
    var cols = lines[1].split(' ');
    var numbers = [];
    numbers.length = n;
    for (var i = 0; i < n; i++) {
        numbers[i] = parseInt(cols[i], 10);
    }
    console.log(runner2(numbers));
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
