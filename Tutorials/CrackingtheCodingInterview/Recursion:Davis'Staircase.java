import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    
    private static int solveInternal(int length, HashMap<Integer, Integer> dp) {
        if (length == 0) {
            return 1;
        }
        if (length < 0) {
            return 0;
        }
        
        if (dp.containsKey(length)) {
            return dp.get(length);
        }
        
        int result = solveInternal(length - 1, dp) + solveInternal(length - 2, dp) + solveInternal(length - 3, dp);
        dp.put(length, result);
        
        return result;
    }
    public static int solve(int length) {
        HashMap<Integer, Integer> dp = new HashMap<Integer, Integer>();
        return solveInternal(length, dp);
    }
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int s = in.nextInt();
        for(int a0 = 0; a0 < s; a0++){
            int n = in.nextInt();
            System.out.println(solve(n));
        }
    }
}
