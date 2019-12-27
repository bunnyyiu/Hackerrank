import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;
import java.util.PriorityQueue;

public class Solution {
    
    public static String printHeap(PriorityQueue<Integer> heap) {
       return (Arrays.toString(heap.toArray()));
    }
    
    public static void main(String[] args) {
        
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        
        PriorityQueue<Integer> leftMaxHeap = new PriorityQueue<Integer>(n, Collections.reverseOrder());
        PriorityQueue<Integer> rightMinHeap = new PriorityQueue<Integer>(n);
        
        int[] a = new int[n];
        for(int a_i=0; a_i < n; a_i++){
            a[a_i] = in.nextInt();
        }
        
        for (int i = 0; i < n; i++) {
            int val = a[i];
            if (i == 0) {
                rightMinHeap.add(val);
            } else if (i == 1) {
                if (val < rightMinHeap.peek()) {
                    leftMaxHeap.add(val);
                } else {
                    leftMaxHeap.add(rightMinHeap.poll());
                    rightMinHeap.add(val);
                }
            } else {
                if (val < leftMaxHeap.peek()) {
                    leftMaxHeap.add(val);
                } else {
                    rightMinHeap.add(val);
                }
            }
            
            // balance
            
            if (leftMaxHeap.size() != rightMinHeap.size()) {
                PriorityQueue<Integer> longHeap, shortHeap;
                
                if (leftMaxHeap.size() > rightMinHeap.size()) {
                    longHeap = leftMaxHeap;
                    shortHeap = rightMinHeap;
                } else {
                    longHeap = rightMinHeap;
                    shortHeap = leftMaxHeap;
                }
                
                if (longHeap.size() + leftMaxHeap.size() % 2 == 0) {
                    while(longHeap.size() > shortHeap.size()) {
                        shortHeap.add(longHeap.poll());
                    }
                } else if (longHeap.size() - shortHeap.size() > 1) {
                    shortHeap.add(longHeap.poll());
                }
            }
            
            if ((rightMinHeap.size() + leftMaxHeap.size()) % 2 == 0) {
                System.out.println((rightMinHeap.peek() + leftMaxHeap.peek()) / 2.0);
            } else {
                PriorityQueue<Integer> longHeap;
                
                if (leftMaxHeap.size() > rightMinHeap.size()) {
                    longHeap = leftMaxHeap;
                } else {
                    longHeap = rightMinHeap;
                }
                System.out.println(longHeap.peek() * 1.0);
            }
        }
    }
}
