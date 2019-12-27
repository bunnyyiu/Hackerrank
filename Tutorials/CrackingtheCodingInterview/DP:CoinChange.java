import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    
    public static long makeChange(int[] coins, int money) {
        long[] counts = new long[money + 1];
        for (int i = 0; i < money + 1; i++) {
            counts[i] = 0;
        }
        counts[0] = 1;
        
        for (int i =0; i < coins.length; i++) {
            for (int j = coins[i]; j < money + 1; j++) {
                counts[j] += counts[j - coins[i]];
            }
        }
        
        return counts[money];
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int m = in.nextInt();
        int coins[] = new int[m];
        for(int coins_i=0; coins_i < m; coins_i++){
            coins[coins_i] = in.nextInt();
        }
        System.out.println(makeChange(coins, n));
    }
}
