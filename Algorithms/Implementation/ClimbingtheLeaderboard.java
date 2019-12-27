import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;
import static java.util.stream.IntStream.range;

public class Solution {
    static int binarySearch(int[] a, int low, int hi, int key) {
        int mid = 0;
        while (low <= hi) {
            mid = (low + hi) >>> 1;
            final int d = a[mid];
            if (d == key) {
                return mid;
            } else if (d > key) {
                hi = mid - 1;
            } else {
                low = ++mid;
            }
        }
        return -mid - 1;
    }
    // Complete the climbingLeaderboard function below.
    static int[] climbingLeaderboard(int[] scores, int[] alice) {
        int[] results = new int[alice.length];
        int n = scores.length;
        int[] distinct = range(0, n).map(i -> scores[n - 1 - i]).distinct().toArray();
        int index = 0;
        
        for (int i = 0; i < alice.length; i++) {
            int score = alice[i];
            index = binarySearch(distinct, index < 0 ? 0 : index, distinct.length - 1, score);
            
            if (index < 0) {
                index = -index - 2;
            }
            results[i] = distinct.length - index;
        }
        return results;
    }

    private static final Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) throws IOException {
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        int scoresCount = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int[] scores = new int[scoresCount];

        String[] scoresItems = scanner.nextLine().split(" ");
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int i = 0; i < scoresCount; i++) {
            int scoresItem = Integer.parseInt(scoresItems[i]);
            scores[i] = scoresItem;
        }

        int aliceCount = scanner.nextInt();
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        int[] alice = new int[aliceCount];

        String[] aliceItems = scanner.nextLine().split(" ");
        scanner.skip("(\r\n|[\n\r\u2028\u2029\u0085])?");

        for (int i = 0; i < aliceCount; i++) {
            int aliceItem = Integer.parseInt(aliceItems[i]);
            alice[i] = aliceItem;
        }

        int[] result = climbingLeaderboard(scores, alice);

        for (int i = 0; i < result.length; i++) {
            bufferedWriter.write(String.valueOf(result[i]));

            if (i != result.length - 1) {
                bufferedWriter.write("\n");
            }
        }

        bufferedWriter.newLine();

        bufferedWriter.close();

        scanner.close();
    }
}
