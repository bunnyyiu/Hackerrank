#!/bin/python3

import os
import sys

#
# Complete the dynamicArray function below.
#
def dynamicArray(n, queries):
    #
    # Write your code here.
    #
    seqList = [];
    for i in range(0, n):
        seqList.append([]);
    lastAnswer = 0
    
    results = []
    for i in range(0, len(queries)):
        query = queries[i]
        queryType = query[0]
        x = query[1]
        y = query[2]
        
        if (queryType == 1):
            seq = seqList[(x ^  lastAnswer) % n]
            seq.append(y)
        elif (queryType == 2):
            seq = seqList[(x ^  lastAnswer) % n]
            lastAnswer = seq[y % len(seq)]
            results.append(lastAnswer)
    return results

if __name__ == '__main__':
    fptr = open(os.environ['OUTPUT_PATH'], 'w')

    nq = input().split()

    n = int(nq[0])

    q = int(nq[1])

    queries = []

    for _ in range(q):
        queries.append(list(map(int, input().rstrip().split())))

    result = dynamicArray(n, queries)

    fptr.write('\n'.join(map(str, result)))
    fptr.write('\n')

    fptr.close()
