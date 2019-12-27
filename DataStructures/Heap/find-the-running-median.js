'use strict';

const MIN_MODE = -1;
const MAX_MODE = 1;

const Heap = function(mode) {
    const self = this;
    const minSort = function(a, b) {
        return self._getRank(a) - self._getRank(b);
    };
    const maxSort = function(a, b) {
        return -1 * (self._getRank(a) - self._getRank(b));
    };
    switch (mode) {
        case MIN_MODE:
            self._compare = minSort;
            break;
        case MAX_MODE:
            self._compare = maxSort;
            break;
        default:
            self._compare = minSort;
    }
    self.list = [];
    self.length = 0;
};

Heap.prototype._getRank = function(item) {
    return item;
};

Heap.prototype._swap = function(i, j) {
    let tmp = this.list[i];
    this.list[i] = this.list[j];
    this.list[j] = tmp;
};

Heap.prototype._moveUp = function(i) {
    let currentIndex = i;
    let parentIndex = Math.floor((currentIndex - 1) / 2);

    while (parentIndex >= 0 &&
        this._compare(this.list[parentIndex], this.list[currentIndex]) > 0) {
        this._swap(currentIndex, parentIndex);
        currentIndex = parentIndex;
        parentIndex = Math.floor((currentIndex - 1) / 2);
    }
};

Heap.prototype._moveDown = function(i) {
    let currentIndex = i;
    let leftIndex = 2 * currentIndex + 1;
    let rightIndex = 2 * currentIndex + 2;

    while (currentIndex < this.length) {
        let leftIndex = 2 * currentIndex + 1;
        let rightIndex = 2 * currentIndex + 2;

        if (leftIndex >= this.length && rightIndex >= this.length) {
            break;
        } else if (leftIndex < this.length && rightIndex < this.length) {
            const diffLeft =
                this._compare(this.list[currentIndex], this.list[leftIndex]);
            const diffRight =
                this._compare(this.list[currentIndex], this.list[rightIndex]);

            if (diffLeft >= diffRight) {
                this._swap(currentIndex, leftIndex);
                currentIndex = leftIndex;
                continue;
            } else if (diffRight >= diffLeft) {
                this._swap(currentIndex, rightIndex);
                currentIndex = rightIndex;
                continue;
            } else {
                break;
            }
        } else if (leftIndex < this.length) {
            const diffLeft =
                this._compare(this.list[currentIndex], this.list[leftIndex]);
            if (diffLeft >= 0) {
                this._swap(currentIndex, leftIndex);
                currentIndex = leftIndex;
                continue;
            }
            break;
        } else {
            const diffRight =
                this._compare(this.list[currentIndex], this.list[rightIndex]);
            if (diffRight >= 0) {
                this._swap(currentIndex, rightIndex);
                currentIndex = rightIndex;
                continue;
            }
            break;
        }
    }
};

Heap.prototype.push = function(item) {
    this.list[this.length++] = item;
    this._moveUp(this.length - 1);
};

Heap.prototype.pop = function() {
    if (this.length === 0) {
        return null;
    }
    const result = this.list[0];
    this.list[0] = this.list[this.length - 1];
    this.length -= 1;
    this._moveDown(0);
    return result;
};

Heap.prototype.peek = function() {
    if (this.length >=0 ) {
        return this.list[0];
    }
    return null;
};

var createMinHeap = function() {
    const heap = new Heap(MIN_MODE);
    return heap;
};

var createMaxHeap = function() {
    const heap = new Heap(MAX_MODE);
    return heap;
};

var balanceHeap = function (left, right) {
    if (left.length < right.length) {
        left.push(right.pop());
    } else if(left.length === right.length && left.peek() > right.peek()) {
        var l = left.pop();
        var r = right.pop();
        left.push(r);
        right.push(l);
    }
};

var medium = function (left, right) {
    if (left.length === 0 && right.length === 0) {
        return 0;
    }
    if (left.length === right.length) {
        return (left.peek() + right.peek()) / 2;
    }
    if (left.length > right.length) {
        return left.peek();
    } else {
        return right.peek();
    }
}

var mediumFull = function(full) {
    full.sort(function (a, b) {
      return a - b;
    });
    if (full.length === 0) {
        return 0;
    } else if (full.length % 2 === 0) {
        console.log('mediumFull', full[full.length / 2 - 1],  full[full.length / 2]);
        return (full[full.length / 2 - 1] +  full[full.length / 2]) / 2;
    }
    return full[Math.floor(full.length / 2)];
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
var input = "";
process.stdin.on("data", function (chunk) {
    input += chunk;
});
process.stdin.on("end", function () {
    var lines = input.split('\n');
    
    // contain elements less than or equal to median
    var maxHeap = createMaxHeap();
    
    // contain all the elements greater than median
    var minHeap = createMinHeap();
    
    
    var full = [];
    for (var i = 1; i < lines.length; i++) {
        var line = lines[i];
        var cur = parseInt(line, 10);
        full.push(cur);

        var lastMedium = medium(maxHeap, minHeap);

        if (minHeap.length === 1 && maxHeap.length === 0) {
            var first = minHeap.pop();

            maxHeap.push(Math.min(first, cur));
            minHeap.push(Math.max(first, cur));

        } else {
            if (cur > lastMedium){
                minHeap.push(cur);
            } else {
                maxHeap.push(cur);
            }
        }

        if ((minHeap.length + maxHeap.length) % 2 === 0) {
            var large = minHeap.length > maxHeap.length ? minHeap: maxHeap;
            var small = minHeap.length < maxHeap.length ? minHeap: maxHeap;

            while (large.length > small.length) {
                small.push(large.pop());
            }
        }

        console.log(medium(maxHeap, minHeap).toFixed(1));
    }
});
