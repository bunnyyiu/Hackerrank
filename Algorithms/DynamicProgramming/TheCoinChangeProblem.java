import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    static long getWays(int n, int[] c){
        long[] counts = new long[n + 1];
        
        counts[0] = 1;
        for (int i = 1; i < counts.length; i++) {
            counts[i] = 0;
        }
        
        for (int i = 0; i < c.length; i++) {
            for (int j = c[i]; j < n + 1; j++) {
                counts[j] += counts[j - c[i]];
            }
        }
        
        return counts[n];
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int m = in.nextInt();
        int[] c = new int[m];
        for(int c_i=0; c_i < m; c_i++){
            c[c_i] = in.nextInt();
        }
        // Print the number of ways of making change for 'n' units using coins having the values given by 'c'
        long ways = getWays(n, c);
        System.out.println(ways);
    }
}
