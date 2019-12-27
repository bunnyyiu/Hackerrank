import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    public static int bubbleSort(int a[]) {
        int n = a.length;
        boolean swapped = false;
        int swappedCount = 0;
        do {
            swapped = false;
            for (int i = 1; i < n; i++) {
                if (a[i - 1] > a[i]) {
                    int tmp = a[i - 1];
                    a[i - 1] = a[i];
                    a[i] = tmp;
                    swapped = true;
                    swappedCount++;
                }
            }
        } while (swapped);
        return swappedCount;
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int a[] = new int[n];
        for(int a_i=0; a_i < n; a_i++){
            a[a_i] = in.nextInt();
        }
        int swappedCount = bubbleSort(a);
        System.out.println("Array is sorted in " + swappedCount + " swaps.");
        System.out.println("First Element: " + a[0]);
        System.out.println("Last Element: " + a[a.length - 1]);
    }
}
