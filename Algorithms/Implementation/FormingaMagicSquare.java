import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    
    static int[][] rotate(int[][] square) {
        int[][] results = new int[3][3];
        
        for (int r = 0; r <= 2; r++) {
            for (int c = 0; c <= 2; c++) {
                results[c][2 - r] = square[r][c];
            }
        }
        
        return results;
    }
    
    static int[][] mirror(int[][] square) {
        int[][] results = new int[3][3];
        
        for (int r = 0; r <= 2; r++) {
            for (int c = 0; c <= 2; c++) {
                results[r][2 - c] = square[r][c];
            }
        }
        
        return results;
    }
    
    static long countCost(int[][] square, int [][] ans) {
        long cost = 0;
        for (int r = 0; r <= 2; r++) {
            for (int c = 0; c <= 2; c++) {
                cost += Math.abs(square[r][c] - ans[r][c]);
            }
        }
        return cost;
    }
    
    static long formingMagicSquare(int[][] s) {
        int[][] original = new int[][]{
            {8, 3, 4},
            {1, 5, 9},
            {6, 7, 2}
        };
        
        List<int[][]> solutions = new ArrayList<int[][]>();
        solutions.add(original);
        solutions.add(rotate(solutions.get(solutions.size() - 1)));
        solutions.add(rotate(solutions.get(solutions.size() - 1)));
        solutions.add(rotate(solutions.get(solutions.size() - 1)));
        solutions.add(mirror(original));
        solutions.add(rotate(solutions.get(solutions.size() - 1)));
        solutions.add(rotate(solutions.get(solutions.size() - 1)));
        solutions.add(rotate(solutions.get(solutions.size() - 1)));
        
        long min = Long.MAX_VALUE;
        for (int i = 0; i < solutions.size(); i++) {
            long cost = countCost(s, solutions.get(i));
            if (cost < min) {
                min = cost;
            }
        }
        
        return min;
    }

    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int[][] s = new int[3][3];
        for(int s_i = 0; s_i < 3; s_i++){
            for(int s_j = 0; s_j < 3; s_j++){
                s[s_i][s_j] = in.nextInt();
            }
        }
        long result = formingMagicSquare(s);
        System.out.println(result);
        in.close();
    }
}
