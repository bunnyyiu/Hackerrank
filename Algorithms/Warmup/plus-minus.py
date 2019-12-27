#!/bin/python3

import math
import os
import random
import re
import sys
from decimal import *

# Complete the plusMinus function below.
def plusMinus(arr):
    count = len(arr)
    positive = 0
    negative = 0
    zero = 0
    for x in arr:
        if x == 0:
            zero += 1
        elif x > 0:
            positive += 1
        else:
            negative += 1
    print(Decimal(positive) / Decimal(count))
    print(Decimal(negative) / Decimal(count))
    print(Decimal(zero) / Decimal(count))
    
if __name__ == '__main__':
    n = int(input())

    arr = list(map(int, input().rstrip().split()))

    plusMinus(arr)
