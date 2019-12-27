import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {
    
    public static int countRegion(int r, int c, int[][] matrix, boolean[][] visited) {
        if (r < 0 || r >= matrix.length || c < 0 || c >= matrix[0].length) {
            return 0;
        }
        
        if (matrix[r][c] == 0) {
            return 0;
        }
        
        if (visited[r][c]) {
            return 0;
        }
        
        visited[r][c] = true;
        int count = 1;
        count += countRegion(r - 1, c - 1, matrix, visited);
        count += countRegion(r - 1, c, matrix, visited);
        count += countRegion(r - 1, c + 1, matrix, visited);
        
        count += countRegion(r, c - 1, matrix, visited);
        count += countRegion(r, c + 1, matrix, visited);
        
        count += countRegion(r + 1, c - 1, matrix, visited);
        count += countRegion(r + 1, c, matrix, visited);
        count += countRegion(r + 1, c + 1, matrix, visited);
        
        return count;
    }
    
    public static int getBiggestRegion(int[][] matrix) {
        int R = matrix.length;
        int C = matrix[0].length;
        boolean[][] visited = new boolean[R][C];
        
        int max = 0;
        for (int r = 0; r < R; r++) {
            for (int c = 0; c < C; c++) {
                int count = countRegion(r, c, matrix, visited);
                if (count > max) {
                    max = count;
                }
            }
        }
        return max;
    }
    
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        int m = in.nextInt();
        int grid[][] = new int[n][m];
        for(int grid_i=0; grid_i < n; grid_i++){
            for(int grid_j=0; grid_j < m; grid_j++){
                grid[grid_i][grid_j] = in.nextInt();
            }
        }
        System.out.println(getBiggestRegion(grid));
    }
}
