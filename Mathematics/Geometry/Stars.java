/*
 Enter your code here. Read input from STDIN. Print output to STDOUT
 Your class should be named Solution
*/
import java.util.*;
public class Solution {
    public static void main (String args []) {
        Scanner scanner = new Scanner(System.in);
        int n = scanner.nextInt();
        int points [][] = new int [n][2];
        int weights [] = new int [n];
        double y [] = new double[n];
        for (int i = 0; i < n; i++) {
            points[i][0] = scanner.nextInt();
            points[i][1] = scanner.nextInt();
            weights[i] = scanner.nextInt();
        }
        double step = Math.PI / 1000;
        int max = -1;
        for (double angle = 0; angle <= Math.PI; angle += step) {
            for (int i = 0; i < n; i++) {
                y[i] = points[i][0] * Math.cos(angle) - points[i][1] * Math.sin(angle);
            }
            for (int i = 0; i < n; i++) {
                double cut = y[i];
                int left = 0;
                int right = 0;
                for (int j = 0; j < n; j++) {
                    if (y[j] <= cut) {
                        left += weights[j];
                    } else {
                        right += weights[j];
                    }
                    int tmpMin = Math.min(left, right);
                    if (tmpMin > max) {
                        max = tmpMin;
                    }
                }
            }
        }
        System.out.println(max);
    }
}
