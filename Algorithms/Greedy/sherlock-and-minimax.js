function processData(input) {
    const lines = input.split('\n');
    const n = lines[0];
    let elements = lines[1].split(' ');
    
    for (let i = 0; i < n; i++) {
        elements[i] = parseInt(elements[i], 10);
    }
    elements.sort(function (a, b) { return a - b});
    
    let cols = lines[2].split(' ');
    const p = parseInt(cols[0], 10);
    const q = parseInt(cols[1], 10);
    
    let max = -1;
    let num = null;
    
    if (elements[0] > q) {
        console.log(p);
        return;
    }
    
    if (elements[elements.length - 1] < p) {
        console.log(q);
        return;
    }
    
    if (p < elements[0]) {
        if (elements[0] - p > max) {
            max = elements[0] - p;
            num = p;
        }
    }
    
    if (q > elements[elements.length - 1]) {
        if (q - elements[elements.length - 1] > max) {
            max = q - elements[elements.length - 1];
            num = q;
        }
    }
    
    for (let i = 0; i < elements.length - 1; i++) {
        // compute the mid (floor)
        // example
        // 4 9 (A)
        // 4 9 (p, q)
 
        
        // m | abs(m - 4) | abs(m - 9) | min (abs(m - 4), abs(m - 9))
        // 4 | 0          | 5          | 0
        // 5 | 1          | 0          | 1
        // 6 | 2          | 3          | 2  --> the max , we pick m = 6 becasue it is smaller
        // 7 | 3          | 2          | 2  --> the max , but we wont pick
        // 8 | 4          | 1          | 1
        // 9 | 5          | 0          | 0
        
        // we pick m = 6 according to above table
        // this made the following formula
        // med = floor ((4 + 9) / 2)
        // med = 6
        let med = Math.floor((elements[i] + elements[i + 1]) / 2)  ;
        if (med >= p && med <= q && med - elements[i] > max) {
            max = med - elements[i];
            num = med;
        } else if (med < p) {
            // med is not in range
            // elements[i] must be smaller than p, and it is not in range too
            
            // example
            // 5 8 (array)
            // 7 9 (p, q)
            // med = floor((5 + 8) /2)
            // med = 6, out of range as 6 < p
            
            // let list of all m in the range(p, q)
            // m | abs(m - 5) | abs(m - 8) | min (abs(m - 7), abs(m - 8))
            // 7 | 2          | 1          | 1 --> max, we pick this as 7 is smaller
            // 8 | 3          | 0          | 0
            // 9 | 4          | 1          | 1 --> max, but we wont pick this
            
            // this made the above formula
            // elements[i + 1] - p -> (8 - 7)
            
            if (elements[i + 1] - p > max) {
                max = elements[i + 1] - p
                num = p;
            }
        } else if (med > q ) {
            if (q - elements[i] > max) {
                max = q - elements[i];
                num = q;
            }
        } 
    }
    
    console.log(num);
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